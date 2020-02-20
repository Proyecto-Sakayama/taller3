package logica;
import logica.Helicoptero;

public class Oceanica extends Patrulla {
	
	private Bote bote;
	private Helicoptero helicoptero;
	private Canion canion;
	private Ametralladora ametralladora;

	public Oceanica(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel,
			int ar, Bote b, Helicoptero hel, Canion c, Ametralladora am) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel, ar);
		this.bote = b;
		this.canion = c;
		this.helicoptero=hel;
		this.ametralladora=am;
	}

}
