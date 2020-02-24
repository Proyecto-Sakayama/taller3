package persistencia.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import logica.Jugador;
import logica.Jugadores;
import logica.excepciones.PersistenciaException;
import logica.poolConexiones.Conexion;
import logica.poolConexiones.IConexion;
import persistencia.consultas.Consultas;

public class DAOJugadoresBD implements IDAOJugadores {

	public DAOJugadoresBD() {
		super();
	}
	public boolean memberBD (IConexion con, int idJugador, int idPartida) throws PersistenciaException {
		
		Conexion conn = (Conexion) con;
		boolean esta = false;
		
		try {
			Consultas cons=new Consultas();
			String query=cons.existeJugador();

			PreparedStatement pstmt;
			pstmt=conn.getConnection().prepareStatement(query);

			pstmt.setInt(1, idJugador);
			pstmt.setInt(2, idPartida);
			ResultSet rs=pstmt.executeQuery();

			if (rs.next())
				esta=true;

			rs.close();
			pstmt.close();
		} 
		catch (SQLException e) 
		{
			throw new PersistenciaException(e.getMessage());
		}
			
		
	return esta;
	}
	@Override
	public void insertBD(IConexion icon, Jugador jugador) throws PersistenciaException {
		// TODO Auto-generated method stub	
	}
	
	@Override
	public Jugadores findBD(IConexion icon, int idPartida) throws PersistenciaException {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}



