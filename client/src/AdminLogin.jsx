import { useState, useEffect } from 'react';
import axios from './axiosConfig';
import Admin from './Admin';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/auth/admin/authorized', { withCredentials: true });
        console.log(response.data.loginStatus);
        if (response.data.loginStatus) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/auth/admin/login', { username, password }, { withCredentials: true });
  
      if (response.status === 200) {
        console.log('Login successful');

        setLoggedIn(true);
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  

  if (loggedIn) {
    return <Admin/>;
  }

  return (
    <div className="flex bg-blue-100 items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-5">Admin Login</h1>
        <form onSubmit={handleLogin} className="max-w-sm">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
              required
              className="mt-1 px-2 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {error === 'Invalid username or password' && (
          <p className="text-red-500 mt-2">Invalid username or password. Please try again.</p>
        )}
        {error === 'Error checking authentication' && (
          <p className="text-red-500 mt-2">Authentication error. Please try again later.</p>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
