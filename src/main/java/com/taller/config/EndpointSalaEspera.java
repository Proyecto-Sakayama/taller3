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

@ServerEndpoint(value = "/salaespera/{equipo}")
public class EndpointSalaEspera {
	private Session session;
	private static final EndpointSalaEspera[] endpointsPartida = new EndpointSalaEspera[2];
	private static String firstTeam = "";
	private Fachada fachada;
	
	@OnOpen
	public void onOpen(Session session, @PathParam("equipo") String equipo) throws IOException, EncodeException {
		try {
			fachada = Fachada.getInstance();
		} catch (PersistenciaException e) {
			e.printStackTrace();
		}
		this.session = session;

		if (equipo.equals("EMPTY")) {
			if (endpointsPartida[0] == null && endpointsPartida[1] == null) {
				endpointsPartida[0] = this;
				session.getBasicRemote().sendText("0");
			} else {
				endpointsPartida[1] = this;
				String newTeam = "";
				if (!firstTeam.equals("")) {
					if (firstTeam.equals("Patrullero")) {
						newTeam = "Pesquero";
						fachada.definirAdministrador("Patrullero");
						
					} else {
						newTeam = "Patrullero";
						fachada.definirAdministrador("Pesquero");
					}
					session.getBasicRemote().sendText(newTeam);
				} else {
					endpointsPartida[1] = this;
					session.getBasicRemote().sendText("1");
				}

			}
		} else {

			if (equipo.equals("start")) {
				broadcast("2");
				endpointsPartida[0] = null;
				endpointsPartida[1] = null;
				firstTeam = "";
				

			} else {
				firstTeam = equipo;
				
				String newTeam = "";
				if (firstTeam.equals("Patrullero")) {
					newTeam = "Pesquero";
					fachada.definirAdministrador("Patrullero");
				} else {
					newTeam = "Patrullero";
					fachada.definirAdministrador("Pesquero");
				}
				broadcast(newTeam);
			}

		}

	}

	@OnMessage
	public void onMessage(Session session, String start) throws IOException, EncodeException {

	}

	@OnClose
	public void onClose(Session session) throws IOException, EncodeException {

	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		throwable.printStackTrace();
	}

	public void broadcast(String start) {

		try {
			if (endpointsPartida[0] != null) {
				endpointsPartida[0].session.getBasicRemote().sendText(start);
			}
			if (endpointsPartida[1] != null) {
				endpointsPartida[1].session.getBasicRemote().sendText(start);
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}