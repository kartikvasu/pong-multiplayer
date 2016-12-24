var BarView = function (Bar, container, id) {
	
	/* This is the bar associated with this particular
	barView. */
	this.Bar = Bar;

	/* This is a d3 style selection of the container into 
	which the bar is to be rendered. */
	this.container = container;

	/* The id of the svg rectangle element associated with 
	this bar. */
	this.id = id;

	/* This function renders the barView according to the 
	specification provided. */ 
	this.renderBarView = function () {

		var width = this.container.attr("width"),
		height = this.container.attr("height");

		var barWidth = 0.2 * width,
		barHeight = 0.02 * height;
			
		var bar = this.container
			.append("rect")
			.attr("id", this.id)
			.attr("x", this.Bar.position.x * width)
			.attr("y", this.Bar.position.y * height)
			.attr("width", this.Bar.barWidth * width)
			.attr("height", this.Bar.barHeight * height)
			.attr("fill", '#900C3F');

	}

	/* This function moves the bar by the velocity. It is 
	called in setInterval(s) from the bar controller. */
	this.moveBarView = function (positive) {

		var curX = this.container
			.select('#' + this.id)
			.attr("x"),	
		width = this.container
			.attr("width"),
		velocity = this.Bar.velocity;

		this.container
		.select('#' + this.id)
		.attr("x", function() {
			if(positive)
				return Number(curX) + velocity.x * width;
			else 
				return Number(curX) - velocity.x * width;
		});
	}

	/* This function moves the bar to the passed in position. */
	this.moveBarViewPosition = function (position) {
		var width = this.container
			.attr("width"),
			height = this.container
			.attr("height");

		this.container
		.select('#' + this.id)
		.attr("x", function() {
			return position.x * width;
		})
		.attr("y", function() {
			return position.y * height;
		});
	} 

	return this;

}

module.exports = BarView;
