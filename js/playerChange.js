// JavaScript Document
function playerChange(){
    "use strict";
    var playerValues;
      $.getJSON('example.json', function (data) {
          playerValues = data;
    console.log(playerValues);
  });
        $('#PlayerBar').css({
            "border": "2px solid " + playerValues.color,
            "background": convertHex(playerValues.color, playerValues.opacity)
        });
    $('#talkinghead').attr({
        "volume":playerValues.volume,
        "src":playerValues.video,
        "poster": playerValues.video
    });
    
    function convertHex(hex, opacity) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);

        var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
        return result;
    }
}