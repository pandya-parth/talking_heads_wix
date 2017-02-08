<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Talking Heads - Settings</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-with-addons.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.js"></script>
    <script src="//code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.2/lodash.js"></script>
    <script src="//static.parastorage.com/services/js-sdk/1.72.0/js/wix.min.js"></script>
    <script src="http://static.parastorage.com/services/editor-ui-lib/1.23.0/lib/editor-ui-lib-jquery.min.js"></script>
    <link href="css/settings.css" rel="stylesheet" type="text/css">
</head>

<body>
    <?php
    require 'include.php';
    ?>
    <div wix-ctrl="appSettings"></div>
    <div wix-ctrl="panelTabs" wix-options="{defaultTabIndex:0}">

        <!--main tab-->

        <div tab="Main" class="main-tab"> <img class="app-logo" src="images/logo.svg" alt="app logo"/>
            <p class="app-description"> This is the Wix App settings demo.<br/> Please add a short description of your App + CTA for the main action. </p>
            <?php 
                $json = getTestInstance();
                $data = json_decode($json);
                $id = $data->instanceId; 
                echo "<div id='instance'>". $id ."</div>";
                 echo "<div id='owner'>".   $data->uid ."</div>";
                 echo "<div id='vendor'>". $data->vendorProductId ."</div>";
                 echo "<div id='origin'>". $data->originInstanceId ."</div>";
                ?>
            <div class="main_button" wix-ctrl="Button" wix-options="{
                    label: 'Main CTA',
                    className: 'btn-confirm-primary'
                }" id="main-cta"></div>
        </div>

        <!--settings tab-->

        <div tab="Plans" class="plans-tab">
            <hr class="divider-long"/>
            <div wix-ctrl="SectionDividerLabeled" wix-options="{label: 'Plans'}"> </div>
            <hr class="divider-long"/>
            <h3 class="text-center">All Plans Include the following</h3>
            <ul class="stripes-small">
                <li class="list-striped"> Custom Transparent Video</li>
                <li class="list-striped"> Customizable Player</li>
                <li class="list-striped"> Mobile Friendly</li>
                <li class="list-striped"> Free Video Hosting</li>
                <li class="list-striped"> Professional Spokespeople</li>
            </ul>
            <hr class="divider-long"/>
            <div id="plans"></div>
        </div>

        <!--Functions tab-->

        <div tab="Function" class="function-tab">
            <hr class="divider-long"/>
            <div wix-ctrl="SectionDividerLabeled" wix-options="{label: 'Player Functions'}"> </div>
            <hr class="divider-long"/>
            <div id="autostart" class="player_type" wix-ctrl="DropDown" wix-param="autostart" wix-options="{
                title: 'Autostart',
                defaultValue: '0',
                        infoTitle: 'Autostart',
                        infoText: 'Does the video start automatically?',
                options: [
                    { value: '0', label: 'Yes'},
                    { value: '1', label: 'Image'},
                    { value: '2', label: 'Mute'}
                ]}"></div>
            <div id="player_session_play" wix-ctrl="DropDown" wix-options="{
                    title: 'Play Every Time',
                    defaultValue: '1',
                        infoTitle: 'Play Every Time',
                        infoText: 'How often will video play on new visits',
                    options: [
                        { value: '1', label: 'Play Every Time'},
                        { value: '2', label: 'Once Per Session'},
                        { value: '3', label: 'Once Only'}
                    ]
                }"></div>
            <div id="exit" class="player_exit" wix-ctrl="ToggleSwitch" wix-options="{
                        label: 'Exit on Complete',
                        defaultValue: false,
                        infoTitle: 'Exit on Complete',
                        infoText: 'Does the video stay on screen when finished'
                    }"></div>
            <hr class="divider-long"/>
            <div id="player_delay" wix-ctrl="Slider" wix-options="{
                    title: 'Delay (secs)',
                    min: 0,
                    max: 2,
                    step: 0.1,
                    defaultValue: 0.5,
                        infoTitle: 'Delay',
                        infoText: 'Volume for the video'
                }"></div>
            <hr class="divider-long"/>
            <div id="player_volume" wix-ctrl="Slider" wix-options="{
                    title: 'Volume',
                    min: 0,
                    max: 1,
                    step: 0.1,
                    defaultValue: 0.7,
                        infoTitle: 'Volume',
                        infoText: 'Delay the start of the video'
                }"></div>
        </div>

        <!--Look tab------------------------------------------------------------------------------------>

        <div tab="Look" class="look-tab">
            <hr class="divider-long"/>
            <div wix-ctrl="SectionDividerLabeled" wix-options="{label: 'Player Look'}"> </div>
            <hr class="divider-long"/>
            <div id="bar-color" wix-param="bgColor" wix-ctrl="ColorPickerSlider" wix-options="{startWithColor: 'color-3', startWithOpacity: '0.5'}"></div>
            <hr class="divider-long"/>
            <div id="btn-size" wix-ctrl="Slider" wix-options="{
                    title: 'Button Size',
                    min: 12,
                    max: 48,
                    step: 1,
                    defaultValue: 32,
                    hideStyle:true,                
                    infoTitle: 'Button Size',
                    infoText: 'Button Size the start of the video'
                }"></div>

            <div id="exit-btn" class="exit-btn" wix-ctrl="ToggleSwitch" wix-options="{
                        label: 'Show Exit Button',
                        defaultValue: false,
                        infoTitle: 'Show Exit Button',
                        infoText: 'Show additional exit button on the top right'
                    }"></div>
        </div>

        <!--Support tab------------------------------------------------------------------------------------------->

        <div tab="Support" class="support-tab">
            <hr class="divider-long"/>
            <div wix-ctrl="SectionDividerLabeled" wix-options="{label: 'Developer info'}"> </div>
            <hr class="divider-long"/>
            <ul class="developer-info">
                <li>
                    <div wix-ctrl="Symbol" wix-options="{name: 'email'}"></div>
                    <a href="mailto:support@talkingheads.com">support@talkingheads.com</a>
                </li>
                <li>
                    <div wix-ctrl="Symbol" wix-options="{name: 'globe'}"></div>
                    <a href="http://www.talkingheads.com/wix/" title="http://www.talkingheads.com/wix/">http://talkingheads.com</a> </li>
                <li>
                    <div wix-ctrl="Symbol" wix-options="{name: 'phone'}"></div>
                    <a href="tel://801-748-2281" title="Give us a call.">1 801 748 2281</a> </li>
            </ul>
            <hr class="divider-long"/>
            <div wix-ctrl="SectionDividerLabeled" wix-options="{label: 'Review the app'}"> </div>
            <hr class="divider-long"/>
            <p class="review-paragraph">Have you enjoyed the app? Spread the word and rate us in the app market</p>
            <div class="button-wrapper-center">
                <div class="support_rateUs" wix-ctrl="Button" wix-options="{
                        label: 'Rate Us',
                        className: 'btn-confirm-primary'
                    }"></div>
            </div>
            <hr class="divider-long"/>
            <div wix-ctrl="SectionDividerLabeled" wix-options="{label: 'Send us a message'}"> </div>
            <hr class="divider-long"/>
            <div class="support_email" wix-ctrl="Input" wix-options="{
                    title: 'What\'s your email? (optional)',
                    placeholder: 'Email'
                }"></div>
            <hr class="divider-short"/>
            <div class="support_message" wix-ctrl="Input" wix-options="{
                    title: 'What do you want to tell us?',
                    placeholder: 'Write us your message (new feature idea / other issues)',
                    isMultiLine: true
                }"></div>
            <hr class="divider-short"/>
            <div class="button-wrapper-center">
                <div class="support_sendButton" wix-ctrl="Button" wix-options="{
                        label: 'Send'
                    }"></div>
            </div>
        </div>
        <hr class="divider-short"/>
        <div wix-ctrl="Button" wix-options="{
                className: 'btn-upgrade-nav',
                label: 'Upgrade'
            }"></div>
    </div>
    <script src="js/settings.js"></script>
    <script>
            $( document ).ready(function() {
                //---------------------------------------------------------------Autostart
            $( "#autostart" ).getCtrl().onChange( function ( autostart ) {
                updatePlayer();
            } );
            //---------------------------------------------------------------Once Per Session
            $( "#player_session_play" ).getCtrl().onChange( function ( session_play ) {
                updatePlayer();
            } );
            //---------------------------------------------------------------Exit on Complete
           $( "#exit" ).getCtrl().onChange( ( function ( exit_on_complete ) {
                updatePlayer();
            } ) );
            //-----------------------------------------------------------------------------delay
            $( "#player_delay" ).getCtrl().onChange( function ( delay ) {
                updatePlayer();
            } );
            //-----------------------------------------------------------------------------volume
            $( "#player_volume" ).getCtrl().onChange( function ( volume ) {
                updatePlayer();
            } );
            //--------------------color picker
            $( "#bar-color" ).getCtrl().onChange( function ( val ) {
                updatePlayer();
            } );

            //--------------------btn size
            $( "#btn-size" ).getCtrl().onChange( function ( val ) {
                updatePlayer();
            } );
            //---------------------------------------------------------------Exit on Complete
           $( "#exit-btn" ).getCtrl().onChange(function () {
                updatePlayer();
            });


            function updatePlayer() {
                var dataToSend = {
                    "siteOwnerID": $( '#owner' ).text(),
                    "instanceId": $( '#instance' ).text(),
                    "vendorProductId": $( '#vendorProductId' ).text(),
                    "videoID": "wixapp",
                    "autostart": $( "#autostart" ).find( ".selected" ).text(),
                    "session_play": $( "#player_session_play" ).find( ".selected" ).text(),
                    "exit_on_complete": $( "#exit" ).getCtrl().getValue(),
                    "delay": $( "#player_delay" ).getCtrl().getValue(),
                    "volume": $( "#player_volume" ).getCtrl().getValue(),
                    "color": $( "#bar-color" ).getCtrl().getValue().color,
                    "opacity": $( "#bar-color" ).getCtrl().getValue().opacity,
                    "btn_size": $( "#btn-size" ).getCtrl().getValue(),
                    "exit_btn": $( '#exit-btn' ).getCtrl().getValue(),
                    "video": "wixapp"
                }
                var data =JSON.stringify( dataToSend );
                $.ajax( {
                    url: 'writer.php',
                    type: "POST",
                    dataType: 'json',
                    async: false,
                    data: data,
                    success: function () {
                        console.log( data );
                    },
                    failure: function () {
                        console.log( "Error!" );
                    }
                });
                console.log(dataToSend);
            }
        });
    </script>
</body>

</html>