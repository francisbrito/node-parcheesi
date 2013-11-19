/*jslint browser: false, nomen: true, sloppy: true*/
/*global require, describe, it, console*/

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

var assert = require('assert');
var parcheesi = require('./../parcheesi');


describe('Parcheesi Core', function() {
    describe('Pawn', function() {
        it.skip('cannot move more spaces than the ones on the dice throw', function() {
            assert.fail();
        });

        //TODO: It needs to move EXACTLY the spaces on the dice

        it.skip('can\'t occupy the same safe space as an oponent\'s Pawn', function() {
            assert.fail();
        });

        it.skip('should form a barrier if two occupy the same space', function() {
            assert.fail();
        });

        it.skip('cannot occupy a space where there are already two pawns', function() {

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