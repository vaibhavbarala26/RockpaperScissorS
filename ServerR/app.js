const express = require("express")
const {createServer} = require("http")
const {Server} = require("socket.io")
const app = express()
const cors = require("cors")
const server = createServer(app)
const io = new Server(server , {
    cors:{
        origin:"http://localhost:5173",
        credentials:true,
    }
})
var rooms = [];
var items = [];
io.on("connection" , (socket)=>{
    console.log("connected");
    socket.on("create-room" , (data)=>{
        socket.join(data)
        const member = [];
        member.push(socket.id);
        const room = {
            name:data,
            member
        }
        rooms.push(room);
        console.log(rooms);
    })
    socket.on("join-room" , data=>{
        const find = rooms.findIndex((e) => e.name === data)
        if(rooms[find].member.length<2){
            socket.join(data)
            rooms[find].member.push(socket.id)
            console.log(rooms);
            io.to(data).emit("status" , "paired");
        }
        else{
            io.to(socket.id).emit("status", "already in game");
        }
    })
    socket.on("game" , ({item , roomname , username , socketid})=>{
        console.log(roomname);
        if(items.length < 2){
            const finf = items.find((s)=> s.socketid === socketid )
            if(finf){
                io.to(socketid).emit("result", "wait for opponent")
            }
            else{
            items.push({item , username , socketid});
            }
        }
        console.log(items);
        console.log(roomname);
        if(items.length === 2){
        const  f =  items[0];
        const  s = items[1];
        if(f.item === "rock"){
            if(s.item === "scissors"){
               io.to(roomname).emit("result" , (`${f.username} wins!!!`))
            }
            else if(s.item === "paper"){
                io.to(roomname).emit("result" , (`${s.username} wins!!!`))
            }
        }
        else if(f.item === "scissors"){
            if(s.item === "paper"){
                console.log("f wons");
                io.to(roomname).emit("result" , (`${f.username} wins!!!`))
            }
            else if(s.item === "rock"){
                console.log("s wins")
                io.to(roomname).emit("result" , (`${s.username} wins!!!`))
            }
        }
        else if(f.item === "paper"){
            if(s.item === "rock"){
                console.log("f wons");
                io.to(roomname).emit("result" , (`${f.username} wins!!!`))
                
            }
            else if(s.item === "scissors"){
                console.log("s wins")
                io.to(roomname).emit("result" , (`${s.username} wins!!!`))
            }
        }
        else if(s.item === f.item){
            io.to(roomname).emit("result" , `tied!!!`)
        }
        items.length = 0;
        }
    })
    setInterval(()=>{
        rooms.length = 0;
    } , 86400000 )
})
server.listen(3000 , ()=>{
    console.log("listening to 3000");
})  