package com.expenses.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "com.expenses.entity.Expense")
@Table(name = "tabExpense")
public class Expense implements Serializable {

	@Id
	@GeneratedValue
 	@Column(name = "id")
	private int id;

	@ManyToOne
 	@JoinColumn(name = "idUser")
	private User user;

	@ManyToOne
 	@JoinColumn(name = "idTypeExpense")
	private CatTypeExpense catTypeExpense;
	private String name;
	private Date date;
	private double cost;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}


	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}


	public CatTypeExpense getCatTypeExpense() {
		return catTypeExpense;
	}
	public void setCatTypeExpense(CatTypeExpense catTypeExpense) {
		this.catTypeExpense = catTypeExpense;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}


	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}


	public double getCost() {
		return cost;
	}
	public void setCost(double cost) {
		this.cost = cost;
	}


}