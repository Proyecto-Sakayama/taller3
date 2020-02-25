package persistencia.consultas;

public class Consultas {

	public  String existeVehiculo() {
		return "select * from Milla200.Vehiculos where idVehiculo = (?)";
	}
	public String insertarVehiculo() {
		return "INSERT INTO milla200.vehiculos (IdVehiculo, coordX, coordY, orientacion"
				+ "cantCombustible, tipoVehiculo, velocidad)"
				+ "VALUES (?,?,?,?,?,?,?)";
	}
	public String insertarOceanica() {
		return "INSERT INTO milla200.patrullas (IdVehiculo,alcanceRadar)"
				+ "VALUES(?,?)";
	}
	public String insertarLigera() {
		return "INSERT INTO milla200.patrullas (IdVehiculo,alcanceRadar)"
				+ "VALUES(?,?)";
	}
	
	public String insertarFabrica() {
		return "INSERT INTO milla200.pesqueros (IdVehiculo,velocidadPesca, resistencia, cantidadPesca, danio, atrapado)"
				+ "VALUES(?,?,?,?,?)";
	}
	public String insertarComun() {
		return "INSERT INTO milla200.pesqueros (IdVehiculo,velocidadPesca, resistencia, cantidadPesca, danio, atrapado)"
				+ "VALUES(?,?,?,?,?)";
	}
	
	
	public  String insertarJugador () {
		
		return "INSERT INTO Milla200.jugadores (idJugador, nickname) VALUES  (?,?)";
	}
	
	public String existeJugador(){
		return "SELECT * FROM Milla200.jugadores WHERE IdJugador=(?)";
	}
	
	public String insertarVehiculoAJugador() {
		return"INSERT INTO milla200.jugadores_vehiculos (IdJugador, IdVehiculo)"
				+ "VALUES (?,?)";
	}
	
	public String buscarVehiculoPorJugador() {
		return "SELECT * FROM milla200.jugadores_vehiculos WHERE IdJugador = ?";
	}
	
	public  String listarPartidas() {
		return "select * from Milla200.Partidas order by idPartida";
	}
	
	public  String cantPartida() {
		return "select count(*) as cant from Milla200.Partidas";
	}
	
	public  String existePartida() {
		return "select * FROM Milla200.partidas where idPartida=(?)";
	}
	
	public String ingresarPartida() {
		return "INSERT INTO Milla200.partidas (IdPartida, fechaHora, clima) VALUES (?,?,?)";
	}
	
	public String ingresarJugadorEnPartida() {
		return "INSERT INTO Milla200.jugadores_partidas (IdJugador,IdPartida) VALUES (?,?)";
	}
	
	public String buscarJugadoresenPartida() {
		return"SELECT * FROM milla200.jugadores_partidas WHERE IdPartida= ?";
	}
	
	
	
	
}
