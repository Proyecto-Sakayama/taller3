package persistencia.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import logica.Vehiculo;
import logica.excepciones.PersistenciaException;
import logica.poolConexiones.Conexion;
import logica.poolConexiones.IConexion;
import persistencia.consultas.Consultas;

public class DAOVehiculosBD implements IDAOVehiculos {

	public DAOVehiculosBD() {
		
	}

	@Override
	public void insertar(Vehiculo ve, IConexion icon) throws PersistenciaException {
		/*
		try {
			Conexion con = (Conexion) icon;
		
			PreparedStatement pstm = con.getConnection().prepareStatement(Consultas.nuevoVehiculo());
			pstm.setInt(1, ve.getId());
			pstm.setInt(2, ve.getCoordX());
			pstm.setInt(3, ve.getCoordY());
			pstm.setInt(4, ve.getOrientacion());
			pstm.setInt(5, ve.getCantCombustible());
			pstm.setString(6, ve.getTipoVehiculo());
	
			pstm.executeUpdate();
			pstm.close();
		
		}catch (SQLException e) {
			throw new PersistenciaException(e.getMessage());			
		}*/	
		
	}

	@Override
	public boolean member(int idVehiculo, IConexion icon) throws PersistenciaException {
		Boolean existe = Boolean.FALSE;
		Conexion con = (Conexion)icon;
		
		try {
			PreparedStatement pstm = con.getConnection().prepareStatement(Consultas.existeVehiculo());
			pstm.setInt(1,idVehiculo);
			ResultSet rs = pstm.executeQuery();
			
			if(rs.next()){
				existe=true;
			}
			
			rs.close();		
			pstm.close();
		} catch (SQLException e) {
			throw new PersistenciaException(e.getMessage());			
		}
		
		return existe;
	}

	@Override
	public Vehiculo find(int idVehiculo, IConexion icon) throws PersistenciaException {
		return null;
		/*Vehiculo ve = null;
		
		try {
			
			Conexion con = (Conexion) icon;
			
			PreparedStatement ps = con.getConnection().prepareStatement(Consultas.existeVehiculo());
			ps.setInt(1, idVehiculo);
			ResultSet rs= ps.executeQuery();
			
			rs.next();
			
			
		}*/
	}

	
	public List<Vehiculo> obtenerVehiculos(IConexion icon) throws PersistenciaException {
		// TODO Auto-generated method stub
		return null;
	}

}
