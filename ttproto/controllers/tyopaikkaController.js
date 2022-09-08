const tyopaikat = require('../tyopaikat.js');

exports.findAll = (req, res) => {
  if (!tyopaikat) {
    res.status(404).send('ei löytynyt');
  } else {
    res.status(200).json(tyopaikat);
  }
};

exports.add = (req, res) => {
  tyopaikat.push(req.body);
  res.status(200).send('Lisättiin ilmoitus');
};
