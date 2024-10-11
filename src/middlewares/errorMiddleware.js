const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal server error" });
};

module.exports = errorHandler;
