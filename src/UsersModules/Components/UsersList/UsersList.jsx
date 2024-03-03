import React, { useEffect,useState } from 'react'
import axios from 'axios';
import nodata from '../../../assets/images/free.png';
import Header from '../../../Shared/Components/Header/Header'
export default function UsersList() {
  const[userList,setuserList]=useState([]);
  const[pagesArray,setpagesArray]=useState([]);
  const[nameSearch,setnameSearch]=useState('');
  const[selectedRule,setselectedRule]=useState(0);
  const getList=async(pageNo,pageSize,name,groups)=>{
    let token=localStorage.getItem('admintoken');
    try{
        let userList = await axios.get('https://upskilling-egypt.com:443/api/v1/Users',{ headers : {Authorization:token},
        params:
          {
            pageNumber:pageNo,
            pageSize:pageSize,
            userName:name,
            groups:groups
          },
      });
      setpagesArray(
        Array(userList.data.totalNumberOfPages).fill().map((_,i)=>i+1)
      );
        setuserList(userList.data.data);
     }
     catch(error){
    console.log(error);
     }
  };
  const getNameValue=(input)=>{
    setnameSearch(input.target.value);
    getList(1,10,input.target.value,);
  };
  const getRuleValue=(select)=>{
    setselectedRule(select.target.value);
    getList(1,10,select.target.value);
  };
  useEffect(()=>{
    getList(1,13);
  },[]);
  return (
    <div>
      <Header title={'Users List'} desc={'This is a welcoming screen for the entry of the application , you can now see the options'} />
      <div className='row p-4'>
            <div className='col-md-6'>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Search by name"
                onChange={getNameValue} 
              />
            </div>
            <div className='col-md-3'>
            <select className="form-control" 
                        placeholder="Enter your categoriesIds"
                        onChange={getRuleValue}  
                       >
                        <option value=''>chooes</option>
                        <option value={1}>group admin</option>
                        <option value={2}>system user</option>
                        {/* {userList?.map((cat)=>
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                        )} */}
                    
              </select>
            </div>
          </div>
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

            
            <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    {pagesArray.map((pageNo)=> <li key={pageNo} className="page-item" onClick={()=>getList(pageNo,13)}><a className="page-link">{pageNo}</a></li>)}
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
              </nav>
          </table>
            :<img src={nodata}/>}
          </div>
    </div>
  )
}
