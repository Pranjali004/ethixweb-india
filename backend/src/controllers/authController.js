import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Cache hashed admin password on startup for secure bcrypt verification
let hashedAdminPassword = null;

async function getAdminPasswordHash() {
  if (process.env.ADMIN_PASSWORD_HASH) {
    return process.env.ADMIN_PASSWORD_HASH;
  }
  const envPassword = process.env.ADMIN_PASSWORD || 'EthixAdmin@2026';
  if (!hashedAdminPassword) {
    if (envPassword.startsWith('$2a$') || envPassword.startsWith('$2b$')) {
      hashedAdminPassword = envPassword;
    } else {
      hashedAdminPassword = await bcrypt.hash(envPassword, 10);
    }
  }
  return hashedAdminPassword;
}

export async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const configuredEmail = process.env.ADMIN_EMAIL || 'admin@ethixweb.com';
    const isEmailValid = email.trim().toLowerCase() === configuredEmail.toLowerCase();

    const expectedHash = await getAdminPasswordHash();
    const isPasswordValid = await bcrypt.compare(password, expectedHash);

    if (!isEmailValid || !isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials.',
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_for_emergency_only';
    const token = jwt.sign(
      {
        role: 'admin',
        email: configuredEmail,
      },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      user: {
        email: configuredEmail,
        role: 'admin',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyAdminSession(req, res) {
  // If request reached here, requireAdminAuth has already verified the JWT
  return res.status(200).json({
    success: true,
    user: req.user,
  });
}
