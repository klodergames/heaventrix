/**
 * Tetrimino
 * 
 * Copyright (c) 2012 Javier López Úbeda
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

(function(window) {

/**
 * A Tetrimino is the name of one chip of Tetris. This class is an envelop for the
 * Container class of easeljs.
 * @class Tetramino
 * @extends Container
 * @constructor
 */
var Score = function() {
	this.initialize();
}
var p = Score.prototype = new Container();

// Public properties:

	/**
	 * This is for store the data of the chip
	 * @property data
	 * @type Object
	 * @default null
	 */
	p.score = 0;
	p.pointsPerLine = 100;
	p.pointsPerTetris = 400;
	p.label = null;

// Constructor:
	
	/**
	 * @property DisplayObject_initialize
	 * @type Function
	 * @private
	 */
	p.Container_initialize = p.initialize;
	
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 */
	p.initialize = function() {
		this.Container_initialize();
		
		var title = new Text("Score","20px "+font, "#999");
		title.textAlign = 'center';
		title.textBaseline = 'top';
		this.addChild(title);
		
		this.label = new Text("0","20px "+font, "#333");
		this.label.textAlign = 'center';
		this.label.textBaseline = 'top';
		this.addChild(this.label);
		this.label.y = 20;
	}
	
// Public methods:
	
	/**
	 * Update the score
	 */
	p.update = function (lines) {
		this.score += this.calculateScore(lines);
		this.label.text = this.numberWithCommas(this.score);
	}
	
	p.calculateScore = function (lines) {
		var points = 0;
		points = lines * this.pointsPerLine;
		if (lines >= 4) points += this.pointsPerTetris;
		return points;
	}
	
	p.numberWithCommas = function (x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	p.reset = function () {
		this.score = 0;
		this.label.text = this.score;
	}

window.Score = Score;
}(window));