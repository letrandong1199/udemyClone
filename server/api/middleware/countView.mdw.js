module.exports = (req, res, next) => {
  let view = 0;
  view = view + 1;
  req.view = view;
  next();
};
