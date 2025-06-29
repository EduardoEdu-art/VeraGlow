<?php
$conn = new mysqli("localhost", "root", "", "veraglow_db");
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

$sql = "SELECT * FROM productos WHERE 1=1";

if (!empty($_GET['marca']) && is_array($_GET['marca'])) {
  $marcas = implode("','", array_map([$conn, 'real_escape_string'], $_GET['marca']));
  $sql .= " AND marca IN ('$marcas')";
}

if (!empty($_GET['clase']) && is_array($_GET['clase'])) {
  $clases = implode("','", array_map([$conn, 'real_escape_string'], $_GET['clase']));
  $sql .= " AND clase IN ('$clases')";
}

if (!empty($_GET['precio_min']) && is_numeric($_GET['precio_min'])) {
  $min = intval($_GET['precio_min']);
  $sql .= " AND precio >= $min";
}

if (!empty($_GET['precio_max']) && is_numeric($_GET['precio_max'])) {
  $max = intval($_GET['precio_max']);
  $sql .= " AND precio <= $max";
}

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    echo '<div class="product-card">';
    
    if ($row['disponible'] == 0) {
      echo '<span class="sold-out">Agotado</span>';
    }

    echo '<img src="' . htmlspecialchars($row['imagen']) . '" alt="' . htmlspecialchars($row['nombre']) . '" class="product-image">';
    echo '<div class="product-info">';
    echo '<p class="product-name"><strong>' . htmlspecialchars($row['nombre']) . '</strong></p>';
    echo '<p class="product-brand">' . htmlspecialchars($row['marca']) . '</p>';
    echo '<p class="product-price">$' . number_format($row['precio'], 2) . '</p>';
    echo '</div>';
    echo '<button class="add-to-cart">Añadir al carrito</button>';
    echo '</div>';
  }
} else {
  echo '<p>No se encontraron productos con los filtros seleccionados.</p>';
}

$conn->close();
?>
