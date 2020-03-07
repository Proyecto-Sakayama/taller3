class vistaLateral extends Phaser.Scene{
	
	constructor(){
		super({key: 'vistaLateral', active: true});
		
	}
	
	create(){
		this.add.text(220,550, "vistaLateral...");
		//this.scene.start("Running vistaLateral");
	}
	
}