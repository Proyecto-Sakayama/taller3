import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import logica.*;

public class Test {

	public Test() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) {
		
		//probamos Jugador
		
		Jugador jug = new Jugador();
		jug.setIdJugador(1);
		jug.setNickname("jugador 1");
		
		System.out.println(jug.getIdJugador());
		System.out.println(jug.getNickname());
		
		//se prueba patrulla oceanica
		
		int id=1;
		int coordX=100;
		int coordY= 100;
		int orientacion= 45;
		int combustible= 100;
		String tipoVehiculo= "Oceanica";
		int velocidad= 100;
		int alcanceRadar= 100;
		Bote b= null;
		Helicoptero h=null;
		Canion c= null;
		Ametralladora a = null;
		
		Oceanica patrullaOceanica= new Oceanica(id, coordX, coordY, orientacion, combustible, tipoVehiculo, velocidad, alcanceRadar, b, h, c,a);
		
		System.out.println(patrullaOceanica.getId());
		System.out.println(patrullaOceanica.getCoordX());
		System.out.println(patrullaOceanica.getCoordY());
		System.out.println(patrullaOceanica.getOrientacion());
		System.out.println(patrullaOceanica.getCantCombustible());
		System.out.println(patrullaOceanica.getTipoVehiculo());
		System.out.println(patrullaOceanica.getVelocidad());
		System.out.println(patrullaOceanica.getAlcanceRadar());
		System.out.println(patrullaOceanica.getBote());
		System.out.println(patrullaOceanica.getHelicoptero());
		System.out.println(patrullaOceanica.getCanion());
		System.out.println(patrullaOceanica.getAmetralladora());
		
		Vehiculos vehics = new Vehiculos();
		vehics.insert(patrullaOceanica);
		
		jug.setVehiculos(vehics);
		System.out.println(jug.getVehiculos().find(1).getTipoVehiculo());
		
		//se prueba clase Partida
		
		Partida part = new Partida();
		part.setIdPartida(1);
//		part.setTiempoPartida(5);
//		part.setTormenta(false);
//		
//		System.out.println(part.getIdPartida());
//		System.out.println(part.getTiempoPartida());
//		System.out.println(part.getTormenta());
//		
//		
		//Creo arraylist de jugadores
		
		Jugadores jugs = new Jugadores();
		
		jugs.insert(jug);
		
		//inserto arraylist jugs en la partida
		part.setJugadores(jugs);
		
		// consulto cuantos jugadores hay en la partida
		int cantjug= part.getJugadores().CantJugadores();
		System.out.println(cantjug);
		
	
		
		
		
		
	}

}
