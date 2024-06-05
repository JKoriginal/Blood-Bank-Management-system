import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

const bloodCompatibility = {
  "O-": {
    canDonateTo: ["O-", "A-", "B-", "AB-"],
    canReceiveFrom: ["O-"]
  },
  "O+": {
    canDonateTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O+", "O-"]
  },
  "A-": {
    canDonateTo: ["A-", "AB-"],
    canReceiveFrom: ["A-", "O-"]
  },
  "A+": {
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"]
  },
  "B-": {
    canDonateTo: ["B-", "AB-"],
    canReceiveFrom: ["B-", "O-"]
  },
  "B+": {
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"]
  },
  "AB-": {
    canDonateTo: ["AB-"],
    canReceiveFrom: ["AB-", "A-", "B-", "O-"]
  },
  "AB+": {
    canDonateTo: ["AB+"],
    canReceiveFrom: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]
  }
};

const ManageBloodRequest = () => {
  const [newRequests, setNewRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [showNoDonorAlert, setShowNoDonorAlert] = useState(false);
  const [showApprovingModal, setShowApprovingModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/bloodRequest');
      const { data } = response;

      const newRequestsData = data.filter(request => !request.approvedStatus);
      setNewRequests(newRequestsData);

      const approvedRequestsData = data.filter(request => request.approvedStatus);
      setApprovedRequests(approvedRequestsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleApprove = async (nationalIDNumber, requestingBloodType) => {
    try {
      const bloodType = requestingBloodType;
      const compatibleGroups = bloodCompatibility[bloodType].canReceiveFrom;
  
      const compatibleDonorsResponse = await axios.get('/users/donor');
      const compatibleDonors = compatibleDonorsResponse.data.result.filter(donor => compatibleGroups.includes(donor.bloodType));
  
      if (compatibleDonors.length === 0) {
        console.log('No compatible donors available.');
        setShowNoDonorAlert(true);
        setShowApprovingModal(false);
        return;
      }
  
      const recipientEmails = compatibleDonors.map(donor => donor.emailAddress);
  
      const emailData = {
        recipients: recipientEmails,
        subject: 'Blood Donation Request',
        text: `There is a blood donation request for the blood type ${bloodType}. Please consider donating if you are available.`,
      };
  
      await axios.post('http://localhost:3001/mail/send', emailData);
  
      await axios.patch(`/bloodRequest/approve/${nationalIDNumber}`);
  
      fetchData();
      setShowApprovingModal(false); // This line ensures the modal disappears after the approval process completes
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };
  

  const handleReject = async (nationalIDNumber) => {
    try {
      await axios.patch(`/bloodRequest/reject/${nationalIDNumber}`);
      fetchData();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleDelete = async (nationalIDNumber) => {
    try {
      await axios.delete(`/bloodRequest/delete/${nationalIDNumber}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showNoDonorAlert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">No compatible donor!</strong>
          <span className="block sm:inline"> There are no compatible donors available.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg onClick={() => setShowNoDonorAlert(false)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1 1 0 01-1.415 1.415L10 11.414l-2.929 2.93a1 1 0 01-1.414-1.415L8.586 10 5.657 7.071a1 1 0 111.415-1.415L10 8.586l2.929-2.93a1 1 0 111.414 1.415L11.414 10l2.929 2.929z"/></svg>
          </span>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Manage Blood Requests</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">New Requests</h3>
        <table className="w-full border-collapse border border-gray-300 text-center text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">NIC</th>
              <th className="border border-gray-300 px-2 py-1">Full Name</th>
              <th className="border border-gray-300 px-2 py-1">Blood Type</th>
              <th className="border border-gray-300 px-2 py-1">Contact Number</th>
              <th className="border border-gray-300 px-2 py-1">Email</th>
              <th className="border border-gray-300 px-2 py-1">Address</th>
              <th className="border border-gray-300 px-2 py-1">Message</th>
              <th className="border border-gray-300 px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {newRequests.map(request => (
              <tr key={request.nationalIDNumber}>
                <td className="border border-gray-300 px-2 py-1">{request.nationalIDNumber}</td>
                <td className="border border-gray-300 px-2 py-1">{request.fullName}</td>
                <td className="border border-gray-300 px-2 py-1">{request.requestingBloodType}</td>
                <td className="border border-gray-300 px-2 py-1">{request.contactNumber}</td>
                <td className="border border-gray-300 px-2 py-1">{request.email}</td>
                <td className="border border-gray-300 px-2 py-1">{request.address}</td>
                <td className="border border-gray-300 px-2 py-1">{request.message}</td>
                <td className="border border-gray-300 px-2 py-1">
                  <button
                    className="w-20 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded m-2"
                    onClick={() => {
                      setShowApprovingModal(true); // Show the modal
                      handleApprove(request.nationalIDNumber, request.requestingBloodType); // Approve the request
                    }}
                  >
                    Approve
                  </button>

                  <button
                    className="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(request.nationalIDNumber)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Approved Requests</h3>
        <table className="w-full border-collapse border border-gray-300 text-center text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">NIC</th>
              <th className="border border-gray-300 px-2 py-1">Full Name</th>
              <th className="border border-gray-300 px-2 py-1">Blood Type</th>
              <th className="border border-gray-300 px-2 py-1">Contact Number</th>
              <th className="border border-gray-300 px-2 py-1">Email</th>
              <th className="border border-gray-300 px-2 py-1">Address</th>
              <th className="border border-gray-300 px-2 py-1">Message</th>
              <th className="border border-gray-300 px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {approvedRequests.map(request => (
              <tr key={request.nationalIDNumber}>
                <td className="border border-gray-300 px-2 py-1">{request.nationalIDNumber}</td>
                <td className="border border-gray-300 px-2 py-1">{request.fullName}</td>
                <td className="border border-gray-300 px-2 py-1">{request.requestingBloodType}</td>
                <td className="border border-gray-300 px-2 py-1">{request.contactNumber}</td>
                <td className="border border-gray-300 px-2 py-1">{request.email}</td>
                <td className="border border-gray-300 px-2 py-1">{request.address}</td>
                <td className="border border-gray-300 px-2 py-1">{request.message}</td>
                <td className="border border-gray-300 px-2 py-1">
                  <button
                    className="w-20 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded m-2"
                    onClick={() => handleReject(request.nationalIDNumber)}
                  >
                    Reject
                  </button>
                  <button
                    className="w-20 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-2"
                    onClick={() => handleDelete(request.nationalIDNumber)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showApprovingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded">
            <p className="text-lg font-bold">Approving...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBloodRequest;
