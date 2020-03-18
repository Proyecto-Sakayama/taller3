package logica;

import logica.excepciones.PersistenciaException;
import logica.valueObjects.VOEstadoPartida;

public interface IFachada {
	public VOEstadoPartida guardarEstadoPartida(VOEstadoPartida estadoPartida, String equipo) throws PersistenciaException;
	public VOEstadoPartida restaurarPartida(VOEstadoPartida estadoPartida, String equipo) throws PersistenciaException;
	public VOEstadoPartida procesarDisparo(VOEstadoPartida estadoPartida);
	public VOEstadoPartida chequearTormenta(VOEstadoPartida estadoPartida);
	public VOEstadoPartida actualizarAdministrador(VOEstadoPartida estadoPartida);
	
}
