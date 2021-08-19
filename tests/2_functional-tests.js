const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  const textToTranslateToUs = 'I spent the bank holiday at the funfair.';
  const translatedToUs = 'I spent the public holiday at the carnival.';

  test('Translation with text and locale fields: POST request to /api/translate', (done) => {
    const input = {
      text: textToTranslateToUs,
      locale: Translator.LOCALE_GB_TO_US,
    };

    chai.request(server)
      .post('/api/translate')
      .send(input)
      .end((req, res) => {
        assert.strictEqual(res.status, 200);
        assert.property(res.body, 'translation');
        assert.property(res.body, 'text');
        assert.strictEqual(res.body.translation, translatedToUs);
        assert.strictEqual(res.body.text, textToTranslateToUs);

        done();
      });
  });

  test('Translation with text and invalid locale field: POST request to /api/translate', (done) => {
    const input = {
      text: textToTranslateToUs,
      locale: 'american-to-hindi',
    };

    chai.request(server)
      .post('/api/translate')
      .send(input)
      .end((req, res) => {
        assert.strictEqual(res.status, 400);
        assert.property(res.body, 'error');
        assert.strictEqual(res.body.error, 'Invalid value for locale field');

        done();
      });
  });

  test('Translation with missing text field: POST request to /api/translate', (done) => {
    const input = {
      locale: Translator.LOCALE_GB_TO_US
    };

    chai.request(server)
      .post('/api/translate')
      .send(input)
      .end((req, res) => {
        assert.strictEqual(res.status, 400);
        assert.property(res.body, 'error');
        assert.strictEqual(res.body.error, 'Required field(s) missing');

        done();
      });
  });

  test('Translation with missing locale field: POST request to /api/translate', (done) => {
    const input = {
      text: textToTranslateToUs,
    };

    chai.request(server)
      .post('/api/translate')
      .send(input)
      .end((req, res) => {
        assert.strictEqual(res.status, 400);
        assert.property(res.body, 'error');
        assert.strictEqual(res.body.error, 'Required field(s) missing');

        done();
      });
  });

  test('Translation with empty text: POST request to /api/translate', (done) => {
    const input = {
      text: '',
      locale: Translator.LOCALE_GB_TO_US,
    };

    chai.request(server)
      .post('/api/translate')
      .send(input)
      .end((req, res) => {
        assert.strictEqual(res.status, 400);
        assert.property(res.body, 'error');
        assert.strictEqual(res.body.error, 'No text to translate');

        done();
      });
  });

  test('Translation with text that needs no translation: POST request to /api/translate', (done) => {
    const input = {
      text: 'This text needs no translation',
      locale: Translator.LOCALE_US_TO_GB
    };

    chai.request(server)
      .post('/api/translate')
      .send(input)
      .end((req, res) => {
        assert.strictEqual(res.status, 200);
        assert.property(res.body, 'translation');
        assert.strictEqual(res.body.translation, 'Everything looks good to me!');

        done();
      });
  });
});
