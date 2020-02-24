package logica.poolConexiones;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import logica.excepciones.PersistenciaException;

public class PoolConexiones implements IPoolConexiones{
	private String driver, url, user, password;
	private int nivelTransaccionalidad;
	private Conexion[] conexiones;
	private int tamanio, creadas, tope;
	
	public PoolConexiones() throws PersistenciaException {
		try {
			Properties p = new Properties();
			p.load(new FileInputStream("config/configPersistencia.properties"));
			
			driver = p.getProperty("driver");
			url = p.getProperty("url");
			user = p.getProperty("usr");
			password = p.getProperty("pwd");
			
			nivelTransaccionalidad = Connection.TRANSACTION_SERIALIZABLE;
			
			Class.forName(driver);
			
			tamanio = Integer.valueOf(p.getProperty("tamanio"));
			creadas = 0;
			tope = 0;
			
			conexiones = new Conexion[tamanio];
		} catch(IOException e) {
			throw new PersistenciaException("Error al cargar archivo de configuracion");
		} catch(ClassNotFoundException e1) {
			e1.printStackTrace();
			throw new PersistenciaException("Error al cargar el driver");
		}
	}

	public synchronized IConexion obtenerConexion(boolean modifica) throws PersistenciaException { 
		
		IConexion conexion = new Conexion(null);
		boolean tengoconexion = false;
		
		try {
			while (tengoconexion == false){
				if (tope == 0) {
					if(creadas == tamanio) {
						wait();		// Notify mas abajo tira exception. Este tambien?
					}else {
						conexion = new Conexion(DriverManager.getConnection(url, user, password));
						creadas++;
						tengoconexion = true;
					}
				}else {
					tope --;
					conexion = conexiones[tope];
					tengoconexion = true;
				}
			}
			
			((Conexion) conexion).getConnection().setAutoCommit(false);
			((Conexion) conexion).getConnection().setTransactionIsolation(nivelTransaccionalidad);
			
		} catch(InterruptedException e) {
			e.printStackTrace();
			throw new PersistenciaException("wait interrumpido en obtenerConexion");
		} catch(SQLException e) {
			e.printStackTrace();
			throw new PersistenciaException("Error SQL");
		}

		return conexion;
	}

	public synchronized void liberarConexion(IConexion icon, boolean sinError) throws PersistenciaException {
		
		Conexion conexion = (Conexion) icon;
		
		try {
			conexiones[tope] = conexion;
			tope ++;
			notify();		
			
			if(sinError) {
				conexion.getConnection().commit();
			}else {
				conexion.getConnection().rollback();
			}		
		}catch(SQLException e) {
			e.printStackTrace();
			throw new PersistenciaException("Error SQL");
		}
	}
}
