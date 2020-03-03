package persistencia.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import logica.Jugador;
import logica.Jugadores;
import logica.Partida;
import logica.excepciones.PersistenciaException;
import logica.poolConexiones.Conexion;
import logica.poolConexiones.IConexion;
import persistencia.consultas.Consultas;

public class DAOPartidasBD implements IDAOPartidas{

	public DAOPartidasBD() {
		// TODO Auto-generated constructor stub
	}
	
	public boolean member (IConexion con, int idPartida) throws PersistenciaException{
		
		Conexion conn = (Conexion) con;
		boolean existe = false;
		
		try {
			Consultas cons = new Consultas();
			String query = cons.existePartida();
			PreparedStatement ps;
			ps= conn.getConnection().prepareStatement(query);
			ps.setInt(1, idPartida);
			ResultSet rs=ps.executeQuery();
			
			if (rs.next())
				existe=true;
			rs.close();
			ps.close();
					
		} catch (SQLException e)
		{
			throw new PersistenciaException(e.getMessage());
		}
		return existe;	
	}
	
	public void insertBD(IConexion con, Partida partida) throws PersistenciaException{
		
		/*Conexion conn=(Conexion) con;
		
		try {						//Implementar las CONSULTAS
			
			Consultas cons= new Consultas();
			String update = cons.insertarPartida();
			PreparedStatement ps;
			ps=conn.getConnection().prepareStatement(update);
			ps.setInt(1, partida.getIdPartida());
			ps.setDate(2, (Date) partida.getFechaHora());
			ps.setString(3, partida.getClima());
			ps.executeUpdate();
			ps.close();
			
			Jugadores jugadores = partida.getJugadores();
			for (Jugador jugador : partida.getJugadores().getJugadores()) {
				partida.getDaoJugadores().insertBD(conn, jugador);
				
				update = cons.ingresarJugadorPartida();
				PreparedStatement ps2;
				ps2= conn.getConnection().prepareStatement(update);
				ps2.setInt(1, jugador.getIdJugador());
				ps2.setInt(2, partida.getIdPartida());
				ps2.executeUpdate();
				ps2.close();
			}	
		}
		catch (SQLException e)
		{
			throw new PersistenciaException(e.getMessage());
		}*/
	}

}
