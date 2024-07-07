import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Component/Home'
import Game from './Component/Game'
import {Routes , Route} from "react-router-dom"
import Rgame from './Component/Rgame'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Routes>
      <Route path ="/" element={<Home></Home>}></Route>
      <Route path ="/friend" element={<Game></Game>}></Route>
      <Route path ="/random" element={<Rgame></Rgame>}></Route>
    </Routes>
    </>
  )
}

export default App
