import React, { useEffect,useState } from 'react'
import axios from 'axios';
import bbbb from '../../../assets/images/free.png'
import nodata from '../../../assets/images/free.png';
import Header from '../../../Shared/Components/Header/Header';
import Modal from 'react-bootstrap/Modal';
import Recepeupdate from '../../../Recepeupdate/Recepeupdate';
import { useNavigate,Link } from 'react-router-dom';
export default function Recipes() {
  const loginData=(JSON.parse(localStorage.getItem('adminData')));
  const[recipesList,setrecipesList]=useState([]);
  const[categoriesList,setcategoriesList]=useState([]);
  const[tagsList,settagsList]=useState([]);
  const[nameSearch,setnameSearch]=useState('');
  const[selectedTag,setselectedTag]=useState(0);
  const[selectedCat,setselectedCat]=useState(0);
  const [selectedRecipeId, setSelectedRecipeId] = useState(0);
  const [show, setShow] = useState(false);
  // const [recipeId, setrecipeId] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const[pagesArray,setpagesArray]=useState([]);
  const handleClose = () => {
    setShow(false);
    setSelectedRecipe(null);
  };

  const handleShow = (recipe) => {
    setShow(true);
    setSelectedRecipe(recipe);
  };
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const navigateRecipes=()=>{
    navigate('/dashboard/recipe-data');
  };
  const navigateToEditRecipe = (recipe) => {
    navigate("/dashboard/recipe-update", {
      state: {
        selectedRecipe: recipe,
        tagsList: tagsList,
        categoriesList: categoriesList,
      },
    });
  };
  const getList=async(pageNo,pageSize,name,tagId,catId)=>{
    let token=localStorage.getItem('admintoken');
    try{
        let recipesList = await axios.get('https://upskilling-egypt.com:443/api/v1/Recipe',{ headers : {Authorization:token},
       params:
          {
            pageNumber:pageNo,
            pageSize:pageSize,
            name:name,
            categoryId:catId,
            tagId:tagId
          },
      
      }
        

    );
    setpagesArray(
      Array(recipesList.data.totalNumberOfPages).fill().map((_,i)=>i+1)
    );
    console.log(recipesList.data.totalNumberOfPages);  
        setrecipesList(recipesList.data.data);
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
  const addTofav=async (recipeId)=>{
    let token=localStorage.getItem('admintoken');
    try{
      let response = await axios.post(`https://upskilling-egypt.com:443/api/v1/userRecipe`,{"recipeId":recipeId},{ headers : {Authorization:token}});
      console.log(response);
      // getList();
      // handleClose();
      }catch(error){
      console.log(error);
      }
  }; 
  const getNameValue=(input)=>{
    setnameSearch(input.target.value);
    getList(1,10,input.target.value,selectedTag,selectedCat);
  };
  const getTagValue=(select)=>{
    setselectedTag(select.target.value);
    getList(1,10,nameSearch,select.target.value,selectedCat);
  };
  const getCatValue=(select)=>{
    setselectedCat(select.target.value);
    getList(1,10,nameSearch,selectedTag,select.target.value);
  };
  useEffect(() => {
    setSelectedRecipeId(selectedRecipe?.id || "");
  }, [selectedRecipe]);
  useEffect(()=>{
    getList(1,5);
    getCategoriesList();
    getTagList();
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
          <div className='row p-4'>
            <div className='col-md-6'>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Search by name"
                onChange={getNameValue} 
              />
            </div>
            <div className='col-md-3'>
            <select className="form-control" 
                        placeholder="Enter your categoriesIds"
                        onChange={getCatValue}  
                       >
                        <option value=''>chooes category</option>
                        {categoriesList?.map((cat)=>
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                        )}
                    
              </select>
            </div>
            <div className='col-md-3'>
            <select className="form-control" 
                      placeholder="Enter your tagId"
                      onChange={getTagValue}  
                      >
                        <option value=''>chooes tag</option>
                      {tagsList?.map((tag)=>
                      <option key={tag.id} value={tag.id}>{tag.name}</option>
                      )}
                  
                 </select>
            </div>
          </div>
     
          {recipesList?.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {recipesList?.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe?.name}</td>
                  <td className="w-25">
                    <img
                      src={
                        recipe.imagePath
                          ? `https://upskilling-egypt.com:443/${recipe.imagePath}`
                          : ""
                      }
                      className="w-25"
                    />
                  </td>
                  <td>{recipe?.price}</td>
                  <td>{recipe?.description}</td>
                  <td>{recipe?.tag?.name}</td>
                  <td>{recipe?.category[0]?.name}</td>
                  <td>
                    {loginData?.userGroup=='SuperAdmin'?(<div>
                  <i className='far fa-edit text-warning mx-2'onClick={() => navigateToEditRecipe(recipe)}></i>
                  <i className='fa fa-trash text-danger' onClick={()=>handleShow(recipe.id)}></i>
                    </div>):(<i className='far fa-heart text-danger mx-2' onClick={()=>addTofav(recipe.id)}></i>)}
                    
                  </td>
                </tr>
              ))}
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
        </div>
      ) : (
        <img src={nodata}/>
      )}
    </div>
  );
}