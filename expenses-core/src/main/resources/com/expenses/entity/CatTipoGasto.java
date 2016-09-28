package com.expenses.entity;

import javax.persistence.*;
import java.io.Serializable;


@Entity(name = "com.expenses.entity.CatTipoGasto")
@Table(name = "catTipoGasto")
public class CatTipoGasto implements Serializable {

	@Id
	@GeneratedValue
 	@Column(name = "id")
	private int id;
	private String nombre;

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