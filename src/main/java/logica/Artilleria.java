package logica;

public abstract class Artilleria {
	
	private int rango;
	private int danio;
	private int cadencia;

	public Artilleria(int r, int dan, int cad) {
		this.rango=r;
		this.danio=dan;
		this.cadencia=cad;
		
	}
	
	public int getRango() {
		
		return 10; //se pone una medida asi los metodos pueden ser sobre escritos segun que arma sea.	
	}
	
public int getDdanio() {
		
		return 10; //se pone una medida asi los metodos pueden ser sobre escritos segun que arma sea.	
	}

public int getCadencia() {
	
	return 10; //se pone una medida asi los metodos pueden ser sobre escritos segun que arma sea.	
}



}
