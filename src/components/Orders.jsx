import React, { useState } from 'react'
import Alertbox from './utils/Alertbox'


const Orders = () => {

  const [num, setNum] = useState({"num1":null,"num2":null})

  const handle = ((e, field)=>{
    const value = parseFloat(e.target.value)
    setNum(prestat=>({...prestat, [field]:value}))
    console.log(typeof(num["num1"]));
  })


  return (
    <div>

      <input type="number" onChange={(e)=> handle(e, "num1")} />
      <input type="number" onChange={(e)=> handle(e, "num2")} />
    </div>
  )
}

export default Orders