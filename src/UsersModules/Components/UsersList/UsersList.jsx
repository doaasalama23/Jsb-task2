import React, { useEffect,useState } from 'react'
import axios from 'axios';
import nodata from '../../../assets/images/free.png';
import Header from '../../../Shared/Components/Header/Header'
export default function UsersList() {
  const[userList,setuserList]=useState([]);
  const getList=async()=>{
    let token=localStorage.getItem('admintoken');
    try{
        let userList = await axios.get('https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1',{ headers : {Authorization:token}});
        
        setuserList(userList.data.data);
     }catch(error){
    console.log(error);
     }
  };
  useEffect(()=>{
    getList();
  },[]);
  return (
    <div>
      <Header title={'Users List'} desc={'This is a welcoming screen for the entry of the application , you can now see the options'} />
        <div className='categories-tables text-center py-4'>
            {userList.length>0?
            <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Image</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
                
              </tr>
            </thead>
            <tbody>
              {userList.map((user)=>
                <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                <img className='load' src={`https://upskilling-egypt.com/${user.imagePath}`}/>
                    {/* {user.imagePath ? ( <img className='load' src={`https://upskilling-egypt.com/${user.imagePath}`}/>)
                    :(<img className='w-25' src={nodata}/>)
                    } */}
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.country}</td>
                {/* <td>
                  <div className='d-flex justify-content-end me-4'>
                      <Update catId={cat.id} getList={getList}/>
                      <Delete catId={cat.id} getList={getList}/>
                </div>
                </td> */}
              </tr>
              )}
              
            </tbody>
          </table>
            :<img src={nodata}/>}
          </div>
    </div>
  )
}
