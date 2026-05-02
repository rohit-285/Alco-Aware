const crypto = require('crypto');

const base64Url = (input) => Buffer.from(input).toString('base64url');

const signToken = (payload, expiresInSeconds = 7 * 24 * 60 * 60) => {
  const secret = process.env.JWT_SECRET || 'alcoaware-dev-secret';
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds
  };
  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(body))}`;
  const signature = crypto.createHmac('sha256', secret).update(unsigned).digest('base64url');
  return `${unsigned}.${signature}`;
};

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.pbkdf2Sync(String(password), salt, 120000, 64, 'sha512').toString('hex');
  return { salt, hash };
};

const verifyPassword = (password, salt, expectedHash) => {
  if (!salt || !expectedHash) return false;
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(expectedHash, 'hex'));
};

module.exports = { signToken, hashPassword, verifyPassword };
