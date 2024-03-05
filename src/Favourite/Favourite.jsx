import React, { useEffect, useState } from 'react'
import Header from '../Shared/Components/Header/Header'
import girl from '../assets/images/free.png'
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import DeleteModel from '../Shared/Components/DeleteModel/DeleteModel';
export default function Favourite() {
    let token=localStorage.getItem('admintoken');
    const[favList,setfavList]=useState([]);
    const [show, setShow] = useState(false);
    const [favId, setFavId] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      setFavId(id);
      setShow(true);
    };
    const getList=async()=>{
        let token=localStorage.getItem('admintoken');
        try{
            let response = await axios.get('https://upskilling-egypt.com:443/api/v1/userRecipe/',{ headers : {Authorization:token},
          });
          console.log(response.data.data);
          setfavList(response.data.data);
         }catch(error){
        console.log(error);
         }
      };
      useEffect(()=>{
        getList();
      },[]);

      const onSubmitDelete = async () => {
        // console.log(recipeId);
        try {
          let response = await axios.delete(
            `https://upskilling-egypt.com:443/api/v1/userRecipe/${favId}`,
            { headers: { Authorization: token } }
          );
    
          handleClose();
          getList();
          toast.success("The Selected Item has been Removed from favourites");
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <>
        <ToastContainer />
    <Header title={'Favourites Items'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} />
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteModel />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onSubmitDelete}>
            confirmDelete
          </Button>
        </Modal.Footer>
      </Modal>   
        <div className='row p-4'>
            {favList?.length>0 ?(
            favList.map((fav)=>
            <div className='col-md-4 mb-3'>
                    <div className='card text-center rounded-5'>
                            <img className='card-img-top rounded-5' src={`https://upskilling-egypt.com/${fav.recipe?.imagePath}`} />
                            <div className='card-body'>
                              <h3>{fav.recipe?.name}</h3>
                              <h3>{fav.recipe?.description}</h3>
                            </div>
                    </div>
                    <div className='text-center mt-3'>
                        <button
                              className="btn btn-outline-danger"
                              onClick={() => handleShow(fav.id)}
                            >
                              
                              Delete Item
                              <i
                                className="fa fa-trash text-danger mx-2"
                                aria-hidden="true"
                              ></i>
                        </button>
                    </div>
                </div>)  
            ):(<div className='col-md-4'><img className='w-25' src={girl}/></div>)}
        </div>
    </>
  )
}
