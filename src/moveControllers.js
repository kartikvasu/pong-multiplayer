function detectEvents(bar) {
	d3.select('body')
	.on('keydown', function() {

		switch(d3.event.keyIdentifier) {
			case 'Right': 
				bar.xVelocity = 10;
				break;
			case 'Left':
				bar.xVelocity = -10;
				break;
			default:
				console.log("Key not identified!");
				break;
		}

		bar.moveBar();

	});

	d3.select('body')
	.on('keyup', function() {

		bar.xVelocity = 0;
		
		bar.moveBar();
	
	});

}

module.exports = detectEvents;
