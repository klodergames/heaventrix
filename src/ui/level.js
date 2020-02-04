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
var Level = function() {
	this.initialize();
}
var p = Level.prototype = new Container();

// Public properties:

	/**
	 * This is for store the data of the chip
	 * @property data
	 * @type Object
	 * @default null
	 */
	p.level = 0;
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
		label = new Text("Level "+this.level,"20px "+font, "#999");
		label.textAlign = 'center';
		label.textBaseline = 'top';
		this.addChild(label);
	}
	
// Public methods:
	
	/**
	 * Return structure of tetrimino
	 */
	p.up = function () {
		this.level++;
		label.text = "Level "+this.level;
	}
	
	p.getLoopLimit = function () {
		if (this.level < 8) {
			return (90 - (this.level * 10));
		} else if (this.level < 27) {
			return 27 - this.level;
		} else {
			return 0;
		}
		return 0;
	}
	
	p.reset = function () {
		this.level = 0;
		label.text = "Level "+this.level;
	}

window.Level = Level;
}(window));