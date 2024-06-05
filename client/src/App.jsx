import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import axios from './axiosConfig';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import BloodStock from './routes/BloodStock';


function App() {
  const location = useLocation();
  const previousLocation = useRef(location.pathname);

  const [userType, setUserType] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const responseAdmin = await axios.get(`/auth/admin/authorized`, { withCredentials: true });
        const responseDonor = await axios.get(`/auth/donor/authorized`, { withCredentials: true });
        const responseOrganization = await axios.get(`/auth/organization/authorized`, { withCredentials: true });
        
        if (responseDonor.data.loginStatus) {
          setUserType('donor');
          setLoggedIn(true);
        } else if(responseOrganization.data.loginStatus){
          setUserType('organization');
          setLoggedIn(true);
        } else if(responseAdmin.data.loginStatus){
          setUserType('admin');
          setLoggedIn(true);
        }else {
          setUserType('');
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setUserType('');
        setLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const isRouteChanged = location.pathname !== previousLocation.current;
    if (isRouteChanged) {
      previousLocation.current = location.pathname;
    }
  }, [location]);

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col w-full bg-[#242542]'>
        <Header userType={userType} loggedIn={loggedIn}/>
        <div className='px-10'>
          <Routes>
            <Route path="/" element={<BloodStock />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
