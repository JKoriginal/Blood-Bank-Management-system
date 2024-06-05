import { useState } from 'react';
import axios from '../axiosConfig'

const RequestBlood = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    requestingBloodType: '',
    nationalIDNumber: '',
    contactNumber: '',
    email: '',
    address: '',
    nearestBloodBank: '',
    message: '',
    haveDonatedEarlier: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/bloodRequest', formData);
      alert('Blood Request sent successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error creating blood request:', error);
      alert('Error creating blood request. Please try again.');
    }
  };

  return (
    <div className="pb-10">
      <h2 className="text-white pb-6">Request Blood</h2>
      <form onSubmit={handleSubmit} className="mx-auto bg-white p-8 rounded-md shadow-md">
      <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-600 text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="requestingBloodType" className="block text-gray-600 text-sm font-semibold mb-2">
              Requesting Blood Type
            </label>
            <select
              id="requestingBloodType"
              name="requestingBloodType"
              value={formData.requestingBloodType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
              <option value="O+">O+</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="AB-">AB-</option>
              <option value="O-">O-</option>
            </select>
          </div>

        <div className="mb-4">
          <label htmlFor="nationalIDNumber" className="block text-gray-600 text-sm font-semibold mb-2">
            National ID Number
          </label>
          <input
            type="text"
            id="nationalIDNumber"
            name="nationalIDNumber"
            value={formData.nationalIDNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-gray-600 text-sm font-semibold mb-2">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-600 text-sm font-semibold mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nearestBloodBank" className="block text-gray-600 text-sm font-semibold mb-2">
            Nearest Blood Bank
          </label>
          <select
            id="nearestBloodBank"
            name="nearestBloodBank"
            value={formData.nearestBloodBank}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Nearest Blood Bank</option>
            <option value="Colombo">Colombo Blood Bank</option>
            <option value="Kandy">Kandy Blood Bank</option>
            <option value="Anuradhapura">Anuradhapura Blood Bank</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-600 text-sm font-semibold mb-2">
            Message (Optional)
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center text-gray-600">
            <input
              type="checkbox"
              id="haveDonatedEarlier"
              name="haveDonatedEarlier"
              checked={formData.haveDonatedEarlier}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm font-semibold">Have donated earlier</span>
          </label>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600"
          >
            Request Blood
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestBlood;
