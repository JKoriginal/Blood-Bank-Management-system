import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const linksList = [
  { name: "Manage Blood Stock", link: "/admin/ManageBloodStock" },
  { name: "Blood Requests", link: "/admin/BloodRequests" },
  { name: "Donation Campaigns", link: "/admin/DonationCampaigns" },
  { name: "Send Mail", link: "/admin/SendAlert" },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(0);
  const Navigate = useNavigate();

  useEffect(() => {
    const storedActiveItem = localStorage.getItem("adminactiveItem");
    if (storedActiveItem !== null) {
      setActiveItem(JSON.parse(storedActiveItem));
    }
  }, []); 

  const handleItemClick = (index) => {
    setActiveItem(index);
    localStorage.setItem("adminactiveItem", JSON.stringify(index));
    Navigate(linksList[index].link);
  };


  return (
    <div className="bg-[#7f1d1d] pt-7 pb-12 w-72 px-8 min-h-screen">

      <Link to="/" onClick={() => handleItemClick(0)}>
        <div className="text-white logo-div flex space-x-3 items-center">
          <span className="font-bold text-neutral-900">BLOOD BANK<br/>MANAGEMENT SYSTEM</span>
        </div>
      </Link>

      <div className="mt-10 space-y-5 text-neutral-600">
        {linksList.map((item, index) => (
          <div
            key={index}
            className={`flex py-2 px-3 gap-4 rounded cursor-pointer ${
              activeItem === index ? "bg-[#FF8C8C] text-white font-semibold" : "bg-white hover:bg-blue-50"
            }`}
            onClick={() => handleItemClick(index)}
          >
            <span className="block whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;