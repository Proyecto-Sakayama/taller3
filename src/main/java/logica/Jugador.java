package logica;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import logica.Vehiculos;
import logica.excepciones.PersistenciaException;
import persistencia.daos.IDAOVehiculos;
import persistencia.fabricas.FabricaAbstracta;

public class Jugador {
	
	private int IdJugador;
	private String  nickname;
	private Vehiculos vehiculos;
	private IDAOVehiculos daoVehiculos;
	
	public Jugador()
	{
		super();
	}
	public Jugador(int IdJugador,String nick) throws PersistenciaException {
		
		super();
		this.IdJugador= IdJugador;
		this.nickname=nick;
		
		try {
			
			ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
			InputStream input = classLoader.getResourceAsStream("config/config.properties");
			Properties p = new Properties();	
			try {
				p.load(input);
			}catch (IOException e) {
				e.printStackTrace();
			}
			String nomFab = p.getProperty("nomFab");
			FabricaAbstracta f = (FabricaAbstracta)Class.forName(nomFab).newInstance();
			daoVehiculos = f.crearIDAOVehiculos();
			vehiculos = new Vehiculos();
			
		} catch (InstantiationException e) {
			throw new PersistenciaException(e.getMessage());
		} catch (IllegalAccessException e) {
			throw new PersistenciaException(e.getMessage());
		} catch (ClassNotFoundException e) {
			throw new PersistenciaException(e.getMessage());
		}
		
	
		
	}
	
	public int ObtenerIdJugador()
	{
		return IdJugador;
	}
	
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public Vehiculos getVehiculos() {
		return vehiculos;
	}
	public void setVehiculos(Vehiculos vehiculos) {
		this.vehiculos = vehiculos;
	}
	public int getIdJugador() {
		
		return IdJugador;
	}
	public IDAOVehiculos getDaoVehiculos() {
		return daoVehiculos;
	}
	public void setDaoVehiculos(IDAOVehiculos daoVehiculos) {
		this.daoVehiculos = daoVehiculos;
	}
	public void setIdJugador(int idJugador) {
		IdJugador = idJugador;
	}
		
}
