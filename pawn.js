/*jshint strict: true, curly: false, node: true */
/*global require, console, module */

'use strict';

module.exports = function Pawn(color, index) {
    this.color = color;
    this.position = -1;
    this.index = index;
};