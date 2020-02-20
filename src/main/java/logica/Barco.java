package logica;

public abstract class Barco extends Vehiculo {
	
	private int velocidad; 

	public Barco(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo);
		this.velocidad = vel;
	}

	public int getVelocidad() {
		return velocidad;
	}

	public void setVelocidad(int velocidad) {
		this.velocidad = velocidad;
	}

}
