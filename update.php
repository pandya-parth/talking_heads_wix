<?php
require 'data.php';
$instance = "bc461427-7f2d-4e7f-9524-43074cc4be5a";
$field = "video";
$value = "wixapp";
$q="select * from subjects where instanceId ='".$instance."'";
$q1 = mysqli_query($conn,$q);
$pro = mysqli_fetch_array($q1);
if($pro)
{
	$update = "UPDATE subjects SET ". $field ." = ". $value ." WHERE instanceId ='".$instance."'";
}
else
{

    $siteOwnerID = "bc461427-7f2d-4e7f-9524-43074cc4be5c";
    $instanceId = "13b5532d-c68a-25fe-58a6-af03c033327b";
    $vendorProductId = "Free";
    $autostart = "No";
    $session_play = "Play Every Time"; 
    $exit_on_complete = 0;
    $delay = 0.1;
    $volume = 0.7; 
    $color = "#009ED8"; 
    $opacity = 0.5;
    $btn_size = "24"; 
    $exit_btn = 1;
    $video = "wixapp";

	$insert="INSERT INTO subjects values('2','$instanceId','$siteOwnerID','$vendorProductId','$autostart','$session_play','$exit_on_complete','$delay','$volume','$color','$opacity','$btn_size','$exit_btn','$video')";
	var_dump($insert);
	exit;
	if($record = mysqli_query($conn,$insert))
     {
     	var_dump($record);
     }
    else
    {
    	var_dump("false");
    }
}
?>