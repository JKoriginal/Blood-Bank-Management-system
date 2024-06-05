import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import BloodStock from "./routes/BloodStock.jsx";
import BloodDetails from "./routes/BloodDetails.jsx";
import Campaigns from "./routes/Campaigns.jsx";
// import Donor from "./routes/Donor.jsx";
import RequestBlood from "./routes/RequestBlood.jsx";
import Organization from "./routes/Organization.jsx";
import NotFound from "./components/NotFound.jsx";
import ManageBloodStock from "./routes/admin/ManageBloodStock.jsx";
import BloodRequests from "./routes/admin/BloodRequests.jsx";
import DonationCampaigns from "./routes/admin/DonationCampaigns.jsx";
import SendAlert from "./routes/admin/SendAlert.jsx";
import AdminLogin from "./AdminLogin.jsx";
import UserLogin from "./components/UserLogin.jsx";
import UserRegister from "./components/userRegister.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="*" element={<App />}>
          <Route path="BloodStock" element={<BloodStock />} />
          <Route path="BloodDetails" element={<BloodDetails />} />
          <Route path="Campaigns" element={<Campaigns />} />
          {/* <Route path="Donor" element={<Donor />} /> */}
          <Route path="RequestBlood" element={<RequestBlood />} />
          <Route path="create-blood-camp" element={<Organization />} />
        </Route>
        <Route exact path="/admin/*" element={<AdminLogin />}>
          <Route path="ManageBloodStock" element={<ManageBloodStock />} />
          <Route path="BloodRequests" element={<BloodRequests />} />
          <Route path="DonationCampaigns" element={<DonationCampaigns />} />
          <Route path="SendAlert" element={<SendAlert />} />
        </Route>
        <Route exact path="/login" element={<UserLogin />} />
        <Route exact path="/register" element={<UserRegister />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);
