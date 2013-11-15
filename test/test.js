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
                var game = new parcheesi.ParcheesiGame(5);
            }, Error);
        });

        it("should have at least two players to play", function () {
            var game = new parcheesi.ParcheesiGame();
            assert(game.players.length === 0);
        });

        it("should assign different colors to each player", function () {
            //TODO: Let"s check if we can define this instantiation on a single method that runs before each test
            var game = new parcheesi.ParcheesiGame();

            assert(game.players[0].color !== game.players[1].color, "Player colors cannot be the same");
        });

        it("should assign four Pawns to each player", function () {
            assert.fail("Test hasnt been written");
        });

        it("should have a double dice system", function () {
            assert.fail();
        });
    });

    describe("Board Definition", function () {
        it("should have 68 spaces on the general playfield", function () {
            assert.fail();
        });

        it("should have a starting point (home) for each player", function () {
            assert.fail();
        });

        it("should have a player-specific starway to heaven", function () {
            assert.fail();
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
    });

    describe("Game play", function() {
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

    describe("Player", function(){
        it("should be able to roll the dice", function(){
            assert.fail();
        });        

        it("should only be able to play during its turn", function(){
            assert.fail();
        });

        it("should be able to decided which Pawns to move", function(){
            assert.fail();
        });

        it("should be able to move a Pawn", function(){
            assert.fail();
        });

        it("should be able to kill an oponent's Pawn", function(){
            assert.fail();
        });
        
        it("should get additional spaces added to the turn after killing an oponent's pawn", function(){
            assert.fail();
        });
        
        it("cannot use additional spaces gained from a kill using the same pawn", function(){
            assert.fail();
        });

        it("should'nt be able to kill an oponent Pawn while on a safe zone", function(){
            assert.fail();
        });

        it("should get additional spaces added to the turn after reaching heaven", function (done) {
            assert.fail();
        });
    });

    describe("Pawn", function(){
        it("cannot move more spaces than the ones on the dice throw", function(){
            assert.fail();
        });
        
        it("can't occupy the same safe space as an oponent's Pawn", function(){
            assert.fail();
        });

        it("should form a barrier if two occupy the same space", function(){
            assert.fail();
        });        

        it("blocks entry to other player's stairway entrance", function(){
            assert.fail();
        });

        it("blocks entry to other player's starting point", function(){
            assert.fail();
        });        

        it("can kill another pawn blocking the entry on stairway if a double one (1/1) is rolled", function() {
            assert.fail();
        });

        it("can kill another pawn blocking the starting point if a double five (5/5) is rolled", function() {
            assert.fail();
        });
        
        it("should return to the home container if killed", function(){
            assert.fail();
        });
        
        it("should play complete dice roll if it's the only pawn on the board", function(){
            assert.fail();
        });

        it("succesfully spawns a new pawn after rolling double five (5/5) and killing an oponent's " + 
            "pawn which has blocking the starting point", function() {
            assert.fail();
        });
    });
});








