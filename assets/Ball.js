function Ball (position, velocity, radius) {

	//input checks
	if (arguments.length !== 3) {
		console.error("Input to Ball constructor must have two parameters.");
	}

	if(typeof radius !== "number") {
		console.error("The radius input was not a number.");
	}

	if (typeof position.x !== "number" || typeof position.y !== "number") {
		console.error("The position object is corrupted.");
	}

	if (typeof velocity.x !== "number" || typeof velocity.y !== "number") {
		console.error("The velocity object is corrupted.");
	}

	this.position = position;
	this.velocity = velocity;
	this.radius = radius;

	return this;
}

module.exports = Ball;
