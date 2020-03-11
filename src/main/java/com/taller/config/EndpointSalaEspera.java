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
				
		if (equipo == "EMPTY")
		{
			if (endpointsPartida.length == 0)
			{
				endpointsPartida[0] = this;
				session.getBasicRemote().sendText("0");
				System.out.println("0");
			} else  
			{
				System.out.println("1");
				endpointsPartida[1] = this;
				String newTeam = "";
				if (firstTeam != "")
				{
					System.out.println("2");
					if (firstTeam == "Patrullero")
					{
						newTeam = "Pesquero";
					}				
					else
					{
						newTeam = "Patrullero";
					}
				}
				System.out.println("3" + newTeam);
				session.getBasicRemote().sendText(newTeam);
			}		
		} else
		{
			System.out.println("4");
			endpointsPartida[0] = this;
			firstTeam = equipo;
			session.getBasicRemote().sendText(firstTeam);
		}
		
		
		
		
		/*
		
		
		
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
		
		
		*/
	}

	@OnMessage
	public void onMessage(Session session, String start) throws IOException, EncodeException {
		
		if (start == "start")
		{
			broadcast("2");
		}

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