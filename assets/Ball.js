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

	this.moveBall = function(barA, barB) {
		
		var that = this;
		checkCollisions(that, barA, barB);
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

	}

	/* Checks for collisions and modifies our ball's movement 
	according. */
	var checkCollisions = function(that, barA, barB) {

		checkWallCollisions(that);
		checkBarCollisions(that, barA, 'top');
		checkBarCollisions(that, barB, 'bottom');

	}

	/* Handles what should happen when ball collides with the
	bar. */
	var checkBarCollisions = function(that, bar, position) {

		var ballPositionX = that.position.x,
			ballPositionY = that.position.y,
			ballRadius = that.radius,
			barLeftCornerX = bar.position.x,
			barLeftCornerY = bar.position.y,
			barHeight = bar.barHeight,
			barWidth = bar.barWidth;

		var barRightCornerX = bar.position.x + bar.barWidth;

		if(ballPositionX >= barLeftCornerX && ballPositionX <= barRightCornerX) {
		
			switch(position) {
				case 'top': 
					if(Math.abs(barLeftCornerY - ballRadius - ballPositionY) < 0.0001)
						that.velocity.y = -that.velocity.y;
					break;
					
				
				case 'bottom':
					if(Math.abs(barLeftCornerY + barHeight + ballRadius - ballPositionY) < 0.0001)
						that.velocity.y = - that.velocity.y;
					break;

				default: 
					console.error('Something went horribly wrong!!')
			}
		
		}	
	
	}

	/* Handles what should happen when the ball collides with the
	wall. */
	var checkWallCollisions = function(that) {

		if(Math.abs(1 - that.radius - that.position.x) < 0.0001 || Math.abs(that.radius - that.position.x) < 0.0001)
			that.velocity.x = -that.velocity.x;
		
		if(Math.abs(1 - that.radius - that.position.y) < 0.0001 || Math.abs(that.radius - that.position.y) < 0.0001)
			that.velocity.y = -that.velocity.y;
	
	}

	return this;
}

module.exports = Ball;
