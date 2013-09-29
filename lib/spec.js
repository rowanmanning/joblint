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
 * Check whether the spec contains any of the given words.
 * @param  {array} words The words to check for.
 * @return {array}       An array containing the words which were found.
 */
Spec.prototype.containsAnyOfWords = function (words) {
    return words.filter(this.containsWord.bind(this));
};
