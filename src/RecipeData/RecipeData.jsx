import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import RecipesHeader from '../Shared/Components/RecipesHeader/RecipesHeader';
export default function RecipeData({adminData}) {
  const[categoriesList,setcategoriesList]=useState([]);
  const[tagsList,settagsList]=useState([]);
  let token=localStorage.getItem('admintoken');
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const [recipeId, setrecipeId] = useState(0);

  // const handleShow = (id) => {
  //   setrecipeId(id)
  //   setShow(true)
  // };
    const{register,handleSubmit,formState:{errors},}=useForm(); 
    let navigate=useNavigate();
  //   const navigateRecipesData=()=>{
  //       navigate('recipes');
  // };
  const convertToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("price", data?.price);
    formData.append("description", data?.description);
    formData.append("tagId", data?.tagId);
    formData.append("categoriesIds", data?.categoriesIds);
    formData.append("recipeImage", data?.recipeImage[0]);
    return formData;
  };
  const onSubmitadd= async (data)=>{
    const convertedData = convertToFormData(data);
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        convertedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate("/dashboard/recipes");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getCategoriesList=async()=>{
    let token=localStorage.getItem('admintoken');
    try{
        let categoriesList = await axios.get('https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1',{ headers : {Authorization:token}});
        console.log(categoriesList.data.data);
        setcategoriesList(categoriesList?.data?.data);
     }catch(error){
    console.log(error);
     }
  };
  const getTagList=async()=>{
    let token=localStorage.getItem('admintoken');
    try{
        let tagsList = await axios.get('https://upskilling-egypt.com:443/api/v1/tag/',{ headers : {Authorization:token}});
        console.log(tagsList.data);
        settagsList(tagsList?.data);
     }catch(error){
    console.log(error);
     }
  };
  useEffect(()=>{
    getCategoriesList();
    getTagList();
  },[]);
  return (
      <>
      <RecipesHeader />
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto mt-5 mb-3">
            <form onSubmit={handleSubmit(onSubmitadd)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control bg-light border-0 rounded-4"
                  placeholder="Recipe Name"
                  {...register("name", {
                    required: "Recipe name is required",
                  })}
                />
              </div>
              {errors.name && (
                <div className="alert alert-danger py-1">
                  {errors.name.message}
                </div>
              )}
              <div className="input-group mb-3">
                <select
                  className="form-control w-100 border-0 bg-light rounded-4"
                  {...register("tagId", {
                    required: "Tag is required",
                  })}
                >
                  <option value="Tag" disabled selected>
                    Tag
                  </option>
                  {tagsList?.map((tag) => (
                    <option key={tag?.id} value={tag?.id}>
                      {tag?.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.tagId && (
                <div className="alert alert-danger py-1">
                  {errors.tagId.message}
                </div>
              )}
              <div className="input-group rounded-3 mb-3">
                <input
                  type="number"
                  className="form-control bg-light border-0 rounded-4"
                  placeholder="Price"
                  {...register("price", {
                    required: "Price is required",
                  })}
                />
              </div>
              {errors.price && (
                <div className="alert alert-danger py-1">
                  {errors.price.message}
                </div>
              )}
              <div className="input-group mb-3">
                <select
                  className="w-100 border-0 bg-light rounded-4 form-control"
                  {...register("categoriesIds", {
                    required: "Category is required",
                  })}
                >
                  <option value="Category" disabled selected>
                    Category
                  </option>
                  {categoriesList?.map((cat) => (
                    <option
                      key={cat?.id}
                      value={cat?.id}
                      placeholder="Category"
                    >
                      {cat?.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.categoriesIds && (
                <div className="alert alert-danger py-1">
                  {errors.categoriesIds.message}
                </div>
              )}
              <textarea
                rows={4}
                placeholder="Description"
                className="w-100 bg-light border-0 rounded-4 form-control"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <div className="alert alert-danger py-1">
                  {errors.description.message}
                </div>
              )}
              <div className="uploadImg border-success lightGreenContainer mt-2 p-3 d-flex flex-column align-items-center">
                <i className="fa-solid fa-upload mb-2"></i>
                <input type="file" role="button" {...register("recipeImage")} />
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn btn-outline-success me-4 px-5"
                  onClick={() => {
                    navigate("/dashboard/recipes");
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-success px-4">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}