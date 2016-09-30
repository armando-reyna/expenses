package com.expenses.controller;

import com.expenses.entity.CatTypeExpense;
import com.expenses.entity.Expense;
import com.expenses.entity.User;
import com.expenses.entity.request.ExpenseDTO;
import com.expenses.entity.response.JSONResponse;
import com.expenses.service.CatalogService;
import com.expenses.service.ExpenseService;
import com.expenses.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.PersistenceException;
import javax.servlet.ServletContext;

/**
 * Created by AirSoftware on 29/09/2016.
 */

@Controller
public class ExpenseController {

    private static final Logger LOG = LoggerFactory.getLogger(Expense.class);

    @Autowired
    ServletContext context;

    @Autowired
    ExpenseService expenseService;

    @RequestMapping(value = "/expense/save", method = RequestMethod.POST)
    public @ResponseBody
    JSONResponse save(@RequestBody Expense expense) {
        JSONResponse response = new JSONResponse();
        try{

            response.setData(expenseService.save(expense));
            response.setStatus(JSONResponse.STATUS_SUCCESS);
        }   catch (Exception ex) {
            LOG.error("Error", ex);
            response.setMessage("Ocurrió un error al registrar el gasto.");
            response.setData(false);
            response.setStatus(JSONResponse.STATUS_FAILURE);
        }
        return response;
    }

    @RequestMapping(value = "/expense/view", method = RequestMethod.POST)
    public @ResponseBody
    JSONResponse view(@RequestBody User user) {
        JSONResponse response = new JSONResponse();
        try{

            response.setData(expenseService.findByUser(user));
            response.setStatus(JSONResponse.STATUS_SUCCESS);
        }   catch (Exception ex) {
            LOG.error("Error", ex);
            response.setMessage("Ocurrió un error al visualizar los gasto.");
            response.setData(false);
            response.setStatus(JSONResponse.STATUS_FAILURE);
        }
        return response;
    }

    @RequestMapping(value = "/expense/delete", method = RequestMethod.POST)
    public @ResponseBody
    JSONResponse delete(@RequestBody Expense expense) {
        JSONResponse response = new JSONResponse();
        try{
            expenseService.deleteExpense(expense);
            response.setData(expenseService.findAll());
            response.setStatus(JSONResponse.STATUS_SUCCESS);
        }   catch (Exception ex) {
            LOG.error("Error", ex);
            response.setMessage("Ocurrió un error al eliminar el gasto.");
            response.setData(false);
            response.setStatus(JSONResponse.STATUS_FAILURE);
        }
        return response;
    }

}
