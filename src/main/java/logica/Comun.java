package logica;

public class Comun extends Pesquero {

	public Comun(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, int vp,
			int resist, int cp, boolean atrapado) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel, vp, resist, cp, atrapado);
		
	}
	
	public int getVelocidadPesca () {
		
		return this.getVelocidadPesca(); 
	}
	
	public int getResistencia() {
		
		return this.getResistencia();
	}

}
