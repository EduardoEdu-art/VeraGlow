<?php
// Conexión con MySQL usando XAMPP (localhost, root sin contraseña por defecto)
$conexion = new mysqli("localhost", "root", "", "veraglow_db");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Recibir los datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$pais = $_POST['pais'];
$fecha_nacimiento = $_POST['fecha_nacimiento'];

// Insertar datos a la tabla
$sql = "INSERT INTO usuarios (nombre, apellido, correo, pais, fecha_nacimiento)
        VALUES (?, ?, ?, ?, ?)";

// Preparar la consulta
$stmt = $conexion->prepare($sql);
$stmt->bind_param("sssss", $nombre, $apellido, $correo, $pais, $fecha_nacimiento);

// Ejecutar y validar
if ($stmt->execute()) {
    echo "✅ ¡Registro exitoso! Bienvenido a VeraGlow.";
} else {
    echo "❌ Error al registrar: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>
