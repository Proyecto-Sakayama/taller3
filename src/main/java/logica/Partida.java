package logica;

import java.util.Date;

public class Partida {
	
	private int idPartida;
	private Date fechaHora;
	private String clima;
	private Jugadores jugadores;
	

	public Partida(int id, Date fh, String clim, Jugadores jug) {
		
		this.setIdPartida(id);
		this.setFechaHora(fh);
		this.setClima(clim);
		this.setJugadores(jug);
	}


	public int getIdPartida() {
		return idPartida;
	}


	public void setIdPartida(int idPartida) {
		this.idPartida = idPartida;
	}


	public Date getFechaHora() {
		return fechaHora;
	}


	public void setFechaHora(Date fechaHora) {
		this.fechaHora = fechaHora;
	}


	public String getClima() {
		return clima;
	}


	public void setClima(String clima) {
		this.clima = clima;
	}


	public Jugadores getJugadores() {
		return jugadores;
	}


	public void setJugadores(Jugadores jugadores) {
		this.jugadores = jugadores;
	}

}
