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

Spec.prototype.containsWord = function (word) {
    return (this.words.indexOf(normalizeWord(word)) !== -1);
};
