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

Result.prototype.setCurrentRule = function (rule) {
    this.currentRule = rule;
};

Result.prototype.clearCurrentRule = function () {
    delete this.currentRule;
};

Result.prototype._addMessage = function (type, msg, evidence) {
    this[type].push({
        message: msg,
        detail: (this.currentRule ? this.currentRule.desc : ''),
        evidence: evidence || []
    });
};

Result.prototype.addError = function (msg, evidence) {
    this._addMessage('errors', msg, evidence);
};

Result.prototype.addWarning = function (msg, evidence) {
    this._addMessage('warnings', msg, evidence);
};

Result.prototype.addNotice = function (msg, evidence) {
    this._addMessage('notices', msg, evidence);
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
