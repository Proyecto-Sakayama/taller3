var parameters = {
    velocidadRotacion: 0.07, //0.007
    aceleracion: 0.04, // 0.004
    distanciaAviso: 150,
    tiempoEntreAvisos: 3, //seconds
    baseConsumoCombustible: 0.05,  //Barcos pesados
    cantidadAvisosParaDisparar: 2,
    masaBarcosPesados: 90,
    masaBarcosLivianos: 45,
    masaHelicoptero: 22,
    masaBote: 32,
    milla200_distancia: 100,
    segundosChequeoTormenta: 30
};


var globalDroneVariables = {

    //Game
    websocket: null,
    websocketTime: null,
    equipo: null,
    barcosCargados: 0,
    spotlight: null,
    distanciaAviso: 150,
    enemigoActivo: null,
    //Sprints
    fish: null,
    pesquero: null,
    milla200: null,
   
    
    //Messages
    texto: null,
    textoTiempo: null,
    textoTormenta: null,
    textoPesca: null,

    //Keyboard controls
    moverArriba: null,
    moverIzquierda: null,
    moverDerecha: null,

    cambiarBarcoActivo: null,
    seleccionarBarcoPesado: null,
    seleccionarBarcoLiviano: null,
    desacoplarHelicoptero: null,
    desacoplarBote: null,
    avisarPesquero: null,
    dispararAmetralladora: null,
    dispararCanion: null,
    inmovilizarPesquero: null,
    iniciarTormenta: null,

    avisarPesqueroJustPressed: false,

    //Info vehiculos
    InfoVehiculo_Info1: null,
    InfoVehiculo_Info2: null,
    InfoVehiculo_Info3: null,
    InfoVehiculo_Info4: null,
    InfoVehiculo_Info5: null,
    InfoVehiculo_Info1T: null,
    InfoVehiculo_Info2T: null,
    InfoVehiculo_Info3T: null,
    InfoVehiculo_Info4T: null,
    InfoVehiculo_Info5T: null
};

var partida = {
    tiempoRestantePartida: null,
    hayTormenta: false,
    ultimoChequeoTormenta: 0,
    Pesqueros: {
        Barcos: []
    },
    Patrulleros: {
        Barcos: []
    },
 Disparo: {
        existe: false,
        patrullero: null,
        pesquero: null,
        arma: null,
        impacto: false
    },
    Pesca: {
        BancoPeces: []
    }

};

var DroneViewState = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function DroneView() {
        Phaser.Scene.call(this, { key: "DroneView" });
    },

    /************************************************************************************************************************************************

                                                                        PRELOAD

    *************************************************************************************************************************************************/

    preload: function () {
        //carga las imagenes al juego
        this.load.image('water', 'assets/water.jpg');
        this.load.image('fishes', 'assets/fishes.png');
        this.load.image('bote1', 'assets/bote1_h.png');
        this.load.image('heli', 'assets/heli1.png');
        this.load.image('patrullero1', 'assets/patrullero1_2.png');
        this.load.image('mask', 'assets/mask.png');
        this.load.image('panel', 'assets/panel.png');
        //////////
       
        
        /////////
    },



    /************************************************************************************************************************************************

                                                                        CREATE

    *************************************************************************************************************************************************/

    create: function () {
    	
        globalDroneVariables.equipo = getTeamFromUrl();

        globalDroneVariables.desacoplarHelicoptero = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        globalDroneVariables.desacoplarBote = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        globalDroneVariables.avisarPesquero = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        globalDroneVariables.dispararAmetralladora = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        globalDroneVariables.dispararCanion = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        globalDroneVariables.inmovilizarPesquero = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        globalDroneVariables.iniciarTormenta = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        globalDroneVariables.cambiarBarcoPropio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        globalDroneVariables.cambiarBarcoEnemigo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        globalDroneVariables.moverArriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        globalDroneVariables.moverIzquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        globalDroneVariables.moverDerecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);  


        this.matter.world.setBounds(0, 0, 1200, 650);
        var map = this.add.image(600, 325, 'water');
        var panel = this.add.image(1432, 325, 'panel');

        /***********************************************

        MILLA 200

        ************************************************/
        var graphics = this.add.graphics();
        globalDroneVariables.milla200 = new Phaser.Curves.Line(new Phaser.Math.Vector2(0, parameters.milla200_distancia), new Phaser.Math.Vector2(1200, parameters.milla200_distancia));
        graphics.clear();
        graphics.lineStyle(2, 0xffffff, 1);

        globalDroneVariables.milla200.draw(graphics);
        
        globalDroneVariables.spotlight = this.make.sprite({
            x: 200,
            y: 150,
            key: 'mask',
            add: false
        });
        //map.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);
    	
      //BANCO DE PECES
        globalDroneVariables.fish = this.add.image(50, 50,'fishes');
        globalDroneVariables.fish.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);
        //this.physics.add.overlap(pesquero, fish, null, null, this);
        var fish2 = this.add.image(100, 350,'fishes');
        fish2.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);
        
        var fish3 = this.add.image(150, 650,'fishes');
        fish3.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);
        

        //PESQUEROS       
        globalDroneVariables.pesquero = this.matter.add.image(100, 200, 'bote1');
        globalDroneVariables.pesquero.setFrictionAir(0.15);
        globalDroneVariables.pesquero.setMass(parameters.masaBarcosLivianos);
        globalDroneVariables.pesquero.setFixedRotation();
        globalDroneVariables.pesquero.setAngle(270);
        globalDroneVariables.pesquero.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);
        
        
        

        var pesquero2 = this.matter.add.image(200, 300, 'patrullero1');
        pesquero2.setFrictionAir(0.15);
        pesquero2.setMass(parameters.masaBarcosPesados);
        pesquero2.setFixedRotation();
        pesquero2.setAngle(270);
        pesquero2.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);


        //PATRULLEROS
        var patrullero = this.matter.add.image(300, 300, 'bote1');
        patrullero.setFrictionAir(0.15);
        patrullero.setMass(parameters.masaBarcosLivianos);
        patrullero.setFixedRotation();
        patrullero.setAngle(270);
        patrullero.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var patrullero2 = this.matter.add.image(400, 300, 'patrullero1');
        patrullero2.setFrictionAir(0.15);
        patrullero2.setMass(parameters.masaBarcosPesados);
        patrullero2.setFixedRotation();
        patrullero2.setAngle(270);
        patrullero2.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var helicopter = this.matter.add.image(400, 300, 'heli');
        helicopter.setFrictionAir(0.15);
        helicopter.setMass(parameters.masaBarcosPesados);
        helicopter.setFixedRotation();
        helicopter.setAngle(270);
        helicopter.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var boteSprite = this.matter.add.image(400, 300, 'bote1');
        boteSprite.setFrictionAir(0.15);
        boteSprite.setMass(parameters.masaBarcosPesados);
        boteSprite.setFixedRotation();
        boteSprite.setAngle(270);
        boteSprite.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);
        
        
        
        //CONEXION JUEGO
        globalDroneVariables.websocket = new WebSocket('ws://localhost:8080/taller3/juego/' + globalDroneVariables.equipo);

        //CONEXION TIMER
        globalDroneVariables.websocketTime = new WebSocket('ws://localhost:8080/taller3/acciones/');
        globalDroneVariables.textoTiempo = this.add.text(1220, 32, 'Tiempo: ' + formatTime(partida.tiempoRestantePartida));

        globalDroneVariables.textoTormenta = this.add.text(1220, 52, 'No hay tormenta');

        //PANEL DERECHO - INICIALIZACION DE TEXTOS

        this.add.text(1220, 72, 'INFO VEHICULO ');

        globalDroneVariables.InfoVehiculo_Info1T = this.add.text(1220, 100, ' ');
        globalDroneVariables.InfoVehiculo_Info1 = this.add.text(1220, 120, ' ');
        globalDroneVariables.InfoVehiculo_Info2T = this.add.text(1220, 150, ' ');
        globalDroneVariables.InfoVehiculo_Info2 = this.add.text(1220, 170, ' ');
        globalDroneVariables.InfoVehiculo_Info3T = this.add.text(1220, 200, ' ');
        globalDroneVariables.InfoVehiculo_Info3 = this.add.text(1220, 220, ' ');
        globalDroneVariables.InfoVehiculo_Info4T = this.add.text(1220, 250, ' ');
        globalDroneVariables.InfoVehiculo_Info4 = this.add.text(1220, 270, ' ');
        globalDroneVariables.InfoVehiculo_Info5T = this.add.text(1220, 300, ' ');
        globalDroneVariables.InfoVehiculo_Info5 = this.add.text(1220, 320, ' ');

        this.add.text(1220, 390, 'CONTROLES');
        this.add.text(1220, 430, 'CURSORES: ');
        this.add.text(1220, 450, 'Mover barco');
        this.add.text(1220, 470, 'SHIFT: Cambiar');
        this.add.text(1220, 490, 'barco propio'); 

        if(globalDroneVariables.equipo == "Patrullero"){      
            this.add.text(1220, 510, 'CTRL: Cambiar');
            this.add.text(1220, 530, 'enemigo');
            this.add.text(1220, 550, 'H: Helicoptero');
            this.add.text(1220, 570, 'B: Bote');
            this.add.text(1220, 590, 'A: Aviso');
            this.add.text(1220, 610, 'Z: Metralleta');
            this.add.text(1220, 630, 'X: Canion');
        }

        //DEFINICION DE OBJETOS

        var barcoPesquero = {
            id: 1,
            type: "B",
            size: "Liviano",
            sprite: globalDroneVariables.pesquero,
            cantidadPesca: 0,
            combustible: 100000,
            contadorAvisos: 0,
            ultimoAvisoRecibido: null,
            vida: 100,
            activo: globalDroneVariables.equipo == "Pesquero",
            hundido: false,
            regresando: false
        }

        var barcoPesquero2 = {
            id: 2,
            type: "B",
            size: "Pesado",
            sprite: pesquero2,
            cantidadPesca: 0,
            combustible: 100000,
            contadorAvisos: 0,
            ultimoAvisoRecibido: null,
            vida: 100,
            activo: false,
            hundido: false,
            regresando: false
        }


        var barcoPatrullero = {
            id: 3,
            type: "B",
            size: "Liviano",
            sprite: patrullero,
            armas: {
                ametralladora: {
                    cadencia: 2,
                    nivelDanio: 5,
                    alcance: 75,
                    ultimoDisparo: null
                }
            },
            combustible: 100,
            activo: globalDroneVariables.equipo == "Patrullero",
            regresando: false
        }


        var helicoptero = {
            id: 5,
            type: "H",
            acoplado: true,
            sprite: helicopter,
            combustible: 100,
            activo: false,
            regresando: false
        }

        var boteOb = {
            id: 6,
            type: "L",
            acoplado: true,
            sprite: boteSprite,
            combustible: 100,
            activo: false,
            regresando: false
        }
        
        var barcoPatrullero2 = {
            id: 4,
            type: "B",
            size: "Pesado",
            sprite: patrullero2,
            armas: {
                ametralladora: {
                    cadencia: 1,
                    nivelDanio: 5,
                    alcance: 75,
                    ultimoDisparo: null
                },
                canion: {
                    cadencia: 3,
                    nivelDanio: 10,
                    alcance: 150,
                    ultimoDisparo: null
                }
            },
            combustible: 100,
            activo: false,
            helicoptero: helicoptero,
            bote: boteOb
        }
        
        var bancoPeces1 = {
                id: 8,
                activo: true,
                sprite: globalDroneVariables.fish,
                peces: 10,
        }

        var bancoPeces2 = {
                id: 9,
                activo: true,
                sprite: fish2,
                peces: 10,
        }

        var bancoPeces3 = {
                id: 10,
                activo: true,
                sprite: fish3,
                peces: 10,
        }
        partida.Pesca.BancoPeces.push(bancoPeces1);
        partida.Pesca.BancoPeces.push(bancoPeces2);
        partida.Pesca.BancoPeces.push(bancoPeces3);
        
        partida.Patrulleros.Barcos.push(barcoPatrullero);
        partida.Patrulleros.Barcos.push(barcoPatrullero2);
        partida.Pesqueros.Barcos.push(barcoPesquero);
        partida.Pesqueros.Barcos.push(barcoPesquero2);
        
        //COLLISSIONS
        //Todos excepto el helicóptero colisionan con los pesqueros
        var colisionesConPesqueros = this.matter.world.nextCategory();
        barcoPesquero.sprite.setCollisionCategory(colisionesConPesqueros);
        barcoPesquero2.sprite.setCollisionCategory(colisionesConPesqueros);
        
        //Todos excepto el helicóptero colisionan con los patrullero 2
        var colisionesConPatrulleroLiviano = this.matter.world.nextCategory();
        barcoPatrullero.sprite.setCollisionCategory(colisionesConPatrulleroLiviano);
        
        //Todos excepto el helicóptero y bote colisionan con los patrullero pesado
        var colisionesConPatrulleroPesado = this.matter.world.nextCategory();
        barcoPatrullero2.sprite.setCollisionCategory(colisionesConPatrulleroPesado);
        boteOb.sprite.setCollisionCategory(colisionesConPatrulleroPesado);
        

        barcoPesquero.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroLiviano, colisionesConPatrulleroPesado]);
        barcoPesquero2.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroLiviano, colisionesConPatrulleroPesado]);
        barcoPatrullero.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroPesado]);
        boteOb.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroLiviano]);
        barcoPatrullero2.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroLiviano]);
        
        console.log('create success');
        
    },

    /************************************************************************************************************************************************

                                                                        UPDATE

    *************************************************************************************************************************************************/


    update: function () {
    	
        var change = false;

        if(partida.ultimoChequeoTormenta == 0 || partida.ultimoChequeoTormenta == null)
        {
        	partida.ultimoChequeoTormenta = partida.tiempoRestantePartida;
        }
        if(partida.ultimoChequeoTormenta - partida.tiempoRestantePartida >= parameters.segundosChequeoTormenta)
        {
        	partida.ultimoChequeoTormenta = partida.tiempoRestantePartida;
        	var randomTormenta = Phaser.Math.Between(1, 10);
        	if(randomTormenta < 5)
        	{
        		partida.hayTormenta = true;
        		globalDroneVariables.textoTormenta.setText('Hay tormenta!!');
        	}
        	else
        	{
        		partida.hayTormenta = false;
        		globalDroneVariables.textoTormenta.setText('No hay tormenta');
        	}
        }
        /***********************************************

        SELECCION DE VEHICULO ACTIVO

        ************************************************/


        var vehiculoActivo = null;
        if (globalDroneVariables.equipo == "Patrullero") {
            vehiculoActivo = partida.Patrulleros.Barcos.find(function (input) {
                return input.activo;
            });

        } else {
            vehiculoActivo = partida.Pesqueros.Barcos.find(function (input) {
                return input.activo;
            });
            if(vehiculoActivo.hundido){
                vehiculoActivo = partida.Pesqueros.Barcos.find(function (input) {
                    return !input.hundido;
                });
            }

        }

        if (vehiculoActivo == undefined || vehiculoActivo == null){
            var boatWithHelicopter = partida.Patrulleros.Barcos.find(function (input) {

                return typeof input.helicoptero !== "undefined";
            });

            if(boatWithHelicopter.helicoptero.activo){
                vehiculoActivo = boatWithHelicopter.helicoptero;
            }else if(boatWithHelicopter.bote.activo){
                vehiculoActivo = boatWithHelicopter.bote;
            }
        }



        /***********************************************

        IDENTIFICACION DE ENEMIGOS EN RANGO Y SELECCION DE ACTIVO

        ************************************************/



        if(globalDroneVariables.equipo == "Patrullero"){

            var barcosEnemigosEnRango = [];

            partida.Pesqueros.Barcos.forEach(function(item){
                var distance = Phaser.Math.Distance.Between(vehiculoActivo.sprite.x, vehiculoActivo.sprite.y, item.sprite.x, item.sprite.y);

                if(distance <= parameters.distanciaAviso && !item.hundido){
                    barcosEnemigosEnRango.push(item);
                }
            });

            if(!barcosEnemigosEnRango.length){
                globalDroneVariables.enemigoActivo = null;
            }else if(globalDroneVariables.enemigoActivo == null){
                globalDroneVariables.enemigoActivo = barcosEnemigosEnRango[0];

            }

        }





        /***********************************************

        ACTUALIZACION DE PANEL DE INFORMACION LATERAL

        ************************************************/


        switch (vehiculoActivo.type){

            case "B":
                if(globalDroneVariables.equipo == "Patrullero"){
                    globalDroneVariables.InfoVehiculo_Info1T.setText('Tipo:');
                    globalDroneVariables.InfoVehiculo_Info1.setText('PATRULLA');
                    globalDroneVariables.InfoVehiculo_Info2T.setText('Categoria:');
                    globalDroneVariables.InfoVehiculo_Info2.setText(vehiculoActivo.size.toUpperCase());                   
                    globalDroneVariables.InfoVehiculo_Info3T.setText('Combustible:');
                    globalDroneVariables.InfoVehiculo_Info3.setText(Math.round(vehiculoActivo.combustible));
                    globalDroneVariables.InfoVehiculo_Info4T.setText('Enemigo selec.:');

                    var textEnemigoSelec = "NINGUNO";
                    if(globalDroneVariables.enemigoActivo !== null){
                        textEnemigoSelec =   'PESQUERO ' + globalDroneVariables.enemigoActivo.size.toUpperCase();                          
                    }

                    globalDroneVariables.InfoVehiculo_Info4.setText(textEnemigoSelec);
                }else{
                    globalDroneVariables.InfoVehiculo_Info1T.setText('Tipo:');
                    globalDroneVariables.InfoVehiculo_Info1.setText('PESQUERO');
                    globalDroneVariables.InfoVehiculo_Info2T.setText('Categoria:');
                    globalDroneVariables.InfoVehiculo_Info2.setText(vehiculoActivo.size.toUpperCase()); 
                    globalDroneVariables.InfoVehiculo_Info3T.setText('Vida:');
                    globalDroneVariables.InfoVehiculo_Info3.setText(vehiculoActivo.vida);
                    globalDroneVariables.InfoVehiculo_Info4T.setText('Pesca:');
                    globalDroneVariables.InfoVehiculo_Info4.setText(vehiculoActivo.cantidadPesca);
                    globalDroneVariables.InfoVehiculo_Info5T.setText('Avisos:');
                    globalDroneVariables.InfoVehiculo_Info5.setText(vehiculoActivo.contadorAvisos);
                }
                break;
            case "H": 
                globalDroneVariables.InfoVehiculo_Info1T.setText('Tipo:');
                globalDroneVariables.InfoVehiculo_Info1.setText('PATRULLA');
                globalDroneVariables.InfoVehiculo_Info2T.setText('Categoria:');
                globalDroneVariables.InfoVehiculo_Info2.setText("HELICOPTERO"); 
                globalDroneVariables.InfoVehiculo_Info3T.setText('Combustible:');
                globalDroneVariables.InfoVehiculo_Info3.setText(Math.round(vehiculoActivo.combustible));
                break;
            case "L":
                globalDroneVariables.InfoVehiculo_Info1T.setText('Tipo:');
                globalDroneVariables.InfoVehiculo_Info1.setText('PATRULLA');
                globalDroneVariables.InfoVehiculo_Info2T.setText('Categoria:');
                globalDroneVariables.InfoVehiculo_Info2.setText("BOTE"); 
                globalDroneVariables.InfoVehiculo_Info3T.setText('Combustible:');
                globalDroneVariables.InfoVehiculo_Info3.setText(Math.round(vehiculoActivo.combustible));
                break;
        }




        /***********************************************

        PROCESAMIENTO DE MENSAJE RECIBIDO DESDE EL SERVIDOR Y ACTUALIZACION DE PARTIDA LOCAL

        ************************************************/


        //get data from server
        globalDroneVariables.websocket.onmessage = function (event) {
            if (event.data != null) {
                var partidaFromServer = JSON.parse(event.data);

                //update boats positions
                partida.Patrulleros.Barcos.forEach(function(boat){

                    var boteServer  = partidaFromServer.Patrulleros.Barcos.find(function(item){
                        return item.id == boat.id;
                    });

                    setMovement(boat, boteServer.sprite);
                    boat.combustible = boteServer.combustible;

                    if (typeof boteServer.helicoptero !== "undefined"){

                        setMovement(boat.helicoptero, boteServer.helicoptero.sprite);
                        boat.helicoptero.combustible = boteServer.helicoptero.combustible;

                    }

                    if (typeof boteServer.bote !== "undefined"){

                        setMovement(boat.bote, boteServer.bote.sprite);
                        boat.bote.combustible = boteServer.bote.combustible;

                    }



                });

                partida.Pesqueros.Barcos.forEach(function(boat){
                    //if (boat.id != vehiculoActivo.id){

                    var boteServer  = partidaFromServer.Pesqueros.Barcos.find(function(item){
                        return item.id == boat.id;
                    });

                    setMovement(boat, boteServer.sprite);
                    boat.contadorAvisos = boteServer.contadorAvisos;
                    boat.ultimoAvisoRecibido = boteServer.ultimoAvisoRecibido;


                    if(partidaFromServer.Disparo.existe && partidaFromServer.Disparo.impacto && boat.id == partidaFromServer.Disparo.pesquero.id)    {
                        var barcoImpactado = partida.Pesqueros.Barcos.find(function(item){
                            return item.id == boat.id;
                        });

                        if(barcoImpactado.vida > 0){

                            if(barcoImpactado.vida > partidaFromServer.Disparo.arma.nivelDanio){

                                barcoImpactado.vida -= partidaFromServer.Disparo.arma.nivelDanio;

                            }else{
                                barcoImpactado.vida = 0;
                                barcoImpactado.hundido = true;
                                barcoImpactado.sprite.x = 1300;
                                barcoImpactado.sprite.setVisible(false);
                            }

                        }else{
                            barcoImpactado.hundido = true;
                            barcoImpactado.sprite.x = 1300;
                            barcoImpactado.sprite.setVisible(false);
                        }



                    }               

                });
                partida.Pesca.BancoPeces.forEach(function(banco){
                    //if (boat.id != vehiculoActivo.id){

                    var bancoServer  = partidaFromServer.Pesca.BancoPeces.find(function(item){
                        return item.id == banco.id;
                    });

                    banco.cantidadPesca=bancoServer.cantidadPesca;
                    banco.activo=bancoServer.activo;
                    //}                      

                });



            }

        }

        /***********************************************

        ACTUALIZO POSICION ELEMENTOS BARCO CON HELICOPTERO Y BOTE

        ************************************************/
        
        if(getBoatWithHelicopter() !== "undefined")
        {
        	var helicoptero = getBoatWithHelicopter().helicoptero;
        	var bote = getBoatWithHelicopter().bote;
        	if(helicoptero.acoplado)
        	{
        		helicoptero.sprite.x = getBoatWithHelicopter().sprite.x;
            	helicoptero.sprite.y = getBoatWithHelicopter().sprite.y;
        	}
        	if(bote.acoplado)
        	{
        		bote.sprite.x = getBoatWithHelicopter().sprite.x;
            	bote.sprite.y = getBoatWithHelicopter().sprite.y;
        	}
        }
        

        /***********************************************

        CAPTURA DE ACCIONES DEL USUARIO

        ************************************************/


        ////// MOVIMIENTO IZQUIERDA

        var isMoving = false;
        if (globalDroneVariables.moverIzquierda.isDown && vehiculoActivo.combustible > 0 && !vehiculoActivo.regresando) {
            //vehiculoActivo.sprite.setAngularVelocity(-0.09);
            vehiculoActivo.sprite.rotation -= parameters.velocidadRotacion;
            if(vehiculoActivo.helicoptero !== undefined && vehiculoActivo.helicoptero.acoplado){
                //vehiculoActivo.helicoptero.sprite.setAngularVelocity(-0.09);
                vehiculoActivo.helicoptero.sprite.rotation -= parameters.velocidadRotacion;
            	
            }
            if(vehiculoActivo.bote !== undefined && vehiculoActivo.bote.acoplado){
                //vehiculoActivo.bote.sprite.setAngularVelocity(-0.09);
                vehiculoActivo.bote.sprite.rotation -= parameters.velocidadRotacion;
            }
            consumirCombustible(vehiculoActivo);

            //Pesca//////////////////////////////////////
            if (globalDroneVariables.equipo == "Pesquero"){
            partida.Pesca.BancoPeces.forEach(function(item){
            	var distance = Phaser.Math.Distance.Between(vehiculoActivo.sprite.x, vehiculoActivo.sprite.y, item.sprite.x, item.sprite.y);
            	if(distance<50 && item.activo){
            		item.activo=false;
            		vehiculoActivo.cantidadPesca+=item.peces;
            		item.sprite.setVisible(false);
            	}
            });
            }
            ////////////////////////////////////////////////////////
            isMoving = true;
        }


        ////// MOVIMIENTO DERECHA

        else if (globalDroneVariables.moverDerecha.isDown && vehiculoActivo.combustible > 0 && !vehiculoActivo.regresando) { //if (globalDroneVariables.cursors.right.isDown) {
            //vehiculoActivo.sprite.setAngularVelocity(0.09);
            vehiculoActivo.sprite.rotation += parameters.velocidadRotacion;
            if(vehiculoActivo.helicoptero !== undefined && vehiculoActivo.helicoptero.acoplado){
                //vehiculoActivo.helicoptero.sprite.setAngularVelocity(0.09);
                vehiculoActivo.helicoptero.sprite.rotation += parameters.velocidadRotacion;
            }
            if(vehiculoActivo.bote !== undefined && vehiculoActivo.bote.acoplado){
                //vehiculoActivo.bote.sprite.setAngularVelocity(0.09);
                vehiculoActivo.bote.sprite.rotation += parameters.velocidadRotacion;
            }
            consumirCombustible(vehiculoActivo);
            isMoving = true;
        }


        ////// MOVIMIENTO ADELANTE

        if (globalDroneVariables.moverArriba.isDown && vehiculoActivo.combustible > 0 && !vehiculoActivo.regresando) {
            vehiculoActivo.sprite.thrust(parameters.aceleracion);
            if(vehiculoActivo.helicoptero !== undefined && vehiculoActivo.helicoptero.acoplado){
                vehiculoActivo.helicoptero.sprite.thrust(parameters.aceleracion);
            }
            if(vehiculoActivo.bote !== undefined && vehiculoActivo.bote.acoplado){
                vehiculoActivo.bote.sprite.thrust(parameters.aceleracion);
            }
            consumirCombustible(vehiculoActivo);
            isMoving = true;
        }



        ////// POSICION SPOTLIGHT
        globalDroneVariables.spotlight.x = vehiculoActivo.sprite.x;
        globalDroneVariables.spotlight.y = vehiculoActivo.sprite.y;




        ////// SELECCION DE BARCOS

        var newAcvtiveBoat = null; 
        if (Phaser.Input.Keyboard.JustDown(globalDroneVariables.cambiarBarcoPropio))
        {
            if (globalDroneVariables.equipo == "Pesquero") {
                newAcvtiveBoat = partida.Pesqueros.Barcos.find(function (input) {
                    return !input.activo && !input.hundido; 
                });


            }
            else {
                newAcvtiveBoat = partida.Patrulleros.Barcos.find(function (input) {
                    return !input.activo; 
                });
            }
        }      


        //Actualizacion de Barco Activo
        if (newAcvtiveBoat != null) {
            vehiculoActivo.activo = false;
            newAcvtiveBoat.activo = true;
        }


        ////// SELECCION DE HELICOPTERO


        if (globalDroneVariables.desacoplarHelicoptero.isDown){
            if (globalDroneVariables.equipo == "Patrullero"){
                var boatWithHelicopter = partida.Patrulleros.Barcos.find(function (input) {
                    return typeof input.helicoptero !== "undefined";
                });
                vehiculoActivo.activo = false;        
                boatWithHelicopter.helicoptero.activo = true;
                boatWithHelicopter.helicoptero.acoplado = false;
                boatWithHelicopter.helicoptero.sprite.setMass(parameters.masaHelicoptero);
            }
        }


        ////// SELECCION DE BOTE

        if (globalDroneVariables.desacoplarBote.isDown){
            if (globalDroneVariables.equipo == "Patrullero" && !partida.hayTormenta){
                var boatWithBoat = partida.Patrulleros.Barcos.find(function (input) {
                    return typeof input.bote !== "undefined";
                });
                vehiculoActivo.activo = false;        
                boatWithBoat.bote.activo = true;
                boatWithBoat.bote.acoplado = false;
                boatWithBoat.bote.sprite.setMass(parameters.masaBote);

            }
        }


    ////// CONSUMO DE COMBUSTIBLE HELICOPTERO MIENTRAS NO SE MUEVE
        ////// CONSUMO DE COMBUSTIBLE HELICOPTERO MIENTRAS NO SE MUEVE



        var boatWithHelicopterAux = partida.Patrulleros.Barcos.find(function (input) {
            return typeof input.helicoptero !== "undefined";
        });
        
        if((vehiculoActivo.type == "H" && vehiculoActivo.regresando && !vehiculoActivo.acoplado && !isMoving) || boatWithHelicopterAux.helicoptero.regresando || !boatWithHelicopterAux.helicoptero.acoplado)
    	{
    		moveAutomatically(boatWithHelicopterAux.helicoptero);
    		consumirCombustible(boatWithHelicopterAux.helicoptero);
    	}

        if((partida.hayTormenta && !boatWithHelicopterAux.bote.acoplado)
        		|| (vehiculoActivo.type == "L" && vehiculoActivo.regresando && !vehiculoActivo.acoplado) 
        		|| (boatWithHelicopterAux.bote.regresando && !boatWithHelicopterAux.bote.acoplado))
    	{
    		moveAutomatically(boatWithHelicopterAux.bote);
    		consumirCombustible(boatWithHelicopterAux.bote);
    	}


        ////// SELECCION DE BARCO ENEMIGO DENTRO DE LOS QUE ESTAN EN RANGO  

        var newEnemyBoat = null;
        if (Phaser.Input.Keyboard.JustDown(globalDroneVariables.cambiarBarcoEnemigo))
        {
            if (globalDroneVariables.equipo == "Patrullero") {
                newEnemyBoat = barcosEnemigosEnRango.find(function (input) {
                    return input.id != globalDroneVariables.enemigoActivo.id;
                });

                globalDroneVariables.enemigoActivo = newEnemyBoat;
            }
        }          




        ////// ALERTA A BARCO PESQUERO


        var isAlerting = false;
        if( Phaser.Input.Keyboard.JustDown(globalDroneVariables.avisarPesquero)){

            if (globalDroneVariables.equipo == "Patrullero"){
                if(vehiculoActivo.type == "B"){

                    if(barcosEnemigosEnRango && barcosEnemigosEnRango.length && globalDroneVariables.enemigoActivo !== null){
                        isAlerting = true;

                        var barcoEnemigoAAvisar = partida.Pesqueros.Barcos.find(function(item){
                            return item.id == globalDroneVariables.enemigoActivo.id;

                        });


                        if(barcoEnemigoAAvisar.contadorAvisos < parameters.cantidadAvisosParaDisparar) {

                            if(barcoEnemigoAAvisar.ultimoAvisoRecibido !== null){

                                if(tiempoUltimoAvisoCumplido(barcoEnemigoAAvisar.ultimoAvisoRecibido)){
                                    barcoEnemigoAAvisar.contadorAvisos ++;
                                    barcoEnemigoAAvisar.ultimoAvisoRecibido = partida.tiempoRestantePartida;
                                }
                            }else{
                                barcoEnemigoAAvisar.contadorAvisos ++;
                                barcoEnemigoAAvisar.ultimoAvisoRecibido = partida.tiempoRestantePartida;
                            }
                        }
                    }
                }
            }
        }




        ////// DISPARO CANION

        var isShooting = false;
        partida.Disparo.existe = false;
        if( Phaser.Input.Keyboard.JustDown(globalDroneVariables.dispararCanion)){

            if (globalDroneVariables.equipo == "Patrullero" && vehiculoActivo.type == "B" && vehiculoActivo.size == "Pesado" && globalDroneVariables.enemigoActivo !== null && globalDroneVariables.enemigoActivo.contadorAvisos == 2 && tiempoUltimoAvisoCumplido(globalDroneVariables.enemigoActivo.ultimoAvisoRecibido)){

                if(vehiculoActivo.armas.canion.ultimoDisparo == null || ((vehiculoActivo.armas.canion.ultimoDisparo - partida.tiempoRestantePartida) >= vehiculoActivo.armas.canion.cadencia)){

                    var distance = Phaser.Math.Distance.Between(vehiculoActivo.sprite.x, vehiculoActivo.sprite.y, globalDroneVariables.enemigoActivo.sprite.x, globalDroneVariables.enemigoActivo.sprite.y);

                    if(distance <= vehiculoActivo.armas.canion.alcance){

                        partida.Disparo.existe = true;
                        partida.Disparo.patrullero = vehiculoActivo;
                        partida.Disparo.pesquero = globalDroneVariables.enemigoActivo;
                        vehiculoActivo.armas.canion.ultimoDisparo = partida.tiempoRestantePartida;
                        partida.Disparo.arma = vehiculoActivo.armas.canion;
                        partida.Disparo.impacto = true;

                        isShooting = true;
                    }

                }

            }

        }

        
        ////// DISPARO AMETRALLADORA

        if( Phaser.Input.Keyboard.JustDown(globalDroneVariables.dispararAmetralladora)){

            if (globalDroneVariables.equipo == "Patrullero" && vehiculoActivo.type == "B" && globalDroneVariables.enemigoActivo !== null && globalDroneVariables.enemigoActivo.contadorAvisos == 2 && tiempoUltimoAvisoCumplido(globalDroneVariables.enemigoActivo.ultimoAvisoRecibido)){

                if(vehiculoActivo.armas.ametralladora.ultimoDisparo == null || ((vehiculoActivo.armas.ametralladora.ultimoDisparo - partida.tiempoRestantePartida) >= vehiculoActivo.armas.ametralladora.cadencia)){

                    var distance = Phaser.Math.Distance.Between(vehiculoActivo.sprite.x, vehiculoActivo.sprite.y, globalDroneVariables.enemigoActivo.sprite.x, globalDroneVariables.enemigoActivo.sprite.y);

                    if(distance <= vehiculoActivo.armas.ametralladora.alcance){

                        partida.Disparo.existe = true;
                        partida.Disparo.patrullero = vehiculoActivo;
                        partida.Disparo.pesquero = globalDroneVariables.enemigoActivo;
                        vehiculoActivo.armas.ametralladora.ultimoDisparo = partida.tiempoRestantePartida;
                        partida.Disparo.arma = vehiculoActivo.armas.ametralladora;
                        partida.Disparo.impacto = true;

                        isShooting = true;
                    }

                }

            }

        }


        ////// SI HUBO ALGUN CAMBIO SE ENVIA AL SERVIDOR


        if (isMoving || isShooting || isAlerting){
            enviarJSON(partida);
        }



        ////// TIEMPO DE PARTIDA


        globalDroneVariables.websocketTime.onmessage = function(event) {
            if(event.data != null) {

                let mensaje = JSON.parse(event.data);

                switch (mensaje.accion){

                    case 'tiempo':
                        partida.tiempoRestantePartida = mensaje.tiempoRestante;
                        // Actualizacion del timer
                        globalDroneVariables.textoTiempo.setText('Tiempo: ' + formatTime(partida.tiempoRestantePartida));
                        break;

                    case 'estadoJuego':
                        if(mensaje.estadoActual == 'FINALIZADO'){
                            //Logica de finalizacion del juego
                            alert("Se ha terminado el tiempo, el juego finalizó.");
                        }
                        break;

                    case 'disparo':
                        break;
                }
            }

        };
    }


});

myGame.scenes.push(DroneViewState);




////// OBTENER EQUIPO DESDE URL

function getTeamFromUrl() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars["equipo"];
}


////// CONVIERTE OBJETO A JSON Y ENVIA A SERVIDOR

function enviarJSON(objeto) {
    let json = JSON.stringify(objeto);
    globalDroneVariables.websocket.send(json);
}


////// FORMATO DE TIEMPO PARA MOSTRAR EN PANTALLA (Segundos a mm:ss)

function formatTime(seconds){
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
}


////// Asignacion de coordenadas para actualizacion de movimiento

function setMovement(boat, sprite) {
    boat.sprite.x = sprite.x;
    boat.sprite.y = sprite.y;
    //boat.sprite.angle = sprite.angle;
    boat.sprite.rotation = sprite.rotation;
}


////// Consumo de combustible centralizado para todos los vehiculos

function consumirCombustible(vehiculo){

    let baseConsumo = parameters.baseConsumoCombustible; //Barco Pesado
    if(vehiculo.combustible > 0){
        switch (vehiculo.type){
            case "B":
                if(vehiculo.size == "Liviano"){
                    vehiculo.combustible -= (baseConsumo / 2);
                }else{
                    vehiculo.combustible -= baseConsumo;
                }
                break;
            case "H":
                vehiculo.combustible -= (baseConsumo * 2);
                returnToShip(vehiculo);
                break;
            case "L":
                vehiculo.combustible -= (baseConsumo * 4);
                returnToShip(vehiculo);
                break;
        }
    }
}

function returnToShip(vehicule)
{
	if(vehicule.combustible < 50)
    {
    	vehicule.regresando = true;
    	var boatWithHelicopter = partida.Patrulleros.Barcos.find(function (input) {
            return typeof input.helicoptero !== "undefined";
        });
    	
    	var target = new Phaser.Math.Vector2();
    	target.x = boatWithHelicopter.sprite.x;
    	target.y = boatWithHelicopter.sprite.y;
    	var angleToPointer = Phaser.Math.Angle.Between(vehicule.sprite.x, vehicule.sprite.y, target.x, target.y);
		var angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - vehicule.sprite.rotation);
		vehicule.sprite.rotation = angleToPointer;
		vehicule.sprite.setAngularVelocity(0);
		vehicule.sprite.target = target;
		vehicule.sprite.thrust(0);
		vehicule.sprite.thrust(parameters.aceleracion);
    }
}

function moveAutomatically(vehicle)
{
	if(vehicle.sprite.target != null)
	{
		var distance = Phaser.Math.Distance.Between(vehicle.sprite.x, vehicle.sprite.y, vehicle.sprite.target.x, vehicle.sprite.target.y);
		if (vehicle.sprite.body.speed > 0 && vehicle.regresando)
	    {
	       if (distance < 4)
	       {
	    	   vehicle.sprite.thrust(0);
	    	   vehicle.sprite.body.speed = 0;
	    	   vehicle.regresando = false;
	    	   vehicle.acoplado = true;
	    	   vehicle.combustible = 100;
	    	   vehicle.activo = false;
	    	   vehicle.sprite.x = getBoatWithHelicopter().sprite.x;
	    	   vehicle.sprite.y = getBoatWithHelicopter().sprite.y;
	    	   vehicle.sprite.setAngle(getBoatWithHelicopter().sprite.angle);
	    	   vehicle.sprite.setMass(parameters.masaBarcosPesados);
	    	   vehicle.sprite.rotation = getBoatWithHelicopter().sprite.rotation;
	    	   vehicle.sprite.setFixedRotation();
	    	   getBoatWithHelicopter().activo = true;
	       }
	    }
	}	
}

////// ESPERA DE SEGUNDOS ENTRE CADA AVISO Y LA SIGUIENTE ACCION DEL JUGADOR

function tiempoUltimoAvisoCumplido(ultimoAviso){

    return (ultimoAviso - partida.tiempoRestantePartida) >= parameters.tiempoEntreAvisos;

}

function getBoatWithHelicopter()
{
	var boatWithHelicopter = partida.Patrulleros.Barcos.find(function (input) {
        return typeof input.helicoptero !== "undefined";
    });
	return boatWithHelicopter;
}
