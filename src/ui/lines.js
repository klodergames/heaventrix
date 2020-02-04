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
var Lines = function() {
	this.initialize();
}
var p = Lines.prototype = new Container();

// Public properties:

	/**
	 * This is for store the data of the chip
	 * @property data
	 * @type Object
	 * @default null
	 */
	p.lines = 0;
	p.linesLevelUp = 10;
	p.remaining = 0;
	
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
		
		this.remaining = this.linesLevelUp;
		
		var title = new Text("Lines","20px "+font, "#999");
		title.textAlign = 'center';
		title.textBaseline = 'top';
		this.addChild(title);
		
		this.label = new Text(this.remaining,"20px "+font, "#333");
		this.label.textAlign = 'center';
		this.label.textBaseline = 'top';
		this.addChild(this.label);
		this.label.y = 20;
	}
	
// Public methods:
	
	/**
	 * Update remaining lines
	 * @return true if there are a level-up
	 */
	p.update = function (n) {
		this.lines += n;
		this.remaining -= n;
		var ret = false;
		if (this.remaining <= 0) {
			ret = true;
			this.remaining = this.linesLevelUp - (this.lines % this.linesLevelUp);
		}
		this.label.text = this.remaining;
		return ret;
	}
	
	p.reset = function () {
		this.lines = 0;
		this.remaining = this.linesLevelUp;
		this.label.text = this.remaining;
	}

window.Lines = Lines;
}(window));