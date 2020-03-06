/*
    Attribution to the following reference sites:
    https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript - for base learning of the canvas + 2d context drawing tool and how movement is done etc in a game.
    https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas) - for base learning collision detection techniques.
    https://stackoverflow.blog/2009/06/25/attribution-required/
    question author ©
    User:[Noble-Surfer](https://stackoverflow.com/users/1841758/noble-surfer), answer author © User:[Ben](https://stackoverflow.com/users/1745309/ben) / stackoverflow / CC-BY-SA-4.0 International - (udacity supplied link for the project)
*/

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemy, this uses
    // the resource.js helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -550;
    this.y = 63;
    this.dx = 150;
    this.width = 101;
    this.height = 171;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    player.endGameCheck();
    this.x += this.dx * dt;
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
    this.width = 101;
    this.height = 171;
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
  if (keyCode === 'left' && this.x > 0) {this.x -= 100} if (keyCode === 'right' && this.x < 400) {this.x += 100}
  if (keyCode === 'up' && this.y > 0) {this.y -= 85} if (keyCode === 'down' && this.y < 400) {this.y += 85};
  player.winGameCheck();
};

Player.prototype.winGameCheck = function() {
  if (this.y === -22) {setTimeout(function () {alert('YOU WIN - Congratulations !!')}, 150)} else {};
};

Player.prototype.endGameCheck = function() {
  allEnemies.forEach(function (enemy) {
    if (enemy.y === player.y && enemy.x < player.x + (player.width - 15) && enemy.x + (enemy.width - 15) > player.x && enemy.y < player.y + player.height && enemy.y + enemy.height > player.y) {alert('Game Over !'); enemy.x -= 250; player.x = 200; player.y = 403}
  });
};

/* Now instantiate your objects.
  Place all enemy objects in an array called allEnemies
  Place the player object in a variable called player */

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
const enemy5 = new Enemy();
const enemy6 = new Enemy();
const enemy7 = new Enemy();
const enemy8 = new Enemy();
const enemy9 = new Enemy();
const enemy10 = new Enemy();
const enemy11 = new Enemy();
const enemy12 = new Enemy();


const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12];
const player = new Player();

enemy2.x = -400;
enemy2.y = 148;
enemy3.x = -100;
enemy3.y = 233;
enemy4.x = -2000;
enemy4.y = 233;
enemy4.dx = 400;
enemy5.x = -2300;
enemy5.y = 233;
enemy5.dx = 400;
enemy6.x = -2150;
enemy6.y = 148;
enemy6.dx = 300;
enemy7.x = -1125;
enemy7.y = 63;
enemy7.dx = 150;
enemy8.x = -2250;
enemy8.y = 63;
enemy8.dx = 300;
enemy9.x = -3875;
enemy9.y = 148;
enemy9.dx = 400;
enemy10.x = -4000;
enemy10.y = 233;
enemy10.dx = 400;
enemy11.x = -4800;
enemy11.y = 233;
enemy11.dx = 400;
enemy12.x = -1800;
enemy12.y = 63;
enemy12.dx = 150;

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
