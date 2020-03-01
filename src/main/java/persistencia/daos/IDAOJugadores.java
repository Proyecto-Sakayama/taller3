package persistencia.daos;

import logica.Jugador;
import logica.excepciones.PersistenciaException;
import logica.poolConexiones.IConexion;

public interface IDAOJugadores {
	
	public void insertBD (IConexion icon, Jugador jugador) throws PersistenciaException;
	
	public boolean memberBD(IConexion icon,int idJugador) throws PersistenciaException;
	
	public Jugador findBD(IConexion icon,int idPartida) throws PersistenciaException;
	
	

}
