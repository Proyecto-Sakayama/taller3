package com.taller.config;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/acciones/{equipo}")
public class EndpointAcciones {
	private Session session;
	private static final EndpointAcciones[] endpointsPartida = new EndpointAcciones[2];
	private static int seconds = 300;

	@OnOpen
	public void onOpen(Session session, @PathParam("equipo") String equipo) throws IOException, EncodeException {

		this.session = session;
		if (endpointsPartida[0] == null) {
			endpointsPartida[0] = this;

		} else {
			endpointsPartida[1] = this;

		}

		if (equipo.equals("Patrullero")) {
			Timer timer = new Timer();
			timer.schedule(new TimerTask() {
				@Override
				public void run() {

					// System.out.println(seconds);

					try {
						if (seconds >= 0) {

							String json = "{ \"accion\" : \"tiempo\", \"tiempoRestante\" : \" " + seconds + " \"}";

							broadcast(json);

						} else {

							String json = "{ \"accion\" : \"estadoJuego\", \"estadoActual\" : \"FINALIZADO\"}";

							broadcast(json);

							timer.cancel();
							timer.purge();
							return;
						}

						seconds = seconds - 1;
					} catch (IOException e1) {
						System.out.println("Error en: " + seconds);
						e1.printStackTrace();
					} catch (EncodeException e1) {
						System.out.println("Error en: " + seconds);
						e1.printStackTrace();
					}

				}
			}, 0, 1000);

		}

	}

	@OnMessage
	public void onMessage(Session session, String accion) throws IOException, EncodeException {
		broadcast(accion);

	}

	@OnClose
	public void onClose(Session session) throws IOException, EncodeException {

	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		throwable.printStackTrace();
	}

	private static void broadcast(String json) throws IOException, EncodeException {

		for (int i = 0; i < 2; i++) {

			if (endpointsPartida[i] != null) {
				synchronized (endpointsPartida[i]) {
					try {
						endpointsPartida[i].session.getBasicRemote().sendText(json);
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

}
