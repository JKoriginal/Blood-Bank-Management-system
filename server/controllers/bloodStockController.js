import BloodStockModel from '../models/bloodStockModel.js'

// http:localhost:3001/bloodStock/
const createBloodStockEntry = async (req, res) => {
    try {
        const newBloodStockEntry = new BloodStockModel(req.body);
        await newBloodStockEntry.save();
        res.status(201).json(newBloodStockEntry);
    } catch (error) {
        console.error('Error creating blood stock entry:', error);
        res.status(500).json({ error: 'Error creating blood stock entry' });
    }
};

// http:localhost:3001/bloodStock/
const getAllBloodStockEntries = async (req, res) => {
    try {
        const bloodStockEntries = await BloodStockModel.find();
        res.json(bloodStockEntries);
    } catch (error) {
        console.error('Error fetching all blood stock entries:', error);
        res.status(500).json({ error: 'Error fetching all blood stock entries' });
    }
};

// http:localhost:3001/bloodStock/A+
const getBloodStockEntryByBloodType = async (req, res) => {
    try {
        const bloodType = req.params.bloodType;
        const bloodStockEntry = await BloodStockModel.findOne({ bloodGroup: bloodType });
        if (!bloodStockEntry) {
            return res.status(404).json({ error: 'Blood stock entry not found' });
        }
        res.json(bloodStockEntry);
    } catch (error) {
        console.error('Error fetching blood stock entry by blood type:', error);
        res.status(500).json({ error: 'Error fetching blood stock entry by blood type' });
    }
};

// http:localhost:3001/bloodStock/A+
const updateBloodStockEntry = async (req, res) => {
    try {
        const bloodType = req.params.bloodType;
        const updateData = req.body;
        const updatedBloodStockEntry = await BloodStockModel.findOneAndUpdate(
            { bloodGroup: bloodType },
            { $set : updateData },
            { new: true }
        );
        if (!updatedBloodStockEntry) {
            return res.status(404).json({ error: 'Blood stock entry not found' });
        }
        res.json(updatedBloodStockEntry);
    } catch (error) {
        console.error('Error updating blood stock entry:', error);
        res.status(500).json({ error: 'Error updating blood stock entry' });
    }
};

// http:localhost:3001/bloodStock/A+
const deleteBloodStockEntry = async (req, res) => {
    try {
        const bloodType = req.params.bloodType;
        const deletedBloodStockEntry = await BloodStockModel.findOneAndDelete({ bloodGroup: bloodType });
        if (!deletedBloodStockEntry) {
            return res.status(404).json({ error: 'Blood stock entry not found' });
        }
        res.json({ message: 'Blood stock entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting blood stock entry:', error);
        res.status(500).json({ error: 'Error deleting blood stock entry' });
    }
};

export {
    createBloodStockEntry,
    getAllBloodStockEntries,
    getBloodStockEntryByBloodType,
    updateBloodStockEntry,
    deleteBloodStockEntry
}