import axios from "../axios"
import React, { useState } from 'react'
import { Accordion, AccordionItem } from '@szhsin/react-accordion';


const Orders = () => {

  const [num, setNum] = useState({"num1":null,"num2":null})

  const handle = ((e, field)=>{
    const value = parseFloat(e.target.value)
    setNum(prestat=>({...prestat, [field]:value}))
    console.log(typeof(num["num1"]));
  })

  const fetchData = async () => {   
    // api to call entries of bavas  
    try {
        const response = await axios.get(
          ``);
        console.log(response.data.results)
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


  return (
    <div className="parent relative  w-[30%] p-5 bg-white shadow-xl rounded-2xl m-6">

      <p>accordian</p>
      <Accordion transition transitionTimeout={100}>
      <AccordionItem header="What is Lorem Ipsum?">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </AccordionItem>

      <AccordionItem header="Where does it come from?">
        Quisque eget luctus mi, vehicula mollis lorem. Proin fringilla
        vel erat quis sodales. Nam ex enim, eleifend venenatis lectus
        vitae, accumsan auctor mi.
      </AccordionItem>

      <AccordionItem header="Why do we use it?">
        Suspendisse massa risus, pretium id interdum in, dictum sit amet
        ante. Fusce vulputate purus sed tempus feugiat.
      </AccordionItem>
    </Accordion>

   
      <button onClick={fetchData}> Hooooiii</button>
   

    </div>

    


  )
}

export default Orders