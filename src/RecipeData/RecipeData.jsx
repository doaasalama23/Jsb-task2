import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
export default function RecipeData() {
  const[categoriesList,setcategoriesList]=useState([]);
  const[tagsList,settagsList]=useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [recipeId, setrecipeId] = useState(0);
  const handleShow = (id) => {
    setrecipeId(id)
    setShow(true)
  };
    const{register,handleSubmit,formState:{errors},}=useForm(); 
    let navigate=useNavigate();
    const navigateRecipesData=()=>{
        navigate('recipes');
  };
  const onSubmitadd= async (data)=>{
    let token=localStorage.getItem('admintoken');
    try{
      let response = await axios.post('https://upskilling-egypt.com:443/api/v1/Recipe/',data,{ headers : {Authorization:token}});
      console.log(response);
      handleClose();
      }catch(error){
      console.log(error);
      }
  };
  const getCategoriesList=async()=>{
    let token=localStorage.getItem('admintoken');
    try{
        let categoriesList = await axios.get('https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1',{ headers : {Authorization:token}});
        console.log(categoriesList.data.data);
        setcategoriesList(categoriesList.data.data);
     }catch(error){
    console.log(error);
     }
  };
  const getTagList=async()=>{
    let token=localStorage.getItem('admintoken');
    try{
        let tagsList = await axios.get('https://upskilling-egypt.com:443/api/v1/tag/',{ headers : {Authorization:token}});
        console.log(tagsList.data);
        settagsList(tagsList.data);
     }catch(error){
    console.log(error);
     }
  };
  useEffect(()=>{
    getCategoriesList();
    getTagList();
  },[]);
  return (
    <div>
        <div className='home-container'>
            <div className='title d-flex justify-content-between p-4'>
                <div className='title-info'>
                    <h3>Fill all <span className='success'>Resapies!</span></h3>
                    <p>you can can fill now the meals</p>
                </div>
                <div className='title-btn'>
                <button onClick={navigateRecipesData} className='btn btn-success'>Fill Recipes
                <i className='fa fa-arrow-right mx-2'></i>
                </button>
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmitadd)}>
          <div className='p-5'>
              <div className="input-group mb-3">
                  <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Enter your name" 
                      {...register('name',{required:'name is required',
                     
                    })}
                    />
                </div>
                {errors.name&&<span className='alert alert-danger'>{errors.name.message}</span>}
                <div className="input-group mb-3">
                 
                  <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Enter your price" 
                      {...register('price',{required:'price is required',
                    })}
                    />
                </div>
                {errors.price&&<span className='alert alert-danger'>{errors.price.message}</span>}
                <div className="input-group mb-3">
                 <select className="form-control" 
                      placeholder="Enter your categoriesIds" 
                      {...register('categoriesIds',{required:'categoriesIds is required',
                    })}>
                      {categoriesList?.map((cat)=>
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                      )}
                  
                 </select>
                </div>
                {errors.categoriesIdse&&<span className='alert alert-danger'>{errors.categoriesIds.message}</span>}
                <div className="input-group mb-3">
                 <select className="form-control" 
                      placeholder="Enter your tagId" 
                      {...register('tagId',{required:'tagId is required',
                    })}>
                      {tagsList?.map((tag)=>
                      <option key={tag.id} value={tag.id}>{tag.name}</option>
                      )}
                  
                 </select>
                </div>
                {errors.tagId&&<span className='alert alert-danger'>{errors.tagId.message}</span>}
                <div className="input-group mb-3">
                  <input 
                      type="file" 
                      className="form-control" 
                      {...register('recipeImage',{required:'recipeImage is required',
                     
                    })}
                    />
                </div>
                {errors.recipeImage&&<span className='alert alert-danger'>{errors.recipeImage.message}</span>}
                <div className="input-group mb-3">
                  <textarea className='form-control'placeholder="Enter your description"{...register('description',{required:'description is required',
                    })}  >   
                  </textarea>
               </div>
                {errors.description&&<span className='alert alert-danger'>{errors.description.message}</span>}
                  <div className='d-flex justify-content-end'>
                    <button className='btn btn-success'>Save</button>
                  </div>
              </div>
              </form>
    </div>
  )
}
