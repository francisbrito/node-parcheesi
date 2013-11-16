/*jslint browser: false, nomen: true, sloppy: true*/
/*global require, describe, it, console*/

//Important: these are the DOMINICAN REPUBLIC rules for playing "parché"

var assert = require("assert");
var parcheesi = require("./../parcheesi");


describe("Parcheesi Core", function () {
    describe("Gameplay", function() {
        it("should define the first turn randomly", function(){
            assert.fail();
        });

        it("should convert the value of six(6) to twelve(12)", function(){
            assert.fail();
        });

        it("should only allow players to take out a Pawn when a five(5/x) is rolled", function(){
            assert.fail();
        });

        it("should allow the player to take out two Pawns when a double five (5/5) is rolled", function () {
            assert.fail(); 
        });

        it("should assign the player another turn if a double is rolled", function(){
            assert.fail();
        });

        it("should punish the player if three doubles are rolled consecutively", function(){
            assert.fail();
        });        

        it("should pass the turn if there aren't valid moves for the current player", function(){
            assert.fail();
        });

        it('should limit the dice to just one when remaining pawns can enter using five ' + 
            'spaces or less', function (done) {
            assert.fail();
        });

        it('should convert the value of six(6) to another turn when remaining pawns can ' +
            'enter using five spaces or less', function (done) {
            assert.fail(); 
        });
    });
});