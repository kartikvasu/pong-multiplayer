function detectEvents() {
	d3.select('body')
	.on('keydown', function() {
		console.log("You have pressed the " + d3.event.keyIdentifier + " key.");
	});

	d3.select('body')
	.on('keyup', function() {
		console.log("You have stopped pressing the " + d3.event.keyIdentifier + " key.");
	});

}

module.exports = detectEvents;
