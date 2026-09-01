const { fareCalculationScheme, fareQuerySchema, idParamSchema, updateFareSchema } = require("../validations/busTypeValidation");

const validateCalculateFare = (req, res, next) => {
  const { error, value } = fareCalculationScheme.validate(req.body, {
    abortEarly: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, error: error.details.map((d) => d.message) });
  req.body = value;
  next();
};

const validateFareQuery = (req, res, next) => {
  const { error, value } = fareQuerySchema.validate(req.query, {
    abortEarly: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, errors: error.details.map((d) => d.message) });
  req.query = value;
  next();
};

const validateIdParam = (req, res, next) => {
  const { error } = idParamSchema.validate(req.params);
  if (error)
    return res
      .status(400)
      .json({ success: false, errors: error.details.map((d) => d.message) });
  next();
};

const validateUpdateFare = (req, res, next) => {
  const { error, value } = updateFareSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error)
    return res
      .status(400)
      .json({ success: false, errors: error.details.map((d) => d.message) });
  req.body = value;
  next();
};

module.exports = {
  validateCalculateFare,
  validateFareQuery,
  validateIdParam,
  validateUpdateFare,
};
