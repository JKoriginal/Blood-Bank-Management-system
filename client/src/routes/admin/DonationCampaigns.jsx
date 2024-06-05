import { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import convertDateTime from '../../helper/convertDateTime';

const BloodCampTable = () => {
  const [approvedCamps, setApprovedCamps] = useState([]);
  const [unapprovedCamps, setUnapprovedCamps] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/bloodCamp');
      const data = response.data;
      setApprovedCamps(data.filter(camp => camp.ApprovedStatus));
      setUnapprovedCamps(data.filter(camp => !camp.ApprovedStatus));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`/bloodCamp/approve/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error approving blood camp:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`/bloodCamp/reject/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error rejecting blood camp:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/bloodCamp/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting blood camp:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-lg font-semibold mb-2">Blood Camp Requests</h2>


      <div className="mb-8">
        <h3 className="text-sm font-semibold mb-1">Approved Camps</h3>
        <table className="w-full border-collapse border border-gray-300 text-center text-xs">
          <thead>
            <tr>
              <th className="border border-gray-300 px-1 py-1">Camp Name</th>
              <th className="border border-gray-300 px-1 py-1">Date</th>
              <th className="border border-gray-300 px-1 py-1">Start Time</th>
              <th className="border border-gray-300 px-1 py-1">End Time</th>
              <th className="border border-gray-300 px-1 py-1">Organizer</th>
              <th className="border border-gray-300 px-1 py-1">Venue</th>
              <th className="border border-gray-300 px-1 py-1">Contact Person</th>
              <th className="border border-gray-300 px-1 py-1">Contact Number</th>
              <th className="border border-gray-300 px-1 py-1">Donor Registration Form</th>
              <th className="border border-gray-300 px-1 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {approvedCamps.map(camp => (
              <tr key={camp._id}>
                <td className="border border-gray-300 px-1 py-1 whitespace-wrap">{camp.CampName}</td>
                <td className="border border-gray-300 px-1 py-1">{convertDateTime(camp.Date).slice(0,-10)}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.StartTime}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.EndTime}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.Organizer}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.Venue.Name}</td>
                <td className="border border-gray-300 px-1 py-1 whitespace-wrap">{camp.ContactPerson}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.ContactNumber}</td>
                <td className="border border-gray-300 px-1 py-1">
                  <a href={camp.DonorRegistrationForm} target="_blank" rel="noopener noreferrer">
                    Registration Form
                  </a>
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded m-2"
                    onClick={() => handleReject(camp._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(camp._id)}
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
        <h3 className="text-sm font-semibold mb-1">Pending Camps</h3>
        <table className="w-full border-collapse border border-gray-300 text-center text-xs">
          <thead>
            <tr>
              <th className="border border-gray-300 px-1 py-1">Camp Name</th>
              <th className="border border-gray-300 px-1 py-1">Date</th>
              <th className="border border-gray-300 px-1 py-1">Start Time</th>
              <th className="border border-gray-300 px-1 py-1">End Time</th>
              <th className="border border-gray-300 px-1 py-1">Organizer</th>
              <th className="border border-gray-300 px-1 py-1">Venue</th>
              <th className="border border-gray-300 px-1 py-1">Contact Person</th>
              <th className="border border-gray-300 px-1 py-1">Contact Number</th>
              <th className="border border-gray-300 px-1 py-1">Donor Registration Form</th>
              <th className="border border-gray-300 px-1 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {unapprovedCamps.map(camp => (
              <tr key={camp._id}>
                <td className="border border-gray-300 px-1 py-1 whitespace-wrap">{camp.CampName}</td>
                <td className="border border-gray-300 px-1 py-1">{convertDateTime(camp.Date).slice(0,-10)}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.StartTime}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.EndTime}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.Organizer}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.Venue.Name}</td>
                <td className="border border-gray-300 px-1 py-1 whitespace-wrap">{camp.ContactPerson}</td>
                <td className="border border-gray-300 px-1 py-1">{camp.ContactNumber}</td>
                <td className="border border-gray-300 px-1 py-1">
                  <a href={camp.DonorRegistrationForm} target="_blank" rel="noopener noreferrer">
                    Registration Form
                  </a>
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <button
                    className="w-28 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded m-2"
                    onClick={() => handleApprove(camp._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="w-28 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(camp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodCampTable;
