/*jslint browser: false, nomen: true, white: true*/
/*global require, console, exports*/

var Player = function (color) {
    'use strict';
    var player = {
        'color': color,
        'pawns': new Array(4)
    };

    return player;
};
exports.Player = Player;

var Space = function(createAsSafe){
    'use strict';

    // enforces new
    if (!(this instanceof Space)) {
        return new Space(createAsSafe);
    }

    var safeSpot = createAsSafe || false,
        space    = {        
            pawns  : [],
            isSafe : function(){
                return safeSpot;
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
        colors              = ['red', 'blue', 'yellow', 'green'],        
        
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
                spaces[i] = new Space(isSpecial);
            };
            return spaces;
        },
        
        game = {
            spaces: generateSpaces(),
            players: [],
            
            throwDices: function() {
                return [randomize(1, 6), randomize(1, 6)];
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
