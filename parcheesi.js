/*jslint browser: false, nomen: true, white: true*/
/*global require, console, exports*/

var CONSTANTS = (function() {
    'use strict';   

    var ParcheesiConstants = {
        colors: [ {name: 'red', startPoint: (17 * 0) + 5},
                  {name: 'blue', startPoint: (17 * 1) + 5},
                  {name:'yellow', startPoint: (17 * 2) + 5},
                  {name:'green', startPoint: (17 * 3) + 5}
                ]
    };

    return ParcheesiConstants ;
}());
exports.CONSTANTS = CONSTANTS;

var Player = function (color) {
    'use strict';
    var player = {
        'color': color,
        'pawns': new Array(4)
    };

    return player;
};
exports.Player = Player;

var Space = function(createAsSafe, startPointColor){
    'use strict';

    // enforces new
    if (!(this instanceof Space)) {
        return new Space(createAsSafe, startPointColor);
    }

    var safeSpot = createAsSafe || false,
        color    = startPointColor,
        space    = {        
                        pawns  : [],
                        isSafe : function(){
                            return safeSpot;
                        },
                        isStartingSpace: function(){
                            return color;
                        }
                    };

    return space;
};

var ParcheesiGame = function (numberOfPlayers) {
    'use strict';

    //Checks that object is always constructed using 'new'
    if (!(this instanceof ParcheesiGame)) {
        return new ParcheesiGame(numberOfPlayers);
    }

    var i,
        realNumberOfPlayers = numberOfPlayers || 2,
        colors              = CONSTANTS.colors,        
        
        randomize = function (min, max) {
            // http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        generateSpaces = function(){
            var i      = 0,
                spaces = new Array(68);

            for (i = spaces.length - 1; i >= 0; i--) {
                var quarter_section = Math.floor(i/17);
                var isSpecial = (i == quarter_section * 17 + 0) ||
                                (i == quarter_section * 17 + 5) ||
                                (i == quarter_section * 17 + 12);
                
                var isStartingSpace = (i == quarter_section * 17 + 5);

                spaces[i] = new Space(isSpecial, isStartingSpace);
            };
            return spaces;
        },
        
        game = {
            spaces: generateSpaces(),
            players: [],
            
            throwDices: function() {
                return [randomize(1, 6), randomize(1, 6)];
            },

            getStartingPoint: function(colorName) {
                //TODO: How to do this query? _underscore collection query?
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

