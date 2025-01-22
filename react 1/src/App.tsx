import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './RideShare/Home';
import OwnerHome from './RideShare/OwnerHome';
import UserHome from './RideShare/UserHome';
import VehicleReg from './RideShare/VehicleReg';




function App() {
  return (
    <div className='container-fluid bg'>
      <BrowserRouter>
        <Link to="/" ></Link>
        <Link to="/userHome" ></Link>
        <Link to="/ownerHome" ></Link>
        <Routes>
          
          <Route path='/' element={<Home></Home>}>Home</Route>
          <Route path='/userHome' element={<UserHome></UserHome>}>Home</Route>
          
          <Route path='/ownerHome' element={<OwnerHome></OwnerHome>}>Home</Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;