import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import ApplicationDetails from './ApplicationDetails';
import ApplicationForm from './ApplicationForm';

function Header() {


  const navigate = useNavigate()
  const handleLogout=() =>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    navigate('/',{ replace: true })
  }

  // Check if the user is authenticated

  const isAuthenticated = !!sessionStorage.getItem('token');

  //Modal function 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
   <>
      <Navbar bg="primary" expand="lg" className="w-100">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className='text-white fs-2'>
          <i class="fa-solid fa-chart-gantt"></i>&nbsp;
             Career Flow
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto p-2'>
              <NavLink ><ApplicationForm /></NavLink>
              <Nav.Link as={NavLink} to="/applist" className='text-white ms-2' activeClassName="active">
              Edit Application
              </Nav.Link>
              <Nav.Link as={NavLink} to="/appdetails" className='text-white ms-2' activeClassName="active">
                Dashboard
              </Nav.Link>
              {ApplicationDetails && isAuthenticated && (
              // Display logout button only if authenticated
              <button className='btn border rounded text-light ms-2' onClick={handleShow}>
                Logout <i className='fa-solid fa-power-off'></i>
              </button>
              )}
              
              
            </Nav>
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className='p-5' 
      
      >
        <Modal.Header closeButton >
          <Modal.Title>Are you sure to Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="outline-secondary rounded" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-danger rounded" onClick={handleLogout}>Confirm</Button>
        </Modal.Footer>
      </Modal>
   </>
  );
}

export default Header;