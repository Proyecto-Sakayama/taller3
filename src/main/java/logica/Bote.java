package logica;

public class Bote extends Barco {
	
	boolean habilitado; // variable booleana que nos indica si el bote está apto a navegar, en caso de tormenta será false

	public Bote(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, boolean habilitado) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel);
		this.habilitado = habilitado;
		// TODO Auto-generated constructor stub
	}

}
