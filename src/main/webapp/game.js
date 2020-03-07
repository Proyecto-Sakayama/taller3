var config ={
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		physics: {
	    default: 'matter',
	    matter: {
	        gravity: {
	            x: 0,
	            y: 0
	        }
	    }
		},
		//backgroundColor: 0x000000,
		scene: [vistaAerea] //, vistaLateral
		
}



var game = new Phaser.Game(config);