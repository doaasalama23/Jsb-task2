import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default function MasterLayout({adminData}) {
  return (
    <div className='container-fluid'>
      <div className='row'>
      <div className='col-md-3'>
        <Sidebar/>
      </div>
      <div className='col-md-9'>
        <Navbar adminData={adminData}/>
        <Header/>
        <Outlet/>
      </div>
      </div>
    </div>
  )
}
