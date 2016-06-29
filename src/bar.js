var bar = function () {

	//Initialize the position to false first, update
	// while rendering.
	this.x = false;
	this.y = false;
	
	//initialize the velocity of the bar.
	this.xVelocity = 0;

	//The selection in which the bar exists 
	//it will be updated to the actual selection 
	//during render.
	this.selection = false;

	//boolean indicating if this is a player bar.
	this.player = NaN;

	//You would pass in a selection to render the bar.
	this.renderBar = function(selection, player) {

		var width = d3.select(selection).attr("width"),
		height = d3.select(selection).attr("height");

		var barWidth = 0.2 * width,
	       	barHeight = 0.02 * height;

		//update all the variables of the bar object.
		this.selection = selection;
		this.x = (width - barWidth) / 2;
		this.y = height - barHeight - 5;	
		this.player = player;

		var playBar = d3.select(selection)
			.append("rect")
			.attr("id", function() {
				if(player === true) {
					return 'player';
				} else {
					return 'opponent';
				}
			})
			.attr("fill", "#900C3F")
		      	.attr("x", this.x)
			.attr("y", this.y)
			.attr("width", barWidth)
			.attr("height", barHeight);
	}

	//keep moving the bar depending on the velocity.
	this.moveBar = function() {
		this.x += this.xVelocity;

		if(this.player === true) {
			d3.select(this.selection)
			.select('#player')
			.attr("x", this.x);
		}
	}	

	return this;
}

module.exports = bar;
