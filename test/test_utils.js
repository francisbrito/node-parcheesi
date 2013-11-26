/*jshint strict: true, curly: false, node: true */

'use strict';

exports.calculateMedianDeviation = function(occurrenceArray, expectedDistribution) {
	//This is a complicated test and I still don't get it that well :P
	//http://programmers.stackexchange.com/questions/147134/how-should-i-test-randomness
	//http://math.stackexchange.com/questions/2435/is-there-a-simple-test-for-uniform-distributions  

	console.log('\nDistributions: ' + occurrenceArray);

	var deviations = [];
	var deviationSum = 0.0;
	for (var j = 0; j < occurrenceArray.length; j += 1) {
		var valueDiff = Math.abs(occurrenceArray[j] - expectedDistribution);
		var dev = (valueDiff / expectedDistribution).toFixed(2);

		deviationSum += Number(dev);
		deviations.push(dev);
	}

	var medianDeviation = (deviationSum / 6);

	console.log('Deviations: ' + deviations);
	console.log('Median Deviation: ' + medianDeviation.toFixed(2));

	return medianDeviation;
};

var emulatePlay = function(game, playerIndex){
	var diceRoll = game.throwDices(playerIndex);
	game.movePawn(playerIndex, 0, diceRoll[0]);
	game.movePawn(playerIndex, 0, diceRoll[1]);
};
exports.emulatePlay = emulatePlay;

var positionPawn = function(game, playerIndex, pawnIndex, position){
	var pawn = game.players[playerIndex].pawns[pawnIndex];
    pawn.position = position;
    game.spaces[position].pawns.push(pawn);
    return pawn;
};
exports.positionPawn = positionPawn;

var positionPawnOnStart = function(game, playerIndex) {
	var positionPoint = (playerIndex * 17) + 5;
	return positionPawn(game, playerIndex, 0, positionPoint);
};
exports.positionPawnOnStart = positionPawnOnStart;

