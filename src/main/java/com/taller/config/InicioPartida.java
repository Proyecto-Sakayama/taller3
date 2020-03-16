package com.taller.config;

public class InicioPartida {
	public String getNombreEquito() {
		return nombreEquipo;
	}
	public boolean isRecuperar() {
		return recuperar;
	}
	private String nombreEquipo;
	private boolean recuperar;
	
	public InicioPartida(String nombreEquipo, boolean recuperar) {
		super();
		this.nombreEquipo = nombreEquipo;
		this.recuperar = recuperar;
	}
	
	
}
