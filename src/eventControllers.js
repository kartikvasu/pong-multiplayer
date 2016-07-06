function detectEvents(bar) {
	d3.select('body')
	.on('keydown', function() {

		switch(d3.event.keyIdentifier) {
			case 'Right': 
				console.log('The right key was clicked');
				break;
			case 'Left':
				console.log('The left key was clicked');
				break;
			default:
				console.log("Key not identified");
		}
	});

	d3.select('body')
	.on('keyup', function() {

		console.log('Keyup happened');

	});

}

module.exports = detectEvents;
