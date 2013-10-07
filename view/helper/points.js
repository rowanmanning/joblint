'use strict';

module.exports = helper;

function helper (register) {

    // Output a percentage value for points
    register('pointsToPercentage', function (points) {
        return (points * 5) + '%';
    });

}
