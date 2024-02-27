import React from 'react'
import logo from '../../../assets/images/LOGO.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {Link ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login({saveAdminData}) {
  const navigate=useNavigate();
  const{register,handleSubmit,formState:{errors},}=useForm();   
  const onSubmit=(data)=>{
    axios.post('https://upskilling-egypt.com:443/api/v1/Users/Login',data)
    .then((response)=>{
    //  setTimeout(toast("Wow login!"),2000);
      localStorage.setItem('admintoken',(response.data.token));
      saveAdminData();
      navigate('/dashboard');
    }).catch((error)=>{
      toast(error.response.data.message);
    })
 
  };
  return (
    <div className='Auth-container vh-100'>
      <ToastContainer />
      <div className='overlay vh-100 container-fluid'>
      <div className='row vh-100 d-flex justify-content-center align-items-center'>
      <div className='col-md-6'>
          <div className='login bg-white rounded-3 px-5 py-4'>
            <div className='logo-con text-center mb-3'>
              <img src={logo} alt='logo' className='w-50'/>
            </div>
            <h3>Log In</h3>
            <p className='text-muted'>Welcome Back! Please enter your details</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-envelope'></i>
                  </span>
                  <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter your E-mail" 
                      {...register('email',{required:'email address is required',
                      // pattern:{
                      //   value:/^[A-Za-z]+$/i,
                      //   message:'not valid email',
                      // },
                    })}
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
                      placeholder="Password" 
                      {...register('password',{required:'password is required'})}
                    />
                </div>
                {errors.password&&<span className='alert alert-danger'>{errors.password.message}</span>}
                  <div className='d-flex justify-content-between my-2'>
                    <Link to='/register' className='text-success'>Register now</Link>
                    <Link to='/ForgetPass' className='text-success'>Forgetpassword</Link>
                  </div>
                <button className='w-100 btn btn-success'>Login</button>
            </form>
          </div>
      </div>
      </div>
        
      </div>
    </div>
  )
}
