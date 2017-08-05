var Load = {
	
	// The preload function is another standard Phaser function that we
	// use to define and load our assets
    preload : function() { 
        var dir = 'assets/';
        
        game.load.image('game1back', dir + 'game1_background.png');
        game.load.image('castle', dir + 'castle.png');
        game.load.image('char', dir + 'char_shot.png');
        game.load.image('bow', dir + 'bow.png');
        game.load.image('ground', dir + 'ground.png');
        game.load.image('arrow', dir + 'arrow.png');
        game.load.spritesheet('monster2', dir + 'monstertest.png', 126, 150, 3);
        game.load.spritesheet('monster', dir + 'monster2.png', 63, 100, 3);
        game.load.image('laser', dir + 'laser.png');
        game.load.image('ufo', dir + 'ufo.png');
        game.load.image('blood', dir + 'blood.png');
        game.load.image('arrow_tutr', dir + 'arrow_tutr.png');
        game.load.image('arrow_tutl', dir + 'arrow_tutl.png');
        game.load.spritesheet('player', dir + 'shoting.png', 135, 150, 2);
    },
    
    create: function() {
        // Call the menu state
        game.state.start('Gra');
    }
};