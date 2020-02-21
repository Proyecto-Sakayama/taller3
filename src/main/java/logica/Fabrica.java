package logica;

public class Fabrica extends Pesquero {

	public Fabrica(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, int vp,
			int resist, int cp, boolean atrap) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel, vp, resist, cp, atrap);
	
	} 
	
	public int getVelocidadPesca () {
		
		return this.getVelocidadPesca()*2; //doble velocidad de pesca
	}
	
	public int getResistencia() {
		
		return this.getResistencia()*2; //doble resistencia
	}

}
