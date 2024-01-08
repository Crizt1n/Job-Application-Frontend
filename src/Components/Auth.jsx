import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import logo from '../Assets/pngwing.com.png'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI';


function Auth({register}) {
    //to hold the value from the input box
    const [userData, setUserData] = useState({
        username:"",
        email:"",
        password:""
    })
    console.log(userData);

    const navigate = useNavigate()

    //register Function 
    const handleRegister = async(e)=>{
        e.preventDefault()

        const {username,email,password}= userData

        if(!username || !email || !password){
            toast.info('Please fill the Data Completely')
        }
        else{
            const result = await registerAPI(userData)
            console.log(result.data);

            if(result.status ===200){
                toast.success(`${result.data.username} is successfully registered`)
                setUserData({
                    username:"",
                    email:"",
                    password:""
                })
                //move to login page
                navigate('/login')
            }
            else{
                toast.error(result.response.data)
            }
        }

    }


    //Login  Function

    const handleLogin = async(e)=>{
        e.preventDefault()

        //destructure
        const {email,password} = userData

        if(!email || !password){
            toast.error('Please Fill the Form Completely')
        }
        else{
            const result = await loginAPI(userData)
            console.log(result.data);

            if(result.status===200){
                toast.success('Login Successfull')

                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)

                setUserData({
                    username:"",
                    email:"",
                    password:""
                })

                //navigate
                setTimeout(() => {
                    navigate('/appdetails')
                }, 1200);

            }
            else{
                toast.error(result.response.data)
            }

        }

    }
       
        //Register/login page
       const registerForm =register?true:false
  
  return (
    <>
 
      <div className='row p-5 mb-5 mt-5' >
          
               <div className="col-md-2"></div>
        
                <div className="col-md-8">
        
                    <Link to={'/'} style={{textDecoration:"none", color:"black"}}><h6><i class="fa-solid fa-arrow-left"></i> Back to Home</h6></Link>
                    <div className='container bg-light rounded shadow'>
                        <div className="row mx-auto ">
                            <div className="col-md-5 mt-5">
                                <img className='w-100 p-3 mt-5' src={logo} alt="" />
                            </div>
                            <div className="col-md-7 p-2 mb-4  mt-3">
                                <h2 className='text-center fw-bolder'><i class="fa-solid fa-chart-gantt"></i>&nbsp;{''}   Career Flow</h2>
    
                        <h6 className='text-center mb-3 mt-4 fw-bold'>
                                {
                                    registerForm? "Sign Up to your Account": "Sign In to your Account"
                                }
        
                        </h6>
    
                        <Form className=''>
                                {
                                    registerForm && 
                                    <Form.Group className="mb-3" controlId="formBasicEmail">         
                                    <TextField id="outlined-basic" label="Username" variant="outlined" className='w-100 mb-3' value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}/>
         
                                   
                                </Form.Group>
    
    
                                }
                                    <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <TextField id="outlined-basic" label="Email Address" variant="outlined" className='w-100 ' value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                                </Form.Group>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
    
                                    <Form.Group className="mb-3 mt-2" controlId="formBasicPassword">
                                    <TextField id="outlined-basic" label="Password" variant="outlined" type='password' className='w-100 ' value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                                    </Form.Group>
    
    
    
                                    {
                                        registerForm?
                                        
                                        
                                    <div>
                                        <p>Already a user? Click here to <Link to={'/login'} style={{color:"blue"}}>Login</Link> </p>                                   
                                        <button className='btn btn-outline-dark fw-bolder rounded' onClick={handleRegister}>Register</button>
                                    </div>:
                                       <div>
                                       <p>Don't have an account? Click here to <Link to={'/register'} style={{color:"blue"}}>Register</Link> </p>
                                       <button className='btn btn-outline-dark fw-bolder rounded' onClick={handleLogin}>Login</button>
                                   </div>
    
    
    
                                    }
    
    
                             </Form>
    
                            </div>
                        </div>
    
                    </div>
        
                </div>
        
               <div className="col-md-2"></div>
         
            
      </div>

      <ToastContainer autoClose={2000} theme='colored' position='top-center' />
 
 
    
    </>
  )
}

export default Auth