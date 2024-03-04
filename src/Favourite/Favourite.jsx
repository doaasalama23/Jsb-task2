import React, { useEffect, useState } from 'react'
import Header from '../Shared/Components/Header/Header'
import girl from '../assets/images/free.png'
import axios from 'axios';

export default function Favourite() {
    const[favList,setfavList]=useState([]);
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
  return (
    <>
    <Header title={'Favourites Items'} desc={'This is a welcoming screen for the entry of the application , you can now see the options'} />
        
        <div className='row p-4'>
            {favList?.length>0 ?(
            favList.map((fav)=>
            <div className='col-md-4'>
                    <div className='item-fav bg-danger'>
                            <img className='img-fluid' src={`https://upskilling-egypt.com/${fav.recipe?.imagePath}`} />
                            <h3>{fav.recipe?.name}</h3>
                            <h3>{fav.recipe?.description}</h3>
                    </div>
                </div>)  
            ):(<div className='col-md-4'><img className='w-25' src={girl}/></div>)}
        </div>
    </>
  )
}
