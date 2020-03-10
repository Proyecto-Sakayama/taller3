var parameters = {
    ipServidor: "localhost",
    //ipServidor: "192.168.1.44", //Casa Guz
    //ipServidor: "192.168.1.8", //Casa Marce
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
    metaPesca: 80,
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
    //Sprites
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

var SideViewState = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function SideView() {
        Phaser.Scene.call(this, { key: "SideView" });
    },

    /************************************************************************************************************************************************

                                                                        PRELOAD

    *************************************************************************************************************************************************/

    preload: function () {
        //carga las imagenes al juego
        this.load.image('water', 'assets/side/sidewater.png');
        this.load.image('fishes', 'assets/fishes.png');
        this.load.image('bote1', 'assets/bote1_h.png');
        this.load.image('heli', 'assets/heli1.png');
        this.load.image('patrullero1', 'assets/patrullero1_2.png');
        this.load.image('mask', 'assets/mask.png');
        this.load.image('panel', 'assets/panel.png');

    },



    /************************************************************************************************************************************************

                                                                        CREATE

    *************************************************************************************************************************************************/

    create: function () {

    

        this.matter.world.setBounds(0, 650, 1200, 800);
        var map = this.add.image(600, 725, 'water');
     

        
        console.log('create success');

    },

    /************************************************************************************************************************************************

                                                                        UPDATE

    *************************************************************************************************************************************************/


    update: function () {

     
    }


});

myGame.scenes.push(SideViewState);


