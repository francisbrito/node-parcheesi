/*jshint strict: true, curly: false, node: true */
/*global require, it, describe, beforeEach */

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

'use strict';

var assert = require('assert'),
    testUtils = require('./test_utils'),
    dice = require('./../dice'),
    ParcheesiGame = require('./../parcheesi');

describe('Parcheesi Core', function() {
    describe('Pawn', function() {

        var game;

        beforeEach(function(){
            game = new ParcheesiGame({
                startingTurn: 0
            });
        });

        it('cannot move more spaces than the ones on the dice throw', function() {
            game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(2), new dice(3)]
            });
            
            testUtils.positionPawnOnStart(game, 0);
            game.throwDices();

            (function(){
                game.movePawn(0, 0, 4);
            }).should.throw('Cannot make move that isn\'t present on last dice roll');
            
        });

        it('cannot repeat a move already made from the dice roll', function(){
            game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(2), new dice(3)]
            });
            
            testUtils.positionPawnOnStart(game, 0);
            game.throwDices();

            (function(){
                game.movePawn(0, 0, 2);
                game.movePawn(0, 0, 2);
            }).should.throw();
            
        });

        it('can\'t occupy the same safe space as an oponent\'s Pawn', function() {
            game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(5), new dice(2)]
            });

            testUtils.positionPawn(game, 1, 0, 7);
            
            game.throwDices();
            game.enterPawn(0,0);
            game.movePawn(0,0,2);

            game.spaces[7].pawns.should.have.lengthOf(1);
        });

        it('should form a barrier if two occupy the same space', function() {
            game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(5), new dice(6)]
            });

            testUtils.positionPawn(game, 1, 0, 7);
            testUtils.positionPawn(game, 1, 1, 7);
            
            (function(){
                game.throwDices();
                game.enterPawn(0,0);
                game.movePawn(0,0,6);
            }).should.throw();
        });

        it('cannot occupy a space where there are already two pawns', function() {
            game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(5), new dice(2)]
            });

            testUtils.positionPawn(game, 1, 0, 7);
            testUtils.positionPawn(game, 1, 1, 7);
            
            (function(){
                game.throwDices();
                game.enterPawn(0,0);
                game.movePawn(0,0,2);
            }).should.throw();
        });

        it.skip('blocks entry to other player\'s stairway entrance', function() {
            assert.fail();
        });

        it.skip('blocks entry to other player\'s starting point', function() {
            assert.fail();
        });

        it.skip('can kill another pawn blocking the entry on stairway if a double one (1/1) is rolled', function() {
            assert.fail();
        });

        it.skip('can kill another pawn blocking the starting point if a double five (5/5) is rolled', function() {
            assert.fail();
        });

        it.skip('should return to the home container if killed', function() {
            assert.fail();
        });

        it.skip('should play complete dice roll if it\'s the only pawn on the board', function() {
            assert.fail();
        });

        it.skip('succesfully spawns a new pawn after rolling double five (5/5) and killing an oponent\'s ' +
            'pawn which has blocking the starting point', function() {
                assert.fail();
            });

        it.skip('should enforce all previous rules inside the staircases as well', function () {
            //TODO: determine how to test for this withouth running all the tests again?
            assert.fail();
        });
    });
});