import express from 'express';
import { loginAdmin, verifyAdminSession } from '../controllers/authController.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { adminLoginLimiter } from '../middleware/spamProtection.js';

const router = express.Router();

router.post('/login', adminLoginLimiter, loginAdmin);
router.get('/verify', requireAdminAuth, verifyAdminSession);

export default router;
