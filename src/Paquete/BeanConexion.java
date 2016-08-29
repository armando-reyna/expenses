package Paquete;

import java.io.*;
import java.sql.*;

public class BeanConexion {

	private String url;
	private String driver;
	private transient Connection con;
	private Statement  stmtquery;
	private Statement  stmtupdate;
	private ResultSet   rs;

	public static String DRIVER = "com.mysql.jdbc.Driver";
	
	public BeanConexion(){
	}
	
	private void setConnection(String driver,String url)
		throws IOException,java.sql.SQLException{
	     try{
            Class.forName(driver);
            con = DriverManager.getConnection(url, "root", "root");
            this.url=   url;
            this.driver=driver;
         }catch(ClassNotFoundException e){
            throw new IOException(e.getMessage());
         }catch(java.sql.SQLException e){
            throw e;
        } 
	 }

	public void openConnection(){
		setConnection(DRIVER, "");

	}
			 
	public void closeConnection()
		throws java.sql.SQLException{
			if(con!=null)
			  con.close();
			
			url=driver=null;
			if(stmtupdate!=null)stmtupdate.close();
			if(stmtquery!=null)stmtquery.close();
			stmtupdate=stmtquery= null;
			rs=null;		 
	}
			
	public int executeUpdate(String sql)
	 throws java.sql.SQLException{
	    if(con==null)
	    	throw new SQLException("No ha configurado correctamente la conexion Source:Bean handledb");
	    
	    stmtupdate = null;
        int affecrows=0;
        try{
        	stmtupdate=con.createStatement();
        	affecrows=stmtupdate.executeUpdate(sql);
		}
        finally{
        	if(stmtupdate != null) 
        		stmtupdate.close();
        }
	    return affecrows;
	 }

	private ResultSet executeQuery(String sql)
	 throws java.sql.SQLException{
        if(con==null)
        	throw new SQLException("No ha configurado correctamente la conexion Source:Bean handledb");
        
        stmtquery = null;
        rs=null;
    	try{
    		stmtquery=con.createStatement();
    		rs=stmtquery.executeQuery(sql);
    	}
    	finally{}
    	return rs;
	}

	public Usuario login(Usuario usuario){

		rs = manejador.executeQuery("SELECT * FROM tab_usuario WHERE usuario like '"+usuario.getNombre()+"'and password like'"+usuario.getPassword()+"';");
		if(rs.next()){
			Usuario us=new Usuario(rs.getInt("id"),rs.getString("nombre"));
			manejador.closeConnection();
			return us;
		}
		return null;
	}

	public String getUrl(){
		return url;
	}
			 
	public String getDriver(){
		return driver;
	}

}
