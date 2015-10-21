var args = arguments[0] || {};
var loading = Alloy.createController("loading");
var data = [];
var cards = [];
var cardContent = [];
var index = 0;
var scrolling = false;
//scrollview init
var a = {
  move: function(x, y, curve, duration, delay) {
    return Ti.UI.createAnimation({
      left: x,
      top: y,
      curve: curve,
      duration: duration,
      delay: delay
    });
  },
  
  x: function(x, duration, delay) {
    return Ti.UI.createAnimation({
      left: x,
      curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,
      duration: duration,
      delay: delay
    });
  }
  
};

if(Titanium.Platform.osname == "android"){
	//var temp = (value * 100) / 320; 
	//var pWidth = parseInt((Alloy.Globals.platformWidth * temp) / 100);
	var pw = Ti.Platform.displayCaps.platformWidth;
	var ldf = Ti.Platform.displayCaps.logicalDensityFactor;
	var pWidth = parseInt(pw / (ldf || 1), 10);
	console.log(pWidth);
}else{
	var pWidth = Ti.Platform.displayCaps.platformWidth;
}
var panelWidth = Math.floor(pWidth*0.7) ;
console.log(panelWidth);
var leftPadding = (pWidth - panelWidth) / 2;

var scrollView = Ti.UI.createView({
	left: leftPadding,
	top: 0
});

var scrollViewDrag = Ti.UI.createView({
  left:  0,
  top:   0,
  right: 0,
  bottom: 0,
});

//define view and card template

var cardTemplate = {
	backgroundColor: 'orange'
};

init();

function render_card(entry){
	var front = Ti.UI.createView({
	    name:"front",
	    width: Ti.UI.FILL,
	    height: Ti.UI.SIZE,
	    id: entry.id,
	    top: 0,
	    currentAngle: 10,
	});
	
	var memno_text = Ti.UI.createLabel({
		classes:['wsize','hsize'],
	    text: entry.memno,
	    top: "70dp",
	    left: "10dp",
	    zIndex: 12,
	    font:{
	    	fontSize: "12dp"
	    },
	    color: "#ffffff"
	});
	var name_text = Ti.UI.createLabel({
		classes:['wsize','hsize'],
	    text: entry.name,
	    top: "55dp",
	    left: "10dp",
	    zIndex: 12,
	    font:{
	    	fontSize: "12dp"
	    },
	    color: "#ffffff"
	});

	var imageview_card = Ti.UI.createImageView({
		classes:['wfill','hsize'],
	    image:"/images/eCard-front.png",
	});
	
	front.add(imageview_card);
	front.add(name_text);
	front.add(memno_text);
		
	return front;
}

/*
 Render e-card listing
 * */
function render_ecard_list(){
	$.inner_box.removeAllChildren();

	for (var i=0; i < data.length; i++) {
		console.log(panelWidth+" "+Math.floor(pWidth*0.65));
		var viewTemplate = {
			height: 150,
			id: data[i].id,
			width: Math.floor(pWidth*0.65),
			opacity: 0,
		};
		cards.push(Ti.UI.createView(viewTemplate));
	    cardContent.push(render_card(data[i]));
	    cards[cards.length - 1].left = (panelWidth * (cards.length - 1)) + ((panelWidth - cards[cards.length - 1].width) / 2);
	    cards[cards.length - 1].add(cardContent[cards.length - 1]);
	    scrollView.add(cards[cards.length - 1]);
	    cards[cards.length - 1].animate({ opacity: 1, duration: 500 });
	}
	scrollView.width = panelWidth * cards.length;
	$.inner_box.add(scrollView);
	$.inner_box.add(scrollViewDrag);
	
	//eventlistener
	var x = 0;
	var dragStartTime = 0;
	
	scrollViewDrag.addEventListener('dblclick', function(e) {
		navToEcard();
	});
	if(OS_IOS){
		scrollViewDrag.addEventListener('click', function(e) {
			navToEcard();
		});
	}
	scrollViewDrag.addEventListener('touchstart', function(e) {
	  x = e.x;
	  dragStartTime = new Date().getTime();
	});
	scrollViewDrag.addEventListener('touchmove', function(e) {
	  scrollView.left = (-1 * index * panelWidth + leftPadding) + e.x - x;
	});
	scrollViewDrag.addEventListener('touchend', function(e) {
	  var dragEndTime = new Date().getTime();
	  if (dragEndTime - dragStartTime < 200 && e.x < x - 20) { nextCard(); }
	  else if (dragEndTime - dragStartTime < 200 && e.x > x + 20) { prevCard(); }
	  else if (e.x < x - cards[index].width/2) { nextCard(); }
	  else if (e.x > x + cards[index].width/2) { prevCard(); }
	  else { scrollTo(index); }
	});
	
	scrollView.addEventListener('touchCancel', function() {
	  scrollTo(index);
	});
}

function scrollTo(i) {
  if (cards[i]) {
    scrollView.animate(a.x(-1 * i * panelWidth + leftPadding, 300, 0));
    index = i;
    return true;
  } else {
    scrollTo(index);
    return false;
  }
}

function nextCard() {
  scrollTo(index + 1);
}

function prevCard() {
  scrollTo(index - 1);
}

function revealCard(i) {
  if (!cards[i].revealed) {
    cardContent[i].backgroundColor = 'blue';
    cards[i].revealed = true;
  }
}

function navToEcard(){
	console.log(cards[index].id+" u_id");
	nav.navigateWithArgs("asp/eCard", {u_id: cards[index].id});  
}

/*
 Page refresh
 * */
function refresh(){
	loading.start();
	var usersModel = Alloy.createCollection('users'); 
	data = usersModel.getUserByEmpNo();
	render_ecard_list();
	loading.finish();
}

/*
 Controller init
 * */
function init(){
	$.inner_box.add(loading.getView());
	refresh();
	/*
	var user = usersModel.getOwnerData(); 
 	 
	if(user.isver == "true"){ 
	 
		$.unverified.hide();
		$.card.opacity = "1";
		
	}else{
		var t1 = Ti.UI.create2DMatrix({ 
		    rotate: 335
		});
		var a1 = Ti.UI.createAnimation();
		a1.transform = t1;
		 
		$.unveriLbl.animate(a1);
		$.unverified.show();
		$.card.opacity = "0.1";
	}  */ 
}

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

Ti.App.addEventListener('eCard_list:refresh',refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('eCard_list:refresh',refresh);
	$.destroy();
});

 
if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	}); 
}