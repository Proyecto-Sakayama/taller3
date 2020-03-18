var parameters = {
    ipServidor: "localhost",
    //ipServidor: "192.168.1.44", //Casa Guz
    //ipServidor: "192.168.1.7", //Casa Marce
    puertoServidor: "8080",

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
    metaPesca: 100,
    ametralladoraAlcance: 125,
    ametralladoraDanio: 20,
    ametralladoraCadencia: 1,
    canionAlcance: 150,
    canionDanio: 40,
    canionCadencia: 3
};


var globalDroneVariables = {

    //Game
    websocket: null,
    websocketTime: null,
    equipo: null,
    barcosCargados: 0,
    light: null,
    spotlight: null,
    spotlight2: null,
    rain: null,
    distanciaAviso: 150,
    enemigoActivo: null,
    //Sprites
    fish: null,
    pesquero: null,
    milla200: null,
    vehiculoVolviendo: false,
    flagMostrarDisparo: false,
    patrulleroDispara: null,
	barcoImpactadoDisparo: null,
	nivelDanioDisparo: 0,

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

    //indica si se seleccionó que se va a restaurar la partida
    restaurarPartida: false,

    teclaGuardarPartida: null,
    teclaTormenta: null,

    avisarPesqueroJustPressed: false,

    administradorActualizado: false,
    particlesExplosion: null,
    particlesShot: null,
    particlesRain: null,

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
    hayGanador: false,
    hayTormenta: false,
    teclaTormenta: false,
    guardarPartida: false,

    //indica si se seleccionó que se va a restaurar la partida
    restaurarPartida: false,
    //hay que restaurar la partida y todavía no se hizo
    partidaPendienteRestaurar: false,


    equipoAdministrador: "",
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
    	$.getJSON("parameters.json", function(json) {
    	    parameters = json;
    	});
        //Patrulleros
        this.load.image('patrulleroLivianoTop', 'assets/patrulleroLivianoTop.png');
        this.load.image('patrulleroPesadoTop', 'assets/patrulleroPesadoTop.png');
        this.load.image('patrulleroHelicopteroTop', 'assets/patrulleroHelicopteroTop.png');
        this.load.image('patrulleroBoteTop', 'assets/patrulleroBoteTop.png');

        //Pesqueros
        this.load.image('pesqueroLivianoTop', 'assets/pesqueroLivianoTop.png');
        this.load.image('pesqueroPesadoTop', 'assets/pesqueroPesadoTop.png');

        //carga las imagenes al juego
        this.load.image('water', 'assets/water.jpg');
        this.load.image('fishes', 'assets/fishes.png');
        this.load.image('mask', 'assets/mask.png');
        this.load.image('panel', 'assets/panel.png');
        this.load.image('horizontal', 'assets/horizontal.png');
        this.load.image('vertical', 'assets/vertical.png');
        //this.load.spritesheet('patrulleroHelicopteroTopSprite', 'assets/patrulleroHelicopteroTopSprite.png', 20, 20);
        
        //explosion y lluvia
        this.load.image('fire', 'assets/muzzleflash3.png');
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
    },



    /************************************************************************************************************************************************

                                                                        CREATE

    *************************************************************************************************************************************************/

    create: function () {

        globalDroneVariables.equipo = getVarsFromUrl()["equipo"];
        globalDroneVariables.restaurarPartida = getVarsFromUrl()["recuperar"];

        if(globalDroneVariables.restaurarPartida == "true")
        {
            partida.restaurarPartida = true;
            partida.partidaPendienteRestaurar = true;
        }
        else
        {
            partida.restaurarPartida = false;
            partida.partidaPendienteRestaurar = false;
        }


        globalDroneVariables.desacoplarHelicoptero = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        globalDroneVariables.desacoplarBote = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        globalDroneVariables.avisarPesquero = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        globalDroneVariables.dispararAmetralladora = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        globalDroneVariables.dispararCanion = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        globalDroneVariables.inmovilizarPesquero = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        globalDroneVariables.cambiarBarcoPropio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        globalDroneVariables.cambiarBarcoEnemigo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        globalDroneVariables.moverArriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        globalDroneVariables.moverIzquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        globalDroneVariables.moverDerecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);  

        globalDroneVariables.teclaGuardarPartida = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);

        globalDroneVariables.teclaTormenta = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);


        this.matter.world.setBounds(0, 0, 1200, 650);
        var map = this.add.image(600, 325, 'water');
        var panel = this.add.image(1432, 325, 'panel');


        /***********************************************

        MILLA 200

        ************************************************/
        var graphics = this.add.graphics();
        globalDroneVariables.milla200 = new Phaser.Curves.Line(new Phaser.Math.Vector2(0, parameters.milla200_distancia), 
                                                               new Phaser.Math.Vector2(1200, parameters.milla200_distancia));
        graphics.clear();
        graphics.lineStyle(2, 0xffffff, 1);

        globalDroneVariables.milla200.draw(graphics);

        globalDroneVariables.spotlight = this.make.sprite({
            x: 200,
            y: 150,
            key: 'mask',
            add: false
        });


        //BANCO DE PECES
        var fish = this.add.image(600, 560,'fishes');
        fish.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var fish2 = this.add.image(300, 440,'fishes');
        fish2.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var fish3 = this.add.image(600, 440,'fishes');
        fish3.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var fish4 = this.add.image(900, 440,'fishes');
        fish4.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var fish5 = this.add.image(200, 320,'fishes');
        fish5.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var fish6 = this.add.image(400, 320,'fishes');
        fish6.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var fish7 = this.add.image(700, 320,'fishes');
        fish7.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var fish8 = this.add.image(500, 200,'fishes');
        fish8.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var fish9 = this.add.image(1000, 200,'fishes');
        fish9.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);




        //PESQUEROS       
        globalDroneVariables.pesquero = this.matter.add.image(400, 50, 'pesqueroLivianoTop');
        globalDroneVariables.pesquero.setFrictionAir(0.15);
        globalDroneVariables.pesquero.setMass(parameters.masaBarcosLivianos);
        globalDroneVariables.pesquero.setFixedRotation();
        globalDroneVariables.pesquero.setAngle(270);
        globalDroneVariables.pesquero.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var pesquero2 = this.matter.add.image(800, 50, 'pesqueroPesadoTop');
        pesquero2.setFrictionAir(0.15);
        pesquero2.setMass(parameters.masaBarcosPesados);
        pesquero2.setFixedRotation();
        pesquero2.setAngle(270);
        pesquero2.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        //PATRULLEROS
        var patrullero = this.matter.add.image(200, 300, 'patrulleroLivianoTop');
        patrullero.setFrictionAir(0.15);
        patrullero.setMass(parameters.masaBarcosLivianos);
        patrullero.setFixedRotation();
        patrullero.setAngle(270);
        patrullero.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var patrullero2 = this.matter.add.image(1000, 300, 'patrulleroPesadoTop');
        patrullero2.setFrictionAir(0.15);
        patrullero2.setMass(parameters.masaBarcosPesados);
        patrullero2.setFixedRotation();
        patrullero2.setAngle(270);
        patrullero2.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var helicopter = this.matter.add.image(1000, 300, 'patrulleroHelicopteroTop');
        helicopter.setFrictionAir(0.15);
        helicopter.setMass(parameters.masaBarcosPesados);
        helicopter.setFixedRotation();
        helicopter.setAngle(270);
        helicopter.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var boteSprite = this.matter.add.image(1000, 300, 'patrulleroBoteTop');
        boteSprite.setFrictionAir(0.15);
        boteSprite.setMass(parameters.masaBarcosPesados);
        boteSprite.setFixedRotation();
        boteSprite.setAngle(270);
        boteSprite.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);



        //CONEXION JUEGO
        globalDroneVariables.websocket = new WebSocket('ws://' + parameters.ipServidor + ':' 
                                                       + parameters.puertoServidor + '/taller3/juego/' + globalDroneVariables.equipo);

        //CONEXION TIMER
        globalDroneVariables.websocketTime = new WebSocket('ws://' + parameters.ipServidor + ':' + parameters.puertoServidor 
                                                           + '/taller3/acciones/' + globalDroneVariables.equipo);

        globalDroneVariables.textoTiempo = this.add.text(1220, 30, 'Tiempo: ' + formatTime(partida.tiempoRestantePartida));

        globalDroneVariables.textoTormenta = this.add.text(1220, 10, 'No hay tormenta');

        //PANEL DERECHO - INICIALIZACION DE TEXTOS

        this.add.text(1220, 72, 'INFO VEHICULO ');

        globalDroneVariables.textoPesca= this.add.text(1220,50,' ');
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
            regresando: false,
            capturado: false
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
            regresando: false,
            capturado: false
        }


        var barcoPatrullero = {
            id: 3,
            type: "B",
            size: "Liviano",
            sprite: patrullero,
            armas: {
                ametralladora: {
                    cadencia: parameters.ametralladoraCadencia,
                    nivelDanio: parameters.ametralladoraDanio,
                    alcance: parameters.ametralladoraAlcance,
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
                    cadencia: parameters.ametralladoraCadencia,
                    nivelDanio: parameters.ametralladoraDanio,
                    alcance: parameters.ametralladoraAlcance,
                    ultimoDisparo: null
                },
                canion: {
                    cadencia: parameters.canionCadencia,
                    nivelDanio: parameters.canionDanio,
                    alcance: parameters.canionAlcance,
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
            sprite: fish,
            peces: 40
        }

        var bancoPeces2 = {
            id: 9,
            activo: true,
            sprite: fish2,
            peces: 20
        }

        var bancoPeces3 = {
            id: 10,
            activo: true,
            sprite: fish3,
            peces: 20
        }


        var bancoPeces4 = {
            id: 11,
            activo: true,
            sprite: fish4,
            peces: 20
        }


        var bancoPeces5 = {
            id: 12,
            activo: true,
            sprite: fish5,
            peces: 10
        }


        var bancoPeces6 = {
            id: 13,
            activo: true,
            sprite: fish6,
            peces: 10
        }


        var bancoPeces7 = {
            id: 14,
            activo: true,
            sprite: fish7,
            peces: 10
        }


        var bancoPeces8 = {
            id: 15,
            activo: true,
            sprite: fish8,
            peces: 5
        }


        var bancoPeces9 = {
            id: 16,
            activo: true,
            sprite: fish9,
            peces: 5
        }
        partida.Pesca.BancoPeces.push(bancoPeces1);
        partida.Pesca.BancoPeces.push(bancoPeces2);
        partida.Pesca.BancoPeces.push(bancoPeces3);
        partida.Pesca.BancoPeces.push(bancoPeces4);
        partida.Pesca.BancoPeces.push(bancoPeces5);
        partida.Pesca.BancoPeces.push(bancoPeces6);
        partida.Pesca.BancoPeces.push(bancoPeces7);
        partida.Pesca.BancoPeces.push(bancoPeces8);
        partida.Pesca.BancoPeces.push(bancoPeces9);

        partida.Patrulleros.Barcos.push(barcoPatrullero);
        partida.Patrulleros.Barcos.push(barcoPatrullero2);
        partida.Pesqueros.Barcos.push(barcoPesquero);
        partida.Pesqueros.Barcos.push(barcoPesquero2);

        var piso = this.matter.add.image(600, 650, 'horizontal', null, { restitution: 0.4, isStatic: true });
        var techo = this.matter.add.image(600, 0, 'horizontal', null, { restitution: 0.4, isStatic: true });
        var izquierda = this.matter.add.image(0, 325, 'vertical', null, { restitution: 0.4, isStatic: true });
        var derecha = this.matter.add.image(1200, 325, 'vertical', null, { restitution: 0.4, isStatic: true });

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

        //Colision con límites
        var colisionesConLimites = this.matter.world.nextCategory();
        piso.setCollisionCategory(colisionesConLimites);
        techo.setCollisionCategory(colisionesConLimites);
        izquierda.setCollisionCategory(colisionesConLimites);
        derecha.setCollisionCategory(colisionesConLimites);

        barcoPesquero.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroLiviano, colisionesConPatrulleroPesado, 
                                              colisionesConLimites]);

        barcoPesquero2.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroLiviano, colisionesConPatrulleroPesado, 
                                               colisionesConLimites]);

        barcoPatrullero.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroPesado, colisionesConLimites]);
        boteOb.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroLiviano, colisionesConLimites]);
        barcoPatrullero2.sprite.setCollidesWith([colisionesConPesqueros, colisionesConPatrulleroLiviano, colisionesConLimites]);




        ////// CAPTURA DE PESQUERO LIVIANO POR BOTE
        var pesqueroCaptura = globalDroneVariables.pesquero;

        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

            //body ID 7 = Barco pesquero liviano, body ID 12 = Bote patrulla
            if((bodyA.id == 7 && bodyB.id == 12) || (bodyA.id == 12 && bodyB.id == 7)){

                if(vehiculoDentroMilla200(partida.Pesqueros.Barcos[0]) && vehiculoDentroMilla200(getBoatWithHelicopter().bote) ){

                    capturarBarco(partida.Pesqueros.Barcos[0]);

                }

            }

        });

        
        /*
        var helicopteroSprite = this.physics.add.sprite(100, 100, 'patrulleroHelicopteroTopSprite');
        globalDroneVariables.particlesExplosion = this.add.particles('fire');
        
        globalDroneVariables.particlesShot = this.add.particles('flares');
        */
        globalDroneVariables.particlesExplosion = this.add.particles('fire');
        globalDroneVariables.particlesShot = this.add.particles('flares');
        globalDroneVariables.particlesRain = this.add.particles('flares');

        console.log('create success');

    },

    /************************************************************************************************************************************************

                                                                        UPDATE

    *************************************************************************************************************************************************/


    update: function () {

        var change = false;


        /***********************************************

        SELECCION DE VEHICULO ACTIVO

        ************************************************/
        if(!globalDroneVariables.administradorActualizado 
           && partida.equipoAdministrador == globalDroneVariables.equipo)
        {
            globalDroneVariables.administradorActualizado = true;
            if(globalDroneVariables.equipo == "Pesquero"){
                this.add.text(1220, 510, ':ADMIN:');
                this.add.text(1220, 530, 'G: Guardar');
            }else{
                this.add.text(1220, 650, ':ADMIN:');
                this.add.text(1220, 670, 'G: Guardar');
            }
        }

        var vehiculoActivo = null;
        if (globalDroneVariables.equipo == "Patrullero") {
            vehiculoActivo = partida.Patrulleros.Barcos.find(function (input) {
                return input.activo;
            });

        } else {
            vehiculoActivo = partida.Pesqueros.Barcos.find(function (input) {
                return input.activo;
            });
            if(vehiculoActivo.hundido || vehiculoActivo.capturado){
                vehiculoActivo = partida.Pesqueros.Barcos.find(function (input) {
                    return !input.hundido && !input.capturado;
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

                if(distance <= parameters.distanciaAviso && !item.hundido && !item.capturado && vehiculoDentroMilla200(item)){
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

        globalDroneVariables.textoPesca.setText('Pesca:'+ getPescaTotal() +'/'+parameters.metaPesca);

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

                    var textAvisos = "Avisos: NA";
                    var textVida = "Vida: NA";
                    if(globalDroneVariables.enemigoActivo !== null){
                        textAvisos =  'Avisos: ' + globalDroneVariables.enemigoActivo.contadorAvisos;  
                        textVida =  'Vida: ' + globalDroneVariables.enemigoActivo.vida;  

                    }

                    globalDroneVariables.InfoVehiculo_Info5T.setText(textAvisos);
                    globalDroneVariables.InfoVehiculo_Info5.setText(textVida);

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
                helicoptero.sprite.rotation = getBoatWithHelicopter().sprite.rotation;
            }
            if(bote.acoplado)
            {
                bote.sprite.x = getBoatWithHelicopter().sprite.x;
                bote.sprite.y = getBoatWithHelicopter().sprite.y;
                bote.sprite.rotation = getBoatWithHelicopter().sprite.rotation;
            }
        }



        /***********************************************

        PROCESAMIENTO DE MENSAJE RECIBIDO DESDE EL SERVIDOR Y ACTUALIZACION DE PARTIDA LOCAL

        ************************************************/
        var barcoFueImpactado = false;

        //get data from server
        globalDroneVariables.websocket.onmessage = function (event) {
            if (event.data != null) {
                var partidaFromServer = JSON.parse(event.data);

                partida.hayTormenta = partidaFromServer.hayTormenta;
                partida.teclaTormenta = partidaFromServer.teclaTormenta;
                if(partidaFromServer.equipoAdministrador != "")
                {
                    partida.equipoAdministrador = partidaFromServer.equipoAdministrador;
                }


                //update boats positions
                partida.Patrulleros.Barcos.forEach(function(boat){

                    var boteServer  = partidaFromServer.Patrulleros.Barcos.find(function(item){
                        return item.id == boat.id;
                    });



                    if(boteServer.id !== vehiculoActivo.id || partida.partidaPendienteRestaurar){

                        setMovement(boat, boteServer.sprite);

                    }
                    boat.combustible = boteServer.combustible;

                    if (typeof boteServer.helicoptero !== "undefined" && vehiculoActivo.type != "H"){
                        setMovement(boat.helicoptero, boteServer.helicoptero.sprite);
                        boat.helicoptero.combustible = boteServer.helicoptero.combustible;
                        boat.helicoptero.acoplado = boteServer.helicoptero.acoplado;
                    }

                    if (typeof boteServer.bote !== "undefined"  && vehiculoActivo.type != "L"){

                        setMovement(boat.bote, boteServer.bote.sprite);
                        boat.bote.combustible = boteServer.bote.combustible;
                        boat.bote.acoplado = boteServer.bote.acoplado;
                    }



                });

                partida.Pesqueros.Barcos.forEach(function(boat){

                    var boteServer  = partidaFromServer.Pesqueros.Barcos.find(function(item){
                        return item.id == boat.id;
                    });

                    if(boteServer.id !== vehiculoActivo.id || partida.partidaPendienteRestaurar){

                        setMovement(boat, boteServer.sprite);
                    }


                    boat.combustible = boteServer.combustible;
                    boat.capturado = boteServer.capturado;
                    boat.vida = boteServer.vida;
                    boat.contadorAvisos = boteServer.contadorAvisos;
                    boat.ultimoAvisoRecibido = boteServer.ultimoAvisoRecibido;
                    boat.cantidadPesca = boteServer.cantidadPesca;


                    if(partidaFromServer.Disparo.existe && partidaFromServer.Disparo.impacto && boat.id == partidaFromServer.Disparo.pesquero.id)    {
                        var barcoImpactado = partida.Pesqueros.Barcos.find(function(item){
                            return item.id == boat.id;
                        });

                        if(barcoImpactado.vida > 0){
                        	mostrarDisparo(partidaFromServer.Disparo.patrullero.sprite, barcoImpactado.sprite, partidaFromServer.Disparo.arma.nivelDanio/133);
                        	mostrarExplosion(barcoImpactado.sprite, partidaFromServer.Disparo.arma.nivelDanio);
                        	
                        	//PARAMETROS PARA MOSTRAR DISPARO EN VISTA LATERAL
                        	globalDroneVariables.patrulleroDispara = partidaFromServer.Disparo.patrullero;
                        	globalDroneVariables.barcoImpactadoDisparo = barcoImpactado;
                        	globalDroneVariables.nivelDanioDisparo = partidaFromServer.Disparo.arma.nivelDanio;
                        	globalDroneVariables.flagMostrarDisparo = true;
                        	/////////////////
                            
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
                        barcoFueImpactado = true;


                    }               

                });
                partida.partidaPendienteRestaurar = partidaFromServer.partidaPendienteRestaurar;
                partida.restaurarPartida = partidaFromServer.partidaPendienteRestaurar;

                partida.Pesca.BancoPeces.forEach(function(banco){

                    var bancoServer  = partidaFromServer.Pesca.BancoPeces.find(function(item){
                        return item.id == banco.id;
                    });

                    banco.cantidadPesca=bancoServer.cantidadPesca;
                    banco.activo=bancoServer.activo;
                    banco.sprite.setVisible(bancoServer.sprite.visible);

                });



            }


            ////// EVALUACION DE GANADOR
            if(partidaFromServer.hayGanador){
                if(evaluarPatrullerosGanadores()){
                    window.location.replace('gameover.html?equipoGanador=Patrullero');
                }else if(evaluarPesquerosGanadores()){
                    window.location.replace('gameover.html?equipoGanador=Pesquero');
                }
                globalDroneVariables.websocket.close();
                globalDroneVariables.websocketTime.close();

            }


        }



        globalDroneVariables.websocket.onclose = function () {
            globalDroneVariables.websocket = null;
        };

        globalDroneVariables.websocketTime.onclose = function () {
            globalDroneVariables.websocketTime = null;
        };      






        /***********************************************

        CAPTURA DE ACCIONES DEL USUARIO

        ************************************************/


        ////// MOVIMIENTO IZQUIERDA

        var isMoving = false;
        if (globalDroneVariables.moverIzquierda.isDown && vehiculoActivo.combustible > 0 && !vehiculoActivo.regresando) {
            vehiculoActivo.sprite.rotation -= parameters.velocidadRotacion;
            if(vehiculoActivo.helicoptero !== undefined && vehiculoActivo.helicoptero.acoplado){
                vehiculoActivo.helicoptero.sprite.rotation -= parameters.velocidadRotacion;

            }
            if(vehiculoActivo.bote !== undefined && vehiculoActivo.bote.acoplado){
                vehiculoActivo.bote.sprite.rotation -= parameters.velocidadRotacion;
            }
            isMoving = true;
        }


        ////// MOVIMIENTO DERECHA

        else if (globalDroneVariables.moverDerecha.isDown && vehiculoActivo.combustible > 0 && !vehiculoActivo.regresando) { 
            vehiculoActivo.sprite.rotation += parameters.velocidadRotacion;
            if(vehiculoActivo.helicoptero !== undefined && vehiculoActivo.helicoptero.acoplado){
                vehiculoActivo.helicoptero.sprite.rotation += parameters.velocidadRotacion;
            }
            if(vehiculoActivo.bote !== undefined && vehiculoActivo.bote.acoplado){
                vehiculoActivo.bote.sprite.rotation += parameters.velocidadRotacion;
            }
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
            isMoving = true;
        }

        ////// CONSUMO DE COMBUSTIBLE TODO MENOS HELICOPTERO
        if(isMoving && vehiculoActivo.type != "H"){
            consumirCombustible(vehiculoActivo);
        }



        ////// CONSUMO DE COMBUSTIBLE HELICOPTERO MIENTRAS NO SE MUEVE
        /////  REGRESAR BOTE Y HELICOPTERO SI COMBUSTIBLE < 50

        var boatWithHelicopterAux = partida.Patrulleros.Barcos.find(function (input) {
            return typeof input.helicoptero !== "undefined";
        });

        //Si el helicóptero está regresando o no está acoplado 
        if(boatWithHelicopterAux.helicoptero.regresando 
           || !boatWithHelicopterAux.helicoptero.acoplado)
        {
            moveAutomatically(boatWithHelicopterAux.helicoptero);
            consumirCombustible(boatWithHelicopterAux.helicoptero);
        }

        //Si hay tormenta y el bote no está acoplado
        //O El el vehículo activo es bote y está regresando y no está acoplado
        //O El bote está regresando y no está acoplado
        if((partida.hayTormenta && !boatWithHelicopterAux.bote.acoplado)
           || (vehiculoActivo.type == "L" && vehiculoActivo.regresando && !vehiculoActivo.acoplado) 
           || (boatWithHelicopterAux.bote.regresando && !boatWithHelicopterAux.bote.acoplado))
        {
        	returnToShip(boatWithHelicopterAux.bote);
            moveAutomatically(boatWithHelicopterAux.bote);
            consumirCombustible(boatWithHelicopterAux.bote);
        }


        ////// POSICION SPOTLIGHT
        globalDroneVariables.spotlight.x = vehiculoActivo.sprite.x;
        globalDroneVariables.spotlight.y = vehiculoActivo.sprite.y;


        ////// PESCA

        if (globalDroneVariables.equipo == "Pesquero" && isMoving){
            partida.Pesca.BancoPeces.forEach(function(item){
                var distance = Phaser.Math.Distance.Between(vehiculoActivo.sprite.x, vehiculoActivo.sprite.y, item.sprite.x, item.sprite.y);
                if(distance<50 && item.activo){
                    item.activo=false;
                    vehiculoActivo.cantidadPesca+=item.peces;
                    item.sprite.setVisible(false);
                }
            });
        }



        ////// SELECCION DE BARCOS

        var newAcvtiveBoat = null; 
        if (Phaser.Input.Keyboard.JustDown(globalDroneVariables.cambiarBarcoPropio))
        {
            if (globalDroneVariables.equipo == "Pesquero") {
                newAcvtiveBoat = partida.Pesqueros.Barcos.find(function (input) {
                    return !input.activo && !input.hundido && !input.capturado; 
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


        /***********************************************

        SELECCION DE HELICOPTERO

        ************************************************/


        var isChangingBoatHeli = false;
        if (Phaser.Input.Keyboard.JustDown(globalDroneVariables.desacoplarHelicoptero)){
            if (globalDroneVariables.equipo == "Patrullero"){
                var boatWithHelicopter = partida.Patrulleros.Barcos.find(function (input) {
                    return typeof input.helicoptero !== "undefined";
                });
                vehiculoActivo.activo = false;        
                boatWithHelicopter.helicoptero.activo = true;
                boatWithHelicopter.helicoptero.acoplado = false;
                boatWithHelicopter.helicoptero.sprite.setMass(parameters.masaHelicoptero);
                isChangingBoatHeli = true;
            }
        }


        /***********************************************

        SELECCION DE BOTE

        ************************************************/




        if (Phaser.Input.Keyboard.JustDown(globalDroneVariables.desacoplarBote)){
            if (globalDroneVariables.equipo == "Patrullero" && !partida.hayTormenta){
                var boatWithBoat = partida.Patrulleros.Barcos.find(function (input) {
                    return typeof input.bote !== "undefined";
                });
                vehiculoActivo.activo = false;        
                boatWithBoat.bote.activo = true;
                boatWithBoat.bote.acoplado = false;
                boatWithBoat.bote.sprite.setMass(parameters.masaBote);
                isChangingBoatHeli = true;

            }
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
                if(vehiculoActivo.type == "B" && vehiculoDentroMilla200(vehiculoActivo)){

                    if(barcosEnemigosEnRango && barcosEnemigosEnRango.length && globalDroneVariables.enemigoActivo !== null 
                       && vehiculoDentroMilla200(globalDroneVariables.enemigoActivo)){
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

            if (globalDroneVariables.equipo == "Patrullero" && vehiculoActivo.type == "B" && vehiculoActivo.size == "Pesado" 
                && vehiculoDentroMilla200(vehiculoActivo) && globalDroneVariables.enemigoActivo !== null 
                && globalDroneVariables.enemigoActivo.contadorAvisos == 2 
                && tiempoUltimoAvisoCumplido(globalDroneVariables.enemigoActivo.ultimoAvisoRecibido) 
                && vehiculoDentroMilla200(globalDroneVariables.enemigoActivo) ){

                if(vehiculoActivo.armas.canion.ultimoDisparo == null 
                   || ((vehiculoActivo.armas.canion.ultimoDisparo - partida.tiempoRestantePartida) >= vehiculoActivo.armas.canion.cadencia)){

                    var distance = Phaser.Math.Distance.Between(vehiculoActivo.sprite.x, vehiculoActivo.sprite.y, 
                                                                globalDroneVariables.enemigoActivo.sprite.x, globalDroneVariables.enemigoActivo.sprite.y);

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

            if (globalDroneVariables.equipo == "Patrullero" && vehiculoActivo.type == "B" && vehiculoDentroMilla200(vehiculoActivo) 
                && globalDroneVariables.enemigoActivo !== null && vehiculoDentroMilla200(globalDroneVariables.enemigoActivo)  
                && globalDroneVariables.enemigoActivo.contadorAvisos == 2 
                && tiempoUltimoAvisoCumplido(globalDroneVariables.enemigoActivo.ultimoAvisoRecibido)){

                if(vehiculoActivo.armas.ametralladora.ultimoDisparo == null 
                   || ((vehiculoActivo.armas.ametralladora.ultimoDisparo - partida.tiempoRestantePartida) 
                       >= vehiculoActivo.armas.ametralladora.cadencia)){

                    var distance = Phaser.Math.Distance.Between(vehiculoActivo.sprite.x, vehiculoActivo.sprite.y, 
                                                                globalDroneVariables.enemigoActivo.sprite.x, globalDroneVariables.enemigoActivo.sprite.y);

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



        ////// CAPTURA DE PESQUERO PESADO POR HELICOPTERO

        var capturaPorHelicoptero = false;
        if(!getBoatWithHelicopter().helicoptero.acoplado && vehiculoDentroMilla200(partida.Pesqueros.Barcos[1]) 
           && vehiculoDentroMilla200(getBoatWithHelicopter().helicoptero)){

            var distance = Phaser.Math.Distance.Between(getBoatWithHelicopter().helicoptero.sprite.x, getBoatWithHelicopter().helicoptero.sprite.y, 
                                                        partida.Pesqueros.Barcos[1].sprite.x, partida.Pesqueros.Barcos[1].sprite.y);

            if(distance<25){
                capturarBarco(partida.Pesqueros.Barcos[1]);
                capturaPorHelicoptero = true;

            }

        }



        /***********************************************

        GUARDAR Y CARGAR PARTIDA

        ************************************************/
        if(Phaser.Input.Keyboard.JustDown(globalDroneVariables.teclaGuardarPartida))
        {
            partida.guardarPartida = true;
            if(globalDroneVariables.administradorActualizado 
               && partida.equipoAdministrador == globalDroneVariables.equipo)
            {
                globalDroneVariables.administradorActualizado = true;
                if(globalDroneVariables.equipo == "Pesquero")
                    this.add.text(1220, 550, 'Guardado OK');
                else
                    this.add.text(1220, 690, 'Guardado OK');
            }
        }

        /***********************************************

        TECLA TORMENTA

        ************************************************/
        var cambioTormenta = false;
        if(!partida.hayTormenta && Phaser.Input.Keyboard.JustDown(globalDroneVariables.teclaTormenta))
        {
            partida.teclaTormenta = true;
            partida.hayTormenta = true;
            cambioTormenta = true;
        }
        if(partida.hayTormenta && Phaser.Input.Keyboard.JustDown(globalDroneVariables.teclaTormenta))
        {
            partida.teclaTormenta = true;
            partida.hayTormenta = false;
            cambioTormenta = true;
        }
        if(partida.hayTormenta)
        {
            globalDroneVariables.textoTormenta.setText('Hay tormenta!!');
        }
        else
        {
            globalDroneVariables.textoTormenta.setText('No hay tormenta');
        }



        ////// EVALUACION DE GANADOR
        if(evaluarPatrullerosGanadores() || evaluarPesquerosGanadores()){
            partida.hayGanador = true;
        }



        ////// SI HUBO ALGUN CAMBIO SE ENVIA AL SERVIDOR

        if (isMoving || isShooting || isAlerting || capturaPorHelicoptero || barcoFueImpactado || globalDroneVariables.vehiculoVolviendo 
            || partida.guardarPartida || partida.restaurarPartida || cambioTormenta || isChangingBoatHeli || partida.hayGanador){
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

                    case 'salida':

                        if(!partida.hayGanador){
                            if(partida.tiempoRestantePartida >= 1){

                                if(globalDroneVariables.equipo == "Patrullero"){
                                    window.location.replace('error.html?equipoAbandono=Pesquero');

                                }else if(globalDroneVariables.equipo == "Pesquero"){
                                    window.location.replace('error.html?equipoAbandono=Patrullero');
                                }
                                globalDroneVariables.websocket.close();
                                globalDroneVariables.websocketTime.close();

                            }
                        }



                        break;


                }
            }

        };


        if(partida.hayTormenta)
        {
        	mostrarLluvia();
        }
        partida.guardarPartida = false;
    }


});

myGame.scenes.push(DroneViewState);




////// OBTENER EQUIPO DESDE URL

function getVarsFromUrl() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


////// CONVIERTE OBJETO A JSON Y ENVIA A SERVIDOR

function enviarJSON(objeto) {
    let json = JSON.stringify(objeto);
    if(globalDroneVariables.websocket.readyState === WebSocket.OPEN)
    {
        globalDroneVariables.websocket.send(json);
    }

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
                vehiculo.combustible -= (baseConsumo * 8);
                returnToShip(vehiculo);
                break;
            case "L":
                vehiculo.combustible -= (baseConsumo * 4);
                returnToShip(vehiculo);
                break;
        }
    }
}


//Se llama si el combustible del helicóptero o bote es menor a 50
function returnToShip(vehicle)
{
    if(vehicle.combustible < 50 || (partida.hayTormenta && vehicle.type == "L"))
    {
        var target = new Phaser.Math.Vector2();
        target.x = getBoatWithHelicopter().sprite.x;
        target.y = getBoatWithHelicopter().sprite.y;
        var angleToPointer = Phaser.Math.Angle.Between(vehicle.sprite.x, vehicle.sprite.y, target.x, target.y);
        var angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - vehicle.sprite.rotation);
        vehicle.sprite.rotation = angleToPointer;
        vehicle.sprite.setAngularVelocity(0);
        vehicle.sprite.target = target;
        vehicle.sprite.thrust(0);
        vehicle.sprite.thrust(parameters.aceleracion);
        vehicle.regresando = true;
        moveAutomatically(vehicle);
    }
}

//Se llama para el bote y helicóptero 
//Detiene el vehículo si la distancia es menor a 4 px y lo acopla a la patrulla oceánica
function moveAutomatically(vehicle)
{
    if(vehicle.sprite.target != null)
    {
        var distance = Phaser.Math.Distance.Between(vehicle.sprite.x, vehicle.sprite.y, vehicle.sprite.target.x, vehicle.sprite.target.y);
        if (vehicle.sprite.body.speed > 0 && vehicle.regresando)
        {
            globalDroneVariables.vehiculoVolviendo = true;
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
                vehicle.sprite.rotation = getBoatWithHelicopter().sprite.rotation;
                vehicle.sprite.setMass(parameters.masaBarcosPesados);
                vehicle.sprite.setFixedRotation();
                getBoatWithHelicopter().activo = true;
                globalDroneVariables.vehiculoVolviendo = false;
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

function vehiculoDentroMilla200(barco){

    return barco.sprite.y > parameters.milla200_distancia;

}


function capturarBarco(barco){

    if(barco.contadorAvisos == 2 && tiempoUltimoAvisoCumplido(barco.ultimoAvisoRecibido)){

        barco.combustible = 0;
        barco.vida = 0;
        barco.capturado = true;


    }


}			 

function getPescaTotal(){
    var pesca=0;
    partida.Pesqueros.Barcos.forEach(function(item){
        pesca += item.cantidadPesca;
    });
    return pesca;
}


function evaluarPesquerosGanadores(){

    return getPescaTotal() >= parameters.metaPesca;

}

function evaluarPatrullerosGanadores(){

    var barcosEliminados = 0;

    partida.Pesqueros.Barcos.forEach(function(item){

        if(item.capturado || item.hundido){
            barcosEliminados ++;
        }

    });

    return barcosEliminados == 2 || partida.tiempoRestantePartida == 0;

}

function mostrarExplosion(spritePesquero, nivel)
{
	globalDroneVariables.particlesExplosion.createEmitter({
        alpha: { start: 1, end: 0 },
        scale: { start: 0.5, end: nivel/20 },
        tint: { start: 0xff945e, end: 0xff945e },
        speed: 50,
        accelerationY: -100,
        angle: { min: -85, max: -95 },
        rotate: { min: -180, max: 180 },
        lifespan: { min: 1000, max: 1050 },
        blendMode: 'ADD',
        frequency: 50,
        maxParticles: 3,
        x: spritePesquero.x,
        y: spritePesquero.y
    });
}

function mostrarDisparo(spritePatrullero, spritePesquero, nivel)
{
	globalDroneVariables.particlesShot.createEmitter({
		frame: 'yellow',
        x: spritePatrullero.x,
        y: spritePatrullero.y,
        lifespan: 200,
        speed: { min: 400, max: 600 },
        angle: Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(spritePatrullero.x, spritePatrullero.y, spritePesquero.x, spritePesquero.y),
        gravityY: 0,
        scale: { start: nivel, end: 0 },//0.15 metralleta y 0.3 cañon 
        quantity: 2, //GROSOR
        blendMode: 'ADD',
        maxParticles: 10
    });
}


function mostrarLluvia()
{
	globalDroneVariables.particlesRain.createEmitter({
        frame: 'blue',
        x: {min: 0, max: 1200},
        y: 0,
        lifespan: 1000,
        speedY: 800,
        scaleY: .5,
        scaleX: .01,
        quantity: 10,
        blendMode: 'ADD',
        maxParticles: 5
    });
}
