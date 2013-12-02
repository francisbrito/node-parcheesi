/*jshint strict: true, curly: false, node: true */
/*global module */

'use strict';

var _und = require('underscore');

module.exports = (function() {
	var utils = {
		randomize: function(min, max) {
			// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
			return Math.floor(Math.random() * (max - min + 1) + min);
		},

		getAvailableDiceMoves: function(diceThrow, usedMoves, pawnIndex) {
			var closuredDice = _und.clone(diceThrow);
			var closuredMoves = _und.map(usedMoves, function(item){
				return item.value;
			});

			for (var i = 0; i < closuredDice.length; i++) {
				var existing = _und.indexOf(closuredMoves, closuredDice[i]);
				if (existing != -1) {
					closuredDice[i] = undefined;
					closuredMoves[existing] = undefined;
				}
			}
			return closuredDice;
		}
	};

	return utils;
}());