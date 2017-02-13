Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, onSettingsUpdate);
// You can get the style params programmatically, un-comment the following snippet to see how it works:
//Wix.Styles.getStyleParams(style => {
// console.log(style);
// });

// You can also get the style every time it changes, try this:
Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, style => {
    "use strict";
    console.log(style);
    Wix.getSiteInfo(function (siteInfo) {
        var isEditor = siteInfo.url;
        if (isEditor.indexOf("editor") > 0) {
            console.log(isEditor);
            $('#PlayerBar').css({
                "opacity": 1
            });
        }
    });
    if (style.booleans.exit_btn === true) {
        if ($('#exitMain').length) {} else {
            $('<img />', {
                "id": "exitMain",
                "width": "16px",
                "src": "thvideo/buttons/exit.png"
            }).appendTo($('#playerHolder'));
        }
    } else {
        $('#exitMain').remove();
    }
    var color = style.colors.bgColor.value;
    setColorOpacity(color);
    var btnWidth = style.numbers.btn_size + "px";
        $('.playerBtns').css({
            "width": btnWidth,
            "height": btnWidth
        });
            var pbWidth = $('#PlayerBar').width();
            var width = $('#talking_head_video').width();
            var pbLeft = ((width - pbWidth) / 2) + "px";
            $('#PlayerBar').css("left", pbLeft);
});

function onSettingsUpdate(update) {
    "use strict";
    console.log(update);
    update = stringify(update);
    $('.json').html(update);
    updateCompHeight();
}

function updateCompHeight(height) {
    "use strict";
    const desiredHeight = height || document.documentElement.scrollHeight;
    Wix.setHeight(desiredHeight);
}

function stringify(input) {
    "use strict";
    try {
        return JSON.stringify(input, null, 4);
    } catch (err) {
        return input;
    }
}

function setColorOpacity(color) {
    "use strict";
    $('#PlayerBar').css({
        "border": "2px solid " + borderColor,
        "background": color
    });
    var borderColor = rgb2hex(color);
    $('#click-to-play').css({
        "border": "3px solid " + borderColor,
        "background": color
    });
}

function rgb2hex(orig) {
    "use strict";
    var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
}
