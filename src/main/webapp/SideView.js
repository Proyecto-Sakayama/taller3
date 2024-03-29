var globalSideVariables = {

    spritePatrulleroLivianoU: null,
    spritePatrulleroLivianoD: null,
    spritePatrulleroLivianoL: null,
    spritePatrulleroLivianoR: null,
    spritePatrulleroLivianoUL: null,
    spritePatrulleroLivianoUR: null,
    spritePatrulleroLivianoDL: null,
    spritePatrulleroLivianoDR: null,

    spritePatrulleroPesadoU: null,
    spritePatrulleroPesadoD: null,
    spritePatrulleroPesadoL: null,
    spritePatrulleroPesadoR: null,
    spritePatrulleroPesadoUL: null,
    spritePatrulleroPesadoUR: null,
    spritePatrulleroPesadoDL: null,
    spritePatrulleroPesadoDR: null,

    spritePesqueroLivianoU: null,
    spritePesqueroLivianoD: null,
    spritePesqueroLivianoL: null,
    spritePesqueroLivianoR: null,
    spritePesqueroLivianoUL: null,
    spritePesqueroLivianoUR: null,
    spritePesqueroLivianoDL: null,
    spritePesqueroLivianoDR: null,

    spritePesqueroPesadoU: null,
    spritePesqueroPesadoD: null,
    spritePesqueroPesadoL: null,
    spritePesqueroPesadoR: null,
    spritePesqueroPesadoUL: null,
    spritePesqueroPesadoUR: null,
    spritePesqueroPesadoDL: null,
    spritePesqueroPesadoDR: null,

    spriteHelicopteroU: null,
    spriteHelicopteroD: null,
    spriteHelicopteroL: null,
    spriteHelicopteroR: null,
    spriteHelicopteroUL: null,
    spriteHelicopteroUR: null,
    spriteHelicopteroDL: null,
    spriteHelicopteroDR: null,

    spriteBoteU: null,
    spriteBoteD: null,
    spriteBoteL: null,
    spriteBoteR: null,
    spriteBoteUL: null,
    spriteBoteUR: null,
    spriteBoteDL: null,
    spriteBoteDR: null,

    spotlight: null,
    
    particlesExplosion: null,
    particlesShot: null,
    particlesRain: null,
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
        this.load.image('maskSide', 'assets/side/maskSide.png');

        //PATRULLERO LIVIANO DIRECCION
        this.load.image('patrulleroLivianoU', 'assets/side/patrulleroLivianoU.png');
        this.load.image('patrulleroLivianoD', 'assets/side/patrulleroLivianoD.png');
        this.load.image('patrulleroLivianoL', 'assets/side/patrulleroLivianoL.png');
        this.load.image('patrulleroLivianoR', 'assets/side/patrulleroLivianoR.png');
        this.load.image('patrulleroLivianoUL', 'assets/side/patrulleroLivianoUL.png');
        this.load.image('patrulleroLivianoUR', 'assets/side/patrulleroLivianoUR.png');
        this.load.image('patrulleroLivianoDL', 'assets/side/patrulleroLivianoDL.png');
        this.load.image('patrulleroLivianoDR', 'assets/side/patrulleroLivianoDR.png');

        //PATRULLERO PESADO DIRECCION
        this.load.image('patrulleroPesadoU', 'assets/side/patrulleroPesadoU.png');
        this.load.image('patrulleroPesadoD', 'assets/side/patrulleroPesadoD.png');
        this.load.image('patrulleroPesadoL', 'assets/side/patrulleroPesadoL.png');
        this.load.image('patrulleroPesadoR', 'assets/side/patrulleroPesadoR.png');
        this.load.image('patrulleroPesadoUL', 'assets/side/patrulleroPesadoUL.png');
        this.load.image('patrulleroPesadoUR', 'assets/side/patrulleroPesadoUR.png');
        this.load.image('patrulleroPesadoDL', 'assets/side/patrulleroPesadoDL.png');
        this.load.image('patrulleroPesadoDR', 'assets/side/patrulleroPesadoDR.png');

        //PESQUERO LIVIANO DIRECCION
        this.load.image('pesqueroLivianoU', 'assets/side/pesqueroLivianoU.png');
        this.load.image('pesqueroLivianoD', 'assets/side/pesqueroLivianoD.png');
        this.load.image('pesqueroLivianoL', 'assets/side/pesqueroLivianoL.png');
        this.load.image('pesqueroLivianoR', 'assets/side/pesqueroLivianoR.png');
        this.load.image('pesqueroLivianoUL', 'assets/side/pesqueroLivianoUL.png');
        this.load.image('pesqueroLivianoUR', 'assets/side/pesqueroLivianoUR.png');
        this.load.image('pesqueroLivianoDL', 'assets/side/pesqueroLivianoDL.png');
        this.load.image('pesqueroLivianoDR', 'assets/side/pesqueroLivianoDR.png');

        //PESQUERO PESADO DIRECCION
        this.load.image('pesqueroPesadoU', 'assets/side/pesqueroPesadoU.png');
        this.load.image('pesqueroPesadoD', 'assets/side/pesqueroPesadoD.png');
        this.load.image('pesqueroPesadoL', 'assets/side/pesqueroPesadoL.png');
        this.load.image('pesqueroPesadoR', 'assets/side/pesqueroPesadoR.png');
        this.load.image('pesqueroPesadoUL', 'assets/side/pesqueroPesadoUL.png');
        this.load.image('pesqueroPesadoUR', 'assets/side/pesqueroPesadoUR.png');
        this.load.image('pesqueroPesadoDL', 'assets/side/pesqueroPesadoDL.png');
        this.load.image('pesqueroPesadoDR', 'assets/side/pesqueroPesadoDR.png');

        //HELICOPTERO DIRECCION
        this.load.image('heliSideU', 'assets/side/patrulleroHelicopteroU.png');
        this.load.image('heliSideD', 'assets/side/patrulleroHelicopteroD.png');
        this.load.image('heliSideL', 'assets/side/patrulleroHelicopteroL.png');
        this.load.image('heliSideR', 'assets/side/patrulleroHelicopteroR.png');
        this.load.image('heliSideUL', 'assets/side/patrulleroHelicopteroUL.png');
        this.load.image('heliSideUR', 'assets/side/patrulleroHelicopteroUR.png');
        this.load.image('heliSideDL', 'assets/side/patrulleroHelicopteroDL.png');
        this.load.image('heliSideDR', 'assets/side/patrulleroHelicopteroDR.png');

        //BOTE DIRECCION
        this.load.image('boatSideU', 'assets/side/patrulleroBoteU.png');
        this.load.image('boatSideD', 'assets/side/patrulleroBoteD.png');
        this.load.image('boatSideL', 'assets/side/patrulleroBoteL.png');
        this.load.image('boatSideR', 'assets/side/patrulleroBoteR.png');
        this.load.image('boatSideUL', 'assets/side/patrulleroBoteUL.png');
        this.load.image('boatSideUR', 'assets/side/patrulleroBoteUR.png');
        this.load.image('boatSideDL', 'assets/side/patrulleroBoteDL.png');
        this.load.image('boatSideDR', 'assets/side/patrulleroBoteDR.png');

    },



    /************************************************************************************************************************************************

                                                                        CREATE

    *************************************************************************************************************************************************/

    create: function () {

        //DEFINICION DE AREA DE JUEGO
        this.matter.world.setBounds(0, 651, 1200, 801);
        var sideMap = this.add.image(597, 725, 'sideWater');


        globalSideVariables.spotlight = this.make.sprite({
            x: 200,
            y: 700,
            key: 'maskSide',
            add: false
        });


        // SPRITES PATRULLERO LIVIANO
        globalSideVariables.spritePatrulleroLivianoU = this.matter.add.image(200, 700, 'patrulleroLivianoU');
        globalSideVariables.spritePatrulleroLivianoD = this.matter.add.image(200, 700, 'patrulleroLivianoD');
        globalSideVariables.spritePatrulleroLivianoL = this.matter.add.image(200, 700, 'patrulleroLivianoL');
        globalSideVariables.spritePatrulleroLivianoR = this.matter.add.image(200, 700, 'patrulleroLivianoR');
        globalSideVariables.spritePatrulleroLivianoUL = this.matter.add.image(200, 700, 'patrulleroLivianoUL');
        globalSideVariables.spritePatrulleroLivianoUR = this.matter.add.image(200, 700, 'patrulleroLivianoUR');
        globalSideVariables.spritePatrulleroLivianoDL = this.matter.add.image(200, 700, 'patrulleroLivianoDL');
        globalSideVariables.spritePatrulleroLivianoDR = this.matter.add.image(200, 700, 'patrulleroLivianoDR');


        globalSideVariables.spritePatrulleroLivianoU.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroLivianoD.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroLivianoL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroLivianoR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroLivianoUL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroLivianoUR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroLivianoDL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroLivianoDR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);        

        globalSideVariables.spritePatrulleroLivianoU.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoD.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoL.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoR.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoUL.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoUR.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoDL.setVisible(false);
        globalSideVariables.spritePatrulleroLivianoDR.setVisible(false);        



        // SPRITES PATRULLERO PESADO
        globalSideVariables.spritePatrulleroPesadoU = this.matter.add.image(1000, 300, 'patrulleroPesadoU');
        globalSideVariables.spritePatrulleroPesadoD = this.matter.add.image(1000, 300, 'patrulleroPesadoD');
        globalSideVariables.spritePatrulleroPesadoL = this.matter.add.image(1000, 300, 'patrulleroPesadoL');
        globalSideVariables.spritePatrulleroPesadoR = this.matter.add.image(1000, 300, 'patrulleroPesadoR');
        globalSideVariables.spritePatrulleroPesadoUL = this.matter.add.image(1000, 300, 'patrulleroPesadoUL');
        globalSideVariables.spritePatrulleroPesadoUR = this.matter.add.image(1000, 300, 'patrulleroPesadoUR');
        globalSideVariables.spritePatrulleroPesadoDL = this.matter.add.image(1000, 300, 'patrulleroPesadoDL');
        globalSideVariables.spritePatrulleroPesadoDR = this.matter.add.image(1000, 300, 'patrulleroPesadoDR');

        globalSideVariables.spritePatrulleroPesadoU.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroPesadoD.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroPesadoL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroPesadoR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroPesadoUL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroPesadoUR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroPesadoDL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePatrulleroPesadoDR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);     

        globalSideVariables.spritePatrulleroPesadoU.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoD.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoL.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoR.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoUL.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoUR.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoDL.setVisible(false);
        globalSideVariables.spritePatrulleroPesadoDR.setVisible(false);

        //SPRITES HELICOPTERO
        globalSideVariables.spriteHelicopteroU = this.matter.add.image(1000, 300, 'heliSideU');
        globalSideVariables.spriteHelicopteroD = this.matter.add.image(1000, 300, 'heliSideD');
        globalSideVariables.spriteHelicopteroL = this.matter.add.image(1000, 300, 'heliSideL');
        globalSideVariables.spriteHelicopteroR = this.matter.add.image(1000, 300, 'heliSideR');
        globalSideVariables.spriteHelicopteroUL = this.matter.add.image(1000, 300, 'heliSideUL');
        globalSideVariables.spriteHelicopteroUR = this.matter.add.image(1000, 300, 'heliSideUR');
        globalSideVariables.spriteHelicopteroDL = this.matter.add.image(1000, 300, 'heliSideDL');
        globalSideVariables.spriteHelicopteroDR = this.matter.add.image(1000, 300, 'heliSideDR');

        globalSideVariables.spriteHelicopteroU.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteHelicopteroD.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteHelicopteroL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteHelicopteroR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteHelicopteroUL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteHelicopteroUR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteHelicopteroDL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteHelicopteroDR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);     

        globalSideVariables.spriteHelicopteroU.setVisible(false);
        globalSideVariables.spriteHelicopteroD.setVisible(false);
        globalSideVariables.spriteHelicopteroL.setVisible(false);
        globalSideVariables.spriteHelicopteroR.setVisible(false);
        globalSideVariables.spriteHelicopteroUL.setVisible(false);
        globalSideVariables.spriteHelicopteroUR.setVisible(false);
        globalSideVariables.spriteHelicopteroDL.setVisible(false);
        globalSideVariables.spriteHelicopteroDR.setVisible(false);

        //SPRITES BOTE
        globalSideVariables.spriteBoteU = this.matter.add.image(1000, 300, 'boatSideU');
        globalSideVariables.spriteBoteD = this.matter.add.image(1000, 300, 'boatSideD');
        globalSideVariables.spriteBoteL = this.matter.add.image(1000, 300, 'boatSideL');
        globalSideVariables.spriteBoteR = this.matter.add.image(1000, 300, 'boatSideR');
        globalSideVariables.spriteBoteUL = this.matter.add.image(1000, 300, 'boatSideUL');
        globalSideVariables.spriteBoteUR = this.matter.add.image(1000, 300, 'boatSideUR');
        globalSideVariables.spriteBoteDL = this.matter.add.image(1000, 300, 'boatSideDL');
        globalSideVariables.spriteBoteDR = this.matter.add.image(1000, 300, 'boatSideDR');

        globalSideVariables.spriteBoteU.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteBoteD.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteBoteL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteBoteR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteBoteUL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteBoteUR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteBoteDL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spriteBoteDR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);     

        globalSideVariables.spriteBoteU.setVisible(false);
        globalSideVariables.spriteBoteD.setVisible(false);
        globalSideVariables.spriteBoteL.setVisible(false);
        globalSideVariables.spriteBoteR.setVisible(false);
        globalSideVariables.spriteBoteUL.setVisible(false);
        globalSideVariables.spriteBoteUR.setVisible(false);
        globalSideVariables.spriteBoteDL.setVisible(false);
        globalSideVariables.spriteBoteDR.setVisible(false);

        // SPRITES PESQUERO LIVIANO
        globalSideVariables.spritePesqueroLivianoU = this.matter.add.image(400, 50, 'pesqueroLivianoU');
        globalSideVariables.spritePesqueroLivianoD = this.matter.add.image(400, 50, 'pesqueroLivianoD');
        globalSideVariables.spritePesqueroLivianoL = this.matter.add.image(400, 50, 'pesqueroLivianoL');
        globalSideVariables.spritePesqueroLivianoR = this.matter.add.image(400, 50, 'pesqueroLivianoR');
        globalSideVariables.spritePesqueroLivianoUL = this.matter.add.image(400, 50, 'pesqueroLivianoUL');
        globalSideVariables.spritePesqueroLivianoUR = this.matter.add.image(400, 50, 'pesqueroLivianoUR');
        globalSideVariables.spritePesqueroLivianoDL = this.matter.add.image(400, 50, 'pesqueroLivianoDL');
        globalSideVariables.spritePesqueroLivianoDR = this.matter.add.image(400, 50, 'pesqueroLivianoDR');

        globalSideVariables.spritePesqueroLivianoU.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroLivianoD.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroLivianoL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroLivianoR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroLivianoUL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroLivianoUR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroLivianoDL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroLivianoDR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);     

        globalSideVariables.spritePesqueroLivianoU.setVisible(false);
        globalSideVariables.spritePesqueroLivianoD.setVisible(false);
        globalSideVariables.spritePesqueroLivianoL.setVisible(false);
        globalSideVariables.spritePesqueroLivianoR.setVisible(false);
        globalSideVariables.spritePesqueroLivianoUL.setVisible(false);
        globalSideVariables.spritePesqueroLivianoUR.setVisible(false);
        globalSideVariables.spritePesqueroLivianoDL.setVisible(false);
        globalSideVariables.spritePesqueroLivianoDR.setVisible(false);

        // SPRITES PESQUERO PESADO
        globalSideVariables.spritePesqueroPesadoU = this.matter.add.image(800, 50, 'pesqueroPesadoU');
        globalSideVariables.spritePesqueroPesadoD = this.matter.add.image(800, 50, 'pesqueroPesadoD');
        globalSideVariables.spritePesqueroPesadoL = this.matter.add.image(800, 50, 'pesqueroPesadoL');
        globalSideVariables.spritePesqueroPesadoR = this.matter.add.image(800, 50, 'pesqueroPesadoR');
        globalSideVariables.spritePesqueroPesadoUL = this.matter.add.image(800, 50, 'pesqueroPesadoUL');
        globalSideVariables.spritePesqueroPesadoUR = this.matter.add.image(800, 50, 'pesqueroPesadoUR');
        globalSideVariables.spritePesqueroPesadoDL = this.matter.add.image(800, 50, 'pesqueroPesadoDL');
        globalSideVariables.spritePesqueroPesadoDR = this.matter.add.image(800, 50, 'pesqueroPesadoDR');

        globalSideVariables.spritePesqueroPesadoU.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroPesadoD.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroPesadoL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroPesadoR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroPesadoUL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroPesadoUR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroPesadoDL.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);
        globalSideVariables.spritePesqueroPesadoDR.mask = new Phaser.Display.Masks.BitmapMask(this, globalSideVariables.spotlight);     

        globalSideVariables.spritePesqueroPesadoU.setVisible(false);
        globalSideVariables.spritePesqueroPesadoD.setVisible(false);
        globalSideVariables.spritePesqueroPesadoL.setVisible(false);
        globalSideVariables.spritePesqueroPesadoR.setVisible(false);
        globalSideVariables.spritePesqueroPesadoUL.setVisible(false);
        globalSideVariables.spritePesqueroPesadoUR.setVisible(false);
        globalSideVariables.spritePesqueroPesadoDL.setVisible(false);
        globalSideVariables.spritePesqueroPesadoDR.setVisible(false);


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
            sprite: globalSideVariables.spritePesqueroLivianoU,
            orientacion: null,
            hundido: false
        }

        var barcoPesquero2 = {
            id: 2,
            tipo: "Pesquero",
            categoria: "Pesado",
            sprite: globalSideVariables.spritePesqueroPesadoU,
            orientacion: null,
            hundido: false
        }

        var helicopteroOb = {
            id: 5,
            tipo: "Patrullero",
            categoria: "H",
            sprite: globalSideVariables.spriteHelicopteroU,
            orientacion: null
        }

        var boteOb = {
            id: 6,
            tipo: "Patrullero",
            categoria: "B",
            sprite: globalSideVariables.spriteBoteU,
            orientacion: null
        }



        //INTEGRO VEHICULOS A LA PARTIDA
        vehiculosSideView.Patrulleros.Barcos.push(barcoPatrulla1);
        vehiculosSideView.Patrulleros.Barcos.push(barcoPatrulla2);
        vehiculosSideView.Pesqueros.Barcos.push(barcoPesquero1);
        vehiculosSideView.Pesqueros.Barcos.push(barcoPesquero2);
        vehiculosSideView.Helicoptero = helicopteroOb;
        vehiculosSideView.Bote = boteOb;


        //LLUVIA Y DISPAROS
        globalSideVariables.particlesRain = this.add.particles('flares');
        globalSideVariables.particlesExplosion = this.add.particles('fire');
        globalSideVariables.particlesShot = this.add.particles('flares');
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

            if(globalDroneVariables.equipo == "Patrullero" && barcoFromServerSide.activo){

                globalSideVariables.spotlight.x = barcoAActualizar.sprite.x;
                globalSideVariables.spotlight.y = barcoAActualizar.sprite.y;
            }
        });




        partida.Pesqueros.Barcos.forEach(function(barcoFromServerSide){

            var barcoAActualizar = vehiculosSideView.Pesqueros.Barcos.find(function (itemSide){

                return itemSide.id == barcoFromServerSide.id;

            });

            if(barcoAActualizar !== null){
            	if (globalDroneVariables.flagMostrarDisparo)
            	{
            		var barcoDispara = vehiculosSideView.Patrulleros.Barcos.find(function (itemSide){

                        return itemSide.id == globalDroneVariables.patrulleroDispara.id;

                    });
            		var barcoImpactado = vehiculosSideView.Pesqueros.Barcos.find(function (itemSide){

                        return itemSide.id == globalDroneVariables.barcoImpactadoDisparo.id;

                    });
            		mostrarDisparo(barcoDispara.sprite, barcoImpactado.sprite, globalDroneVariables.nivelDanioDisparo/133);
                	mostrarExplosion(barcoImpactado.sprite, globalDroneVariables.nivelDanioDisparo);
                	globalDroneVariables.flagMostrarDisparo = false;
            	}
                barcoAActualizar.hundido = barcoFromServerSide.hundido;
                
                if(barcoAActualizar.hundido){
                    barcoAActualizar.sprite.setVisible(false);
                    barcoAActualizar.sprite.x = 1300;

                    var activarBoteNoHundido = vehiculosSideView.Pesqueros.Barcos.find(function (item){
                        return item.id != barcoAActualizar.id;
                    });


                    globalSideVariables.spotlight.x = activarBoteNoHundido.sprite.x;
                    globalSideVariables.spotlight.y = activarBoteNoHundido.sprite.y;


                }else if(barcoFromServerSide.capturado){
                    var activarBoteNoCapturado = vehiculosSideView.Pesqueros.Barcos.find(function (item){
                        return item.id != barcoFromServerSide.id;
                    });

                    globalSideVariables.spotlight.x = activarBoteNoCapturado.sprite.x;
                    globalSideVariables.spotlight.y = activarBoteNoCapturado.sprite.y;

                }else{

                    definirOrientacionVehiculo(barcoAActualizar, barcoFromServerSide);

                    asignarImagenSprite(barcoAActualizar);

                    setMovementAndSize(barcoAActualizar, barcoFromServerSide);

                    if(globalDroneVariables.equipo == "Pesquero" && barcoFromServerSide.activo){

                        globalSideVariables.spotlight.x = barcoAActualizar.sprite.x;
                        globalSideVariables.spotlight.y = barcoAActualizar.sprite.y;
                    } 
                }

            }


        });



        definirOrientacionVehiculo(vehiculosSideView.Helicoptero, partida.Patrulleros.Barcos[1].helicoptero);
        asignarImagenSprite(vehiculosSideView.Helicoptero);
        vehiculosSideView.Helicoptero.sprite.x = partida.Patrulleros.Barcos[1].helicoptero.sprite.x;
        vehiculosSideView.Helicoptero.sprite.y = getSideHelicopterY(partida.Patrulleros.Barcos[1].helicoptero.sprite.y);
        vehiculosSideView.Helicoptero.sprite.setScale(scaleVehicule(vehiculosSideView.Helicoptero.sprite));

        if(globalDroneVariables.equipo == "Patrullero" && partida.Patrulleros.Barcos[1].helicoptero.activo){

            globalSideVariables.spotlight.x = vehiculosSideView.Helicoptero.sprite.x;
            globalSideVariables.spotlight.y = vehiculosSideView.Helicoptero.sprite.y;
        }

        definirOrientacionVehiculo(vehiculosSideView.Bote, partida.Patrulleros.Barcos[1].bote);
        asignarImagenSprite(vehiculosSideView.Bote);
        vehiculosSideView.Bote.sprite.x = partida.Patrulleros.Barcos[1].bote.sprite.x;
        vehiculosSideView.Bote.sprite.y = getSideY(partida.Patrulleros.Barcos[1].bote.sprite.y);    
        vehiculosSideView.Bote.sprite.setScale(scaleVehicule(vehiculosSideView.Bote.sprite));

        if(globalDroneVariables.equipo == "Patrullero" && partida.Patrulleros.Barcos[1].bote.activo){

            globalSideVariables.spotlight.x = vehiculosSideView.Bote.sprite.x;
            globalSideVariables.spotlight.y = vehiculosSideView.Bote.sprite.y;
        }

        if(partida.hayTormenta)
        {
        	mostrarLluvia();
        }
    }


});


myGame.scenes.push(SideViewState);



function getSideY(droneViewY){

    var maxDroneViewY = 650; // Tamaño 650 px
    var maxSideViewY = 80; // Tamaño 150 px
    var screenToJump = maxDroneViewY + 50; //Para que los barcos no circulen por el cielo

    var sideY = (droneViewY / (maxDroneViewY / maxSideViewY)) + screenToJump;

    return sideY;

}


function getSideHelicopterY(droneViewY){

    var maxDroneViewY = 650; // Tamaño 650 px
    var maxSideViewY = 120; // Tamaño 150 px
    var screenToJump = maxDroneViewY + 11; // Para que el helicptero si circule por el cielo pero no llegue al borde

    var sideY = (droneViewY / (maxDroneViewY / maxSideViewY)) + screenToJump;

    return sideY;

}

function scaleVehicule(vehiculoSprite){

    var sideY = vehiculoSprite.y - 650;
    var minScale = 0.2; // Lo mas lejos reduce la imagen 2 tercios
    var maxScale = 1; // Lo mas cerca amplia la imagen al 50%
    var maxSideViewY = 120;
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
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoDR; 
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoDL; 
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoUL; 
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroLivianoUR; 
            }

        }else if(vehiculo.categoria == "Pesado"){
            if(vehiculo.orientacion == "R"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoR;
            }else if(vehiculo.orientacion == "DR"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoDR; 
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoDL; 
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoUL; 
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spritePatrulleroPesadoUR; 
            }

        }else if (vehiculo.categoria == "H"){
            if(vehiculo.orientacion == "R"){
                vehiculo.sprite = globalSideVariables.spriteHelicopteroR;
            }else if(vehiculo.orientacion == "DR"){
                vehiculo.sprite = globalSideVariables.spriteHelicopteroDR; 
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spriteHelicopteroD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spriteHelicopteroDL; 
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spriteHelicopteroL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spriteHelicopteroUL; 
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spriteHelicopteroU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spriteHelicopteroUR; 
            }

        }else if (vehiculo.categoria == "B"){
            if(vehiculo.orientacion == "R"){
                vehiculo.sprite = globalSideVariables.spriteBoteR;
            }else if(vehiculo.orientacion == "DR"){
                vehiculo.sprite = globalSideVariables.spriteBoteDR; 
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spriteBoteD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spriteBoteDL; 
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spriteBoteL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spriteBoteUL; 
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spriteBoteU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spriteBoteUR; 
            }

        }
    }else{
        if(vehiculo.categoria == "Liviano"){
            if(vehiculo.orientacion == "R"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoR;
            }else if(vehiculo.orientacion == "DR"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoDR; 
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoDL; 
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoUL; 
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spritePesqueroLivianoUR; 
            }

        }else if(vehiculo.categoria == "Pesado"){
            if(vehiculo.orientacion == "R"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoR;
            }else if(vehiculo.orientacion == "DR"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoDR;
            }else if(vehiculo.orientacion == "D"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoD;
            }else if(vehiculo.orientacion == "DL"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoDL;
            }else if(vehiculo.orientacion == "L"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoL;
            }else if(vehiculo.orientacion == "UL"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoUL; 
            }else if(vehiculo.orientacion == "U"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoU;
            }else if(vehiculo.orientacion == "UR"){
                vehiculo.sprite = globalSideVariables.spritePesqueroPesadoUR; 
            }

        }
    }


    vehiculo.sprite.x = x;
    vehiculo.sprite.y = y;


    vehiculo.sprite.setVisible(true);

}

function mostrarLluvia()
{
	globalSideVariables.particlesRain.createEmitter({
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

function mostrarExplosion(spritePesquero, nivel)
{
	globalSideVariables.particlesExplosion.createEmitter({
        alpha: { start: 1, end: 0 },
        scale: { start: nivel/60, end: nivel/30 },
        tint: { start: 0xff945e, end: 0xff945e },
        speed: 50,
        accelerationY: -10,
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
	globalSideVariables.particlesShot.createEmitter({
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