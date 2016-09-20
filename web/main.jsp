<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
				 pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no, maximum-scale=1.0, minimun-scale=1.0">
	<title>Control de Gastos</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/estilos.css">

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
					<li><a href="#" id="logout">Cerrar Sesion</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="container">
		<h1>Bienvenido</h1>
		<%@ page import="com.airsoftware.expenses.model.Usuario" %>
		<%
			Usuario user;
			user = (Usuario)session.getAttribute("user");
			out.println("<H1>"+user.getNombre()+"<H1>");
		%>
	</div>
</header>

<div id="registrar" class="container" style="display:none;">
	<form id="form">
		<br>Nombre: <input class="form-control input-sm input" type="text" id="name"/>
		<br>Monto: <input class="form-control input-sm input" type="text" id="monto"/>
		<br>Tipo: <select class="form-control input-sm	" id="type">
		<%@ page import="java.util.ArrayList" %>
		<%@ page import="com.airsoftware.expenses.model.TipoGasto" %>
		<jsp:useBean id="manejador" scope="session" class="com.airsoftware.expenses.controller.BeanConexion"></jsp:useBean>
		<%
			int i = 0;
			manejador.openConnection();
			ArrayList<TipoGasto> rs = manejador.tipoGasto();
			while(i<rs.size()){
				out.println("<option value="+rs.get(i).getId()+">"+rs.get(i).getNombre()+"</option>");
				i++;
			}
		%>
		</select>
		<br>Fecha:
            <input type='date' class="form-control" id="date"/>


		<br><input id="submit" value="Guardar" class="btn btn-success" type="submit"/>
	</form>
</div>

<div id="factura" class="container" style="display:none">

</div>

<script src="../scripts/jquery-3.1.0.min.js"></script>
<script src="../scripts/bootstrap.min.js"></script>
<script src="../scripts/bootbox.min.js"></script>

<script type="text/javascript">

	$(document).ready(function() {

		$('#registrar').css("display","none");
		$('#factura').css("display","none");

		var desplegarTabla =  function(){
			$.post('ControlVistas',{method : "show"}, function(results){
				if(results != null && results != ""){
					$('#factura').html(results);
				}else{
					$('#factura').css("display","none");
					$('#factura').html("");
					alert("Some exception occurred! Please try again.");
				}
			});
		}



		$('#fac').click(function () {
			$('#registrar').css("display", "none");
			$('#factura').css("display", "block");
			desplegarTabla();
		});

		$('#logout').click(function (event) {
			$.post('ControlVistas',{method : "logout"},function (results) {
					window.location.href = "index.jsp"
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
			var date = $('#date').val();
			if(name != null && monto != null && type != null )
				$.post('ControlVistas',{method : "add", name : name, monto : monto, type : type, date : date }, function(results){
					if(results != null && results != ""){
						alert("Gasto Registrado con exito") ;
						$("#form")[0].reset();
						$('#registrar').css("display", "none");
						$('#factura').css("display", "block");
						desplegarTabla();
					}
					else{
						$('#factura').html("");
						alert("Some exception occurred! Please try again.");
					}
				});
			else
				alert("Ningun campo debe estar vacio. ");
		});


		/*
		$(".delete").click(function(){
			var id = $(this).attr("gastoId");
			bootbox.confirm("¿Esta seguro?", function () {
				if (event) {
					$.post('ControlVistas', {method: "delete", idGasto: id}, function (results) {
						if (results != null && results != "") {
							Example.show("Gasto Eliminado");
							$('#factura').html(results);
						}
						else {
							$('#factura').html("");
							Example.show("Error en la operación");
						}
					});
				} else
					Example.show("Peticion fallida");
			});
		});*/
	});

	function hacerRegistro() {
		document.getElementById('factura').style.display = 'none';
		document.getElementById('registrar').style.display = 'block';
	}

</script>

</body>
</html>