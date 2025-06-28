<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "usuario_db", "clave_db", "nombre_db");

if ($conexion->connect_error) {
    die("Error en la conexión: " . $conexion->connect_error);
}

// Recibir datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$pais = $_POST['pais'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];

// Insertar en la base de datos
$sql = "INSERT INTO usuarios (nombre, apellido, correo, pais, fecha_nacimiento)
        VALUES ('$nombre', '$apellido', '$correo', '$pais', '$fecha_nacimiento')";

if ($conexion->query($sql) === TRUE) {
    echo "Registro exitoso. ¡Bienvenido a VeraGlow!";
} else {
    echo "Error: " . $sql . "<br>" . $conexion->error;
}

$conexion->close();
?>
