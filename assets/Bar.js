var Point = require('./Point');

function Bar (position, velocity, barWidth, barHeight) {

	//input checks
	if (arguments.length !== 4) {
	       console.error("Input to Bar constructor must have two parameters");
	}

	if(typeof barWidth !== "number" || typeof barHeight !== "number") {
		console.error("barWidth and barHeight inputs must be numbers.");
	}

	if (typeof position.x !== "number" || typeof position.y !== "number") {
		console.error("The position object is corrupted.");
	}

	if(typeof velocity.x !== "number" || typeof velocity.y !== "number") {
		console.error("The velocity object is corrupted.");
	}

	this.position = position;
	this.velocity = velocity;
	this.barWidth = barWidth;
	this.barHeight = barHeight;

	/* this is to move the bar by the velocity.
	It is called within a setInterval function
	somewhere from the outside. */
	this.moveBar = function(direction) {

		switch (direction) {
			case 'left':
				this.position.x -= this.velocity.x;
				break;
			case 'right':
				this.position.x += this.velocity.x;
				break;
			default:
				console.error('You can only move left or right, fam');
				break;
		}
	
	}

	return this;
}

module.exports = Bar;
