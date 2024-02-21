import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
// import nodata from '../../assets/images/free.png'
export default function Delete({catId,getList}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onDelete= async (data)=>{
    let token=localStorage.getItem('admintoken');
    try{
      let response = await axios.delete(`https://upskilling-egypt.com:443/api/v1/Category/${catId}`,{ headers : {Authorization:token}});
      console.log(response);
      getList();
      handleClose();
      }catch(error){
      console.log(error);
      }
  }; 
  return (
    <div>
      <i className='fa fa-trash'onClick={handleShow}></i>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
            <div className='text-center'>
                  {/* <img src={nodata}/> */}
                  <h5>delete this item?</h5>
                  <p>Are you sure you want to delete?</p>
            </div>
                  <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-danger' onClick={onDelete}>delete this item</button>
                  </div>
          
            </Modal.Body>
          </Modal>
    </div>
  )
}
