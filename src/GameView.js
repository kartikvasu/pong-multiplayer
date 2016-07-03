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
	 * This is the container in which the game 
	 * is being rendered. Ideally it should be the
	 * standard svg container ID that you're passing
	 * in here. Adaptable depending on situation.
	 */
	this.container = container;

	this.renderGameView = function () {
		renderGameScreen();
	}

	function renderGameScreen() {

		var arena = d3.select(this.container)
			.attr('width', width)
			.attr('height', height)
			.style({
				'border': '1px solid black'
			});
	}

}

module.exports = GameView;
