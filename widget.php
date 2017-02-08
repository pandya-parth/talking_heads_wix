<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Talking Head App</title>
    <link rel="stylesheet" href="css/widget.css"/>
    <script src="//code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="//static.parastorage.com/services/js-sdk/1.66.0/js/wix.min.js"></script>
    <script src="js/widget.js"></script>
    <script src="thvideo/talking_heads_video.js"></script>
    <script src="js/playerChange.js"></script>
</head>

<body>
    <?php
    require( 'reader.php' );
    $getSettings = checkInstance( "13b5532d-c68a-25fe-58a6-af03c033327b" );
    ?>
    <div id="talking_head_video"></div>
    <script>
        $( document ).ready( function () {
            playerTH( <?=$getSettings?> );
        } );
    </script>
</body>

</html>