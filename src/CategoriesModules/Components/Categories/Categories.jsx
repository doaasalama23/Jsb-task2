import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import axios from 'axios';
import nodata from '../../../assets/images/free.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import {Link ,useNavigate } from 'react-router-dom';
import Update from '../../../Update/Update';
import Delete from '../../../Delete/Delete';
export default function Categories() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const{register,handleSubmit,formState:{errors},}=useForm(); 
  const[categoriesList,setcategoriesList]=useState([]);
  const[nameSearch,setnameSearch]=useState('');
  const[pagesArray,setpagesArray]=useState([]);
  const getList=async(pageNo,pageSize,name)=>{
    let token=localStorage.getItem('admintoken');
    try{
        let categoriesList = await axios.get('https://upskilling-egypt.com:443/api/v1/Category',{ headers : {Authorization:token},
        params:
          {
            pageNumber:pageNo,
            pageSize:pageSize,
            name:name
          },
      });
      console.log(categoriesList);
      setpagesArray(
        Array(categoriesList.data.totalNumberOfPages).fill().map((_,i)=>i+1)
      );
        setcategoriesList(categoriesList.data.data);
     }catch(error){
    console.log(error);
     }
  };
  const onSubmitadd= async (data)=>{
    let token=localStorage.getItem('admintoken');
    try{
      let response = await axios.post('https://upskilling-egypt.com:443/api/v1/Category/',data,{ headers : {Authorization:token}});
      console.log(response);
      getList();
      handleClose();
      }catch(error){
      console.log(error);
      }
  };
  const getNameValue=(input)=>{
    setnameSearch(input.target.value);
    getList(1,10,input.target.value);
  };
  useEffect(()=>{
    getList(1,40);
  },[]);
  return (
    <div>
       <div>
          <Header title={'Categories Items'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} />

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              Add category
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit(onSubmitadd)}>
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
        <div className='categories-container'>
          <div className='title d-flex justify-content-between p-4'>
            <div className='title-info'>
                <h5>Categories tables details</h5>
                <h6>you can check all details</h6>
            </div>
            <div className='title-btn'>
              <button className='btn btn-success' onClick={handleShow}>Add new category</button>
            </div>
          </div>
          <div className='row p-4'>
            <div className='col-md-6'>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Search by name"
                onChange={getNameValue} 
              />
            </div>  
          </div>
          <div className='categories-tables text-center'>
            {categoriesList.length>0?
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Ctegory name</th>
                <th scope="col">
                actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((cat)=>
                <tr key={cat.id}>
                <th scope="row">{cat.id}</th>
                <td>{cat.name}</td>
                <td>
                  <div className='d-flex justify-content-end me-4'>
                      <Update catId={cat.id} getList={getList}/>
                      <Delete catId={cat.id} getList={getList}/>
                </div>
                </td>
              </tr>
              )}
              
            </tbody>


            <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    {pagesArray.map((pageNo)=> <li key={pageNo} className="page-item" onClick={()=>getList(pageNo,5)}><a className="page-link">{pageNo}</a></li>)}
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
              </nav>
          </table>
            :<img src={nodata}/>}
          </div>
        </div>
    </div>
  )
}
