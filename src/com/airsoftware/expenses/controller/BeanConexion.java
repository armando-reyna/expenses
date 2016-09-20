package com.airsoftware.expenses.controller;

import com.airsoftware.expenses.model.Gasto;
import com.airsoftware.expenses.model.TipoGasto;
import com.airsoftware.expenses.model.Usuario;

import java.io.*;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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

	public Usuario login(Usuario usuario) throws SQLException {
		rs = executeQuery("SELECT * FROM tab_usuario WHERE usuario like '"+usuario.getUsuario()+"'and password like'"+usuario.getPassword()+"';");
        if(rs.next()) {
            Usuario us = new Usuario(rs.getInt("id"), rs.getString("nombre"), rs.getString("usuario"));
            return us;
        }else
            return null;
	}

	public ArrayList<Gasto> tabla(Usuario user) throws SQLException, ParseException {

	    rs = executeQuery("SELECT g.id, g.nombre, t.nombre as tipo_gasto, g.fecha , g.monto FROM tab_gasto g, cat_tipo_gasto t where g.id_tipo_gasto=t.id and  id_usuario="+user.getId()+";");
        SimpleDateFormat formato = new SimpleDateFormat("yyyy/MM/dd");
        ArrayList<Gasto> aux = new ArrayList();
        while(rs.next()){
            Gasto g = new Gasto();
            g.setId(rs.getInt("id"));
            g.setNombre(rs.getString("nombre"));
            g.setTipoGasto(rs.getString("tipo_gasto"));
            g.setFecha(rs.getDate("fecha"));
            g.setMonto(rs.getDouble("monto"));
            aux.add(g);
        }
        return aux;
	}

	public int delete (int id) throws SQLException {
        return executeUpdate("Delete from tab_gasto where id ="+id+";");
    }

    public int add(Gasto gasto) throws SQLException {
        SimpleDateFormat formato = new SimpleDateFormat("yy-MM-dd");
		System.out.println(formato.format(gasto.getFecha()));
		//(id_usuario,id_tipo_gasto,nombre,fecha,monto)
		return executeUpdate("insert into tab_gasto values(null,"+gasto.getIdUsuario()+","+gasto.getTipoGasto().getId()+",'"+gasto.getNombre()+"','"+formato.format(gasto.getFecha())+"', "+gasto.getMonto()+"); ");
    }

    public ArrayList<TipoGasto> tipoGasto() throws SQLException {
        ArrayList<TipoGasto> tg = new ArrayList();
        rs = executeQuery("SELECT * FROM cat_tipo_gasto;");
        while(rs.next()){
            TipoGasto tp = new TipoGasto(rs.getInt("id"),rs.getString("nombre"));
            tg.add(tp);
        }
        return tg;
    }

	public String getUrl(){
		return url;
	}
			 
	public String getDriver(){
		return driver;
	}

}
