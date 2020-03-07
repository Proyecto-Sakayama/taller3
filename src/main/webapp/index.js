var websocket;
let equipo;
let mensaje = "Patrullero";
var entro = false;

window.onload = function() {
	try 
	{
		equipo = "CONSULTA";
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
		saladeespera();	
	}
});

function saladeespera(){
	websocket = new WebSocket('ws://localhost:8080/taller3/salaespera/' + equipo);
	websocket.onmessage = function(event) {
		mensaje = event.data;
		console.log(mensaje);
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