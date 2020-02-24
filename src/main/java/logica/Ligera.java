package logica;
import logica.Ametralladora;
public class Ligera extends Patrulla {
	
	private static final long serialVersionUID = 1L;
	private Ametralladora ametralladora;

	public Ligera(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, int ar, Ametralladora am) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel, ar);
		this.setAmetralladora(am);
	}

	public Ametralladora getAmetralladora() {
		return ametralladora;
	}

	public void setAmetralladora(Ametralladora ametralladora) {
		this.ametralladora = ametralladora;
	}

}
