import React from 'react'
import  img from "../assets/space.jpg"
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <div className="img">
      <img src={img} alt="" />
      <div className="hero">
        <div className="name">
        <h1>Rock</h1>
        <h1>Paper</h1>
        <h1>Scissor</h1>
        </div>
        <div className="but">
        <Link to={"/friend"}><button>Play with friend</button></Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home
