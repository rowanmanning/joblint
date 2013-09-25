'use strict';

module.exports = createResult;

function createResult () {
    return new Result();
}

function Result () {
    this.errors = [];
    this.warnings = [];
    this.notices = [];
}

Result.prototype.addError = function (msg) {
    this.errors.push(msg);
};

Result.prototype.addWarning = function (msg) {
    this.warnings.push(msg);
};

Result.prototype.addNotice = function (msg) {
    this.notices.push(msg);
};
