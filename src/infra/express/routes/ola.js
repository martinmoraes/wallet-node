module.exports = app => {
  let route = app.route('/');

  route.get((req, res) => {
    res.status(200).json({ mensage: 'Olá mundo!!!' });
  });
};
