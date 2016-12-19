var args = arguments[0] || {};
var u_id = args.u_id || 0;
var noThumbColors   = ['#555555','#cccccc'];
var noThumbColors2  = ['#ff0000','#000'];
var frontbackcounter = 0;
common.construct($);
var usersModel = Alloy.createCollection('users'); 
var user = usersModel.getOwnerData(u_id); 
var qrcode = require('qrcode');
var loading = Alloy.createController('loading');
$.win.add(loading.getView());
init();

function init(){
	var user = usersModel.getOwnerData(u_id); 
 	 
	if(user.isver == "true" || user.isver > 0){ 
	 
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
	}   
} 

function checkStatus(){
	var asp_email = Ti.App.Properties.getString('asp_email');
	var asp_password = Ti.App.Properties.getString('asp_password');	 
	if(asp_email){
		Ti.App.addEventListener('loadPage', init);
		loading.start();
		//API.doLogin(asp_email, asp_password, $, login_callback);
		API.callByPost({url:"loginUrl", params: {LOGINID: asp_email, PASSWORD: asp_password}}, login_callback);
	}
} 

function login_callback(responseText){
	var res = JSON.parse(responseText); 
	res = res[0];
	if(typeof res.message != "undefined" && res.message != null){
   		 common.createAlert("Error",res.message);
   		 loading.finish();
   }else{
   	
   }
}

var front = Ti.UI.createView({
    name:"front",
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    top: 0,
    currentAngle: 10,
});

var memno_text = Ti.UI.createLabel({
    text: user.memno,
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: "105dp",
    left: "20dp",
    zIndex: 12,
    font:{
    	fontSize: "14dp"
    },
    color: "#ffffff"
});
var name_text = Ti.UI.createLabel({
    text: user.name,
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: "90dp",
    left: "20dp",
    zIndex: 12,
    font:{
    	fontSize: "14dp"
    },
    color: "#ffffff"
});
var ic_text = Ti.UI.createLabel({
    text: user.ic,
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    top: "125dp",
    right: "20dp",
    zIndex: 12,
    font:{
    	fontSize: "14dp"
    },
    color: "#ffffff"
});

var front_bg = Ti.UI.createImageView({
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    image:"/images/eCard-front.png",
    font:{
    	fontSize: "11dp"
    },
    zIndex: 11,
    top: 0,
    bottom: 10
});

front.add(front_bg);
front.add(name_text);
//front.add(ic_text);
front.add(memno_text);

var back = Ti.UI.createImageView({
    name:"back",
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    image:"/images/eCard-back.png",
    currentAngle: 10,
    top: 0,
});



var userIc = user.icno || "";	 

var genCode = setInterval(function(){
	
	var dateTimeNow = currentDateTime();
	var userQR = qrcode.QRCode({
		typeNumber: 10,
		errorCorrectLevel: 'M'
	});
	
	var qrcodeView = userQR.createQRCodeView({
		width: 200,
		height: 200,
		margin: 4, 
		text: user.name+"||"+user.id+"||"+ user.icno+"||"+user.memno+"||"+user.empno+"||"+user.relation+"||"+ user.corpcode+"||" +user.corpname+"||" +user.costcenter+"||" +user.dept+"||"  +user.allergy+"||" +user.isver+"||" +user.verno+"||"+dateTimeNow+"||"+Ti.App.Properties.getString('cardno')    
 
	}); 
 	//removeAllChildren($.qrCode);
 	$.qrCode.removeAllChildren();
	$.qrCode.add(qrcodeView);
},1000);

//$.card.add(back);
$.card.add(front);


var cover = Ti.UI.createView({ 
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE,
    backgroundColor:"#ffffff", 
    opacity: "0.5",
    zIndex: 100,
    top: 0,
});
$.mainContainer.add(cover);

$.card.addEventListener('click', function(e) {
	 
    var t; 
    if (frontbackcounter%2 == 0) {
        //t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
        //$.card.animate({view:back, transition:t});
        rotate_box($.card, frontbackcounter%2);
    } else {
        //t = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT;
        //$.card.animate({view:front, transition:t});
        rotate_box($.card, frontbackcounter%2);
    }
    frontbackcounter++; 
});

function rotate_box(view_selected, back2front){
	//var m_front_to_back = Ti.UI.create3DMatrix();
	if(Ti.Platform.osname == "android"){
		var matrix2d = Ti.UI.create2DMatrix();
		var m_front_to_back = matrix2d.scale(0);
	}else{
		var m_front_to_back = Ti.UI.create3DMatrix();
		m_front_to_back = m_front_to_back.rotate(-180, 0, 1, 0);
	}
	var a_front_to_back = Ti.UI.createAnimation({
        transform: m_front_to_back,
        duration: 200,
        box: view_selected
    });
    view_selected.animate(a_front_to_back);
    a_front_to_back.addEventListener('complete', function() {
        Ti.API.info('showFront: Animating the back to the front.');
		a_front_to_back.removeEventListener('complete',function(){});
		
        if(Ti.Platform.osname == "android"){
			var matrix2d = Ti.UI.create2DMatrix();
			var m_front_to_back = matrix2d.scale(1);
		}else{
			var m_front_to_back = Ti.UI.create3DMatrix();
			m_front_to_back = m_front_to_back.rotate(0, 0, 1, 0);
		}
        var a_back_to_front = Ti.UI.createAnimation({
            transform: m_front_to_back,
            duration: 200,
            curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
        });
		var back = Ti.UI.createImageView({
		    name:"back",
		    width: Ti.UI.FILL,
		    height: Ti.UI.SIZE,
		    image:"/images/eCard-back.png",
		    currentAngle: 10,
		    top: 0,
		});
		if(back2front){
			view_selected.remove(view_selected.children[1]);
		}else{
			//removeAllChildren(view_selected);
			view_selected.add(back);
		}
        view_selected.animate(a_back_to_front);
    });
}

function orientationchange(e){
	Ti.API.info('Ti.Platform.displayCaps.platformHeight: ' + Ti.Platform.displayCaps.platformHeight);
	Ti.API.info('Ti.Platform.displayCaps.platformWidth: ' + Ti.Platform.displayCaps.platformWidth);
    if (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight){ 
        // do something 
        name_text.top  = "160dp";
        name_text.left = "80dp";
        memno_text.top     = "125dp";
   		memno_text.left   = "80dp";
        // $.card.width = "480";
        // $.card.height = "306";
    }else{
    	name_text.top = "125dp" ;
   		name_text.left= "20dp" ;
   		memno_text.top     = "90dp";
   		memno_text.left   = "20dp";
    } 
}

/**/
Ti.Gesture.addEventListener('orientationchange', orientationchange);

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.eCard); 
	}); 
}
 
$.eCard.addEventListener("close", function(){
	console.log("close ecard");
	Ti.App.removeEventListener('loadPage', init);
	Ti.Gesture.removeEventListener('orientationchange', orientationchange);
	clearInterval(genCode);
});
