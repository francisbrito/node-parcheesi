/*jslint browser: false, nomen: true, white: true*/
/*global require, console, exports*/

var _und = require('underscore');

var CONSTANTS = (function() {
    'use strict';

    var ParcheesiConstants = {
        colors: [{
            name: 'red',
            startPoint: (17 * 0) + 5
        }, {
            name: 'blue',
            startPoint: (17 * 1) + 5
        }, {
            name: 'yellow',
            startPoint: (17 * 2) + 5
        }, {
            name: 'green',
            startPoint: (17 * 3) + 5
        }]
    };

    return ParcheesiConstants;
}());
exports.CONSTANTS = CONSTANTS;

var Player = function(color) {
    'use strict';
    var player = {
        'color': color,
        'pawns': new Array(4)
    };

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
        realNumberOfPlayers = numberOfPlayers || 2,
        colors = CONSTANTS.colors,

        randomize = function(min, max) {
            // http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        generateSpaces = function() {
            var i = 0,
                spaces = new Array(68);

            for (i = spaces.length - 1; i >= 0; i -= 1) {
                //TODO:Need to take these variable declarations from outside this loop
                //(javascript closures f**k up the assignments)
                var quarterSection = Math.floor(i / 17);

                var isSpecial = (i === quarterSection * 17 + 0) ||
                                (i === quarterSection * 17 + 5) ||
                                (i === quarterSection * 17 + 12);

                var startingSpace = (i === quarterSection * 17 + 5)
                                    ? CONSTANTS.colors[quarterSection].name 
                                    : false;

                spaces[i] = new Space(i, isSpecial, startingSpace);
            }
            return spaces;
        },

        generateStairs = function(){
            var stairs = new Array(4);

            for (var i = 0; i < stairs.length; i += 1)
            {
                stairs[i] = {
                    color: CONSTANTS.colors[i].name,
                    spaces: []
                };
            }

            return stairs;
        },

        game = {
            spaces: generateSpaces(),
            stairs: generateStairs(),
            players: [],

            throwDices: function() {
                return [randomize(1, 6), randomize(1, 6)];
            },

            getStartingSpace: function(colorName) {
                return _und.filter(this.spaces, function(item) {
                    return item.isStartingSpace() === colorName;
                });
            },

            drawBoard: function() {
                console.log('someday a board will be drawn here');
            }
        };

    if (realNumberOfPlayers > 4) {
        throw new Error('Wrong number of players');
    }

    for (i = 0; i < realNumberOfPlayers; i += 1) {
        game.players.push(new Player(colors[i]));
    }

    return game;
};
exports.ParcheesiGame = ParcheesiGame;