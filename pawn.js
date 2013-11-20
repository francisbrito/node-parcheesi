/*jshint strict: true, curly: false, node: true */
/*global require, console, module */

'use strict';

module.exports = function Pawn(color) {
    this.color = color;
    this.position = -1;
};