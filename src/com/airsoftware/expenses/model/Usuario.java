package com.airsoftware.expenses.model;

public class Usuario {
	private int id;
	private String nombre;
	private String password;
	private String usuario;
	
	public Usuario(){}
	public Usuario(String usuario, String password){this.usuario = usuario; this.password = password; }
	public Usuario(int id, String nombre, String usuario){this.id = id; this.nombre = nombre; this.usuario = usuario;}
	public String getUsuario() {return usuario;	}
	public void setUsuario(String usuario) {this.usuario = usuario;	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
