import React, { useState } from 'react';

function DonorRegistration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setRegistered] = useState(false);

  const handleRegistration = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setRegistered(true);
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div>
      <h2 className="text-white mb-10">Donor Registration</h2>
      {isRegistered ? (
        <div>
          <h2 className="text-2xl text-gray-800">Registration successful!</h2>
          {/* You can redirect the user or show additional information here */}
        </div>
      ) : (
        <div>
          <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <form onSubmit={handleRegistration}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonorRegistration;