<?php
error_reporting(2);
session_start();
$servername = "vdb1b.pair.com";
$username = "working_36";
$password = "pCf577#1";
$dbname = "working_master";
$table = "subjects";

// Create connection
$conn = mysqli_connect($servername, $username, $password);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
//echo "Connected successfully";
$db = mysqli_select_db($conn,$dbname);

if (!$db) {
    die("Connection failed: " . mysqli_connect_error());
}

?>
