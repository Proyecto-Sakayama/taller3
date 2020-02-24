package persistencia.fabricas;
import persistencia.daos.*;
public interface FabricaAbstracta {
	
	public IDAOJugadores crearIDAOJugadores();
	public IDAOVehiculos crearIDAOVehiculos();
	public IDAOPartidas crearIDAOPartidas();

}
