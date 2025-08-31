// authorize.js
const authorize = (req, res, next) => {
  if (req.query.user === 'john') {
    req.user = { name: 'john', id: 3 };
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = authorize;