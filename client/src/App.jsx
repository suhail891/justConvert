
import React from 'react'
import './App.css'
import ImageToPdf from './components/ImageToPdf'
import MergePdf from './components/MergePdf'
import PageNotFound from './components/PageNotFound'
import {createBrowserRouter, RouterProvider,Outlet } from 'react-router-dom';
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'


const router=createBrowserRouter([
  {
    path:"/",
    element:<HomePage />
  },
  {
    path:"/imageToPdf",
    element: <div>
      <NavBar/>
      <ImageToPdf/>
    </div>
  },
  {
    path:"/mergePdf",
    element: <div>
      <NavBar/>
      <MergePdf/>
    </div>
  },
   {
      path:"*",
      element:
      <PageNotFound/>
    }
])
const App = () => {
  return (
    <>
    {/* <div style={{"border":"2px solid black"}}><ImageToPdf/></div>
    <div style={{"border":"2px solid black"}}><MergePdf/></div> */}
    
    <RouterProvider router={router}/>
    </>
  )
}

export default App

