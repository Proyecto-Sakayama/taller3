package logica;

public abstract class Pesquero extends Barco {
	
	private int velocidadPesca;
	private int resistencia;
	private int cantidadPescada;
	private boolean atrapado; //nos indica si el barco fue atrapado, será inicializado en false

	public Pesquero(int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel, int vp, int resist, int cp, boolean atrapado) {
		super(id, coordX, coordY, orientacion, cantComb, tipoVehiculo, vel);
		this.setVelocidadPesca(vp);
		this.setResistencia(resist);
		this.setCantidadPescada(cp);
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

	public boolean isAtrapado() {
		return atrapado;
	}

	public void setAtrapado(boolean atrapado) {
		this.atrapado = atrapado;
	}

}
