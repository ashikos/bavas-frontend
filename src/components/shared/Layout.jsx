import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { FaSearch, FaBell } from "react-icons/fa";

import Alertbox from '../utils/Alertbox';

const Layout = () => {
  return (
    <div className='flex flex-row h-full w-screen bg-neutral-300'>
        <Sidebar />
        <div className='flex-1'>
          <Header/>
          <div className="relative">
            {<Outlet/>}
            <Alertbox className='absolute ' />
          </div>
          
        </div>
    </div>
  )
}

export default Layout