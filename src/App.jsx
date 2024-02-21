import { useState ,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from '../src/Shared/Components/Navbar/Navbar'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './Shared/Components/AuthLayout/AuthLayout'
import Notfound from './Shared/Components/Notfound/Notfound'
import MasterLayout from './Shared/Components/MasterLayout/MasterLayout'
import Login from './AuthModules/Components/Login/Login'
import Home from './HomeModules/Components/Home/Home'
import Recipes from './RecipesModules/Components/Recipes/Recipes'
import UsersList from './UsersModules/Components/UsersList/UsersList'
import Categories from './CategoriesModules/Components/Categories/Categories'
import ForgetPass from './AuthModules/Components/ForgetPass/ForgetPass'
import Restpassword from './AuthModules/Components/Restpassword/Restpassword'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './Shared/Components/ProtectedRoute/ProtectedRoute'
function App() {
  const[adminData,setAdminData]=useState(null);
  const saveAdminData=()=>{
    let encodedToken=localStorage.getItem('admintoken');
    let decodeToken=jwtDecode(encodedToken);
    setAdminData(decodeToken);

  };
  useEffect(()=>{
    if(localStorage.getItem('admintoken')){
      saveAdminData();
    }
  },[]);
  const routes = createBrowserRouter([
    {
      path:'/',
      element:<AuthLayout/>,
      errorElement:<Notfound />,
      children:[
        {index:true,element:<Login saveAdminData={saveAdminData}/>},
        {path:'Login',element:<Login saveAdminData={saveAdminData}/>},
        {path:'ForgetPass',element:<ForgetPass/>},
        {path:'Restpassword',element:<Restpassword/>},
      ],
    },
    {
      path:'dashboard',
      element:(<ProtectedRoute adminData={adminData}><MasterLayout adminData={adminData}/></ProtectedRoute>),
      // errorElement:<Notfound />,
      children:[
        {index:true,element:<Home adminData={adminData}/>},
        {path:'recipes',element:<Recipes/>},
        {path:'users',element:<UsersList/>},
        {path:'categories',element:<Categories/>},
      ],
    }
  ]);

  return <RouterProvider router={routes}/>;
}

export default App
