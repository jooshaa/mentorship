const Joi = require("joi");

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map(err => err.message),
      });
    }

    next(); // если ошибок нет → идём дальше
  };
}

module.exports = validate;