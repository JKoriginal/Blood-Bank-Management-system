import express from 'express'
import {loginAdmin,loginDonor,loginOrganization,logoutAdmin,logoutDonor,logoutOrganization} from '../controllers/authController.js'
import {authenticateTokenAdmin} from '../middleware/jwtTokenAdmin.js'
import {authenticateTokenDonor} from '../middleware/jwtTokenDonor.js'
import {authenticateTokenOrganization} from '../middleware/jwtTokenOrganization.js'

const router = express.Router()

router.post('/admin/login', loginAdmin);
router.get("/admin/authorized", authenticateTokenAdmin);
router.post('/admin/logout', logoutAdmin);

router.post('/donor/login', loginDonor);
router.get("/donor/authorized", authenticateTokenDonor);
router.post('/donor/logout', logoutDonor);

router.post('/organization/login', loginOrganization);
router.get("/organization/authorized", authenticateTokenOrganization);
router.post('/organization/logout', logoutOrganization);

export default router