package com.expenses.controller;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import com.expenses.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.expenses.entity.request.LoginDTO;
import com.expenses.entity.response.JSONResponse;
import com.expenses.service.UserService;

@Controller
public class InitController {

  protected final Logger LOG = LoggerFactory.getLogger(InitController.class);

  @Autowired
  private UserService userService;

  @Autowired
  ServletContext context;

  @RequestMapping({"/", ""})
  public String home(HttpServletRequest request, ModelMap model) {
    return "index";
  }

  @RequestMapping(value = "/login", method = RequestMethod.POST)
  public @ResponseBody JSONResponse login(@RequestBody LoginDTO user) {
    JSONResponse response = new JSONResponse();
    try {
      User userResponse = userService.findByUserAndPassword(user);
      if (userResponse!= null) {
        response.setData(userResponse);
      }
      response.setStatus(JSONResponse.STATUS_SUCCESS);
    } catch (Exception ex) {
      LOG.error("Error", ex);
      response.setStatus(JSONResponse.STATUS_FAILURE);
    }
    return response;
  }

}
