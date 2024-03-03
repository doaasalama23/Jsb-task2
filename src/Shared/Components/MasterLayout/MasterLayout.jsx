import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout({adminData}) {
  return (
    <div className='d-flex'>

      <div className=''>
        <SideBar adminData={adminData}/>
      </div>
      <div className='w-100'>
        <Navbar adminData={adminData}/>
        <Outlet/>
      </div>
    </div>
  )
}
