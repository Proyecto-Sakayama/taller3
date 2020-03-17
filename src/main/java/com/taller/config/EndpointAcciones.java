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

import logica.Fachada;

@ServerEndpoint(value = "/acciones/{equipo}")
public class EndpointAcciones {
	private Session session;
	private static final EndpointAcciones[] endpointsPartida = new EndpointAcciones[2];
	private static int tiempoPartida = 300;
	private static int seconds = tiempoPartida;
	Timer timer;
	TimerTask timerTask;
	boolean activo = false;

	@OnOpen
	public void onOpen(Session session, @PathParam("equipo") String equipo) throws IOException, EncodeException {

		this.session = session;
		if (endpointsPartida[0] == null) {
			endpointsPartida[0] = this;
		} else {
			endpointsPartida[1] = this;
		}
		try {
			if (endpointsPartida[0] != null && endpointsPartida[1] != null) {

				activo = true;
				inicializarTimer();

				timer.schedule(timerTask, 0, 1000);

			}
		} catch (Exception e) {

		}

	}

	@OnMessage
	public void onMessage(Session session, String accion) throws IOException, EncodeException {

	}

	@OnClose
	public void onClose(Session session) throws IOException, EncodeException {
		if (endpointsPartida[0] != null && endpointsPartida[0].session.getId() == session.getId()) {

			if (endpointsPartida[1] != null) {
				String json = "{ \"accion\" : \"salida\", \"motivoSalida\" : \"ABANDONO\"}";

				endpointsPartida[1].session.getBasicRemote().sendText(json);
			}
		} else if (endpointsPartida[1] != null && endpointsPartida[1].session.getId() == session.getId()) {

			if (endpointsPartida[0] != null) {
				String json = "{ \"accion\" : \"salida\", \"motivoSalida\" : \"ABANDONO\"}";

				endpointsPartida[0].session.getBasicRemote().sendText(json);
			}

		}

		try {
			if (activo) {
				reset();
			} else {
				if (session.getId() == endpointsPartida[0].session.getId()) {
					endpointsPartida[1].reset();
				} else {
					endpointsPartida[0].reset();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

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

	public void reset() {

		try {
			timerTask.cancel();
			timer.cancel();
			timer.purge();
			seconds = tiempoPartida;
			activo = false;
			endpointsPartida[0] = null;
			endpointsPartida[1] = null;
			return;
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private void inicializarTimer() {
	
		try {
			Fachada laFachada = Fachada.getInstance();
			tiempoPartida = laFachada.getTiempoPartida();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		timer = new Timer();
		timerTask = new TimerTask() {
			@Override
			public void run() {

				try {
					if (seconds >= 0) {

						String json = "{ \"accion\" : \"tiempo\", \"tiempoRestante\" : \" " + seconds + " \"}";

						broadcast(json);

						if (seconds == 0) {

							reset();
						} else {
							seconds = seconds - 1;
						}

					} else {

						reset();
					}

				} catch (IOException e1) {
					System.out.println("Error en: " + seconds);
					e1.printStackTrace();
				} catch (EncodeException e1) {
					System.out.println("Error en: " + seconds);
					e1.printStackTrace();
				}

			}
		};
	}

}
