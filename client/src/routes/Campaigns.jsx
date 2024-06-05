import { useState, useEffect } from 'react';
import LeafletMap from '../components/LeafletMap';
import CampaignTable from '../components/CampaignTable';
import axios from '../axiosConfig'

const Campaigns = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/bloodCamp/approved');
        setLocations(response.data.approvedCamps); 
        console.log('Locations fetched:', response.data.approvedCamps); 
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="pb-10">
      <h2 className="pb-6 text-white">Campaigns</h2>
      <LeafletMap locations={locations}/>
      <div className="mt-8">
        <CampaignTable locations={locations} />
      </div>
    </div>
  );
};

export default Campaigns;
