/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	var BarView = __webpack_require__(1), //this is the constructor for the bar.
	    BallView = __webpack_require__(2),
	GameView = __webpack_require__(3), //draws the game screen.
	eventControllers = __webpack_require__(4); //manages key events and launches 

	 //TODO figure out a way to load the game from socket into this JS file.

	var socket = io.connect('http://localhost:8000');

	var game;

	socket.on('load', function(a_game) {
		console.log(a_game);
		game = a_game;

	var container = d3.select('#main');

	var game_view = new GameView(game, container, 500, 500),
	    ball_view = new BallView(game.ball, container, '#ball'),
	    player_view = new BarView(game.playerOneBar, container, '#player'),
	    opponent_view = new BarView(game.playerTwoBar, container, '#opponent');


	game_view.renderGameView();
	player_view.renderBarView();
	opponent_view.renderBarView();
	ball_view.renderBallView();
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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

			var width = this.container.attr("width"),
			height = this.container.attr("height");

			//TODO make sure that position, sizes, 
			//and velocity is scaled before deploy.
			//VERY IMPORTANT!!
			var ball = this.container
				.append("circle")
				.attr("id", this.id)
				.attr("cx", this.Ball.position.x)
				.attr("cy", this.Ball.position.y)
				.attr("r", this.Ball.radius)
				.attr("fill",'#900C3F');
		}

		//this function moves the ballView by the velocity.
		//However, right now it is not persistent. Therefore
		//you would need to pass it to a setInterval function
		//from outside somewhere.  The app.js (main) js file
		//in src, would be ideal.
		function moveBall  () {
			
			var selection = this.container.select(this.id);

			var curX = selection.attr("cx"),
			curY = selection.attr("cy");

			selection.attr("x", curX + this.Ball.velocity.x)
				.attr("y", curY + this.Ball.velocity.y);
		
		}
		
		return this;
	}

	module.exports = BallView;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	function detectEvents(bar) {
		d3.select('body')
		.on('keydown', function() {

			switch(d3.event.keyIdentifier) {
				case 'Right': 
					console.log('The right key was clicked');
					break;
				case 'Left':
					console.log('The left key was clicked');
					break;
				default:
					console.log("Key not identified");
			}
		});

		d3.select('body')
		.on('keyup', function() {

			console.log('Keyup happened');

		});

	}

	module.exports = detectEvents;


/***/ }
/******/ ]);