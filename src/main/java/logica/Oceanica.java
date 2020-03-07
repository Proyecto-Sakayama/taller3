package logica;

public class Oceanica extends Patrulla {
	
	private static final long serialVersionUID = 1L;
	private Bote bote;
	private Helicoptero helicoptero;
	private Canion canion;
	private Ametralladora ametralladora;

	public Oceanica(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel,
			int ar, Bote b, Helicoptero hel, Canion c, Ametralladora am) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel, ar);
		this.setBote(b);
		this.setCanion(c);
		this.setHelicoptero(hel);
		this.setAmetralladora(am);
	}

	public Bote getBote() {
		return bote;
	}

	public void setBote(Bote bote) {
		this.bote = bote;
	}

	public Helicoptero getHelicoptero() {
		return helicoptero;
	}

	public void setHelicoptero(Helicoptero helicoptero) {
		this.helicoptero = helicoptero;
	}

	public Canion getCanion() {
		return canion;
	}

	public void setCanion(Canion canion) {
		this.canion = canion;
	}

	public Ametralladora getAmetralladora() {
		return ametralladora;
	}

	public void setAmetralladora(Ametralladora ametralladora) {
		this.ametralladora = ametralladora;
	}

}
