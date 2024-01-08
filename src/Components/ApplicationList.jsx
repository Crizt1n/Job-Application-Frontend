import React, { useContext, useEffect, useState } from 'react';
import './applist.css';
import Header from './Header';
import { allUserApplications, deleteUserApplications } from '../services/allAPI';
import EditList from './EditList';
import { editAppResponseContext } from '../Contexts/ContextShare';
import { toast } from 'react-toastify';

function ApplicationList() {

  const [ userApp, setUserApp] = useState([])

  const {editAppResponse , setEditAppResponse} = useContext(editAppResponseContext)
  // Add a state variable to represent the trigger for re-rendering
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const getUserApplications = async()=>{

    const token = sessionStorage.getItem("token")

    const reqHeader ={
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    }

    const result = await allUserApplications(reqHeader)
    console.log(result);
    setUserApp(result.data)

  }

  useEffect(()=>{
    getUserApplications()
  },[editAppResponse,updateTrigger])

  //delete function

  const handleDelete =async(id)=>{
    
    const token = sessionStorage.getItem("token")

    const reqHeader ={
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    }

    const result = await deleteUserApplications(id,reqHeader)
    console.log(result);
    if(result.status===200){
      toast.success('List Deleted')
      getUserApplications()
      // Toggle the updateTrigger to trigger a re-render
      setUpdateTrigger((prev) => !prev);

    }
    else{
      toast.error(result.response.error)
    }
  }
  


  return (
    <div >
      <Header/>
      <h3 className='text-center mt-4 mb-3'><u>Edit Application</u></h3>
      <div className='container w-100 justify-content-center align-items-center mb-4 position-relative'>
        <div className='row'>
       
        {userApp?.length>0?
            userApp?.map((item)=>(
              <div className='col-md-4  mt-4'>
              <div className='border border-primary rounded-3 shadow p-4  bg-dark text-light mb-3'>
                <div className='d-flex'>
                  <strong className='text-warning'>ID : &nbsp;</strong> {item._id}
                </div>
                <div className='d-flex'>
                  <strong  className='text-warning'>COMPANY : &nbsp;</strong> {item.company}
                </div>
                <div className='d-flex'>
                  <strong className='text-warning'>POSITION : &nbsp;</strong> {item.position}
                </div>
                <div className='d-flex'>
                  <strong className='text-warning'>STATUS : &nbsp;</strong> {item.status}
                </div>
                <div className='d-flex'>
                  <strong className='text-warning'>DATE : &nbsp;</strong> {item.date}
                </div>
                <div className='d-flex justify-content-center mt-3'>
                  <EditList list ={item}/>
                  <button className='btn rounded btn-outline-danger ms-2 w-50' onClick={()=>{handleDelete(item._id)}}><i class="fa-solid fa-trash"></i></button>
                </div>
                          


              </div>
              </div>
            ))
                     :
                     <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                      <img className='w-100' src="https://cdn.dribbble.com/users/2224455/screenshots/4428927/loading.gif" alt="" />
                     
                      </div>
                      <div className="col-md-4"></div>
                     </div>
                      }



        </div>
      </div>
    </div>
  );
}

export default ApplicationList;