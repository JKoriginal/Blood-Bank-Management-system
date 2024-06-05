import BloodCamp from '../models/bloodCampModel.js';

const bloodCampController = {
  create: async (req, res) => {
    try {
      const bloodCampData = req.body;
      const result = await BloodCamp.collection.insertOne(bloodCampData);
      
      console.log('BloodCamp created:', result.insertedId);
      res.status(201).json({ message: 'BloodCamp created successfully', id: result.insertedId });
    } catch (error) {
      console.error('Error creating BloodCamp:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getById: async (req, res) => {
    const campId = req.params.id;
    try{
      const result = await BloodCamp.findById(campId);
      if(!result){
        res.status(201).json({ message: 'No data found!' });
      }else{
        console.log(result)
        res.status(200).json(result);
      }
      
    }catch(error){
      console.error(`Error Fetching ID:${campId}!`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAll: async (req, res) => {
    try{
      const result = await BloodCamp.find();
      if(!result){
        res.status(201).json({ message: 'No data found!' });
      }else{
        console.log("All data fetched successfully!")
        res.status(200).json(result);
      } 
    }catch(error){
      console.error(`Error Fetching data!`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  getApproved: async(req, res) => {
    try{
      const result = await BloodCamp.find();
      const approvedCamps = result.filter(element => element.ApprovedStatus);

      console.log("Data fetched successfully!");
      res.status(200)
      .json({ 
        status: 'success', 
        message: 'Successful!', 
        approvedCamps 
      });
    }catch(error){
      console.error(`Error Fetching data!`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getNotApproved: async (req, res) => {
    try{
      const result = await BloodCamp.find();
      const notApprovedCamps = result.filter(element => !element.ApprovedStatus);

      console.log("Data fetched successfully!");
      res.status(200)
      .json({ 
        status: 'success', 
        message: 'Successful!', 
        notApprovedCamps 
      });
    }catch(error){
      console.error(`Error Fetching data!`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  approve: async (req, res) => {
    const campId = req.params.id;
    try{
      const result = await BloodCamp.updateOne(
        {_id : campId},
        {$set : {ApprovedStatus : true}}
      );
      if (!result) {
        return res.status(404).json({ status: 'error', message: 'Data not found' });
      }
      res.status(200).json({ status: 'success', message: 'Value updated successfully'});
    }catch(error){
      console.error(`Error updating data!`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  reject: async (req, res) => {
    const campId = req.params.id;
    try{
      const result = await BloodCamp.updateOne(
        {_id : campId},
        {$set : {ApprovedStatus : false}}
      );
      if (!result) {
        return res.status(404).json({ status: 'error', message: 'Data not found' });
      }
      res.status(200).json({ status: 'success', message: 'Value updated successfully'});
    }catch(error){
      console.error(`Error updating data!`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    const campId = req.params.id;
    try{
      const deletedCamp = await BloodCamp.findOneAndDelete({ _id: campId });

      if (!deletedCamp) {
        return res.status(404).json({ status: 'error', message: 'Data not found' });
      }
      res.status(200).json({ status: 'success', message: 'Data deleted successfully', deletedCamp });
    }catch(error){
      console.error(`Error updating data!`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default bloodCampController;
