package logica;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import logica.Vehiculo;

public class Vehiculos implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private List<Vehiculo> Vehiculos;
	
	public Vehiculos() {
		
		Vehiculos = new ArrayList<Vehiculo>();
	}
	
	public List<Vehiculo> getVehiculos(){
		
		return Vehiculos;
	}
	
	public void setVehiculos (List<Vehiculo> vehiculos) {
		this.Vehiculos=vehiculos;
	}
	
	public boolean member (int idVehiculo) {
		
		boolean existe = false;
		for (int i=0; i < Vehiculos.size();i++) {
			if(!existe)
			{
				Vehiculo ve = Vehiculos.get(i);
				if(ve.getId()==idVehiculo)
				{
					existe=true;
				}
			}
		}
		return existe;
	}
	
	public void insert (Vehiculo ve) {
		
		Vehiculos.add(ve);
	}
	
	public Vehiculo find(int idVehiculo) {
		
		boolean esta=false;
		Vehiculo veh = null;
		for(int i=0; i<Vehiculos.size();i++) {
			if(!esta)
			{
				Vehiculo v = Vehiculos.get(i);
				if(v.getId()== idVehiculo)
				{
					esta=true;
					veh=v;
				}
			}
		}
		return veh;
	}
	
	public boolean esVacia () {
		
		return Vehiculos.isEmpty();
	}

}
	
