function detectEvents(BarView) {
	var last_event,
	last_event_identifier;

	d3.select('body')
	.on('keydown', function() {
		
		if(last_event === 'keydown' && last_event_identifier === d3.event.keyIdentifier) {
			return;
		}
		
		switch(d3.event.keyIdentifier) {
			case 'Right': 
				console.log('The right key was clicked');
				BarView.moveBarView(true);
				
				//TODO we would emit a socket event here.
				break;
			case 'Left':
				console.log('The left key was clicked');
				BarView.moveBarView(false);
				
				//TODO we would emit another socket event here. 
				break;
			default:
				console.log("Key not identified");
		}

		last_event = 'keydown';
		last_event_identifier = d3.event.keyIdentifier;
	});

	d3.select('body')
	.on('keyup', function() {

		console.log('Keyup happened');

		last_event = 'keyup';
		last_event_identifier = d3.event.keyIdentifier;

	});

}

module.exports = detectEvents;
