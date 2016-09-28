package com.expenses.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "com.expenses.entity.Gasto")
@Table(name = "tabGasto")
public class Gasto implements Serializable {

	@Id
	@GeneratedValue
 	@Column(name = "id")
	private int id;

	@ManyToOne
 	@JoinColumn(name = "idUsuario")
	private User usuario;

	@ManyToOne
 	@JoinColumn(name = "idTipoGasto")
	private CatTipoGasto catTipoGasto;
	private String nombre;
	private Date fecha;
	private double monto;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}


	public User getUsuario() {
		return usuario;
	}
	public void setUsuario(User usuario) {
		this.usuario = usuario;
	}


	public CatTipoGasto getCatTipoGasto() {
		return catTipoGasto;
	}
	public void setCatTipoGasto(CatTipoGasto catTipoGasto) {
		this.catTipoGasto = catTipoGasto;
	}


	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}


	public double getMonto() {
		return monto;
	}
	public void setMonto(double monto) {
		this.monto = monto;
	}


}