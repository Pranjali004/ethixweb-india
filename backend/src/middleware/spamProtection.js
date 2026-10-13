import rateLimit from 'express-rate-limit';

// Strict Rate Limiting for Lead Submissions
export const leadSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 15 submissions per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many inquiries from this IP address. Please wait a few minutes or reach out via WhatsApp directly.',
  },
});

// Stricter Rate Limiting for Admin Login to prevent brute force
export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6, // limit each IP to 6 login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Your IP has been temporarily throttled for security.',
  },
});

// Silent Honeypot & Bot Detection Middleware
export function honeypotAndBotCheck(req, res, next) {
  const { website_catch_bot, _form_rendered_at } = req.body;

  // 1. Honeypot Trap
  // If the hidden field has any content, it was filled by an automated bot script
  if (website_catch_bot && website_catch_bot.trim().length > 0) {
    console.warn(`[SPAM BLOCKED] Honeypot triggered from IP: ${req.ip}`);
    // Return realistic success response so bot does not retry with alternate vectors
    return res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! Our senior strategy team will connect with you shortly.',
      data: { id: 'lead_verified_silently' },
    });
  }

  // 2. Superhuman Submission Speed Check
  if (_form_rendered_at) {
    const renderTime = parseInt(_form_rendered_at, 10);
    const timeTakenMs = Date.now() - renderTime;
    if (timeTakenMs > 0 && timeTakenMs < 1200) {
      console.warn(`[SPAM BLOCKED] Superhuman submission speed (${timeTakenMs}ms) from IP: ${req.ip}`);
      return res.status(200).json({
        success: true,
        message: 'Thank you for your inquiry! Our senior strategy team will connect with you shortly.',
      });
    }
  }

  next();
}
