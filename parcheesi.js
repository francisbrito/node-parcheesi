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
        
        game = {
            spaces: new Array(64),
            players: [],
            throwDices: function() {
                return [randomize(1, 6), randomize(1, 6)];
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
