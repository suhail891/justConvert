import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate=useNavigate();
    function handleClick(){
        navigate("/imageToPdf")
    }
  return (
    <div>
        <button onClick={()=>{
            navigate("/imageToPdf")
        }}>images to pdf</button>
        <button onClick={()=>{navigate("/mergePdf")}}>merge pdf</button>
    </div>
  )
}

export default HomePage