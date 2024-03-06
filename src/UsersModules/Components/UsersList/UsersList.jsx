import React, { useEffect,useState } from 'react'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import nodata from '../../../assets/images/free.png';
import Header from '../../../Shared/Components/Header/Header'
import DeleteModel from '../../../Shared/Components/DeleteModel/DeleteModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function UsersList() {
  let token=localStorage.getItem('admintoken');
  const[userList,setuserList]=useState([]);
  const[pagesArray,setpagesArray]=useState([]);
  const[nameSearch,setnameSearch]=useState('');
  const[selectedRule,setselectedRule]=useState(0);
  const[userId,setUserId]=useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };

  const deleteUser = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Users/${userId}`,
        {
          headers: { Authorization: token },
        }
      );
      getList();
      handleClose();
      toast.success('Delete successfully')
      
    } catch (error) {
      toast.error(error);
    }
  };



  const getList=async(pageNo,pageSize,name,groupValue)=>{
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
    getList(1,30,input.target.value,selectedRule);
  };
  const getRuleValue=(select)=>{
    setselectedRule(select.target.value);
    getList(1,30,nameSearch,select.target.value);
  };
  useEffect(()=>{
    getList(1,30);
  },[]);
  return (
    <>
    <div className="container">
      <Header title={'Users List'} description={'You can now add your items that any user can order it from the Application and you can edit'} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <DeleteModel />

          <div className="text-end my-3">
            <button onClick={deleteUser} className="btn btn-outline-danger">
              Delete this item
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
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
 {
        <div className="table-container table-responsive text-center px-5 ">
          {userList.length > 0 ? (
            <table className="table">
              <thead className='table-light'>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">Image</th>
                  <th scope="col">phone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.country}</td>
                    <td>
                      {user.imagePath ? (
                        <img
                          className="load"
                          src={`https://upskilling-egypt.com/${user.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="load"
                          src={nodata}
                          alt="noData"
                        />
                      )}{" "}
                    </td>
                    <td>{user.phoneNumber}</td>
                 <td> <i   onClick={() => handleShow(user.id)} className="fa fa-trash text-danger mx-2"
                        aria-hidden="true"
                      ></i></td>  
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <img src={nodata}/>
          )}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {pagesArray.map((pageNo) => (
                <li
                  key={pageNo}
                  onClick={() => getList(pageNo, 10)}
                  className="page-item"
                >
                  <a className="page-link">{pageNo}</a>
                </li>
              ))}

              <li className="page-item">
                <a className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      }
    </div>
    </>
  );
}
