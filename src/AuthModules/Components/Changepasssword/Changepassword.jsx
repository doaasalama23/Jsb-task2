import React from 'react'
import logo from '../../../assets/images/LOGO.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {Link ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Changepassword({handleClose}) {
    const{register,handleSubmit,formState:{errors},}=useForm();   
    const onSubmit= async(data)=>{
        let token=localStorage.getItem('admintoken');
        try{
         let response= await axios.put('https://upskilling-egypt.com:443/api/v1/Users/ChangePassword',
                data,
                { headers : {Authorization:token}}
            )
            setTimeout(toast("Wow RESET!"),2000);
            handleClose();
        }catch(error){
            toast(error.response.data.message);
        }
    //   axios.put('https://upskilling-egypt.com:443/api/v1/Users/ChangePassword',
    //   data,
    //   { headers : {Authorization:token}}
    //   )
    //   .then((response)=>{
    //    setTimeout(toast("Wow RESET!"),2000);
    //     navigate('/Login');
    //   }).catch((error)=>{
    //     toast(error.response.data.message);
    //   })
   
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
              <h5> Change  Password</h5>
              <p className='text-muted'>Please Enter Your details below</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                         <i className='fa fa-key'></i>
                      </span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="oldPassword" 
                        {...register('oldPassword',{required:'oldPassword is required'})}
                      />
                  </div>
                  {errors.oldPassword&&<span className='alert alert-danger'>{errors.oldPassword.message}</span>}
                  <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                         <i className='fa fa-key'></i>
                      </span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="newPassword" 
                        {...register('newPassword',{required:'newPassword is required'})}
                      />
                  </div>
                  {errors.newPassword&&<span className='alert alert-danger'>{errors.newPassword.message}</span>}
                  <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                         <i className='fa fa-key'></i>
                      </span>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="confirmNewPassword" 
                        {...register('confirmNewPassword',{required:'confirmNewPassword is required'})}
                      />
                  </div>
                  {errors.confirmNewPassword&&<span className='alert alert-danger'>{errors.confirmNewPassword.message}</span>}
                  <button className='w-100 btn btn-success'>Change  Password</button>
              </form>
            </div>
        </div>
        </div>
    </div>
  )
}
