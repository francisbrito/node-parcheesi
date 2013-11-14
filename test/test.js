var assert = require('assert'); 
var parcheesi = require('./../parcheesi');

describe('Parcheesi', function() {
	describe('Game definition', function() {
		it('should have a board', function() {
			var game = new parcheesi.ParcheesiGame();
			assert.notEqual(game.spaces, undefined);
		})
	})
})