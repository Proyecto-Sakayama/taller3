package logica;

import java.io.Serializable;
import java.util.ArrayList;
import logica.Jugador;


public class Jugadores implements Serializable {

	private static final long serialVersionUID = 1L;
	private ArrayList<Jugador> Jugadores;
	
	public Jugadores() {
		
		Jugadores = new ArrayList<Jugador>();
	}
	
	public ArrayList<Jugador> getJugadores() {
		return Jugadores;
	}
	
	public void setJugadores(ArrayList<Jugador> jugadores) {
		this.Jugadores = jugadores;
	}
	
	public boolean member(int idJugador)
	{
		Boolean esta = false;
        for (int i=0;i < Jugadores.size();i++) {
        	if (!esta)
        	{
            	Jugador jug = Jugadores.get(i);
                if(jug.getIdJugador() == idJugador)
                {
                	esta = true;
                }    		
        	}
        }
		return esta;
	}
	
	public void insert (Jugador Jugador)
	{
		Jugadores.add(Jugador);
	}
	
	public Jugador Find (int IdJugador)
	{
		boolean existe= false;
		Jugador jugador = null;
		for (int i=0;i<Jugadores.size();i++) {
			if(!existe)
			{
				Jugador jug = Jugadores.get(i);
				if(jug.getIdJugador()==IdJugador)
				{
					existe=true;
					jugador=jug;
				}
			}
		}
		return jugador;
		
	}
	
	public int CantJugadores(){
		
		return Jugadores.size();
	}
	
	public boolean esVacia()
	{
		return Jugadores.isEmpty();
	}

}
