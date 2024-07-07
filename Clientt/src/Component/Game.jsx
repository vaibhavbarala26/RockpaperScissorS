import React, { useEffect, useMemo, useState } from 'react'
import  img from "../assets/space.jpg"
import {io} from "socket.io-client"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Game = () => {
    const [username , setUsername] = useState("")
    const [socketid , setSocketid] = useState("")
    const [tick , setTick]  =  useState(false)
    const [proceed,setProceed] = useState(false);
    const [roomname , setRoomname] = useState("")
    const [roomnam , setRoomnam] = useState("")
    const [pair , setPair] = useState(false);
    const [item , setItem] = useState("")
    const [mess , setMess] = useState("")
    const [winner , SetWinner] = useState("")

    const hal = (e)=>{
        e.preventDefault();
        setTick(true);
    }
    const socket = useMemo(()=> io("http://localhost:3000") , [])
    useEffect(()=>{
        socket.on("connect" , ()=>{
            console.log("connected");
        })
        setSocketid(socket.id)
    }) 
    const create = (e)=>{
        e.preventDefault();
        socket.emit("create-room" , roomname);
        setProceed(true)
    }
    const join = ()=>{
        socket.emit("join-room" , roomnam);
        setProceed(true);
    }
    useEffect(()=>{
        socket.on("status" , (data)=>{
            console.log(data);
            if(data === "paired"){
                setPair(true)
            }
            if(data !== "paired"){
            setMess(data)
            setPair(true)
            setProceed(false)
            }
        })
    })
    if(pair){
        toast.success(mess || "Paired")
        setPair(false)
    }
    const sendsci = ()=>{
        setItem("scissor");
       
        socket.emit("game" , {item:"scissors", roomname , username , socketid:socketid})
        
    }
    const sendroc = ()=>{
        
        socket.emit("game" , {item:"rock", roomname , username , socketid:socketid})
        
    }
    const sendpap = ()=>{
        
        socket.emit("game" , {item:"paper", roomname , username , socketid:socketid})
        
    }
    useEffect(()=>{
        socket.on("result" , (data)=>{
            console.log(data);
            toast.success(data)
        })
    },[socket])
      return (
        <>
        <div className='App'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      </div>
            <div>
      <div>
        <div className="img">
      <img src={img} alt="" />
      <div className="heroine">
        {!proceed ? <>
        <div className="but">
            <form action="" className='form' onSubmit={create}>
                <input type="text"  value={roomname} onChange={(e)=>setRoomname(e.target.value)}/>
                <button>Create server</button>
            </form>
            <form action="" className='form' onSubmit={join}>
                <input type="text"  value={roomnam} onChange={(e)=>setRoomnam(e.target.value)}/>
                <button>Join server</button>
            </form>
        </div>
        </>:<>
            <div className="player1">
            {tick ? <><div className="formi"><span>{username}</span></div></>:<> <form action="" className='form' onSubmit={hal}>
                <input type="text" value={username} style={{backgroundColor:"transparent", border:"1px solid white"}} onChange={(e)=>setUsername(e.target.value)} />
                <div className="but">
                <button>set</button>
                </div>
            </form></>}
            <div className="item">
            <span id='ro' onClick={sendsci}>Scissor</span>
            <span id='ro' onClick={sendroc}>Rock</span>
            <span id='ro' onClick={sendpap}>Paper</span>
            </div>
        </div></>}
      </div>
      </div>
    </div>
    </div>
    </>
  )
}
export default Game
