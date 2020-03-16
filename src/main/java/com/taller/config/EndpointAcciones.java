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
	private static int tiempoPartida = 300;
	private static int seconds = tiempoPartida;
	Timer timer;

	@OnOpen
	public void onOpen(Session session, @PathParam("equipo") String equipo) throws IOException, EncodeException {

		if (seconds == 0) {
			reset();
		}

		this.session = session;
		if (endpointsPartida[0] == null) {
			endpointsPartida[0] = this;

		} else {
			endpointsPartida[1] = this;

		}
		try {
			if (endpointsPartida[0] != null && endpointsPartida[1] != null) {//(equipo.equals("Patrullero")) {
				timer = new Timer();
				timer.schedule(new TimerTask() {
					@Override
					public void run() {

						try {
							if (seconds >= 0) {

								String json = "{ \"accion\" : \"tiempo\", \"tiempoRestante\" : \" " + seconds + " \"}";

								broadcast(json);
	
								if(seconds == 0) {

									reset();
								}
								
								seconds = seconds - 1;
							} else {

								reset();
								return;
							}

							
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
		} catch (Exception e) {

		}

	}

	@OnMessage
	public void onMessage(Session session, String accion) throws IOException, EncodeException {
		broadcast(accion);

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
	
	private void reset() {
		endpointsPartida[0] = null;
		endpointsPartida[1] = null;
		if(timer != null)
		{
			timer.cancel();
			timer.purge();
			timer = null;
		}
		seconds = tiempoPartida;
	}

}
