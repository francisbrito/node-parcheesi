/*jshint strict: true, curly: false, node: true */
/*global require, it, describe, beforeEach */

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

'use strict';

var CONSTANTS = require('./../constants'),
    assert = require('assert'),
    _und = require('underscore'),
    testUtils = require('./test_utils'),
    dice = require('./../dice'),
    ParcheesiGame = require('./../parcheesi'),
    should = require('should');


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
            var roll = game.throwDices();
            roll.should.not.eql(undefined);
        });

        it('should not be able to throw the dices more than once per turn', function() {
            game.throwDices(0);

            (function() {
                game.throwDices(0);
            }).should.throw();
        });

        it('should be able to move a Pawn', function() {
            var currentTurn = game.currentTurn(),
                pawn = testUtils.positionPawnOnStart(game, currentTurn),
                initialPosition = pawn.position;

            game.throwDices();
            var lastRoll = game.lastDiceThrow();

            game.movePawn(currentTurn, 0, lastRoll[0]);
            pawn.position.should.not.eql(initialPosition);
        });

        it('should only be able to play during its turn (movePawn)', function() {
            game = new ParcheesiGame({
                startingTurn : 0
            });

            //TODO: Instead of using position.PawnOnStart it should be passed to the game object on options
            testUtils.positionPawnOnStart(game, 0);
            testUtils.positionPawnOnStart(game, 1);

            (function(){
                game.movePawn(1, 0, 5);
            }).should.throw();

        });

        it('should only be able to play during its turn (enterPawn)', function() {
            game = new ParcheesiGame({
                startingTurn : 0,
                dices: [new dice(5), new dice(5)]
            });

            (function(){
                game.throwDices();
                game.enterPawn(1);
            }).should.throw();
        });

        it('should be able to decided which Pawns to move', function() {
             game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(6), new dice(2)]
            });

            var pawn1 = testUtils.positionPawn(game, 0, 0, 7);
            var pawn2 = testUtils.positionPawn(game, 0, 1, 9);

            game.throwDices();
            game.movePawn(0,1,2);

            pawn1.position.should.eql(7);
            pawn2.position.should.eql(9+2);
        });

        it('should be able to kill an oponent\'s Pawn', function() {
            game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(5), new dice(2)]
            });

            testUtils.positionPawn(game, 1, 0, 7);

            game.throwDices();
            game.enterPawn(0,0);
            game.movePawn(0,0,2);

            game.players[1].pawns[0].position.should.eql(-1);
        });

        it('should get additional spaces added to the turn after killing an oponent\'s pawn', function() {
            game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(5), new dice(2)]
            });

            testUtils.positionPawn(game, 1, 0, 7);

            game.throwDices();
            game.enterPawn(0,0);
            game.movePawn(0,0,2);

            _und.where(game.lastDiceThrow(), {value:CONSTANTS.extraMovesOnKill})
                .should.have.lengthOf(1);

        });

        it('should\'nt be able to kill an oponent Pawn while on a safe zone', function() {
            game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(5), new dice(2)]
            });

            testUtils.positionPawn(game, 0, 0, 10);
            testUtils.positionPawn(game, 1, 0, 12);

            game.throwDices();
            game.movePawn(0,0,2);

            game.spaces[12].pawns.should.have.lengthOf(2);
        });

        it('cannot use additional spaces gained from a kill using the same pawn', function() {
             game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(5), new dice(2)]
            });

            testUtils.positionPawn(game, 1, 0, 7);
            testUtils.positionPawn(game, 0, 0, 5);
            testUtils.positionPawn(game, 0, 1, 14);

            (function(){
                game.throwDices();
                game.movePawn(0,0,2);
                game.movePawn(0,0,10);
            }).should.throw();

        });

        it.skip('should get additional spaces added to the turn after reaching heaven', function() {
            assert.fail();
        });
    });
});
