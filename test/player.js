/*jshint strict: true, curly: false, node: true */
/*global require, it, describe, beforeEach */

//Important: these are the DOMINICAN REPUBLIC rules for playing 'parché'

'use strict';

var assert = require('assert'),
    parcheesi = require('./../parcheesi'),
    game;


describe('Parcheesi Core', function () {
    describe('Player', function(){

        beforeEach(function(){
            game = new parcheesi.ParcheesiGame();
        });

        it.skip('should start the game with four pawns', function () {
            assert.fail();
        });

        it.skip('should be able to roll the dice', function(){
            assert.fail();
        });

        it.skip('should only be able to play during its turn', function(){
            assert.fail();
        });

        it.skip('should be able to decided which Pawns to move', function(){
            assert.fail();
        });

        it.skip('should be able to move a Pawn', function(){
            assert.fail();
        });

        it.skip('should be able to kill an oponent\'s Pawn', function(){
            assert.fail();
        });
        
        it.skip('should get additional spaces added to the turn after killing an oponent\'s pawn', function(){
            assert.fail();
        });
        
        it.skip('cannot use additional spaces gained from a kill using the same pawn', function(){
            assert.fail();
        });

        it.skip('should\'nt be able to kill an oponent Pawn while on a safe zone', function(){
            assert.fail();
        });

        it.skip('should get additional spaces added to the turn after reaching heaven', function () {
            assert.fail();
        });
    });
});