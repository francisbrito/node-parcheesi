/*jshint strict: true, curly: false, node: true */
/*global module */

'use strict';

module.exports = (function() {

	var utils = {
		randomize: function(min, max) {
			// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
	};

	return utils;
}());
