import React from 'react'
import {useNavigate} from 'react-router-dom'
export default function Sidebar() {
  let navigate=useNavigate();
  let logOut=()=>{
    localStorage.removeItem('admintoken');
    navigate('/login');
  };
  return (
    <div>
     <h1>Side</h1>
     <button className='btn btn-danger' onClick={logOut}>Logout</button>
    </div>
  )
}
