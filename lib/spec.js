'use strict';

var normalizeWord = require('./word').normalizeWord;
var splitIntoWords = require('./word').splitIntoWords;

module.exports = createSpec;

function createSpec (body) {
    return new Spec(body);
}

function Spec (body) {
    this.body = body;
    this.words = splitIntoWords(body);
    this._bodyNormalized = this.words.join(' ');
}

/**
 * Check whether the spec contains a given word.
 * @param  {string}  word The word to check for.
 * @return {boolean}      Whether the word was found.
 */
Spec.prototype.containsWord = function (word) {
    return (this.words.indexOf(normalizeWord(word)) !== -1);
};

/**
 * Check whether the spec contains a given phrase.
 * @param  {string}  phrase The phrase to check for.
 * @return {boolean}        Whether the phrase was found.
 */
Spec.prototype.containsPhrase = function (phrase) {
    phrase = splitIntoWords(phrase).join(' ');
    return (this._bodyNormalized.indexOf(phrase) !== -1);
};

/**
 * Check whether the spec contains any of the given words.
 * @param  {array} words The words to check for.
 * @return {array}       An array containing the words which were found.
 */
Spec.prototype.containsAnyOfWords = function (words) {
    return words.filter(this.containsWord.bind(this));
};

/**
 * Check whether the spec contains any of the given phrases.
 * @param  {array} phrases The phrases to check for.
 * @return {array}         An array containing the phrases which were found.
 */
Spec.prototype.containsAnyOfPhrases = function (phrases) {
    return phrases.filter(this.containsPhrase.bind(this));
};
