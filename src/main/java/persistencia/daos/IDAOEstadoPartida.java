package persistencia.daos;

import logica.excepciones.PersistenciaException;
import logica.poolConexiones.*;
import logica.valueObjects.VOEstadoPartida;
public interface IDAOEstadoPartida {
	
	public void insertar (VOEstadoPartida estadoPartida, IConexion icon) throws PersistenciaException;
	
	public VOEstadoPartida obtenerUltimaPartida(IConexion icon) throws PersistenciaException;

}
