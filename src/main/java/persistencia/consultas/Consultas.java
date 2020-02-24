package persistencia.consultas;

public class Consultas {

	public  String existeVehiculo() {
		return "select * from Milla200.Vehiculos where idVehiculo = (?)";
	}
	
	public  String insertarJugador () {
		
		return "INSERT INTO Milla200.Jugadores (idJugador,  idPartida, nickname) VALUES  (?,?,?)";
	}
	
	public String existeJugador(){
		return "SELECT * FROM Milla200.Jugadores WHERE IdJugador=(?) AND IdPartida=(?)";
	}
	

	public  String listarPartidas() {
		return "select * from Milla200.Partidas order by idPartida";
	}
	
	public  String cantPartida() {
		return "select count(*) as cant from Milla200.Partidas";
	}
	
	public  String existePartida() {
		return "select * FROM Milla200.Partidas where idPartida=(?)";
	}
	
	public String ingresarPartida() {
		return "INSERT INTO Milla200.Partidas (IdPartida, fechaHora, clima) VALUES (?,?;?)";
	}
	
	public String ingresarJugadorEnPartida() {
		return "INSERT INTO Milla200.jugadores_partidas (IdJugador,IdPartida) VALUES (?.?)";
	}
	
	
	
	
}
