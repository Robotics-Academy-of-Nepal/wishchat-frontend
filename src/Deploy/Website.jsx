import React, { useState } from 'react'
import { IoMdDownload } from "react-icons/io";


export default function Website() {

    const [activeSection,setActiveSection]=useState('JSX');
  return (
    <div>
      <div className='flex items-center justify-center gap-4' style={{ fontFamily: "Georgia" }}>
                          <button 
                          onClick={()=>setActiveSection("JSX")}
                          className=' px-[50px] text-xl hover:bg-blue-700 py-3 shadow-md shadow-black rounded-md bg-blue-600 text-white'>
                            JSX
                            </button>

                          <button 
                          onClick={()=>setActiveSection('TSX')}
                          className=' px-[50px] text-xl py-3 shadow-md shadow-black rounded-md bg-blue-600 hover:bg-blue-700 text-white'>
                            TSX
                            </button>
                          
      </div>
      {activeSection =="JSX" &&(
   <div className='flex items-center justify-center w-full m-4'>
   <span className='flex justify-between md:mt-[200px] gap-[150px] shadow-black shadow-md px-[100px] py-3 rounded-md '>
       <h1 className='text-3xl font-bold text-center text-black'>JSX</h1>
       <a href='./CB_JSX.rar' download><IoMdDownload className='h-[50px] w-[50px]'/></a>
       </span>
</div>
      )}
           {activeSection =="TSX" &&(
   <div className='flex items-center justify-center w-full m-4'>
   <span className='flex justify-between md:mt-[200px] gap-[150px] shadow-black shadow-md px-[100px] py-3 rounded-md '>
       <h1 className='text-3xl font-bold text-center text-black'>TSX</h1>
       <a href='./CB_TSX.rar' download><IoMdDownload className='h-[50px] w-[50px]'/></a>
  
       </span>
</div>
      )}
   
    </div>
  )
}
