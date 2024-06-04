import React from 'react'
import { Routes, BrowserRouter as Router, Route, } from 'react-router-dom'
import Layout from '../../components/shared/Layout'
import Dashboard from '../../components/Dashboard'
import Service from '../../components/Service'
import Orders from '../../components/Orders'
import Bills from '../../components/Bills'
import Login from '../login/Login'
import Customer from '../../components/Customer'

const Main = () => {
  return (
    <div className="flex flex-row h-screen w-full bg-slate-200">
            <Router>
              <Routes>
                <Route path='/' element={<Layout/>}>
                  <Route index element={<Dashboard/>} />
                  <Route path='service' element={<Service/>} />
                  <Route path='dashboard' element={<Dashboard/>} />
                  <Route path='orders' element={<Orders/>} />
                  <Route path='bills' element={<Bills/>} />
                  <Route path='customers' element={<Customer/>} />
                </Route>
                <Route path='/login' element={<Login/>}>
                  
                  
                </Route>
              </Routes>
            </Router>
            
            
    </div>
  )
}

export default Main