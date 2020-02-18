package com.taller.config;

import java.io.IOException;
import java.util.HashMap;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;


@ServerEndpoint(value = "/juego/")
public class EndpointJuego{
	private Session session;
    private static final Set<EndpointJuego> endpointsPartida = new CopyOnWriteArraySet<>();
//    private static HashMap<String, Jugador> jugadores = new HashMap<>();
    
    @OnOpen
    public void onOpen(Session session) throws IOException, EncodeException {
//    	Gson gson = new  Gson();
//    	Jugador jugador;
    	this.session = session;
//    	int x = (int) ((Math.random() * (400 - 50)) + 50);
//    	int y = (int) ((Math.random() * (400 - 50)) + 50);
        endpointsPartida.add(this);
//        if(jugadores.isEmpty())
//        	jugador = new Jugador(nombreJugador,"bote1", x , y);
//        else
//        	jugador = new Jugador(nombreJugador,"patrullero1", x, y);
//        
//        jugadores.put(session.getId(), jugador);
//        String json = gson.toJson(jugador);
//        session.getBasicRemote().sendText(json);
    }

    @OnMessage
    public void onMessage(Session session, String movimiento) throws IOException, EncodeException {
        broadcast(movimiento);

    }

    @OnClose
    public void onClose(Session session) throws IOException, EncodeException {
        endpointsPartida.remove(this);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
    }

    private static void broadcast(String movimiento) throws IOException, EncodeException {
		/*
		 * Gson gson = new Gson(); String json = gson.toJson(jugador);
		 */
        endpointsPartida.forEach(endpoint -> {
            synchronized (endpoint) {
                try {
                    endpoint.session.getBasicRemote()
                            .sendText(movimiento);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}