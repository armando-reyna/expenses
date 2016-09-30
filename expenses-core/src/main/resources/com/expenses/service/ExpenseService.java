package com.expenses.service;

import com.expenses.entity.CatTypeExpense;
import com.expenses.entity.Expense;
import com.expenses.entity.User;
import com.expenses.entity.request.ExpenseDTO;

import java.io.Serializable;
import java.util.List;

/**
 * Created by AirSoftware on 29/09/2016.
 */
public interface ExpenseService extends Serializable{

    Expense save(Expense expense);
    void deleteExpense(Expense expense);
    List<Expense> findAll();
    List<Expense> findByUser(User user);
}
