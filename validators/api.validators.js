const Joi = require('joi');
const Translator = require('../components/translator.js');

const validate = (schema) => async (input) => await schema.validateAsync(input);

const validLocales = [
  Translator.LOCALE_GB_TO_US,
  Translator.LOCALE_US_TO_GB,
];

const translateSchema = Joi.object({
  text: Joi.string().trim().max(1000, 'utf-8').required(),
  locale: Joi.string().trim().valid(...validLocales).required(),
});

const joiValidateTranslate = validate(translateSchema);
const validateTranslate = async (input) => {
  // If one or more of the required fields is missing, return { error: 'Required field(s) missing' }.
  if (input.text == null || input.locale == null) {
    throw new Error('Required field(s) missing');
  }

  //   If text is empty, return { error: 'No text to translate' }
  if (input.text === '') {
    throw new Error('No text to translate');
  }

  // If locale does not match one of the two specified locales, return { error: 'Invalid value for locale field' }.
  if (validLocales.indexOf(input.locale) === -1) {
    throw new Error('Invalid value for locale field');
  }

  return await joiValidateTranslate(input);
}

module.exports = {
  validateTranslate,
};
