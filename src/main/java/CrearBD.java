import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import com.google.gson.*;

public class CrearBD {
		
	public static void main(String[] args) {
		
		Connection con = null;
		
		try {
			
			Properties p = new Properties();
			InputStream conProp = new FileInputStream("src/main/java/config/config.properties");
			p.load(conProp);
			
			String driver = p.getProperty("driver");
			String url = p.getProperty("url");
			String pass= p.getProperty("pass");
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
			
			String crearJugadores = "CREATE TABLE if not exists jugadores(IdJugador int(8), nickName VARCHAR(20),"
					+ "primary key (IdJugador));";
			st.executeUpdate(crearJugadores);
			
			String crearVehiculos= "CREATE TABLE IF NOT EXISTS vehiculos(IdVehiculo int(8), coordX int (8),"
					+"coordY int(8), orientacion int(5), cantCombustible int(5), tipoVehiculo VARCHAR(20),"
					+ "velocidad int(5), primary key(IdVehiculo));";
			st.executeUpdate(crearVehiculos);
			
			String crearPatrullas ="CREATE TABLE IF NOT EXISTS patrullas(IdVehiculo int(8), alcanceRadar int(5),"
					+ "foreign key(IdVehiculo) references vehiculos(IdVehiculo));";
			st.executeUpdate(crearPatrullas);
			
			String crearPesqueros ="CREATE TABLE IF NOT EXISTS pesqueros(IdVehiculo int(8), velocidadPesca int(5), resistencia int(5),"
					+ "cantidadPesca int(6), danio int(6), atrapado bool,"
					+ "foreign key (IdVehiculo) references vehiculos(IdVehiculo));";
			st.executeUpdate(crearPesqueros);
			
			String crearArtilleria = "CREATE TABLE IF NOT EXISTS artilleria(IdArma int(8), tipoArma VARCHAR(20), rango int(8), danio int(8), cadencia int(8),"
					+ "primary key (IdArma));";
			st.executeUpdate(crearArtilleria);
			
			String Oceanica_Artilleria="CREATE TABLE IF NOT EXISTS oceanica_artilleria(IdVehiculo int(8), IdArma int(8),"
					+ "primary key (IdVehiculo,IdArma),"
					+ "foreign key (IdVehiculo) references vehiculos(IdVehiculo),"
					+ "foreign key (IdArma) references artilleria(IdArma));";
			st.executeUpdate(Oceanica_Artilleria);
			
			/*String crearOceanicas = "CREATE TABLE IF NOT EXISTS oceanicas(IdVehiculo int(8), Bote json NOT NULL, Helicoptero json NOT NULL, Canion json NOT NULL, Ametralladora json NOT NULL"
					+ "foreign key (IdVehiculo) references vehiculos(IdVehiculo));";
			st.executeUpdate(crearOceanicas);*/
			
			/*String crearLigeras = "CREATE TABLE IF NOT EXISTS ligeras(IdVehiculo int(8), Ametralladora json,"
					+ "foreign key (IdVehiculo) references vehiculos(IdVehiculo));";
			st.executeUpdate(crearLigeras);/*
			
			/*String crearFabricas= "CREATE TABLE IF NOT EXISTS fabricas(IdVehiculo int(8)"
					+ "foreign key (IdVehiculo) references vehiculos(IdVehiculo));";
			st.executeUpdate(crearFabricas);
			
			String crearComun= "CREATE TABLE IF NOT EXISTS comunes(IdVehiculo int(8)"
					+ "foreign key (IdVehiculo) references vehiculos(IdVehiculo));";
			st.executeUpdate(crearComun);*/
			
			String crearPartidas= "CREATE TABLE IF NOT EXISTS partidas(IdPartida int(8), tormenta bool, tiempoPartida float (8),"
					+ "primary key(IdPartida));";
			st.executeUpdate(crearPartidas);
			
			String crearJugadoresenPartidas="CREATE TABLE IF NOT EXISTS jugadores_partidas(IdJugador int(8), IdPartida int (8),"
					+ "primary key (IdJugador,IdPartida),"
					+ "foreign key (IdJugador) references jugadores(IdJugador),"
					+ "foreign key (IdPartida) references partidas(IdPartida));";
			st.execute(crearJugadoresenPartidas);
			
			String crearJugadoresyVehiculos="CREATE TABLE IF NOT EXISTS jugadores_vehiculos(IdJugador int(8), IdVehiculo int(8),"
					+ "primary key(IdJugador,IdVehiculo),"
					+ "foreign key(IdJugador) references jugadores(IdJugador),"
					+ "foreign key(IdVehiculo) references vehiculos(IdVehiculo));";
			st.execute(crearJugadoresyVehiculos);
			
			String insertarjugador= "insert into milla200.jugadores (IdJugador, nickName) VALUES (?,?)";
			PreparedStatement ps= con.prepareStatement(insertarjugador);
			ps.setInt(1, 1);
			ps.setString(2, "jugador1");
			ps.executeUpdate();
			
			
			/*
			String insertarpartida= "insert into milla200.partidas (IdPartida,tormenta, tiempoPartida) VALUES (?,?,?)";
			ps= con.prepareStatement(insertarpartida);
			ps.setInt(1, 1);
			ps.setFloat(3, 2);
			ps.setBoolean(2, false);
			ps.executeUpdate();
			*/
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
