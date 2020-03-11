var vehiculosSideView = {

    Pesqueros: {
        Barcos: []
    },
    Patrulleros: {
        Barcos: []
    },
    Helicoptero: null,
    Bote: null    
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
        this.load.image('sideWater', 'assets/side/sidewater.png');
        this.load.image('bote1Side', 'assets/bote1_h.png');
        this.load.image('heliSide', 'assets/heli1.png');
        this.load.image('patrullero1Side', 'assets/patrullero1_h.png');
        this.load.image('maskSide', 'assets/mask.png');

    },



    /************************************************************************************************************************************************

                                                                        CREATE

    *************************************************************************************************************************************************/

    create: function () {

        //DEFINICION DE AREA DE JUEGO
        this.matter.world.setBounds(0, 651, 1200, 751);
        var sideMap = this.add.image(597, 700, 'sideWater');

        //CARGA DE SPRITES
        var patrulleroSide1 = this.matter.add.image(200, 700, 'bote1Side');
        var patrulleroSide2 = this.matter.add.image(1000, 300, 'patrullero1Side');
        var pesqueroSide1 = this.matter.add.image(400, 50, 'bote1Side');
        var pesqueroSide2 = this.matter.add.image(800, 50, 'patrullero1Side');
        var helicopterSide = this.matter.add.image(1000, 300, 'heliSide');
        var boteSpriteSide = this.matter.add.image(1000, 300, 'bote1Side');


        //CARGA DE OBJETOS
        var barcoPatrulla1 = {
            id: 3,
            sprite: patrulleroSide1,
            orientacionVertical: null,
            orientacionHorizontal: null
        }

        var barcoPatrulla2 = {
            id: 4,
            sprite: patrulleroSide2,
            orientacionVertical: null,
            orientacionHorizontal: null
        }


        var barcoPesquero1 = {
            id: 1,
            sprite: pesqueroSide1,
            hundido: false,
            orientacionVertical: null,
            orientacionHorizontal: null
        }

        var barcoPesquero2 = {
            id: 2,
            sprite: pesqueroSide2,
            hundido: false,
            orientacionVertical: null,
            orientacionHorizontal: null
        }

        var helicopteroOb = {
            id: 5,
            sprite: helicopterSide,
            orientacionVertical: null,
            orientacionHorizontal: null
        }

        var boteOb = {
            id: 6,
            sprite: pesqueroSide2,
            orientacionVertical: null,
            orientacionHorizontal: null
        }



        //INTEGRO VEHICULOS A LA PARTIDA
        vehiculosSideView.Patrulleros.Barcos.push(barcoPatrulla1);
        vehiculosSideView.Patrulleros.Barcos.push(barcoPatrulla2);
        vehiculosSideView.Pesqueros.Barcos.push(barcoPesquero1);
        vehiculosSideView.Pesqueros.Barcos.push(barcoPesquero2);
        vehiculosSideView.Helicoptero = helicopteroOb;
        vehiculosSideView.Bote = boteOb;


        console.log('create success');

    },

    /************************************************************************************************************************************************

                                                                        UPDATE

    *************************************************************************************************************************************************/


    update: function () {

        partida.Patrulleros.Barcos.forEach(function(barcoFromServerSide){

            var barcoAActualizar = vehiculosSideView.Patrulleros.Barcos.find(function (itemSide){

                return itemSide.id == barcoFromServerSide.id;

            });

            definirOrientacionVehiculo(barcoAActualizar, barcoFromServerSide);

            setMovementAndSize(barcoAActualizar, barcoFromServerSide);
        });




        partida.Pesqueros.Barcos.forEach(function(barcoFromServerSide){

            var barcoAActualizar = vehiculosSideView.Pesqueros.Barcos.find(function (itemSide){

                return itemSide.id == barcoFromServerSide.id;

            });

            if(barcoAActualizar !== null){
                barcoAActualizar.hundido = barcoFromServerSide.hundido;

                if(barcoAActualizar.hundido){
                    barcoAActualizar.sprite.setVisible(false);

                }

                definirOrientacionVehiculo(barcoAActualizar, barcoFromServerSide);
                
                setMovementAndSize(barcoAActualizar, barcoFromServerSide);
            }


        });



        definirOrientacionVehiculo(vehiculosSideView.Helicoptero, partida.Patrulleros.Barcos[1].helicoptero);
        vehiculosSideView.Helicoptero.sprite.x = partida.Patrulleros.Barcos[1].helicoptero.sprite.x;
        vehiculosSideView.Helicoptero.sprite.y = getSideHelicopterY(partida.Patrulleros.Barcos[1].helicoptero.sprite.y);
        vehiculosSideView.Helicoptero.sprite.setScale(scaleVehicule(vehiculosSideView.Helicoptero.sprite));

        definirOrientacionVehiculo(vehiculosSideView.Bote, partida.Patrulleros.Barcos[1].bote);
        vehiculosSideView.Bote.sprite.x = partida.Patrulleros.Barcos[1].bote.sprite.x;
        vehiculosSideView.Bote.sprite.y = getSideY(partida.Patrulleros.Barcos[1].bote.sprite.y);    
        vehiculosSideView.Bote.sprite.setScale(scaleVehicule(vehiculosSideView.Bote.sprite));


    }

});

myGame.scenes.push(SideViewState);


/*
function getSideY(droneViewY){

    var maxDroneViewY = 650; // Tamaño 650 px
    var maxSideViewY = 100; // Tamaño 100 px
    var screenToJump = maxDroneViewY + 1;

    var sideY = (droneViewY / (maxDroneViewY / maxSideViewY)) + screenToJump;

    return sideY;

}
*/

function getSideY(droneViewY){

    var maxDroneViewY = 650; // Tamaño 650 px
    var maxSideViewY = 70; // Tamaño 100 px
    var screenToJump = maxDroneViewY + 31;

    var sideY = (droneViewY / (maxDroneViewY / maxSideViewY)) + screenToJump;

    return sideY;

}


function getSideHelicopterY(droneViewY){

    var maxDroneViewY = 650; // Tamaño 650 px
    var maxSideViewY = 70; // Tamaño 100 px
    var screenToJump = maxDroneViewY + 11;

    var sideY = (droneViewY / (maxDroneViewY / maxSideViewY)) + screenToJump;

    return sideY;

}

function scaleVehicule(vehiculoSprite){

    var sideY = vehiculoSprite.y - 650;
    var minScale = 0.3;
    var maxScale = 1.5;
    var maxSideViewY = 70;
    var relacionTamanioImagen = 1;

    var scale = ((sideY * maxScale) / maxSideViewY ) * relacionTamanioImagen;

    if(scale < minScale){
        scale = minScale;
    }

    return scale;

}


function definirOrientacionVehiculo(vehiculoLocal, vehiculoServer){

    if(vehiculoServer.sprite.x > vehiculoLocal.sprite.x){
        vehiculoLocal.orientacionHorizontal = "R";
    }else if(vehiculoServer.sprite.x < vehiculoLocal.sprite.x){
        vehiculoLocal.orientacionHorizontal = "L";
    }else{
        vehiculoLocal.orientacionHorizontal = "ND";
    }

    if(vehiculoServer.sprite.y > vehiculoLocal.sprite.y){
        vehiculoLocal.orientacionVertical = "D";
    }else if(vehiculoServer.sprite.y < vehiculoLocal.sprite.y){
        vehiculoLocal.orientacionVertical = "U";
    }else{
        vehiculoLocal.orientacionVertical = "ND";
    }

}

function setMovementAndSize(vehiculoLocal, vehiculoServer){
    vehiculoLocal.sprite.x = vehiculoServer.sprite.x;
    vehiculoLocal.sprite.y =  getSideY(vehiculoServer.sprite.y);
    vehiculoLocal.sprite.setScale(scaleVehicule(vehiculoLocal.sprite));
}