package persistencia.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import logica.excepciones.PersistenciaException;
import logica.poolConexiones.Conexion;
import logica.poolConexiones.IConexion;
import logica.valueObjects.VOEstadoPartida;
import persistencia.consultas.Consultas;

public class DAOEstadoPartida implements IDAOEstadoPartida {

	public DAOEstadoPartida() {
		
	}

	@Override
	public void insertar(VOEstadoPartida estadoPartida, IConexion icon) throws PersistenciaException {
		try {
			Conexion con = (Conexion) icon;
		
			PreparedStatement pstm = con.getConnection().prepareStatement(Consultas.insertarPartida());
			pstm.setString(1, estadoPartida.getDatosPartida());
			pstm.executeUpdate();
			pstm.close();
		
		}catch (SQLException e) {
			throw new PersistenciaException(e.getMessage());			
		}
	}
	
	public VOEstadoPartida obtenerUltimaPartida(IConexion icon) throws PersistenciaException{
		Conexion con = (Conexion) icon;

		VOEstadoPartida partida = null;
		
		try {
			PreparedStatement pst = con.getConnection().prepareStatement(Consultas.listarPartidas());
			ResultSet rs = pst.executeQuery();
			
			if(rs.next()){
				partida = new VOEstadoPartida();
				partida.setIdPartida(rs.getInt("idPartida"));
				partida.setDatosPartida(rs.getString("datosPartida"));
			}
			rs.close();
			pst.close();
		} catch (SQLException e) {
			System.out.println(e);
			throw new PersistenciaException(e.getMessage());
		}
		
		return partida;
	}
	

}
