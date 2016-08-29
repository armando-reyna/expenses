<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
				 pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no, maximum-scale=1.0, minimun-scale=1.0">
	<title>Control de Gastos</title>
	<link rel="stylesheet" href="CSS/bootstrap.min.css">
	<link rel="stylesheet" href="CSS/estilos.css">
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script src="Scripts/bootstrap.min.js"></script>

	<script type="text/javascript">

		$(document).ready(function() {
			$('#fac').click(function(event){
				$.post('ControsVistas',{method : "show"}, function(results){
					if(results != null && results != ""){
						$('#registrar').css("display","none");
						$('#factura').css("display","block");
						$('#factura').html(results);
					}else{
						$('#factura').css("display","none");
						$('#factura').html("");
						alert("Some exception occurred! Please try again.");
					}
				});
			});

			$('.logout').click(function (event) {
				$.post('ControsVistas',{method : "logout"},function (results) {
					if(result != null && result == "Ok")
						window.location.href = "index.jsp"
					else
						alert("Some exception occurred! Please try again.");
				});
			});

			$('#ocultar').click(function (event) {
				$('#registrar').css("display","none");
				$('#factura').css("display","none");
			});

			$("#submit").click(function(){
				var name = $('#name').val();
				var monto = $('#monto').val();
				var type = $('#type').val();
				if(name != null && monto != null && type != null)
					$.post('ControsVistas',{method : "add", name : name, monto : monto, type : type }, function(results){
						if(results != null && results != ""){
							alert("Gasto Registrado con exito") ;
							$(".input").val("");
							$('#factura').html(results);
						}
						else{
							$('#factura').html("");
							alert("Some exception occurred! Please try again.");
						}
					});
				else
					alert("Ningun campo debe estar vacio. ");
			});

		});

		function hacerRegistro() {
			document.getElementById('factura').style.display = 'none';
			document.getElementById('registrar').style.display = 'block';
		}

	</script>
</head>
<body>
<header>
	<nav class="navbar navbar-inverse navbar-default navbar-static-top " role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="buuton" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navegacion" >
					<span class="sr-only">Menu</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a href="#" class="navbar-brand" id="ocultar">Control de Gastos</a>
			</div>
			<div class="collapse navbar-collapse" id="navegacion">
				<ul class="nav navbar-nav">
					<li><a href="#" id="fac">Ver Gastos</a></li>
					<li><a href="#" id="reg" onclick="hacerRegistro()">Registrar Gasto</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="index.jsp" id="logout">Cerrar Sesion</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="container">
		<h1>Bienvenido</h1>
		<%@ page import="Paquete.Usuario" %>
		<%
			Usuario user;
			user = (Usuario)session.getAttribute("user");
			out.println("<H1>"+user.getNombre()+"<H1>");
		%>
	</div>
</header>

<div id="registrar" class="container" style="display:none;">
	<form>
		<br>Nombre: <input class="form-control input-sm input" type="text" id="name"/>
		<br>Monto: <input class="form-control input-sm input" type="text" id="monto"/>
		<br>Tipo: <select class="form-control input-sm	" id="type">
		<%@ page import="java.sql.*" %>
		<jsp:useBean id="manejador" scope="session" class="Paquete.BeanConexion"></jsp:useBean>
		<%
			ResultSet rs=null;
			manejador.setConnection("com.mysql.jdbc.Driver","jdbc:mysql://localhost/Gastos");
			rs=manejador.executeQuery("SELECT * FROM cat_tipo_gasto;");
			while(rs.next()){
				out.println("<option value="+rs.getInt("id")+">"+rs.getString("nombre")+"</option>");
			}
		%>
	</select>
		<br><input id="submit" value="Guardar" class="botones" type="submit">
	</form>
</div>

<div id="factura" class="container" style="display:none">
	<table  class="table table-hover">

	</table>
</div>



</body>
</html>