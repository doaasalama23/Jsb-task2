import React from 'react'
import Header from '../../../Shared/Components/Header/Header'
import { useNavigate } from 'react-router-dom'

export default function Home({adminData}) {
  let navigate=useNavigate();
  const navigateRecipes=()=>{
    navigate('Recipes');
  };
  return (
    <div>
      <Header title={`Welcome ${adminData?.userName}`} desc={'This is a welcoming screen for the entry of the application , you can now see the options'} />
      <div className='home-container'>
          <div className='title d-flex justify-content-between p-4'>
            <div className='title-info'>
                <h3>Fill all <span className='success'>Resapies!</span></h3>
                <p>you can can fill now the meals</p>
            </div>
            <div className='title-btn'>
              <button onClick={navigateRecipes} className='btn btn-success'>Fill Recipes
              <i className='fa fa-arrow-right mx-2'></i>
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}
