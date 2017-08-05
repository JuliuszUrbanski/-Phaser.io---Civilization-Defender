var cursors, castle, ground, weapon, fireButton, player, bow, spaceKey, arrows, nextShot, reloadtxt, nextShot2, nextMonster, nextAttack, hitPlatform, ufo, playerHealthBar, bmd1, bmd2, bmd3, bmd4, healthBar, hp, velocityx, arrow_tutr, widthLife, widthLife1, totalLife, life, widthLifeM, totalLifeM, lifeM, laser;

var start = true;
var mouseTouchUp = false;
var reload = 2;
var monsterlife = 400;
var pluswidth = 0;

/*******************
    MONSTERS
********************/

var monster1 = 10;

var Gra = {
    create: function () {
        
        /*************************
                    GRA
        *************************/
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 300;
        game.world.setBounds(0, 0, 1700, 600);
        
        //*************************
        
		game.add.sprite(0, 0, 'game1back');
		ufo = game.add.sprite(1500, 300, 'ufo');
        ufo.scale.setTo(0.5, 0.5);
        ufo.anchor.setTo(0.5, 0.5);
        player = game.add.sprite(515, 393, 'player');
	    player.anchor.setTo(0.5, 0.5);
        
        
        var bmd = this.game.add.bitmapData(420, 45);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 420, 45);
		bmd.ctx.fillStyle = '#00685e';
		bmd.ctx.fill();
    
        var bglife1 = this.game.add.sprite(255, 40, bmd);
        bglife1.anchor.set(0.5);
        bglife1.fixedToCamera = true;
    
        bmd1 = this.game.add.bitmapData(400, 30);
        bmd1.ctx.beginPath();
		bmd1.ctx.rect(0, 0, 400, 30);
		bmd1.ctx.fillStyle = '#00f910';
		bmd1.ctx.fill();
        
        widthLife1 = new Phaser.Rectangle(0, 0, bmd1.width, bmd1.height);
        totalLife1 = bmd1.width;
    
        life1 = this.game.add.sprite(255 - bglife1.width/2 + 10, 40, bmd1);
        
        life1.anchor.y = 0.5;
        life1.cropEnabled = true;
        life1.crop(widthLife1);
        life1.fixedToCamera = true;
        
        var bmd2 = this.game.add.bitmapData(420, 45);
		bmd2.ctx.beginPath();
		bmd2.ctx.rect(0, 0, 420, 45);
		bmd2.ctx.fillStyle = '#00685e';
		bmd2.ctx.fill();
    
        var bglife = this.game.add.sprite(740, 40, bmd2);
        bglife.anchor.set(0.5);
        bglife.fixedToCamera = true;
    
        bmd3 = this.game.add.bitmapData(400, 30);
        bmd3.ctx.beginPath();
		bmd3.ctx.rect(0, 0, 400, 30);
		bmd3.ctx.fillStyle = '#00f910';
		bmd3.ctx.fill();
        
        widthLife = new Phaser.Rectangle(0, 0, bmd3.width, bmd3.height);
        totalLife = bmd3.width;
    
        life = this.game.add.sprite(740 - bglife.width/2 + 10, 40, bmd3);
        
        life.anchor.y = 0.5;
        life.cropEnabled = true;
        life.crop(widthLife);
        life.fixedToCamera = true;
        
        /*********************
              Monster HP
        *********************/
        
        bmd4 = this.game.add.bitmapData(50, 20);
        bmd4.ctx.beginPath();
		bmd4.ctx.rect(0, 0, 50, 20);
		bmd4.ctx.fillStyle = '#00f910';
		bmd4.ctx.fill();
        
        widthLifeM = new Phaser.Rectangle(0, 0, bmd4.width, bmd4.height);
        totalLifeM = bmd4.width;

        //*************************
        
        arrows = game.add.group();
        arrows.enableBody = true;
        arrows.physicsBodyType = Phaser.Physics.ARCADE;
        arrows.createMultiple(20, 'arrow');
        arrows.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetarrow);
        arrows.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
        arrows.setAll('checkWorldBounds', true);
        //*************************
        
        monsters = game.add.group();
        monsters.enableBody = true;
        monsters.physicsBodyType = Phaser.Physics.ARCADE;
        monsters.createMultiple(20, 'monster');
        monsters.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
        
        //********************
        
		castle = game.add.sprite(200, 80, 'castle');
        game.physics.enable(castle, Phaser.Physics.ARCADE);
        castle.body.allowGravity = false;
        castle.body.moves = false;
        
        arrow_tutr = game.add.sprite(930, 300 - 75, 'arrow_tutr');
        arrow_tutr.fixedToCamera = true;
        
        arrow_tutl = game.add.sprite(20, 300 - 75, 'arrow_tutl');
        arrow_tutl.fixedToCamera = true;
        
        this.platforms = this.game.add.group(this.game.world, 'platforms', false, true, Phaser.Physics.ARCADE);
        
        this.platforms.create(-10, game.height - 50, 'ground');
        this.platforms.create(755, game.height - 50, 'ground');
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        
        
        cursors = game.input.keyboard.createCursorKeys();
        bow = game.add.sprite(515, 395, 'bow');
        bow.anchor.set(0.5);
        
        ///**********************  
        
        reloadtxt = game.add.text(player.x - 40,player.y - 100, "Reloading...", { font: "15px Arial", fill: "#ffffff" });
        reloadtxt.visible = false; 
        
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
    },

    update: function (){
        game.physics.arcade.collide(monsters);
        
        life.updateCrop();
        life1.updateCrop();
        
        if(widthLife.width <= 0 || widthLife1.width <=0)
            {
                game.camera.focusOn(player);
                game.paused = true;
            }
        
        game.physics.arcade.collide(this.platforms,monsters,move);
        game.physics.arcade.collide(laser,castle,cropLife2);
        
        if((game.input.mousePointer.x + game.camera.x) > 530)
        {
            bow.rotation = game.physics.arcade.angleToPointer(bow);
        } 
        else if (game.input.mousePointer.x + game.camera.x < 530 && game.input.mousePointer.y > 400)
        {
              bow.rotation = game.physics.arcade.angleToXY(bow, 580, 600);  
        } 
        else if (game.input.mousePointer.x + game.camera.x < 530 && game.input.mousePointer.y < 400)
        {
            bow.rotation = game.physics.arcade.angleToXY(bow, 580, 0);    
        }
        
        if(monsters.countLiving() <=2){
        game.time.events.add(Phaser.Timer.SECOND * 4, createMonster, this);
        }
        bow.visible = start;
        
        if (cursors.left.isDown || game.input.mousePointer.x < 50)
        {
            game.camera.x -= 10;
        }
        else if (cursors.right.isDown || game.input.mousePointer.x > 950)
        {
            game.camera.x += 10;
        }      
        
        if (this.spaceKey.isDown)
        {        
            bow.visible = true;
            player.animations.add('shot');
            player.animations.play('shot', 30, false);  
        }
        
        arrows.forEachAlive(function (arrow) {
            arrow.rotation = arrow.body.angle;
        }, this);
        
//        monsters.forEachAlive(function (monster) {
//            if(monster.body.x >= 1430)
//                {
//                    createMonster.visible = false;
//                }
//        }, this);
        
	   for (var index in phaserKeys) {
		var key = phaserKeys[index];
		if (key.justUp) {
			firearrow();
            start = false;
		}
	   }
            game.physics.arcade.overlap(arrows, monsters, attacka, null, this);
    },
    
    render: function(){
        game.debug.text('Demo', 10, 30);
        if(reloadtxt.visible = true){
            if(nextShot2>game.time.now){
                reloadtxt.visible = false;
            }
            nextShot2 = game.time.now + 1000;
            game.debug.text(game.input.mousePointer.x + game.camera.x, 200, 100);
            game.debug.text(game.input.mousePointer.y, 200, 130);
            game.debug.text(monsters.countLiving(), 200, 160);
        }
      
    },
    
    init: function(){
        var keys = [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.ENTER];
	   phaserKeys = game.input.keyboard.addKeys(keys);
	   game.input.keyboard.addKeyCapture(keys);
    }

}

function resetarrow(arrow) {
	arrow.kill();
}

function touchDown() {
	mouseTouchUp = true;

	firearrow();
}
 
function touchUp() {
	mouseTouchUp = false;
}
 
function firearrow() {
    if(nextShot>game.time.now){
        reloadtxt.visible = true;
        return;
    } else{
        var arrow = arrows.getFirstExists(false);
        if (arrow) {
            if(game.input.mousePointer.x + game.camera.x < 580 && game.input.mousePointer.y < 400)
            {
                arrow.reset(bow.x + 25, bow.y + 20);
                arrow.body.velocity.x = 800;
                game.physics.arcade.moveToXY(arrow, 580, 0, 480);
            } else if(game.input.mousePointer.x + game.camera.x < 580 && game.input.mousePointer.y > 400)
            {
                arrow.reset(bow.x, bow.y + 20);
                arrow.body.velocity.x = 800;
                game.physics.arcade.moveToXY(arrow, 580, 600, 480);                       
            } else {
                arrow.reset(bow.x, bow.y + 20);
                arrow.body.velocity.x = 800;
                game.physics.arcade.moveToPointer(arrow, 480);
            }
        }
    }
    nextShot = game.time.now + 1000;
}

function createMonster() {

        if(nextMonster>game.time.now)
        { return; }
        else {
            var monster = monsters.getFirstExists(false);
            if (monster) {
                monster.body.moves = true;
                monster.hp = 2;
                monster.velocityx = -50;
                monster.reset(ufo.x, ufo.y + 70);
            }
        }
        nextMonster = game.time.now + 4000;
}

function attackMon(monster)
{
    if(monster.nextAttack>game.time.now)
        {
            return;
        } else {
            laser = game.add.sprite(monster.x - 25, monster.y - 80, 'laser');
            game.physics.enable(laser, Phaser.Physics.ARCADE);
            laser.body.allowGravity = false;
            laser.body.velocity.x= -200; 
        }
    
    monster.nextAttack = game.time.now + 5000;
}

function attacka(arrow, monster) {
	arrow.kill();
    effectHit(arrow);
    monster.animations.add('monatt');
    monster.animations.play('monatt', 10, false);  
    emitter.on = false;
    monster.hp -= 1;
    monster.velocityx = -35;
    if(monster.hp == 0)
    {
	   monster.kill();
        cropLife();
    }
}

function cropLife(){
    if(bmd3.width > 0)
            {
            game.add.tween(widthLife).to( { width: (this.widthLife.width - monster1) }, 200, Phaser.Easing.Linear.None, true);
            }
    }

function cropLife2(){
    castle.body.velocity.x= 0;
    if(bmd1.width > 0)
            {
            game.add.tween(widthLife1).to( { width: (widthLife1.width - monster1) }, 200, Phaser.Easing.Linear.None, true);
            laser.destroy();
            }
    }

function effectHit(arrow){
    emitter = game.add.emitter(arrow.x + 50, arrow.y, 100);
        
    emitter.makeParticles('blood');
    emitter.minParticleSpeed.setTo(-300, 30);
    emitter.maxParticleSpeed.setTo(300, 100);
    emitter.minParticleScale = 0.3;
    emitter.maxParticleScale = 0.5;
    emitter.gravity = 250;
    emitter.flow(60, 1000, 5, -1);
}

function move(platform,monster){
  monster.body.velocity.x=-50;
    
                if(monster.body.x <= 1200)
                {
                    //attackMon(monster);
                }
                
                if(monster.body.x <= 960)
                {
                    monster.body.velocity.x=0;
                    monster.body.moves = false;
                }
}