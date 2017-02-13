<?php

// this is mentioned in wix application settings in dashboard
define( 'APP_SECRET', 'cf0adfd5-c46f-4f97-9c8c-33ce634a0929' );
define( 'instanceId', 'bc461427-7f2d-4e7f-9524-43074cc4be5x' );

require( "data.php" );

function getTestInstance() {
    require 'data.php';
    $q="select * from subjects where instanceId ='".instanceId."'";
    $q1 = mysqli_query($conn,$q);
    $pro = mysqli_fetch_array($q1);
    $data = json_encode( array(
        "instanceId" => $pro['instanceId'],
        "signDate" => "2015-01-01T17:31:16.840Z",
        "uid" => "bc461427-7f2d-4e7f-9524-43074cc4be5c",//$pro['siteOwnerId'],
        "permissions" => "OWNER",
        "vendorProductId" => $pro['vendorProductId'],
        "originInstanceId" => "c38e4e00-dcc1-433e-9e90-b332def7b342"
    ) );
    $signature = hash_hmac( "sha256", base64_encode( $data ), APP_SECRET, true );
    return $data;
    //	return strtr(base64_encode($signature), "+/", "-_" )  . '.' . base64_encode($data) ; 
}

function getInfo() {
    list( $code, $data ) = explode( '.', $_GET[ 'instance' ] );

    if ( base64_decode( strtr( $code, "-_", "+/" ) ) != hash_hmac( "sha256", $data, APP_SECRET, TRUE ) ) {
        die(); // Report error
    }

    if ( ( $json = json_decode( base64_decode( $data ) ) ) === null ) {
        die(); // Report error
    }
    return $json;
}

function isPremium() {
    list( $code, $data ) = explode( '.', $_GET[ 'instance' ] );

    if ( base64_decode( strtr( $code, "-_", "+/" ) ) != hash_hmac( "sha256", $data, APP_SECRET, TRUE ) ) {
        return false; // Report error
    }

    if ( ( $json = json_decode( base64_decode( $data ), true ) ) === null ) {
        return false; // Report error
    }

    // for debugging purpose
    // var_dump($json);

    if ( $json[ 'vendorProductId' ] ):
        return true;
    else :
        return false;
    endif;
}