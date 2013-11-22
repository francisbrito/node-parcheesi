/*jshint strict: true, curly: false, node: true */
/*global require, it, describe, beforeEach */

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

'use strict';

var assert = require('assert'),
    testUtils = require('./test_utils.js'),
    ParcheesiGame = require('./../parcheesi');


describe('Parcheesi Core', function() {
    describe('Player', function() {

        var game;

        beforeEach(function() {
            game = new ParcheesiGame();
        });

        it('should start the game with four pawns', function() {
            var player = game.players[0];
            player.pawns.should.have.lengthOf(4);
        });

        it('should be able to roll the dice', function() {
            var player = game.players[0];
            var roll = game.throwDices();

            roll.should.not.eql(undefined);
        });

        it('should not be able to throw the dices more than once per turn', function() {
            var currentTurn = game.currentTurn();

            game.throwDices(currentTurn);

            (function() {
                game.throwDices(currentTurn);
            }).should.throw();

        });

        it('should be able to move a Pawn', function() {
            var currentTurn = game.currentTurn();
            var pawn = testUtils.positionPawnOnStart(game, currentTurn);

            var initialPosition = pawn.position;
            game.movePawn(currentTurn, 0, 5);

            pawn.position.should.not.eql(initialPosition);
        });

        it('should only be able to play during its turn (movePawn)', function() {
            var currentTurn = game.currentTurn();
            var otherTurn = (currentTurn == 1) ? 0 : 1;
            var pawn = testUtils.positionPawnOnStart(game, otherTurn);

            var initialPosition = pawn.position;
            game.movePawn(otherTurn, 0, 5);

            assert.fail();
        });

        it('should only be able to play during its turn (enterPawn)', function() {
            assert.fail();
        });

        it.skip('should be able to decided which Pawns to move', function() {
            assert.fail();
        });

        it.skip('should be able to kill an oponent\'s Pawn', function() {
            assert.fail();
        });

        it.skip('should get additional spaces added to the turn after killing an oponent\'s pawn', function() {
            assert.fail();
        });

        it.skip('cannot use additional spaces gained from a kill using the same pawn', function() {
            assert.fail();
        });

        it.skip('should\'nt be able to kill an oponent Pawn while on a safe zone', function() {
            assert.fail();
        });

        it.skip('should get additional spaces added to the turn after reaching heaven', function() {
            assert.fail();
        });
    });
});