<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta name="viewport" content="width-device-widht, initial-escale=1.0">
	<title>Expenses</title>
	<link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css">
	<link rel="stylesheet" href="../css/estiloIndex.css">

</head>
<body>
	<div class="page-header">
		<h1>Control de Gastos <small></small></h1>
	</div>
	<div class="form-group boxlogin">
		<form action="LoginControler" method="post">
			<label>Usuario:</label>
			<input  class="form-control" type="text" name="user" />
			<label>Password:</label>
			<input class="form-control" type="password" name="pwd"/>
			<input type="submit" class="btn btn-success" value="Ingresar"/>
		</form>
	</div>
	<script src="../scripts/jquery.min.js" ></script>
	<script src="../scripts/bootstrap.min.js" ></script>
</body>
</html>