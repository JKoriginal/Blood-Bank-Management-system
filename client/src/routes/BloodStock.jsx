import { useState, useEffect } from 'react';
import axios from '../axiosConfig'
import BloodStockCard from '../components/layout/BloodStockCard';

const BloodStock = () => {
  const [bloodData, setBloodData] = useState([]);

  useEffect(() => {
    const fetchBloodData = async () => {
      try {
        const response = await axios.get(`/bloodStock`);
        setBloodData(response.data);
      } catch (error) {
        console.error('Error fetching blood stock:', error);
      }
    };

    fetchBloodData();
  }, []);

  const renderBloodStockCards = () => {
    return bloodData.map(({ bloodGroup, currentVolume, volume,lastUpdated }) => (
      <BloodStockCard
        key={bloodGroup}
        bloodGroup={bloodGroup}
        currentVolume={currentVolume}
        volume={volume}
        lastUpdated={lastUpdated}
      />
    ));
  };

  return (
    <div>
      
      <h2 className="text-white">Blood Stock</h2>
      <div className="flex flex-wrap gap-4">
        {renderBloodStockCards()}
      </div>
    </div>
  );
};

export default BloodStock;