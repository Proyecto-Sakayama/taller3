var preloadState = new Phaser.Class({
    
    Extends: Phaser.Scene,
    Initialize:
    function Preload(){
        
        Phaser.Scene.call(this, {key: "Preload"});
    },
    
    preload: function(){
            
    },
    
    
    create: function(){
        
        console.log("Preload and create");
        game.scene.start("DroneView");
    }
    
    
});

myGame.scenes.push(preloadState);

 