import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  addLeadNote,
  deleteLead,
  exportLeadsCsv,
} from '../controllers/leadController.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { honeypotAndBotCheck, leadSubmissionLimiter } from '../middleware/spamProtection.js';
import { validateLeadSubmission } from '../middleware/validation.js';

const router = express.Router();

// Public: Submit Inquiries
router.post('/', leadSubmissionLimiter, honeypotAndBotCheck, validateLeadSubmission, createLead);

// Protected Admin Endpoints
router.get('/', requireAdminAuth, getLeads);
router.get('/export/csv', requireAdminAuth, exportLeadsCsv);
router.get('/:id', requireAdminAuth, getLeadById);
router.patch('/:id/status', requireAdminAuth, updateLeadStatus);
router.post('/:id/notes', requireAdminAuth, addLeadNote);
router.delete('/:id', requireAdminAuth, deleteLead);

export default router;
