import { useState } from 'react';
import PropTypes from 'prop-types';

function formatDate(dateString) {
  const formattedDate = dateString.substring(0, 10);
  return formattedDate;
}

const CampaignTable = ({ locations }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter((camp) =>
    camp.CampName.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 p-2 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredLocations.map((camp) => (
          <div key={camp._id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{camp.CampName}</h2>
            <p>Date: {formatDate(camp.Date)}</p>
            <p>Start Time: {camp.StartTime}</p>
            <p>End Time: {camp.EndTime}</p>
            <p>Organizer: {camp.Organizer}</p>
            <p>Address: {camp.Venue.Name}</p>
            <p>Contact Person: {camp.ContactPerson}</p>
            <p>Contact Number: {camp.ContactNumber}</p>
            <p>
              <a href={camp.DonorRegistrationForm} target="_blank" rel="noopener noreferrer">
                Donor Registration Form
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

CampaignTable.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.shape({
        $oid: PropTypes.string,
      }),
      CampName: PropTypes.string,
      Date: PropTypes.shape({
        $date: PropTypes.string,
      }),
      StartTime: PropTypes.string,
      EndTime: PropTypes.string,
      Organizer: PropTypes.string,
      Venue: PropTypes.shape({
        Name: PropTypes.string,
        Latitude: PropTypes.number,
        Longitude: PropTypes.number,
      }),
      ContactPerson: PropTypes.string,
      ContactNumber: PropTypes.string,
      DonorRegistrationForm: PropTypes.string,
      CampStatus: PropTypes.string,
      ApprovedStatus: PropTypes.bool,
      __v: PropTypes.number,
    })
  ),
};

export default CampaignTable;
