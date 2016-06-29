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

	var bar = __webpack_require__(1), //this is the constructor for the bar.
	gameScreen = __webpack_require__(2), //draws the game screen.
	keyControllers = __webpack_require__(3); //manages key events and launches 

	gameScreen(); //render the bare-bones game screen

	var playerBar = new bar(); //initialize the player bar object.

	playerBar.renderBar('#main', true); //give it a selection and boolean indicating whether it's a player bar.

	console.log(playerBar);

	keyControllers(playerBar); //call the key controller function to listen for key events. 



/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	function screenRender() {
		var width = window.innerWidth * 0.9,
		height = window.innerHeight * 0.8;

		var chart = d3.select('#main')
			.attr('width', width)
			.attr('height', height)
			.style({
				'border': '1px solid black'
			});
	}

	module.exports = screenRender;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function detectEvents(bar) {
		d3.select('body')
		.on('keydown', function() {

			switch(d3.event.keyIdentifier) {
				case 'Right': 
					bar.xVelocity = 10;
					break;
				case 'Left':
					bar.xVelocity = -10;
				default:
					console.log("Key not identified!");
			}

			bar.moveBar();

		});

		d3.select('body')
		.on('keyup', function() {

			bar.xVelocity = 0;
			
			bar.moveBar();
		
		});

	}

	module.exports = detectEvents;


/***/ }
/******/ ]);