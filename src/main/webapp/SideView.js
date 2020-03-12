var globalSideVariables = {

    spritePatrulleroLivianoU: null,
    spritePatrulleroLivianoD: null,
    spritePatrulleroLivianoL: null,
    spritePatrulleroLivianoR: null,

    spritePatrulleroPesadoU: null,
    spritePatrulleroPesadoD: null,
    spritePatrulleroPesadoL: null,
    spritePatrulleroPesadoR: null,

    spritePesqueroLivianoU: null,
    spritePesqueroLivianoD: null,
    spritePesqueroLivianoL: null,
    spritePesqueroLivianoR: null,

    spritePesqueroPesadoU: null,
    spritePesqueroPesadoD: null,
    spritePesqueroPesadoL: null,
    spritePesqueroPesadoR: null,
    
    spotlight: null
};

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

        this.load.image('livianoU', 'assets/side/livianoU.png');
        this.load.image('livianoD', 'assets/side/livianoD.png');
        this.load.image('livianoL', 'assets/side/livianoL.png');
        this.load.image('livianoR', 'assets/side/livianoR.png');

        this.load.image('pesadoU', 'assets/side/pesadoU.png');
        this.load.image('pesadoD', 'assets/side/pesadoD.png');
        this.load.image('pesadoL', 'assets/side/pesadoL.png');
        this.load.image('pesadoR', 'assets/side/pesadoR.png');


    },



    /************************************************************************************************************************************************

                                                                        CREATE

    *************************************************************************************************************************************************/

    create: function () {

        //DEFINICION DE AREA DE JUEGO
        this.matter.world.setBounds(0, 651, 1200, 751);
        var sideMap = this.add.image(597, 700, 'sideWater');


        var helicopterSide = this.matter.add.image(1000, 300, 'heliSide');
        var boteSpriteSide = this.matter.add.image(1000, 300, 'bote1Side');

        
              
        
        /**************
        
        RESTA EXTENDER TODO A LAS DIAGONALES TAMBIEN, CAMBIAR LAS FOTOS Y REVISAR EL ESCALADO MAXIMO
        TAMBIEN RESTA AGREGAR TODO PARA HELICOPTERO Y BOTE
        
        **************/
        
        
        
        // SPRITES PATRULLERO LIVIANO
        globalSideVariables.spritePatrulleroLivianoU = this.matter.add.image(200, 700, 'livianoU');
        globalSideVariables.spritePatrulleroLivianoD = this.matter.add.image(200, 700, 'livianoD');
        globalSideVariables.spritePatrulleroLivianoL = this.matter.add.image(200, 700, 'livianoL');
        globalSideVariables.spritePatrulleroLivianoR = this.matter.add.image(200, 700, 'livianoR');
        

        globalSideVariables.spritePatrulleroLivianoU.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoD.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoL.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoR.setVisible(false);

        // SPRITES PATRULLERO PESADO
        globalSideVariables.spritePatrulleroPesadoU = this.matter.add.image(1000, 300, 'pesadoU');
        globalSideVariables.spritePatrulleroPesadoD = this.matter.add.image(1000, 300, 'pesadoD');
        globalSideVariables.spritePatrulleroPesadoL = this.matter.add.image(1000, 300, 'pesadoL');
        globalSideVariables.spritePatrulleroPesadoR = this.matter.add.image(1000, 300, 'pesadoR');

        globalSideVariables.spritePatrulleroPesadoU.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoD.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoL.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoR.setVisible(false);

        // SPRITES PESQUERO LIVIANO
        globalSideVariables.spritePesqueroLivianoU = this.matter.add.image(400, 50, 'livianoU');
        globalSideVariables.spritePesqueroLivianoD = this.matter.add.image(400, 50, 'livianoD');
        globalSideVariables.spritePesqueroLivianoL = this.matter.add.image(400, 50, 'livianoL');
        globalSideVariables.spritePesqueroLivianoR = this.matter.add.image(400, 50, 'livianoR');

        globalSideVariables.spritePesqueroLivianoU.setVisible(false);
        globalSideVariables.spritePesqueroLivianoD.setVisible(false);
        globalSideVariables.spritePesqueroLivianoL.setVisible(false);
        globalSideVariables.spritePesqueroLivianoR.setVisible(false);

        // SPRITES PESQUERO PESADO
        globalSideVariables.spritePesqueroPesadoU = this.matter.add.image(800, 50, 'pesadoU');
        globalSideVariables.spritePesqueroPesadoD = this.matter.add.image(800, 50, 'pesadoD');
        globalSideVariables.spritePesqueroPesadoL = this.matter.add.image(800, 50, 'pesadoL');
        globalSideVariables.spritePesqueroPesadoR = this.matter.add.image(800, 50, 'pesadoR');

        globalSideVariables.spritePesqueroPesadoU.setVisible(false);
        globalSideVariables.spritePesqueroPesadoD.setVisible(false);
        globalSideVariables.spritePesqueroPesadoL.setVisible(false);
        globalSideVariables.spritePesqueroPesadoR.setVisible(false);


        //CARGA DE OBJETOS
        var barcoPatrulla1 = {
            id: 3,
            tipo: "Patrullero",
            categoria: "Liviano",
            sprite: globalSideVariables.spritePatrulleroLivianoU,
            orientacion: null
        }

        var barcoPatrulla2 = {
            id: 4,
            tipo: "Patrullero",
            categoria: "Pesado",
            sprite: globalSideVariables.spritePatrulleroPesadoU,
            orientacion: null
        }


        var barcoPesquero1 = {
            id: 1,
            tipo: "Pesquero",
            categoria: "Liviano",
            sprite: globalSideVariables.spritePesqueroLivianoD,
            orientacion: null,
            hundido: false
        }

        var barcoPesquero2 = {
            id: 2,
            tipo: "Pesquero",
            categoria: "Pesado",
            sprite: globalSideVariables.spritePesqueroPesadoD,
            orientacion: null,
            hundido: false
        }

        var helicopteroOb = {
            id: 5,
            tipo: "Patrullero",
            categoria: "H",
            sprite: helicopterSide,
            orientacion: null
        }

        var boteOb = {
            id: 6,
            tipo: "Patrullero",
            categoria: "B",
            sprite: boteSpriteSide,
            orientacion: null
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

            asignarImagenSprite(barcoAActualizar);

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

                asignarImagenSprite(barcoAActualizar);

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



function getSideY(droneViewY){

    var maxDroneViewY = 650; // Tamaño 650 px
    var maxSideViewY = 70; // Tamaño 100 px
    var screenToJump = maxDroneViewY + 31; //Para que los barcos no circulen por el cielo

    var sideY = (droneViewY / (maxDroneViewY / maxSideViewY)) + screenToJump;

    return sideY;

}


function getSideHelicopterY(droneViewY){

    var maxDroneViewY = 650; // Tamaño 650 px
    var maxSideViewY = 70; // Tamaño 100 px
    var screenToJump = maxDroneViewY + 11; // Para que el helicptero si circule por el cielo pero no llegue al borde

    var sideY = (droneViewY / (maxDroneViewY / maxSideViewY)) + screenToJump;

    return sideY;

}

function scaleVehicule(vehiculoSprite){

    var sideY = vehiculoSprite.y - 650;
    var minScale = 0.3; // Lo mas lejos reduce la imagen 2 tercios
    var maxScale = 1.5; // Lo mas cerca amplia la imagen al 50%
    var maxSideViewY = 70;
    var relacionTamanioImagen = 1; 

    var scale = ((sideY * maxScale) / maxSideViewY ) * relacionTamanioImagen;

    if(scale < minScale){
        scale = minScale;
    }

    return scale;

}



function definirOrientacionVehiculo(vehiculoLocal, vehiculoServer){

    if(vehiculoServer.sprite.rotation >= -0.40 && vehiculoServer.sprite.rotation < 0.40){
        vehiculoLocal.orientacion = "R";
    } else if(vehiculoServer.sprite.rotation >= 0.40 && vehiculoServer.sprite.rotation < 1.2){
        vehiculoLocal.orientacion = "DR";
    }else if(vehiculoServer.sprite.rotation >= 1.2 && vehiculoServer.sprite.rotation < 2){
        vehiculoLocal.orientacion = "D";
    }else if(vehiculoServer.sprite.rotation >= 2 && vehiculoServer.sprite.rotation < 2.8){
        vehiculoLocal.orientacion = "DL";
    }else if(vehiculoServer.sprite.rotation >= 2.8 || vehiculoServer.sprite.rotation < -2.7){
        vehiculoLocal.orientacion = "L";
    }else if(vehiculoServer.sprite.rotation >= -2.7 && vehiculoServer.sprite.rotation < -1.9){
        vehiculoLocal.orientacion = "UL";
    }else if(vehiculoServer.sprite.rotation >= -1.9 && vehiculoServer.sprite.rotation < -1.1){
        vehiculoLocal.orientacion = "U";
    }else if(vehiculoServer.sprite.rotation >= -1.1 && vehiculoServer.sprite.rotation < -0.40){
        vehiculoLocal.orientacion = "UR";
    }

}



function setMovementAndSize(vehiculoLocal, vehiculoServer){
    vehiculoLocal.sprite.x = vehiculoServer.sprite.x;
    vehiculoLocal.sprite.y =  getSideY(vehiculoServer.sprite.y);
    vehiculoLocal.sprite.setScale(scaleVehicule(vehiculoLocal.sprite));
}

function asignarImagenSprite(vehiculo){

    var x = vehiculo.sprite.x;
    var y = vehiculo.sprite.y;

    vehiculo.sprite.setVisible(false);
    vehiculo.sprite.x = 1300;

    if(vehiculo.tipo == "Patrullero"){
        if(vehiculo.categoria == "Liviano"){
            if(vehiculo.orientacion == "R"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoR;
            }else if(vehiculo.orientacion == "DR"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoR; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoD; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoL; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoU; //Cambiar por diagonal
            }

        }else{
            if(vehiculo.orientacion == "R"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoR;
            }else if(vehiculo.orientacion == "DR"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoR; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoD; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoL; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoU; //Cambiar por diagonal
            }

        }
    }else{
        if(vehiculo.categoria == "Liviano"){
            if(vehiculo.orientacion == "R"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoR;
            }else if(vehiculo.orientacion == "DR"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoR; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoD; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoL; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoU; //Cambiar por diagonal
            }

        }else if(vehiculo.categoria == "Pesado"){
            if(vehiculo.orientacion == "R"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoR;
            }else if(vehiculo.orientacion == "DR"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoR; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoD; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoL; //Cambiar por diagonal
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoU; //Cambiar por diagonal
            }

        }
    }


    vehiculo.sprite.x = x;
    vehiculo.sprite.y = y;

    vehiculo.sprite.setVisible(true);

}