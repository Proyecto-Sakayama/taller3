package persistencia.daos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import logica.Comun;
import logica.Fabrica;
import logica.Jugador;
import logica.Jugadores;
import logica.Ligera;
import logica.Oceanica;
import logica.Patrulla;
import logica.Vehiculo;
import logica.excepciones.PersistenciaException;
import logica.poolConexiones.Conexion;
import logica.poolConexiones.IConexion;
import persistencia.consultas.Consultas;

public class DAOJugadoresBD implements IDAOJugadores {

	public DAOJugadoresBD() {
		super();
	}
	public boolean memberBD (IConexion con, int idJugador) throws PersistenciaException {
		
		Conexion conn = (Conexion) con;
		boolean esta = false;
		
		try {
			Consultas cons=new Consultas();
			String query=cons.existeJugador();

			PreparedStatement pstmt;
			pstmt=conn.getConnection().prepareStatement(query);

			pstmt.setInt(1, idJugador);
			ResultSet rs=pstmt.executeQuery();

			if (rs.next())
				esta=true;

			rs.close();
			pstmt.close();
		} 
		catch (SQLException e) 
		{
			throw new PersistenciaException(e.getMessage());
		}
			
		
	return esta;
	}
	@Override
	public void insertBD(IConexion icon, Jugador jugador) throws PersistenciaException {
		Conexion con= (Conexion) icon;
		
		try {
			Consultas cons = new Consultas();
			String update = cons.insertarJugador();
			PreparedStatement ps;
			ps= con.getConnection().prepareStatement(update);
			ps.setInt(1, jugador.getIdJugador());
			ps.setString(2, jugador.getNickname());
			ps.executeUpdate();
			
			ps.close();
			for(Vehiculo vehic: jugador.getVehiculos().getVehiculos()) {
				Vehiculo v=null;
				if(vehic instanceof Oceanica){
					v= new Oceanica(vehic.getId(), vehic.getCoordX(),vehic.getCoordY(),vehic.getOrientacion(),vehic.getCantCombustible(),vehic.getTipoVehiculo(),vehic.getVelocidad(), ((Oceanica) vehic).getAlcanceRadar(),((Oceanica) vehic).getBote(),((Oceanica) vehic).getHelicoptero(),((Oceanica) vehic).getCanion(),((Oceanica) vehic).getAmetralladora());
				}else
				{if(vehic instanceof Ligera){
					v= new Ligera(vehic.getId(), vehic.getCoordX(), vehic.getCoordY(), vehic.getOrientacion(), vehic.getCantCombustible(), vehic.getTipoVehiculo(), vehic.getVelocidad(), ((Ligera) vehic).getAlcanceRadar(),((Ligera) vehic).getAmetralladora());
				}else if (vehic instanceof Fabrica) {
					v= new Fabrica(vehic.getId(), vehic.getCoordX(), vehic.getCoordY(),vehic.getOrientacion(), vehic.getCantCombustible(),vehic.getTipoVehiculo(),vehic.getVelocidad(),((Fabrica)vehic).getVelocidadPesca(),((Fabrica) vehic).getResistencia(),((Fabrica) vehic).getCantidadPescada(),((Fabrica) vehic).getDanio(), ((Fabrica) vehic).getAtrapado());
				}else {
					v= new Comun(vehic.getId(), vehic.getCoordX(), vehic.getCoordY(),vehic.getOrientacion(), vehic.getCantCombustible(),vehic.getTipoVehiculo(),vehic.getVelocidad(),((Comun)vehic).getVelocidadPesca(),((Comun) vehic).getResistencia(),((Comun) vehic).getCantidadPescada(),((Comun) vehic).getDanio(), ((Comun) vehic).getAtrapado());
				}
					
				}
				jugador.getDaoVehiculos().insertar(v, icon);
				
				update= cons.buscarVehiculoPorJugador();
				PreparedStatement ps2;
				ps2= con.getConnection().prepareStatement(update);
				ps2.setInt(1, jugador.getIdJugador());
				ps2.setInt(2, v.getId());
				ps2.executeUpdate();
				ps.close();
			}
		}
		catch (SQLException e)
		{
			throw new PersistenciaException (e.getMessage());
		}
	}
	
	@Override
	public Jugador findBD(IConexion icon, int idJugador) throws PersistenciaException {
		Jugador j = null;
		List<Vehiculo> listaVehiculos = new ArrayList<Vehiculo>();
		Conexion con = (Conexion)icon;
		
		try {
			Consultas cons= new Consultas();
			String query=cons.existeJugador();
			
			PreparedStatement ps;
			ps= con.getConnection().prepareStatement(query);
			ps.setInt(1, idJugador);
			ResultSet rs=ps.executeQuery();
			if(rs.next())
			{
				j= new Jugador(rs.getInt("IdJugador"),rs.getString("nickName"));
				PreparedStatement ps2;
				query=cons.buscarVehiculoPorJugador();
				ps2= con.getConnection().prepareStatement(query);
				ps2.setInt(1, idJugador);
				ResultSet rs2= ps2.executeQuery();
				
				while(rs2.next())
				{
					listaVehiculos.add(j.getDaoVehiculos().find(rs2.getInt("IdVehiculo"), icon));
				}
				j.getVehiculos().setVehiculos(listaVehiculos);
				rs2.close();
				ps2.close();
			}
			rs.close();
			ps.close();
		} catch (SQLException e) {
			throw new PersistenciaException(e.getMessage());
		}
		return j;
	}
	
	
}



