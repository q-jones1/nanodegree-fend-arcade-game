/*
    Attribution to the following reference sites:
    https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript - for base learning of the canvas + 2d context drawing tool and how movement is done etc in a game.
    https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas) - for base learning collision detection techniques.
    https://stackoverflow.blog/2009/06/25/attribution-required/
    question author ©
    User:[Noble-Surfer](https://stackoverflow.com/users/1841758/noble-surfer), answer author © User:[Ben](https://stackoverflow.com/users/1745309/ben) / stackoverflow / CC-BY-SA-4.0 International - (udacity supplied link for the project).
    https://lowrey.me/modals-in-pure-es6-javascript/ - (udacity supplied link for the project) - for base learning on simple modal creation.
    (Content at the mozilla and lowrey links were listed as public domain.)
*/

// Enemies our player must avoid
const Enemy = function(x, xOrig, y, dx) {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemy, this uses
    // the resource.js helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.xOrig = xOrig;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.width = 101;
    this.height = 171;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    PLAYER.endGameCheck();
    this.x += this.dx * dt;
    if (this.x > 505 + this.width/2) {
      this.x = this.xOrig
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    // Variables applied to each of our instances go here,
    // The image/sprite for our player, this uses
    // the resource.js helper to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 403;
    this.dx = 0;
    this.dy = 0;
    this.width = 101;
    this.height = 171;
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    this.x += this.dx;
    this.dx = 0;
    this.y += this.dy;
    this.dy = 0;
};
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle keyboard input to move the player on the screen, required method for game
Player.prototype.handleInput = function(ALLOWED_KEYS) {
  if (ALLOWED_KEYS === 'left' && this.x > 0) {
    this.dx -= 100
  }
  if (ALLOWED_KEYS === 'right' && this.x < 400) {
    this.dx += 100
  }
  if (ALLOWED_KEYS === 'up' && this.y > 63) {
    this.dy -= 85
  }
  if (ALLOWED_KEYS === 'down' && this.y < 400) {
    this.dy += 85
  }
  if (ALLOWED_KEYS === 'up' && this.y === 63) {
    this.dy -= 85;
    PLAYER.winGame();
  };
};

// Produce a Winning Screen prompt when the player reaches the water
Player.prototype.winGame = function() {
  // Calls the constructor to create a new object and finds the modal overlay section to pass in.
  const FIND_WINSCREEN = new WinScreen(document.querySelector('.modal-overlay'));
  const OPEN_WINSCREEN = FIND_WINSCREEN.open.bind(FIND_WINSCREEN);
  PLAYER.update();
  timer1 = setTimeout(function () {
    OPEN_WINSCREEN()}, 150)
};

// Check for collisions between the player and enemies and reset the player to the start position if so
Player.prototype.endGameCheck = function() {
  ALL_ENEMIES.forEach(function (enemy) {
    if (enemy.y === PLAYER.y && enemy.x < PLAYER.x + (PLAYER.width - 15) && enemy.x + (enemy.width - 15) > PLAYER.x && enemy.y < PLAYER.y + PLAYER.height && enemy.y + enemy.height > PLAYER.y) {
      enemy.x -= 250; PLAYER.x = 200; PLAYER.y = 403
    }
  });
};

/* Now instantiate your objects.
  Place all enemy objects in an array called allEnemies
  Place the player object in a variable called player */
const ENEMY_1 = new Enemy(-550, -550, 63, 150);
const ENEMY_2 = new Enemy(-400, -400, 148, 150);
const ENEMY_3 = new Enemy(-100, -100, 233, 150);
const ENEMY_4 = new Enemy(-2000, -2000, 233, 400);
const ENEMY_5 = new Enemy(-2300, -2300, 233, 400);
const ENEMY_6 = new Enemy(-2150, -2150, 148, 300);
const ENEMY_7 = new Enemy(-1125, -1125, 63, 150);
const ENEMY_8 = new Enemy(-2250, -2250, 63, 300);
const ENEMY_9 = new Enemy(-3875, -3875, 148, 400);
const ENEMY_10 = new Enemy(-4000, -4000, 233, 400);
const ENEMY_11 = new Enemy(-4800, -4800, 233, 400);
const ENEMY_12 = new Enemy(-1800, -1800, 63, 150);

const ALL_ENEMIES = [ENEMY_1, ENEMY_2, ENEMY_3, ENEMY_4, ENEMY_5, ENEMY_6, ENEMY_7, ENEMY_8, ENEMY_9, ENEMY_10, ENEMY_11, ENEMY_12];
const PLAYER = new Player();

const CREATE_WINSCREEN = createWinScreen();

// Create the html for the winning screen to be ready
function createWinScreen() {
  const fragment = document.createDocumentFragment();

    const DIV1 = document.createElement('div');
    DIV1.classList.add('is-hidden','modal-overlay');
    const DIV2 = document.createElement('div');
    DIV2.classList.add('modal');
    const P1 = document.createElement('p');
    P1.innerHTML = 'YOU WIN - Congratulations !!';
    const P2 = document.createElement('p');
    P2.innerHTML = 'Please click the restart button for another game !';
    const BUTTON1 = document.createElement('button');
    BUTTON1.classList.add('restart-button');
    BUTTON1.innerHTML = 'Restart';

    DIV1.appendChild(DIV2);
    DIV2.appendChild(P1);
    DIV2.appendChild(P2);
    DIV2.appendChild(BUTTON1);
    fragment.appendChild(DIV1);

  document.body.appendChild(fragment);
}

// When this constructor is called it creates the winning screen object which can then have open and close methods called accordingly.
class WinScreen {
  constructor(overlay) {
    this.overlay = overlay;
    const restartButton = overlay.querySelector('.restart-button')
    restartButton.addEventListener('click', this.close.bind(this));
  }
  open() {
    this.overlay.classList.remove('is-hidden');
  }

  close() {
    this.overlay.classList.add('is-hidden');
    PLAYER.x = 200; PLAYER.y = 403;
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const ALLOWED_KEYS = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    PLAYER.handleInput(ALLOWED_KEYS[e.keyCode]);
});
