import { useState } from 'react';
import axios from '../axiosConfig'

const Organization = () => {
    const [formData, setFormData] = useState({
        CampName: '',
        Venue: {
            Name: '',
            Latitude: '',
            Longitude: ''
        },
        Date: '',
        StartTime: '',
        EndTime: '',
        Organizer: '',
        ContactPerson: '',
        ContactNumber: '',
        DonorRegistrationForm: '',
        ApprovedStatus: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'VenueName' || name === 'VenueLatitude' || name === 'VenueLongitude') {
            setFormData({
                ...formData,
                Venue: {
                    ...formData.Venue,
                    [name.replace('Venue', '')]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/bloodCamp', formData);
            alert('Blood camp created successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error creating blood camp:', error);
            alert('Error creating blood camp. Please try again.');
        }
    };

    return (
        <div className="container mx-auto mb-5 mr-3">
            <h2 className="text-white mb-4">Create Blood Camp</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="CampName" className="block text-sm font-medium text-gray-700">Camp Name:</label>
                            <input type="text" id="CampName" name="CampName" value={formData.CampName} onChange={handleChange} placeholder="Enter camp name" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                        </div>
                        <div>
                            <label htmlFor="VenueName" className="block text-sm font-medium text-gray-700">Venue Name:</label>
                            <input type="text" id="VenueName" name="VenueName" value={formData.Venue.Name} onChange={handleChange} placeholder="Enter venue name" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="VenueLatitude" className="block text-sm font-medium text-gray-700">Venue Latitude:</label>
                                <input type="number" id="VenueLatitude" name="VenueLatitude" value={formData.Venue.Latitude} onChange={handleChange} placeholder="Enter venue latitude" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                            </div>
                            <div>
                                <label htmlFor="VenueLongitude" className="block text-sm font-medium text-gray-700">Venue Longitude:</label>
                                <input type="number" id="VenueLongitude" name="VenueLongitude" value={formData.Venue.Longitude} onChange={handleChange} placeholder="Enter venue longitude" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="Date" className="block text-sm font-medium text-gray-700">Date:</label>
                                <input type="date" id="Date" name="Date" value={formData.Date} onChange={handleChange} placeholder="Select date" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                            </div>
                            <div>
                                <label htmlFor="StartTime" className="block text-sm font-medium text-gray-700">Start Time:</label>
                                <input type="time" id="StartTime" name="StartTime" value={formData.StartTime} onChange={handleChange} placeholder="Select start time" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                            </div>
                            <div>
                                <label htmlFor="EndTime" className="block text-sm font-medium text-gray-700">End Time:</label>
                                <input type="time" id="EndTime" name="EndTime" value={formData.EndTime} onChange={handleChange} placeholder="Select end time" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Organizer" className="block text-sm font-medium text-gray-700">Organizer:</label>
                            <input type="text" id="Organizer" name="Organizer" value={formData.Organizer} onChange={handleChange} placeholder="Enter organizer name" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                        </div>
                        <div>
                            <label htmlFor="ContactPerson" className="block text-sm font-medium text-gray-700">Contact Person:</label>
                            <input type="text" id="ContactPerson" name="ContactPerson" value={formData.ContactPerson} onChange={handleChange} placeholder="Enter contact person" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                        </div>
                        <div>
                            <label htmlFor="ContactNumber" className="block text-sm font-medium text-gray-700">Contact Number:</label>
                            <input type="tel" id="ContactNumber" name="ContactNumber" value={formData.ContactNumber} onChange={handleChange} placeholder="Enter contact number" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10" required />
                        </div>
                        <div>
                            <label htmlFor="DonorRegistrationForm" className="block text-sm font-medium text-gray-700">Donor Registration Form:</label>
                            <input type="text" id="DonorRegistrationForm" name="DonorRegistrationForm" value={formData.DonorRegistrationForm} onChange={handleChange} placeholder="Enter donor registration form URL" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-10"  />
                        </div>
                        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Create Blood Camp</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Organization;
