import React, {useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
export default function Update({catId,getList}) {
  const [categoryName, setcategoryName] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const{register,handleSubmit,formState:{errors},}=useForm(); 
  const onSubmitupdate= async (data)=>{
    let token=localStorage.getItem('admintoken');
    try{
      let response = await axios.put(`https://upskilling-egypt.com:443/api/v1/Category/${catId}`,data,{ headers : {Authorization:token}});
      console.log(response);
      getList();
      handleClose();
      }catch(error){
      console.log(error);
      }
  }; 
  useEffect(()=>{
    setcategoryName('name',categoryName);
  },[categoryName]);
  return (
    <div>
      <i className='far fa-edit mx-2'onClick={handleShow}></i>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              Edit category
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit(onSubmitupdate)}>
              <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className='fa fa-envelope'></i>
                  </span>
                  <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter your name" 
                      {...register('name',{required:'name is required',
                      // pattern:{
                      //   value:/^[A-Za-z]+$/i,
                      //   message:'not valid email',
                      // },
                    })}
                    />
                </div>
                {errors.name&&<span className='alert alert-danger'>{errors.name.message}</span>}
                  <div className='d-flex justify-content-end'>
                    <button className='btn btn-success'>Save</button>
                  </div>
              </form>
            </Modal.Body>
          </Modal>
    </div>
  )
}
