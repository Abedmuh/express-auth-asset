const mainPages = (req, res, next) => {
  res.render('index', { title: 'Express Auth asset' });
}

module.exports = mainPages