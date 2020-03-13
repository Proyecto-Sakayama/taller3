package persistencia.consultas;

public class Consultas {

	
	public static String insertarPartida() {
		
		return "INSERT INTO Milla200.partidas(datosPartida) VALUES  (?)";
	}

	public static String listarPartidas() {
		return "select * from Milla200.partidas order by idPartida desc";
	}
	
}
