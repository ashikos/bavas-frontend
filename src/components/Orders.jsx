import React, { useState } from 'react'
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";


const Orders = () => {

  const [num, setNum] = useState({"num1":null,"num2":null})

  const handle = ((e, field)=>{
    const value = parseFloat(e.target.value)
    setNum(prestat=>({...prestat, [field]:value}))
    console.log(typeof(num["num1"]));
  })


  return (
    <div className="parent relative  w-[30%] p-5 bg-white shadow-xl rounded-2xl m-6">

      <div className="box box1 bg-slate-300 m-4 h-[10vh]">box 1</div>
      <div className="box box2 bg-slate-300 m-4 h-[10vh]">box 2</div>
      <div className="box box3 bg-slate-300 m-4 h-[10vh]">box 3</div>
      <div className="box box4 bg-slate-300 m-4 h-[10vh]">box 4</div>
      <div className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2" >
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
      </Alert>
      </div>

    </div>

    


  )
}

export default Orders