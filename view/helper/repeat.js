'use strict';

module.exports = helper;

function helper (register) {

    // Repeat a block of code a number of times
    register('repeat', function (times, opts) {
        var result = '';
        for (; times > 0; times --) {
            result += opts.fn();
        }
        return result;
    });

}
