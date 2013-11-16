/*jslint browser: false, nomen: true, sloppy: true*/
/*global require, describe, it, console*/

//Important: these are the DOMINICAN REPUBLIC rules for playing "parché"

var assert = require("assert");
var parcheesi = require("./../parcheesi");


describe("Parcheesi Core", function () {
    describe("Board Definition", function () {
        it("should have 68 spaces on the general playfield", function () {
            assert.fail();
        });

        it("should have a starting point (home) for each player", function () {
            assert.fail();
        });

        it("should have a player-specific starway to heaven", function () {
            assert.fail(); 
            assert.pass();
        });
        
        it("each stairway should be 8 spaces long", function() {
            assert.fail();
        });

        it("should have a heaven (last spot a player can play to)", function () {
            assert.fail();
        });

        it("should have safe places distribuited across the general playfield", function () {
            var i, game = new parcheesi.ParcheesiGame();
            for (i = 0; i < 4; i += 1) {
                assert.game.spaces[i * 17 + 0].isSafe();
                assert.game.spaces[i * 17 + 5].isSafe();
                assert.game.spaces[i * 17 + 12].isSafe();
            }

            assert.fail();
        });

        it("Should be a circular array", function (done) {
            assert.fail();
        });
    });
});