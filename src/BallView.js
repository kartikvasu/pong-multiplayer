var BallView = function (Ball, container, id) {

	/** 
	 * TODO
	 * Checks for input values. Make sure every
	 * input variable is clean before starting 
	 * assignments.
	 */

	/**
	 * This is the ball object associated with this 
	 * particular BallView.
	 */
	this.Ball = Ball;

	/**
	 * This is the container object in which the BallView
	 * is to be rendered.
	 */
	this.container = container;

	/** 
	 * This is the id that is associated with the BallView.
	 */
	this.id = id;

	this.renderBallView = function () {

		var width = d3.select(this.container).attr("width"),
		height = d3.select(this.container).attr("height");

		//TODO make sure that position, sizes, 
		//and velocity is scaled before deploy.
		//VERY IMPORTANT!!
		
		var ball = d3.select(this.container)
			.append("circle")
			.attr("id", this.id)
			.attr("cx", this.Ball.position.x)
			.attr("cy", this.Ball.position.y)
			.attr("radius", this.Ball.radius)
			.attr("fill",'#900C3F');
	}

	//this function moves the ballView by the velocity.
	//However, right now it is not persistent. Therefore
	//you would need to pass it to a setInterval function
	//from outside somewhere.  The app.js (main) js file
	//in src, would be ideal.
	function moveBall  () {
		
		var selection = d3.select(this.container)
			.select(this.id);

		var curX = selection.attr("cx"),
		curY = selection.attr("cy");

		selection.attr("x", curX + this.Ball.velocity.x)
			.attr("y", curY + this.Ball.velocity.y);
	
	}
	
	return this;
}
