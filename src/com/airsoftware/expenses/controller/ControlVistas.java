package com.airsoftware.expenses.controller;

import com.airsoftware.expenses.controller.BeanConexion;
import com.airsoftware.expenses.model.Gasto;
import com.airsoftware.expenses.model.Usuario;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class ControlVistas extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession sesion=request.getSession();
        PrintWriter out = response.getWriter();

        String method = request.getParameter("method");
        Usuario user = (Usuario)sesion.getAttribute("user");
        BeanConexion manejador = new BeanConexion();
        //ResultSet rs=null;
        try {
            manejador.openConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        if(method.equals("show")){
            try {
                ResultSet rs = manejador.tabla(user);
                out.println("<script src=\"../scripts/jquery-3.1.0.min.js\"></script>");
                out.println("<script src=\"../scripts/bootbox.min.js\"></script>");
                out.println("<script src=\"../scripts/bootstrap.min.js\"></script>");
                out.println("<script type=\"text/javascript\">");

                out.println("$(\".delete\").click(function(){  " +
                        "   var id = $(this).attr(\"gastoId\");  " +
                        "   bootbox.confirm(\"¿Esta seguro?\", function () {  " +
                        "    if (event) {  " +
                        "     $.post('ControlVistas', {method: \"delete\", idGasto: id}, function (results) {  " +
                        "      if (results != null && results != \"\") {  " +
                        "       Example.show(\"Gasto Eliminado\");  " +
                        "       $('#factura').html(results);  " +
                        "      }  " +
                        "      else {  " +
                        "       $('#factura').html(\"\");  " +
                        "       Example.show(\"Error en la operación\");  " +
                        "      }  " +
                        "     });  " +
                        "    } else  " +
                        "     Example.show(\"Peticion fallida\");  " +
                        "   });  " +
                        "  });");
                out.println("</script>");
                out.println("<table class='table table-hover'>");
                out.println("<tr>");
                out.println("<th>Nombre</th> <th>Tipo</th> <th>Monto</th> <th> </th>");
                out.println("</tr>");
                while(rs.next()){
                    System.out.println(rs.getString("nombre"));
                    out.println("<tr> <td>"+rs.getString("nombre")+"</td> <td>"+rs.getString("tipo_gasto")+"</td> <td>"+rs.getDouble("monto")+"</td> <td> <button class='delete btn btn-danger' gastoId='"+rs.getInt("id")+"' >Eliminar</button> </td> </tr>");
                }
                out.println(" </table>");
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        }
        if(method.equals("delete")){
            int idGasto = Integer.parseInt(request.getParameter("idGasto"));
            int op = 0;
            try {

                op = manejador.delete(idGasto);
            } catch (SQLException e) {
                e.printStackTrace();
            }
            if (op != 0)
                out.println(" ");

        }
        if(method.equals("add")){
            Gasto gasto = new Gasto();

            gasto.setIdUsuario(user.getId());
            gasto.setIdTipoGasto(Integer.parseInt(request.getParameter("type")));
            gasto.setNombre(request.getParameter("name"));
            gasto.setMonto(Double.parseDouble(request.getParameter("monto")));

            int op=0;
            try {
                op = manejador.add(gasto);
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            if(op!=0){
                out.println(" ");
            }
        }

        if(method.equals("logout")) {
            sesion.invalidate();
            out.println("Ok");
        }

    }

}
