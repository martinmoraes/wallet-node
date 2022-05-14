const verifyToken = require('../../../middlewares/verifyToken');

module.exports = app => {
  let route = app.route('/transactions');

  route.post(verifyToken, (req, res) => {
    res.status(200).json({ mensage: 'Olá mundo!!!' });
  });
};
