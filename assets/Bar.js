var Point = require('./Point');

function Bar (position, velocity) {

	//input checks
	if (arguments.length !== 2) {
	       console.log("Input to Bar constructor must have two parameters");

	if (position.x !== "number" || position.y !== "number") {
		console.log("The position object is corrupted.");
	}

	if(velocity.x !== "number" || velocity.y !== "number") {
		console.log("The velocity object is corrupted.");
	}

	this.position = position;
	this.velocity = velocity;

}

module.exports = Bar;
