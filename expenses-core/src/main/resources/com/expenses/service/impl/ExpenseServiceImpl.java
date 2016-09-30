package com.expenses.service.impl;

import com.expenses.entity.CatTypeExpense;
import com.expenses.entity.Expense;
import com.expenses.entity.User;
import com.expenses.repository.ExpenseRepository;
import com.expenses.service.ExpenseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by AirSoftware on 29/09/2016.
 */
@Component
public class ExpenseServiceImpl implements ExpenseService {
    protected final Logger log = LoggerFactory.getLogger(ExpenseServiceImpl.class);

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense save(Expense expense){return expenseRepository.saveAndFlush(expense);}

    public List<Expense> findAll(){return expenseRepository.findAll();}

    public List<Expense> findByUser(User user){return expenseRepository.findByUser(user);}

    public void deleteExpense(Expense expense){expenseRepository.delete(expense);}

}
