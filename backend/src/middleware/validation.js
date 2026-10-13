import validator from 'validator';

export function validateLeadSubmission(req, res, next) {
  let { name, email, phone, company, service, budget, timeline, message, dpdpConsent } = req.body;

  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Please enter a valid full name (at least 2 characters).');
  }

  // Email validation
  if (!email || typeof email !== 'string' || !validator.isEmail(email.trim())) {
    errors.push('Please enter a valid business email address.');
  }

  // Indian Phone validation (+91 or 10-digit mobile starting with 6, 7, 8, or 9)
  if (!phone || typeof phone !== 'string') {
    errors.push('Please enter a valid Indian mobile number.');
  } else {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const indianPhoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(cleanPhone)) {
      errors.push('Please provide a valid 10-digit Indian mobile number (+91).');
    }
  }

  // Message validation
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Please provide project details (at least 10 characters).');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors[0],
      errors,
    });
  }

  // Sanitize values
  req.body.name = validator.escape(name.trim());
  req.body.email = email.trim().toLowerCase();
  req.body.phone = phone.trim();
  req.body.company = company ? validator.escape(company.trim()) : '';
  req.body.message = validator.escape(message.trim());
  req.body.service = service || 'web_dev';
  req.body.budget = budget || '₹2L - ₹5L';
  req.body.timeline = timeline || '1-2 months';
  req.body.dpdpConsent = dpdpConsent === true || dpdpConsent === 'true';

  next();
}
