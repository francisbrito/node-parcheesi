/*jslint browser: false, nomen: true, sloppy: true*/
/*global require, console, exports*/

var Player = function (color) {
    var player = {
        'color': color
    };
    
    return player;
};
exports.Player = Player;

var ParcheesiGame = function (numberOfPlayers) {
    var i, 
        realNumberOfPlayers = numberOfPlayers || 2,
        colors = ['red', 'blue', 'yellow', 'green'],
        game = {
            spaces: new Array(64),
            players: []
        };
    
    if (realNumberOfPlayers > 4){
        throw new Error('Wrong number of players');
    }

    for (i = 0; i < (realNumberOfPlayers); i += 1) {
        game.players.push(new Player(colors[i]));
    }

	return game;
};
exports.ParcheesiGame = ParcheesiGame;
