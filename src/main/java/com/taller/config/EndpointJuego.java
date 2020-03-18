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
	public void onMessage(Session session, String partida, @PathParam("equipo") String equipo)
			throws IOException, EncodeException {
		String partidaEnviar;
		
		//Se llaman a métodos de la fachada
		//Para determinar si se guarda, recupera, procesa disparo, etc.
		VOEstadoPartida estadoPartida = new VOEstadoPartida(partida);
		VOEstadoPartida partidaRestaurada = null;
		try {
			fachada.guardarEstadoPartida(estadoPartida, equipo);
			partidaRestaurada = fachada.restaurarPartida(estadoPartida, equipo);
		} catch (PersistenciaException e) {
			e.printStackTrace();
		}
		if (partidaRestaurada != null)
			estadoPartida = partidaRestaurada;
		estadoPartida = fachada.procesarDisparo(estadoPartida);
		estadoPartida = fachada.chequearTormenta(estadoPartida);
		estadoPartida = fachada.actualizarAdministrador(estadoPartida);
		partidaEnviar = estadoPartida.getDatosPartida();
		broadcast(partidaEnviar);
	}

	//Se envía información del motivo de salida cuando se desconecta el jugador
	@OnClose
	public void onClose(Session session) throws IOException, EncodeException {
		if (endpointsPartida[0] != null && endpointsPartida[0].session.getId() == session.getId()) {
			endpointsPartida[0] = null;
			if (endpointsPartida[1] != null) {
				String json = "{ \"accion\" : \"salida\", \"motivoSalida\" : \"ABANDONO\"}";

				endpointsPartida[1].session.getBasicRemote().sendText(json);
			}
		} else if (endpointsPartida[1] != null && endpointsPartida[1].session.getId() == session.getId()) {
			endpointsPartida[1] = null;
			if (endpointsPartida[0] != null) {
				String json = "{ \"accion\" : \"salida\", \"motivoSalida\" : \"ABANDONO\"}";

				endpointsPartida[0].session.getBasicRemote().sendText(json);
			}

		}

		reset();
	}

	private void reset() {
		endpointsPartida[0] = null;
		endpointsPartida[1] = null;
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		throwable.printStackTrace();
	}

	//Se envía el mensaje a todos los jugadores
	private static void broadcast(String partida) throws IOException, EncodeException {
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