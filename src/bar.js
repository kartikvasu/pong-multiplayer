var bar = function (selection) {
	function renderBar () {
		var width = d3.select(selection).attr("width"),
		height = d3.select(selection).attr("height");

		var barWidth = 0.2 * width,
	       	barHeight = 0.02 * height;

		var playBar = d3.select(selection)
			.append("rect")
			.attr("fill", "#900C3F")
		      	.attr("x", (width - barWidth) / 2)
			.attr("y", height - barHeight - 5)
			.attr("width", barWidth)
			.attr("height", barHeight);
	}
	
	return {
		render_function: renderBar
	};
}

module.exports = bar;
