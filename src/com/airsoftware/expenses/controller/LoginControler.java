package com.airsoftware.expenses.controller;

import com.airsoftware.expenses.controller.BeanConexion;
import com.airsoftware.expenses.model.Usuario;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;


public class LoginControler extends HttpServlet {

    private BeanConexion manejador;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String usuario= request.getParameter("user");
        String pwd= request.getParameter("pwd");
        HttpSession sesion=request.getSession();
        manejador=new BeanConexion();
        Usuario user = new Usuario(usuario,pwd);

        try {
            manejador.openConnection();
            Usuario us = manejador.login(user);
            if(us != null){
                sesion.setAttribute("user",us);
                response.sendRedirect("main.jsp");
            }
            else{
                response.sendRedirect("index.jsp");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }


    }

}
