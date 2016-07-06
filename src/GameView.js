function GameView(Game, container, width, height) {

	/*
	 * TODO add checks here to make sure that 
	 * Game and container objects are input 
	 * cleanly during creation. 
	 */
	
	/*
	 * This is the big Game object that encodes
	 * all the data for a particular game. See 
	 * the game object file for more information.
	 */
	this.Game = Game;

	/*
	 * This is the d3 style selection of the 
	 * container which we are rendering the 
	 * arena onto.
	 */
	this.container = container;

	this.renderGameView = function () {
		var arena = this.container
			.attr('width', width)
			.attr('height', height)
			.style({
				'border': '1px solid black'
			});
	}

}

module.exports = GameView;
