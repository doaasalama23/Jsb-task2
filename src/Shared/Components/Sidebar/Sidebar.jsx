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
  const[isCollapsed,setIsCollaps]=useState(false);
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
          <MenuItem icon={<i className='fa fa-users'></i>} component={<Link to="/dashboard/users" />}>Users</MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard/recipes" />}> Recipes</MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>
          <MenuItem onClick={handleShow} icon={<i className='fa fa-home'></i>} component={<Link to="/dashboard/categories" />}> Change password</MenuItem>
          <MenuItem icon={<i className='fa fa-home'></i>}  onClick={logOut}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
