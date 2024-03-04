import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/images/LOGO.png';
export default function VerifyRegister() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:443/api/v1/Users/verify",
        data
      );
      let ResultToen = response.data.token;
      toast.success("vertify Done ");
          navigate("/login");
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  };
  return (
    <div>
    <ToastContainer />
<div className='row d-flex justify-content-center align-items-center'>
   <div className='col-md-12'>
       <div className='login bg-white rounded-3 px-5'>
         <div className='logo-con text-center mb-3'>
           <img src={logo} alt='logo' className='w-50'/>
         </div>
         <h5> verify account </h5>
         <p className='text-muted'>Please Enter Your Code or Check Your Inbox</p>
         <form onSubmit={handleSubmit(onSubmit)}>
             <div className="input-group mb-3">
                 <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-key'></i>
                 </span>
               <input 
                   type="email" 
                   className="form-control" 
                   placeholder="email" 
                   {...register('email',{required:'email is required'})}
                 />
             </div>
             {errors.email&&<span className='alert alert-danger'>{errors.email.message}</span>}
             <div className="input-group mb-3">
                 <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-key'></i>
                 </span>
               <input 
                   type="text" 
                   className="form-control" 
                   placeholder="code" 
                   {...register('code',{required:'code is required'})}
                 />
             </div>
             {errors.code&&<span className='alert alert-danger'>{errors.code.message}</span>}
             <button className='w-100 btn btn-success'>Submit</button>
         </form>
       </div>
   </div>
   </div>
</div>
  )
}
