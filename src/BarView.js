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
	 * This is the container in which the bar is being
	 * rendered (or in which the game is being played).
	 */
	this.container = container;

	/**
	 * The id of the svg rect element associated with
	 * this bar.
	 */
	this.id = id;

	this.renderBarView = function () {

		var width = d3.select(container).attr("width"),
		height = d3.select(container).attr("height");

		var barWidth = 0.2 * width,
		barHeight = 0.02 * height;

	}
}
