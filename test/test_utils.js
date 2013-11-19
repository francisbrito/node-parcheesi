exports.calculateMedianDeviation = function (occurrenceArray, expectedDistribution) {
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