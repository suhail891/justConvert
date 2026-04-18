import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate=useNavigate();
  return (
    <div className="flex justify-left m-0.5  bg-blue-100 h-12 w-7xl">
        <button className='m-1' onClick={()=>{navigate("/")}}>Home</button>
    </div>
  )
}

export default NavBar