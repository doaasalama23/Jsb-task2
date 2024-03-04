import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/images/LOGO.png';
export default function Register() {
    const navigate=useNavigate();
    const{register,handleSubmit,formState:{errors},}=useForm(); 
    const appendToFormData=(data)=>{
        let formData=new FormData();
            formData.append('email',data.email);
            formData.append('userName',data.userName);
            formData.append('country',data.country);
            formData.append('phoneNumber',data.phoneNumber);
            formData.append('password',data.password);
            formData.append('confirmPassword',data.confirmPassword);
            formData.append('profileImage',data.profileImage[0]);
        return formData;
    }; 
    const onSubmit = async (data) => {
        console.log(data);
        let registerFormData = appendToFormData(data);
        try {
          let response = await axios.post(
            "https://upskilling-egypt.com:443/api/v1/Users/Register",
            registerFormData
          );
          toast.success("Registeration Done ");
             navigate("/verifyRegister");
        } catch (errors) {
          toast.error(errors.response.data.message);
        }
      };
  return (
    <div>
         <div className='Auth-container vh-100'>
        <ToastContainer />
        <div className='overlay vh-100 container-fluid'>
        <div className='row vh-100 d-flex justify-content-center align-items-center'>
        <div className='col-md-6'>
            <div className='login bg-white rounded-3 px-5 py-4'>
              <div className='logo-con text-center mb-3'>
                <img src={logo} alt='logo' className='w-50'/>
              </div>
              <h5> Register</h5>
              <p className='text-muted'>Welcome Back!please,enter your details</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                     <div className='col-md-6'>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                            <i className='fa fa-envelope'></i>
                            </span>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Enter your E-mail" 
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                      message: "Email not valid",
                                    },
                                  })}
                            />
                        </div>
                         {errors.email&&<span className='alert alert-danger'>{errors.email.message}</span>}
                     </div>
                     <div className='col-md-6'>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                            <i className='fa fa-user'></i>
                            </span>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your user name" 
                                {...register('userName',{required:'userName is required',
                            })}
                            />
                        </div>
                         {errors.userName&&<span className='alert alert-danger'>{errors.userName.message}</span>}
                     </div>
                </div>
                <div className='row'>
                     <div className='col-md-6'>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                            <i className='fa fa-home'></i>
                            </span>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your country" 
                                {...register('country',{required:'country is required',
                            })}
                            />
                        </div>
                         {errors.country&&<span className='alert alert-danger'>{errors.country.message}</span>}
                     </div>
                     <div className='col-md-6'>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                            <i className='fa fa-phone'></i>
                            </span>
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Enter your phone" 
                                {...register('phoneNumber',{required:'phoneNumber is required',
                            })}
                            />
                        </div>
                         {errors.phoneNumber&&<span className='alert alert-danger'>{errors.phoneNumber.message}</span>}
                     </div>
                </div>
                <div className='row'>
                     <div className='col-md-6'>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            <i className='fa fa-key'></i>
                            </span>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Enter your password" 
                                {...register('password',{required:'password is required',
                            })}
                            />
                        </div>
                         {errors.password&&<span className='alert alert-danger'>{errors.password.message}</span>}
                     </div>
                     <div className='col-md-6'>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            <i className='fa fa-key'></i>
                            </span>
                            <input 
                                type="passwod" 
                                className="form-control" 
                                placeholder="confrim your Password" 
                                {...register('confirmPassword',{required:'confirmPassword is required',
                            })}
                            />
                        </div>
                         {errors.confirmPassword&&<span className='alert alert-danger'>{errors.confirmPassword.message}</span>}
                     </div>
                </div>
                <div className='row'>
                     <div className='col-md-12'>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            <i className='fa fa-file'></i>
                            </span>
                            <input 
                                type="file" 
                                className="form-control" 
                                placeholder="No file chose"
                          {...register("profileImage")}
                            />
                        </div>
                     </div>
                </div>
                <div className="d-flex justify-content-end my-2">
                    <Link to={"/login"} className="text-success">
                      Login Now?
                    </Link>
                  </div>
                  <div className="row justify-content-center">
                  {/* <Link to={"/verifyRegister"} className="w-75 btn btn-success mt-5 p-2">
                         Register
                    </Link> */}
                    <button className="w-75 btn btn-success mt-5 p-2">
                      Register
                    </button>
                  </div>
              </form>
            </div>
        </div>
        </div>
          
        </div>
      </div>
    </div>
  )
}
