import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

import {Link } from 'react-router-dom'

import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IoIosCloseCircleOutline, IoMdPrint } from "react-icons/io";

import { Button, Modal, FloatingLabel, Datepicker as FlowBiteDate } from 'flowbite-react';
import { FaRegCheckCircle } from "react-icons/fa";

import axios from "../axios"
import Pagination from './shared/Pagination';
import DatePic from './utils/DatePic';
import AddInput from './utils/AddInput';
// import DelModal from './utils/DelModal';


const Bills = () => {

  
  const [entry, setEntry ] = useState([])
  const [pages, setpages ] = useState(0)
  const [paginate, setPage  ] = useState(
    {'offset':0, "limit":10, "prev":null, "next": null})
  const [data, setData  ] = useState(
      {"customer":"", "reg_no":"", "received":false, "amount":null, "balance":0, "date":null})
  
    const [keyWrd, setKeyWrd  ] = useState(
      {'search':"", "start":"", "end":""})
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [inputs, setInputs] = useState([{"item":"", "amount":0}]);
  const [t_amount, set_amount] = useState(0);



  const fetchData = async () => {   
    // api to call entries of bavas  
    try {
        const response = await axios.get(
          `/sales/bill/?offset=${paginate["offset"] * paginate["limit"]}&limit=${paginate["limit"]}&search=${keyWrd["search"]}&start_date=${keyWrd["start"]}&end_date=${keyWrd["end"]}`);
        setEntry(response.data.results)
        let entry_count = response.data.count
        let result = Math.ceil(entry_count / paginate['limit']);
        setpages(result)
        console.log(response.data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const setDatanull = ()=> {
  setData({"customer":"", "reg_no":"", "contact":"", "type":"", "amount":null, "gpay":null, "date":null, "received": false})
  setInputs([{"item":"", "amount":0}]);
}

const setModalClose = ()=>{
  setDatanull()
  setAddModal(false)
  setEditModal(false)
}

const handlePen = async (bill)=> {

    setEditModal(bill)
    setData({
      "customer":bill.customer,
       "reg_no":bill.reg_no,
        "amount":bill.amount,
        "balance":bill.balance,
        "received":bill.received, 
        "date":new Date(bill.date)})
    setInputs(bill.items)
}


  useEffect(() => {
        fetchData();
        const newTotalAmount = inputs.reduce((acc, item) => acc + parseFloat(item.amount), 0);
        set_amount(newTotalAmount);
        console.log(t_amount);
    }, [paginate, keyWrd, inputs]);


  const handleEditButton =  async()=>{
    let id = editModal.id
    let patch_data = data
    patch_data["amount"] = t_amount
    patch_data["date"] = format(data["date"], "yyyy-MM-dd")
    patch_data["items"] = inputs
    
    axios.patch(`/sales/bill/${id}/`, patch_data)
    .then(response=>{
      console.log('PATCH request successful:', response.data);
      fetchData()
      setModalClose()
    })
    .catch(error=>{
      console.error('Error making PATCH request:', error);
    })
    
  }

  const handleAddButton = async ()=> {

      if ((data['customer']==="") && (data['reg_no']==="") ) {
          return ;
      }
      let add_data = data;
      add_data["items"] = inputs
      add_data["amount"] = t_amount

      try {
        // Make the POST request using Axios
        const response = await axios.post('/sales/bill/', JSON.stringify(add_data), {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status < 200 || response.status >= 300) {
          setDatanull();
          setAddModal(false);
          throw new Error('Entry not updated');
        } else {
          console.log('Entry uploaded successfully');
          setDatanull();
          setAddModal(false);
        }
      } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error uploading data:', error);
      }
        fetchData();



      // fetch('http://localhost:8000/sales/bill/', {
      //   method: 'POST',
      //   headers: {"Content-Type":'application/json'},
      //   body: JSON.stringify(add_data)
      // }).then(response=>{
      //   if (!response.ok){
      //     setDatanull()
      //     setAddModal(false)
      //     throw new Error('Entry not updated')
      //   }else{
      //     console.log('Entry uploaded successfully');
      //     setDatanull()
      //     setAddModal(false)
      //   }
      // }).catch(error => {
      //   // Handle error
      //   console.error('Error uploading data:', error);
      // })
      
    }

    const handleDelete = async (id)=> {

      try{
        axios.delete(
          `sales/bill/${id}/`);
      } catch(error){
        console.error('Error uploading data:', error);
        // setError(prestat=>({...prestat,title:'Info Alert', message:error.response.data.detail, color:"failure"}))
        // handleAlertBox()
      }
      finally{
        fetchData()
        setDelModal(false)
      }
      fetchData()
      }

const handlePrint = async(id)=>{
  try{
    const response = await axios.get(
      `/sales/billtopdf/${id}/`, { responseType: 'arraybuffer' }
    )
  console.log(typeof(response.data));
   const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

    // Create a URL for the blob object
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(pdfUrl, '_blank');
  } catch (error) {
    console.error('Error fetching PDF:', error);
  }
};

     
  return (
    
    <div className='bg-white h-[92vh] overflow-x-auto'>

      {/* search and filter */}
      <div className="p-10 pb-3 pr-[6vh] items-center flex justify-between"> 
      <div className="flex gap-4">
        <div className="relative">
              <FaSearch size={20} className='absolute ml-2 top-1/2 -translate-y-1/2 text-neutral-400' />
              <input onChange={(e)=>{setKeyWrd(prestat=>({...prestat, "search":e.target.value}))}} className='border h-10 w-[24rem] px-2 pl-9 rounded-md border-gray-300  outline-none active:outline-none ' type="text" placeholder='search...' value={keyWrd["search"]} />

        </div>
        <FlowBiteDate className='border-gray-800'
        maxDate={new Date() } 
        placeholder='select date'
        onSelectedDateChanged={(date)=>{setKeyWrd(prestat=>({...prestat, "start":format(date, 'yyyy-MM-dd')}))}}
        />
        <span class=" text-gray-500 py-2">to</span>
        <FlowBiteDate className='border-gray-800'
        maxDate={new Date()} 
        onSelectedDateChanged={(date)=>{setKeyWrd(prestat=>({...prestat, "end":format(date, 'yyyy-MM-dd')}))}}/>
      </div>
     
      <div className="flex gap-4 h-10">
      <button onClick={() => setAddModal(true)} className='hover:bg-gray-900 hover:text-white font-medium cursor-pointer border border-gray-900 rounded-lg text-black w-[7rem]'> Add Bill</button>
      </div>

      {/* modal for adding an entry */}
      <Modal show={addModal} size="7xl" onClose={setModalClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">Edit Vehicle</h3>
            <div className='flex items-center justify-center gap-4 font-sans text-3xl'>
              <div className="mb-2 block w-[33%] ">
            
              <FloatingLabel value={data["customer"]}
                onChange={(event) => setData(prevset=>({...prevset, "customer":event.target.value}))}
                required variant="outlined" label="Customer" />
              </div>
              <div className="mb-2 block  w-[33%]">
              <FloatingLabel value={data["reg_no"]} label="Reg. no" 
                onChange={(event) => setData(prevset=>({...prevset, "reg_no":event.target.value}))}
                required variant="outlined" />
              </div>
              <div className="mb-5 block  w-[33%]">
                {/* <DatePic  setFile={setData} date={data["date"]}/> */}
                <input type="date" className='border-gray-300 rounded-md text-gray-500' name="" onChange={(e)=>setKeyWrd(prestat=>({...prestat, "end":e.target.value}))} />
              </div>
            </div>
            <AddInput inputs={inputs} setInputs={setInputs} set_amount={set_amount}/>
            <div>
              <div className='flex items-center justify-start gap-4 font-sans text-3xl'>
              <div className="mt-4 block w-[50%] ">
              <FloatingLabel value={t_amount} label="Amount"  type='number'
                onChange={(event) => setData(prevset=>({...prevset, "amount":event.target.value}))}
                required variant="outlined" />
              </div>
              <div className="mt-4 block w-[50%]">
              <FloatingLabel value={data["balance"]}  label="Balance" 
                onChange={(event) => setData(prevset=>({...prevset, "balance":event.target.value}))}
                required variant="outlined"/>
              </div>
            </div>
            <div className='flex mt-3 items-center justify-start gap-4 font-sans text-3xl'>
              <input defaultChecked={data['received'] ? true: false} type="checkbox"
              onChange={(event) => setData(prevset=>({...prevset, "received":event.target.checked}))} size={20} className='rounded-md text-black text-sm'/> <span className='text-xl'> Recieved</span>
            </div>
            </div>
            
            <div className="w-full flex gap-4">
              <Button onClick={handleAddButton} className='w-[30%] h-14 bg-gray-900'>Add</Button>
              <Button className='w-[30%] h-14 bg-slate-400' onClick={(addModal)=>setModalClose(addModal)}>Cancel</Button>
            </div>
            
          </div>
        </Modal.Body>
      </Modal>
      </div>



       {/* tables for showing service details  */}
      <div className="m-10 mt-5"> 
      
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3"> Customer </th>
                        <th scope="col" class="px-6 py-3"> Date </th>
                        <th scope="col" class="px-6 py-3"> Reg no </th>
                        <th scope="col" class="px-6 py-3"> Amount </th>
                        <th scope="col" class="px-6 py-3"> Received  </th>
                        <th scope="col" class="px-6 py-3"> <span class="sr-only">Edit</span> </th>
                    </tr>
                </thead>
                <tbody>
                { 
                    entry.map((bill)=> {
                        const td_class = ' px-6 py-0 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        return <>
                        <tr key={bill.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 leading-0">
                          <th scope="row" class={td_class}> {bill.customer} </th>
                          <td class={td_class}> {format(bill.date, "dd/MM/yyyy")} </td>
                          <td class={td_class}> {bill.reg_no} </td>
                          <td class={td_class}> {bill.amount} </td>
                          <td className="pl-10 align-middle py-0 font-bold text-gray-900" > {bill.received ? <FaRegCheckCircle color='green' /> : <IoIosCloseCircleOutline color={"red"} size={20}  />}  </td>
                          <td class=" py-4 text-right">
                              <button onClick={() => handlePen(bill)} className='hover:text-gray-900 rounded-sm p-1 hover:scale-125  duration-200'><MdEdit size={20} /> </button>
                              <button onClick={() => setDelModal(bill.id)} className='hover:text-red-600 rounded-sm p-1 ml-5 hover:scale-125  duration-200'><MdDelete size={20}/> </button>  
                              <button onClick={() => handlePrint(bill.id)} className='hover:text-black rounded-sm p-1 ml-5 hover:scale-125  duration-200'><IoMdPrint size={20}/> </button>     
                          </td>
                    </tr>
                        </>
                    
                    })           
                }   {/* model for caution delete */}
                {/* <DelModal delModal={delModal} setDelModal={setDelModal} handleDelete={handleDelete}/> */}
                <Modal show={delModal} size="md" onClose={() => setDelModal(false)} popup>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this entry?
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button color="failure"  onClick={() => handleDelete(delModal)}>
                          {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setDelModal(false)}>
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                </tbody>
            </table>

        {/* modal for edit vehicle */}
        <Modal show={editModal} size="7xl" onClose={setModalClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">Edit Vehicle</h3>
            <div className='flex items-center justify-center gap-4 font-sans text-3xl'>
              <div className="mb-2 block w-[33%] ">
            
              <FloatingLabel value={data["customer"]}
                onChange={(event) => setData(prevset=>({...prevset, "customer":event.target.value}))}
                required variant="outlined" label="Customer" />
              </div>
              <div className="mb-2 block  w-[33%]">
              <FloatingLabel value={data["reg_no"]} label="Reg. no" 
                onChange={(event) => setData(prevset=>({...prevset, "reg_no":event.target.value}))}
                required variant="outlined" />
              </div>
              <div className="mb-5 block  w-[33%]">
                {/* <DatePic  setFile={setData} date={data["date"]}/>
                {console.log(data.date)} */}
                <input type="date" className='border-gray-300 rounded-md text-gray-500' value={data['date']} onChange={(e)=>setKeyWrd(prestat=>({...prestat, "end":e.target.value}))} />
              </div>
            </div>
            <AddInput inputs={inputs} setInputs={setInputs} set_amount={set_amount}/>
            <div>
              <div className='flex items-center justify-start gap-4 font-sans text-3xl'>
              <div className="mt-4 block w-[50%] ">
              <FloatingLabel value={t_amount} label="Amount"  type='number'
                onChange={(event) => setData(prevset=>({...prevset, "amount":event.target.value}))}
                required variant="outlined" />
              </div>
              <div className="mt-4 block w-[50%]">
              <FloatingLabel value={data["balance"]}  label="Balance" 
                onChange={(event) => setData(prevset=>({...prevset, "balance":event.target.value}))}
                required variant="outlined"/>
              </div>
            </div>
            <div className='flex mt-3 items-center justify-start gap-4 font-sans text-3xl'>
              <input defaultChecked={data['received'] ? true: false} type="checkbox"
              onChange={(event) => setData(prevset=>({...prevset, "received":event.target.checked}))} size={20} className='rounded-md text-black text-sm'/> <span className='text-xl'> Recieved</span>
            </div>
            </div>
            
            <div className="w-full flex gap-4">
              <Button onClick={handleEditButton} className='w-[30%] h-14 bg-gray-900'>Save</Button>
              <Button className='w-[30%] h-14 bg-slate-400' onClick={(editModal)=>setModalClose(editModal)}>Cancel</Button>
            </div>
            
          </div>
        </Modal.Body>
      </Modal>
        </div>
        <div className='items-center'>
            <Pagination paginate={paginate} setPage={setPage} pages={pages}/>
        </div>    
      </div>
      <div>
      </div>
          
      
      Products  <Link to='/' >go to Dashboard</Link></div>
  )
}

export default Bills