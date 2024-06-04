import { Datepicker } from 'flowbite-react';
import { format } from 'date-fns';

const DatePic = ({ setFile, date }) => {
  
  let defa;
  if (date) {
    defa = new Date(date);
  } else {
    defa = new Date();
  }
  

  const handleDateChange = (date) => {
    // Update state with the selected date from the event
    let value = format(date, "yyyy-MM-dd")
    console.log(value);
    setFile(prestat=>({...prestat,"date":value}))
  };
  console.log(defa);

  return (
    
    <div className="">
      <Datepicker className='border-gray-800' defaultDate={defa}
        maxDate={new Date()} onSelectedDateChanged={handleDateChange}/>
    </div>  
        )
        
}

export default DatePic