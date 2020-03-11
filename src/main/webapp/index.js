var websocket;
var equipo = "";
var ready = false;
/*var mensaje = "Patrullero";
var entro = false;*/


window.onload = function() {
    try 
    {

        saladeespera();


    } catch (error) {


    }
}


$('#buttonNuevaPartida').click(function() {
    let b = document.getElementById("selectBarcoNuevo");
    equipo = b.options[b.selectedIndex].value;

    if (isEmpty(equipo)) {
        mostrarError("Debe seleccionar un equipo para comenzar.");
    } else {
        $('#selectBarcoNuevo').hide();
        $('#buttonNuevaPartida').hide();
        $('#loading').show();
        saladeespera();	
    }
});

function saladeespera(){
    websocket = new WebSocket('ws://localhost:8080/taller3/salaespera/' + equipo);
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

                if(equipo == null){
                    equipo = "Patrullero";
                    ready = true;
                }


                break;

            case "Pesquero":

                if(equipo == null){
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


        $('#unirseAPartida').click(function() {

            websocket.send("start");	
        });   



        // window.location.href = url;
        /*console.log(mensaje);
		console.log(entro);
		if (!entro && isEqual(mensaje, equipo)) {
			console.log("Esperando al segundo jugador.");
			entro = true;
		} else if (isEqual(mensaje, "NINGUNO")) {
			console.log("Esperando jugador 2");
		}  else if (isEqual(mensaje, "Patrullero")) {
			console.log("Llegó el segundo jugador, comenzando partida.");
			window.location.href = 'factibilidad.html?equipo=Pesquero';
		} else if (isEqual(mensaje, "Pesquero")) {
			console.log("Llegó el segundo jugador, comenzando partida.");
			window.location.href = 'factibilidad.html?equipo=Patrullero';
		}
		console.log("LLEGA" + mensaje);
		if (isEqual(mensaje, "Los2")) {
			console.log("Llegó el segundo jugador, comenzando partida.");
			window.location.href = 'factibilidad.html?equipo=' + equipo;
		} */
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