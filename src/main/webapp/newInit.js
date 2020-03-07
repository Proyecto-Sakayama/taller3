const config = {
		width: 320,
		height: 180,
		parent: "container",
		type: Phaser.AUTO,
		
		scene:[newDroneView],
		physics:{
			default: "arcade",
			arcade:{
				gravity: {
	                x: 0,
	                y: 0
	            }
			}
		}
			
		
}

var game = new Phaser.Game(config);

function preload(){
	   this.load.image('sky', 'assets/sky.png');
	    this.load.image('bote1', 'assets/bote1_h.png');
	    this.load.image('patrullero1', 'assets/patrullero1_h.png');
	    this.load.image('botonBote1', 'assets/btn_bote.png');
	    this.load.image('botonPatrullero1', 'assets/btn_patrullero.png');	
}


function create(){
	this.bote1 = this.physics.add.image(50, 100, 'bote1');
/*	this.bote1.setCollideWorldBounds(true);  
	this.bote1.setFrictionAir(0.15);
    this.bote1.setMass(30);
    this.bote1.setFixedRotation();
    this.bote1.setAngle(270);
  */  
    
	

	
}

function update(){
	this.cursor = this.input.keyboard.createCursorKeys();
	if(this.cursor.right.isdown){
		this.bote1.x++;
	}
	
	if(this.cursor.left.isdown){
		this.bote1.x--;
	}
}