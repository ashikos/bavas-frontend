import React from 'react'
import {Fragment} from 'react'
import { FaSearch, FaBell } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { Popover, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { useLocation } from 'react-router-dom'

import { Avatar } from "flowbite-react";

const Header = () => {

  const {pathname} = useLocation()

  const capitalizedPath = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

  return (
    <div className='items-center px-5 h-[8vh]  bg-white flex justify-between border-b border-gray-200 '>
        <div className="relative">
            <h1 className='pl-10 text-4xl font-bold font-serif'> {capitalizedPath}</h1>
        </div>
        <div className="flex gap-4 mr-4 ">
        <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className={classNames(open && 'bg-gray-100'  ,
                 "hover:text-opacity-100 rounded-md items-center text-gray-900 outline-none p-2 active:bg-gray-100 inline-flex")}>
              <MdMessage size={28}/>
              
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1" >
                
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80 ">
                
                 <div className="bg-white px-2 py-2.5 rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                    <strong className='text-gray-700 font-medium text-xl'> Message</strong>
                    <div className="text-gray-700 font-medium text-xl mt-2"> This is message panel</div>
                 </div>

                </Popover.Panel> 
              </Transition>
            
             </>)}
            


         </Popover>

         <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className={classNames(open && 'bg-gray-100'  ,
                 "hover:text-opacity-100 rounded-md items-center text-gray-900 outline-none p-2 active:bg-gray-100 inline-flex")}>
              <FaBell size={28}/>
              
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1" >
                
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80 ">
                
                 <div className="bg-white px-2 py-2.5 rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                    <strong className='text-gray-700 font-medium text-xl'> Notifications</strong>
                    <div className="text-gray-700 font-medium text-xl mt-2"> Newsletter</div>
                    <div className="text-gray-700 font-medium text-xl mt-2"> Blogs</div>
                    <div className="text-gray-700 font-medium text-xl mt-2"> Career</div>
                 </div>

                </Popover.Panel> 
              </Transition>
            
             </>)}
            


         </Popover>

         <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />

        </div>
    </div>
  )
}

export default Header