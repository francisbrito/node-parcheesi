/*jslint browser: false, nomen: true, sloppy: true*/
/*global require, describe, console*/

var assert = require('assert');
var parcheesi = require('./../parcheesi');

describe('Parcheesi', function () {
    describe('Game definition', function () {
        it('should have a board', function () {
            var game = new parcheesi.ParcheesiGame();
            assert.notEqual(game.spaces, undefined);
        });

        it('should have between 2 and 4 players', function () {
            var game = new parcheesi.ParcheesiGame();

            assert(game.players !== undefined, 'Players not defined');
            assert(game.players.length >= 2 && game.players.length <= 4, 'Number of players is incorrect');
        });

        it('should assign different colors to each player', function () {
            //TODO: Let's check if we can define this instantiation on a single method that runs before each test
            var game = new parcheesi.ParcheesiGame();

            assert(game.players[0].color !== game.players[1].color, 'Player colors cannot be the same');
        });
    })
})