/*jslint browser: false, nomen: true, sloppy: true*/
/*global require, console, exports*/

var Player = function (color) {
    var player = {
        'color': color
    };
    
    return player;
};
exports.Player = Player;

exports.ParcheesiGame = function (numberOfPlayers) {
	var i, colors = ['red', 'blue', 'yellow', 'green'],
        game = {
            spaces: new Array(64),
            players: []
        };
    
    for (i = 0; i < (numberOfPlayers || 2); i += 1) {
        game.players.push(new Player(colors[i]));
    }

	return game;
};

