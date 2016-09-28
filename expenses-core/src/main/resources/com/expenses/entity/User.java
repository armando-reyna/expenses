package com.expenses.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;


@Entity(name = "com.expenses.entity.User")
@Table(name = "tabUser")
public class User implements Serializable {

	@Id
	@GeneratedValue
 	@Column(name = "id")
	private int id;
	private String user;
	private String name;

	@JsonIgnore
	private String password;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


}