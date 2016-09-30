package com.expenses.entity.request;

import com.expenses.entity.CatTypeExpense;
import com.expenses.entity.User;

import java.util.Date;

/**
 * Created by AirSoftware on 29/09/2016.
 */
public class ExpenseDTO {

    private int typeExpense;
    private int user;
    private String name;
    private double cost;
    private Date date;

    public int getTypeExpense() {
        return typeExpense;
    }

    public void setTypeExpense(int typeExpense) {
        this.typeExpense = typeExpense;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
