package logica;

public class Comun extends Pesquero {

	private static final long serialVersionUID = 1L;

	public Comun(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, int vp,
			int resist, int cp, int danio, boolean atrapado) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel, vp, resist, cp, danio, atrapado);
		
	}
	
	public int getVelocidadPesca () {
		
		return this.getVelocidadPesca(); 
	}
	
	public int getResistencia() {
		
		return this.getResistencia();
	}

}
