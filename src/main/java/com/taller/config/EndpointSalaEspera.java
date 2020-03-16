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

import com.google.gson.Gson;

import logica.Fachada;
import logica.excepciones.PersistenciaException;

@ServerEndpoint(value = "/salaespera/{equipo}/{recuperar}")
public class EndpointSalaEspera {
	private Session session;
	private static final EndpointSalaEspera[] endpointsPartida = new EndpointSalaEspera[2];
	private static String firstTeam = "";
	private Fachada fachada;

	
	@OnOpen
	public void onOpen(Session session, @PathParam("equipo") String equipo,  @PathParam("recuperar") boolean recuperar) throws IOException, EncodeException {
		try {
			fachada = Fachada.getInstance();
		} catch (PersistenciaException e) {
			e.printStackTrace();
		}
		this.session = session;

		Gson gson = new Gson();
		
		if (equipo.equals("EMPTY")) {
			if (endpointsPartida[0] == null && endpointsPartida[1] == null) {
				endpointsPartida[0] = this;
				
				InicioPartida inicio = new InicioPartida("0", fachada.recuperarPartida);
				session.getBasicRemote().sendText(gson.toJson(inicio));
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
					InicioPartida inicio = new InicioPartida(newTeam, fachada.recuperarPartida );
					session.getBasicRemote().sendText(gson.toJson(inicio));
				} else {
					endpointsPartida[1] = this;
					InicioPartida inicio = new InicioPartida("1", fachada.recuperarPartida);
					session.getBasicRemote().sendText(gson.toJson(inicio));
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
				fachada.recuperarPartida = recuperar;
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
		Gson gson = new Gson();
		InicioPartida inicio = new InicioPartida(start, fachada.recuperarPartida);
		try {
			if (endpointsPartida[0] != null) {
				endpointsPartida[0].session.getBasicRemote().sendText(gson.toJson(inicio));
			}
			if (endpointsPartida[1] != null) {
				endpointsPartida[1].session.getBasicRemote().sendText(gson.toJson(inicio));
			}

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}