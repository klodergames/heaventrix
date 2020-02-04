/**
 * OverScreen
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
var OverScreen = function(x, y, width, height, borderSize) {
	this.initialize(x, y, width, height, borderSize);
}
var p = OverScreen.prototype = new Container();

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
	p.initialize = function(x, y, width, height, borderSize) {
		this.Container_initialize();
		
		var shape = new Shape();
		shape.graphics.setStrokeStyle(borderSize);
		shape.graphics.beginFill('rgba(255,255,255,.9)').beginStroke('rgba(255,255,255,.9)').drawRect(x, y, width, height);
		this.addChild(shape);
		
		var title = new Text("Game Over", "bold 20px 'Press Start 2P', cursive", "#000");
		title.textAlign = "center";
		title.x = (width / 2) + field.x;
		title.y = (height / 2) + field.y;
		this.addChild(title);
		
		var subTitle = new Text("press 'R' for restart", "bold 10px 'Press Start 2P', cursive", "#000");
		subTitle.textAlign = "center";
		subTitle.x = (width / 2) + field.x;
		subTitle.y = (height / 2) + field.y + 20;
		this.addChild(subTitle);
	}

window.OverScreen = OverScreen;
}(window));