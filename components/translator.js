const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
  translate(text, locale) {
    switch (locale) {
      case Translator.LOCALE_US_TO_GB: {
        return this.translateUsToGb(text);
      }

      case Translator.LOCALE_GB_TO_US: {
        return this.translateGbToUs(text);
      }
    }
  }

  translateUsToGb(text) {

    let res = Object.entries(americanToBritishSpelling)
      .reduce(straightReplacer, text);

    res = Object.entries(americanToBritishTitles)
      .reduce(modifyReplacer([escapeDot, straightReplacer]), res);

    res = Object.entries(americanOnly)
      .reduce(straightReplacer, res);

    const timeRegex = /\b\d{1,2}:\d{1,2}\b/g;

    res = res.replace(timeRegex, (match) => {
      return match.replace(':', '.');
    });

    return res;
  }

  translateGbToUs(text) {
    let res = Object.entries(americanToBritishSpelling)
      .reduce(invertedReplacer, text);

    res = Object.entries(americanToBritishTitles)
      .reduce(invertedReplacer, res);

    res = Object.entries(britishOnly)
      .reduce(straightReplacer, res);

    const timeRegex = /\b\d{1,2}(.)\d{1,2}\b/g;

    res = res.replace(timeRegex, (match) => {
      return match.replace('.', ':');
    });

    return res;
  }
}

Translator.LOCALE_US_TO_GB = 'american-to-british';
Translator.LOCALE_GB_TO_US = 'british-to-american';

function straightReplacer(acc, [key, value]) {
  return replacer(acc, [key, value]);
}

function invertedReplacer(acc, [key, value]) {
  return replacer(acc, [value, key]);
}

function escapeDot(acc, [key, value]) {
  const newKey = key.replace('.', '\\.');
  return [acc, [newKey, value]];
}

function modifyReplacer(modifications) {
  return (acc, [key, value]) => {
    return modifications.reduce((args, modification) => {
      console.dir({args, modification});
      return modification.apply(null, args);
    }, [acc, [key, value]]);
  }
}

function replacer(acc, [key, value]) {
  const regex = new RegExp(`\\b${key}\\b`, 'ig');

  if (key.includes('.')) {
    console.dir({regex, acc, key});
  }

  return acc.replace(regex, (match) => {
    const charCodeZero = match.charCodeAt(0);
    let result = value;


    if (charCodeZero >= 65 && charCodeZero <= 90) {
      result = result[0].toUpperCase() + result.slice(1);
    }

    if (key.includes('.')) {
      console.dir({match, result});
    }

    return result;
  });
}

module.exports = Translator;
