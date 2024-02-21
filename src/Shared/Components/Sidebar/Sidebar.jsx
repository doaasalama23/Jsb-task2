import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../assets/images/loggo.png'
export default function SideBar() {
  const[isCollapsed,setIsCollaps]=useState(false);
  const toggleCollapsed=()=>{
    setIsCollaps(!isCollapsed);
  };
  let navigate=useNavigate();
  let logOut=()=>{
    localStorage.removeItem('admintoken');
    navigate('/login');
  };
  return (
    <div className='sidebar-container'>
     <Sidebar collapsed={isCollapsed}>
        <Menu>
        <MenuItem onClick={toggleCollapsed} icon={<div className='hamada'><img src={logo} alt='loggo' className=''/></div>}></MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
          <MenuItem icon={<i className='fa fa-users'></i>} component={<Link to="/dashboard/users" />}>Users</MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard/categories" />}> Change password</MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>}  onClick={logOut}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
