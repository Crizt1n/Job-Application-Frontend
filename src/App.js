import { Route, Routes } from 'react-router-dom';
import './App.css';
import ApplicationDetails from './Components/ApplicationDetails';
import ApplicationList from './Components/ApplicationList';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Auth from './Components/Auth';

function App() {
  return (
    <div className="App">
      
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/applist' element={<ApplicationList/>} />
      <Route path='/appdetails' element={<ApplicationDetails/>} />
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth  register/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
