import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowPassword(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/register', formData, { withCredentials: true });
      if (response.status === 201) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Error registering:', error);
    }
    console.log({formData});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-screen-lg bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">User Type:</label>
            <select
              name="userType"
              value={userType}
              onChange={(e) => {
                setUserType(e.target.value);
                handleChange(e);
              }}
              className="mt-1 bg-blue-50 block w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
              placeholder="Select User Type"
            >
              <option value="">Select User Type</option>
              <option value="donor">Donor</option>
              <option value="organization">Organization</option>
            </select>
          </div>
          {userType && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {userType === 'donor' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700">NIC:</label>
                      <input
                        type="text"
                        name="nic"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter NIC"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Full Name:</label>
                      <input
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Full Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email:</label>
                      <input
                        type="email"
                        name="emailAddress"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contact Number:</label>
                      <input
                        type="text"
                        name="contactNumber"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Contact Number"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Blood Type:</label>
                      <select
                        name="bloodType"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Have Donated:</label>
                      <select
                        name="haveDonated"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      >
                        <option value="">Select Option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </>
                )}
                {userType === 'organization' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700">Organization Name:</label>
                      <input
                        type="text"
                        name="organizationName"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Organization Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Registration Number:</label>
                      <input
                        type="text"
                        name="registrationNumber"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Registration Number"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Type of Organization:</label>
                      <input
                        type="text"
                        name="typeOfOrganization"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Type of Organization"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contact Person Name:</label>
                      <input
                        type="text"
                        name="contactPersonName"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Contact Person Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Contact Number:</label>
                      <input
                        type="text"
                        name="contactNumber"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Contact Number"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Email Address:</label>
                      <input
                        type="text"
                        name="emailAddress"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Email Address"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Address:</label>
                      <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Address"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Purpose or Mission:</label>
                      <input
                        type="text"
                        name="purposeOrMission"
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        placeholder="Enter Purpose or Mission"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  placeholder="Enter Password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </>
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
