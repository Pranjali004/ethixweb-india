import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { isMongoConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FALLBACK_STORE_FILE = path.join(__dirname, '../../data/leads_fallback.json');

// Ensure data folder exists for offline/local fallback
try {
  const dir = path.dirname(FALLBACK_STORE_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
} catch (e) {
  // Ignore
}

const noteSchema = new mongoose.Schema({
  note: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  createdAt: { type: Date, default: Date.now },
});

const leadMongooseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: '' },
    service: {
      type: String,
      enum: ['web_dev', 'whatsapp_ai', 'ecommerce_upi', 'performance_ads', 'technical_seo', 'full_stack_ops', 'other'],
      default: 'web_dev',
    },
    budget: { type: String, default: '₹2L - ₹5L' },
    timeline: { type: String, default: '1-2 months' },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_discussion', 'proposal_sent', 'converted', 'closed_lost', 'spam'],
      default: 'new',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dpdpConsent: { type: Boolean, default: true },
    isSpam: { type: Boolean, default: false },
    spamScore: { type: Number, default: 0 },
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    notes: [noteSchema],
  },
  {
    timestamps: true,
  }
);

const MongooseLeadModel = mongoose.models.Lead || mongoose.model('Lead', leadMongooseSchema);

// Resilient Fallback Memory/File Store
function readFallbackStore() {
  try {
    if (fs.existsSync(FALLBACK_STORE_FILE)) {
      const data = fs.readFileSync(FALLBACK_STORE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading fallback store:', err.message);
  }
  return [];
}

function writeFallbackStore(data) {
  try {
    fs.writeFileSync(FALLBACK_STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing fallback store:', err.message);
  }
}

// Unified Lead Repository Proxy
export const Lead = {
  async create(data) {
    if (isMongoConnected()) {
      return await MongooseLeadModel.create(data);
    }
    const leads = readFallbackStore();
    const newLead = {
      _id: crypto.randomUUID(),
      ...data,
      notes: data.notes || [],
      status: data.status || 'new',
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    leads.unshift(newLead);
    writeFallbackStore(leads);
    return newLead;
  },

  async find(query = {}) {
    if (isMongoConnected()) {
      let q = MongooseLeadModel.find();
      if (query.status && query.status !== 'all') {
        q = q.where('status').equals(query.status);
      }
      if (query.service && query.service !== 'all') {
        q = q.where('service').equals(query.service);
      }
      if (query.search) {
        const regex = new RegExp(query.search, 'i');
        q = q.or([{ name: regex }, { email: regex }, { company: regex }, { phone: regex }]);
      }
      if (query.isSpam !== undefined) {
        q = q.where('isSpam').equals(query.isSpam);
      }
      return await q.sort({ createdAt: -1 }).lean();
    }

    let leads = readFallbackStore();
    if (query.status && query.status !== 'all') {
      leads = leads.filter((l) => l.status === query.status);
    }
    if (query.service && query.service !== 'all') {
      leads = leads.filter((l) => l.service === query.service);
    }
    if (query.search) {
      const s = query.search.toLowerCase();
      leads = leads.filter(
        (l) =>
          (l.name && l.name.toLowerCase().includes(s)) ||
          (l.email && l.email.toLowerCase().includes(s)) ||
          (l.company && l.company.toLowerCase().includes(s)) ||
          (l.phone && l.phone.toLowerCase().includes(s))
      );
    }
    if (query.isSpam !== undefined) {
      leads = leads.filter((l) => !!l.isSpam === !!query.isSpam);
    }
    return leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async findById(id) {
    if (isMongoConnected()) {
      return await MongooseLeadModel.findById(id).lean();
    }
    const leads = readFallbackStore();
    return leads.find((l) => l._id === id || l.id === id) || null;
  },

  async findByIdAndUpdate(id, updateData, options = {}) {
    if (isMongoConnected()) {
      return await MongooseLeadModel.findByIdAndUpdate(id, updateData, { new: true, ...options }).lean();
    }
    const leads = readFallbackStore();
    const index = leads.findIndex((l) => l._id === id || l.id === id);
    if (index === -1) return null;

    leads[index] = {
      ...leads[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    writeFallbackStore(leads);
    return leads[index];
  },

  async findByIdAndDelete(id) {
    if (isMongoConnected()) {
      return await MongooseLeadModel.findByIdAndDelete(id).lean();
    }
    let leads = readFallbackStore();
    const item = leads.find((l) => l._id === id || l.id === id);
    leads = leads.filter((l) => l._id !== id && l.id !== id);
    writeFallbackStore(leads);
    return item;
  },

  async countDocuments(query = {}) {
    if (isMongoConnected()) {
      return await MongooseLeadModel.countDocuments(query);
    }
    const list = await this.find(query);
    return list.length;
  },

  async addNote(id, noteText, author = 'Admin') {
    if (isMongoConnected()) {
      return await MongooseLeadModel.findByIdAndUpdate(
        id,
        { $push: { notes: { note: noteText, author } } },
        { new: true }
      ).lean();
    }

    const note = {
      _id: crypto.randomUUID(),
      note: noteText,
      author,
      createdAt: new Date().toISOString(),
    };

    const leads = readFallbackStore();
    const lead = leads.find((l) => l._id === id || l.id === id);
    if (!lead) return null;
    if (!lead.notes) lead.notes = [];
    lead.notes.push(note);
    lead.updatedAt = new Date().toISOString();
    writeFallbackStore(leads);
    return lead;
  },
};
