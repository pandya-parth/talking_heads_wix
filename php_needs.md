#Talking Heads Wix App
###**PHP Needs**

[http://talkingheads.video/wix](http://talkingheads.video/wix)

##Features

###**Database**
You can make your own table the ones in there are what I tried

$servername = "vdb1b.pair.com";

$username = "working_36";

$password = "pCf577#1";

$dbname = "working_master";

instanceId and video can have multiple values(for example the same video on 2 different pages or the client buys 3 videos)

###**JSON**

*this is the json i'd like to use*

{
    
    "siteOwnerID":"bc461427-7f2d-4e7f-9524-43074cc4be5c",    
    "instanceId":"13b5532d-c68a-25fe-58a6-af03c033327b",
    "vendorProductId":"Premium",
    "autostart":"No",
    "session_play":"Play Every Time", 
    "exit_on_complete":false,
    "delay":0.5,
    "volume":0.7, 
    "color":"#009ED8", 
    "opacity":0.3,
    "btn_size":"24px", 
    "exit_btn":true,
    "video":"wixapp"
}
***
##**Detect Instance Properties**
Need a function that detects the Instance Properties(Mostly  used for instanceId)

*[Documentation](http://dev.wix.com/docs/infrastructure/app-instance/#structure)

##**In settings.php**
**When 
'settings.php'
loads** 

1. Detect 'instanceId'
2. Check if there is a 'instanceId' match:
3. Database returns json that matches the instanceId.
4. if no instanceId match then create now row with default values.

**When a control is updated.**

Database is updated with that change.

*This is what I am using now*

'$( "#bar-color" ).getCtrl().onChange( function ( val ) {
                updatePlayer(val);
            } );

function updatePlayer(val){

    var dataToSend = {
    "instanceId":instanceId,
     this:val,
}
     
 var dataString = JSON.stringify( dataToSend );

                $.ajax( {
                    url: "writer.php",
                    data: {
                        myData: dataString
                    },
                    type: 'POST',
                    success: function ( responce ) {
                        alert( responce );
                    },
                    fail: function ( fail ) {
                        alert( "Fail: " + fail );
                    }
                } )
}'

##**In widget.php**
**When 'widget.php' loads** 

1. Detect 'instanceId'
2. retrieve json data
3. send json to player

*This is what I am using now*

    <?php
    require( 'reader.php' );
    $getSettings = checkInstance( $instanceId );
    ?>
    <div id="talking_head_video"></div>
    <script>
        $( document ).ready( function () {
            playerTH( <?=$getSettings?> );
        } );
 </script>


