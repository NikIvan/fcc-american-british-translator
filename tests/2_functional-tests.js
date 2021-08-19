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
        assert.strictEqual(res.body.translation, translatedToUs);

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
        assert.strictEqual(res.status, 200);
        assert.property(res.body, 'translation');
        assert.strictEqual(res.body.translation, input.text);

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
        assert.strictEqual(res.body.translation, input.text);

        done();
      });
  });
});
