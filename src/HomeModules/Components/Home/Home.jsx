import React from 'react'
import Header from '../../../Shared/Components/Header/Header'

export default function Home({adminData}) {
  return (
    <div>
      <Header title={`Welcome ${adminData?.userName}`} desc={'This is a welcoming screen for the entry of the application , you can now see the options'} />
    </div>
  )
}
