import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import your CSS file for styling

function Home() {
  return (
    <div > 
       <div className="divStyle" style={{ backgroundImage: `linear-gradient(rgba(33, 11, 11, 0.7), rgba(0, 0, 0, 0.7)), url(https://getshogun.com/wp-content/uploads/2022/07/620311e2da3c6906b6ddd7d5_How-to-Change-Your-Shopify-Theme-Without-Losing-Content.jpeg)` }}>
      <h1 className="container h1Style d-flex align-items-center justify-content-center fw-bolder "><i class="fa-solid fa-chart-gantt"></i>&nbsp;CAREERFLOW</h1>
      {/* <h1 className="h2Style d-flex align-items-center justify-content-center fw-bolder ">MANAGEMENT SYSTEM</h1> */}

      <div className="d-flex justify-content-center align-items-center">
        <p className="pStyle container">
          "Welcome to CareerFlow, your dedicated companion in navigating the professional landscape. Empower your career journey with our innovative job application tracker, meticulously designed to streamline your job search process. CareerFlow harmonizes the complexities of job applications, interviews, and offers into a seamless experience, allowing you to focus on what matters most – your career growth.

            With CareerFlow, effortlessly organize and monitor your job applications, receive timely notifications, and gain valuable insights into your job-seeking progress. Our user-centric platform empowers you to take control of your career trajectory, providing a centralized hub for managing opportunities, interviews, and application statuses. Join CareerFlow and embark on a transformative career exploration where your aspirations meet endless possibilities. Your journey starts here; let CareerFlow be your steadfast companion in shaping a successful and fulfilling professional future."
          
        </p>

      </div>

      <div className="d-flex justify-content-center align-items-center"  style={{paddingBottom:'90px'}}>
        {/* <button className="btn btn-success rounded ">Explore Now</button> */}
        
        <Link to={`/login`} className='btn btn-outline-dark text-light rounded buttonStyle mb-5'>Explore Now</Link>
      </div>
    </div>
    </div>
  );
}

export default Home