package com.taller.model;

public class Jugador {
	private String nombre;
	private String sprite;
	private int x;
	private int y;
	
	public String getSprite() {
		return sprite;
	}

	public void setSprite(String sprite) {
		this.sprite = sprite;
	}

	public Jugador() {

	}
	
	public Jugador(String nombre, String sprite, int x, int y) {
		super();
		this.nombre = nombre;
		this.sprite = sprite;
		this.setX(x);
		this.setY(y);
	}

	@Override
	public String toString() {
		return nombre;
	}


	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@Override
	public boolean equals(Object obj) {
		return this.nombre.equals(((Jugador)obj).getNombre());
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}
	
	
}

