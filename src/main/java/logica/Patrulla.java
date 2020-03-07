package logica;

public abstract class Patrulla extends Barco {
	

	private static final long serialVersionUID = 1L;
	private int alcanceRadar;

	public Patrulla(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, int ar) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel);
		this.setAlcanceRadar(ar);
	}

	public int getAlcanceRadar() {
		return alcanceRadar;
	}

	public void setAlcanceRadar(int alcanceRadar) {
		this.alcanceRadar = alcanceRadar;
	}

}
