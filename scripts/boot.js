var Boot = {
    preload: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize = true;
    },
    
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('Load');
        game.stage.disableVisibilityChange = true;
    }
};