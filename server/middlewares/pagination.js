const pagination = (req, res, next) => {
  //Setting pagination parameters on the basis
  //of page and limit received in request
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  req.pagination = { page, limit, skip };
  next();
};

module.exports = {
  pagination,
};
