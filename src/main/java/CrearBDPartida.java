import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class CrearBDPartida {
		
	public static void main(String[] args) {
		
		Connection con = null;
		
		try {
			
			Properties p = new Properties();
			InputStream conProp = new FileInputStream("src/main/java/config/config.properties");
			p.load(conProp);
			
			String driver = p.getProperty("driver");
			String url = p.getProperty("url");
			String pass= p.getProperty("pwd");
			String user= p.getProperty("usr");
			
			Class.forName(driver);
			con= DriverManager.getConnection(url,user,pass);
			
			String dropDB = "DROP DATABASE IF EXISTS Milla200";
			Statement st = con.createStatement();
			st.executeUpdate(dropDB);
			
			String crearDB= "CREATE DATABASE Milla200";
			st.executeUpdate(crearDB);
			
			String usarMilla200 = "USE Milla200";
			st.executeUpdate(usarMilla200);
			
			String crearJugadores = "CREATE TABLE if not exists partidas"
					+ "(idPartida int(8) NOT NULL AUTO_INCREMENT, "
					+ "datosPartida TEXT,"
					+ "primary key (idPartida));";
			st.executeUpdate(crearJugadores);
			
			
			System.out.println("Base creada correctamente");
			
			
			
		    	
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

	}

}
