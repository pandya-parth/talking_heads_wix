// Copyright 2016 Website Talking Heads
// JavaScript Document
function playerTH(playerValues) {
    "use strict";
    //Variables for Playereee
    var iPhoneWidth = 0, //When the above happens, the witdh of the image
        width = 320, //video width
        height = 320, //video height
        color = playerValues.color,
        opacity = playerValues.opacity,
        volume = playerValues.volume,
        delay = playerValues.delay, //delay start of video
        /*controlbar = "mouse",*/ //options for showing the controlbar, yes, no, and mouse
        exitbtn = playerValues.exit_btn, //show or not show exitbtn
        autostart = playerValues.autostart, //autostart options yes, no, mute, oncethenpic, oncethenmute, onceonlythenpic, onceonlythenmute, and loop
        exitoncomplete = playerValues.exit_on_complete, //option for player to close after video completes. "Yes" or "No"
        oncepersession = playerValues.session_play, //option for number of times video plays "Yes", "No", or "onceonly"
        vidLink = "",
        openIn = "_blank",
        path = "thvideo/", //path to where the files are located
        actor = playerValues.video,
        actorpic = actor + ".gif", //transparent gif
        canvasVideo = actor + "_matte.mp4", //Just name,not extension
        h264 = actor + ".mp4", //Just name,not extension h264
        // end Main Player Vars
        //----------------------------------------------------------------------------------------------------------------------------------------	 
        // convert vars to something useful
        // JavaScript Document
        playerLoc = $('#talking_head_video'),
        gifBackground = "url('" + path + actorpic + "')",
        buttonPath = path + "buttons" + "/",
        hVideo = path + "/" + canvasVideo,
        iOS = false,
        isDevice = false,
        isMobileDevice = (navigator.userAgent.match(/iPhone/i)),
        platform = navigator.platform,
        ua = navigator.userAgent.toLowerCase(),
        isAndroid = ua.indexOf("android") > -1,
        btnWidth = playerValues.btn_size + "px",
        hasSeenLS, hasSeenSS, theParent, actorGif, iPhoneVideo, thplayer, spokespersonImage, thb, playerBar, playingS, outputCanvas, theCanvas, thc, imgLink = null,
        clickOpacity = 0.5,
        i10, toLoop, toMute = false,
        toPlay = true,
        hasSeen = "hasSeen" + canvasVideo;
    delay = delay * 1000;
    actorGif = path + actorpic;
    buttonPath = path + "buttons" + "/";
    //-------------------------------platform Detection
    if (ua.includes("iphone os 10")) {
        i10 = true;
    } else {
        if (platform === "iPad" || platform === "iPhone" || platform === "iPod") {
            iOS = true;
        }
        if (iOS || isAndroid || isMobileDevice !== null) {
            isDevice = true;
        }
    }
    if (!isDevice) {
        hVideo = path + "/" + canvasVideo;
    } else {
        hVideo = path + "/" + h264;
    }
    hasSeenSS = sessionStorage.getItem(hasSeen);
    hasSeenLS = localStorage.getItem(hasSeen);
    if (hasSeenLS === null) {
        if (autostart !== "No" || autostart === "Mute") {
            toPlay = true;
            autostart = "Yes";
        }
    } else {
        oncepersessionSwitch();
        autostartSwitch();
    }
    if (hasSeenSS !== null) {
        switch (autostart) {
            case "oncethenmute":
            case "Mute":
            case "loop":
                toLoop = true;
                toMute = true;
                autostart = "Mute";
                break;
            case "oncethenpic":
            case "onceonlythenpic":
                autostart = "No";
                break;
        }
    }
    sessionStorage.setItem(hasSeen, true);
    localStorage.setItem(hasSeen, true);
    if (toPlay === true) {
        setTimeout(function () {
            createDiv();
        }, delay);
    } else {
        return;
    }

    function autostartSwitch() {
        switch (autostart) {
            case "onceonlythenmute":
                autostart = "Mute";
                break;
            case "onceonlythenpic":
                autostart = "No";
                break;
            default:
                break;
        }
    }

    function oncepersessionSwitch() {
        switch (oncepersession) {
            case "Yes":
                if (hasSeenSS === "true") {
                    toPlay = false;
                } else {
                    toPlay = true;
                }
                break;
            case "onceonly":
                if (hasSeenLS === "true") {
                    toPlay = false;
                } else {
                    toPlay = true;
                }
                break;
            default:
                toPlay = true;
                break;
        }
    }

    function createDiv() {
        playerLoc.css({
            "height": height + "px",
            "width": width + "px"
        });
        if (isDevice) {
            if (platform === "iPhone") {
                iPhoneCreate();
                addListeners();
            } else {
                createVideo();
                createControls();
                startBtnCreate();
            }
        } else {
            createVideo();
            createControls();
            createCanvas();
            HTML5Autostart();
        }
    }

    function createVideo() {
        var v = document.createElement("VIDEO");
        v.id = "talkinghead";
        v.setAttribute("playsinline", "playsinline");
        v.src = hVideo;
        if (isDevice) {
            v.poster = actorGif;
        } else {
            v.poster = actorGif;
            v.style.display = "none";
        }
        v.volume = volume;
        v.style.width = width + "px";
        if (toLoop) {
            v.loop = true;
        }
        if (toMute) {
            v.muted = true;
            if (autostart !== "loop") {
                startBtnCreate();
            }
        }
        if (!isDevice) {
            v.style.height = height * 2 + "px";
        } else {
            v.style.height = height + "px";
        }
        $(playerLoc).append(v);
        thplayer = document.getElementById("talkinghead");
        var p = document.createElement("p");
        p.innerHTML = "Your Browser does not support the <video> tag";
        v.appendChild(p);
        $(playerLoc).append('<div id="playerHolder"/>');
        $('#playerHolder').css({
            "position": "relative",
            "left": "0",
            "bottom": "0",
            "width": width + "px",
            "height": height + "px"
        });
        ///add exit btn if needed
        if (exitbtn === "true") {
            $('<img />', {
                "id": "exitMain",
                "width": "16px",
                "src": buttonPath + "exit.png"
            }).appendTo($('#playerHolder'));
        }
    }

    function createCanvas() {
        thb = document.createElement("CANVAS");
        thb.id = "bufferCanvas";
        thb.width = width;
        thb.height = height * 2;
        thb.style.display = "none";
        thb.style.position = "absolute";
        $(playerLoc).append(thb);
        thc = document.createElement("CANVAS");
        thc.style.position = "absolute";
        thc.style.top = "0";
        thc.style.left = "0";
        thc.id = "talkingCanvas";
        thc.width = width;
        thc.height = height * 2;
        $(playerLoc).append(thc);
    }

    function createControls() {
        //------------------------------------------------------------PlayerBar
        jQuery('<div/>', {
            "id": 'PlayerBar',
        }).appendTo(playerLoc);
        playerBar = $("#PlayerBar");
        playerBar.css({
            "border": "2px solid " + color,
            "background": convertHex(color, opacity)
        });
        //-------------------------------------------------------Create Buttons
        $('<img />', {
            "id": "PlayPauseBtn",
            "src": buttonPath + "play.png",
            "title": "Play/Pause"
        }).appendTo($('#PlayerBar'));
        $('<img />', {
            "id": "muteBtn",
            "src": buttonPath + "volume.png",
            "title": "Volume"
        }).appendTo($('#PlayerBar'));
        $('<img />', {
            "id": "restart",
            "src": buttonPath + "restart.png",
            "title": "Restart Player"
        }).appendTo($('#PlayerBar'));
        $('<img />', {
            "id": "playerClose",
            "src": buttonPath + "exit.png",
            "title": "Close Player"
        }).appendTo($('#PlayerBar'));
        //Create Logo button
        var TalkingHeadsLogo = $('<img />', {
            "id": "Talking_Heads_Logo",
            "src": buttonPath + "logo.png",
            "title": "Visit Talking Heads",
            "href": "http://www.talkingheads.com/wix",
            "target": "_blank"
        });
        playerBar.append(TalkingHeadsLogo);
        playerBar.children().addClass('playerBtns');
        //---------------------------Player Btns size
        playerBar.children().addClass('playerBtns');
        $('.playerBtns').css({
            "width": btnWidth,
            "height": btnWidth
        });
        //------------------------------------Set PlayerBar width
        $('#playerClose').ready(function () {
            var pbWidth = $('#PlayerBar').width();
            var pbLeft = ((width - pbWidth) / 2) + "px";
            $('#PlayerBar').css("left", pbLeft);
        });
        ///----------------------------End Create player bar assets
        addListeners();
    }

    function startPlaying() {
        theCanvas = document.getElementById("talkingCanvas");
        outputCanvas = document.getElementById("bufferCanvas");
        try {
            thplayer.play();
            document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
        } catch (err) {}
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
            var theCanvas = document.getElementById("talkingCanvas"),
                ctx = theCanvas.getContext("2d"),
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

    function HTML5Autostart() {
        if (autostart === "Yes" || toLoop === true) {
            thplayer.oncanplay = function () {
                if (thplayer.paused === true) {
                    autostart = "cant auto play";
                    addBackground();
                }
            };
        }
        if (autostart === "Yes" || toLoop === true) {
            thplayer.autoplay = true;
            document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
            startPlaying();
        } else {
            addBackground();
        }
        if (exitoncomplete === "Yes") {
            thplayer.addEventListener("ended", closePlayer, false);
        }
    }

    function addListeners() {
        theParent = $("#talking_head_video");
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
        theParent.click(function (e) {
            if (e.target !== e.currentTarget) {
                console.log(e.target.id);
                if ($('#click-to-play').length > 0) {
                    if (e.target.id === "exitMain") {
                        closePlayer();
                    } else {
                        if (toMute) {
                            removeMuted();
                        }
                    }
                    playClick();
                }
                switch (e.target.id) {
                    case "playerClose":
                    case "exitMain":
                        closePlayer();
                        break;
                    case "PlayPauseBtn":
                        playToggle();
                        break;
                    case "muteBtn":
                        muteToggle();
                        break;
                    case "restart":
                        restartClick();
                        break;
                    case "Talking_Heads_Logo":
                        window.location.href = "http://www.talkingheads.video/wix";
                        break;
                    case "talkingCanvas":
                    case "talkinghead":
                        try {
                            document.getElementById("click-to-play").parentNode.removeChild(document.getElementById("click-to-play"));
                        } catch (err) {}
                        playToggle();
                        break;
                    case "imgLnk":
                    case "Spokesperson":
                    case "videoBtn":
                        iPhonePlay();
                        break;
                    case "talkinghead":
                        if (platform === "iPhone") {
                            iPhonePlay();
                        } else {
                            openLink();
                        }
                        break;
                }
            }
            e.stopPropagation();
        });
        try {
            thplayer.addEventListener("ended", videoEnded, false);
        } catch (err) {}
        try {
            iPhoneVideo.addEventListener("ended", iPhoneEnded, false);
        } catch (err) {}
    }

    function videoEnded() {
        $('#PlayPauseBtn').attr("src", buttonPath + "play.png");
        if (exitoncomplete === "Yes") {
            closePlayer();
        } else if (isDevice) {
            startBtnCreate();
        } else {
            addBackground();
        }
    }

    function playClick() {
        spokespersonImage.css({"display":"none"});
        thplayer.pause();
        try {
            document.getElementById("click-to-play").parentNode.removeChild(document.getElementById("click-to-play"));
        } catch (err) {}
        if (isDevice) {
            thplayer.play();
            document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
        } else {
            startPlaying();
        }
    }

    function playToggle() {
        if (thplayer.paused) {
            thplayer.play();
            document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
        } else {
            $('#PlayPauseBtn').attr("src", buttonPath + "play.png");
            thplayer.pause();
        }
    }

    function muteToggle() {
        if (thplayer.muted) {
            thplayer.muted = false;
            document.getElementById("muteBtn").src = buttonPath + "volume.png";
        } else {
            document.getElementById("muteBtn").src = buttonPath + "mute.png";
            thplayer.muted = true;
        }
    }

    function restartClick() {
        thplayer.currentTime = 0;
        document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
        playClick();
        thplayer.play();
    }

    function closePlayer() {
        thplayer.pause();
        clearInterval(playingS);
        playerLoc.empty();
        return;
    }

    function addBackground() {
        $(playerLoc).append($('<div />', {
            "height": height+ "px",
            "width": width + "px",
            "id": "spokespersonImage"
        }));
        spokespersonImage = $("#spokespersonImage");
        spokespersonImage.css({
            "background-image": gifBackground
        });
        startBtnCreate();
    }

    function iPhoneCreate() {
        imgLink = document.createElement("div");
        imgLink.style.width = iPhoneWidth + "px";
        imgLink.style.cursor = "pointer";
        imgLink.id = "imgLnk";
        imgLink.style.left = (width - iPhoneWidth) / 2 + "px";
        imgLink.style.top = "0px";
        iPhoneVideo = document.createElement("VIDEO");
        iPhoneVideo.id = "talkinghead";
        iPhoneVideo.src = hVideo;
        iPhoneVideo.style.width = iPhoneWidth + "px";
        iPhoneVideo.style.display = "none";
        iPhoneVideo.style.bottom = "0px";
        iPhoneVideo.style.left = "0px";
        iPhoneVideo.style.width = "0px";
        iPhoneVideo.style.position = "absolute";
        var img = document.createElement("img");
        img.src = actorGif;
        img.id = "Spokesperson";
        img.style.width = iPhoneWidth + "px";
        img.style.position = "absolute";
        var btnImg = document.createElement("img");
        btnImg.id = "videoBtn";
        btnImg.style.top = iPhoneWidth / 2 + "px";
        btnImg.style.width = iPhoneWidth + "px";
        btnImg.style.position = "absolute";
        $(playerLoc).append(imgLink);
        imgLink.appendChild(iPhoneVideo);
        imgLink.appendChild(img);
        imgLink.appendChild(btnImg);
        thplayer = document.getElementById("talkinghead");
    }

    function iPhoneEnded() {
        iPhoneVideo.style.display = "none";
    }

    function iPhonePlay() {
        iPhoneVideo.play();
        iPhoneVideo.style.display = "inherit";
    }

    function openLink() {
        $('#PlayPauseBtn').attr("src", buttonPath + "play.png");
        thplayer.pause();
        window.open(vidLink, openIn);
    }

    function removeMuted() {
        document.getElementById("muteBtn").src = buttonPath + "volume.png";
        toMute = false;
        toLoop = false;
        thplayer.muted = false;
        thplayer.loop = false;
        setTimeout(function () {
            restartClick();
        }, 150);
    }

    function startBtnCreate() {
        //Create click to play
        var startBtn = $('<div/>', {
            "id": "click-to-play",
            "alt": "Click to Play"
        });
        $(playerLoc).append(startBtn);
        $('#click-to-play').insertBefore('#spokespersonImage');
        $('#click-to-play').text("Click to Play");
        $('#click-to-play').ready(function () {
            if (opacity < 0.5) {
                clickOpacity = opacity + 0.5;
            } else {
                clickOpacity = 0.9;
            }
            $('#click-to-play').css({
                "border": "3px solid " + color,
                "background": convertHex(color, clickOpacity),
                "left": (playerLoc.outerWidth() - $('#click-to-play').outerWidth()) / 2 + "px",
                "top": "50%"
            });
        });
    }

    function convertHex(hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
        return result;
    }
}
