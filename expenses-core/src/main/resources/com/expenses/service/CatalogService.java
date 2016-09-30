package com.expenses.service;

import com.expenses.entity.CatTypeExpense;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * Created by AirSoftware on 28/09/2016.
 */

@Service
public interface CatalogService extends Serializable {
    List<CatTypeExpense> findAll();

    CatTypeExpense findById(int id);
}
