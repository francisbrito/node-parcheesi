/*jslint browser: false, nomen: true, sloppy: true */
/*global require, describe, it, beforeEach, console */

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

var assert = require('assert'),
    parcheesi = require('./../parcheesi'),
    utils = require('./test_utils'),
    game;


describe('Parcheesi Core', function() {
    describe('Gameplay', function() {
        beforeEach(function(){
            game = new parcheesi.ParcheesiGame();
        });

        it('should define the first turn randomly', function() {
            //Let's start the game many times and check distribution
            var expectedDistribution = 100/4;
            var distributions = [0,0,0,0];
            for (var i = 0; i < 100; i += 1){
                game = new parcheesi.ParcheesiGame();
                distributions[game.currentTurn()]++;
            }
            
            //Calculate the median deviation of each observed roll aggregate:
            var medianDeviaton = utils.calculateMedianDeviation(distributions, expectedDistribution);

            medianDeviaton.should.be.within(0, 0.2);
        });

        it('should convert the value of six(6) to twelve(12)', function() {
            assert.fail();
        });

        it('should detect if the player doesn\'t have pawns inside the Home', function (done) {
            game.players[0].pawns[0].position = 10;
            game.players[0].pawns[1].position = 11;
            game.players[0].pawns[2].position = 12;
            game.players[0].pawns[3].position = 5;

            game.enterPawn(0);
        });

        it('should only allow players to take out a Pawn when a five(5/x) is rolled', function() {
            assert.fail();
        });

        it('should allow the player to take out two Pawns when a double five (5/5) is rolled', function() {
            assert.fail();
        });

        it('should assign the player another turn if a double is rolled', function() {
            assert.fail();
        });

        it('should punish the player if three doubles are rolled consecutively', function() {
            assert.fail();
        });

        it('should pass the turn if there aren\'t valid moves for the current player', function() {
            assert.fail();
        });

        it('should limit the dice to just one when remaining pawns can enter using five ' +
            'spaces or less', function() {
                assert.fail();
            });

        it('should convert the value of six(6) to another turn when remaining pawns can ' +
            'enter using five spaces or less', function() {
                assert.fail();
            });
    });
});