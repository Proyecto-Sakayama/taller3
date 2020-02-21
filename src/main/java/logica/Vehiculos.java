package logica;

import java.util.HashMap;
import java.util.Map;

import logica.Vehiculo;

public class Vehiculos {
	
	private Map<Integer,Vehiculo> Vehiculos;
	
	public Vehiculos() {
		
		Vehiculos = new HashMap<Integer,Vehiculo>();
	}
	
	public boolean member (int clave) {
		
		return Vehiculos.containsKey(clave);
	}
	
	public void insert (int clave, Vehiculo ve) {
		
		Vehiculos.put(clave, ve);
	}
	
	public Vehiculo find(int clave) {
		
		return Vehiculos.get(clave);
	}
	
	public void delete (int clave) {
		
		Vehiculos.remove(clave);
	}

}
	
