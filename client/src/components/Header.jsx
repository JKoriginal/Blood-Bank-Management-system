import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from '../axiosConfig';

function Header({ userType, loggedIn }) {
  
  const handleLogout = async () => {
    try {
      await axios.post(`/auth/${userType}/logout`, {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex px-10 py-10 h-16 shadow-xs bg-[#242542]">
      <nav className="w-full flex items-center justify-between">
        <Link to="/">
          <div className="text-white font-bold text-xl">Blood Bank Management System</div>
        </Link>
        <ul className="hidden lg:flex space-x-4 justify-center items-center">
          {userType && (
            <li className="text-white">
              Welcome {userType}
            </li>
          )}
          {userType === "organization" && (
            <Link to="/create-blood-camp">
              <Button color="blue">Create Blood Camp</Button>
            </Link>
          )}
          {userType === "admin" && (
            <Link to="/admin">
              <Button color="blue">Admin Dashboard</Button>
            </Link>
          )}
          {loggedIn ? (
              <Button color="red" onClick={handleLogout}>Log Out</Button>
            ) : (
              <>
                <Link to="/register">
                  <Button color="blue">Register</Button>
                </Link>
                <Link to="/login">
                  <Button color="red">Log In</Button>
                </Link>
              </>
            )}

        </ul>
      </nav>
    </div>
  );
}

export default Header;
