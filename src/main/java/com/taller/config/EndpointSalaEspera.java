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
				System.out.println("0");
			} else {
				System.out.println("1");
				endpointsPartida[1] = this;
				String newTeam = "";
				if (!firstTeam.equals("")) {
					System.out.println("2");
					if (firstTeam.equals("Patrullero")) {
						newTeam = "Pesquero";
						fachada.definirAdministrador("Patrullero");
						
					} else {
						newTeam = "Patrullero";
						fachada.definirAdministrador("Pesquero");
					}
					System.out.println("3" + newTeam);
					session.getBasicRemote().sendText(newTeam);
				} else {
					System.out.println("4");
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
				System.out.println("5");
				

			} else {
				System.out.println("6");
				//endpointsPartida[0] = this;
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