var websocket;
var equipo = "EMPTY";
var ready = false;
/*var mensaje = "Patrullero";
var entro = false;*/


window.onload = function() {
    try 
    {

        saladeespera(equipo);


    } catch (error) {


    }
}


$('#buttonNuevaPartida').click(function() {
    let b = document.getElementById("selectBarcoNuevo");
    equipo = b.options[b.selectedIndex].value;

    if (equipo == "EMPTY") {
        mostrarError("Debe seleccionar un equipo para comenzar.");
    } else {
        $('#selectBarcoNuevo').hide();
        $('#buttonNuevaPartida').hide();
        $('#loading').show();
        saladeespera(equipo);	
    }

});



$('#unirseAPartida').click(function() {

  saladeespera("start");

});   

function saladeespera(team){
    websocket = new WebSocket('ws://localhost:8080/taller3/salaespera/' + team);

    websocket.onmessage = function(event) {
        var serverTeam = event.data;




        switch (serverTeam){

            case "0":
                //Jugador 1 seleccionando equipo

                break;

            case "1":
                //Jugador 2 espera a que el jugador 1 seleccione equipo
                $('#selectBarcoNuevo').hide();
                $('#buttonNuevaPartida').hide();
                $('#loading').show();

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

                window.location.href = 'esteIndex.html?equipo=' + equipo;

                break;

        }


        if(ready){

            $('#selectBarcoNuevo').hide();
            $('#buttonNuevaPartida').hide();
            $('#loading').hide();
            $('#unirseAPartida').show();

        }

    };

}



function mostrarError(mensaje) {
    $("#error").html(mensaje);
    $('#modalError').modal('show');
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isEqual(str1, str2) {
    return str1.toUpperCase() === str2.toUpperCase();
}