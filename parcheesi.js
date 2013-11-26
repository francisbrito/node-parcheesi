/*jshint strict: true, curly: false, node: true */
/*global require, console, module */

'use strict';

var CONSTANTS = require('./constants'),
    _und = require('underscore'),
    utils = require('./utils'),
    Player = require('./player'),
    Space = require('./space');

module.exports = function ParcheesiGame(numberOfPlayers) {

    //Checks that object is always constructed using 'new'
    if (!(this instanceof ParcheesiGame)) {
        return new ParcheesiGame(numberOfPlayers);
    }

    var lastDiceRoll,
        currentTurn = -1,
        remainingDiceThrows = 1,
        moveCounter = 0,
        realNumberOfPlayers = numberOfPlayers || 2;

    if (realNumberOfPlayers > 4) {
        throw new Error('Wrong number of players');
    }

    var generateSpaces = function () {
        var spaces = new Array(68);

        for (var i = 0; i < spaces.length; i += 1) {
            var quarterSection = Math.floor(i / 17);

            var isSpecial = ((i === quarterSection * 17 + 0) ||
                (i === quarterSection * 17 + 5) ||
                (i === quarterSection * 17 + 12));

            var startingSpace = (i === quarterSection * 17 + 5) ? CONSTANTS.colors[quarterSection] : false;

            spaces[i] = new Space(i, isSpecial, startingSpace);
        }
        return spaces;
    },
    
    generateStairs = function () {
        var stairs = new Array(4);

        for (var i = 0; i < stairs.length; i += 1) {
            stairs[i] = {
                color: CONSTANTS.colors[i],
                spaces: new Array(8)
            };
        }
        return stairs;
    },

    game = {
        spaces: generateSpaces(),
        stairs: generateStairs(),
        players: [],
        moveLog: [],

        currentTurn: function () {
            return currentTurn;
        },

        lastDiceThrow: function () {
            return lastDiceRoll;
        },

        throwDices: function (playerIndex, numberOfDice) {
            //If the dice is being rolled by a player and it has no remaining throws, throw an error
            if (playerIndex !== undefined && remainingDiceThrows < 1)
                throw new Error('Player cannot throw the dice more than once per turn');

            var numberToThrow = numberOfDice || 2;
            lastDiceRoll = [];

            for (var i = 0; i < numberToThrow; i++) {
                lastDiceRoll.push(utils.randomize(1, 6));
            }
            remainingDiceThrows--;

            return this.lastDiceThrow();
        },

        getStartingSpace: function (colorName) {
            var filtered = _und.filter(this.spaces, function (item) {
                return item.isStartingSpace() === colorName;
            });

            return _und.first(filtered);
        },

        drawBoard: function () {
            //TODO: Assign an issue on github to draw the board!
            console.log('someday a board will be drawn here');
        },

        manageTurn: function (playerIndex, pawnIndex, nextPosition, diceRoll) {
            if (this.moveLog.length === 0) {
                this.moveLog.push({
                    'playerIndex': playerIndex,
                    'usedMoves': []
                });
            }

            var lastRoll = this.lastDiceThrow(),
                lastEntry = this.moveLog[moveCounter];

            if (lastEntry === undefined) {
                //TODO: This should be a class instance as well, to avoid repetition
                lastEntry = {
                    'playerIndex': playerIndex,
                    'usedMoves': []
                };
            }

            //Register last event
            lastEntry.usedMoves.push(diceRoll);

            var allDiceMovesUsed = _und.difference(lastRoll, lastEntry.usedMoves).length === 0;

            //If player has used all possible moves, change the turn
            if (allDiceMovesUsed && remainingDiceThrows === 0) {
                currentTurn = (currentTurn === realNumberOfPlayers - 1) ? 0 : currentTurn + 1;
                moveCounter += 1;
                remainingDiceThrows = 1;
            }

        },

        enterPawn: function (playerIndex) {
            var player = this.players[playerIndex];
            if (player === undefined)
                throw new Error('Player is not defined');

            var filtered = _und.filter(player.pawns, function (item) {
                return item.position === -1;
            });

            if (filtered.length === 0)
                throw new Error('All player\'s pawns are outside of the Home');

            if (!_und.contains(this.lastDiceThrow(), 5)) {
                throw new Error('Player must roll a five(5) to enter pawn');
            }

            var pawn = _und.first(filtered);
            var startingSpace = this.getStartingSpace(player.color);

            startingSpace.pawns.push(pawn);
            pawn.position = startingSpace.currentIndex();

            //TODO: need to find a way to pass the index of the pawn here
            this.manageTurn(playerIndex, undefined, startingSpace.currentIndex(), 5);
        },

    movePawn: function(playerIndex, pawnIndex, movesToMake) {
            var player = this.players[playerIndex];
            if (player === undefined)
                throw new Error('Player is not defined');

            var pawn = player.pawns[pawnIndex];
            if (pawn === undefined)
                throw new Error('Pawn is not defined');

            //TODO:rules of movement will eventually go here?

            var currentPosition = pawn.position || -1;
            if (currentPosition === -1)
                throw new Error('Pawn is still inside player\'s home');

            //If program control reaches this point it means that the pawn can move
            var totalMovesToMake = (movesToMake === 6) ? 12 : movesToMake;

            var nextPosition = currentPosition + totalMovesToMake;
            if (nextPosition > 67)
                nextPosition = nextPosition - 68;

            var currentSpace = this.spaces[currentPosition];
            var nextSpace = this.spaces[nextPosition];

            if (_und.contains(currentSpace.pawns, pawn)) {
                currentSpace.pawns = _und.without(currentSpace.pawns, pawn);
                nextSpace.pawns.push(pawn);
                pawn.position = nextPosition;
                //TODO: maybe the pawn could have an event emitter, and each time we 
                //change the position then it would simply move to the right position

                this.manageTurn(playerIndex, pawnIndex, nextPosition, movesToMake);
                
            } else {
                throw new Error('Unexpected error. The pawn wasn\'t on the allocated space');
            }

        }
    };


    for (var i = 0; i < realNumberOfPlayers; i += 1) {
        game.players.push(new Player(CONSTANTS.colors[i]));
    }

    currentTurn = utils.randomize(0, realNumberOfPlayers - 1);

    return game;
};