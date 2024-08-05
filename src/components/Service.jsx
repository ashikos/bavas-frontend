import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

import {Link } from 'react-router-dom'

import { FaSearch } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import { Button, Modal } from 'flowbite-react';
import { FloatingLabel } from 'flowbite-react';
import  {Datepicker as FlowBiteDate}  from 'flowbite-react';

import axios from "../axios"
import Pagination from './shared/Pagination';
import File from './utils/File';
import DatePic from './utils/DatePic';
import Alertbox from './utils/Alertbox';
// import DelModal from './utils/DelModal';


const Service = () => {

  
  const [entry, setEntry ] = useState([])
  const [pages, setpages ] = useState(0)
  const [paginate, setPage  ] = useState(
    {'offset':0, "limit":10, "prev":null, "next": null})
    const [data, setData  ] = useState(
      {"vehicle":"", "reg_no":"", "contact":"", "type":"", "amount":null, "gpay":null, "date":null})
  
    const [keyWrd, setKeyWrd  ] = useState(
      {'search':"", "start":"", "end":""})
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [uploadModal, setuploadModal] = useState(false);
  const [excel, setExcel] = useState({"file":null, "date":format(new Date(), "dd-MM-yyyy")});
  const [errorMessage, setError] = useState({title:null, color:"success", message:null});


  const fetchData = async () => {   
    // api to call entries of bavas  
    try {
        const response = await axios.get(
          `sales/entry/?offset=${paginate["offset"] * paginate["limit"]}&limit=${paginate["limit"]}&search=${keyWrd["search"]}&start_date=${keyWrd["start"]}&end_date=${keyWrd["end"]}`);
        setEntry(response.data.results)
        console.log(entry);
        let entry_count = response.data.count
        let result = Math.ceil(entry_count / paginate['limit']);
        setpages(result)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const setDatanull = ()=> {
  setData({"vehicle":"", "reg_no":"", "contact":"", "type":"", "amount":null, "gpay":null, "date":null})
  setExcel({"file":null, "date":format(new Date(), "dd-MM-yyyy")})
}

const setModalClose = ()=>{
  setDatanull()
  setAddModal(false)
  setuploadModal(false)
  setEditModal(false)
}

const handlePen = async (item)=> {

    setEditModal(item)
    console.log(item.date);
    setData({
      "vehicle":item.vehicle,
       "reg_no":item.reg_no,
        "contact":item.contact,
        "type":item.type, 
        "amount":item.amount,
        "gpay":item.gpay, 
        "date":new Date(item.date)    })
}

  useEffect(() => {
        fetchData();
    }, [paginate, keyWrd]);

    async function handleAlertBox(){
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    setError(prestat=>({...prestat, message:null, title:null}))
  }

  const handleUploadBtn = async ()=>{
        console.log(excel["date"]);
        if (!excel["file"]){
          console.log('select a file to upload');
          return;
        }
      
      const formData = new FormData(); 
      formData.append("excel", excel["file"]);
      formData.append("date", excel["date"]);


        axios.post('sales/excel/', formData)
        .then(response => {
          // Handle success response
          console.log('File uploaded successfully');
          setError(prestat=>({...prestat,title:'Success', message:'File uploaded successfully', color:"success"}))
          handleAlertBox()
        })
        .catch(error => {
          // Handle error
          console.error('Error uploading file:', error);
          setError(prestat=>({...prestat,title:'Info Alert', message:error.response.data.detail, color:"failure"}))
          handleAlertBox()
        })
        .finally(() => {
          setModalClose();
          fetchData();
        });
      };

  const handleEditButton =  async()=>{
    let id = editModal.id
    let patch_data = data
    patch_data["date"] = format(data["date"], "yyyy-MM-dd")
    axios.patch(`sales/entry/${id}/`, patch_data)
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

    if (!data['date']){
    let defa = new Date();
    let value = format(defa, "yyyy-MM-dd")
    console.log(value);
    setData(prestat=>({...prestat,"date":value}))
    }
      if (data['vehicle']==="" && data['reg_no']==="")  {
          return ;
      }
      console.log(data);
      try {
        // Make the POST request using Axios
        const response = await axios.post('sales/entry/', data, {
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
    }

const handleDelete = async (id)=> {

   axios.delete(
    `sales/entry/${id}/`);

    fetchData()
    setDelModal(false)
  }

  const handleDate =  (e)=> {

   console.log(e.target.value);
   }

  

     
  return (
    
    <div className='bg-white h-[92vh] overflow-x-auto relative'>

      {/* search and filter */}
      <div className="p-10 pb-3 pr-[6vh] items-center flex justify-between"> 
      <div className="flex gap-4">
        <div className="relative">
              <FaSearch size={20} className='absolute ml-2 top-1/2 -translate-y-1/2 text-neutral-400' />
              <input onChange={(e)=>{setKeyWrd(prestat=>({...prestat, "search":e.target.value}))}} className='border h-10 w-[24rem] px-2 pl-9 rounded-md border-gray-300  outline-none active:outline-none ' type="text" placeholder='search...' value={keyWrd["search"]} />

        </div>
        <div className="flex gap-4 ml-16">
            {/* <FlowBiteDate className='border-gray-800'
          maxDate={new Date() } 
          placeholder='select date'
          onSelectedDateChanged={(date)=>{setKeyWrd(prestat=>({...prestat, "start":format(date, 'yyyy-MM-dd')}))}}
          /> */}
          <input type="date" className='border-gray-300 rounded-md text-gray-500' name="" onChange={(e)=>setKeyWrd(prestat=>({...prestat, "start":e.target.value}))} />
          <span class=" text-gray-500 py-2">to</span>
          <input type="date" className='border-gray-300 rounded-md text-gray-500' name="" onChange={(e)=>setKeyWrd(prestat=>({...prestat, "end":e.target.value}))} />
          {/* <FlowBiteDate className='border-gray-800'
          maxDate={new Date()} 
          onSelectedDateChanged={(date)=>{setKeyWrd(prestat=>({...prestat, "end":format(date, 'yyyy-MM-dd')}))}}/> */}
        </div>
      </div>
      
     
      <div className="flex gap-4 h-10">
        <button onClick={() => setAddModal(true)} className='hover:bg-gray-900 hover:text-white font-medium cursor-pointer border border-gray-900 rounded-lg text-black w-[7rem]'> Add</button>
        <button onClick={()=> setuploadModal(true)} className='hover:bg-gray-900 hover:text-white font-medium cursor-pointer border border-gray-900 rounded-lg text-black w-[7rem]'> Upload</button>
      </div>

      {/* modal for adding an entry */}
      <Modal show={addModal} size="2xl" onClose={setModalClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">Add vehicle here</h3>
            <div className='flex items-center justify-start gap-4 font-sans text-3xl'>
              <div className="mb-2 block w-[50%] ">
            
              <FloatingLabel value={data["vehicle"]}
                onChange={(event) => setData(prevset=>({...prevset, "vehicle":event.target.value}))}
                required variant="outlined" label="Vehicle" />
              </div>
              <div className="mb-2 block w-[50%]">
              <FloatingLabel value={data["reg_no"]} label="Reg. no" 
                onChange={(event) => setData(prevset=>({...prevset, "reg_no":event.target.value}))}
                required variant="outlined" />
              </div>
            </div>
            <div>
            <div className="mb-5 block w-[100%]">
            <DatePic  setFile={setData}/>
              </div>
              <div className='flex items-center justify-start gap-4 font-sans text-3xl'>
              <div className="mt-4 block w-[50%] ">
              <FloatingLabel value={data["contact"]} label="Contact" 
                onChange={(event) => setData(prevset=>({...prevset, "contact":event.target.value}))}
                required variant="outlined" />
              </div>
              <div className="mt-4 block w-[50%]">
              <FloatingLabel value={data["type"]}  label="Service" 
                onChange={(event) => setData(prevset=>({...prevset, "type":event.target.value}))}
                required variant="outlined"/>
              </div>
            </div>
            <div className='flex mt-3 items-center justify-start gap-4 font-sans text-3xl'>
              <div className="mt-4 block w-[50%] ">
              <FloatingLabel value={data["amount"]} label="amount" 
                onChange={(event) => setData(prevset=>({...prevset, "amount":event.target.value}))}
                required variant="outlined" />
              </div>
              <div className="mt-4 block w-[50%]">
              <FloatingLabel value={data["regpayg_no"]} label="Gpay"
                onChange={(event) => setData(prevset=>({...prevset, "gpay":event.target.value}))}
                required variant="outlined"  />
              </div>
            </div>
            </div>
            
            <div className="w-full flex gap-4">
              <Button onClick={handleAddButton} className='w-[30%] h-14 bg-gray-900'>Save</Button>
              <Button className='w-[30%] h-14 bg-slate-400' onClick={setModalClose}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>    

      {/* modal for upload file */}
      <Modal show={uploadModal} onClose={setModalClose}>
        <Modal.Header>Upload file here</Modal.Header>
        <Modal.Body>
          <div className="mb-2">
              <DatePic setFile={setExcel} excel={excel}/>
          </div>

          <div className="space-y-6">
            <File setFile={setExcel} excel={excel}/>
          </div>
          <div className='flex gap-2'>
          <button onClick={handleUploadBtn} className='hover:bg-gray-700 hover:text-white font-medium cursor-pointer border border-gray-900 rounded-lg mt-2 text-white w-[7rem] h-10 bg-gray-900'> Upload</button>
          <button onClick={setModalClose} className='hover:bg-gray-100 font-medium cursor-pointer border border-gray-900 rounded-lg mt-2 text-black w-[7rem] h-10 bg-white'> Cancel</button>
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
                        <th scope="col" class="px-6 py-3"> Vehicle </th>
                        <th scope="col" class="px-6 py-3"> Reg no </th>
                        <th scope="col" class="px-6 py-3"> Date </th>
                        <th scope="col" class="px-6 py-3"> Contact </th>
                        <th scope="col" class="px-6 py-3"> Service </th>
                        <th scope="col" class="px-6 py-3"> Amount </th>
                        <th scope="col" class="px-6 py-3"> Gpay </th>
                        <th scope="col" class="px-6 py-3"> <span class="sr-only">Edit</span> </th>
                    
                    </tr>
                </thead>
                <tbody>
                { 
                    entry.map((item)=> {
                        const td_class = 'px-6 py-0 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        return <>
                        <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 leading-0">
                        <th scope="row" class={td_class}> {item.vehicle} </th>
                        <td class={td_class}> {item.reg_no} </td>
                        <td class={td_class}> {format(item.date, "dd/MM/yyyy")} </td>
                        <td class={td_class}> {item.contact} </td>
                        <td class={td_class}> {item.type} </td>
                        <td class={td_class}> {item.amount} </td>
                        <td class={td_class}> {item.gpay} </td>
                        <td class="px-6 py-4 text-right">
                             <button onClick={() => handlePen(item)} className='hover:text-gray-900 rounded-sm p-1 hover:scale-125  duration-200'><MdEdit size={20}/> </button>
                             <button onClick={() => setDelModal(item.id)} className='hover:text-red-600 rounded-sm p-1 ml-5 hover:scale-125  duration-200'><MdDelete size={20}/> </button>     
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
                          Yes, I'm sure
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
            <Modal show={editModal} size="2xl" onClose={setModalClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">Edit Vehicle</h3>
            <div className='flex items-center justify-start gap-4 font-sans text-3xl'>
              <div className="mb-2 block w-[50%] ">
            
              <FloatingLabel value={data["vehicle"]}
                onChange={(event) => setData(prevset=>({...prevset, "vehicle":event.target.value}))}
                required variant="outlined" label="Vehicle" />
              </div>
              <div className="mb-2 block w-[50%]">
              <FloatingLabel value={data["reg_no"]} label="Reg. no" 
                onChange={(event) => setData(prevset=>({...prevset, "reg_no":event.target.value}))}
                required variant="outlined" />
              </div>
            </div>
            <div>
            <div className="mb-5 block w-[100%]">
            <DatePic  setFile={setData} date={data["date"]}/>
              </div>
              <div className='flex items-center justify-start gap-4 font-sans text-3xl'>
              <div className="mt-4 block w-[50%] ">
              <FloatingLabel value={data["contact"]} label="Contact" 
                onChange={(event) => setData(prevset=>({...prevset, "contact":event.target.value}))}
                required variant="outlined" />
              </div>
              <div className="mt-4 block w-[50%]">
              <FloatingLabel value={data["type"]}  label="Service" 
                onChange={(event) => setData(prevset=>({...prevset, "type":event.target.value}))}
                required variant="outlined"/>
              </div>
            </div>
            <div className='flex mt-3 items-center justify-start gap-4 font-sans text-3xl'>
              <div className="mt-4 block w-[50%] ">
              <FloatingLabel value={data["amount"]} label="Cash" 
                onChange={(event) => setData(prevset=>({...prevset, "amount":event.target.value}))}
                required variant="outlined" />
              </div>
              <div className="mt-4 block w-[50%]">
              <FloatingLabel value={data["gpay"]} label="Gpay"
                onChange={(event) => setData(prevset=>({...prevset, "gpay":event.target.value}))}
                required variant="outlined"  />
              </div>
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

      <Alertbox errorMessage={errorMessage}/>

      </div>
          
      
      Products  <Link to='/' >go to Dashboard</Link></div>
  )
}

export default Service