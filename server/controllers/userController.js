import { hashPassword } from '../helpers/bcryptHelper.js';
import userModel from '../models/userModel.js';

// localhost:3001/users/register
const registerUser = async (req, res) => {
    const { userType } = req.body;
    try {
        let newUser;
        if (userType === 'donor') {
            const { nic, fullName, password, bloodType, contactNumber, emailAddress, haveDonated } = req.body;
            const hashedPassword = await hashPassword(password);
            newUser = new userModel({ userType, nic, fullName, password: hashedPassword, bloodType, haveDonated, contactNumber, emailAddress });
        } else if (userType === 'organization') {
            const { nic, fullName, password, registrationNumber, organizationName, typeOfOrganization, contactPersonName, contactNumber, emailAddress, address, purposeOrMission } = req.body;
            const hashedPassword = await hashPassword(password);
            newUser = new userModel({ userType, nic, fullName, password: hashedPassword, registrationNumber, organizationName, typeOfOrganization, contactPersonName, contactNumber, emailAddress, address, purposeOrMission });
        } else {
            return res.status(400).json({ error: 'Invalid user type' });
        }
        await newUser.save();
        console.log("User registered!!");
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
}


// localhost:3001/users/
const getAllUsers = async (req, res) => {
    try {
        const result = await userModel.find();
        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.status(200).json({ status: 'success', result });
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Error getting all users' });
    }
}

// localhost:3001/users/update?registrationNumber=1000
// localhost:3001/users/update?nic=199012345V
const updateUser = async (req, res) => {
    const { nic, registrationNumber } = req.query;
    const updateData = req.body;

    if (!nic && !registrationNumber) {
        return res.status(400).json({ error: 'Either nic or registrationNumber must be provided' });
    }

    if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
    }

    try {
        const user = await userModel.findOneAndUpdate(
            { $or: [{ nic }, { registrationNumber }] },
            { $set: updateData },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
}

// localhost:3001/users/delete?registrationNumber=1001
// localhost:3001/users/delete?nic=1234v
const deleteUser = async (req, res) => {
    const { nic, registrationNumber } = req.query;
    const query = nic ? { nic } : { registrationNumber };

    if (!nic && !registrationNumber) {
        return res.status(400).json({ error: 'Either nic or registrationNumber must be provided' });
    }

    try {
        const user = await userModel.findOneAndDelete(query);
        if (user == 0) {
            return res.status(404).json({ error: 'User not found' });
        }else{
            res.status(200).json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
}

// localhost:3001/users/admin
// localhost:3001/users/organization
// localhost:3001/users/donor
const getByUserType = async (req, res) => {
    const { userType } = req.params;
    try {
        const result = await userModel.find({ userType });
        if (!result || result.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.status(200).json({ status: 'success', result });
    } catch (error) {
        console.error('Error getting users by type:', error);
        res.status(500).json({ error: 'Error getting users by type' });
    }
}

export {
    registerUser,
    updateUser,
    getAllUsers,
    deleteUser,
    getByUserType
}
