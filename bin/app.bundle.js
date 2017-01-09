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

	var //BarView object encapsulates rendering info for bar on the front-end.
	    BarView = __webpack_require__(1),
	    //BallView object encapsulates rendering info for the ball on the front-end.
	    BallView = __webpack_require__(2), 
	    //GameView object encapsulates rendering info for the game generally, including the layout on the front-end.
	    GameView = __webpack_require__(3), 
	    //controllers
	    ubarController = __webpack_require__(4), 
	    ballController = __webpack_require__(5),
	    gameSetup = __webpack_require__(6);


	var socket = io.connect('192.168.1.8:8000/');

	var game;

	//after the game is setup, maybe it takes a callback? work in progress
	var setup = gameSetup( socket );

	var clientID = setup.ID;

	socket.on('load', function(a_game) {
		console.log(a_game);
		game = a_game;

	var container = d3.select('#main');

	/* Initialize all the views. */
	var game_view = new GameView(game, container, window.innerHeight * 0.8, window.innerHeight * 0.8),
	    ball_view = new BallView(game.ball, container, 'ball'),
	    player_view = new BarView(game.playerOneBar, container, 'player'),
	    opponent_view = new BarView(game.playerTwoBar, container, 'opponent');


	/* Initialize views in position in the beginning. */
	game_view.renderGameView();
	player_view.renderBarView();
	opponent_view.renderBarView();
	ball_view.renderBallView();

	/* Initialize all the controllers. */
	var player_controller = new ubarController(player_view, clientID, socket);
	player_controller.keyListen();
	player_controller.socketEventListeners();
	ball_controller = new ballController(ball_view, socket);
	ball_controller.socketEventListeners();

	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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

			//for scaling
			var width = this.container.attr("width"),
			height = this.container.attr("height");

			//TODO make sure that position, sizes, 
			//and velocity is scaled before deploy.
			//VERY IMPORTANT!!
			var ball = this.container
				.append("circle")
				.attr("id", this.id)
				.attr("cx", this.Ball.position.x * width)
				.attr("cy", this.Ball.position.y * height)
				.attr("r", this.Ball.radius * width)
				.attr("fill",'#900C3F');
				
		}

		//this function moves the ballView by the velocity.
		//It is called in setInterval(s) from the main.js script.
		this.moveBall = function () {

			//for scaling
			var width = this.container.attr("width"),
			height = this.container.attr("height");

			var selection = this.container.select('#' + this.id);

			var curX = Number(selection.attr("cx")),
			curY = Number(selection.attr("cy"));
			
			selection.attr("cx", curX + this.Ball.velocity.x * width)
				.attr("cy", curY + this.Ball.velocity.y * height);
				
		}

		/* this function moves the ball to the passed in position. */
		this.moveBallPosition = function(position) {
			var width = this.container
				.attr("width"),
				height = this.container
				.attr("height");

				this.container
				.select('#' + this.id)
				.attr("cx", function() {
					return position.x * width;
				})
				.attr("cy", function() {
					return position.y * width;
				});
		}
		
		return this;
	}

	module.exports = BallView;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
	This is the rendering of the game view. In the future we will
	probably end up putting customizations for the whole "arena"
	here.
	*/
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

	/*

	The responsibilities of the ubarController include:

	    1. Listening to key entries by users on the front-end.
	    2. Syncing the frontend with the backend:
	        - Updating the barview for the user. 
	        - Updating the backend with the new "position".

	*/
	var ubarController = function(BarView, playerID, socket) {
	    
	    this.socket = socket;
	    this.playerID = playerID;
	    this.BarView = BarView;
	    this.last_event = null;
	    this.last_event_identifier = null;

	    /* Listens for socket events from the back-end and
	    updates the view according to the emitted socket events.
	    */
	    this.socketEventListeners = function() {
	        
	        var BarView = this.BarView;
	        this.socket.on('move' + this.playerID, function(position) {
	            BarView.moveBarViewPosition(position);
	        });

	    }

	    /* Setting up the key-listen actions for waiting on 
	    user interactions on the front end. */
	    this.keyListen = function() {
	                
	        d3.select('body')
	        .on('keydown', keyDown)
	        .on('keyup', keyUp);

	        var controller = this;

	        /* When a key is "upped" or lifted from pressing, this portion is fired. */
	        function keyUp () {

	            controller.socket.emit('keyup', controller.playerID);
	            controller.last_event = 'keyup';
	            controller.last_event_identifier = d3.event.keyIdentifier;
	        
	        }

	        /* When a key is pressed this portion is fired */
	        function keyDown () {

	            if (controller.last_event === 'keydown' && controller.last_event_identifier === d3.event.keyCode)
	                return;

	            switch (d3.event.keyCode) {

	                case 39:                   
	                    controller.socket.emit('pressRight', controller.playerID);
	                    break;

	                case 37:
	                    controller.socket.emit('pressLeft', controller.playerID);                    
	                    break;

	                default:
	                    console.log(d3.event.key)
	                    console.log(d3.event.keyCode)
	                    console.error('Key not identified');
	            
	            }

	            controller.last_event = 'keydown';
	            controller.last_event_identifier = d3.event.key;
	        
	        }
	        
	    }

	    return this;        
	}

	module.exports = ubarController;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*

	The responsibilities of the ballController include:

	    1. Listening to backend updates to update the ball's velocity
	    on the front-end.
	    (The general idea now is to make sure that the backend alone
	    knows about collisions changes in velocity so it can 'tell'
	    the front-end)

	*/

	var ballController = function(BallView, socket) {
	    
	    this.BallView = BallView;
	    this.socket = socket;

	    this.socketEventListeners = function() {

	        var ballView = BallView;
	        this.socket.on('moveBall', function(position) {
	            ballView.moveBallPosition(position);
	        });

	    }

	    return this;
	}

	module.exports = ballController;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var gameSetup = ( socket ) => {

	    this.ID = "";

	    socket.on('onconnected', function( data ) {
	        
	        this.ID = data['id'];

	        for(var id in data.clients) {

	            if(id !== data['id']) {

	                d3.select('#selectPlayers')
	                .append('div')
	                .attr('id', 'u' + data.clients[id]['id'])
	                .html(data.clients[id]['id']);
	           

	            }

	        }

	    })

	    socket.on('newConnection', function( data ) {

	            d3.select('#selectPlayers')
	            .append('div')
	            .attr("id", "u" + data['id'])
	            .html(data['id']);

	    })

	    socket.on('disconnectedClient', function( data ) {

	        d3.select('#' + "u" + String(data['id'])).remove();

	    })  

	    return this;
	}

	module.exports = gameSetup;

/***/ }
/******/ ]);