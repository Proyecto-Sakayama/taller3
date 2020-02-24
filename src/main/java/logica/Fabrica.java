package logica;

public class Fabrica extends Pesquero {

	private static final long serialVersionUID = 1L;

	public Fabrica(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, int vp,
			int resist, int cp, int danio, boolean atrap) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel, vp, resist, cp, danio, atrap);
	
	} 
	
	public int getVelocidadPesca () {
		
		return this.getVelocidadPesca()*2; //doble velocidad de pesca
	}
	
	public int getResistencia() {
		
		return this.getResistencia()*2; //doble resistencia
	}

}
