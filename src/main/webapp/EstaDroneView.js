var globalDroneVariables = {

    //Game
    cursors : null,
    websocket: null,
    equipo: null,

    //Messages
    texto : null,
    textoTiempo : null 

};

var partida = {

    tiempoRestantePartida: null,


    Pesqueros: {

        Barcos: []

    }, 

    Patrulleros:{

        Barcos: []

    }



};


function listener(){
    
   partida.Patrulleros.Barcos.forEach(function(item){

       item.activo = false;     

    });

    partida.Patrulleros.Barcos.find(this.id).activo = true;
}


var DroneViewState = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function DroneView(){
        Phaser.Scene.call(this, {key:"DroneView"});
    },

    preload: function(){
        //carga las imagenes al juego
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bote1', 'assets/bote1_h.png');
        this.load.image('patrullero1', 'assets/patrullero1_h.png');	
    },

    create: function(){ 

        globalDroneVariables.equipo = getTeamFromUrl();

        globalDroneVariables.cursors = this.input.keyboard.createCursorKeys();
        this.add.image(400, 300, 'sky');

        //PESQUERO
        var pesquero = this.matter.add.image(100, 200, 'bote1');
        pesquero.setFrictionAir(0.15);
        pesquero.setMass(30);
        pesquero.setFixedRotation();
        pesquero.setAngle(270);

        //PATRULLERO
        var patrullero = this.matter.add.image(200, 300, 'patrullero1');
        patrullero.setFrictionAir(0.15);
        patrullero.setMass(90);
        patrullero.setFixedRotation();
        patrullero.setAngle(270);
        patrullero.inputEnabled = true; 
        patrullero.events.onInputDown.add(listener, {id: 2});

        //Patrullero 2
        var patrullero2 = this.matter.add.image(300, 300, 'patrullero1');
        patrullero2.setFrictionAir(0.15);
        patrullero2.setMass(90);
        patrullero2.setFixedRotation();
        patrullero2.setAngle(270);
        patrullero2.inputEnabled = true;
        patrullero2.events.onInputDown.add(listener, {id: 3});
        
        this.matter.world.setBounds(0, 0, 800, 600);

        //CONEXION
        globalDroneVariables.websocket = new WebSocket('ws://localhost:8080/taller3/juego/' + globalDroneVariables.equipo);      
        

        //websocketAcciones = new WebSocket('ws://localhost:8080/taller3/acciones/');
        //textoTiempo = this.add.text(32, 32, 'Tiempo restante de partida: ' + time);


        var barcoPesquero = {
            id: 1,
            sprite: pesquero,           
            cantidadPesca: 0,
            combustible: 100,
            contadorAvisos: 0,
            vida: 100,
            activo: globalDroneVariables.equipo == "Pesquero"
        }

        var barcoPatrullero = {
            id: 2,
            sprite: patrullero,           
            armas:{
                ametralladora: {
                    cadencia: 2,
                    nivelDanio: 5
                },
                canion:  {
                    cadencia: 1,
                    nivelDanio: 10
                }
            },
            combustible: 100,
            vida: 100,
            activo: globalDroneVariables.equipo == "Patrullero"
        }

         var barcoPatrullero2 = {
            id: 3,
            sprite: patrullero2,           
            armas:{
                ametralladora: {
                    cadencia: 2,
                    nivelDanio: 5
                },
                canion:  {
                    cadencia: 1,
                    nivelDanio: 10
                }
            },
            combustible: 100,
            vida: 100,
            activo: false
        }
         
         
        partida.Patrulleros.Barcos.push(barcoPatrullero);
        partida.Patrulleros.Barcos.push(barcoPatrullero2);
        
        partida.Pesqueros.Barcos.push(barcoPesquero);


        console.log('create success');

    },

    update: function(){

        var change = false;

        //Se obtiene el bote activo que es controlado por el usuario (solo uno en cada momento)
        var boteActivo = null;
        if(globalDroneVariables.equipo == "Patrullero"){
            boteActivo = partida.Patrulleros.Barcos.find(function(input){
                return input.activo;
            });
        } else{
            boteActivo = partida.Pesqueros.Barcos.find(function(input){
                return input.activo;
            });

        } 





        //Se recibe la partida del servidor
        globalDroneVariables.websocket.onmessage = function(event) {
            if(event.data != null)
            {
                var partidaFromServer = JSON.parse(event.data);

                //movimiento from server
                partida.Patrulleros.Barcos.forEach(function(item){

                    let boat = partidaFromServer.Patrulleros.Barcos.find(function(input){
                        return input.id == item.id;
                    });

                    item.sprite.x = boat.sprite.x;
                    item.sprite.y = boat.sprite.y;
                    item.sprite.rotation = boat.sprite.rotation;


                });

                partida.Pesqueros.Barcos.forEach(function(item){

                    let boat = partidaFromServer.Pesqueros.Barcos.find(function(input){
                        return input.id == item.id;
                    });

                    item.sprite.x = boat.sprite.x;
                    item.sprite.y = boat.sprite.y;
                    item.sprite.rotation = boat.sprite.rotation;


                });


            }

        }










        //Calculo de movimiento
        if (globalDroneVariables.cursors.left.isDown){
            boteActivo.sprite.setAngularVelocity(-0.1);
            change = true;
        }
        else if (globalDroneVariables.cursors.right.isDown)
        {
            boteActivo.sprite.setAngularVelocity(0.1);
            change = true;
        }

        if (globalDroneVariables.cursors.up.isDown)
        {
            boteActivo.sprite.thrust(0.08);
            change = true;
        }     



        //Se envia el servidor toda la partida
        if (change){

            enviarJSON(partida);
        }




























        /*
	//Se actualiza la posicion de barcos en pantalla del cliente segun lo recibido desde el servidor (incluyendo la propia)

	globalDroneVariables.websocket.onmessage = function(event) {
	    if(event.data != null)
	    {

	    	//defino el jugador

	    	if(globalDroneVariables.jugador == null) 
	    	{
	    		let nombre = JSON.parse(event.data);
                globalDroneVariables.manejo = nombre;
	    		if(nombre == 'bote1')
	    		{                    
	    			globalDroneVariables.jugador = globalDroneVariables.bote1;
	    		}
	    		else 
	    		{
	    			if(nombre == 'patrullero1')
	    			{
	    				globalDroneVariables.jugador = globalDroneVariables.patrullero1;
	    			}

	    		}
	    	}
	    	else
	    	{
	  	    	let jugadorServer = JSON.parse(event.data);
	  	    	if(globalDroneVariables.jugador == globalDroneVariables.bote1 && jugadorServer.nombre != 'bote1'){
	  	    		globalDroneVariables.jugadorRemoto = globalDroneVariables.patrullero1;
	  	    	}
	  	    	else{
	  	    		if(globalDroneVariables.jugador == globalDroneVariables.patrullero1 && jugadorServer.nombre != 'patrullero1'){
		  	    		globalDroneVariables.jugadorRemoto = globalDroneVariables.bote1;
	  	    		}
	  	    	}
	  	    	if(globalDroneVariables.jugadorRemoto != null && !(typeof globalDroneVariables.jugadorRemoto === 'undefined') &&  jugadorServer.nombre != globalDroneVariables.manejo)
	  	    	{
	  	    		globalDroneVariables.jugadorRemoto.x = jugadorServer.x;
		  	    	globalDroneVariables.jugadorRemoto.y = jugadorServer.y;
		  	    	globalDroneVariables.jugadorRemoto.angle = jugadorServer.angle;
	  	    	}
	    	}
	    }
  };


    //Se informa al servidor la nueva posicion luego de realizar movimientos con el teclado

    globalDroneVariables.texto.setText("Controla la patrulla:" + globalDroneVariables.manejo);
	this.add.text(550, 0, "envia al servidor", { font: "14px Arial", fill: "#ff0044"});

	if (globalDroneVariables.jugador != null && !(typeof globalDroneVariables.jugador === 'undefined'))
    {		
		if (globalDroneVariables.cursors.left.isDown)
	    {
			globalDroneVariables.jugador.setAngularVelocity(-0.1);
	    }
	    else if (globalDroneVariables.cursors.right.isDown)
	    {
	    	globalDroneVariables.jugador.setAngularVelocity(0.1);
	    }

	    if (globalDroneVariables.cursors.up.isDown)
	    {
	    	globalDroneVariables.jugador.thrust(0.08);
	    }
        let jugadorServer = new JugadorServer(globalDroneVariables.manejo, globalDroneVariables.jugador.x, globalDroneVariables.jugador.y, globalDroneVariables.jugador.angle);

        enviarJSON(jugadorServer);

    }


        */
    }

});

myGame.scenes.push(DroneViewState);


/**************************
    AUXILIARY FUNCTIONS
***************************/


function getTeamFromUrl() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars["equipo"];
}



function enviarJSON(objeto) {
    let json = JSON.stringify(objeto);
    globalDroneVariables.websocket.send(json);
}


/*
function JugadorServer(nombre, x, y, angle)
{
	this.nombre = nombre;
	this.x = x;
	this.y = y;
	this.angle = angle;
}
*/
