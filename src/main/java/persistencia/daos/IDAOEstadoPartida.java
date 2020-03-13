package persistencia.daos;

import logica.excepciones.PersistenciaException;
import logica.poolConexiones.*;

import logica.EstadoPartida;

public interface IDAOEstadoPartida {
	
	public void insertar (EstadoPartida estadoPartida, IConexion icon) throws PersistenciaException;
	
	public EstadoPartida obtenerUltimaPartida(IConexion icon) throws PersistenciaException;

}
