package logica;

import java.io.Serializable;

public abstract class Vehiculo implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private int id;
	private int coordX;
	private int coordY;
	private int orientacion;
	private int cantCombustible;
	private int velocidad;
	private String tipoVehiculo;
	
	
	public Vehiculo (int id, int coordX, int coordY, int orientacion, int cantComb, String tipoVehiculo, int vel) {
		
		this.setId(id);
		this.setCoordX(coordX);
		this.setCoordY(coordY);
		this.setOrientacion(orientacion);
		this.setVelocidad(vel);
		this.setCantCombustible(cantComb);
		this.setTipoVehiculo(tipoVehiculo);
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getCoordX() {
		return coordX;
	}


	public void setCoordX(int coordX) {
		this.coordX = coordX;
	}


	public int getCoordY() {
		return coordY;
	}


	public void setCoordY(int coordY) {
		this.coordY = coordY;
	}


	public int getOrientacion() {
		return orientacion;
	}


	public void setOrientacion(int orientacion) {
		this.orientacion = orientacion;
	}


	public int getCantCombustible() {
		return cantCombustible;
	}


	public void setCantCombustible(int cantCombustible) {
		this.cantCombustible = cantCombustible;
	}


	public String getTipoVehiculo() {
		return tipoVehiculo;
	}


	public void setTipoVehiculo(String tipoVehiculo) {
		this.tipoVehiculo = tipoVehiculo;
	}


	public int getVelocidad() {
		return velocidad;
	}


	public void setVelocidad(int velocidad) {
		this.velocidad = velocidad;
	}

}
