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
var Tetrimino = function(blockSize) {
	this.initialize(blockSize);
}
var p = Tetrimino.prototype = new Container();

// Public properties:

	/**
	 * This is for store the data of the chip
	 * @property data
	 * @type Object
	 * @default null
	 */
	p.data = null;
	
	/**
	 * Options
	 */
	p.options = {
		blockSize: 20,
		borderSize: 1,
		borderColor: 'grey'
	}

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
		this.options.blockSize = blockSize;
		this.data = this.getRandomTetriminoData();
		this.drawTetrimino();
	}
	
// Public methods:
	
	/**
	 * Return structure of tetrimino
	 */
	p.getRandomTetriminoData = function() {
		var tetriminos =[
			{ color: '#ff8585', name: 'I', currentFrame: 0, frames: [
				[ new Point(-2, 0), new Point(-1, 0), new Point(0, 0), new Point(1, 0) ],
				[ new Point(0, -2), new Point(0, -1), new Point(0, 0), new Point(0, 1) ],
				[ new Point(-2, 0), new Point(-1, 0), new Point(0, 0), new Point(1, 0) ],
				[ new Point(0, -2), new Point(0, -1), new Point(0, 0), new Point(0, 1) ]
			]},
			{ color: '#ffc58a', name: 'J', currentFrame: 0, frames: [
				[ new Point(-1, -1), new Point(-1, 0), new Point(0, 0), new Point(1, 0) ],
				[ new Point(-1, 0), new Point(0, 0), new Point(0, -1), new Point(0, -2) ],
				[ new Point(-2, -1), new Point(-1, -1), new Point(0, -1), new Point(0, 0) ],
				[ new Point(-1, 1), new Point(-1, 0), new Point(-1, -1), new Point(0, -1) ]
			]},
			{ color: '#ffc2ff', name: 'L', currentFrame: 0, frames: [
				[ new Point(-2, 0), new Point(-1, 0), new Point(0, 0), new Point(0, -1) ],
				[ new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(0, 1) ],
				[ new Point(-1, 0), new Point(-1, -1), new Point(0, -1), new Point(1, -1) ],
				[ new Point(-1, -2), new Point(-1, -1), new Point(-1, 0), new Point(0, 0) ]
			]},
			{ color: '#8181ff', name: 'O', currentFrame: 0, frames: [
				[ new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(-1, 0) ],
				[ new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(-1, 0) ],
				[ new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(-1, 0) ],
				[ new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(-1, 0) ]
			]},
			{ color: '#94ff94', name: 'S', currentFrame: 0, frames: [
				[ new Point(-1, 0), new Point(0, 0), new Point(0, -1), new Point(1, -1) ],
				[ new Point(-1, -2), new Point(-1, -1), new Point(0, -1), new Point(0, 0) ],
				[ new Point(-1, 0), new Point(0, 0), new Point(0, -1), new Point(1, -1) ],
				[ new Point(-1, -2), new Point(-1, -1), new Point(0, -1), new Point(0, 0) ]
			]},
			{ color: '#cfcf00', name: 'T', currentFrame: 0, frames: [
				[ new Point(-1, 0), new Point(0, 0), new Point(0, -1), new Point(1, 0) ],
				[ new Point(-1, 0), new Point(0, 0), new Point(0, -1), new Point(0, 1) ],
				[ new Point(-1, 0), new Point(0, 0), new Point(1, 0), new Point(0, 1) ],
				[ new Point(0, -1), new Point(0, 0), new Point(1, 0), new Point(0, 1) ]
			]},
			{ color: '#8affff', name: 'Z', currentFrame: 0, frames: [
				[ new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(1, 0) ],
				[ new Point(-1, 0), new Point(-1, -1), new Point(0, -1), new Point(0, -2) ],
				[ new Point(-1, -1), new Point(0, -1), new Point(0, 0), new Point(1, 0) ],
				[ new Point(-1, 0), new Point(-1, -1), new Point(0, -1), new Point(0, -2) ]
			]}
		]
		
		var random = Math.floor(Math.random() * tetriminos.length);
		//return tetriminos[0];
		return tetriminos[random];
	}
	
	/**
	 * Add the shapes that compounds the tetrimino
	 */
	p.drawTetrimino = function () {
		for (var j=0; j < this.data.frames.length; j++) {
			if (this.data.currentFrame == j) {
				for (var i=0; i < this.data.frames[this.data.currentFrame].length; i++) {
					var p = this.data.frames[this.data.currentFrame][i];
					var shape = new Shape();
					shape.graphics.setStrokeStyle(this.options.borderSize);
					shape.graphics.beginFill(this.data.color).beginStroke(this.options.borderColor).drawRect(
						0, 0, this.options.blockSize, this.options.blockSize
					);
					shape.x = p.x * this.options.blockSize;
					shape.y = p.y * this.options.blockSize;
					this.addChild(shape);
					
					this.data.frames[this.data.currentFrame][i] = { point: p, block: shape }
				}
			} else {
				for (var i=0; i < this.data.frames[j].length; i++) {
					var p = this.data.frames[j][i];
					this.data.frames[j][i] = { point: p, block: null }
				}
			}
		}
		//this.debug();
	}
	
	p.doRotation = function () {
		var beforeFrame = this.data.currentFrame++;
		if (this.data.currentFrame >= this.data.frames.length) this.data.currentFrame = 0;
		for (var i=0; i < this.data.frames[this.data.currentFrame].length; i++) {
			var p = this.data.frames[this.data.currentFrame][i].point;
			var shape = this.data.frames[beforeFrame][i].block;
			shape.x = p.x * this.options.blockSize;
			shape.y = p.y * this.options.blockSize;
			this.data.frames[this.data.currentFrame][i].block = shape;
		}
		//this.debug();
	}
	
	p.moveRight = function () { this.x += this.options.blockSize; }
	p.moveLeft = function () { this.x -= this.options.blockSize; }
	p.moveDown = function () { this.y += this.options.blockSize; }
	
	p.getDataClone = function () {
		var temp = new Tetrimino(this.options.blockSize );
		temp.data.color = this.data.color;
		temp.data.name = this.data.name;
		temp.data.currentFrame = this.data.currentFrame;
		temp.data.frames = this.data.frames;
		temp.x = this.x;
		temp.y = this.y;
		return temp;
	}
	
	p.getMoveLeftClone = function () { var temp = this.getDataClone(); temp.moveLeft(); return temp; }
	p.getMoveRightClone = function () { var temp = this.getDataClone(); temp.moveRight(); return temp; }
	p.getMoveDownClone = function () { var temp = this.getDataClone(); temp.moveDown(); return temp; }
	p.getRotateClone = function () {
		var temp = this.getDataClone();
		temp.data.currentFrame++;
		if (temp.data.currentFrame >= temp.data.frames.length) temp.data.currentFrame = 0;
		return temp;
	}
	
	p.getCurrentFrameData = function() {
		return this.data.frames[this.data.currentFrame];
	}
	
	p.getBound = function () {
		var x0 = 0, y0 = 0, x1 = 0, y1 = 0;
		for (var i=0; i < this.data.frames[this.data.currentFrame].length; i++) {
			var s = this.data.frames[this.data.currentFrame][i].block;
			if (s.x < x0) x0 = s.x; if (s.y < y0) y0 = s.y;
			if (s.x > x1) x1 = s.x;	if (s.y > y1) y1 = s.y;
		}
		return new Rectangle(x0, y0, x1 - x0, y1 - y0);
	}
	
	p.debug = function () {
		console.log(this.data); 
		/*console.log(this.data.frames[this.data.currentFrame]);
		for (var i=0; i < this.data.frames[this.data.currentFrame].length; i++) {
			var shape = this.data.frames[this.data.currentFrame][i].shape;
			console.log(shape.x, shape.y);
		}*/
	}

window.Tetrimino = Tetrimino;
}(window));