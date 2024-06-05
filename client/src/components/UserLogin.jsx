import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const UserLogin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); 
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const responseDonor = await axios.get(`/auth/donor/authorized`, { withCredentials: true });
        const responseOrganization = await axios.get(`/auth/organization/authorized`, { withCredentials: true });
        if (responseDonor.data.loginStatus) {
          setLoggedIn(true);
          setUserType('donor');
          setShowLoginForm(true); 
          navigate('/');
        } else if(responseOrganization.data.loginStatus){
            setLoggedIn(true);
            setUserType('organization');
            setShowLoginForm(true); 
            navigate('/');
        } else {
          setLoggedIn(false);
          setUserType('');
          setShowLoginForm(true); 
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setLoggedIn(false);
        setUserType('');
        setShowLoginForm(true); 
      }
    };

    checkAuthentication();
  }, []);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!identifier || !password) {
        setError('Please enter your identifier and password');
        return;
      }

      let postData;
      if (userType === 'donor') {
        postData = { nic: identifier, password };
      } else if (userType === 'organization') {
        postData = { registrationNumber: identifier, password };
      }

      const response = await axios.post(`/auth/${userType}/login`, postData, { withCredentials: true });

      if (response.status === 200) {
        console.log('Login successful');
        setLoggedIn(true);
        navigate('/');
      } else {
        setError('Invalid identifier or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const handleClear = () => {
    setIdentifier('');
    setPassword('');
  };

  const renderLoginForm = () => {
    if (!showLoginForm) {
      return null; 
    }

    return (
      <form onSubmit={handleLoginFormSubmit} className="w-full">
        <div className="mb-4">
          <label className="block text-gray-700">Select User Type:</label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                value="donor"
                checked={userType === 'donor'}
                onChange={() => {
                  setUserType('donor');
                  setIdentifier(''); 
                }}
              /> Donor
            </label>
            <label>
              <input
                type="radio"
                value="organization"
                checked={userType === 'organization'}
                onChange={() => {
                  setUserType('organization');
                  setIdentifier(''); 
                }}
              /> Organization
            </label>
          </div>
        </div>
        {userType && (
          <>
            <div className="mb-4">
              <label htmlFor="identifier" className="block text-gray-700">
                {userType === 'donor' ? 'NIC' : 'Registration Number'}:
              </label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={`Enter ${userType === 'donor' ? 'NIC' : 'Registration Number'}`}
                className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className='flex justify-between gap-5'>
              <button
                type="submit"
                className="w-4/5 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <button
                onClick={handleClear}
                className="w-1/5 bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
            </div>
          </>
        )}
      </form>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#b5dee6]">
      <div className="w-full m-5 md:w-3/4 lg:w-1/2 bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-5">User Login</h1>
        {renderLoginForm()}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default UserLogin;
