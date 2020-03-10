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

    },



    /************************************************************************************************************************************************

                                                                        CREATE

    *************************************************************************************************************************************************/

    create: function () {

    

        this.matter.world.setBounds(0, 550, 1200, 650);
        var sideMap = this.add.image(600, 725, 'sideWater');
     

        
        console.log('create success');

    },

    /************************************************************************************************************************************************

                                                                        UPDATE

    *************************************************************************************************************************************************/


    update: function () {

     
    }


});

myGame.scenes.push(SideViewState);


