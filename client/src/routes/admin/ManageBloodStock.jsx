import { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import convertDateTime from '../../helper/convertDateTime';

const ManageBloodStock = () => {
  const [bloodData, setBloodData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/bloodStock');
      setBloodData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = async (index) => {
    try {
      const bloodType = bloodData[index].bloodGroup;
      const currentVolume = bloodData[index].currentVolume;
      const volume = bloodData[index].volume;
  
      await axios.patch(`/bloodStock/${bloodType}`, {
        currentVolume,
        volume
      });
  
      const updatedBloodData = [...bloodData];
      updatedBloodData[index].lastUpdated = new Date().toLocaleString();
      setBloodData(updatedBloodData);
      setEditingIndex(-1);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleCancel = () => {
    setEditingIndex(-1);
  };

  const handleVolumeChange = (event, index) => {
    const newData = [...bloodData];
    newData[index].currentVolume = parseInt(event.target.value);
    setBloodData(newData);
  };

  const handleVolumePintsChange = (event, index) => {
    const newData = [...bloodData];
    newData[index].volume = parseInt(event.target.value);
    newData[index].currentVolume = Math.min(newData[index].currentVolume, newData[index].volume);
    setBloodData(newData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Manage Blood Stock</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Blood Group</th>
            <th className="border border-gray-300 px-2 py-1">Volume (pints)</th>
            <th className="border border-gray-300 px-2 py-1">Current Volume (pints)</th>
            <th className="border border-gray-300 px-2 py-1">Last Updated</th>
            <th className="border border-gray-300 px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {bloodData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              <td className="border border-gray-300 px-2 py-1">{item.bloodGroup}</td>
              <td className="border border-gray-300 px-2 py-1">
                {editingIndex === index ? (
                  <input
                    type="number"
                    className="w-full px-1 py-1 border border-gray-300 text-sm"
                    value={item.volume}
                    onChange={(event) => handleVolumePintsChange(event, index)}
                  />
                ) : (
                  item.volume
                )}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {editingIndex === index ? (
                  <input
                    type="number"
                    className="w-full px-1 py-1 border border-gray-300 text-sm"
                    value={item.currentVolume}
                    onChange={(event) => handleVolumeChange(event, index)}
                  />
                ) : (
                  item.currentVolume
                )}
              </td>
              <td className="border border-gray-300 px-2 py-1 text-sm">{convertDateTime(item.lastUpdated)}</td>
              <td className="border border-gray-300 px-2 py-1 flex justify-center">
                {editingIndex === index ? (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1 text-sm"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded text-sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBloodStock;
