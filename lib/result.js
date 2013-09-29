'use strict';

module.exports = createResult;

function createResult () {
    return new Result();
}

function Result () {
    this.errors = [];
    this.warnings = [];
    this.notices = [];
    this.failPoints = {
        culture: 0,
        realism: 0,
        recruiter: 0,
        tech: 0
    };
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

Result.prototype._addFailPoints = function (type, amount) {
    this.failPoints[type] += Math.ceil(amount || 1);
};

Result.prototype.addCultureFailPoints = function (amount) {
    this._addFailPoints('culture', amount);
};

Result.prototype.addRealismFailPoints = function (amount) {
    this._addFailPoints('realism', amount);
};

Result.prototype.addRecruiterFailPoints = function (amount) {
    this._addFailPoints('recruiter', amount);
};

Result.prototype.addTechFailPoints = function (amount) {
    this._addFailPoints('tech', amount);
};

Result.prototype.hasMessages = function () {
    return (
        this.errors.length > 0 ||
        this.warnings.length > 0 ||
        this.notices.length > 0
    );
};

Result.prototype.hasFailPoints = function () {
    return (
        this.failPoints.culture > 0 ||
        this.failPoints.realism > 0 ||
        this.failPoints.recruiter > 0 ||
        this.failPoints.tech > 0
    );
};

Result.prototype.isClean = function () {
    return (
        !this.hasMessages() &&
        !this.hasFailPoints()
    );
};
