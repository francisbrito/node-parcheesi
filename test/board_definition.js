/*jslint browser: false, nomen: true, sloppy: true */
/*global require, describe, it, beforeEach, console */

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

var assert = require('assert'),
    parcheesi = require('./../parcheesi'),
    game;

describe('Parcheesi Core', function() {
    describe('Board Definition', function() {
        beforeEach(function() {
            game = new parcheesi.ParcheesiGame();
        });

        it('should have 68 spaces on the general playfield', function() {
            game.spaces.should.have.lengthOf(68);
        });

        it('should have a starting point (home) for each player', function() {
            for (var i = parcheesi.CONSTANTS.colors.length - 1; i >= 0; i--) {
                assert.notEqual(game.spaces[i * 17 + 5].isStartingSpace(), false);
            }
        });

        it('should know all four starting spaces assigned on the board', function() {
            for (var i = parcheesi.CONSTANTS.colors.length - 1; i >= 0; i--) {
                assert.notEqual(game.getStartingSpace(parcheesi.CONSTANTS.colors[i].name), false);
            }
        });

        it('should have a player-specific starway to heaven', function() {
            game.stairs.length.should.equal(4);
            for (var i = game.stairs.length - 1; i >= 0; i--) {
                game.stairs[i].color.should.not.equal(undefined);
            }
        });

        it('each stairway should be 8 spaces long', function() {
            for (var i = game.stairs.length - 1; i >= 0; i--) {
                game.stairs[i].spaces.length.should.equal(8);
            }
        });

        it('should have a heaven (last spot a player can play to)', function() {
            assert.fail();
        });

        it('should have safe places distribuited across the general playfield', function() {
            for (var i = 0; i < 4; i += 1) {
                assert(game.spaces[i * 17 + 0].isSafe());
                assert(game.spaces[i * 17 + 5].isSafe());
                assert(game.spaces[i * 17 + 12].isSafe());
            }
        });

        it('Should be a circular array', function() {
            assert.fail();
        });

    });
});