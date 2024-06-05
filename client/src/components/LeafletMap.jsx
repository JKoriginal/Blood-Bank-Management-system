import PropTypes from 'prop-types'; // Import PropTypes for props validation
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ locations }) => {
  const sriLankaCenter = [7.8731, 80.7718]; // Center of Sri Lanka
  const zoomLevel = 5;

  const customIcon = new L.Icon({
    iconUrl: '/icons/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '/icons/marker-shadow.png',
    shadowSize: [41, 41],
  });

  const MyPopupMarker = ({ campName, position, date, timeStart, timeEnd, organizer, location }) => {
    const map = useMap();

    const handleClick = () => {
      map.setView(position, map.getZoom() + 100);
    };

    map.setMinZoom(7);

    return (
      <Marker position={position} icon={customIcon} eventHandlers={{ click: handleClick }}>
        <Popup>
          <div>
            <h2 className="text-xl font-bold mb-2">{campName}</h2>
            <p>Date: {date}</p>
            <p>Time: {timeStart} - {timeEnd}</p>
            <p>Organizer: {organizer}</p>
            <p>Location: {location}</p>
          </div>
        </Popup>
      </Marker>
    );
  };

  function formatDate(dateString) {
    if (!dateString) return ''; // Check if dateString is undefined or null
    const formattedDate = dateString.substring(0, 10);
    return formattedDate;
  }

  // Filter out locations with undefined latitude or longitude
  const validLocations = locations.filter((location) => location.Venue.Latitude !== undefined && location.Venue.Longitude !== undefined);

  return (
    <MapContainer
      center={sriLankaCenter}
      zoom={zoomLevel}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {validLocations.map((location) => (
        <MyPopupMarker
          key={location._id}
          position={[location.Venue.Latitude, location.Venue.Longitude]}
          campName={location.CampName}
          date={formatDate(location.Date)}
          timeStart={location.StartTime}
          timeEnd={location.EndTime}
          organizer={location.Organizer}
          location={location.Venue.Name}
        />
      ))}
    </MapContainer>
  );
};

// Define prop types for LeafletMap component
LeafletMap.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Venue: PropTypes.shape({
        Latitude: PropTypes.number.isRequired,
        Longitude: PropTypes.number.isRequired,
        Name: PropTypes.string.isRequired,
      }),
      CampName: PropTypes.string.isRequired,
      Date: PropTypes.string,
      StartTime: PropTypes.string,
      EndTime: PropTypes.string,
      Organizer: PropTypes.string,
      ContactPerson: PropTypes.string,
      ContactNumber: PropTypes.string,
      DonorRegistrationForm: PropTypes.string,
      CampStatus: PropTypes.string,
      ApprovedStatus: PropTypes.bool,
      __v: PropTypes.number,
    })
  ).isRequired,
};

export default LeafletMap;
