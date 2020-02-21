package logica;

import java.util.ArrayList;
import logica.Jugador;

public class Jugadores {
	
	private ArrayList<Jugador> Jugadores;
	
	public Jugadores() {
		
		Jugadores = new ArrayList<>();
	}
	
	public boolean member(Jugador Jugador)
	{
		return Jugadores.contains(Jugador);
	}
	
	public void insert (Jugador Jugador)
	{
		Jugadores.add(Jugador);
	}
	
	public Jugador Find (int IdJugador )
	{
		return Jugadores.get(IdJugador);
	}
	
	public int CantJugadores(){
		
		return Jugadores.size();
	}

}
