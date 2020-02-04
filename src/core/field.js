/**
 * Field
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
var Field = function(blockSize) {
	this.initialize(blockSize);
}
var p = Field.prototype = new Container();

// Public properties:

	/**
	 * This is for store the data of the chip
	 * @property data
	 * @type Object
	 * @default null
	 */
	p.data = null;
	
	//p.debug = null;
	
	/**
	 * Options
	 */
	p.options = {
		width: 10, height: 20,
		borderSize: 2,
		borderColor: 'lightgrey',
		color: 'white',
		blockSize: 20
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
	p.initialize = function (blockSize) {
		this.Container_initialize();
		this.options.blockSize = blockSize;
		
		this.data = [];
		for (var i=0; i<this.options.height; i++) {
			var line = [];
			for (var j=0; j<this.options.width; j++) {
				line.push({ status: 0, block: null });
			}
			this.data.push(line);
		}
		
		var shape = new Shape();
		shape.graphics.setStrokeStyle(this.options.borderSize);
		shape.graphics.beginFill(this.options.color).beginStroke(this.options.borderColor).drawRect(
			0, 0, this.options.width * this.options.blockSize, this.options.height * this.options.blockSize
		);
		this.addChild(shape);
		
		//this.debug();
	}
	
// Public methods:
	
	p.checkTetriminoCollision = function (tetrimino) {
		var oy = tetrimino.y / this.options.blockSize;
		var ox = tetrimino.x / this.options.blockSize;
		
		var d = tetrimino.getCurrentFrameData();
		for (var i=0;i<d.length;i++) {
			var p = new Point(d[i].point.x + ox, d[i].point.y + oy);
			if (p.x < 0) return true
			if (p.x > this.options.width) return true;
			
			if (p.y >= 0) {
				if (this.data[p.y][p.x] == undefined) return true;
				if (this.data[p.y][p.x].status == 1) return true;
			}
		}
		return false;
	}
	
	p.checkBlockVisibility = function (tetrimino) {
		var oy = tetrimino.y / this.options.blockSize;
		var ox = tetrimino.x / this.options.blockSize;
		for (var i=0; i < tetrimino.data.frames[tetrimino.data.currentFrame].length; i++) {
			var p = tetrimino.data.frames[tetrimino.data.currentFrame][i].point;
			var shape = tetrimino.data.frames[tetrimino.data.currentFrame][i].block;
			if (p.y + oy < 0) shape.visible = false;
			else shape.visible = true;
		}
	}
	
	p.checkLines = function () {
		var lines = [];
		for (var i=0; i<this.data.length; i++) {
			var check = true;
			for (var j=0; j<this.data[i].length; j++) {
				if (this.data[i][j].status == 0) check = false;
			}
			if (check) lines.push(i);
		}
		return lines;
	}
	
	p.clearLines = function (lines) {
		for (var i=0; i<lines.length; i++)
			this.clearLine(lines[i]);
	}
	
	p.clearLine = function (n) {
		for (var i=n; i>0; i--) {
			if (i==n) {
				for (var j=0;j<this.data[i].length;j++) {
					var stage = this.data[i][j].block.getStage();
					this.data[i][j].block.visible = false;
					stage.removeChild(this.data[i][j].block);
					
					this.data[i][j] = this.data[i-1][j];
				}
			} else {
				for (var j=0;j<this.data[i].length;j++) {
					if (this.data[i][j].status == 1) {
						this.data[i][j].block.y += this.options.blockSize;
					}
					this.data[i][j] = this.data[i-1][j];
				}
			}
			//this.data[i] = this.data[i-1];
		}
		for (var j=0; j<this.options.width; j++) {
			this.data[0][j] = { status: 0, block: null };
		}
		//this.debug();
	}
	
	p.checkTetriminoLand = function (tetrimino) {
		var ox = tetrimino.x / this.options.blockSize;
		var oy = tetrimino.y / this.options.blockSize;
		var d = tetrimino.getCurrentFrameData();
		
		for (var i=0;i<d.length;i++) {
			var p = new Point(d[i].point.x + ox, d[i].point.y + oy);
			if (p.y > this.options.height - 1) return true; 
			if (p.y > 0) {
				if (this.data[p.y][p.x].status == 1) return true;
			}
		}
		return false;
	}
	
	p.setTetrimino = function (tetrimino) {
		var ox = tetrimino.x / this.options.blockSize;
		var oy = tetrimino.y / this.options.blockSize;
		
		var d = tetrimino.getCurrentFrameData();
		
		for (var i=0;i<d.length;i++) {
			var p = new Point(d[i].point.x + ox, d[i].point.y + oy);
			if (p.y >= 0) {
				this.data[p.y][p.x].status = 1;
				this.data[p.y][p.x].block = d[i].block;
						
				var tx = d[i].block.x + tetrimino.x, ty = d[i].block.y + tetrimino.y;
				this.addChild(d[i].block);
				d[i].block.x = tx; d[i].block.y = ty;
			} else {
				tetrimino.removeChild(d[i].block);
			}
		}
	}
	
	p.reset = function () {
		for (var i = 0; i < this.children.length; i++) {
			this.removeChild(this.getChildAt(i));
		}
		this.initialize(this.options.blockSize);
	}
	
	p.debug = function () {
		var out = '';
		for (var i=0; i<this.data.length; i++) {
			out += '[';
			for (var j=0; j<this.data[i].length; j++) {
				out += this.data[i][j].status+',';
			}
			out += "]\n";
		}
		console.log(out);
	}

window.Field = Field;
}(window));