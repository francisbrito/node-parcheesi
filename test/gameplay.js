/*jshint strict: true, curly: false, node: true */
/*global require, it, describe, beforeEach */

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

'use strict';

var assert = require('assert'),
    _und = require('underscore'),
    sinon = require('sinon'),
    testUtils = require('./test_utils'),
    dice = require('./../dice'),
    ParcheesiGame = require('./../parcheesi');


describe('Parcheesi Core', function() {
    describe('Gameplay', function() {
        var game;

        beforeEach(function() {
            game = new ParcheesiGame();
        });

        it('should define the first turn randomly', function() {
            //Let's start the game many times and check distribution

            var i,
                medianDeviaton,
                expectedDistribution = 100 / 4,
                distributions = [0, 0, 0, 0];

            for (i = 0; i < 100; i += 1) {
                game = new ParcheesiGame({
                    numberOfPlayers: 4
                });
                distributions[game.currentTurn()] += 1;
            }

            console.log(distributions);

            //Calculate the median deviation of each observed roll aggregate:
            medianDeviaton = testUtils.calculateMedianDeviation(distributions, expectedDistribution);

            medianDeviaton.should.be.within(0, 0.25);
        });

        it('should define the first turn randomly, but limit it to the number of players', function() {
            var i, distributions = [];
            for (i = 0; i < 100; i += 1) {
                game = new ParcheesiGame({
                    numberOfPlayers: 2
                });
                distributions[game.currentTurn()] += 1;
            }

            distributions.length.should.equal(2);
        });

        it('should convert the value of six(6) to twelve(12)', function() {
            var pawn = game.players[0].pawns[0];
            game.spaces[10].pawns.push(pawn);
            pawn.position = 10;
            game.movePawn(0, 0, 6);

            pawn.position.should.equal(10 + 12);
        });

        it('should detect if the player doesn\'t have pawns inside the Home', function() {
            game.players[0].pawns[0].position = 10;
            game.players[0].pawns[1].position = 11;
            game.players[0].pawns[2].position = 12;
            game.players[0].pawns[3].position = 5;

            (function() {
                game.enterPawn(0);
            }).should.
            throw ('All player\'s pawns are outside of the Home');
        });

        it('should allow players to take out a Pawn when a five(5/x) is rolled', function() {
            //Since the dice throws random numnbers, we either need to throw it many times until
            //we get the value we want, or just overwrite it's functionality.
            //Here we chose to overwrite using the sinonJS mocking framework

            sinon.stub(game, 'throwDices').returns([5, 4]);
            sinon.stub(game, 'lastDiceThrow').returns([5, 4]);
            sinon.stub(game, 'currentTurn').returns(0);

            game.enterPawn(0);
            game.spaces[5].pawns.length.should.be.above(0);
        });

        it('shouldn\'t allow players to take out a Pawn when a five(5/x) is NOT rolled', function() {
            sinon.stub(game, 'throwDices').returns([3, 4]);
            sinon.stub(game, 'lastDiceThrow').returns([3, 4]);
            sinon.stub(game, 'currentTurn').returns(0);

            (function() {
                game.enterPawn(0);
            }).should.
            throw ('Player must roll a five(5) to enter pawn');
        });

        it('should allow the player to take out two Pawns when a double five (5/5) is rolled', function() {
            sinon.stub(game, 'throwDices').returns([5, 5]);
            sinon.stub(game, 'lastDiceThrow').returns([5, 5]);
            sinon.stub(game, 'currentTurn').returns(0);

            game.enterPawn(0);
            game.enterPawn(0);
            game.spaces[5].pawns.length.should.equal(2);
        });

        it('should keep track of moves already performed (enter pawn)', function() {
            sinon.stub(game, 'throwDices').returns([5, 4]);
            sinon.stub(game, 'lastDiceThrow').returns([5, 4]);

            game.throwDices();
            game.enterPawn(game.currentTurn());

            _und.last(game.moveLog).usedMoves.should.contain(5);
        });

        it('should keep track of moves already performed (move pawn)', function() {
            sinon.stub(game, 'throwDices').returns([5, 4]);
            sinon.stub(game, 'lastDiceThrow').returns([5, 4]);

            game.throwDices();
            var currentTurn = game.currentTurn();

            game.enterPawn(currentTurn);
            game.movePawn(currentTurn, 0, 4);

            _und.last(game.moveLog).usedMoves.should.eql([5, 4]);
        });

        it('should pass the turn after all player moves are made on the board', function() {
            var game = new ParcheesiGame({
                dices: [new dice(5)]
            }),

                currentTurn = game.currentTurn(),
                diceRoll = game.throwDices(currentTurn),
                withouthFives = _und.without(diceRoll, 5),
                spacesToMove = withouthFives.length === 0 ? 5 : withouthFives[0];

            game.enterPawn(currentTurn);
            game.movePawn(currentTurn, 0, spacesToMove);

            game.currentTurn().should.not.eql(currentTurn);
        });

        it('should limit the turn number according to the quantity of players', function() {
            var game = new ParcheesiGame({
                numberOfPlayers: 3
            });

            testUtils.positionPawn(game, 0, 0, 5);
            testUtils.positionPawn(game, 1, 0, 22);
            testUtils.positionPawn(game, 2, 0, 39);

            var currentTurn = game.currentTurn();
            testUtils.emulatePlay(game, currentTurn);

            currentTurn = currentTurn + 1 !== 3 ? currentTurn + 1 : 0;
            testUtils.emulatePlay(game, currentTurn);

            currentTurn = currentTurn + 1 !== 3 ? currentTurn + 1 : 0;
            testUtils.emulatePlay(game, currentTurn);

            game.currentTurn().should.not.eql(3);
        });

        it.skip('should pass the turn if there aren\'t valid moves for the current player', function() {
            assert.fail();
        });

        it.skip('should assign the player another turn if a double is rolled', function() {
            assert.fail();
        });

        it.skip('should punish the player if three doubles are rolled consecutively', function() {
            assert.fail();
        });

        it.skip('should limit the dice to just one when remaining pawns can enter using five ' +
            'spaces or less', function() {
                assert.fail();
            });

        it.skip('should convert the value of six(6) to another turn when remaining pawns can ' +
            'enter using five spaces or less', function() {
                assert.fail();
            });
    });
});