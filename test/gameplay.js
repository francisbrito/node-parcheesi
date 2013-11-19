/*jslint browser: false, nomen: true, sloppy: true */
/*global require, describe, it, beforeEach, console */

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

var assert = require('assert'),
    sinon = require('sinon'),
    parcheesi = require('./../parcheesi'),
    utils = require('./test_utils'),
    game;


describe('Parcheesi Core', function() {
    describe('Gameplay', function() {
        beforeEach(function() {
            game = new parcheesi.ParcheesiGame();
        });

        it('should define the first turn randomly', function() {
            //Let's start the game many times and check distribution
            var expectedDistribution = 100 / 4;
            var distributions = [0, 0, 0, 0];
            for (var i = 0; i < 100; i += 1) {
                game = new parcheesi.ParcheesiGame();
                distributions[game.currentTurn()]++;
            }

            //Calculate the median deviation of each observed roll aggregate:
            var medianDeviaton = utils.calculateMedianDeviation(distributions, expectedDistribution);

            medianDeviaton.should.be.within(0, 0.2);
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
            })
                .should.
            throw ('All player\'s pawns are outside of the Home');
        });

        it('should allow players to take out a Pawn when a five(5/x) is rolled', function() {
            //Since the dice throws random numnbers, we either need to throw it many times until
            //we get the value we want, or just overwrite it's functionality.
            //Here we chose to overwrite using the sinonJS mocking framework
            
            sinon.stub(game, 'throwDices').returns([5,4]);
            sinon.stub(game, 'lastDiceThrow').returns([5,4]);

            game.enterPawn(0);
            game.spaces[5].pawns.length.should.be.above(0);
        });

        it('shouldn\'t allow players to take out a Pawn when a five(5/x) is NOT rolled', function() {
            sinon.stub(game, 'throwDices').returns([3,4]);
            sinon.stub(game, 'lastDiceThrow').returns([3,4]);

            (function(){
                game.enterPawn(0);
            })
            .should.throw('Player must roll a five(5) to enter pawn');
            
        });

        it('should allow the player to take out two Pawns when a double five (5/5) is rolled', function() {
            sinon.stub(game, 'throwDices').returns([5,5]);
            sinon.stub(game, 'lastDiceThrow').returns([5,5]);

            game.enterPawn(0);
            game.enterPawn(0);
            game.spaces[5].pawns.length.should.equal(2);
        });

        it.skip('should assign the player another turn if a double is rolled', function() {
            assert.fail();
        });

        it.skip('should punish the player if three doubles are rolled consecutively', function() {
            assert.fail();
        });

        it.skip('should pass the turn if there aren\'t valid moves for the current player', function() {
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