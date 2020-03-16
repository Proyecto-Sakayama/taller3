var websocket;
var equipo = "EMPTY";
var ready = false;

window.onload = function() {
    try 
    {

        saladeespera(equipo);


    } catch (error) {


    }
}


$('#crearBTN').click(function() {
    let b = document.getElementById("equipos");
    equipo = b.value;

    if (equipo == "EMPTY") {
        mostrarError("Debe seleccionar un equipo para comenzar.");
    } else {
        $('#divCrearBTN').hide();
        $('#divRecuperarBTN').hide();
        document.getElementById('equipoJ1').innerHTML = equipo.toUpperCase();
        $('#menuEquipo').hide();
        $('#equipos').hide();
        $('#seleccionFinalJ1').show();
        $('#esperandoOponente').show();
        saladeespera(equipo);	
    }

});



$('#unirseBTN').click(function() {

    saladeespera("start");

});   

function saladeespera(team){
    websocket = new WebSocket('ws://192.168.1.42:8080/taller3/salaespera/' + team);

    websocket.onmessage = function(event) {
        var serverTeam = event.data;




        switch (serverTeam){

            case "0":
                //Jugador 1 seleccionando equipo

                break;

            case "1":
                $('#primerJugador').hide();
                $('#segundoJugador').show();
                break;


            case "Patrullero":

                if(equipo == "EMPTY"){
                    equipo = "Patrullero";
                    ready = true;
                }


                break;

            case "Pesquero":

                if(equipo == "EMPTY"){
                    equipo = "Pesquero";
                    ready = true;
                }

                break;

            case "2":

                window.location.href = 'game.html?equipo=' + equipo;

                break;

        }


        if(ready){
            $('#primerJugador').hide();
            $('#segundoJugador').show();          
            document.getElementById('esperandoEquipoJ2').innerHTML = "Equipo disponible:";
            document.getElementById('equipoJ2').innerHTML = equipo.toUpperCase();
            $('#elEquipoqQueQueda').show();
            $('#divUnirseBTN').show();



        }

    };

}
