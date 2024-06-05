import BloodRequest from '../models/bloodRequestModel.js';

const bloodRequestController = {
  create: async (req, res) => {
    try {
      const bloodRequestData = req.body;
      bloodRequestData.approvedStatus = false;
  
      const result = await BloodRequest.create(bloodRequestData);
      
      console.log('Blood Request created:', result.insertedId);
      res.status(201).json({ message: 'Blood Request created successfully', id: result.insertedId });
    } catch (error) {
      console.error('Error creating Blood Request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  getById: async (req, res) => {
    const nationalIDNumber = req.params.nationalIDNumber;
    try {
      const bloodRequest = await BloodRequest.findOne({ nationalIDNumber });
      if (!bloodRequest) {
        return res.status(404).json({ error: 'Blood Request not found' });
      }
      res.status(200).json(bloodRequest);
    } catch (error) {
      console.error('Error getting Blood Request by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAll: async (req, res) => {
    try {
      const bloodRequests = await BloodRequest.find();
      res.status(200).json(bloodRequests);
    } catch (error) {
      console.error('Error getting all Blood Requests:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  update: async (req, res) => {
    const nationalIDNumber = req.params.nationalIDNumber;
    const requestData = req.body;
    try {
      const bloodRequest = await BloodRequest.findOneAndUpdate({ nationalIDNumber }, requestData, { new: true });
      if (!bloodRequest) {
        return res.status(404).json({ error: 'Blood Request not found' });
      }
      res.status(200).json(bloodRequest);
    } catch (error) {
      console.error('Error updating Blood Request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  approve: async (req, res) => {
    const nationalIDNumber = req.params.nationalIDNumber;
    try {
      const bloodRequest = await BloodRequest.findOneAndUpdate({ nationalIDNumber }, { $set: { approvedStatus: true } }, { new: true });
      if (!bloodRequest) {
        return res.status(404).json({ error: 'Blood Request not found' });
      }
      res.status(200).json({ message: 'Blood Request approved successfully', bloodRequest });
    } catch (error) {
      console.error('Error approving Blood Request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  reject: async (req, res) => {
    const nationalIDNumber = req.params.nationalIDNumber;
    try {
      const bloodRequest = await BloodRequest.findOneAndUpdate({ nationalIDNumber }, { $set: { approvedStatus: false } }, { new: true });
      if (!bloodRequest) {
        return res.status(404).json({ error: 'Blood Request not found' });
      }
      res.status(200).json({ message: 'Blood Request rejected successfully', bloodRequest });
    } catch (error) {
      console.error('Error rejecting Blood Request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    const nationalIDNumber = req.params.nationalIDNumber;
    try {
      const result = await BloodRequest.findOneAndDelete({ nationalIDNumber });
      if (!result) {
        return res.status(404).json({ error: 'Blood Request not found' });
      }
      res.status(200).json({ message: 'Blood Request deleted successfully' });
    } catch (error) {
      console.error('Error deleting Blood Request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default bloodRequestController;
