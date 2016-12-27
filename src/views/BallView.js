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
	 * This is a d3 style selection into which the ball 
	 * is rendered. Very important point to remember. 
	 */
	this.container = container;

	/** 
	 * This is the id that is associated with the BallView.
	 */
	this.id = id;

	this.renderBallView = function () {

		//for scaling
		var width = this.container.attr("width"),
		height = this.container.attr("height");

		//TODO make sure that position, sizes, 
		//and velocity is scaled before deploy.
		//VERY IMPORTANT!!
		var ball = this.container
			.append("circle")
			.attr("id", this.id)
			.attr("cx", this.Ball.position.x * width)
			.attr("cy", this.Ball.position.y * height)
			.attr("r", this.Ball.radius * width)
			.attr("fill",'#900C3F');
			
	}

	//this function moves the ballView by the velocity.
	//It is called in setInterval(s) from the main.js script.
	this.moveBall = function () {

		//for scaling
		var width = this.container.attr("width"),
		height = this.container.attr("height");

		var selection = this.container.select('#' + this.id);

		var curX = Number(selection.attr("cx")),
		curY = Number(selection.attr("cy"));
		
		selection.attr("cx", curX + this.Ball.velocity.x * width)
			.attr("cy", curY + this.Ball.velocity.y * height);
			
	}

	/* this function moves the ball to the passed in position. */
	this.moveBallPosition = function(position) {
		var width = this.container
			.attr("width"),
			height = this.container
			.attr("height");

			this.container
			.select('#' + this.id)
			.attr("cx", function() {
				return position.x * width;
			})
			.attr("cy", function() {
				return position.y * width;
			});
	}
	
	return this;
}

module.exports = BallView;
