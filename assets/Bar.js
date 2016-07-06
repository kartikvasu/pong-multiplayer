var Point = require('./Point');

function Bar (position, velocity, barWidth, barHeight) {

	//input checks
	if (arguments.length !== 4) {
	       console.log("Input to Bar constructor must have two parameters");
	}

	if(typeof barWidth !== "number" || typeof barHeight !== "number") {
		console.log("barWidth and barHeight inputs must be numbers.");
	}

	if (typeof position.x !== "number" || typeof position.y !== "number") {
		console.log("The position object is corrupted.");
	}

	if(typeof velocity.x !== "number" || typeof velocity.y !== "number") {
		console.log("The velocity object is corrupted.");
	}

	this.position = position;
	this.velocity = velocity;
	this.barWidth = barWidth;
	this.barHeight = barHeight;

	return this;
}

module.exports = Bar;
