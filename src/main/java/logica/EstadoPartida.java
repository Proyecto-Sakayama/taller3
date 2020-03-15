package logica;

import logica.excepciones.PersistenciaException;

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
	
	public void guardar() throws PersistenciaException{
		
	}
}
