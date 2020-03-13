package logica;

import logica.excepciones.PersistenciaException;
import logica.valueObjects.VOEstadoPartida;

public interface IFachada {
	public void insertarEstadoPartida(VOEstadoPartida estadoPartida) throws PersistenciaException;
	public VOEstadoPartida obtenerUltimoEstado() throws PersistenciaException;
}
