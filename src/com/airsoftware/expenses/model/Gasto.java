package com.airsoftware.expenses.model;

public class Gasto {
	private int id;
	private int idTipoGasto;
	private int idUsuario;
	private String nombre;
	private double monto;
	
	public Gasto(){
		this.id=0;
		this.idUsuario=0;
		this.idTipoGasto=0;
		this.nombre=null;
		this.monto=0;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getIdTipoGasto() {
		return idTipoGasto;
	}
	public void setIdTipoGasto(int idTipoGasto) {
		this.idTipoGasto = idTipoGasto;
	}
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
