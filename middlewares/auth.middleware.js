require('dotenv').config();

function apiKeyAuth(req, res, next) {
  const apiKey = req.query.api_key;

  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  if (apiKey !== process.env.PREVAILED_PASSWORD) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next();
}

module.exports = apiKeyAuth;
