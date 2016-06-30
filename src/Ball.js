var ball = function () {

	//Initialize the position to false first, update
	// while rendering.
	this.x = false;
	this.y = false;
	this.radius = 10;

	//initialize the velocity of the bar.
	this.xVelocity = 0.5;
	this.yVelocity = 0.5;

	//the selection in which the bar exists
	//it will be updated to the actual selection
	//during render.
	this.selection = false;

	this.renderBall = function(selection) {

		var width = d3.select(selection).attr("width"),
		height = d3.select(selection).attr("height");

		var barHeight = d3.select(selection).select('#player').attr("height"),
		barWidth = d3.select(selection).select('#player').attr("width"),
		x = d3.select(selection).select('#player').attr('x');

		this.selection = selection;
		this.x = parseInt(x) + barWidth / 2;
		this.y = height - barHeight - this.radius;

		var ball = d3.select(selection)
			.append("circle")
			.attr("id", "ball")
			.attr("cx", this.x)
			.attr("cy", this.y)
			.attr("r", this.radius).
			attr("fill", "#4B7BA6");

	}

	this.moveBall = function () {
	
		this.x += this.xVelocity;
		this.y -= this.yVelocity;

		d3.select(this.selection)
			.select('#ball')
			.attr("cx", this.x)
			.attr("cy", this.y)
			.ease("linear");	

	}

	return this;
}

module.exports = ball;
