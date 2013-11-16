/*jslint browser: false, nomen: true, sloppy: true*/
/*global require, describe, it, console*/

//Important: these are the DOMINICAN REPUBLIC rules for playing "parché"

var assert = require("assert");
var parcheesi = require("./../parcheesi");

describe("Parcheesi Core", function () {
    describe("Game definition", function () {
        it("should have a board", function () {
            var game = new parcheesi.ParcheesiGame();
            assert.notEqual(game.spaces, undefined);
        });

        it("should have between 2 and 4 players", function () {
            var game = new parcheesi.ParcheesiGame();

            assert(game.players !== undefined, "Players not defined");
            assert(game.players.length >= 2 && game.players.length <= 4, "Number of players is incorrect");
        });

        it("should not have more than 4 players", function () {
            assert.throws(function () {
                new parcheesi.ParcheesiGame(5);
            }, Error);
        });

        it("should have at least two players to play", function () {
            var game = new parcheesi.ParcheesiGame();
            game.players.length.should.be.equal(2);
        });

        it("should assign different colors to each player", function () {
            //TODO: Let"s check if we can define this instantiation on a single method that runs before each test
            var game = new parcheesi.ParcheesiGame();

            assert(game.players[0].color !== game.players[1].color, "Player colors cannot be the same");
        });

        it("should assign four Pawns to each player", function () {
            var game = new parcheesi.ParcheesiGame();

            for (var i = 0; i < game.players.length; i += 1){
                assert(game.players[i].pawns.length == 4)
            }
        });

        it("should have a double dice system", function () {
            var game = new parcheesi.ParcheesiGame();

            var dice_throw = game.throwDices();
            assert(dice_throw !== undefined)
        });

        it("should have random entries for dice throw", function () {
            //This is a complicated test and I still don't get it that well :P
            //http://programmers.stackexchange.com/questions/147134/how-should-i-test-randomness
            //http://math.stackexchange.com/questions/2435/is-there-a-simple-test-for-uniform-distributions

            var game = new parcheesi.ParcheesiGame();            

            //Let's throw the dice many times and check distribution
            var expected_distribution = 1000/6;
            var distributions = [0,0,0,0,0,0];

            for(var i = 0; i < 1000; i += 1){
                var firstDiceRoll = game.throwDices()[0];
                distributions[firstDiceRoll-1] += 1; 
            };
            console.log('\nDistributions: ' + distributions);

            //Calculate the median deviation of each observed roll aggregate:
            var deviations = [];
            var deviationSum = 0.0;
            for (var j = 0; j <6; j += 1) {
                var valueDiff = Math.abs(distributions[j] - expected_distribution);
                var dev = (valueDiff/expected_distribution).toFixed(2);
                
                deviationSum += Number(dev);
                deviations.push(dev);
            };
            var medianDeviation = (deviationSum/6);
            
            console.log('Deviations: ' + deviations);
            console.log('Median Deviation: ' + medianDeviation.toFixed(2));

            medianDeviation.should.be.within(0, 0.1);
        });
    });
    
});








