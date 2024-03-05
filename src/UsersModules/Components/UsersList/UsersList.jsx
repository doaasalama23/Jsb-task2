import React, { useEffect,useState } from 'react'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import nodata from '../../../assets/images/free.png';
import Header from '../../../Shared/Components/Header/Header'
import DeleteUser from '../../../DeleteUser/DeleteUser';
export default function UsersList({loginData}) {
  const[userList,setuserList]=useState([]);
  const[pagesArray,setpagesArray]=useState([]);
  const[nameSearch,setnameSearch]=useState('');
  const[selectedRule,setselectedRule]=useState(0);
  const getList=async(pageNo,pageSize,name,groupValue)=>{
    let token=localStorage.getItem('admintoken');
    try{
        let userList = await axios.get('https://upskilling-egypt.com:443/api/v1/Users',{ headers : {Authorization:token},
        params:
          {
            pageNumber:pageNo,
            pageSize:pageSize,
            userName:name,
            groups: [groupValue],
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
    getList(1,30,input.target.value,);
  };
  const getRuleValue=(select)=>{
    setselectedRule(select.target.value);
    getList(1,30,select.target.value);
  };
  useEffect(()=>{
    getList(1,30);
  },[]);
  return (
    <div className="container">
      <Header title={'Users List'} description={'You can now add your items that any user can order it from the Application and you can edit'} />
      <div className="my-3 px-4">
        <h5 className="lh-1">Users Table Details</h5>
        <h6 className="text-muted lh-1">You can check all details</h6>
      </div>
       <div className="row my-3">
        <div className="col-md-9">
          <div className="input-group mb-3">
            <span className="input-group-text border-end-0 bg-transparent">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
              onChange={getNameValue}
            />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group mb-3">
            <select className="form-select" onChange={getRuleValue}>
              <option selected disabled>
                Search by Role
              </option>
              <option value="">All Roles</option>
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>
        </div>
      </div>
        <div className='table-responsive'>
            {userList.length>0?
            <table className="table text-center table-responsive">
            <thead className='table-light'>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Image</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
                <th scope="col"></th>
                
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
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.country}</td>
                <td className="text-end pe-4">
                    <div className="dropdown">
                      <i
                        className="fa-solid fa-ellipsis"
                        role="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a className="dropdown-item text-success" href="#">
                            <i className="fa-solid fa-eye text-success"></i>{" "}
                            View
                          </a>
                        </li>
                        <DeleteUser userId={user.id} getList={getList}/>
                        {/* <li>
                          <a className="dropdown-item text-danger" href="#">
                            <i className="fa-solid fa-trash text-danger"></i>{" "}
                            Delete
                          </a>
                        </li> */}
                      </ul>
                    </div>
                  </td>
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
