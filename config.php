<?php

$Email = $_POST['Email'];

$BkashAccountNumber = $_POST['BkashAccountNumber'];
$BkashTransactionID = $_POST['BkashTransactionID'];

$RocketAccountNumber = $_POST['RocketAccountNumber'];
$RocketTransactionID = $_POST['RocketTransactionID'];

$NagadAccountNumber = $_POST['NagadAccountNumber'];
$NagadTransactionID = $_POST['NagadTransactionID'];


//Database connection

$conn = new mysqli("localhost", "root", "", "erudition");
if ($conn->connect_error) {
    echo "$conn->connect_error";
    die("Connection Failed : " . $conn->connect_error);
} else {

    $stmt = $conn->prepare("INSERT INTO details (Email, BkashAccountNumber, BkashTransactionID, RocketAccountNumber, RocketTransactionID, NagadAccountNumber, NagadTransactionID) VALUES (?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("sisisis", $Email, $BkashAccountNumber, $BkashTransactionID, $RocketAccountNumber, $RocketTransactionID, $NagadAccountNumber, $NagadTransactionID);

    $execval = $stmt->execute();

    //echo $execval;

    echo "Checkout Successful";

    $stmt->close();
    $conn->close();

    // Redirect to the course page
    header("Location: http://127.0.0.1:5500/course.html");
    exit();
}

?>
