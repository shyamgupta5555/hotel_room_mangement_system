const joi = require("joi");

exports.userSchema = joi.object({
  firstName: joi.string().min(3).max(30).required(),
  lastName: joi.string().min(3).max(30).required(),
  birthOfDate : joi.number().integer().min(1900).max(2023),
  phone: joi.string().regex(/[0-9]/).min(10).max(10).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(16),
});

exports.loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(16),
});
