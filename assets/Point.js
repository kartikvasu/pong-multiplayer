/** This is the point data structure that will 
 * be used to encode the following information:
 * 
 * 1. Position (x, y)
 * 2. Velocity (x, y)
 *
 * It is important to note that to preserve global
 * position consistency, it will all be denoted as
 * decimals ranging between 0 and 1.
 */
var Point = function (x, y) {

	//type-checks for input variables.
	if(arguments.length !== 2) {
		console.error("Wrong number of inputs to Point constructor!");
	}

	if (typeof x !== "number" || typeof y !== "number") {
		console.error("Input to Point constructor should be numbers.");
	}

	if(x < 0 || x > 1 || y < 0 || y > 1) {
		console.error("Input variables must be between 0 and 1.");
	}

	this.x = x || 0;
	this.y = y || 0;

	return this;
}

module.exports = Point;
