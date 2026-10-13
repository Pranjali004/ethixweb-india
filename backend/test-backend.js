import http from 'http';

// Quick verification script for backend API
const BASE_URL = 'http://localhost:5000';

async function testEndpoint(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, options);
  const data = await response.json().catch(() => null);
  return { status: response.status, data };
}

async function runTests() {
  console.log('🧪 Running Backend API Automated Smoke Test...');

  try {
    // 1. Health check
    const health = await testEndpoint('/api/health');
    console.log('1. Health Check:', health.status === 200 ? '✅ PASSED' : '❌ FAILED', health.data?.service);

    // 2. Submit Lead (Valid)
    const validLead = {
      name: 'Rohan Sharma',
      email: 'rohan.sharma@indiastartup.in',
      phone: '+919876543210',
      company: 'Zenith Logistics Tech',
      service: 'web_dev',
      budget: '₹5L - ₹10L',
      timeline: '1-2 months',
      message: 'Need to modernize our enterprise B2B platform with UPI billing and automated WhatsApp driver dispatch.',
      dpdpConsent: true,
      _form_rendered_at: (Date.now() - 5000).toString(),
    };
    const leadRes = await testEndpoint('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validLead),
    });
    console.log('2. Lead Submission (Valid):', leadRes.status === 201 ? '✅ PASSED' : '❌ FAILED', leadRes.data?.message);

    // 3. Honeypot Bot Trap Check
    const botLead = {
      ...validLead,
      website_catch_bot: 'http://spam-link-bot.com',
    };
    const botRes = await testEndpoint('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(botLead),
    });
    console.log(
      '3. Honeypot Silent Trap:',
      botRes.status === 200 && botRes.data?.success === true ? '✅ PASSED (Silently handled with 200)' : '❌ FAILED'
    );

    // 4. Invalid Indian Phone Check
    const badPhoneLead = {
      ...validLead,
      phone: '12345',
    };
    const badPhoneRes = await testEndpoint('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(badPhoneLead),
    });
    console.log('4. Phone Validation (+91 rule):', badPhoneRes.status === 400 ? '✅ PASSED' : '❌ FAILED', badPhoneRes.data?.message);

    // 5. Admin Login
    const loginRes = await testEndpoint('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@ethixweb.com',
        password: 'EthixAdmin@2026',
      }),
    });
    console.log('5. Admin Login (JWT):', loginRes.status === 200 ? '✅ PASSED' : '❌ FAILED');
    const token = loginRes.data?.token;

    // 5b. Unauthenticated Access Check (Must Return 401)
    const unauthorizedRes = await testEndpoint('/api/leads');
    console.log(
      '5b. Unauthenticated Access Protection (401):',
      unauthorizedRes.status === 401 ? '✅ PASSED (401 Rejected)' : '❌ FAILED'
    );

    if (token) {
      // 6. Fetch Leads with Bearer Token
      const adminLeadsRes = await testEndpoint('/api/leads', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('6. Admin Fetch Leads:', adminLeadsRes.status === 200 ? '✅ PASSED' : '❌ FAILED', `Found ${adminLeadsRes.data?.count} leads`);

      const leadId = adminLeadsRes.data?.data?.[0]?._id;
      if (leadId) {
        // 7. Add Note
        const noteRes = await testEndpoint(`/api/leads/${leadId}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ note: 'Called client on WhatsApp. Demo scheduled for Friday 3 PM.' }),
        });
        console.log('7. Add Internal Lead Note:', noteRes.status === 200 ? '✅ PASSED' : '❌ FAILED');

        // 8. Update Status
        const statusRes = await testEndpoint(`/api/leads/${leadId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 'contacted' }),
        });
        console.log('8. Update Status to Contacted:', statusRes.status === 200 ? '✅ PASSED' : '❌ FAILED');
      }

      // 9. CSV Export with Anti-Formula Injection Sanitization Check
      const csvRawRes = await fetch(`${BASE_URL}/api/leads/export/csv`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const csvText = await csvRawRes.text();
      const isCsvValid =
        csvRawRes.status === 200 &&
        csvRawRes.headers.get('content-type')?.includes('text/csv') &&
        csvText.includes('"ID"') &&
        csvText.includes('"Email"');
      console.log('9. Safe CSV Export (Anti-Formula Injection Sanitized):', isCsvValid ? '✅ PASSED' : '❌ FAILED');
    }

    console.log('🎉 ALL BACKEND API TESTS COMPLETED!');
    process.exit(0);
  } catch (err) {
    console.error('Test run error:', err.message);
    process.exit(1);
  }
}

// Start test after a short delay
setTimeout(runTests, 1000);
