package logica;

public abstract class Pesquero extends Vehiculo {
	

	private static final long serialVersionUID = 1L;
	private int velocidadPesca;
	private int resistencia;
	private int cantidadPescada;
	private int danio;
	private boolean atrapado; //nos indica si el barco fue atrapado. Será inicializado en false

	public Pesquero(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, int vp, int resist, int cp, int dan, boolean atrapado) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel);
		this.setVelocidadPesca(vp);
		this.setResistencia(resist);
		this.setCantidadPescada(cp);
		this.danio = dan;
		this.atrapado=false;
	}

	public int getVelocidadPesca() {
		return velocidadPesca;
	}

	public void setVelocidadPesca(int velocidadPesca) {
		this.velocidadPesca = velocidadPesca;
	}

	public int getResistencia() {
		return resistencia;
	}

	public void setResistencia(int resistencia) {
		this.resistencia = resistencia;
	}

	public int getCantidadPescada() {
		return cantidadPescada;
	}

	public void setCantidadPescada(int cantidadPescada) {
		this.cantidadPescada = cantidadPescada;
	}

	public boolean getAtrapado() {
		return atrapado;
	}

	public void setAtrapado(boolean atrapado) {
		this.atrapado = atrapado;
	}

	public int getDanio() {
		return danio;
	}

	public void setDanio(int danio) {
		this.danio = danio;
	}

}
