const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(50)
        .required()
        .alphanum(),
    password: Joi.string()
        .min(8)
        .max(64)
        .required()
});

module.exports = schema;