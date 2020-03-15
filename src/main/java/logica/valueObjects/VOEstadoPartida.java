package logica.valueObjects;

public class VOEstadoPartida {
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
	
	public VOEstadoPartida() {
		super();
	}
	
	public VOEstadoPartida(String datosPartida) {
		super();
		this.datosPartida = datosPartida;
	}
}
