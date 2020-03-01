package persistencia.daos;

import java.util.List;
import logica.excepciones.PersistenciaException;
import logica.poolConexiones.*;

import logica.Vehiculo;

public interface IDAOVehiculos {
	
	public void insertar (Vehiculo ve, IConexion icon) throws PersistenciaException;
	
	public Vehiculo find (int nro, IConexion icon) throws PersistenciaException;

	boolean member(int idVehiculo, IConexion icon) throws PersistenciaException;
	
	//public List<Vehiculo> obtenerVehiculos (IConexion icon) throws PersistenciaException;

}
