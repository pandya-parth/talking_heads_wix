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
</head>

<body>
    <div id="talking_head_video"></div>
    <script>
        $( document ).ready( function () {
    var settings = {
                "siteOwnerID": "bc461427-7f2d-4e7f-9524-43074cc4be5c",
                "instanceId": "13b5532d-c68a-25fe-58a6-af03c033327b",
                "vendorProductId": "Free",
                "autostart": "No",
                "session_play": "Play Every Time",
                "exit_on_complete": false,
                "delay": 0.1,
                "volume": 0.7,
                "color": "#009ED8",
                "opacity": 0.5,
                "btn_size": "24",
                "exit_btn": true,
                "video": "wixapp"
            };
            playerTH( settings );
        } );
    </script>
</body>

</html>