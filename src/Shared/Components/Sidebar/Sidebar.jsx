import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import logo from '../../../assets/images/loggo.png'
import Changepassword from '../../../AuthModules/Components/Changepasssword/Changepassword';
export default function SideBar({adminData}) {
  console.log(adminData);
  const[isCollapsed,setIsCollaps]=useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <Changepassword handleClose={handleClose}/>
            </Modal.Body>
          </Modal>
     <Sidebar collapsed={isCollapsed}>
        <Menu>
        <MenuItem onClick={toggleCollapsed} icon={<div className='hamada'><img src={logo} alt='loggo' className=''/></div>}></MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
          {adminData?.userGroup=='SuperAdmin'?( <MenuItem icon={<i className='fa fa-users'></i>} component={<Link to="/dashboard/users" />}>Users</MenuItem>):('')}
          <MenuItem icon={<i className='fas fa-utensils'></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
          {adminData?.userGroup=='SystemUser'?( <MenuItem icon={<i className='fa fa-heart'></i>} component={<Link to="/dashboard/favourite" />}> Favourite</MenuItem>):('')}
          {adminData?.userGroup=='SuperAdmin'?( <MenuItem icon={<i className='fa-regular fa-calendar-days'></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>):('')}
          <MenuItem onClick={handleShow} icon={<i className='fa-solid fa-unlock-keyhole'></i>} component={<Link to="/dashboard/categories" />}> Change password</MenuItem>
          <MenuItem icon={<i className='fa-solid fa-right-from-bracket'></i>}  onClick={logOut}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
