import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import Header from './Header'
import { useState } from 'react'
import { useEffect } from 'react'
import { allUserApplications } from '../services/allAPI';
import { addAppResponseContext } from '../Contexts/ContextShare';
import './appdetails.css'

function ApplicationDetails() {

  const {addAppResponse, setAddAppResponse} = useContext(addAppResponseContext)

  const [username,setUsername] = useState("")

  const [ userApp, setUserApp] = useState([])

  
  const getUserApplications = async()=>{

    const token = sessionStorage.getItem("token")

    const reqHeader= {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    }

    const result = await allUserApplications(reqHeader)
    console.log(result.data);
    setUserApp(result.data)

  }

  useEffect(()=>{
    getUserApplications()
  },[addAppResponse])




  useEffect(() => {
    const existingUserString = sessionStorage.getItem("existingUser");
    if (existingUserString) {
      const existingUser = JSON.parse(existingUserString);
      setUsername(existingUser.username);
    }
  }, []);
  
  console.log(username);
     

   
  return (
    < > 
      <Header/>
      <h1 className='container mt-4'>Welcome.! <span className='text-warning'>{username}</span>,</h1>
      <h3 className='text-center mt-4 mb-1 d-flex justify-content-center align-items-center'><u>Application Details</u></h3> 
      <div className='container mt-3 fs-4 '>
         <div className='row mb-4 '>
          
                   
            {userApp?.length>0?
            userApp?.map((item)=>(


              <div className='col-md-4  '>
              <div id='border' className='border border-primary rounded-3 shadow p-4  bg-dark text-light mb-3 mt-3'>
            
               
                <div className='d-flex'>
                  <strong className='text-warning'>COMPANY : &nbsp;</strong> {item.company}
                </div>
                <div className='d-flex'>
                  <strong className='text-warning'>POSITION&nbsp;: &nbsp;</strong> {item.position}
                </div>
                <div className='d-flex'>
                  <strong className='text-warning'>STATUS&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;</strong> {item.status}
                </div>
                <div className='d-flex'>
                  <strong className='text-warning'>DATE &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;: &nbsp;</strong> {item.date}
                </div>
              </div>
              </div>

              
            ))
                     :

                     <div className="row">
                      <div className="col-md-4"></div>
                      <div className="col-md-4" >
                      <a><img className='w-100' src="https://cdn.dribbble.com/users/22691/screenshots/1958250/attachments/340010/Button_800x600.gif" alt="" /></a>
                      </div>
                      <div className="col-md-4"></div>
                     </div>
                      

                      }

                   
          
  
        </div>
    </div>
    </>
  )
}

export default ApplicationDetails