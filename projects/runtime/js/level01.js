var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'enemy',x:300,y:groundY-50},
                {type: 'reward',x:1000,y:groundY},
           
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            // Create a sawblade using the .x and .y property of each game item object
            if (gameItem.type == "sawblade"){
                createSawBlade(gameItem.x, gameItem.y)
            }
            if (gameItem.type == "enemy"){
                createEnemy(gameItem.x,gameItem.y) 
            }
            if (gameItem.type == "reward"){
                createReward(gameItem.x, gameItem.y)
            }
        }
        function createSawBlade(x,y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        function createEnemy(x,y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'#33cccc');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationVelocity = 10
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle.');
            game.changeIntegrity(-10);
            }
            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy.');
                game.increaseScore(100);
                enemy.fadeOut();
            }
            
           
        };
            
        function createReward(x,y) {
            var reward =  game.createGameItem('reward',25);
            var redSquare = draw.bitmap('img/reward.jpg');
            redSquare.x = -25;
            redSquare.y = -25;
            reward.addChild(redSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1;
            reward.rotationVelocity = 10
            reward.onPlayerCollision = function() {
                console.log('Reward Collected.');
                game.increaseScore(1000);
            }
        }
            
    };
    
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}