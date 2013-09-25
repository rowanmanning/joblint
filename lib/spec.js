'use strict';

module.exports = createSpec;

function createSpec (body) {
    return new Spec(body);
}

function Spec (body) {
    this.body = body;
}
