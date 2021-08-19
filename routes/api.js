'use strict';

const Translator = require('../components/translator.js');
const {validateTranslate} = require('../validators/api.validators.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post(async (req, res) => {
      let input;
      let translation;

      try {
        input = await validateTranslate(req.body);
      } catch (err) {
        return res.status(400).json({error: err.message});
      }

      const {text, locale} = input;

      try {
        translation = translator.translate(text, locale);
      } catch (err) {
        return res.status(500).json({error: 'Something went wrong'});
      }

      if (translation === text) {
        translation = 'Everything looks good to me!';
      }

      return res.json({text, translation});
    });
};
