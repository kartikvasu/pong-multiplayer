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

	bar = __webpack_require__(1);
	mainRender = __webpack_require__(2);
	mainRender();
	bar('#main').render_function();
	console.log(bar);


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);