package persistencia.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import logica.Comun;
import logica.Fabrica;
import logica.Ligera;
import logica.Oceanica;
import logica.Pesquero;
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
		
		Conexion con = (Conexion) icon;
		
		try {
			
			Consultas cons=new Consultas();
			String update=cons.insertarVehiculo();
			
			PreparedStatement ps;
			ps= con.getConnection().prepareStatement(update);
			ps.setInt(1, ve.getId());
			ps.setInt(2, ve.getCoordX());
			ps.setInt(3, ve.getCoordY());
			ps.setInt(4, ve.getOrientacion());
			ps.setInt(5, ve.getCantCombustible());
			ps.setString(6, ve.getTipoVehiculo());
			ps.setInt(7, ve.getVelocidad());
	
			ps.executeUpdate();
			ps.close();
			
			if(ve instanceof Fabrica)
			{
				PreparedStatement ps2;
				update= cons.insertarFabrica();
				ps2= con.getConnection().prepareStatement(update);
				ps2.setInt(1, ve.getId());
				ps2.setInt(2, ((Pesquero) ve).getVelocidadPesca());
				ps2.setInt(3,((Pesquero)ve).getResistencia());
				ps2.setInt(4, ((Pesquero)ve).getCantidadPescada());
				ps2.setInt(5, ((Pesquero)ve).getDanio());
				ps2.setBoolean(6, ((Pesquero)ve).getAtrapado());
				ps2.executeUpdate();
				ps2.close();
			} else 
			{if(ve instanceof Comun)
			{
				PreparedStatement ps3;
				update= cons.insertarComun();
				ps3= con.getConnection().prepareStatement(update);
				ps3.setInt(1, ve.getId());
				ps3.setInt(2, ((Pesquero) ve).getVelocidadPesca());
				ps3.setInt(3,((Pesquero)ve).getResistencia());
				ps3.setInt(4, ((Pesquero)ve).getCantidadPescada());
				ps3.setInt(5, ((Pesquero)ve).getDanio());
				ps3.setBoolean(6, ((Pesquero)ve).getAtrapado());
				ps3.executeUpdate();
				ps3.close();
			}else
			{
				if (ve instanceof Oceanica)
				{
					PreparedStatement ps4;
					update= cons.insertarOceanica();
					ps4=con.getConnection().prepareStatement(update);
					ps4.setInt(1, ve.getId());
					ps4.setInt(2, ((Oceanica) ve).getAlcanceRadar());
					ps.executeUpdate();
					ps4.close();
				}
				else {
					PreparedStatement ps5;
					update= cons.insertarLigera();
					ps5=con.getConnection().prepareStatement(update);
					ps5.setInt(1, ve.getId());
					ps5.setInt(2, ((Ligera) ve).getAlcanceRadar());
					ps.executeUpdate();
					ps5.close();
				}
			}
			}
				
		
		}catch (SQLException e) {
			throw new PersistenciaException(e.getMessage());			
		}
		
	}

	@Override
	public boolean member(int idVehiculo, IConexion icon) throws PersistenciaException {
		Boolean existe = false;;
		Conexion con = (Conexion)icon;
		
		try {
			Consultas cons = new Consultas();
			PreparedStatement pstm = con.getConnection().prepareStatement(cons.existeVehiculo());
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

	
	/*public List<Vehiculo> obtenerVehiculos(IConexion icon) throws PersistenciaException {
		// TODO Auto-generated method stub
		return null;
	}*/

}
