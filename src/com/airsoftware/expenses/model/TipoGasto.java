package com.airsoftware.expenses.model;

public class TipoGasto {
	private int id;
	private String nombre;

    public TipoGasto(){}
    public TipoGasto(int idTipogasto, String nombreTipoGasto ){this.id = idTipogasto; this.nombre = nombreTipoGasto; }
    public TipoGasto(int idTipogasto){this.id = idTipogasto;}
    public TipoGasto(String nombreTipoGasto){this.nombre = nombreTipoGasto;}
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

}
