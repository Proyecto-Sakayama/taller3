package logica;

import java.io.IOException;
import java.util.Properties;
import java.util.Random;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

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
	
	public static String equipoAdministrador = ""; 
	private int segundosChequeoTormenta;
	private boolean hayTormenta;
	private int ultimoChequeoTormenta;
	private static Fachada instance = null;
	
	public static boolean recuperarPartida = false;
;
	
	public static Fachada getInstance() throws PersistenciaException {
		if(instance == null)
			instance = new Fachada();
		return instance;
	}
	
	private Fachada() throws PersistenciaException {
		try {
			segundosChequeoTormenta = 30;
			ultimoChequeoTormenta = 0;
			hayTormenta = false; 
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
	public VOEstadoPartida guardarEstadoPartida(VOEstadoPartida estadoPartida, String equipo) throws PersistenciaException{
		String textoPartida = estadoPartida.getDatosPartida();
		boolean guardarPartida = textoPartida.contains("\"guardarPartida\":true");
		if(equipo.equals(equipoAdministrador) && guardarPartida) {
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
	public VOEstadoPartida restaurarPartida(VOEstadoPartida estadoPartida, String equipo) throws PersistenciaException {
		String textoPartida = estadoPartida.getDatosPartida();
		VOEstadoPartida result = null;
		boolean restaurarPartida = textoPartida.contains("\"restaurarPartida\":true");
		if(equipo.equals(equipoAdministrador) && restaurarPartida) {
			IConexion icon = ipool.obtenerConexion(true);
			try {
				result = daoP.obtenerUltimaPartida(icon);
				ipool.liberarConexion(icon, true);
			} catch(PersistenciaException  e) {
				ipool.liberarConexion(icon, false);
				throw new PersistenciaException(e.getMensaje());
			} 
		}
		return result;
	}

	@Override
	public VOEstadoPartida procesarDisparo(VOEstadoPartida estadoPartida) {
		String partida = estadoPartida.getDatosPartida();
		VOEstadoPartida result = new VOEstadoPartida(partida);
		
		boolean existeDisparo = partida.contains("\"Disparo\":{\"existe\":true");
		if (existeDisparo) {
			int probImpactoHasta = 70;

			Random r = new Random();
			int minimo = 0;
			int maximo = 100;
			int probabilidadObtenida = r.nextInt(maximo - minimo) + minimo;

			if (probabilidadObtenida <= probImpactoHasta) {
				result.setDatosPartida(partida);
			} else {
				result.setDatosPartida(partida.replace("\"impacto\":true", "\"impacto\":false"));
			}

		}
		return result;
	}


	@Override
	public VOEstadoPartida chequearTormenta(VOEstadoPartida estadoPartida) {
		VOEstadoPartida result = estadoPartida;
		String partida = estadoPartida.getDatosPartida();
		JsonObject jsonObject = new JsonParser().parse(partida).getAsJsonObject();
		String tiempoRestantePartidaString = jsonObject.get("tiempoRestantePartida").getAsString();
		int tiempoRestantePartida = Integer.parseInt(tiempoRestantePartidaString.trim());
		
		
		boolean teclaTormenta = partida.contains("\"teclaTormenta\":true");
		
		if(!teclaTormenta) {
	        if(this.ultimoChequeoTormenta == 0)
	            ultimoChequeoTormenta = tiempoRestantePartida;
	        
	        if(ultimoChequeoTormenta - tiempoRestantePartida >= this.segundosChequeoTormenta)
	        {
	            ultimoChequeoTormenta = tiempoRestantePartida;
	            Random r = new Random();
	            int low = 1;
	            int high = 10;
	            int randomTormenta = r.nextInt(high-low) + low;
	            
	            if(randomTormenta <= 5)
	            {
	                hayTormenta = true;
	            }
	            else
	            {
	                hayTormenta = false;
	            }
	        }
		}
		else
			hayTormenta = !hayTormenta;
        
		partida = partida.replace("\"teclaTormenta\":true", "\"teclaTormenta\":false");
		if(hayTormenta)
			partida = partida.replace("\"hayTormenta\":false", "\"hayTormenta\":true");
		else
			partida = partida.replace("\"hayTormenta\":true", "\"hayTormenta\":false");
		
		result.setDatosPartida(partida);
        return result;
	}

	@Override
	public VOEstadoPartida actualizarAdministrador(VOEstadoPartida estadoPartida) {
		String partida = estadoPartida.getDatosPartida();
		partida = partida.replace("\"equipoAdministrador\":\"\"", "\"equipoAdministrador\":\"" + Fachada.equipoAdministrador.toString() + "\"" );
		estadoPartida.setDatosPartida(partida);
		return estadoPartida;
	}
	

}
