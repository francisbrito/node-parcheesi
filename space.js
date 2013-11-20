/*jshint strict: true, curly: false, node: true */
/*global module */

'use strict';

module.exports = function Space(i, createAsSafe, startPointColor) {
    //TODO: use Resig's model for class creation 
    //(makeClass method instead of calling this same sentence on each class declaration)

    // enforces new
    if (!(this instanceof Space)) {
        return new Space(createAsSafe, startPointColor);
    }

    var space = {
        pawns: [],

        isSafe: function() {
            return createAsSafe || false;
        },

        isStartingSpace: function() {
            return startPointColor;
        },

        currentIndex: function() {
            return i;
        }
    };

    return space;
};