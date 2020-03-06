/*
    Attribution to the following reference sites:
    https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript - for base learning of the canvas + 2d context drawing tool and how movement is done etc in a game.
*/

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemy, this uses
    // the resource.js helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -600;
    this.y = 60;
    this.dx = 150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.dx * dt
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemy, this uses
    // the resource.js helper to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 403;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
  if (keyCode === 'left') {this.x -= 100} if (keyCode === 'right') {this.x += 100}
  if (keyCode === 'up') {this.y -= 90} if (keyCode === 'down') {this.y += 90}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const enemy5 = new Enemy();
const enemy6 = new Enemy();

enemy2.x = -400;
enemy2.y = 145;
enemy3.x = -100;
enemy3.y = 230;
enemy4.x = -2300;
enemy4.y = 230;
enemy4.dx = 400;
enemy5.x = -2000;
enemy5.y = 230;
enemy5.dx = 400;
enemy6.x = -2200;
enemy6.y = 145;
enemy6.dx = 300;

const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
