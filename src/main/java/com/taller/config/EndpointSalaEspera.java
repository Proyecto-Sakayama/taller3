package com.taller.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import com.google.gson.Gson;
import com.taller.model.Jugador;

@ServerEndpoint(value = "/salaespera/{equipo}")
public class EndpointSalaEspera {
	private Session session;
	private static final EndpointSalaEspera[] endpointsPartida = new EndpointSalaEspera[2];
	private String firstTeam = "";

	@OnOpen
	public void onOpen(Session session, @PathParam("equipo") String equipo) throws IOException, EncodeException {
		Gson gson = new Gson();
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
					} else {
						newTeam = "Patrullero";
					}
					System.out.println("3" + newTeam);
					session.getBasicRemote().sendText(newTeam);
				} else {
					System.out.println("4");
					session.getBasicRemote().sendText("1");
				}

			}
		} else {

			if (equipo.equals("start")) {
				System.out.println("5");
				broadcast("2");

			} else {
				System.out.println("6");
				endpointsPartida[0] = this;
				firstTeam = equipo;
				broadcast(firstTeam);
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
			endpointsPartida[0].session.getBasicRemote().sendText(start);
			endpointsPartida[1].session.getBasicRemote().sendText(start);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}