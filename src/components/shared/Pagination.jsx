import React from 'react'
import ReactPaginate from 'react-paginate';
// import { Pagination } from 'flowbite-react';


const Pagination = (props) => {


  const pages = props.pages
     
  const handlePageClick = (event) => {
    props.setPage(prevState=>({...prevState, 'offset': event.selected}))
  };

  return (
  
 <div className="">
  <ReactPaginate 
        breakLabel="..."
        nextLabel={<button
                  class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button">      Next         
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                      aria-hidden="true" class="w-4 h-4 text-black transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                    </svg>
                    </button>
                    }
                    

        onPageChange={handlePageClick}
        // pageRangeDisplayed={5}
        pageCount={pages}
        previousLabel={
              <button
                class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                  aria-hidden="true" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                Previous
              </button>
        }
        containerClassName='flex justify-center items-center mt-4'
        pageClassName='hover:bg-gray-200 m-2 items-center border bolrder-solid border-gray-100 w-10 h-10 flex justify-center  rounded-md'
        activeClassName="bg-gray-800 text-gray-white hover:bg-gray-800"
      /> 
  </div>

  )



















//   return (
      
//   <div class="flex items-center gap-4 justify-center mt-3">
          

  // <button disabled={offset===0} onClick={()=>handleArrow("prev")}
  //   class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  //   type="button">
  //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
  //     aria-hidden="true" class="w-4 h-4">
  //     <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
  //   </svg>
  //   Previous
  // </button>
//   <div class="flex items-center gap-2">

     
//     {Array.from({length: pages}).map((_, index)=>{
        
//         return (
//         <button key={index} onClick={()=>handleNumButtom(index)}
//         class={classNames(index===offset ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-200" ,"relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase  transition-all   active:bg-gray-900/20 active:text-black disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" )}
//         type="button">
//         <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//           {index + 1}
//         </span>
//       </button> )
//       })}

//   </div>
  // <button disabled={offset===(pages-1)} onClick={()=>handleArrow("next")}
  //   class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  //   type="button">
  //   Next
  //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
  //     aria-hidden="true" class="w-4 h-4">
  //     <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
  //   </svg>
  // </button>
// </div> 
   
//   )
}




export default Pagination
