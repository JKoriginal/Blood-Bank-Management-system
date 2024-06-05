import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, Syringe, MapPinned, Gauge, ArrowRight, Droplet } from "lucide-react";

const linksList = [
  { name: "Blood Stock", icon: Gauge, link: "/BloodStock" },
  { name: "Awareness", icon: Droplet, link: "/BloodDetails" },
  // { name: "Donor", icon: CircleUserRound, link: "/Donor" },
  { name: "Request Blood", icon: Syringe, link: "/RequestBlood" },
  { name: "Campaigns", icon: MapPinned, link: "/Campaigns" },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedActiveItem = localStorage.getItem("activeItem");
    if (storedActiveItem !== null) {
      setActiveItem(JSON.parse(storedActiveItem));
    }
  }, []); // Only on mount

  const handleToggleSidebar = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
    localStorage.setItem("activeItem", JSON.stringify(index));
    Navigate(linksList[index].link);
  };

  return (
    <div
      className={`py-12 border border-r-1 border-b-0 h-screen relative transition-all 
        ${isExpanded ? "w-72 px-10" : "w-20 pl-3 pr-4"}`}
    >
      {/* Logo Section */}
      <Link to="/" onClick={() => handleItemClick(0)}>
        <div className="logo-div flex space-x-3 items-center">
          <img src={logo} className="w-12" alt="logo" />
          <span
            className={`font-bold text-neutral-900 ${isExpanded ? "block whitespace-nowrap" : "hidden"}`}
          >
            SAVE A LIFE<br></br>GIVE BLOOD
          </span>
        </div>
      </Link>

      {/* Sidebar Toggle Button */}
      <div
        className="flex mt-8 items-center justify-center w-8 h-8 bg-[#FF8C8C] rounded-full absolute -right-4 top-12 cursor-pointer transition-transform duration-20 transform rotate-0"
        onClick={handleToggleSidebar}
      >
        <ArrowRight
          className={`w-5 h-5 text-white transform transition ease-in-out duration-500 ${
            isExpanded ? "-rotate-[540deg]" : "rotate-0"
          }`}
        />
      </div>

      {/* Sidebar Links */}
      <div className="mt-10 space-y-5 text-neutral-600">
        {linksList.map((item, index) => (
          <div
            key={index}
            className={`flex py-2 px-3 gap-4 rounded cursor-pointer ${
              activeItem === index
                ? "bg-[#FF8C8C] text-white font-semibold"
                : "hover:bg-blue-50"
            }`}
            onClick={() => handleItemClick(index)}
          >
            <item.icon />
            <span className={isExpanded ? "block whitespace-nowrap" : "hidden"}>
              {item?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;