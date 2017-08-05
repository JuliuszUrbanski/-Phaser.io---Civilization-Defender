var GAME_WIDTH = 1000;
var GAME_HEIGHT = 600;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '');

game.state.add('Boot', Boot);
game.state.add('Load', Load);
game.state.add('Gra', Gra);

game.state.start('Boot');