var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
         var buildings = [];    
        
        // add objects for display in background
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with an obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'#000033');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var shape = draw.bitmap('img/moon.png');
            background.addChild(shape);
            shape.x = 1000;
            shape.y = 20;
            shape.scaleX = .4;
            shape.scaleY = .4;
            
            var circle;
            for(var i=0;i<100;i++) {
                circle = draw.circle(3,'white','LightGray',2);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
             
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
             var buildingHeight = 300;
            var building;
            for(var i=0;i<5;++i) {
                building = draw.rect(75,buildingHeight,'LightGray','Black',1);
                building.x = 200*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }    
            
            // TODO 4: Part 1 - Add a tree //*ADD MORE TREES LATER!!!
            tree = draw.bitmap('img/tree.png');
            tree.x = 900;
            tree.y = 200; //ground level *don't change
            background.addChild(tree);
            
            
            
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x-2
            if(tree.x < -200) {
                tree.x = canvasWidth;
             }
            // TODO 5: Part 2 - Parallax
           for(var i=0; i < buildings.length; i++){
                var building = buildings[i]
                building.x = building.x-0.5
                if(building.x < -200) {
                    building.x = canvasWidth;
                }
           }
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
