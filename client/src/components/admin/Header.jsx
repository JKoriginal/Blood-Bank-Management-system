import { Button } from "@material-tailwind/react";
import axios from "../../axiosConfig.js";

function Header() {

  const handleLogout = async () => {

    try {
      await axios.post('/auth/admin/logout', {}, { withCredentials: true });
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <div className="flex px-10 h-16 shadow-xs bg-blue-50 ">
      <nav className="w-full flex items-center justify-between">
        <div className="text-[#263238] font-bold text-xl">Admin Dashboard</div>
        <ul className="hidden lg:flex space-x-4">
          <li className="text-white">
            <Button color="red" onClick={handleLogout}>Log Out</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
