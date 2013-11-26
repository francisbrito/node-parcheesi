/*jshint strict: true, curly: false, node: true */
/*global require, module */

'use strict';

var Pawn = require('./pawn');

module.exports = function Player(color, index) {
    this.color = color;
    this.index = index;
    this.pawns = new Array(4);
    
    for (var i = 0; i < 4; i += 1) {
        this.pawns[i] = new Pawn(color, i);
    }
};