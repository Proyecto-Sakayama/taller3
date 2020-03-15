package com.taller.config;

import java.io.IOException;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import logica.Fachada;
import logica.excepciones.PersistenciaException;
import logica.valueObjects.VOEstadoPartida;

@ServerEndpoint(value = "/juego/{equipo}")
public class EndpointJuego {
	private Session session;
	private static final EndpointJuego[] endpointsPartida = new EndpointJuego[2];

	private Fachada fachada;
	
	@OnOpen
	public void onOpen(Session session, @PathParam("equipo") String equipo) throws IOException, EncodeException {
		try {
			fachada = Fachada.getInstance();
		} catch (PersistenciaException e) {
			e.printStackTrace();
		}
		this.session = session;
		if (equipo.equals("Patrullero")) {
			endpointsPartida[0] = this;

		} else {
			endpointsPartida[1] = this;
		}
	}

	@OnMessage
	public void onMessage(Session session, String partida, @PathParam("equipo") String equipo) throws IOException, EncodeException {
		String partidaEnviar;
		VOEstadoPartida estadoPartida = new VOEstadoPartida(partida);
		VOEstadoPartida partidaRestaurada = null;
		try {
			fachada.guardarEstadoPartida(estadoPartida);
			partidaRestaurada = fachada.restaurarPartida(estadoPartida);
		} catch (PersistenciaException e) {
			e.printStackTrace();
		}
		if(partidaRestaurada != null)
			estadoPartida = partidaRestaurada;
		estadoPartida = fachada.procesarDisparo(estadoPartida);
		
		partidaEnviar = estadoPartida.getDatosPartida();
		broadcast(partidaEnviar);
	}

	@OnClose
	public void onClose(Session session) throws IOException, EncodeException {
		try {
			
		} catch (Exception e) {

		}
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		throwable.printStackTrace();
	}

	private static void broadcast(String partida) throws IOException, EncodeException {
		/*
		 * Gson gson = new Gson(); String json = gson.toJson(jugador);
		 */

		for (int i = 0; i < 2; i++) {

			if (endpointsPartida[i] != null) {
				synchronized (endpointsPartida[i]) {
					try {
						endpointsPartida[i].session.getBasicRemote().sendText(partida);
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}

	}

}