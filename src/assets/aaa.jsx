import React, { useState } from 'react';
import { MdDelete, MdAdd } from 'material-ui/icons'; // Assuming Material UI for icons

const InputAdder = () => {
  const [inputs, setInputs] = useState([
    { item: '', amount: 0 }, // Initial state with empty item and amount
  ]);
  const [totalAmount, setTotalAmount] = useState(0); // Use descriptive variable name

  const handleInputChange = (e, index, field) => {
    const newInputs = [...inputs];
    const value = field === 'amount' ? parseFloat(e.target.value) : e.target.value; // Handle conversion for amount
    newInputs[index] = { ...newInputs[index], [field]: value };
    setInputs(newInputs);

    const newTotalAmount = inputs.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    setTotalAmount(newTotalAmount);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { item: '', amount: 0 }]); // Add an empty item/amount pair
  };

  const deleteItem = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1); // Remove the item at the specified index
    setInputs(newInputs);

    // Recalculate total amount after deletion (optional)
    const newTotalAmount = inputs.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    setTotalAmount(newTotalAmount);
  };

  return (
    <div className="">
      {inputs.map((input, index) => (
        <div key={index} className="bg-white flex justify-center gap-4">
          <div className="w-[80%]">
            {/* Assuming FloatingLabel component from a library */}
            <FloatingLabel
              value={input.item}
              onChange={(e) => handleInputChange(e, index, 'item')}
              required
              variant="outlined"
              label="Type of service"
            />
          </div>
          <div className="">
            <input
              required
              onChange={(e) => handleInputChange(e, index, 'amount')}
              value={input.amount}
              placeholder="Amount"
              className="h-12 rounded-md border-gray-300"
              type="number"
            />
          </div>
          <div className="mt-3 cursor-pointer ml-3">
            <MdDelete className="" onClick={() => deleteItem(index)} size={25} />
          </div>
        </div>
      ))}
      <div className="p-3">
        <MdAdd onClick={handleAddInput} size={25} />
      </div>
    </div>
  );
};

export default InputAdder;
