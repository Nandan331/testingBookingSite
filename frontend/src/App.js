import './App.css';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import Home from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import HotelsPage from './pages/HotelPage.js';
import RoomsPage from './pages/RoomsPage.js';
import UserPage from './pages/UserPage.js';
import { useEffect } from 'react';
import Admin from './pages/AdminPage.js';
import ProtectedRoute from './components/AdminPanel/ProtectRoute/ProtectedRoute.js';
import ViewCustomer from './components/AdminPanel/AdminCustomer/ViewCustomer/viewCustomer.js';
import EditCustomer from './components/AdminPanel/AdminCustomer/EditCustomer/editCustomer.js';
import EditHotel from './components/AdminPanel/AdminHotel/EditHotels/editHotel.js';
import CreateHotel from './components/AdminPanel/AdminHotel/CreateHotels/createHotels.js';



function App() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.overflowX = "auto";
  }; 

  },[])
  return (
    <>
    <HashRouter>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/signup' element={<SignUpPage/>}></Route>
    <Route path='/hotelDetails/:cities' element={<HotelsPage/>}></Route>
    <Route path='/roomLists/:hotelid' element={<RoomsPage/>}></Route>
    <Route path='/useraccount' element={<UserPage/>}></Route>
    <Route element={<ProtectedRoute/>}>
    <Route path='/admin' element={<Admin/>}></Route>
    <Route path='/admin/customer/edit/:userId' element={<EditCustomer/>}></Route>
    <Route path='/admin/customer/view/:userId' element={<ViewCustomer/>}></Route>
    <Route path='/admin/hotel/edit/:hotelid' element={<EditHotel/>}></Route> 
    <Route path='/admin/hotel/create' element={<CreateHotel/>}></Route>
    </Route>
    </Routes>
    </HashRouter>
    </>
  );
}

export default App;
