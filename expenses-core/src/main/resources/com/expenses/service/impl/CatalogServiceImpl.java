package com.expenses.service.impl;

import com.expenses.entity.CatTypeExpense;
import com.expenses.repository.CatalogRepository;
import com.expenses.service.CatalogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by AirSoftware on 28/09/2016.
 */
@Component
public class CatalogServiceImpl implements CatalogService{

    protected final Logger log = LoggerFactory.getLogger(CatalogServiceImpl.class);

    @Autowired
    private CatalogRepository catalogRepository;

    public List<CatTypeExpense> findAll(){
        return catalogRepository.findAll();
    }


    public CatTypeExpense findById(int id){return catalogRepository.findOne(id);}

}
