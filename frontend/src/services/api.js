const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

/**
 * Ping backend on page load to handle Render free-tier cold starts
 */
export async function pingHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (!res.ok) return false;
    const data = await res.json();
    return data;
  } catch (e) {
    // Backend may be warming up
    return false;
  }
}

/**
 * Public: Submit Inquiries with cold-start timeout handling
 */
export async function submitLead(leadData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s for Render cold boot

  try {
    const res = await fetch(`${API_BASE_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || 'Failed to submit inquiry. Please try again.');
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Connection timed out while waking up cloud server. Please retry in 10 seconds.');
    }
    throw error;
  }
}

/**
 * Admin: Authentication
 */
export async function loginAdmin(credentials) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Login failed. Invalid credentials.');
  }

  return data;
}

export async function verifyAdminToken(token) {
  const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return await res.json().catch(() => null);
}

/**
 * Admin: Leads Management
 */
export async function fetchAdminLeads(token, filters = {}) {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== 'all') params.append('status', filters.status);
  if (filters.service && filters.service !== 'all') params.append('service', filters.service);
  if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);
  if (filters.search) params.append('search', filters.search);

  const res = await fetch(`${API_BASE_URL}/api/leads?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch leads.');
  }

  return data;
}

export async function updateLeadStatus(token, id, status, priority) {
  const body = {};
  if (status) body.status = status;
  if (priority) body.priority = priority;

  const res = await fetch(`${API_BASE_URL}/api/leads/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update lead.');
  }

  return data;
}

export async function addLeadNote(token, id, note) {
  const res = await fetch(`${API_BASE_URL}/api/leads/${id}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ note }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Failed to add note.');
  }

  return data;
}

export async function deleteLead(token, id) {
  const res = await fetch(`${API_BASE_URL}/api/leads/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete lead.');
  }

  return data;
}

export async function downloadLeadsCsv(token) {
  const res = await fetch(`${API_BASE_URL}/api/leads/export/csv`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('Failed to export CSV.');
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ethixweb_leads_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
