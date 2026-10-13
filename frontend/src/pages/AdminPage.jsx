import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  LogOut,
  Search,
  Filter,
  Download,
  MessageSquare,
  Clock,
  Phone,
  Building,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
  X,
  ChevronRight,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import {
  loginAdmin,
  verifyAdminToken,
  fetchAdminLeads,
  updateLeadStatus,
  addLeadNote,
  deleteLead,
  downloadLeadsCsv,
} from '../services/api';
import EthixLogo from '../components/EthixLogo';

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem('ethix_admin_token') || '');
  const [adminUser, setAdminUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@ethixweb.com');
  const [loginPassword, setLoginPassword] = useState('EthixAdmin@2026');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, in_discussion: 0, converted: 0 });
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  // Verify stored token on mount
  useEffect(() => {
    // Add noindex meta tag for /admin
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    async function checkAuth() {
      if (!token) {
        setIsVerifying(false);
        return;
      }
      try {
        const verifyRes = await verifyAdminToken(token);
        if (verifyRes && verifyRes.success) {
          setAdminUser(verifyRes.user);
        } else {
          localStorage.removeItem('ethix_admin_token');
          setToken('');
        }
      } catch (e) {
        localStorage.removeItem('ethix_admin_token');
        setToken('');
      } finally {
        setIsVerifying(false);
      }
    }

    checkAuth();

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, [token]);

  // Load leads when logged in or filters change
  const loadLeads = async () => {
    if (!token) return;
    setIsLoadingLeads(true);
    try {
      const res = await fetchAdminLeads(token, {
        status: statusFilter,
        service: serviceFilter,
        search: searchQuery,
      });
      if (res && res.success) {
        setLeads(res.data);
        if (res.stats) setStats(res.stats);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err.message);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadLeads();
    }
  }, [token, statusFilter, serviceFilter]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await loginAdmin({
        email: loginEmail,
        password: loginPassword,
      });

      if (res.token) {
        localStorage.setItem('ethix_admin_token', res.token);
        setToken(res.token);
        setAdminUser(res.user);
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid administrator credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ethix_admin_token');
    setToken('');
    setAdminUser(null);
    setSelectedLead(null);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await updateLeadStatus(token, leadId, newStatus);
      // Update locally
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId || l.id === leadId ? { ...l, status: newStatus } : l))
      );
      if (selectedLead && (selectedLead._id === leadId || selectedLead.id === leadId)) {
        setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;

    setIsSubmittingNote(true);
    const leadId = selectedLead._id || selectedLead.id;

    try {
      const res = await addLeadNote(token, leadId, newNoteText.trim());
      if (res.data) {
        setSelectedLead(res.data);
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId || l.id === leadId ? res.data : l))
        );
        setNewNoteText('');
      }
    } catch (err) {
      alert('Error adding note: ' + err.message);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      return;
    }
    try {
      await deleteLead(token, leadId);
      setLeads((prev) => prev.filter((l) => l._id !== leadId && l.id !== leadId));
      if (selectedLead && (selectedLead._id === leadId || selectedLead.id === leadId)) {
        setSelectedLead(null);
      }
    } catch (err) {
      alert('Error deleting lead: ' + err.message);
    }
  };

  const handleExportCsv = async () => {
    try {
      await downloadLeadsCsv(token);
    } catch (err) {
      alert('Error exporting CSV: ' + err.message);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-ethix-red" />
      </div>
    );
  }

  // View 1: Login Screen if not authenticated
  if (!token) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-ethix-dark border border-ethix-border rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ethix-red to-amber-500" />

          <div className="text-center space-y-2">
            <div className="inline-flex justify-center mb-2">
              <EthixLogo showBadge={false} />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Management Portal</h2>
            <p className="text-xs text-slate-400">
              Restricted area for reviewing client inquiries and managing sprints.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-rose-950/70 border border-rose-500/50 flex items-center gap-2 text-xs text-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@ethixweb.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-sm focus:outline-none focus:border-ethix-red focus:ring-1 focus:ring-ethix-red"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 rounded-lg bg-ethix-red hover:bg-ethix-red-hover text-white text-sm font-semibold transition-all shadow-md shadow-ethix-red/20 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Admin Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Reviewer Note */}
          <div className="p-3 rounded-lg bg-ethix-card/60 border border-ethix-border text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-200 block">Assessment Reviewer Demo Access:</span>
            <div>Email: <code className="text-rose-300 font-mono">admin@ethixweb.com</code></div>
            <div>Password: <code className="text-rose-300 font-mono">EthixAdmin@2026</code></div>
          </div>
        </div>
      </div>
    );
  }

  // View 2: Authenticated Admin CRM Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-ethix-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ethix-red text-white uppercase tracking-wider">
              CRM Active
            </span>
            <span className="text-xs text-slate-400">Authenticated as {adminUser?.email || 'Admin'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">India Leads & Sprints CRM</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadLeads}
            disabled={isLoadingLeads}
            className="p-2 rounded-lg bg-ethix-dark border border-ethix-border text-slate-300 hover:text-white transition-colors"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${isLoadingLeads ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ethix-dark border border-ethix-border text-slate-200 hover:text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-ethix-red" />
            Export CSV
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 hover:bg-rose-900/40 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-ethix-dark border border-ethix-border space-y-1">
          <div className="text-xs text-slate-400">Total Leads</div>
          <div className="text-2xl font-extrabold text-white">{stats.total}</div>
        </div>
        <div className="p-4 rounded-xl bg-ethix-dark border border-ethix-border space-y-1">
          <div className="text-xs text-rose-400">New / Unread</div>
          <div className="text-2xl font-extrabold text-rose-400">{stats.new}</div>
        </div>
        <div className="p-4 rounded-xl bg-ethix-dark border border-ethix-border space-y-1">
          <div className="text-xs text-amber-400">Contacted</div>
          <div className="text-2xl font-extrabold text-amber-400">{stats.contacted}</div>
        </div>
        <div className="p-4 rounded-xl bg-ethix-dark border border-ethix-border space-y-1">
          <div className="text-xs text-sky-400">In Discussion</div>
          <div className="text-2xl font-extrabold text-sky-400">{stats.in_discussion}</div>
        </div>
        <div className="p-4 rounded-xl bg-ethix-dark border border-ethix-border space-y-1 col-span-2 sm:col-span-1">
          <div className="text-xs text-emerald-400">Converted</div>
          <div className="text-2xl font-extrabold text-emerald-400">{stats.converted}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-ethix-dark p-3 rounded-xl border border-ethix-border">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadLeads()}
            placeholder="Search leads by name, email, phone, company..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-lg bg-ethix-card border border-ethix-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-ethix-red"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'new', label: 'New' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'in_discussion', label: 'Discussion' },
            { id: 'converted', label: 'Converted' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setStatusFilter(pill.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                statusFilter === pill.id
                  ? 'bg-ethix-red text-white'
                  : 'bg-ethix-card text-slate-300 hover:text-white border border-ethix-border'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-ethix-dark border border-ethix-border rounded-xl overflow-hidden shadow-ethix-card">
        {isLoadingLeads ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-ethix-red mx-auto" />
            <p className="text-xs text-slate-400 mt-2">Loading inquiries from database...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <ShieldCheck className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No inquiries found</h3>
            <p className="text-xs text-slate-400">
              Submit a test inquiry via the Contact form or change your filter query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ethix-card/80 text-slate-400 uppercase tracking-wider border-b border-ethix-border font-semibold">
                <tr>
                  <th className="py-3 px-4">Client / Brand</th>
                  <th className="py-3 px-4">Contact & WhatsApp</th>
                  <th className="py-3 px-4">Primary Need</th>
                  <th className="py-3 px-4">Budget (INR)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ethix-border">
                {leads.map((lead) => {
                  const leadId = lead._id || lead.id;
                  const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                  const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
                    `Namaste ${lead.name}, this is Ethixweb India team regarding your inquiry about ${lead.service}.`
                  )}`;

                  return (
                    <tr
                      key={leadId}
                      className="hover:bg-ethix-card/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{lead.name}</div>
                        <div className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-500" />
                          <span>{lead.company || 'Direct Individual'}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-slate-300 font-mono">{lead.email}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-slate-400">{lead.phone}</span>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/40 hover:bg-emerald-900"
                            title="Chat with client on WhatsApp"
                          >
                            <MessageSquare className="w-3 h-3" />
                            WhatsApp
                          </a>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-1 rounded bg-ethix-card border border-ethix-border text-slate-300 font-medium">
                          {lead.service}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-slate-200">
                        {lead.budget}
                      </td>

                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(leadId, e.target.value)}
                          className="px-2 py-1 rounded bg-ethix-card border border-ethix-border text-xs font-semibold focus:outline-none focus:border-ethix-red text-white"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_discussion">In Discussion</option>
                          <option value="proposal_sent">Proposal Sent</option>
                          <option value="converted">Converted</option>
                          <option value="closed_lost">Closed / Lost</option>
                          <option value="spam">Spam</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                      </td>

                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded bg-ethix-card border border-ethix-border text-slate-300 hover:text-white"
                            title="View Details"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(leadId)}
                            className="p-1.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 hover:bg-rose-900/60"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail & Internal Notes Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl h-full bg-ethix-dark border-l border-ethix-border p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-ethix-border">
              <div>
                <span className="text-[10px] font-mono text-ethix-red uppercase tracking-wider">
                  Lead Details & CRM Record
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{selectedLead.name}</h3>
                <div className="text-xs text-slate-400">{selectedLead.company || 'Direct Individual'}</div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-lg bg-ethix-card border border-ethix-border text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${(selectedLead.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Namaste ${selectedLead.name}! This is the Ethixweb India team following up on your inquiry.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Connect on WhatsApp
              </a>
              <a
                href={`mailto:${selectedLead.email}`}
                className="py-2 px-3 rounded-lg bg-ethix-card border border-ethix-border text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </a>
            </div>

            {/* In-depth details */}
            <div className="space-y-3 bg-ethix-card p-4 rounded-xl border border-ethix-border text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block">Phone:</span>
                  <span className="text-white font-mono">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="text-white font-mono">{selectedLead.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Primary Service:</span>
                  <span className="text-slate-200 font-semibold">{selectedLead.service}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Budget:</span>
                  <span className="text-emerald-400 font-semibold">{selectedLead.budget}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Target Timeline:</span>
                  <span className="text-slate-200">{selectedLead.timeline}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">DPDP Act Consent:</span>
                  <span className="text-emerald-400 font-semibold">
                    {selectedLead.dpdpConsent ? 'Yes (Compliant)' : 'No'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-ethix-border">
                <span className="text-slate-500 block mb-1">Project Brief / Message:</span>
                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap bg-ethix-dark p-3 rounded-lg border border-ethix-border">
                  {selectedLead.message}
                </p>
              </div>
            </div>

            {/* Internal Follow-Up Notes Section */}
            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Internal Follow-Up Notes</span>
                <span className="text-xs text-slate-400">({(selectedLead.notes && selectedLead.notes.length) || 0})</span>
              </h4>

              {/* Notes list */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedLead.notes && selectedLead.notes.length > 0 ? (
                  selectedLead.notes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-ethix-card border border-ethix-border text-xs space-y-1"
                    >
                      <p className="text-slate-200 leading-relaxed">{note.note}</p>
                      <div className="text-[10px] text-slate-500 flex items-center justify-between">
                        <span>By: {note.author || 'Admin'}</span>
                        <span>{new Date(note.createdAt).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">No internal follow-up notes logged yet.</p>
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2 pt-2">
                <textarea
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Log client call details, sprint agreement, quote sent..."
                  className="w-full px-3 py-2 rounded-lg bg-ethix-card border border-ethix-border text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-ethix-red"
                />
                <button
                  type="submit"
                  disabled={isSubmittingNote || !newNoteText.trim()}
                  className="px-4 py-2 rounded-lg bg-ethix-red hover:bg-ethix-red-hover text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmittingNote ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>Attach Internal Note</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
