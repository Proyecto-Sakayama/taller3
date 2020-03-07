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

	@OnOpen
	public void onOpen(Session session, @PathParam("equipo") String equipo) throws IOException, EncodeException {
		Gson gson = new Gson();
		this.session = session;
		String nombre = "";
		int cant = 0;

		if (!equipo.equals("CONSULTA")) {

			if (endpointsPartida[0] == null && endpointsPartida[1] == null) {
				if (equipo.equals("Patrullero")) {
					endpointsPartida[0] = this;
					nombre = "patrullero1";

				} else {
					endpointsPartida[1] = this;
					nombre = "bote1";
				}

				String json = gson.toJson(nombre);
				session.getBasicRemote().sendText(json);

			} else if (endpointsPartida[0] == null) {
				endpointsPartida[0] = this;
				nombre = "patrullero1";

				String json = gson.toJson(nombre);
				session.getBasicRemote().sendText(json);

			} else if (endpointsPartida[1] == null) {
				endpointsPartida[1] = this;
				nombre = "bote1";

				String json = gson.toJson(nombre);
				session.getBasicRemote().sendText(json);
			}
		} else {
			String elqueesta = "NINGUNO";
			if (endpointsPartida[0] != null || endpointsPartida[1] != null) {
				if (endpointsPartida[0] != null) {

					elqueesta = "Patrullero";

				} else {
					elqueesta = "Pesquero";
				}
			}
			String json = gson.toJson(elqueesta);
			session.getBasicRemote().sendText(elqueesta);

		}

		Timer timer = new Timer();
		timer.schedule(new TimerTask() {
			@Override
			public void run() {

				// System.out.println(seconds);

				try {
					broadcastStatus(endpointsPartida);

				} catch (Exception e) {
				}

			}
		}, 0, 1000);

		if (endpointsPartida[0] != null && endpointsPartida[1] != null) {

			System.out.println("El juego ya ha comenzado, pruebe a iniciar partida más tarde.");

		}
	}

	@OnMessage
	public void onMessage(Session session, String movimiento) throws IOException, EncodeException {
		broadcastStatus(endpointsPartida);
	}

	@OnClose
	public void onClose(Session session) throws IOException, EncodeException {
		Gson gson = new Gson();
		String json = gson.toJson(Integer.toString(0));
		session.getBasicRemote().sendText(json);
		endpointsPartida[0] = null;
		this.session = null;
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		throwable.printStackTrace();
	}

	public void broadcastStatus(EndpointSalaEspera[] endpointsPartida) {
		int cant = 0;
		String equipoQueEsta = "Ninguno";
		if (endpointsPartida[0] != null) {
			cant++;
			equipoQueEsta = "Patrullero";
		}
		if (endpointsPartida[1] != null) {
			cant++;
			equipoQueEsta = "Pesquero";
		}
		if (cant == 1) {
			equipoQueEsta = "Los2";
		}

		try {
			endpointsPartida[0].session.getBasicRemote().sendText(equipoQueEsta);
			endpointsPartida[1].session.getBasicRemote().sendText(equipoQueEsta);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}