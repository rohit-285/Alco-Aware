const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/responseHelper');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, 'Validation Error', errors.array());
  }
  next();
};
