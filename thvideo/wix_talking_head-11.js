function playerTH(playerValues) {
    'use strict';
    console.log(playerValues);
    var playerLoc = $('#talking_head_video'),
        width = "320", //video width
        height = "320", //video height
        left = "50%", //if centering on page change this to 50%
        right = "auto",
        divTop = "0",
        bottom = "auto",
        centeroffset = "auto",
        color = playerValues.color,
        opacity = playerValues.opacity,
        volume = playerValues.volume,
        delay = playerValues.delay, //delay start of video
        /*controlbar = "mouse",*/ //options for showing the controlbar, yes, no, and mouse
        exitbtn = playerValues.exit_btn, //show or not show exitbtn
        autostart = playerValues.autostart.toLowerCase(), //autostart options yes, no, mute, oncethenpic, oncethenmute, onceonlythenpic, onceonlythenmute, and loop
        exitoncomplete = playerValues.exit_on_complete, //option for player to close after video completes. "yes" or "no"
        oncepersession = playerValues.session_play, //option for number of times video plays "yes", "no", or "onceonly"
        vidLink = "", //make the Talking Heads Player a link. Either leave this set to "no" or you can put a complete URL inside the quotes.
        openIn = "_blank",
        path = "thvideo/", //path to where the files are located
        actor = playerValues.video,
        actorpic = path + playerValues.video + ".gif", //transparent gif
        // end Main Player Vars
        gifBackground = "url('" + actorpic + "')",
        buttonPath = path + "buttons/",
        btnWidth = playerValues.btn_size,
        hVideo = path + playerValues.video + ".mp4",
        leftEnd = left.charAt(left.length - 1),
        overflow = "hidden",
        btnTop = "70%",
        hasSeenLS, hasSeenSS, thplayer, spokespersonImage, playingS, toLoop, toMute, isDevice, iOS = false,
        toPlay = true,
        outputCanvas, theCanvas = "",
        hasSeen = "hasSeen-" + playerValues.video;
    delay = delay * 1000;
    leftEnd = left.charAt(left.length - 1);
    switch (leftEnd) {
        case "%":
            break;
        case "o":
            break;
        default:
            left += "px";
    }
    if (divTop !== "auto") {
        divTop += "px";
    }
    if (right !== "auto") {
        right += "px";
    }
    if (centeroffset !== "auto") {
        centeroffset += "px";
    }
    if (bottom !== "auto") {
        bottom += "px";
    }

    hasSeenSS = sessionStorage.getItem(hasSeen);
    hasSeenLS = localStorage.getItem(hasSeen);
    if (hasSeenLS === null) {
        if (autostart !== "no" || autostart === "mute") {
            autostart = "yes";
        }
    } else {
        oncepersessionSwitch();
        autostartSwitch();
    }
    if (hasSeenSS !== null) {
        switch (autostart) {
            case "oncethenmute":
            case "mute":
            case "loop":
                toLoop = true;
                toMute = true;
                autostart = "mute";
                break;
            case "oncethenpic":
            case "onceonlythenpic":
                autostart = "no";
                break;
        }
    }
    sessionStorage.setItem(hasSeen, true);
    localStorage.setItem(hasSeen, true);
    if (toPlay === true) {
        setTimeout(function () {
            isDevice = detectDevice();
            createDiv();
        }, delay);
    } else {
        return;
    }

    function autostartSwitch() {
        switch (autostart) {
            case "onceonlythenmute":
                autostart = "mute";
                break;
            case "onceonlythenpic":
                autostart = "no";
                break;
            default:
                break;
        }
    }

    function oncepersessionSwitch() {
        switch (oncepersession) {
            case "yes":
                if (hasSeenSS === "true") {
                    toPlay = false;
                }
                break;
            case "onceonly":
                if (hasSeenLS === "true") {
                    toPlay = false;
                }
                break;
            default:
                toPlay = true;
                break;
        }
    }

    function createDiv() {
        $(playerLoc).css({
            "position": "relative",
            "left": "50%",
            "margin-left": (width / 2) * -1 + "px",
            "top": "auto",
            "bottom": "0",
            "height": height + "px",
            "width": width + "px",
            "cursor": "pointer",
            "overflow": overflow
        });
        if (isDevice) {
            createVideo();
            createControls();
            startBtnCreate();
            hVideo = path + "/" + actor + ".mp4";
        } else {
            hVideo = path + "/" + actor + "_matte.mp4";
            createVideo();
            createControls();
            createCanvas();
            addListeners();
            HTML5Autostart();
        }
    }

    function createVideo() {
        var video = $("<video/>", {
            "id": "talkinghead",
            "playsinline": "playsinline",
            "src": hVideo,
            "poster": actorpic,
            "volume": volume,
            "width": width + "px",
            "height": height + "px"
        });
        if (toLoop) {
            video.attr("loop", "true");
        }
        if (toMute) {
            video.attr("muted", "true");
        }
        $(playerLoc).append(video);
        thplayer = $('#talkinghead')[0];
    }

    function createCanvas() {
        var bufferCanvas = $('<canvas/>', {
            "id": "bufferCanvas",
            "width": width + "px",
            "height": height * 2 + "px"
        });

        var talkingCanvas = $('<canvas/>', {
            "id": "talkingCanvas",
            "width": width + "px",
            "height": height * 2 + "px"
        });
        $(playerLoc).append(bufferCanvas);
        $(playerLoc).append(talkingCanvas);
    }


    function createControls() {
        //holder
        $(playerLoc).append('<div id="playerHolder"/>');
        $('#playerHolder').css({
            "position": "relative",
            "left": "0",
            "top": (height * -1) + "px",
            "width": width + "px",
            "height": height + "px"
        });
        ///add exit btn if needed
        if (exitbtn === "yes") {
            $('<img />', {
                "id": "exitMain",
                "width": "16px",
                "src": buttonPath + "ExitBtn-full.png"
            }).appendTo($('#playerHolder'));
            $('#exitMain').css({
                "margin-left": (width - 20) + "px",
                "margin-top": "-2px"
            });
        }
        jQuery('<div/>', {
            "id": 'PlayerBar'
        }).appendTo(playerLoc);
        $('#PlayerBar').css({
            "borderRadius": "8px",
            "border": "2px solid " + color,
            "padding": "0",
            "margin": "0 auto",
            "bottom": "0px",
            "position": "absolute",
            "background": convertHex(color, opacity)
        });
        $('<img />', {
            "id": "PlayPauseBtn",
            "src": buttonPath + "play.svg",
            "class": "playerBtns"
        }).appendTo($('#PlayerBar'));
        $('<img />', {
            "id": "muteBtn",
            "src": buttonPath + "volume.svg",
            "class": "playerBtns"
        }).appendTo($('#PlayerBar'));
        $('<img />', {
            "id": "restart",
            "src": buttonPath + "restart.svg",
            "class": "playerBtns"
        }).appendTo($('#PlayerBar'));
        $('<img />', {
            "id": "playerClose",
            "src": buttonPath + "exit.svg",
            "class": "playerBtns"
        }).appendTo($('#PlayerBar'));
        $('<img />', {
            "id": "logo",
            "src": buttonPath + "logo.svg",
            "class": "playerBtns"
        }).appendTo($('#PlayerBar'));
        $('.playerBtns').css({
            "padding": "2px 1px 0",
            "width": btnWidth,
            "height": btnWidth
        });
        $('#playerClose').ready(function () {
            var pbWidth = $('#PlayerBar').width();
            var pbLeft = ((width - pbWidth) / 2) + "px";
            $('#PlayerBar').css("left", pbLeft);
        });
    }

    function HTML5Autostart() {
        if (autostart === "yes" || toLoop === true) {
            thplayer.oncanplay = function () {
                if (thplayer.paused === true) {
                    autostart = "cant auto play";
                    addBackground();
                }
            };
        }
        if (autostart === "yes" || toLoop === true) {
            thplayer.autoplay = true;
            $("#PlayPauseBtn").attr("src", buttonPath + "pause.svg");
            $("#PlayerBar").css("opacity", "1");
            startPlaying();
        } else {
            addBackground();
        }
    }

    function addListeners() {
        //Hover
        $('.playerBtns').each(function (index, element) {
            $(element).mouseenter(function () {
                $(element).css("opacity", 0.8);
            });
        });
        //mouse out
        $('.playerBtns').each(function (index, element) {
            $(element).mouseout(function () {
                $(element).css("opacity", 1);
            });
        });
        //clicks
        $(playerLoc).click(function (e) {
            if (e.target !== e.currentTarget) {
                if (toMute) {
                    removeMuted();
                }
                switch (e.target.id) {
                    case "PlayPauseBtn":
                    case "playerHolder":
                        if (spokespersonImage) {
                            spokespersonImage.style.display = "none";
                        }
                        playToggle();
                        break;
                    case "muteBtn":
                        muteToggle();
                        break;
                    case "restart":
                        restartClick();
                        break;
                    case "playerClose":
                    case "exitMain":
                        closePlayer();
                        break;
                    case "spokespersonImage":
                        playClick();
                        break;
                    case "talkinghead":
                        if (vidLink !== "") {
                            openLink();
                        } else {
                            playToggle();
                        }
                        break;
                    case "imgLnk":
                    case "Spokesperson":
                    case "talkinghead":
                        openLink();
                        break;
                }
            }
            e.stopPropagation();
        });
    }
    $('#talkinghead').bind('ended', function () {
            console.log('ended');
        if (exitoncomplete === true) {
            closePlayer();
        } else {
            $("#PlayPauseBtn").attr("src", buttonPath + "play.svg");
            if(isDevice){
                startBtnCreate();
            }else{
                addBackground();
            }
        }
    });

    function playClick() {
        try {
            spokespersonImage.style.display = "none";
        } catch (err) {}
        thplayer.play();
        $("#PlayPauseBtn").attr("src", buttonPath + "pause.svg");
    }

    function playToggle() {
        if (thplayer.paused) {
            thplayer.play();
            $("#PlayPauseBtn").attr("src", buttonPath + "pause.svg");
            $("#PlayerBar").css("opacity", 1);
        } else {
            $("#PlayPauseBtn").attr("src", buttonPath + "play.svg");
            thplayer.pause();
        }
    }

    function muteToggle() {
        if (thplayer.muted) {
            thplayer.muted = false;
            $("#muteBtn").attr("src", buttonPath + "volume.svg");
        } else {
            $("#muteBtn").attr("src", buttonPath + "mute.svg");
            thplayer.muted = true;
        }
    }

    function restartClick() {
        thplayer.currentTime = 0;
        $("#PlayPauseBtn").attr("src", buttonPath + "pause.svg");
        playClick();
        thplayer.play();
    }

    function closePlayer() {
        thplayer.pause();
        clearInterval(playingS);
        $(playerLoc).empty();
    }

    function addBackground() {
        $('#spokespersonImage').css({
            "background-image": gifBackground,
            "background-repeat": "no-repeat",
            "position": "absolute",
            "height": height + "px",
            "width": width + "px",
            "cursor": "pointer",
            "overflow": overflow
        });
        $('#spokespersonImage').insertBefore($(playerLoc));
        startBtnCreate();
    }


    function openLink() {
        $("#PlayPauseBtn").attr("src", buttonPath + "play.svg");
        thplayer.pause();
        window.open(vidLink, openIn);
    }

    function removeMuted() {
        $("#muteBtn").attr("src", buttonPath + "volume.svg");
        toMute = false;
        toLoop = false;
        thplayer.muted = false;
        thplayer.loop = false;
        setTimeout(function () {
            restartClick();
        }, 150);
    }

    function startPlaying() {
        theCanvas = $('#talkingCanvas');
        outputCanvas = $('#bufferCanvas');
        thplayer.currentTime = 0;
        thplayer.play();
        $("#PlayPauseBtn").attr("src", buttonPath + "pause.svg");
        if (theCanvas && theCanvas.getContext) {
            var ctx = theCanvas.getContext("2d");
            if (ctx) {
                playingS = setInterval(function () {
                    showVideo();
                }, 16);
            }
        }
    }

    function showVideo() {
        try {
            var ctx = theCanvas.getContext("2d"),
                srcVid = thplayer,
                buffer = outputCanvas.getContext("2d");
            buffer.drawImage(srcVid, 0, 0);
            var image = buffer.getImageData(0, 0, width, height),
                imageData = image.data,
                alphaData = buffer.getImageData(0, height, width, height).data;
            for (var i = 3, len = imageData.length; i < len; i = i + 4) {
                imageData[i] = alphaData[i - 1];
            }
            ctx.putImageData(image, 0, 0, 0, 0, width, height);
        } catch (err) {}
    }

    function convertHex(hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);

        var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
        return result;
    }

    function detectDevice() {
        var isMobileDevice = (navigator.userAgent.match(/iPhone/i)),
            platform = navigator.platform,
            ua = navigator.userAgent.toLowerCase(),
            isAndroid = ua.indexOf("android") > -1;
        if (ua.includes("iphone os 10")) {
            return false;
        }
        if (platform === "iPad" || platform === "iPhone" || platform === "iPod") {
            return true;
        }
        if (iOS || isAndroid || isMobileDevice !== null) {
            return true;
        }
        return false;
    }

    function startBtnCreate() {
        //Create click to play
        var setWidth = width * 0.8;
        var startBtn = $('<div/>', {
            "id": "click-to-play",
            "alt": "Click to Play",
            "width": setWidth + "px",
            "left": (width - setWidth) / 2 + "px",
            "top": btnTop,
            "border": "2px solid " + color,
            "background": convertHex(color, opacity)
        });
        $(playerLoc).append(startBtn);
    }
}
