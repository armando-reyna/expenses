package com.airsoftware.expenses.model;

public class Gasto {
	private int id;
	private TipoGasto tipoGasto;
	private int idUsuario;
	private String nombre;
	private double monto;
	
	public Gasto(){
		this.id=0;
		this.idUsuario=0;
		this.nombre=null;
		this.monto=0;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public TipoGasto getTipoGasto() {return tipoGasto;}
	public void setTipoGasto(String nombreTipoGasto) {tipoGasto = new TipoGasto(nombreTipoGasto);}
	public void setTipoGasto(int idTipoGasto){tipoGasto = new TipoGasto(idTipoGasto);}
	public int getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public double getMonto() {
		return monto;
	}
	public void setMonto(double monto) {
		this.monto = monto;
	}

}
