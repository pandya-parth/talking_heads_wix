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
    <script src="js/settings.js"></script>
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
        <!--settings tab-->

        <div tab="Video" class="plans-tab">
            <hr class="divider-long"/>
            <div wix-ctrl="SectionDividerLabeled" wix-options="{label: 'Video'}"> </div>
            <hr class="divider-long"/>
            <h3 class="text-center">Choose One of Your Videos Here</h3>
            <hr class="divider-long"/>
            <div id="video" wix-ctrl="DropDown" wix-options="{title: 'Select option',
                defaultValue: '1',
                infoTitle: 'Choose Video',
                infoText: 'If you own more than one video you can choose which one to play here.',
                options:[
        {value: '1', label: 'wixapp'}
        ]}"></div>
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
            <div id="session_play" wix-ctrl="DropDown" wix-param="session_play" wix-options="{
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
            <div id="exit" class="player_exit" wix-ctrl="ToggleSwitch" wix-param="player_exit" wix-options="{
                        label: 'Exit on Complete',
                        defaultValue: false,
                        infoTitle: 'Exit on Complete',
                        infoText: 'Does the video stay on screen when finished'
                    }"></div>
            <hr class="divider-long"/>
            <div id="player_delay" wix-ctrl="Slider" wix-param="player_delay" wix-options="{
                    title: 'Delay (secs)',
                    min: 0,
                    max: 2,
                    step: 0.1,
                    defaultValue: 0.5,
                        infoTitle: 'Delay',
                        infoText: 'Volume for the video'
                }"></div>
            <hr class="divider-long"/>
            <div id="player_volume" wix-ctrl="Slider" wix-param="player_volume" wix-options="{
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
            <div id="btn_size" wix-ctrl="Slider" wix-param="btn_size" wix-options="{
                    title: 'Button Size',
                    min: 12,
                    max: 48,
                    step: 1,
                    defaultValue: 32,
                    hideStyle:true,                
                    infoTitle: 'Button Size',
                    infoText: 'Button Size the start of the video'
                }"></div>

            <div id="exit_btn" wix-ctrl="ToggleSwitch" wix-param="exit_btn" wix-options="{
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
        $( document ).ready( function () {
            $json = {
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
            $( "#autostart" ).getCtrl().setValue( '2' );
            $( "#session_play" ).getCtrl().setValue( $json.session_play );
            $( "#exit" ).getCtrl().setValue( $json.exit_on_complete );
            $( "#player_delay" ).getCtrl().setValue( $json.delay );
            $( "#player_volume" ).getCtrl().setValue( $json.volume );
            $( "#btn_size" ).getCtrl().setValue( $json.btn_size );
            $( "#exit_btn" ).getCtrl().setValue( $json.exit_btn );
            $( "#video" ).getCtrl().setValue( $json.video );
            //            $( "#bar-color" ).getCtrl().setValue($json.color);
            //---------------------------------------------------------------Autostart
            $( "#autostart" ).getCtrl().onChange( function () {
                var autostart = $( "#autostart" ).find( ".selected" ).text();
                updatePlayer( "autostart", autostart );
            } );
            //---------------------------------------------------------------Once Per Session
            $( "#session_play" ).getCtrl().onChange( function () {
                var session_play = $( "#session_play" ).find( ".selected" ).text();
                updatePlayer( "session_play", session_play );
            } );
            //---------------------------------------------------------------Exit on Complete
            $( "#exit" ).getCtrl().onChange( ( function ( exit_on_complete ) {
                updatePlayer( "exit_on_complete", exit_on_complete );
            } ) );
            //-----------------------------------------------------------------------------delay
            $( "#player_delay" ).getCtrl().onChange( function ( delay ) {
                updatePlayer( "delay", delay );
            } );
            //-----------------------------------------------------------------------------volume
            $( "#player_volume" ).getCtrl().onChange( function ( volume ) {
                updatePlayer( "volume", volume );
            } );
            //--------------------color picker
            $( "#bar-color" ).getCtrl().onChange( function ( bar ) {
                updatePlayer( "color", bar.color );
                updatePlayer( "opacity", bar.opacity );
            } );
            //--------------------btn size
            $( "#btn_size" ).getCtrl().onChange( function ( btn_size ) {
                updatePlayer( "btn_size", btn_size );
            } );
            //---------------------------------------------------------------Exit on Complete
            $( "#exit_btn" ).getCtrl().onChange( function ( exit_btn ) {
                updatePlayer( "exit_btn", exit_btn );
            } );
            //---------------------------------------------------------------Video Chosen
            $( "#video" ).getCtrl().onChange( function ( video ) {
                updatePlayer( "video", video );
            } );


            function updatePlayer( field, value ) {
             //   console.log(field + "::" +value);
            }

        } );
    </script>
</body>

</html>