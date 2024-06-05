import { comparePassword } from '../helpers/bcryptHelper.js';
import userModel from '../models/userModel.js';
import { generateTokenAdmin } from '../middleware/jwtTokenAdmin.js';
import { generateTokenDonor } from '../middleware/jwtTokenDonor.js';
import { generateTokenOrganization } from '../middleware/jwtTokenOrganization.js';

const loginAdmin = async (req, res) => {
    const { username,password } = req.body;

    if (!(username) || !password) {
        return res.status(400).json({ error: 'Username or registration number or NIC and password must be provided' });
    }

    try {
        const user = await userModel.findOne({ username });

        if (user) {
            const { userType } = user;
            const token = generateTokenAdmin(username, userType);
            res.clearCookie('bloodBankTokenAdmin');
            res.clearCookie('bloodBankTokenDonor');
            res.clearCookie('bloodBankTokenOrganization');
            res.cookie('bloodBankTokenAdmin', token, { httpOnly: true });
            console.log("User authenticated successfully");
            return res.status(200).json(user);
        } else {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Error fetching data' });
    }
}

const loginDonor = async (req, res) => {
    const { nic, password } = req.body;

    if (!nic || !password) {
        return res.status(400).json({ error: 'Username or registration number or NIC and password must be provided' });
    }

    try {
        const user = await userModel.findOne({ nic });

        if (user) {
            const { userType } = user;
            const token = generateTokenDonor(nic, userType);
            res.clearCookie('bloodBankTokenAdmin');
            res.clearCookie('bloodBankTokenDonor');
            res.clearCookie('bloodBankTokenOrganization');
            res.cookie('bloodBankTokenDonor', token, { httpOnly: true });
            console.log("User authenticated successfully");
            return res.status(200).json(user);
        } else {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Error fetching data' });
    }
}

const loginOrganization = async (req, res) => {
    const { registrationNumber, password } = req.body;

    if (!registrationNumber || !password) {
        return res.status(400).json({ error: 'Username or registration number or NIC and password must be provided' });
    }

    try {
        const user = await userModel.findOne({ registrationNumber });

        if (user) {
            const { userType } = user;
            const token = generateTokenOrganization(registrationNumber, userType);
            res.clearCookie('bloodBankTokenAdmin');
            res.clearCookie('bloodBankTokenDonor');
            res.clearCookie('bloodBankTokenOrganization');
            res.cookie('bloodBankTokenOrganization', token, { httpOnly: true });
            console.log("User authenticated successfully");
            return res.status(200).json(user);
        } else {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Error fetching data' });
    }
}

const logoutAdmin = (req, res) => {
    res.clearCookie('bloodBankTokenAdmin');
    res.clearCookie('bloodBankTokenDonor');
    res.clearCookie('bloodBankTokenOrganization');
    res.json({ message: "Logged out successfully!" });
}
const logoutDonor = (req, res) => {
    res.clearCookie('bloodBankTokenAdmin');
    res.clearCookie('bloodBankTokenDonor');
    res.clearCookie('bloodBankTokenOrganization');
    res.json({ message: "Logged out successfully!" });
}

const logoutOrganization = (req, res) => {
    res.clearCookie('bloodBankTokenAdmin');
    res.clearCookie('bloodBankTokenDonor');
    res.clearCookie('bloodBankTokenOrganization');
    res.json({ message: "Logged out successfully!" });
}

export {
    loginAdmin,
    loginDonor,
    loginOrganization,
    logoutAdmin,
    logoutDonor,
    logoutOrganization
}