import React from 'react'
import headerBg from '../../../assets/images/eating.png'
export default function Header({title,desc}) {
  return (
    <div className='container-fluid back-g'>
      <div className='row justify-content-between'>
      <div className='col-md-5 moday'>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div className='col-md-4'><img src={headerBg}/></div>
      </div>
    </div>
  )
}
