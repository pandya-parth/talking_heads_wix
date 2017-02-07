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
    $myFile = "thvideo/player.json";
    if ( $_POST ) {
        $file = fopen( $myFile, 'w' )or die( "can't open file" );
        fwrite( $file, $stringData );
        fclose( $file );
    } else {
        $data = file_get_contents( $myFile );
        $stringData = json_decode( $data, true );
    }
    ?>
    <div id="talking_head_video"></div>
    <script>
        $( document ).ready( function () {
            console.log( 'ready' );
            $.getJSON( 'thvideo/player.json', function ( data ) {
                    console.log( 'success' );
                    playerTH( data );
                } )
                .fail( function () {
                    console.log( 'fail' );
                console.log(getUrlVars());
                } );
        } );
        function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
    </script>
</body>

</html>