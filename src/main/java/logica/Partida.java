package logica;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.Properties;
import logica.excepciones.PersistenciaException;
import persistencia.daos.IDAOJugadores;
import persistencia.fabricas.FabricaAbstracta;

public class Partida {
	
	private int IdPartida;
	private Date fechaHora;
	private boolean tormenta;
	private float tiempoPartida;
	private Jugadores jugadores;
	private IDAOJugadores daoJugadores;
	
	public Partida() {
		
		super();
	}

	public Partida(int id, Date fh, boolean tormen, Jugadores jug) throws PersistenciaException {
		
		super();
		this.setIdPartida(id);
		this.setFechaHora(fh);
		this.setTormenta(tormen);
		this.setJugadores(jug);
		
		try {
			
			ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
			InputStream input = classLoader .getResourceAsStream("config/config.properties");
			Properties p = new Properties();
			
			try {
				p.load(input);
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			String nomFab = p.getProperty("nomFab");
			FabricaAbstracta f = (FabricaAbstracta)Class.forName(nomFab).newInstance();
			setDaoJugadores(f.crearIDAOJugadores());
			jugadores = new Jugadores();
		} catch (InstantiationException e) {
			throw new PersistenciaException(e.getMessage());
		} catch (IllegalAccessException e) {
			throw new PersistenciaException(e.getMessage());
		} catch (ClassNotFoundException e) {
			throw new PersistenciaException(e.getMessage());
		}
	}


	public int getIdPartida() {
		return IdPartida;
	}


	public void setIdPartida(int idPartida) {
		this.IdPartida = idPartida;
	}


	public Date getFechaHora() {
		return fechaHora;
	}


	public void setFechaHora(Date fechaHora) {
		this.fechaHora = fechaHora;
	}


	public boolean getTormenta() {
		return tormenta;
	}


	public void setTormenta(Boolean tormenta) {
		this.tormenta = tormenta;
	}


	public Jugadores getJugadores() {
		return jugadores;
	}


	public void setJugadores(Jugadores jugadores) {
		this.jugadores = jugadores;
	}

	public IDAOJugadores getDaoJugadores() {
		return daoJugadores;
	}

	public void setDaoJugadores(IDAOJugadores daoJugadores) {
		this.daoJugadores = daoJugadores;
	}

	public float getTiempoPartida() {
		return tiempoPartida;
	}

	public void setTiempoPartida(float tiempoPartida) {
		this.tiempoPartida = tiempoPartida;
	}

}
