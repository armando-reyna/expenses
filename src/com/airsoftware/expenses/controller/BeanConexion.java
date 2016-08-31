package com.airsoftware.expenses.controller;

import com.airsoftware.expenses.model.Gasto;
import com.airsoftware.expenses.model.Usuario;

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
	public static String URL = "jdbc:mysql://localhost/gastos";
	
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

	public void openConnection() throws IOException, SQLException {
		setConnection(DRIVER, URL);
	}
			 
	private void closeConnection()
		throws java.sql.SQLException{
			if(con!=null)
			  con.close();
			
			url=driver=null;
			if(stmtupdate!=null)stmtupdate.close();
			if(stmtquery!=null)stmtquery.close();
			stmtupdate=stmtquery= null;
			rs=null;		 
	}
			
	private int executeUpdate(String sql) throws java.sql.SQLException{
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

	public ResultSet login(Usuario usuario) throws SQLException {
        System.out.println(usuario.getUsuario());
		return executeQuery("SELECT * FROM tab_usuario WHERE usuario like '"+usuario.getUsuario()+"'and password like'"+usuario.getPassword()+"';");
	}

	public ResultSet tabla(Usuario user) throws SQLException {

	    rs = executeQuery("SELECT g.id, g.nombre, t.nombre as tipo_gasto, g.monto FROM tab_gasto g, cat_tipo_gasto t where g.id_tipo_gasto=t.id and  id_usuario="+user.getId()+";");
		return rs;
	}

	public int delete (int id) throws SQLException {
        return executeUpdate("Delete from tab_gasto where id ="+id+";");
    }

    public int add(Gasto gasto) throws SQLException {
        return executeUpdate("insert into tab_gasto(id_usuario,id_tipo_gasto,nombre,monto) values('"+gasto.getIdUsuario()+"','"+gasto.getIdTipoGasto()+"','"+gasto.getNombre()+"', '"+gasto.getMonto()+"'); ");
    }

    public ResultSet tipoGasto() throws SQLException {
        return executeQuery("SELECT * FROM cat_tipo_gasto;");
    }

	public String getUrl(){
		return url;
	}
			 
	public String getDriver(){
		return driver;
	}

}
