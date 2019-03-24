module.exports = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.json({ error: 'You need to login first.' }).redirect('/signin');
};
