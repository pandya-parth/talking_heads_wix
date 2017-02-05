// Copyright 2016 Website Talking Heads
// JavaScript Document
function playerTH(playerValues) {
	"use strict";
	//Variables for Playereee
	var responsive = "yes", //You must place <div id="talking_head_video"></div> inside the div you want the video to be in.
		iPhoneWidth = 0, //When the above happens, the witdh of the image
		width = 320, //video width
		height = 320, //video height
		position = "fixed", //fixed or absolute positioning//fixed or absolute positioning
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
		exitoncomplete = playerValues.exit, //option for player to close after video completes. "yes" or "no"
		oncepersession = playerValues.session_play, //option for number of times video plays "yes", "no", or "onceonly"
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
		imagePath = path + "/",
		gifBackground = "url('" + imagePath + actorpic + "')",
		buttonPath = imagePath + "buttons" + "/",
		hVideo = path + "/" + canvasVideo,
		leftEnd = left.charAt(left.length - 1),
		overflow = "hidden",
		iOS = false,
		isDevice = false,
		isMobileDevice = (navigator.userAgent.match(/iPhone/i)),
		platform = navigator.platform,
		ua = navigator.userAgent.toLowerCase(),
		isAndroid = ua.indexOf("android") > -1,
		btnWidth = playerValues.btn_size,
		hasSeenLS, hasSeenSS, theParent, actorGif, iPhoneVideo, thplayer, spokespersonImage, thb, thv, playerBar, createTH, toPlay, playingS, outputCanvas, theCanvas, thc, imgLink = null, clickOpacity = 0.9,
		i10, toLoop, toMute = false,
		hasSeen = "hasSeen" + canvasVideo;
	delay = delay * 1000;
	actorGif = imagePath + actorpic;
	buttonPath = imagePath + "buttons" + "/";
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
		if (autostart !== "no" || autostart === "mute") {
			toPlay = true;
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
		setTimeout(function() {
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
		if (responsive === "yes") {
			createTH = document.getElementById("talking_head_video");
			createTH.style.position = "relative";
			createTH.style.left = "50%";
			createTH.style.marginLeft = (width / 2) * -1 + "px";
			createTH.style.top = "auto";
			createTH.style.bottom = 0;
		} else {
			createTH = document.createElement("div");
			createTH.id = "talking_head_video";
			createTH.style.position = position;
			createTH.style.marginLeft = centeroffset;
			createTH.style.left = left;
			createTH.style.right = right;
			createTH.style.marginLeft = centeroffset;
			createTH.style.top = divTop;
			createTH.style.bottom = bottom;
			var wthbody = document.body || document.getElementsByTagName("body")[0];
			wthbody.insertBefore(createTH, wthbody.childNodes[0]);
		}
		thv = document.getElementById("talking_head_video");
		createTH.style.height = height + "px";
		createTH.style.width = width + "px";
		createTH.style.cursor = "pointer";
		createTH.style.overflow = overflow;
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
		thv.appendChild(v);
		thplayer = document.getElementById("talkinghead");
		var p = document.createElement("p");
		p.innerHTML = "Your Browser does not support the <video> tag";
		v.appendChild(p);
	}

	function createCanvas() {
		thb = document.createElement("CANVAS");
		thb.id = "bufferCanvas";
		thb.width = width;
		thb.height = height * 2;
		thb.style.display = "none";
		thb.style.position = "absolute";
		thv.appendChild(thb);
		thc = document.createElement("CANVAS");
		thc.style.position = "absolute";
		thc.style.top = "0";
		thc.style.left = "0";
		thc.id = "talkingCanvas";
		thc.width = width;
		thc.height = height * 2;
		thv.appendChild(thc);
	}

	function createControls() {
		$(playerLoc).append('<div id="playerHolder"/>');
		$('#playerHolder').css({
			"position": "relative",
			"left": "0",
			"bottom": "0",
			"width": width + "px",
			"height": height + "px"
		});
		///add exit btn if needed
		if (exitbtn === true) {
			$('<img />', {
				"id": "exitMain",
				"width": "16px",
				"src": buttonPath + "exit.png"
			}).appendTo($('#playerHolder'));
			$('#exitMain').css({
				"margin-left": (width - 20) + "px",
				"margin-top": "-2px"
			});
		}
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
			"title": "Visit Talking Heads"
		});
		var theLink = $('a', {
            "id": "theLink",
			"title": "Visit Talking Heads",
			"href": "http://www.talkingheads.com/wix",
			"target": "_blank"
		});
		playerBar.append(TalkingHeadsLogo);
		TalkingHeadsLogo.append(theLink);
        playerBar.children().addClass('playerBtns');
		//---------------------------Player Btns size
		playerBar.children().addClass('playerBtns');
		$('.playerBtns').css({
			"width": btnWidth,
			"height": btnWidth
		});
		//------------------------------------Set PlayerBar width
		$('#playerClose').ready(function() {
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
				playingS = setInterval(function() {
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
		if (autostart === "yes" || toLoop === true) {
			thplayer.oncanplay = function() {
				if (thplayer.paused === true) {
					autostart = "cant auto play";
					addBackground();
				}
			};
		}
		if (autostart === "yes" || toLoop === true) {
			thplayer.autoplay = true;
			document.getElementById("PlayPauseBtn").src = buttonPath + "pause.png";
			startPlaying();
		} else {
			addBackground();
		}
		if (exitoncomplete === "yes") {
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
		theParent.click(function(e){
			if (e.target !== e.currentTarget) {
				if (toMute) {
					removeMuted();
				}
				switch (e.target.id) {
					case "PlayPauseBtn":
							playToggle();
						break;
					case "muteBtn":
						muteToggle();
						break;
					case "restart":
						restartClick();
						break;
					case "playerClose":
					case "htmlClose":
						closePlayer();
						break;
					case "click-to-play":
					case "spokespersonImage":
						playClick();
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
		if (exitoncomplete === "yes") {
			closePlayer();
		} else if (isDevice) {
			startBtnCreate();
		} else {
			addBackground();
		}
	}

	function playClick() {
		try {
			spokespersonImage.style.display = "none";
		} catch (err) {}
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
		try {
			thv.parentNode.removeChild(document.getElementById("talking_head_video"));
		} catch (err) {}
		return;
	}

	function addBackground() {
		spokespersonImage = document.createElement("DIV");
		spokespersonImage.id = "spokespersonImage";
		spokespersonImage.style.backgroundImage = gifBackground;
		spokespersonImage.style.backgroundRepeat = "no-repeat";
		spokespersonImage.style.position = "absolute";
		spokespersonImage.style.cursor = "pointer";
		spokespersonImage.style.height = height + "px";
		spokespersonImage.style.width = width + "px";
		thv.insertBefore(spokespersonImage, thv.firstChild);
		spokespersonImage = document.getElementById("spokespersonImage");
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
		thv.appendChild(imgLink);
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
		document.getElementById("muteBtn").src = buttonPath + "VolumeBtn.png";
		toMute = false;
		toLoop = false;
		thplayer.muted = false;
		thplayer.loop = false;
		setTimeout(function() {
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
        $('#click-to-play').ready(function(){
            if(opacity<0.5){
                clickOpacity =opacity +0.5;
            }
            $('#click-to-play').css({
                "border": "3px solid " + color,
                "background": convertHex(color, clickOpacity),
                "left":(playerLoc.outerWidth()-$('#click-to-play').outerWidth())/2 + "px",
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