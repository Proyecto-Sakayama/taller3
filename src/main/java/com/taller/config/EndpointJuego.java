package com.taller.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Random;
import java.util.Set;
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

@ServerEndpoint(value = "/juego/{equipo}")
public class EndpointJuego {
	private Session session;
	private static final EndpointJuego[] endpointsPartida = new EndpointJuego[2];

	@OnOpen
	public void onOpen(Session session, @PathParam("equipo") String equipo) throws IOException, EncodeException {
		Gson gson = new Gson();
		this.session = session;
		// String nombre = "";

		// if (endpointsPartida[0] == null && endpointsPartida[1] == null) {
		if (equipo.equals("Patrullero")) {
			endpointsPartida[0] = this;

		} else {
			endpointsPartida[1] = this;

		}

	}

	@OnMessage
	public void onMessage(Session session, String partida) throws IOException, EncodeException {

		String partidaEnviar = partida;

		boolean existeDisparo = partida.contains("\"Disparo\":{\"existe\":true");
		
		boolean guardarPartida = partida.contains("\"guardarPartida\":true");

		if (existeDisparo) {

			int probImpactoHasta = 70;

			Random r = new Random();
			int minimo = 0;
			int maximo = 100;
			int probabilidadObtenida = r.nextInt(maximo - minimo) + minimo;

			if (probabilidadObtenida <= probImpactoHasta) {
				partidaEnviar = partida;
			} else {
				partidaEnviar = partida.replace("\"impacto\":true", "\"impacto\":false");
			}

		}

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