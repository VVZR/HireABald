const Joi = require('joi');

exports.validateRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

exports.validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

exports.validateBooking = (req, res, next) => {
  const schema = Joi.object({
    baldType: Joi.string().valid('fully-bald', 'shiny-bald', 'tactical-bald', 'monk-bald'),
    eventType: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.date().greater('now').required(),
    duration: Joi.number().min(1).required(),
    description: Joi.string().max(500)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
