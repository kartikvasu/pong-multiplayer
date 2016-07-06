var BarView = function (Bar, container, id) {

	/**
	 * TODO 
	 * Checks for input values. Make sure every
	 * input variable is clean before starting
	 * assignments.
	 */

	/**
	 * This is the bar associated with this particular
	 * barView.
	 */
	this.Bar = Bar;

	/**
	 * This is a d3 style selection of the container
	 * into which the bar is to be rendered. 
	 */
	this.container = container;

	/**
	 * The id of the svg rect element associated with
	 * this bar.
	 */
	this.id = id;

	//this function renders the barView 
	//according to the specification provided. 
	this.renderBarView = function () {

		var width = this.container.attr("width"),
		height = this.container.attr("height");

		var barWidth = 0.2 * width,
		barHeight = 0.02 * height;
	
		//TODO make sure that the position
		//and sizes and everything are scaled
		//before deploy. VERY IMPORTANT!	
		var bar = this.container
			.append("rect")
			.attr("id", this.id)
			.attr("x", this.Bar.position.x)
			.attr("y", this.Bar.position.y)
			.attr("width", this.Bar.barWidth)
			.attr("height", this.Bar.barHeight)
			.attr("fill", '#900C3F');

	}

	//this function moves the bar by the velocity.
	//However, right now it is not persistent. Therefore
	//you would need to pass it to a setTimeOut function
	//outside somewhere.
	this.moveBarView = function () {

		var curX = this.container
			.select(this.id)
			.attr("x");

		this.container
		.select(this.id)
		.attr("x", curX + this.Bar.velocity.x);
	}

	return this;	
}

module.exports = BarView;
