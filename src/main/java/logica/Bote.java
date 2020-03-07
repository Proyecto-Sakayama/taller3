package logica;

public class Bote extends Barco {
	
	private static final long serialVersionUID = 1L;
	boolean habilitado; // variable booleana que nos indica si el bote está apto a navegar, en caso de tormenta será false

	public Bote(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, boolean habilitado) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel);
		this.habilitado = habilitado;
	}
	
	public boolean getHabilitado() {
		return habilitado;
	}
	
	public void setHabilitado(boolean habilit) {
		this.habilitado=habilit;
	}

}
