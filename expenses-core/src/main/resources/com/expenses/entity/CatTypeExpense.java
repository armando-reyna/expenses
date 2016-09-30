package com.expenses.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "com.expenses.entity.CatTypeExpense")
@Table(name = "catTypeExpense")
public class CatTypeExpense implements Serializable {

	@Id
	@GeneratedValue
 	@Column(name = "id")
	private int id;
	private String name;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}


}