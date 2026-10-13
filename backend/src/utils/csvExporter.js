/**
 * Sanitize a string against CSV/Formula Injection (CWE-1236).
 * Prepend a single quote if the first character is =, +, -, or @
 */
export function sanitizeCsvField(value) {
  if (value === null || value === undefined) return '""';
  let stringValue = String(value);

  // Strip carriage returns and tabs
  stringValue = stringValue.replace(/\r/g, '');

  // Check if vulnerable to formula injection
  const dangerousPrefixes = ['=', '+', '-', '@', '\t', '\r'];
  if (dangerousPrefixes.some((prefix) => stringValue.startsWith(prefix))) {
    stringValue = `'${stringValue}`;
  }

  // Escape inner double quotes
  const escaped = stringValue.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Convert leads array to safe RFC-4180 CSV string
 */
export function generateLeadsCsv(leads) {
  const headers = [
    'ID',
    'Created At',
    'Name',
    'Email',
    'Phone',
    'Company',
    'Service',
    'Budget',
    'Timeline',
    'Status',
    'Priority',
    'Message',
    'Notes Count',
    'DPDP Consent',
  ];

  const rows = leads.map((lead) => [
    sanitizeCsvField(lead._id || lead.id),
    sanitizeCsvField(lead.createdAt ? new Date(lead.createdAt).toISOString() : ''),
    sanitizeCsvField(lead.name),
    sanitizeCsvField(lead.email),
    sanitizeCsvField(lead.phone),
    sanitizeCsvField(lead.company || ''),
    sanitizeCsvField(lead.service),
    sanitizeCsvField(lead.budget),
    sanitizeCsvField(lead.timeline),
    sanitizeCsvField(lead.status),
    sanitizeCsvField(lead.priority),
    sanitizeCsvField(lead.message),
    sanitizeCsvField((lead.notes && lead.notes.length) || 0),
    sanitizeCsvField(lead.dpdpConsent ? 'Yes' : 'No'),
  ]);

  return [headers.map(sanitizeCsvField).join(','), ...rows.map((row) => row.join(','))].join('\n');
}
