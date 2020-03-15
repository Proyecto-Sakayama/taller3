package logica;

import logica.excepciones.PersistenciaException;
import logica.valueObjects.VOEstadoPartida;

public interface IFachada {
	public VOEstadoPartida guardarEstadoPartida(VOEstadoPartida estadoPartida, String equipo) throws PersistenciaException;
	public VOEstadoPartida restaurarPartida(VOEstadoPartida estadoPartida, String equipo) throws PersistenciaException;
	public VOEstadoPartida procesarDisparo(VOEstadoPartida estadoPartida);
	public void definirAdministrador(String equipo);
	public String obteberAdministrador();
	public VOEstadoPartida chequearTormenta(VOEstadoPartida estadoPartida);
	
}
