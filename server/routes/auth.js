const express = require('express');
const User = require('../models/User');
const { hashPassword, signToken, verifyPassword } = require('../utils/authTokens');

const router = express.Router();

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  provider: user.provider
});

const authResponse = (res, user, status = 200) => {
  res.status(status).json({
    success: true,
    token: signToken({ id: user._id, email: user.email }),
    user: publicUser(user)
  });
};

router.get('/google-client-id', (req, res) => {
  res.json({ success: true, clientId: process.env.GOOGLE_CLIENT_ID || '' });
});

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });
    const normalizedEmail = String(email).trim().toLowerCase();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(409).json({ success: false, message: 'Account already exists' });

    const { salt, hash } = hashPassword(password);
    const user = await User.create({
      name: name || normalizedEmail,
      email: normalizedEmail,
      passwordHash: hash,
      passwordSalt: salt,
      provider: 'password'
    });
    authResponse(res, user, 201);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || '').trim().toLowerCase() }).select('+passwordHash +passwordSalt');
    if (!user || !verifyPassword(password, user.passwordSalt, user.passwordHash)) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    authResponse(res, user);
  } catch (err) {
    next(err);
  }
});

router.post('/google', async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ success: false, message: 'Missing Google credential' });

    const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
    const googleResponse = await fetch(verifyUrl);
    const profile = await googleResponse.json();

    if (!googleResponse.ok) {
      return res.status(401).json({ success: false, message: profile.error_description || 'Google login failed' });
    }
    if (profile.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({ success: false, message: 'Google client ID mismatch' });
    }

    const email = String(profile.email || '').toLowerCase();
    if (!email || profile.email_verified !== 'true') {
      return res.status(401).json({ success: false, message: 'Google email is not verified' });
    }

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name: profile.name || email,
          email,
          googleId: profile.sub,
          avatar: profile.picture,
          provider: 'google'
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    authResponse(res, user);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Google verification failed. Check server internet access and Google OAuth credentials.'
    });
  }
});

module.exports = router;
