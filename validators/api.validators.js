const Joi = require('joi');

const validate = (schema) => async (input) => await schema.validateAsync(input);

const translateSchema = Joi.object({
  text: Joi.string().trim().max(1000, 'utf-8').required(),
  locale: Joi.string().trim().valid('american-to-british', 'british-to-american').required(),
});

const validateTranslate = validate(translateSchema);

module.exports = {
  validateTranslate,
};
