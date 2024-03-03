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
import RecipeData from './RecipeData/RecipeData'
import UsersList from './UsersModules/Components/UsersList/UsersList'
import Categories from './CategoriesModules/Components/Categories/Categories'
import ForgetPass from './AuthModules/Components/ForgetPass/ForgetPass'
import Restpassword from './AuthModules/Components/Restpassword/Restpassword'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './Shared/Components/ProtectedRoute/ProtectedRoute'
import Register from './AuthModules/Register/Register'
import Recepeupdate from './Recepeupdate/Recepeupdate'
import VerifyRegister from './AuthModules/VerifyRegister/VerifyRegister'
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
        {path:'register',element:<Register/>},
        { path: 'verifyRegister', element: <VerifyRegister/> },
      ],
    },
    {
      path:'dashboard',
      element:(<ProtectedRoute adminData={adminData}><MasterLayout adminData={adminData}/></ProtectedRoute>),
      // errorElement:<Notfound />,
      children:[
        {index:true,element:<Home adminData={adminData}/>},
        {path:'recipes',element:<Recipes/>},
        {path:'recipe-data',element:<RecipeData/>},
        {path:'recipe-update',element:<Recepeupdate/>},
        {path:'users',element:<UsersList/>},
        {path:'categories',element:<Categories/>},
      ],
    }
  ]);

  return <RouterProvider router={routes}/>;
}

export default App
