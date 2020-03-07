
class Jugador {

	constructor(equipo, nombreBarco, sprite) {
        this.equipo = equipo;
        this.nombreBarco = nombreBarco;
        this.sprite = sprite;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
    }


    get getEquipo () { return this.equipo; }

    get getBarco () { return this.nombreBarco; }
    
    get getSprite () { return this.sprite; }

    get getX () { return this.x; }

    get getY () { return this.y; }
    
    get getAngle () { return this.angle; }
    
    set setX (posX) { this.x = posX; }

    set setY (posY) { this.y = posY; }
    
    set setAngle (posAngle) { this.angle = posAngle; }


    
}

class JugadorServer{
	constructor(nombre, x, y, angle){
	this.nombre = nombre;
	this.x = x;
	this.y = y;
	this.angle = angle;
	}
}




 class vistaAerea extends Phaser.Scene{
	
	constructor(){
		// super({key: 'vistaAerea', active: true});
		super("vistaAerea");
		this.jugador = null;
		this.jugador1 = null;
		this.jugador2 = null;
		
		this.sprite = null;
		
		this.cursors = null;
		this.bote1 = null;
		this.patrullero1 = null;
		
		this.manejo = "bote1";
		this.texto = null;
		this.textoTiempo = null;
		this.time = null;
		this.jugadorRemoto = null;
		this.selBoton1 = null;
		this.equipo = "Pesquero";
		this.websocket = null;
		this.selBoton2 = null;
		this.jugadorServerRecibido = null;
		this.jugadorServerEnviado = null;
		this.mensaje = "{ \"accion\" : \"tiempo\", \"tiempoRestante\" : \" " + 0 + " \"}";

	}
	
	
	preload(){
		   // carga las imagenes al juegoç
	    this.load.image('sky', 'assets/sky.png');
	    this.load.image('bote1', 'assets/bote1_h.png');
	    this.load.image('patrullero1', 'assets/patrullero1_h.png');
	    this.load.image('botonBote1', 'assets/btn_bote.png');
	    this.load.image('botonPatrullero1', 'assets/btn_patrullero.png');	
	}
	
	create(){
		// this.scene.start("Running vistaAerea");
		
		this.matter.world.setBounds(0, 0, 800, 600);
		this.add.image(400, 300, 'sky');
		this.add.text(120,110, "Escena de Vista aerea");		
		
				
		this.sprite = this.matter.add.image(100, 200, 'bote1');
		this.sprite.setFrictionAir(0.15);
		this.sprite.setMass(30);
		this.sprite.setFixedRotation();
		this.sprite.setAngle(270);
		this.jugador1 = new Jugador("Pesquero", "PES_LIG_1", this.sprite);

        
		this.sprite = this.matter.add.image(200, 300, 'patrullero1');
		this.sprite.setFrictionAir(0.15);
		this.sprite.setMass(90);
		this.sprite.setFixedRotation();
		this.sprite.setAngle(270);
		this.jugador2 = new Jugador("Patrullero", "PAT_LIG_1", this.sprite);
  

        this.websocket = new WebSocket('ws://localhost:8080/taller3/juego/' + this.equipo);
        this.texto = this.add.text(550, 580, "Controla la patrulla:" + this.manejo, { font: "14px Arial", fill: "#ff0044"});
	      
	    // websocketAcciones = new
		// WebSocket('ws://localhost:8080/taller3/acciones/');
        // textoTiempo = this.add.text(32, 32, 'Tiempo restante de partida: ' +
		// time);

	      this.cursors = this.input.keyboard.createCursorKeys();
		
		
	}
	
	enviarJSON(objeto) {
	    let json = JSON.stringify(objeto);
	    websocket.send(json);
	}
	
	
	getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}
	
	
	
	
	update(){
		
		
		
		// LOGICA PARA MOVIMIENTOS
		
		this.websocket.onmessage = function(event) {
		  
		  	    	var jugadorServer = JSON.parse(event.data);
		  	    	
		  	    		this.jugador1.setX(jugadorServer.x);
		  	    		this.jugador1.setY(jugadorServer.y);
		  	    		this.jugador1.setAngle(jugadorServer.angle);		  	    	
		    	
		    
	  };
	  
	

			if (this.cursors.left.isDown)
		    {
				this.jugador1.setAngularVelocity(-0.1);
		    }
		    else if (this.cursors.right.isDown)
		    {
		    	this.jugador1.setAngularVelocity(0.1);
		    }
		
		    if (this.cursors.up.isDown)
		    {
		    	this.jugador1.thrust(0.08);
		    }
	        let jugadorServer = new JugadorServer("Pesquero", this.jugador1.x, this.jugador1.y, this.jugador1.angle);
	        let json = JSON.stringify(jugadorServer);
		    websocket.send(json);
	        
	   }
		

	
}