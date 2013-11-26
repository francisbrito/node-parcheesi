/*jshint strict: true, curly: false, node: true */
/*global require, it, describe, beforeEach */

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

'use strict';

var assert = require('assert'),
    testUtils = require('./test_utils'),
    CONSTANTS = require('./../constants'),
    dice = require('./../dice'),
    ParcheesiGame = require('./../parcheesi');

describe('Parcheesi Core', function() {
    describe('Board Definition', function() {
        var game;

        beforeEach(function() {
            game = new ParcheesiGame({
                startingTurn: 0
            });
        });

        it('should have 68 spaces on the general playfield', function() {
            game.spaces.should.have.lengthOf(68);
        });

        it('should have a starting point (home) for each player', function() {
            for (var i = CONSTANTS.colors.length - 1; i >= 0; i--) {
                assert.notEqual(game.spaces[i * 17 + 5].isStartingSpace(), false);
            }
        });

        it('should know all four starting spaces assigned on the board', function() {
            for (var i = CONSTANTS.colors.length - 1; i >= 0; i--) {
                assert.notEqual(game.getStartingSpace(CONSTANTS.colors[i].name), false);
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

        it.skip('should have a heaven (last spot a player can play to)', function() {
            assert.fail();
        });

        it('should have safe places distribuited across the general playfield', function() {
            for (var i = 0; i < 4; i += 1) {
                assert(game.spaces[i * 17 + 0].isSafe());
                assert(game.spaces[i * 17 + 5].isSafe());
                assert(game.spaces[i * 17 + 12].isSafe());
            }
        });

        it('should allow a player to move a pawn', function() {
            game = new ParcheesiGame({
                startingTurn: 0,
                dices: [new dice(6), new dice(4)]
            });
            testUtils.positionPawnOnStart(game, 0);

            //Perform a move on the first player, with the first pawn, four spaces
            game.throwDices(0);
            game.movePawn(0, 0, 4);
            game.players[0].pawns[0].position.should.equal(5 + 4);
        });

        it('should detect ilegal move (pawn isn\'t outside of the home)', function() {
            (function() {
                game.movePawn(0, 0, 4); //Player 0, Pawn 0, to be moved 4 spaces
            })
            .should.throw ('Pawn is still inside player\'s home');
        });

        it('should detect ilegal moves (pawn wasn\'t in allocated space', function () {
            var pawn = game.players[0].pawns[0];
            pawn.position = 5;

            (function() {
                game.movePawn(0, 0, 4); //Player 0, pawn 0, to be moved 4 spaces    
            })
            .should.throw();
        });

        it('should detect ilegal move (player doesn\'t exist)' , function () {
            game = new ParcheesiGame({
                numberOfPlayers: 2
            });

            var pawn = game.players[0].pawns[0];
            pawn.position = 5;

            (function() {
                game.movePawn(3,0,4); //Player 3, pawn 0, to be moved 4 spaces
            })
            .should.throw('Player is not defined');
        });

        it('should detect ilegal move (pawn doesn\'t exist)' , function () {
            (function() {
                game.movePawn(0,5,4); //Player 0, pawn 5, to be moved 4 spaces
            })
            .should.throw('Pawn is not defined');
        });

        it('Should be a circular array', function() {
            game = new ParcheesiGame({
                startingTurn: 3,
                numberOfPlayers: 4,
                dices: [new dice(5), new dice(5)]
            });

            var pawn = game.players[3].pawns[0];
            game.spaces[67].pawns.push(pawn);
            pawn.position = 67;

            game.throwDices();
            game.movePawn(3,0,5);

            pawn.position.should.equal(4);
        });

    });
});