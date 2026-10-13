import { Lead } from '../models/Lead.js';
import { generateLeadsCsv } from '../utils/csvExporter.js';

export async function createLead(req, res, next) {
  try {
    const { name, email, phone, company, service, budget, timeline, message, dpdpConsent } = req.body;

    const leadData = {
      name,
      email,
      phone,
      company: company || '',
      service: service || 'web_dev',
      budget: budget || '₹2L - ₹5L',
      timeline: timeline || '1-2 months',
      message,
      dpdpConsent: !!dpdpConsent,
      status: 'new',
      priority: 'medium',
      ipAddress: req.ip || req.connection.remoteAddress || '',
      userAgent: req.headers['user-agent'] || '',
      notes: [],
    };

    const savedLead = await Lead.create(leadData);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our India delivery leadership will connect with you within 24 hours.',
      data: {
        id: savedLead._id || savedLead.id,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getLeads(req, res, next) {
  try {
    const { status, service, search, priority } = req.query;

    const query = {};
    if (status && status !== 'all') query.status = status;
    if (service && service !== 'all') query.service = service;
    if (priority && priority !== 'all') query.priority = priority;
    if (search) query.search = search;

    const leads = await Lead.find(query);

    // Compute status metrics for the admin dashboard
    const allLeads = await Lead.find();
    const stats = {
      total: allLeads.length,
      new: allLeads.filter((l) => l.status === 'new').length,
      contacted: allLeads.filter((l) => l.status === 'contacted').length,
      in_discussion: allLeads.filter((l) => l.status === 'in_discussion').length,
      converted: allLeads.filter((l) => l.status === 'converted').length,
    };

    return res.status(200).json({
      success: true,
      count: leads.length,
      stats,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
}

export async function getLeadById(req, res, next) {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead inquiry not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateLeadStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    const allowedStatuses = ['new', 'contacted', 'in_discussion', 'proposal_sent', 'converted', 'closed_lost', 'spam'];
    const allowedPriorities = ['low', 'medium', 'high'];

    const updateFields = {};
    if (status) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}`,
        });
      }
      updateFields.status = status;
    }

    if (priority) {
      if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({
          success: false,
          message: `Invalid priority. Must be one of: ${allowedPriorities.join(', ')}`,
        });
      }
      updateFields.priority = priority;
    }

    const updatedLead = await Lead.findByIdAndUpdate(id, updateFields);

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully.',
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
}

export async function addLeadNote(req, res, next) {
  try {
    const { id } = req.params;
    const { note } = req.body;

    if (!note || typeof note !== 'string' || note.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide note text.',
      });
    }

    const author = req.user?.email || 'Admin';
    const updatedLead = await Lead.addNote(id, note.trim(), author);

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note added successfully.',
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteLead(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Lead.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead removed successfully.',
    });
  } catch (error) {
    next(error);
  }
}

export async function exportLeadsCsv(req, res, next) {
  try {
    const leads = await Lead.find();
    const csvContent = generateLeadsCsv(leads);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="ethixweb_leads_${timestamp}.csv"`);
    return res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
}
