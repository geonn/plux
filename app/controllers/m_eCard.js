var args = arguments[0] || {};
var noThumbColors   = ['#555555','#cccccc'];
var noThumbColors2  = ['#ff0000','#000'];
var frontbackcounter = 0;

var front = Ti.UI.createView({
    name:"front",
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    top: 0,
    currentAngle: 10,
});

var memno_text = Ti.UI.createLabel({
    text:"6000 2010 0011 3572",
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: "90dp",
    left: "20dp",
    zIndex: 12,
    font:{
    	fontSize: "24dp"
    },
    color: "#ffffff"
});
var name_text = Ti.UI.createLabel({
    text:"CHEONG SHY YNG",
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: "125dp",
    left: "20dp",
    zIndex: 12,
    font:{
    	fontSize: "11dp"
    },
    color: "#ffffff"
});
var ic_text = Ti.UI.createLabel({
    text: "858512102934",
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: "125dp",
    right: "20dp",
    zIndex: 12,
    font:{
    	fontSize: "11dp"
    },
    color: "#ffffff"
});

var front_bg = Ti.UI.createImageView({
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    image:"/eCard-front.png",
    currentAngle: 10,
    font:{
    	fontSize: "11dp"
    },
    zIndex: 11,
    top: 0
});

front.add(front_bg);
front.add(name_text);
front.add(ic_text);
front.add(memno_text);

var back = Ti.UI.createImageView({
    name:"back",
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    image:"/eCard-back.png",
    currentAngle: 10,
    top: 0,
});

$.card.add(back);
$.card.add(front);

$.card_event.addEventListener('click', function() {
    var t;
    console.log(frontbackcounter%2);

    if (frontbackcounter%2 == 0) {
        t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
        $.card.animate({view:back, transition:t});
    } else {
        t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
        $.card.animate({view:front, transition:t});
    }
    frontbackcounter++; 
});

/*
Ti.Gesture.addEventListener('orientationchange', function(e){
    if (e.orientation === Ti.UI.LANDSCAPE_RIGHT || e.orientation === Ti.UI.LANDSCAPE_LEFT){ 
        // do something 
        console.log('landscape');
        $.card.width = "480";
        $.card.height = "306";
    }else{
    	 console.log('portrait');
    	$.card.width = "320";
    	$.card.height = "204";
    }
});*/