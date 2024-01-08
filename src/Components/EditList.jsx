import React, { useContext } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from 'react-bootstrap/Button';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editDetailsAPI } from '../services/allAPI';
import { editAppResponseContext } from '../Contexts/ContextShare';

function EditList({list}) {
    
    const {editAppResponse , setEditAppResponse} = useContext(editAppResponseContext)

    const [modalShow, setModalShow] = React.useState(false);
    const [details,setDetails] = useState({
        id : list._id,
        company:list.company,
        position:list.position,
        status: list.status,
        date: new Date(list.date) 
      })

      const handleDateChange = (date) => {
        setDetails({ ...details, date });
      };


    
      console.log(details);
     

      //update function
      const handleUpdate = async(e)=>{

        const {id,company, position, status, date} = details

        if(!company || !position || !status){
            toast.error('Fill the Form Completely')
        }
        else{

            const token = sessionStorage.getItem("token")
            // Format the date as a string in the desired format
            const formattedDate =`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${((date.getHours() + 11) % 12 + 1)}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;

            const reqBody = {
                company,
                position,
                status,
                date:formattedDate,
                token // Include the user token in the request body
              };


            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            };

            const result = await editDetailsAPI(id,reqBody,reqHeader)
            console.log(result);

            if(result.status === 200){
                toast.success('Application Updated Successfully')
                setModalShow(false)
                console.log(result.data);
                setEditAppResponse(result.data)

            }
            else{
                console.log(result.response.data);

            }

        }


      }


  return (
    <>
    <button onClick={() => setModalShow(true)} className='btn btn-outline-success rounded w-50' ><i class="fa-solid fa-pen-to-square text-light"></i></button>


    <Modal
    show={modalShow}
    size="lg"
    onHide={() => setModalShow(false)}
    backdrop="static"
    keyboard={false}
    className='p-1'
   
  >
    <Modal.Header closeButton>
      <Modal.Title>Edit Project Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      
      
      <TextField id="outlined-basic" label="Enter the Company Name" variant="outlined" className='w-100 mb-3'  value={details.company} onChange={(e)=>setDetails({...details,company:e.target.value})}/>

      <TextField id="outlined-basic" label="Position For which you have Applied" variant="outlined" className='w-100 mb-3 '  value={details.position} onChange={(e)=>setDetails({...details,position:e.target.value})}/>

      

      <FormControl className='w-100'>
            <InputLabel id="demo-select-small-label">Interview Status</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              
              label="Interview Status"
              value={details.status} onChange={(e)=>setDetails({...details,status:e.target.value})}
            >
              <MenuItem value={'None'}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Applied'}>Applied</MenuItem>
              <MenuItem value={'Walk-in Interview'}>Walk-in Interview</MenuItem>
              <MenuItem value={'Online Interview'}>Online Interview</MenuItem>
            </Select>
          </FormControl>

      <div className='mt-3 border rounded p-2 d-flex '><span className='m-2'>Date of the Interview : </span>&nbsp;
      <DatePicker selected={details.date} className='form-control border rounded ' 
       showTimeSelect
       timeFormat='HH:mm'
       timeIntervals={15}
       timeCaption='Time'
       dateFormat='MMMM d, yyyy h:mm aa'
       onChange={handleDateChange} // Handle date change
       />
      </div>
      
   


    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-danger rounded" onClick={() => {
        setModalShow(false)
      }}>
        Close
      </Button>
      <Button variant="outline-success rounded" onClick={handleUpdate}>Add</Button>
    </Modal.Footer>
  </Modal>

  <ToastContainer autoClose={2000} theme='colored' position='top-center' />

    </>
  )
}

export default EditList