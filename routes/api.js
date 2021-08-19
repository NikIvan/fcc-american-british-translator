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
        return res.status(400).send({error: err.message});
      }

      const {text, locale} = input;

      try {
        translation = translator.translate(text, locale);
      } catch (err) {
        return res.status(500).send({error: 'Something went wrong'});
      }

      return res.json({translation});
    });
};
