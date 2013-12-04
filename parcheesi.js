/*jshint strict: true, curly: false, node: true */
/*global require, console, module */

'use strict';

var CONSTANTS = require('./constants'),
    _und = require('underscore'),
    utils = require('./utils'),
    dice = require('./dice'),
    Player = require('./player'),
    Space = require('./space');

module.exports = function ParcheesiGame(options) {

    //Checks that object is always constructed using 'new'
    if (!(this instanceof ParcheesiGame)) {
        return new ParcheesiGame(options);
    }

    options = options || {};

    var lastDiceRoll,
        dices = _und.extend([new dice(), new dice()], options.dices),
        remainingDiceThrows = 1,
        moveCounter = 0,
        realNumberOfPlayers = options.numberOfPlayers || 2,
        currentTurn = (options.startingTurn !== undefined) ? options.startingTurn : utils.randomize(0, realNumberOfPlayers - 1);

    if (realNumberOfPlayers > 4) {
        throw new Error('Wrong number of players');
    }

    var generatePlayers = function() {
        var players = [];
        for (var i = 0; i < realNumberOfPlayers; i += 1) {
            players.push(new Player(CONSTANTS.colors[i], i));
        }

        return players;
    },

        generateSpaces = function() {
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

        generateStairs = function() {
            var stairs = new Array(4);

            for (var i = 0; i < stairs.length; i += 1) {
                stairs[i] = {
                    color: CONSTANTS.colors[i],
                    spaces: new Array(8)
                };
            }
            return stairs;
        },

        //Checks that a player is able to play
        validateIsAbleToPlay = function(player, currentTurn) {
            if (player === undefined)
                throw new Error('Player is not defined');

            if (player.index !== currentTurn)
                throw new Error('It\'s not the current player\'s turn');
        },

        game = {
            spaces: generateSpaces(),
            stairs: generateStairs(),
            players: generatePlayers(),
            moveLog: [],

            currentTurn: function() {
                return currentTurn;
            },

            lastDiceThrow: function(simplifyResults) {
                var simplifiedRoll = _und.map(lastDiceRoll, function(item){
                    return (item.pawn !== undefined) ? item.value : item;
                });

                return simplifyResults ? simplifiedRoll : lastDiceRoll;
            },

            throwDices: function(playerIndex, numberOfDice) {
                //If the dice is being rolled by a player and it has no remaining throws, throw an error
                if (playerIndex !== undefined && remainingDiceThrows < 1)
                    throw new Error('Player cannot throw the dice more than once per turn');

                var numberToThrow = numberOfDice || 2;
                lastDiceRoll = [];

                for (var i = 0; i < numberToThrow; i++) {
                    lastDiceRoll.push(dices[i].roll());
                }

                //Only if the dice roll is associated with a player the remaininDiceThrow counter is decreased
                if (playerIndex !== undefined)
                    remainingDiceThrows--;

                return this.lastDiceThrow();
            },

            getStartingSpace: function(colorName) {
                var filtered = _und.filter(this.spaces, function(item) {
                    return item.isStartingSpace() === colorName;
                });

                return _und.first(filtered);
            },

            drawBoard: function() {
                //TODO: Assign an issue on github to draw the board!
                console.log('someday a board will be drawn here');
            },

            manageTurn: function(playerIndex, pawnIndex, nextPosition, diceRoll) {
                if (this.moveLog.length === playerIndex) {
                    this.moveLog.push({
                        'playerIndex': playerIndex,
                        'usedMoves': []
                    });
                }

                var lastEntry = this.moveLog[moveCounter];

                if (lastEntry === undefined) {
                    //TODO: This should be a class instance as well, to avoid repetition
                    lastEntry = {
                        'playerIndex': playerIndex,
                        'usedMoves': []
                    };
                }

                //Register last event
                lastEntry.usedMoves.push({
                    pawn: pawnIndex,
                    value: diceRoll,
                });

                var allDiceMovesUsed = this.lastDiceThrow().length === lastEntry.usedMoves.length;

                //If player has used all possible moves, change the turn
                if (allDiceMovesUsed && remainingDiceThrows === 0) {
                    currentTurn = (currentTurn === realNumberOfPlayers - 1) ? 0 : currentTurn + 1;
                    moveCounter += 1;
                    remainingDiceThrows = 1;
                }
            },

            enterPawn: function(playerIndex) {
                var player = this.players[playerIndex];
                validateIsAbleToPlay(player, currentTurn);

                var filtered = _und.filter(player.pawns, function(item) {
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
                this.manageTurn(playerIndex, pawn.index, startingSpace.currentIndex(), 5);
            },

            movePawn: function(playerIndex, pawnIndex, movesToMake) {
                var player = this.players[playerIndex];
                validateIsAbleToPlay(player, currentTurn);

                //TODO: Move this over to validateIsAbleToPlay as well
                //Pawn must be defined
                var pawn = player.pawns[pawnIndex];
                if (pawn === undefined)
                    throw new Error('Pawn is not defined');

                //Pawn to be moved should be on the board
                var currentPosition = pawn.position || -1;
                if (currentPosition === -1) {
                    throw new Error('Pawn is still inside player\'s home');
                }

                //Pawns can only move on available diceRoll numbers
                if (!_und.contains(this.lastDiceThrow(true), movesToMake))
                    throw new Error('Cannot make move that isn\'t present on last dice roll');

                //Pawns cannot repeat an already made move from the dice roll
                var usedMoves = this.moveLog[moveCounter] !== undefined ? this.moveLog[moveCounter].usedMoves : [];
                var availableMoves = utils.getAvailableDiceMoves(this.lastDiceThrow(), usedMoves, pawnIndex);
                if (!_und.contains(availableMoves, movesToMake)) {
                    throw new Error('Invalid move');
                }

                //If program control reaches this point it means that the pawn can move
                var totalMovesToMake = (movesToMake === 6) ? 12 : movesToMake;
                var nextPosition = currentPosition + totalMovesToMake;
                if (nextPosition > 67)
                    nextPosition = nextPosition - 68;

                var currentSpace = this.spaces[currentPosition];
                var betweenSpaces = this.spaces.slice(currentPosition + 1, nextPosition + 1);
                var nextSpace = this.spaces[nextPosition];


                if (!_und.contains(currentSpace.pawns, pawn))
                    throw new Error('Unexpected error. The pawn wasn\'t on the allocated space');


                //check wether there is a barrier blocking the way
                var barriersInTheWay = _und.filter(betweenSpaces, function(space) {
                    var filtered = _und.filter(space.pawns, function(item) {
                        return item.color !== pawn.color;
                    });

                    return filtered !== undefined && filtered.length === 2;
                });
                if (barriersInTheWay.length > 0)
                    throw new Error('Cannot complete move, there is a barrier on the way');


                //check for enemies and kill if possible
                //TODO: should this be on a method?
                var pawnsOnNextSpace = _und.filter(nextSpace.pawns, function(item) {
                    return item.color != pawn.color;
                });
                if (pawnsOnNextSpace.length > 0 && !nextSpace.isSafe()) {
                    pawnsOnNextSpace[0].position = -1; //TODO: this is not always -1, look for a First() method on underscore
                    nextSpace.pawns = _und.without(nextSpace.pawns, pawnsOnNextSpace[0]);
                    lastDiceRoll.push({
                        pawn: pawnIndex,
                        value: CONSTANTS.extraMovesOnKill
                    });
                }

                //Movement
                currentSpace.pawns = _und.without(currentSpace.pawns, pawn);
                nextSpace.pawns.push(pawn);
                pawn.position = nextPosition;

                //TODO: maybe the pawn could have an event emitter, and each time we 
                //change the position then it would simply move to the right position
                this.manageTurn(playerIndex, pawnIndex, nextPosition, movesToMake);

            }
        };

    return game;
};