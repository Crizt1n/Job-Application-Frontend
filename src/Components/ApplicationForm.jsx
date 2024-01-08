import React, { useContext, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDetailsAPI } from '../services/allAPI';
import { addAppResponseContext } from '../Contexts/ContextShare';
import { useNavigate } from 'react-router-dom';



function ApplicationForm() {

  //useContext hook is used to access the Context API
  const {addAppResponse, setAddAppResponse} = useContext(addAppResponseContext)
  const navigate = useNavigate();
  const [token, setToken] = useState("")
  const [modalShow, setModalShow] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [startDate, setStartDate] = useState(new Date());
  const handleChange = (event) => {
      setStatus(event.target.value);
      setDetails({...details,status:event.target.value})
    };
  

  //state to hold the value from the input box
  const [details,setDetails] = useState({
    company:"",
    position:"",
    status:"",
    date: new Date()
  })

  console.log(details);

  //clear function
  const handleClear = ()=>{
    setDetails({
      company:"",
      position:"",
      status: "",
      date: new Date()
    })
    setStatus(""); // Set the status in the separate state variable to its default value
    setStartDate(new Date()); // Set the date in the separate state variable to the default date
  }

  useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
    
  },[])
  console.log(token);

  


 // add function
const handleAdd = async(e) => {
  e.preventDefault();

  const { company, position, status, date } = details;

  if (!company || !position || !status) {
    toast.error('Please Fill the form Completely');
  } 
  else {
    //reqbody
    const reqBody = {
      company,
      position,
      status,
      date,
      token // Include the user token in the request body
    };

    if(token){
      const reqHeader= {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      };

      const result = await addDetailsAPI(reqBody,reqHeader);
      console.log(result);

      if(result.status===200){
        toast.success('Project Successfully Added')

        handleClear()
        setModalShow(false)
        setAddAppResponse(result.data)
        navigate('/appdetails')
        
        

      }
      else{
        if(result.response && result.response.data){
          toast.error(result.response.data)
        }
        else{
          toast.error('An Error Occurred')
          console.log(result);
        }
      }
  
    }

    

  }
};



  return (
    <>

    <div className=' text-light p-2 mt-1 me-2' onClick={() => setModalShow(true)}>Add new Application
      </div>

   
      
     
  


    <Modal
    show={modalShow}
    size="lg"
    onHide={() => setModalShow(false)}
    backdrop="static"
    keyboard={false}
   
  >
    <Modal.Header closeButton>
      <Modal.Title>Add Project Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      
      
      <TextField id="outlined-basic" label="Enter the Company Name" variant="outlined" className='w-100 mb-3' value={details.company} onChange={(e)=>setDetails({...details,company:e.target.value})}/>

      <TextField id="outlined-basic" label="Position For which you have Applied" variant="outlined" className='w-100 mb-3 ' value={details.position} onChange={(e)=>setDetails({...details,position:e.target.value})}/>

      

      <FormControl className='w-100'>
            <InputLabel id="demo-select-small-label">Interview Status</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={status}
              label="Interview Status"
              onChange={handleChange}
            >
              <MenuItem value={"None"} onChange={(e)=>setDetails({...details,status:e.target.value})}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Applied'}>Applied</MenuItem>
              <MenuItem value={'Walk-in Interview'}>Walk-in Interview</MenuItem>
              <MenuItem value={'Online Interview'}>Online Interview</MenuItem>
            </Select>
          </FormControl>

      <div className='mt-3 border rounded p-2 d-flex '><span className='m-2'>Date of the Interview : </span>&nbsp;
      <DatePicker selected={startDate} onChange={(date) => {
        setStartDate(date);
        setDetails({...details,date: date.toLocaleString()});
       }} className='form-control border rounded ' 
       showTimeSelect
       timeFormat='HH:mm'
       timeIntervals={15}
       timeCaption='Time'
       dateFormat='MMMM d, yyyy h:mm aa'
       />
      </div>
      
   


    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-danger rounded" onClick={() => {
        handleClear()
        setModalShow(false)
      }}>
        Close
      </Button>
      <Button variant="outline-info rounded" onClick={handleClear}>Clear</Button>
      <Button variant="outline-success rounded" onClick={handleAdd}>Add</Button>
    </Modal.Footer>
  </Modal>

  <ToastContainer autoClose={2000} theme='colored' position='top-center' />


  </> 

  )
}

export default ApplicationForm