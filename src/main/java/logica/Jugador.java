package logica;
import logica.Vehiculos;

public class Jugador {
	
	private int IdJugador;
	private String  nickname;
	private Vehiculos vehiculos;
	
	public Jugador()
	{
		
	}
	public Jugador(int Id,String nick, Vehiculos ve)
	{
		this.IdJugador=Id;
		this.nickname= nick;
		this.vehiculos= ve;
	}
	
	public int ObtenerIdJugador()
	{
		return IdJugador;
	}
	
	public String ObtenerNick()
	{
		return nickname;
	}
	
	public Vehiculos ObtenerVehiculos()
	{
		return vehiculos;
	}
	
}
