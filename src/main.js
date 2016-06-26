function mainRender() {

	var width = window.innerWidth * 0.9,
	height = window.innerHeight * 0.8;
	
	var chart = d3.select('#main')
		.attr('width', width)
		.attr('height', height);

	chart.style({
		'border': '1px solid black'
	});

}

module.exports = mainRender; 