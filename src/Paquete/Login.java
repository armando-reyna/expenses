package Paquete;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;


public class Login extends HttpServlet {

    private BeanConexion manejador;
    public Login() {
        // TODO Auto-generated constructor stub
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String usuario= request.getParameter("user");
        String pwd= request.getParameter("pwd");
        HttpSession sesion=request.getSession();
        ResultSet rs=null;
        manejador=new BeanConexion();
        try {
            manejador.setConnection("com.mysql.jdbc.Driver","jdbc:mysql://localhost/gastos");
            rs = manejador.executeQuery("SELECT * FROM tab_usuario WHERE usuario like '"+usuario+"'and password like'"+pwd+"';");
            if(rs.next()){
                Usuario us=new Usuario(rs.getInt("id"),rs.getString("nombre"),rs.getString("password"));
                sesion.setAttribute("user",us);
                sesion.setAttribute("nombre", us.getNombre());
                manejador.closeConnection();
                response.sendRedirect("main.jsp");
            }
            else{
                manejador.closeConnection();
                response.sendRedirect("index.jsp");
            }

        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }

}
