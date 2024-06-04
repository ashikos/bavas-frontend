import { FloatingLabel} from 'flowbite-react';
import React from 'react';
import { MdDelete, MdAdd } from "react-icons/md";

const AddInput = ({inputs, setInputs, set_amount}) => {

  const handleAddInput = () => {
    const lastDist = inputs[inputs.length-1]
    if (lastDist["item"]==="" && lastDist["amount"]===0){
      return ;
    }else{
    setInputs([...inputs, {"item":"", "amount":0}]); 
    }
    
  };
  const handleInputChange = (e, index, field) => {
    const newInputs = [...inputs];
    const value = field === 'amount' ? parseFloat(e.target.value) : e.target.value; // Handle conversion for amount
    newInputs[index] = { ...newInputs[index], [field]: value };
    setInputs(newInputs);
  };

  const deleteitem = (index) => {
    let inputCount = inputs.length
    if (inputCount >1){
    const newInputs = inputs.slice(0,index).concat(inputs.slice(index+1, inputCount))
    setInputs(newInputs)
    }
  };

  return (

    <div className="">
    
    {inputs.map((input, index) => (
      <div className='bg-white flex justify-center gap-4'>
        <div className="w-[80%]">
        <FloatingLabel key={index} value={input["item"]}
            onChange={(e)=>handleInputChange(e,index, "item")}
            required variant="outlined" label="Type of service" />
        </div>
        <div className="">
        <input required onChange={(e)=>handleInputChange(e,index, "amount")}
           key={index} value={input["amount"]} placeholder='amount'
            className='h-12 rounded-md border-gray-300' type="number"  />
        </div>
          <div className="mt-3 cursor-pointer ml-3"> <MdDelete
           className='' onClick={()=>deleteitem(index)} size={25}/>
           </div>
    
      </div>
    ))}
    <div className='p-3'><MdAdd onClick={handleAddInput} size={25}/></div>
    
    
  </div>
  
    
  );
};

export default AddInput;