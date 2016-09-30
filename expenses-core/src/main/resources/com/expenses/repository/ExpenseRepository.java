package com.expenses.repository;

import com.expenses.entity.Expense;
import com.expenses.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by AirSoftware on 29/09/2016.
 */
@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByUser(User user);
}
