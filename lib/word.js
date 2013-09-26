'use strict';

var slug = require('slugg');

module.exports = {
    normalizeWord: normalizeWord,
    splitIntoWords: splitIntoWords
};

function splitIntoWords (body) {
    return slug(body, ' ').split(' ');
}

function normalizeWord (word) {
    return slug(word, ' ').replace(/\s/g, '');
}
