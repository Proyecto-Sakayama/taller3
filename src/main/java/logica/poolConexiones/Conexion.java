package logica.poolConexiones;

import java.sql.Connection;

public class Conexion implements IConexion{
	Connection con;
	
	public Conexion(Connection connection) {
		this.con = connection;
	}
	
	public Connection getConnection() {
		return con;
	}
}
