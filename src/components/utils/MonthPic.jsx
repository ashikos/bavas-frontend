import { Datepicker } from 'flowbite-react';
import { format } from 'date-fns';

const MonthPic = ({ setFile, date }) => {
  
  let defa;
  console.log(date);
  
  if (date) {
    console.log(1111, date);
    defa = new Date(date);
  } else {
    console.log(22222, date);
    defa = new Date();
  }
  

  const handleDateChange = (date) => {
    // Update state with the selected date from the event
    let value = format(date, "yyyy-MM-dd")
    console.log(3333, value);
    setFile(prestat=>({...prestat,"date":value}))
  };
  console.log(defa);

  return (
    
    <div class="relative">
        <input datepicker type="text" datepicker-format="MM yyyy" datepicker-autohide="true"
            class="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Select month" />
    </div>
        )
        
}

export default MonthPic