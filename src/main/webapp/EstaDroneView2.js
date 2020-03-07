var parameters = {
    velocidadRotacion: 0.07, //0.007
    aceleracion: 0.04, // 0.004
    distanciaAviso: 150,
    tiempoEntreAvisos: 3 //seconds
};



var globalDroneVariables = {

    //Game
    websocket: null,
    websocketTime: null,
    equipo: null,
    barcosCargados: 0,
    spotlight: null,
    enemigoActivo: null,

    //Messages
    texto: null,
    textoTiempo: null,

    //Keyboard controls
    moverArriba: null,
    moverIzquierda: null,
    moverDerecha: null,

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
    Pesqueros: {
        Barcos: []
    },
    Patrulleros: {
        Barcos: []
    }
};

var DroneViewState = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function DroneView() {
        Phaser.Scene.call(this, { key: "DroneView" });
    },

    preload: function () {
        //carga las imagenes al juego
        this.load.image('water', 'assets/water.jpg');
        this.load.image('bote1', 'assets/bote1_h.png');
        this.load.image('heli', 'assets/heli1.png');
        this.load.image('patrullero1', 'assets/patrullero1_2.png');
        this.load.image('mask', 'assets/mask.png');
        this.load.image('panel', 'assets/panel.png');
    },


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

        globalDroneVariables.spotlight = this.make.sprite({
            x: 200,
            y: 150,
            key: 'mask',
            add: false
        });
        //map.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);


        //PESQUEROS
        var pesquero = this.matter.add.image(100, 200, 'bote1');
        pesquero.setFrictionAir(0.15);
        pesquero.setMass(45);
        pesquero.setFixedRotation();
        pesquero.setAngle(270);
        pesquero.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var pesquero2 = this.matter.add.image(200, 300, 'patrullero1');
        pesquero2.setFrictionAir(0.15);
        pesquero2.setMass(90);
        pesquero2.setFixedRotation();
        pesquero2.setAngle(270);
        pesquero2.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);


        //PATRULLEROS
        var patrullero = this.matter.add.image(300, 300, 'bote1');
        patrullero.setFrictionAir(0.15);
        patrullero.setMass(45);
        patrullero.setFixedRotation();
        patrullero.setAngle(270);
        patrullero.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var patrullero2 = this.matter.add.image(400, 300, 'patrullero1');
        patrullero2.setFrictionAir(0.15);
        patrullero2.setMass(90);
        patrullero2.setFixedRotation();
        patrullero2.setAngle(270);
        patrullero2.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var helicopter = this.matter.add.image(400, 300, 'heli');
        helicopter.setFrictionAir(0.15);
        helicopter.setMass(90);
        helicopter.setFixedRotation();
        helicopter.setAngle(270);
        helicopter.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        var boteSprite = this.matter.add.image(400, 300, 'bote1');
        boteSprite.setFrictionAir(0.15);
        boteSprite.setMass(90);
        boteSprite.setFixedRotation();
        boteSprite.setAngle(270);
        boteSprite.mask = new Phaser.Display.Masks.BitmapMask(this, globalDroneVariables.spotlight);

        //CONEXION JUEGO
        globalDroneVariables.websocket = new WebSocket('ws://localhost:8080/taller3/juego/' + globalDroneVariables.equipo);

        //CONEXION TIMER
        globalDroneVariables.websocketTime = new WebSocket('ws://localhost:8080/taller3/acciones/');
        globalDroneVariables.textoTiempo = this.add.text(1220, 32, 'Tiempo: ' + formatTime(partida.tiempoRestantePartida));



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
            sprite: pesquero,
            cantidadPesca: 0,
            combustible: 100000,
            contadorAvisos: 0,
            ultimoAvisoRecibido: null,
            vida: 100,
            activo: globalDroneVariables.equipo == "Pesquero"
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
            activo: false
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
                    alcance: 75
                }
            },
            combustible: 100,
            activo: globalDroneVariables.equipo == "Patrullero"
        }


        var helicoptero = {
            id: 5,
            type: "H",
            acoplado: true,
            sprite: helicopter,
            combustible: 100,
            activo: false
        }

        var boteOb = {
            id: 6,
            type: "L",
            acoplado: true,
            sprite: boteSprite,
            combustible: 100,
            activo: false
        }



        var barcoPatrullero2 = {
            id: 4,
            type: "B",
            size: "Pesado",
            sprite: patrullero2,
            armas: {
                ametralladora: {
                    cadencia: 2,
                    nivelDanio: 5,
                    alcance: 75
                },
                canion: {
                    cadencia: 1,
                    nivelDanio: 10,
                    alcance: 150
                }
            },
            combustible: 100,
            activo: false,
            helicoptero: helicoptero,
            bote: boteOb
        }

        partida.Patrulleros.Barcos.push(barcoPatrullero);
        partida.Patrulleros.Barcos.push(barcoPatrullero2);
        partida.Pesqueros.Barcos.push(barcoPesquero);
        partida.Pesqueros.Barcos.push(barcoPesquero2);

        console.log('create success');

    },

    update: function () {

        var change = false;

        //Se obtiene el bote activo que es controlado por el usuario (solo uno en cada momento)
        var vahiculoActivo = null;
        if (globalDroneVariables.equipo == "Patrullero") {
            vahiculoActivo = partida.Patrulleros.Barcos.find(function (input) {
                return input.activo;
            });

        } else {
            vahiculoActivo = partida.Pesqueros.Barcos.find(function (input) {
                return input.activo;
            });

        }

        if (vahiculoActivo == undefined || vahiculoActivo == null){
            var boatWithHelicopter = partida.Patrulleros.Barcos.find(function (input) {

                return typeof input.helicoptero !== "undefined";
            });

            if(boatWithHelicopter.helicoptero.activo){
                vahiculoActivo = boatWithHelicopter.helicoptero;
            }else if(boatWithHelicopter.bote.activo){
                vahiculoActivo = boatWithHelicopter.bote;
            }
        }




        if(globalDroneVariables.equipo == "Patrullero"){

            var barcosEnemigosEnRango = [];

            partida.Pesqueros.Barcos.forEach(function(item){
                var distance = Phaser.Math.Distance.Between(vahiculoActivo.sprite.x, vahiculoActivo.sprite.y, item.sprite.x, item.sprite.y);

                if(distance <= parameters.distanciaAviso){
                    barcosEnemigosEnRango.push(item);
                }
            });

            if(!barcosEnemigosEnRango.length){
                globalDroneVariables.enemigoActivo = null;
            }else if(globalDroneVariables.enemigoActivo == null){
                globalDroneVariables.enemigoActivo = barcosEnemigosEnRango[0];

            }

        }






        //Actualizacion en pantalla del panel derecho de informacion

        switch (vahiculoActivo.type){

            case "B":
                if(globalDroneVariables.equipo == "Patrullero"){
                    globalDroneVariables.InfoVehiculo_Info1T.setText('Tipo:');
                    globalDroneVariables.InfoVehiculo_Info1.setText('PATRULLA');
                    globalDroneVariables.InfoVehiculo_Info2T.setText('Categoria:');
                    globalDroneVariables.InfoVehiculo_Info2.setText(vahiculoActivo.size.toUpperCase());                   
                    globalDroneVariables.InfoVehiculo_Info3T.setText('Combustible:');
                    globalDroneVariables.InfoVehiculo_Info3.setText(Math.round(vahiculoActivo.combustible));
                    globalDroneVariables.InfoVehiculo_Info4T.setText('Enemigo en mira:');
                    globalDroneVariables.InfoVehiculo_Info4.setText('PESQUERO ' + globalDroneVariables.enemigoActivo.size.toUpperCase);
                    globalDroneVariables.InfoVehiculo_Info4T.addColor('#ff0000', 50);
                    globalDroneVariables.InfoVehiculo_Info4T.addColor('#ff0000', 50);
                }else{
                    globalDroneVariables.InfoVehiculo_Info1T.setText('Tipo:');
                    globalDroneVariables.InfoVehiculo_Info1.setText('PESQUERO');
                    globalDroneVariables.InfoVehiculo_Info2T.setText('Categoria:');
                    globalDroneVariables.InfoVehiculo_Info2.setText(vahiculoActivo.size.toUpperCase()); 
                    globalDroneVariables.InfoVehiculo_Info3T.setText('Vida:');
                    globalDroneVariables.InfoVehiculo_Info3.setText(vahiculoActivo.vida);
                    globalDroneVariables.InfoVehiculo_Info4T.setText('Pesca:');
                    globalDroneVariables.InfoVehiculo_Info4.setText(vahiculoActivo.cantidadPesca);
                    globalDroneVariables.InfoVehiculo_Info5T.setText('Avisos:');
                    globalDroneVariables.InfoVehiculo_Info5.setText(vahiculoActivo.contadorAvisos);
                }
                break;
            case "H": 
                globalDroneVariables.InfoVehiculo_Info1T.setText('Tipo:');
                globalDroneVariables.InfoVehiculo_Info1.setText('PATRULLA');
                globalDroneVariables.InfoVehiculo_Info2T.setText('Categoria:');
                globalDroneVariables.InfoVehiculo_Info2.setText("HELICOPTERO"); 
                globalDroneVariables.InfoVehiculo_Info3T.setText('Combustible:');
                globalDroneVariables.InfoVehiculo_Info3.setText(Math.round(vahiculoActivo.combustible));
                break;
            case "L":
                globalDroneVariables.InfoVehiculo_Info1T.setText('Tipo:');
                globalDroneVariables.InfoVehiculo_Info1.setText('PATRULLA');
                globalDroneVariables.InfoVehiculo_Info2T.setText('Categoria:');
                globalDroneVariables.InfoVehiculo_Info2.setText("BOTE"); 
                globalDroneVariables.InfoVehiculo_Info3T.setText('Combustible:');
                globalDroneVariables.InfoVehiculo_Info3.setText(Math.round(vahiculoActivo.combustible));
                break;
        }



        //UPDATE DE INFO DE VEHICULO ACTIVO

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
                    //if (boat.id != vahiculoActivo.id){

                    var boteServer  = partidaFromServer.Pesqueros.Barcos.find(function(item){
                        return item.id == boat.id;
                    });

                    setMovement(boat, boteServer.sprite);
                    boat.contadorAvisos = boteServer.contadorAvisos;
                    //}                      

                });



            }

        }

        //Send Movement
        var isMoving = false;
        if (globalDroneVariables.moverIzquierda.isDown && vahiculoActivo.combustible > 0) {
            //vahiculoActivo.sprite.setAngularVelocity(-0.09);
            vahiculoActivo.sprite.rotation -= parameters.velocidadRotacion;
            if(vahiculoActivo.helicoptero !== undefined && vahiculoActivo.helicoptero.acoplado){
                //vahiculoActivo.helicoptero.sprite.setAngularVelocity(-0.09);
                vahiculoActivo.helicoptero.sprite.rotation -= parameters.velocidadRotacion;
            }
            if(vahiculoActivo.bote !== undefined && vahiculoActivo.bote.acoplado){
                //vahiculoActivo.bote.sprite.setAngularVelocity(-0.09);
                vahiculoActivo.bote.sprite.rotation -= parameters.velocidadRotacion;
            }
            consumirCombustible(vahiculoActivo);

            isMoving = true;
        }
        else if (globalDroneVariables.moverDerecha.isDown && vahiculoActivo.combustible > 0) { //if (globalDroneVariables.cursors.right.isDown) {
            //vahiculoActivo.sprite.setAngularVelocity(0.09);
            vahiculoActivo.sprite.rotation += parameters.velocidadRotacion;
            if(vahiculoActivo.helicoptero !== undefined && vahiculoActivo.helicoptero.acoplado){
                //vahiculoActivo.helicoptero.sprite.setAngularVelocity(0.09);
                vahiculoActivo.helicoptero.sprite.rotation += parameters.velocidadRotacion;
            }
            if(vahiculoActivo.bote !== undefined && vahiculoActivo.bote.acoplado){
                //vahiculoActivo.bote.sprite.setAngularVelocity(0.09);
                vahiculoActivo.bote.sprite.rotation += parameters.velocidadRotacion;
            }
            consumirCombustible(vahiculoActivo);
            isMoving = true;
        }

        if (globalDroneVariables.moverArriba.isDown && vahiculoActivo.combustible > 0) {
            vahiculoActivo.sprite.thrust(parameters.aceleracion);
            if(vahiculoActivo.helicoptero !== undefined && vahiculoActivo.helicoptero.acoplado){
                vahiculoActivo.helicoptero.sprite.thrust(parameters.aceleracion);
            }
            if(vahiculoActivo.bote !== undefined && vahiculoActivo.bote.acoplado){
                vahiculoActivo.bote.sprite.thrust(parameters.aceleracion);
            }
            consumirCombustible(vahiculoActivo);
            isMoving = true;
        }

        globalDroneVariables.spotlight.x = vahiculoActivo.sprite.x;
        globalDroneVariables.spotlight.y = vahiculoActivo.sprite.y;

        //is shooting
        var isShooting = false;
        /*
        if (Phaser.Input.Keyboard.KeyCodes.SPACE) {
            //TODO
            //isShooting = true;
        }
*/




        //Change active boat
        var newAcvtiveBoat = null; 
        if (Phaser.Input.Keyboard.JustDown(globalDroneVariables.cambiarBarcoPropio))
        {
            if (globalDroneVariables.equipo == "Pesquero") {
                newAcvtiveBoat = partida.Pesqueros.Barcos.find(function (input) {
                    return !input.activo; 
                });
            }
            else {
                newAcvtiveBoat = partida.Patrulleros.Barcos.find(function (input) {
                    return !input.activo; 
                });
            }
        }      


        if (newAcvtiveBoat != null) {
            vahiculoActivo.activo = false;
            newAcvtiveBoat.activo = true;
        }


        if (globalDroneVariables.desacoplarHelicoptero.isDown){
            if (globalDroneVariables.equipo == "Patrullero"){
                var boatWithHelicopter = partida.Patrulleros.Barcos.find(function (input) {
                    return typeof input.helicoptero !== "undefined";
                });
                vahiculoActivo.activo = false;        
                boatWithHelicopter.helicoptero.activo = true;
                boatWithHelicopter.helicoptero.acoplado = false;
                boatWithHelicopter.helicoptero.sprite.setMass(22);
            }
        }

        if (globalDroneVariables.desacoplarBote.isDown){
            if (globalDroneVariables.equipo == "Patrullero"){
                var boatWithBoat = partida.Patrulleros.Barcos.find(function (input) {
                    return typeof input.bote !== "undefined";
                });
                vahiculoActivo.activo = false;        
                boatWithBoat.bote.activo = true;
                boatWithBoat.bote.acoplado = false;
                boatWithBoat.bote.sprite.setMass(32);

            }
        }



        if(vahiculoActivo.type == "H" && !vahiculoActivo.acoplado && !isMoving){
            consumirCombustible(vahiculoActivo);
        }



        //////////////////////////////////////////////////////////////////
        if (Phaser.Input.Keyboard.JustDown(globalDroneVariables.cambiarBarcoEnemigo))
        {
            if (globalDroneVariables.equipo == "Patrullero") {
                newEnemyBoat = barcosEnemigosEnRango.find(function (input) {
                    return input.id != globalDroneVariables.enemigoActivo.id;
                });
                globalDroneVariables.enemigoActivo = newEnemyBoat;
            }
        }          



        var isAlerting = false;
        if( Phaser.Input.Keyboard.JustDown(globalDroneVariables.avisarPesquero)){

            if (globalDroneVariables.equipo == "Patrullero"){
                if(vahiculoActivo.type == "B"){

                    if(barcosEnemigosEnRango && barcosEnemigosEnRango.length && globalDroneVariables.enemigoActivo !== null){
                        isAlerting = true;

                        var barcoEnemigoAAvisar = partida.Pesqueros.Barcos.find(function(item){
                            return item.id == globalDroneVariables.enemigoActivo.id;

                        });

                        barcoEnemigoAAvisar.contadorAvisos ++;

                        /*
                        barcosEnemigosEnRango.forEach(function(item){

                            var barcoEnemigoAAvisar = partida.Pesqueros.Barcos.find(function(item2){
                                return item.id == item2.id;

                            });

                            barcoEnemigoAAvisar.contadorAvisos ++;

                        });
                        */
                    }


                    /* if(true//Distancia de vahiculoActivo y enemigoSeleccionado es menor a parameters.distanciaAviso y enemigoSeleccionado.avisos menor a 2 y diferencia entre tiempo de partida y enemigoSeleccionado.ultimoAviso es mayor o igual a parameters.tiempoEntreAvisos)
                      ){
                        //enemigoSeleccionado.avisos += 1;
                        //enemigoSeleccionado.ultimoAviso = globaldronevariables.tiemporestantepartida

                    }
                    */
                }


            }
        }


        if (isMoving || isShooting || isAlerting){
            enviarJSON(partida);
        }

        //TIEMPO

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


/**************************
    AUXILIARY FUNCTIONS
***************************/


function getTeamFromUrl() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars["equipo"];
}

function enviarJSON(objeto) {
    let json = JSON.stringify(objeto);
    globalDroneVariables.websocket.send(json);
}

function formatTime(seconds){
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
}

function formatSeconds(time){
    seconds = (time.substr(0,2) * 60) + time.substr(3,5);
    return seconds;
}

function setMovement(boat, sprite) {
    boat.sprite.x = sprite.x;
    boat.sprite.y = sprite.y;
    //boat.sprite.angle = sprite.angle;
    boat.sprite.rotation = sprite.rotation;
}

function consumirCombustible(vehiculo){

    let baseConsumo = 0.05; //Barco Pesado
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
                break;
            case "L":
                vehiculo.combustible -= (baseConsumo / 4);
                break;
        }
    }
}
