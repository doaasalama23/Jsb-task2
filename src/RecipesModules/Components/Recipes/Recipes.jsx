import React, { useEffect,useState } from 'react'
import axios from 'axios';
import bbbb from '../../../assets/images/free.png'
import nodata from '../../../assets/images/free.png';
import Header from '../../../Shared/Components/Header/Header';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'
export default function Recipes() {
  let navigate=useNavigate();
  const navigateRecipes=()=>{
    navigate('/dashboard/recipe-data');
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [recipeId, setrecipeId] = useState(0);
  const handleShow = (id) => {
    setrecipeId(id)
    setShow(true)
  };
  const[recipesList,setrecipesList]=useState([]);
  const getList=async()=>{
    let token=localStorage.getItem('admintoken');
    try{
        let recipesList = await axios.get('https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1',{ headers : {Authorization:token}});
        
        setrecipesList(recipesList.data.data);
     }catch(error){
    console.log(error);
     }
  };
  const onDelete= async (data)=>{
    let token=localStorage.getItem('admintoken');
    try{
      let response = await axios.delete(`https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`,{ headers : {Authorization:token}});
      console.log(response);
      getList();
      handleClose();
      }catch(error){
      console.log(error);
      }
  };
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
    getList();
  },[]);
  return (
    <div>
      <Header title={'Recipes Items'} desc={'This is a welcoming screen for the entry of the application , you can now see the options'} />
      <Modal show={show} onHide={handleClose}>
            <Modal.Body>
            <div className='text-center'>
                  <img src={bbbb} alt='ggggg'/>
                  <h5>delete this item?</h5>
                  <p>Are you sure you want to delete?</p>
            </div>
            <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-danger' onClick={onDelete}>delete this item</button>
                  </div>
            </Modal.Body>
          </Modal>
          <div className='title d-flex justify-content-between p-4'>
            <div className='title-info'>
                <h5>Recipes tables details</h5>
                <h6>you can check all details</h6>
            </div>
            <div className='title-btn'>
              <button className='btn btn-success' onClick={navigateRecipes}>Add new Recipe</button>
            </div>
          </div>
      <div className='categories-tables text-center py-4'>
            {recipesList.length>0?
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">description</th>
                <th scope="col">Image</th>
                <th scope="col">price</th>
                {/* <th scope="col">category</th> */}
                <th scope="col">actions</th>
                
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe)=>
                <tr key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td>{recipe.description}</td>
                  <td>
                  <img className='load' src={`https://upskilling-egypt.com/${recipe.imagePath}`}/>
                      {/* {user.imagePath ? ( <img className='load' src={`https://upskilling-egypt.com/${recipe.imagePath}`}/>)
                      :(<img className='w-25' src={nodata}/>)
                      } */}
                  </td>
                  <td>{recipe.price}</td>
                  {/* <td>{recipe.category[0].name}</td> */}
                  <td>
                  <i className='far fa-edit text-warning mx-2' onClick={navigateRecipes}></i>
                  <i className='fa fa-trash text-danger' onClick={()=>handleShow(recipe.id)}></i>
                  </td>
                  {/* <td>
                    <div className='d-flex justify-content-end me-4'>
                        <Update catId={cat.id} getList={getList}/>
                        <Delete catId={cat.id} getList={getList}/>
                  </div>
                  </td> */}
              </tr>
              )}
              
            </tbody>
          </table>
            :<img src={nodata}/>}
          </div>
    </div>
  )
}
