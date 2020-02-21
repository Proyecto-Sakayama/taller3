package logica;
import logica.Vehiculos;

public class Jugador {
	
	private int IdJugador;
	private String  nickname;
	private Vehiculos vehiculos;
	
	public Jugador()
	{
		
	}
	public Jugador(int IdJugador,String nick, Vehiculos ve)
	{
		this.IdJugador=IdJugador;
		this.setNickname(nick);
		this.setVehiculos(ve);
	}
	
	public int ObtenerIdJugador()
	{
		return IdJugador;
	}
	
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public Vehiculos getVehiculos() {
		return vehiculos;
	}
	public void setVehiculos(Vehiculos vehiculos) {
		this.vehiculos = vehiculos;
	}
	
}
