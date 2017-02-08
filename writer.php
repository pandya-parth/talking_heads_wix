<?php
require( "data.php" );
// Create connection
//----------------------------------------------------Connect
global $servername, $username, $password, $dbname, $table;
$connection = mysqli_connect( $servername, $username, $password, $dbname );
// Test if connection occurred.
if ( mysqli_connect_errno() ) {
    die( "Database connection failed: " . mysqli_connect_error() .
        " (" . mysqli_connect_errno() . ")"
    );
}
	$id = 0;
	$instanceId = "bc461427-7f2d-4e7f-9524-43074cc4be5c";
	$siteOwnerId = "13b5532d-c68a-25fe-58a6-af03c033327b";
	$autostart = "No";
	
	// 2. Perform database query
	$query  = "UPDATE subjects SET ";
	$query .= "instanceId = '{$instanceId}', ";
	$query .= "siteOwnerId = '{$siteOwnerId}', ";
	$query .= "autostart = '{$autostart}' ";
	$query .= "WHERE id = {$id}";

$result = mysqli_query( $connection, $query );


if ( $result && mysqli_affected_rows( $connection ) == 1 ) {
    // Success
    // redirect_to("somepage.php");
    echo "Success!";
} else {
    // Failure
    // $message = "Subject update failed";
    die( "Database query failed. " . mysqli_error( $connection ) );
}
//----------------------------------------------------
function checkId( $instanceID ) {
    global $servername, $username, $password, $dbname, $table, $connection;
    $query = "SELECT * ";
    $query .= "FROM $table ";
    $result = mysqli_query( $connection, $query );
    if ( !$result ) {
        die( "database failed" );
    }
    // 3. Use returned data (if any)
    while ( $table = mysqli_fetch_assoc( $result ) ) {
        if ( $table[ "instanceId" ] == $instanceID ) {
            return ( $table[ "id" ] );
            break;
        }
    }
}

// 5. Close database connection
mysqli_close( $connection );
?>