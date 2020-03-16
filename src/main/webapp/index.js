var websocket;
var equipo = "EMPTY";
var ready = false;
var recuperar = false;

window.onload = function() {
    try 
    {
        saladeespera(equipo, recuperar);
    } catch (error) {

    }
}

function equipoJSON(nombre, recupera)
{
	this.nombre = nombre;
	this.recupera = recupera;
}

$('#crearBTN').click(function() {
    let b = document.getElementById("equipos");
    equipo = b.value;
    
    recuperar = false;

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
        saladeespera(equipo, recuperar);	
    }

});

$('#recuperarBTN').click(function() {
    let b = document.getElementById("equipos");
    equipo = b.value;
    recuperar = true;

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
        saladeespera(equipo, recuperar);	
    }

});


$('#unirseBTN').click(function() {

    saladeespera("start", recuperar);

});   

function saladeespera(team, recuperar){
	let equipoEnviar = new equipoJSON(team, recuperar);
	
    websocket = new WebSocket('ws://localhost:8080/taller3/salaespera/' + team + '/' + recuperar);

    websocket.onmessage = function(event) {
        var serverResponse = JSON.parse(event.data);
    	var serverTeam = serverResponse.nombreEquipo;
    	var serverRecuperar = serverResponse.recuperar;

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

                window.location.href = 'game.html?equipo=' + equipo + "&recuperar=" + serverRecuperar;

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
