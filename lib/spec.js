'use strict';

var slug = require('slugg');

module.exports = createSpec;

function createSpec (body) {
    return new Spec(body);
}

function Spec (body) {
    this.body = body;
    this.words = slug(body, ' ').split(' ');
}

Spec.prototype.containsWord = function (word) {
    word = slug(word, ' ').replace(/\s/g, ''); // todo: split into function or word library
    return (this.words.indexOf(word) !== -1);
};
