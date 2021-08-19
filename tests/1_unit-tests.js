const chai = require('chai');
const {beforeEach} = require('mocha');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  const translator = new Translator();

  beforeEach((done) => {
    setTimeout(done, 100);
  });

  test('Translate Mangoes are my favorite fruit. to British English', () => {
    const text = 'Mangoes are my favorite fruit.';
    const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate I ate yogurt for breakfast. to British English', () => {
    const text = 'I ate yogurt for breakfast.';
    const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';

    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate We had a party at my friend\'s condo. to British English', () => {
    const text = 'We had a party at my friend\'s condo.';
    const expected = 'We had a party at my friend\'s <span class="highlight">flat</span>.';
    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate Can you toss this in the trashcan for me? to British English', () => {
    const text = 'Can you toss this in the trashcan for me?';
    const expected = 'Can you toss this in the <span class="highlight">bin</span> for me?';
    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate The parking lot was full. to British English', () => {
    const text = 'The parking lot was full.';
    const expected = 'The <span class="highlight">car park</span> was full.';
    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate Like a high tech Rube Goldberg machine. to British English', () => {
    const text = 'Like a high tech Rube Goldberg machine.';
    const expected = 'Like a high tech <span class="highlight">Heath Robinson device</span>.';
    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate To play hooky means to skip class or work. to British English', () => {
    const text = 'To play hooky means to skip class or work.';
    const expected = 'To <span class="highlight">bunk off</span> means to skip class or work.';
    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate No Mr. Bond, I expect you to die. to British English', () => {
    const text = 'Translate No Mr. Bond, I expect you to die.';
    const expected = 'Translate No <span class="highlight">Mr</span> Bond, I expect you to die.';
    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate Dr. Grosh will see you now. to British English', () => {
    const text = 'Dr. Grosh will see you now.';
    const expected = '<span class="highlight">Dr</span> Grosh will see you now.';
    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate Lunch is at 12:15 today. to British English', () => {
    const text = 'Lunch is at 12:15 today.';
    const expected = 'Lunch is at <span class="highlight">12.15</span> today.';
    const actual = translator.translate(text, Translator.LOCALE_US_TO_GB);

    assert.strictEqual(actual, expected);
  });

  test('Translate We watched the footie match for a while. to American English', () => {
    const text = 'We watched the footie match for a while.';
    const expected = 'We watched the <span class="highlight">soccer</span> match for a while.';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  test('Translate Paracetamol takes up to an hour to work. to American English', () => {
    const text = 'Paracetamol takes up to an hour to work.';
    const expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  test('Translate First, caramelise the onions. to American English', () => {
    const text = 'First, caramelise the onions.';
    const expected = 'First, <span class="highlight">caramelize</span> the onions.';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  test('Translate I spent the bank holiday at the funfair. to American English', () => {
    const text = 'I spent the bank holiday at the funfair.';
    const expected = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  test('Translate I had a bicky then went to the chippy. to American English', () => {
    const text = 'I had a bicky then went to the chippy.';
    const expected = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip</span> shop.';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  test('Translate I\'ve just got bits and bobs in my bum bag. to American English', () => {
    const text = 'I\'ve just got bits and bobs in my bum bag.';
    const expected = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  test('Translate The car boot sale at Boxted Airfield was called off. to American English', () => {
    const text = 'The car boot sale at Boxted Airfield was called off.';
    const expected = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  test('Translate Have you met Mrs Kalyani? to American English', () => {
    const text = 'Have you met Mrs Kalyani?';
    const expected = 'Have you met <span class="highlight">Mrs.</span> Kalyani?';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  test('Translate Prof Joyner of King\'s College, London. to American English', () => {
    const text = "Prof Joyner of King's College, London.";
    const expected = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  test('Translate Tea time is usually around 4 or 4.30. to American English', () => {
    const text = 'Tea time is usually around 4 or 4.30.';
    const expected = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.';
    const actual = translator.translate(text, Translator.LOCALE_GB_TO_US);

    assert.strictEqual(actual, expected);
  });

  // TODO: Implement highlight tests
  test('Highlight translation in Mangoes are my favorite fruit.', () => {
    assert.fail();
  });

  test('Highlight translation in I ate yogurt for breakfast.', () => {
    assert.fail();
  });

  test('Highlight translation in We watched the footie match for a while.', () => {
    assert.fail();
  });

  test('Highlight translation in Paracetamol takes up to an hour to work.', () => {
    assert.fail();
  });
});
