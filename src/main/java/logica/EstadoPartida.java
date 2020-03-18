package logica;

import logica.excepciones.PersistenciaException;
import logica.poolConexiones.IConexion;
import logica.poolConexiones.IPoolConexiones;
import logica.valueObjects.VOEstadoPartida;
import persistencia.daos.IDAOEstadoPartida;

public class EstadoPartida {
	private int idPartida;
	private String datosPartida;
	
	public int getIdPartida() {
		return idPartida;
	}
	public void setIdPartida(int idPartida) {
		this.idPartida = idPartida;
	}
	public String getDatosPartida() {
		return datosPartida;
	}
	public void setDatosPartida(String datosPartida) {
		this.datosPartida = datosPartida;
	}	
	
	
	public void guardar(IPoolConexiones ipool, IDAOEstadoPartida daoP, VOEstadoPartida estadoPartida) throws PersistenciaException{
		IConexion icon = ipool.obtenerConexion(true);
		try {
			daoP.insertar(estadoPartida, icon);
			ipool.liberarConexion(icon, true);
		} catch (PersistenciaException e) {
			ipool.liberarConexion(icon, false);
			throw new PersistenciaException(e.getMensaje());
		}
	}
	
	public VOEstadoPartida restaurarPartida(IPoolConexiones ipool, IDAOEstadoPartida daoP) throws PersistenciaException{
		VOEstadoPartida result = null;
		IConexion icon = ipool.obtenerConexion(true);
		try {
			result = daoP.obtenerUltimaPartida(icon);
			
			String partidaGuardada = result.getDatosPartida();
			int posInicialTime = partidaGuardada.indexOf(":", 1);  
			int posFinalTime = partidaGuardada.indexOf(",", 1);   
			String tiempoRestanteGuardado = partidaGuardada.substring(posInicialTime + 2, posFinalTime -1);
			Fachada.tiempoPartida = Integer.parseInt(tiempoRestanteGuardado.replace(" ",""));  
			
			ipool.liberarConexion(icon, true);
		} catch (PersistenciaException e) {
			ipool.liberarConexion(icon, false);
			throw new PersistenciaException(e.getMensaje());
		}
		return result;
	}
	
}
