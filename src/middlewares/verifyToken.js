const { Token } = require('../servicesApplication/token');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // req.decodedToken = 'noToken';
    return loggerEndReturn(res, 'Token not informed.');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return loggerEndReturn(res, 'Token error.');

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme))
    return loggerEndReturn(res, 'Token unformatted.');

  try {
    const decoded = await new Token().verify(token);
    req.decodedToken = decoded;
    return next();
  } catch (error) {
    return loggerEndReturn(res, 'Failed to authenticate token.');
  }
};

const loggerEndReturn = (res, message) => {
  const mensage = JSON.stringify({ token: false, message: message });
  console.error('auth', mensage);
  res.status(401).send(mensage);
  return;
};
