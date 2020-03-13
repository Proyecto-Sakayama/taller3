package persistencia.fabricas;
import persistencia.daos.*;

public class FabricaBD implements FabricaAbstracta {
	

	public FabricaBD() {
		
	}

	@Override
	public IDAOEstadoPartida crearIDAOEstadoPartida() {
		return new DAOEstadoPartida();
	}

}
