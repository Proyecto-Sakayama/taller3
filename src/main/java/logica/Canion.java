package logica;

public class Canion extends Artilleria {

	public Canion(int r, int dan, int cad) {
		super(r, dan, cad);
	}
	
	public int getRango () {
		
		return (this.getRango())*2;
	}
	
	public int getDanio () {
		
		return (this.getDanio())*2;
	}
	
public int getCadencia() {
		
		return (this.getCadencia())/2;
	}
	
	

}
