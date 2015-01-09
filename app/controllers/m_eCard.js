var args = arguments[0] || {};
var noThumbColors   = ['#555555','#cccccc'];
var noThumbColors2  = ['#ff0000','#000'];
var frontbackcounter = 0;

var front = Ti.UI.createImageView({
    name:"front",
    width:"100%",
    image:"/eCard-front.png",
    currentAngle: 10
});

var back = Ti.UI.createImageView({
    name:"back",
    width:"100%",
    image:"/eCard-back.png",
    currentAngle: 10
});

$.card.add(back);
$.card.add(front);

$.eCard.addEventListener('click', function() {
    var t;
    console.log(frontbackcounter%2);
    if (frontbackcounter%2 == 0) {
        t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
        $.card.animate({view:back,transition:t});
    } else {
        t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT;
        $.card.animate({view:front,transition:t});
    }
    frontbackcounter++;
});