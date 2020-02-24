package logica;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Partidas implements Serializable {

	private static final long serialVersionUID = 1L;
	protected List<Partida> partidas;

	public Partidas() {
		partidas = new ArrayList<Partida>();
	}
	
	public List<Partida> getPartidas(){
		return partidas;
	}
	
	public void setPartidas (List<Partida>parts) {
		
		this.partidas=parts;
	}
	
	public boolean esVacia() {
		
		return partidas.isEmpty();
	}
	
	public int largo() {
		return partidas.size();
	}
	public void insert (Partida part) {
		partidas.add(part);
	}
	
	
	// Metodo que nos dice si una partida pertenece
	// a la secuencia de partidas guardadas
	public boolean member (int idPart) {
		
		boolean esta = false;
		for(int i=0;i<partidas.size();i++) {
			if(!esta)
			{
				Partida p = partidas.get(i);
				if(p.getIdPartida()==idPart)
				{
					esta=true;
				}
			}
		}
		return esta;
	}
	
	public Partida find (int idPart) {
		
		boolean esta= false;
		Partida part = null;
		for (int i=0;i<partidas.size();i++) {
			if(!esta)
			{
				Partida p = partidas.get(i);
				if(p.getIdPartida()==idPart)
				{
					esta=true;
					part=p;
				}
			}
		}
		return part;
	}
	

}
