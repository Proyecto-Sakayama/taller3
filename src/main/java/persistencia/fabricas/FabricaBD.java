package persistencia.fabricas;
import persistencia.daos.*;

public class FabricaBD implements FabricaAbstracta {
	

	public FabricaBD() {
		
	}

	@Override
	public IDAOJugadores crearIDAOJugadores() {
		// TODO Auto-generated method stub
		return new DAOJugadoresBD();
	}

	@Override
	public IDAOVehiculos crearIDAOVehiculos() {
		// TODO Auto-generated method stub
		return new DAOVehiculosBD();
	}

	@Override
	public IDAOPartidas crearIDAOPartidas() {
		// TODO Auto-generated method stub
		return new DAOPartidasBD();
	}

}
