package Paquete;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class ControsVistas extends HttpServlet {

    public ControsVistas() {
        super();
        // TODO Auto-generated constructor stub
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession sesion=request.getSession();
        PrintWriter out = response.getWriter();

        String method = request.getParameter("method");
        Usuario user = (Usuario)sesion.getAttribute("user");

        BeanConexion manejador = new BeanConexion();
        ResultSet rs=null;
        try {
            manejador.setConnection("com.mysql.jdbc.Driver","jdbc:mysql://localhost/Gastos");
        } catch (SQLException e) {
            e.printStackTrace();
        }

        if(method.equals("show")){
            try {
                String[][] array = null;
                rs=manejador.executeQuery("SELECT g.id, g.nombre, t.nombre as tipo_gasto, g.monto FROM tab_gasto g, cat_tipo_gasto t where g.id_tipo_gasto=t.id and  id_usuario="+user.getId()+";");
                out.println("<script type=\"text/javascript\">");
                out.println("$(\".delete\").click(function(){ var id = $(this).attr(\"gastoId\"); $.post('ControsVistas',{method : \"delete\", idGasto : id }, function(results){ if(results != null && results != \"\"){ alert(\"Gasto Borrado con exito\"); $('#factura').html(results); }else{ $('#factura').html(\"\"); alert(\"Some exception occurred! Please try again.\");} }); });	");
                out.println("</script>");
                out.println("<table class='table table-hover'>");
                out.println("<tr>");
                out.println("<th>Nombre</th> <th>Tipo</th> <th>Monto</th> <th> </th>");
                out.println("</tr>");
                while(rs.next()){
                    out.println("<tr> <td>"+rs.getString("nombre")+"</td> <td>"+rs.getString("tipo_gasto")+"</td> <td>"+rs.getDouble("monto")+"</td> <td> <button class='delete' gastoId='"+rs.getInt("id")+"' >Eliminar</button> </td> </tr>");
                }
                out.println(" </table>");
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        }
        if(method.equals("delete")){
            int idGasto = Integer.parseInt(request.getParameter("idGasto"));
            int op;
            try {
                op = manejador.executeUpdate("Delete from tab_gasto where id ="+idGasto+";");
                if (op != 0)
                    out.println(" ");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(method.equals("add")){
            Gasto gasto = new Gasto();

            gasto.setIdUsuario(user.getId());
            gasto.setIdTipoGasto(Integer.parseInt(request.getParameter("type")));
            gasto.setNombre(request.getParameter("name"));
            gasto.setMonto(Double.parseDouble(request.getParameter("monto")));

            int op=0;
            try {
                op = manejador.executeUpdate("insert into tab_gasto(id_usuario,id_tipo_gasto,nombre,monto) values('"+gasto.getIdUsuario()+"','"+gasto.getIdTipoGasto()+"','"+gasto.getNombre()+"', '"+gasto.getMonto()+"'); ");
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            if(op!=0){
                out.println(" ");
                //response.sendRedirect("index.jsp");
            }
        }

        if(method.equals("logout")) {
            sesion.invalidate();
            out.println("Ok");
        }

    }

}
