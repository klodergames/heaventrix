var canvas, stage;

var loadingMessage, loadingInterval, preload;

var currentTetrimino, nextTetrimino;
var field;
var faster;

var debug = false;
var font = "'Concert One', cursive";

// Stats
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px'; 

// UI
var score, level, lines, next, instructions;
var pauseScreen, overScreen, startScreen;

// Game stats
var GAME_START = 0;
var GAME_ON = 1;
var GAME_PAUSE = 2;
var GAME_OVER = 3;
var gameState = GAME_START;

// Key Codes
var KEYCODE_ENTER = 13;
var KEYCODE_SPACE = 32;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;
var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_D = 68;
var KEYCODE_S = 83;
var KEYCODE_M = 77;
var KEYCODE_R = 82;

// Size of the minimal block
var BLOCK_SIZE = 20;

var musicStatus = true;

$(function () {
	// Add stats
	if (debug) document.body.appendChild(stats.domElement);
	
	// Get stage
	canvas = document.getElementById('canvas');
	stage = new Stage(canvas);
	
	// Sound to preload
	var manifest = [
		{id:"rotate", src:"assets/39747__altemark__beep.ogg", type: PreloadJS.SOUND},
		{id:"land", src:"assets/39734__altemark__bd1.ogg", type: PreloadJS.SOUND},
		{id:"clearline", src:"assets/39764__altemark__fx10.ogg", type: PreloadJS.SOUND},
		{id:"tetris", src:"assets/39787__altemark__fx5.ogg", type: PreloadJS.SOUND},
		{id:"music", src:"assets/cailloux_latombe_-_tetris.ogg", type: PreloadJS.SOUND},
		{id:"levelup", src:"assets/34232__hardpcm__chip116.ogg", type: PreloadJS.SOUND},
		{id:"gameover", src:"assets/72866__corsica-s__game-over.ogg", type: PreloadJS.SOUND},
		{id:"pause", src:"assets/32946__hardpcm__chip019.ogg", type: PreloadJS.SOUND}
	];
	
	// Preload
	preload = new PreloadJS();
	preload.onComplete = doneLoading;
	preload.installPlugin(SoundJS);
	preload.loadManifest(manifest);
	
	loadingMessage = new Text("Loading", "bold 20px 'Press Start 2P', cursive", "black");
	loadingMessage.maxWidth = 1000;
	loadingMessage.textAlign = "center";
	loadingMessage.x = canvas.width / 2;
	loadingMessage.y = canvas.height / 2;
	stage.addChild(loadingMessage);
	stage.update(); 	//update the stage to show text
	
	loadingInterval = setInterval(updateLoading, 200);
});

/* Loading
 * ************************************************************************** */

function updateLoading() {
	loadingMessage.text = "Loading " + (preload.progress*100|0) + "%"
	stage.update();
}

function doneLoading() {
	clearInterval(loadingInterval);
	stage.removeChild(loadingMessage);
	init();
}

/* Init
 * ************************************************************************** */

function init() {
	// UI
	level = new Level(); stage.addChild(level);
	level.x = 150; level.y = 130;
	lines = new Lines(); stage.addChild(lines);
	lines.x = 150; lines.y = 220;
	score = new Score(); stage.addChild(score);
	score.x = 150; score.y = 330;
	next = new Next(BLOCK_SIZE); stage.addChild(next);
	next.x = 650; next.y = 130;
	instructions = new Instructions(); stage.addChild(instructions);
	instructions.x = 550; instructions.y = 330;
	
	// The field
	field = new Field(BLOCK_SIZE); stage.addChild(field);
	field.x = 300; field.y = 130;
	
	// Screens
	pauseScreen = new PauseScreen(field.x, field.y, field.options.width * BLOCK_SIZE, field.options.height * BLOCK_SIZE, field.options.borderSize);
	overScreen = new OverScreen(field.x, field.y, field.options.width * BLOCK_SIZE, field.options.height * BLOCK_SIZE, field.options.borderSize);
	startScreen = new StartScreen(field.x, field.y, field.options.width * BLOCK_SIZE, field.options.height * BLOCK_SIZE, field.options.borderSize);
	
	// Initial state
	initGame();
	
	// Init loop
	Ticker.addListener(window);
	Ticker.setFPS(50);
	
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
}

/* Main Loop
 * ************************************************************************** */

var counter = 0, pauseCounter = 0;
function tick() {
	if (debug) stats.begin(); // Begin stats
	
	// GAME START
	if (gameState == GAME_START) {
		if (pauseCounter >= 10) {
			startScreen.tick();
			pauseCounter = 0;
		}
		pauseCounter++;
	// GAME ON
	} else if (gameState == GAME_ON) {
		if (counter >= level.getLoopLimit() || faster == true) {
			if (field.checkTetriminoLand(currentTetrimino.getMoveDownClone())) land();
			else currentTetrimino.moveDown();
			field.checkBlockVisibility(currentTetrimino);
			counter = 0;
		}
		counter++;
	// GAME_PAUSE
	} else if (gameState == GAME_PAUSE) {
		if (pauseCounter >= 10) {
			pauseScreen.tick();
			pauseCounter = 0;
		}
		pauseCounter++;
	// GAME OVER
	} else if (gameState == GAME_OVER) {
		
	}
	
	stage.update();
	
	if (debug) stats.end();	// End stats
}

/* Controls
 * ************************************************************************** */
function handleKeyDown(e) {
	if(!e){ var e = window.event; } //cross browser issues exist
	if (gameState == GAME_ON) {
		switch(e.keyCode) {
			case KEYCODE_A:
			case KEYCODE_LEFT:
				if (!field.checkTetriminoCollision(currentTetrimino.getMoveLeftClone()))
					currentTetrimino.moveLeft();
				return false;
			case KEYCODE_D:
			case KEYCODE_RIGHT:
				if (!field.checkTetriminoCollision(currentTetrimino.getMoveRightClone()))
					currentTetrimino.moveRight();
				return false;
			case KEYCODE_W:
			case KEYCODE_UP:
				if (!field.checkTetriminoCollision(currentTetrimino.getRotateClone())) {
					SoundJS.play("rotate", SoundJS.INTERRUPT_NONE, 0, 0, 0, 1, 0);
					currentTetrimino.doRotation();
					field.checkBlockVisibility(currentTetrimino);
				}
				return false;
			case KEYCODE_S:
			case KEYCODE_DOWN: faster = true; return false;
			//case KEYCODE_ENTER:	 if(canvas.onclick == handleClick){ handleClick(); }return false;
		}
	}
}

function handleKeyUp(e) {
	if(!e){ var e = window.event; } //cross browser issues exist
	if (gameState == GAME_START) {
		stage.removeChild(startScreen);
		startGame();
	} else if (gameState == GAME_ON) {
		switch(e.keyCode) {
			case KEYCODE_SPACE:	pause(); return false;
			case KEYCODE_S:
			case KEYCODE_DOWN: faster = false; return false;
			case KEYCODE_M:
				if (musicStatus) SoundJS.pause("music", SoundJS.INTERRUPT_NONE, 0, 0, -1, 1, 0);
				else SoundJS.resume("music", SoundJS.INTERRUPT_NONE, 0, 0, -1, 1, 0);
				musicStatus = !musicStatus;
				return false;
			case KEYCODE_R: resetGame(); return false;
		}
	} else if (gameState == GAME_PAUSE) {
		switch(e.keyCode) {
			case KEYCODE_SPACE:	pause(); return false;
			case KEYCODE_R: resetGame(); return false;
		}
	} else if (gameState == GAME_OVER) {
		switch(e.keyCode) {
			case KEYCODE_R: resetGame(); return false;
		}
	}
}

function pause() {
	switch (gameState) {
		case GAME_PAUSE: resumeGame(); break;
		case GAME_ON: pauseGame(); break;
	}
	SoundJS.play("pause", SoundJS.INTERRUPT_NONE, 0, 0, 0, 1, 0);
}

/* Checks
 * ************************************************************************** */

function land() {
	field.setTetrimino(currentTetrimino);
	SoundJS.play("land", SoundJS.INTERRUPT_NONE, 0, 0, 0, 1, 0);
	
	var l = field.checkLines();
	if (l.length > 0) {
		score.update(l.length);
		field.clearLines(l);
		if (l.length >= 4) SoundJS.play("tetris", SoundJS.INTERRUPT_NONE, 0, 0, 0, 1, 0);
		else SoundJS.play("clearline", SoundJS.INTERRUPT_NONE, 0, 0, 0, 1, 0);
		if (lines.update(l.length)) {
			SoundJS.play("levelup", SoundJS.INTERRUPT_NONE, 0, 0, 0, 1, 0);
			level.up();
		}
	}
	newTetrimino();
}

/* Game actions
 * ************************************************************************** */

function initGame() {
	stage.addChild(startScreen);
	gameState = GAME_START;
}

function startGame() {
	SoundJS.play("music", SoundJS.INTERRUPT_NONE, 0, 0, -1, 1, 0);
	if (!musicStatus) SoundJS.pause("music");
	gameState = GAME_ON;
	faster = false;
	getNextTetrimino();
	newTetrimino();
}

var pauseScreen, pauseText;
function pauseGame() {
	gameState = GAME_PAUSE;
	stage.addChild(pauseScreen);
	if (musicStatus) SoundJS.pause("music");
}

function resumeGame() {
	gameState = GAME_ON;
	stage.removeChild(pauseScreen);
	if (musicStatus) SoundJS.resume("music");
}

function endGame() {
	SoundJS.stop("music");
	stage.addChild(overScreen);
	gameState = GAME_OVER;
	SoundJS.play("gameover", SoundJS.INTERRUPT_NONE, 0, 0, 0, 1, 0);
} 

function resetGame() {
	if (stage.contains(pauseScreen)) stage.removeChild(pauseScreen);
	if (stage.contains(overScreen)) stage.removeChild(overScreen);
	
	field.reset(); level.reset(); next.reset(); lines.reset(); score.reset();
	SoundJS.stop("music");
	
	initGame();
}

/* Tetrimino create
 * ************************************************************************** */

function getNextTetrimino() {
	nextTetrimino = new Tetrimino(BLOCK_SIZE);
	next.setTetrimino(nextTetrimino); 
}

function newTetrimino() {
	currentTetrimino = next.getTetrimino();
	field.addChild(currentTetrimino);
	var bounds = currentTetrimino.getBound();
	currentTetrimino.x = (Math.floor(field.options.width / 2) * BLOCK_SIZE);
	currentTetrimino.y = -(bounds.y);
	
	if (field.checkTetriminoCollision(currentTetrimino)) endGame();
	
	getNextTetrimino();
}
