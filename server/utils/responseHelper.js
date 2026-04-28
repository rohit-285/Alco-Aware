exports.successResponse = (res, statusCode, data, message) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

exports.errorResponse = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    message,
    errors,
  });
};
