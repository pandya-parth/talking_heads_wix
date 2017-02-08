<?php
require("data.php");
function checkInstance( $instanceID ) {
    global $servername, $username, $password, $dbname, $table;
    $connection = mysqli_connect( $servername, $username, $password, $dbname );
    // Test if connection occurred.
    if ( mysqli_connect_errno() ) {
        die( "Database connection failed: " . mysqli_connect_error() .
            " (" . mysqli_connect_errno() . ")"
        );
    }
    $query = "SELECT * FROM clients WHERE instanceId = '$instanceID'";
    $result = mysqli_query( $connection, $query );
    if ( !$result ) {
        die( "database failed" );
    }
    // 3. Use returned data (if any)
    while($row = mysqli_fetch_row($result)) {
				return json_encode($row);
			}
    // 4. Release returned data
    mysqli_free_result( $result );

    // 5. Close database connection
    mysqli_close( $connection );
}
?>