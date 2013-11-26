/*jshint strict: true, curly: false, node: true */
/*global require, module */

var utils = require('./utils');

module.exports = function(dicePreference) {
	'use strict';

	this.value = -1;

	this.roll = function(){
		this.value = dicePreference || utils.randomize(1,6);
		return this.value;
	};
};