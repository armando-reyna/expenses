<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta name="viewport" content="width-device-widht, initial-escale=1.0">
	<title>Expenses</title>
	<link rel="stylesheet" href="../CSS/bootstrap.min.css" type="text/css">
	<script src="../Scripts/jquery.min.js" type="text/javascript"></script>
	<script src="../Scripts/bootstrap.min.js" type="text/javascript"></script>

	<style type="text/css">
		html{
			margin: 0px;
			padding: 0px;
		}
		body {
			color: #fff;
			text-align: center;
			text-shadow: 2px 1px 3px rgba(0, 0, 0, .5);
			height: 100%;
			background: url("../font.png") no-repeat center center fixed;
			background-size: cover;
			background-color: #333;
		}
		.boxlogin{
			font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
			font-size: 20px;
			margin: 50px auto;
			width: 390px;
		}
		input{
			margin: 20px;
		}
	</style>
</head>
<body>
	<div class="page-header">
		<h1>Control de Gastos <small></small></h1>
	</div>
	<div class="form-group boxlogin">
		<form action="Login" method="post">
			<label>Usuario:</label>
			<input  class="form-control" type="text" name="user" />
			<label>Password:</label>
			<input class="form-control" type="password" name="pwd"/>
			<input type="submit" class="btn btn-success" value="Ingresar"/>
		</form>
	</div>
</body>
</html>