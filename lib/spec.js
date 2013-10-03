'use strict';

var dedupe = require('dedupe');
var flatten = require('flatten');
var slug = require('slugg');

module.exports = createSpec;

function createSpec (body) {
    return new Spec(body);
}

function Spec (body) {
    this.body = body;
    this._words = slug(body, ' ').split(' ');
    this._bodyNormalized = ' ' + this._words.join(' ') + ' ';
}

Spec.prototype.contains = function (phrase) {
    return this._bodyNormalized.match(preparePhrase(phrase));
};

Spec.prototype.containsAnyOf = function (phrases) {
    return dedupe(flatten(phrases.map(this.contains.bind(this)).filter(Array.isArray)));
};

function preparePhrase (phrase) {
    return new RegExp('\\b' + (phrase.source || phrase) + '\\b', 'ig');
}
