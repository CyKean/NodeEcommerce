<?php
header('Content-Type: application/json');

$servername = "localhost"; 
$username = "root";
$password = ""; 
$dbname = "ecommerce_db"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['message' => 'Connection failed: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data['userId'];
$productId = $data['productId'];
$quantity = $data['quantity'];
$createdAt = $data['createdAt'];
$updatedAt = $data['updatedAt'];

$sql = "INSERT INTO carts (quantity, createdAt, updatedAt, userId, productId) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issii", $quantity, $createdAt, $updatedAt, $userId, $productId);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Product added to cart successfully!']);
} else {
    echo json_encode(['message' => 'Error adding product to cart: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
