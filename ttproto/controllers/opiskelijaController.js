const opiskelijat = require('../opiskelijat');

exports.findAll = (req, res) => {
  if (!opiskelijat) {
    res.status(404).send('Ei löytynyt');
  } else {
    res.status(200).json(opiskelijat);
  }
};

exports.add = (req, res) => {
  opiskelijat.push(req.body);
  res.status(200).send('Lisättiin opiskelija');
};
