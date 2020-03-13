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
	public void insertarEstadoPartida(VOEstadoPartida estadoPartida) throws PersistenciaException {
		IConexion icon = ipool.obtenerConexion(true);
		EstadoPartida partida = new EstadoPartida();
		partida.setDatosPartida(estadoPartida.getDatosPartida());
		
		try {
			daoP.insertar(partida, icon);
		} catch(PersistenciaException  e) {
			ipool.liberarConexion(icon, false);
			throw new PersistenciaException(e.getMensaje());
		} 
		ipool.liberarConexion(icon, true);
		
	}

	@Override
	public VOEstadoPartida obtenerUltimoEstado() throws PersistenciaException {
		IConexion icon = ipool.obtenerConexion(true);
		VOEstadoPartida voPartida = null;
		try {
			voPartida = new VOEstadoPartida();
			EstadoPartida partida = daoP.obtenerUltimaPartida(icon);
			voPartida.setDatosPartida(partida.getDatosPartida());
		} catch(PersistenciaException  e) {
			ipool.liberarConexion(icon, false);
			throw new PersistenciaException(e.getMensaje());
		} 
		ipool.liberarConexion(icon, true);
		return voPartida;
	}
	

}
