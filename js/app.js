var game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload() {
        game.load.image('sky', 'assets/day background.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/cashen.png');
       // game.load.spritesheet('dude', 'assets/scottHD.png', 52.5, 65.25);
       game.load.spritesheet('dude', 'assets/dir.png', 52.5, 65.25);
        game.load.spritesheet('ramona', 'assets/ramona.png', 52.5, 65.25);
    }

    var player;
    var ramona;
    var platforms;
    var cursors;
    var background;

    var stars;
    var cash = 0;
    var count = 0;
    var cashText;
    var spree;

    function create() {

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        background = game.add.sprite(-240, -480, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 18, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
       /* var ledge = platforms.create(600, 350, 'ground');
        ledge.body.immovable = true;

        ledge = platforms.create(-190, 350, 'ground');
        ledge.body.immovable = true;*/

        // The player and its settings
       
        /*
        
            ramona = game.add.sprite(5, game.world.height - 135, 'ramona');
           // ramona = platforms.create(5, game.world.height - 135, 'ramona');
            ramona.scale.set(1.89);
           // ramona.body.immovable = true;
            ramona.animations.add('ramonaStay', [0,1,2,3,4,5], 5, true);
            ramona.animations.play('ramonaStay');*/

            player = game.add.sprite(500, game.world.height - 145, 'dude');
            player.scale.set(1.89);
            //  We need to enable physics on the player
            game.physics.arcade.enable(player);

            //  Player physics properties. Give the little guy a slight bounce.
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 500;
            player.body.collideWorldBounds = true;

            //  Our two animations, walking left and right.
           // player.animations.add('left', [0, 1, 2, 3], 10, true);
           // player.animations.add('right', [5, 6, 7, 8], 10, true);

           //scott pilgrim
           /*
            player.animations.add('right', [16, 17, 18, 19,20,21,22,23], 10, true);
            player.animations.add('left', [24,25,26,27,28,29,30,31], 10, true);
            player.animations.add('stayLeft', [0,1,2,3,4,5,6,7], 10, true);
            player.animations.add('stayRight', [8,9,10,11,12,13,14,15], 10, true);*/

         //  player.animations.add('right', [16, 17, 18, 19,20,21], 10, true);
          //  player.animations.add('left', [24,25,26,27,28,29], 10, true);
             player.animations.add('right', [3, 4,5, 6,7,8], 10, true);
             player.animations.add('left', [9,10,11,12,13,14], 10, true);
            player.animations.add('stayRight', [0,1,2], 5, true);


        //  Finally some stars to collect 
        stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        stars.enableBody = true;

        //  Here we'll create 12 of them evenly spaced apart
       for (var i = 0; i < 20; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = stars.create(i * 70, 200, 'star');

            //  Let gravity do its thing
            star.body.gravity.y = 900;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.5;
        }

        //  The score
        cashText = game.add.text(16,16 , 'Cash: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        
    }
    function update() {
        var face = '';
        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);

        game.physics.arcade.collide(stars, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -300;
            player.animations.play('left');
            face = 'left';
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 300;
            player.animations.play('right');
            face = 'right';
        }
        else //if(cursors.right.isDown)
        {  
             player.animations.play('stayRight');
            //  Stand still
            //player.animations.stop();
            
            //player.frame = 4;
        }
        
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = -350;
        }

    }

    function collectStar (player, star) {
        // Removes the star from the screen

        star.kill();

        //  Add and update the score
        cash += 10;
        count+=1;
        cashText.text = 'Cash: ' + cash;
        
        if(count===10){
            //spree text
             if(cash===100){
                spree = game.add.text(200, 80, 'Pwede naka mag kaon ug siomai sa KABSAT', { fontSize: '32px', fill: '#000' });
            }else if(cash===500){
                spree.alpha = 0.0;
                spree = game.add.text(150, 60, 'Pwede naka mag unli siomai sa balay', { fontSize: '32px', fill: '#000' });
            }else if (cash===1000){
                spree.alpha = 0.0;
                spree = game.add.text(150, 60, 'Naa nakay pang register para sa Mt. Dulang-Dulang', { fontSize: '32px', fill: '#000' });
            }else if (cash===1500){
                spree.alpha = 0.0;
                spree = game.add.text(150, 60, 'Pwede naka maka palit ug bibigirl', { fontSize: '32px', fill: '#000' });
            }else{
                 spree.alpha = 0.0;
            }

            count=0;
            stars = game.add.group();

            var num = Math.floor(Math.random() * 30)+10; 

            //  We will enable physics for any star that is created in this group
            stars.enableBody = true;

            //  Here we'll create 12 of them evenly spaced apart
           for (var i = 0; i < num; i++)
            {
                //  Create a star inside of the 'stars' group
                var star = stars.create(i * 40, 200, 'star');

                //  Let gravity do its thing
                star.body.gravity.y = 900;

                //  This just gives each star a slightly random bounce value
                star.body.bounce.y = 0.7 + Math.random() * 0.5;
                star.body.bounce.x = 0.7 + Math.random() * 0.5;

            }
        }         
    }
