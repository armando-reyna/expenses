package com.expenses.controller;

/**
 * Created by AirSoftware on 28/09/2016.
 */

import com.expenses.entity.CatTypeExpense;
import com.expenses.entity.response.JSONResponse;
import com.expenses.service.CatalogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class CatalogController {

    private static final Logger LOG = LoggerFactory.getLogger(CatTypeExpense.class);

    @Autowired
    ServletContext context;

    @Autowired
    private CatalogService catalogService;

    @RequestMapping(value = "/catalog", method = RequestMethod.POST)
    public
    @ResponseBody
    JSONResponse get() {
        JSONResponse response = new JSONResponse();
        try {
            List<CatTypeExpense> banners = catalogService.findAll();
            response.setData(banners);
            response.setStatus(JSONResponse.STATUS_SUCCESS);
        } catch (Exception ex) {
            LOG.error("Error", ex);
            response.setStatus(JSONResponse.STATUS_FAILURE);
        }
        return response;
    }
}
