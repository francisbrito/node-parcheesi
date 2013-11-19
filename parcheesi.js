/*jslint browser: false, nomen: true, white: true*/
/*global require, console, exports*/

var _und = require('underscore');

var CONSTANTS = (function() {
    'use strict';

    var ParcheesiConstants = {
        colors: [
            'red',
            'blue',
            'yellow',
            'green'
            ]
    };

    return ParcheesiConstants;
}());
exports.CONSTANTS = CONSTANTS;

var Pawn = function(color) {
    'use strict';
    return {
        'color': color,
        'position': -1
    };
};
exports.Pawn = Pawn;

var Player = function(color) {
    'use strict';

    var i,
        player = {
            'color': color,
            'pawns': new Array(4)
        };

    for (i = 0; i < 4; i += 1) {
        player.pawns[i] = new Pawn(color);
    }
    return player;
};
exports.Player = Player;

var Space = function(i, createAsSafe, startPointColor) {
    'use strict';

    // enforces new
    if (!(this instanceof Space)) {
        return new Space(createAsSafe, startPointColor);
    }

    var space = {
        pawns: [],

        isSafe: function() {
            return createAsSafe || false;
        },

        isStartingSpace: function() {
            return startPointColor;
        },

        currentIndex: function() {
            return i;
        }
    };

    return space;
};

var ParcheesiGame = function(numberOfPlayers) {
    'use strict';

    //Checks that object is always constructed using 'new'
    if (!(this instanceof ParcheesiGame)) {
        return new ParcheesiGame(numberOfPlayers);
    }

    var i,
        lastDiceRoll,
        currentTurn = -1,
        realNumberOfPlayers = numberOfPlayers || 2,

        randomize = function(min, max) {
            // http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        generateSpaces = function() {
            var i = 0,
                spaces = new Array(68);

            for (i = 0; i < spaces.length; i += 1) {
                //TODO:Need to take these variable declarations from outside this loop
                //(javascript closures f**k up the assignments)
                var quarterSection = Math.floor(i / 17);

                var isSpecial =
                    (i === quarterSection * 17 + 0) ||
                    (i === quarterSection * 17 + 5) ||
                    (i === quarterSection * 17 + 12);

                var startingSpace = (i === quarterSection * 17 + 5) ? CONSTANTS.colors[quarterSection] : false;

                spaces[i] = new Space(i, isSpecial, startingSpace);
            }
            return spaces;
        },

        generateStairs = function() {
            var i, stairs = new Array(4);

            for (i = 0; i < stairs.length; i += 1) {
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

            currentTurn: function() {
                return currentTurn;
            },

            lastDiceThrow: function() {
                return lastDiceRoll;
            },

            throwDices: function() {
                lastDiceRoll = [randomize(1, 6), randomize(1, 6)];
                return this.lastDiceThrow();
            },

            getStartingSpace: function(colorName) {
                var filtered = _und.filter(this.spaces, function(item) {
                    return item.isStartingSpace() === colorName;
                });

                return _und.first(filtered);
            },

            drawBoard: function() {
                console.log('someday a board will be drawn here');
            },

            enterPawn: function(playerIndex) {
                var player = this.players[playerIndex];
                if (player === undefined)
                    throw new Error('Player is not defined');

                var reduced = _und.filter(player.pawns, function(item) {
                    return item.position === -1;
                });
                
                if (reduced.length === 0)
                    throw new Error('All player\'s pawns are outside of the Home');

                if (!_und.contains(this.lastDiceThrow(), 5)){
                    throw new Error('Player must roll a five(5) to enter pawn');
                }

                var pawn = _und.first(reduced);

                var startingSpace = this.getStartingSpace(player.color);
                startingSpace.pawns.push(pawn);
                pawn.position = startingSpace.position;
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
                movesToMake = (movesToMake === 6) ? 12 : movesToMake;

                var nextPosition = currentPosition + movesToMake;
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
                } else {
                    throw new Error('Unexpected error. The pawn wasn\'t on the allocated space');
                }

            }
        };

        //TODO: Move to methods? this looks like it's 'hanging here'
    if (realNumberOfPlayers > 4) {
        throw new Error('Wrong number of players');
    }

    for (i = 0; i < realNumberOfPlayers; i += 1) {
        game.players.push(new Player(CONSTANTS.colors[i]));
    }

    currentTurn = randomize(0, 3);

    return game;
};
exports.ParcheesiGame = ParcheesiGame;

