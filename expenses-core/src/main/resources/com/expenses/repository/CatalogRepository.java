package com.expenses.repository;

import com.expenses.entity.CatTypeExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogRepository extends JpaRepository<CatTypeExpense, Integer>{

}
