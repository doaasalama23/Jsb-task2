import React from 'react';
import nodata from '../../../assets/images/free.png';

export default function DeleteModel() {
  return (
    <>

<div className='text-center'>
        <img src={nodata} alt="noData" />
        <h5>Delete this item?</h5>
         <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
         </div>


         
    </>
  )
}
