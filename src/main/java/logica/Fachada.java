package logica;

import java.io.IOException;
import java.util.Properties;

import logica.excepciones.PersistenciaException;
import logica.poolConexiones.IConexion;
import logica.poolConexiones.IPoolConexiones;
import logica.valueObjects.VOEstadoPartida;
import persistencia.daos.IDAOEstadoPartida;
import persistencia.fabricas.FabricaAbstracta;

public class Fachada implements IFachada{

	private IPoolConexiones ipool;
	private IDAOEstadoPartida daoP;
	private FabricaAbstracta fabrica = null;
	
	private static Fachada instance = null;
	
	public static Fachada getInstance() throws PersistenciaException {
		if(instance == null)
			instance = new Fachada();
		return instance;
	}
	
	private Fachada() throws PersistenciaException {
		try {
			Properties p = new Properties();
			p.load(getClass().getClassLoader().getResourceAsStream("config.properties"));
			String poolConcreto = p.getProperty("poolConcreto");
			String nomFab = p.getProperty("nomFab");
			fabrica = (FabricaAbstracta) Class.forName(nomFab).newInstance();
			ipool = (IPoolConexiones) Class.forName(poolConcreto).newInstance();
			daoP = fabrica.crearIDAOEstadoPartida();
			
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			e.printStackTrace();
			throw new PersistenciaException(e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			throw new PersistenciaException("Error cargando configuracion de fachada");
		}
	}
	@Override
	public VOEstadoPartida guardarEstadoPartida(VOEstadoPartida estadoPartida) throws PersistenciaException{
		String textoPartida = estadoPartida.getDatosPartida();
		boolean guardarPartida = textoPartida.contains("\"guardarPartida\":true");
		if(guardarPartida) {
			textoPartida = textoPartida.replace("\"guardarPartida\":true", "\"guardarPartida\":false");
			estadoPartida.setDatosPartida(textoPartida);
			IConexion icon = ipool.obtenerConexion(true);
			try {
				daoP.insertar(estadoPartida, icon);
				ipool.liberarConexion(icon, true);
			} catch(PersistenciaException  e) {
				ipool.liberarConexion(icon, false);
				throw new PersistenciaException(e.getMensaje());
			} 
		}
		return estadoPartida;
	}
		
		

	@Override
	public VOEstadoPartida restaurarPartida(VOEstadoPartida estadoPartida) throws PersistenciaException {
		String textoPartida = estadoPartida.getDatosPartida();
		VOEstadoPartida result = null;
		boolean restaurarPartida = textoPartida.contains("\"restaurarPartida\":true");
		IConexion icon = ipool.obtenerConexion(true);
		if(restaurarPartida) {
			try {
				result = this.restaurarPartida(estadoPartida);
			} catch (PersistenciaException e) {
				ipool.liberarConexion(icon, false);
				e.printStackTrace();
			}
		}
		try {
			result = daoP.obtenerUltimaPartida(icon);
		} catch(PersistenciaException  e) {
			ipool.liberarConexion(icon, false);
			throw new PersistenciaException(e.getMensaje());
		} 
		ipool.liberarConexion(icon, true);
		return result;
	}

	@Override
	public void procesarDisparo(VOEstadoPartida estadoPartida) {
		// TODO Auto-generated method stub
		
	}
	

}
