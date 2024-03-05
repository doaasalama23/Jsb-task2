import React from 'react'
import Header from '../../../Shared/Components/Header/Header'
import RecipesHeader from '../../../Shared/Components/RecipesHeader/RecipesHeader';
export default function Home({adminData}) {
  return (
    <div className="container">
    <Header
      title={`Welcome ${adminData?.userName} !`}
      description={
        "This is a welcoming screen for the entry of the application , you can now see the options"
      }
      home
    />
    <RecipesHeader home adminData={adminData} />
  </div>
  )
}
