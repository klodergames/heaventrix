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
var Next = function(blockSize) {
	this.initialize(blockSize);
}
var p = Next.prototype = new Container();

// Public properties:

	/**
	 * This is for store the data of the chip
	 * @property data
	 * @type Object
	 * @default null
	 */
	p.blockSize = 20;
	p.tetrimino = null;

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
	p.initialize = function(blockSize) {
		this.Container_initialize();
		
		this.blockSize = blockSize;
		
		var title = new Text("NEXT","20px "+font, "#999");
		title.textAlign = 'center';
		title.textBaseline = 'top';
		this.addChild(title);
	}
	
// Public methods:
	
	p.setTetrimino = function (tetrimino) {
		this.tetrimino = tetrimino;
		this.addChild(tetrimino);
		var bound = tetrimino.getBound();
		
		var ox = -(this.blockSize * 5) / 2;
		var oy = 45;
		
		tetrimino.x = ox + this.blockSize + (-bound.x);
		tetrimino.y = oy + this.blockSize + (-bound.y) + 5;
	}
	
	p.getTetrimino = function () {
		return this.tetrimino;
	}
	
	p.reset = function () {
		this.removeChild(this.tetrimino);
	}

window.Next = Next;
}(window));