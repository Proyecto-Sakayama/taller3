package logica;

import logica.excepciones.PersistenciaException;
import logica.valueObjects.VOEstadoPartida;

public interface IFachada {
	public VOEstadoPartida guardarEstadoPartida(VOEstadoPartida estadoPartida) throws PersistenciaException;
	public VOEstadoPartida restaurarPartida(VOEstadoPartida estadoPartida) throws PersistenciaException;
	public void procesarDisparo(VOEstadoPartida estadoPartida);
	
}
