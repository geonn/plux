var mainView = null;

exports.construct = function(mv){
	mainView = mv;
};
exports.deconstruct = function(){  
	mainView = null;
};

exports.createAlert = function(tt,msg, callback){
	var box = Titanium.UI.createAlertDialog({
		title: tt,
		ok: 'OK',
		message: msg
	});
	box.show();
	box.addEventListener('click', function(e){
		console.log(e.index+" "+e.source.ok);
	    if (e.index == 0){
	    	console.log(typeof callback);
	    	if(typeof callback == "function"){
	    		callback && callback();
	    	}
	    }
  });
};
 
exports.showImageIndicator = function(){
	if(Ti.Platform.osname == "android"){
		var ind = Ti.UI.createActivityIndicator({  
		style:Ti.UI.ActivityIndicatorStyle.DARK,
		bottom:10,
		right:20,
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		zIndex: 11,
	  });
	}else{
	var ind = Ti.UI.createActivityIndicator({  
		style:Ti.UI.iPhone.ActivityIndicatorStyle.LIGHT,
		bottom:10,
		right:20,
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE,
		zIndex: 11,
	  });
	ind.show();
	}
	return ind;
};

exports.imageIndicatorEvent = function(theImage,activityIndicator){
	theImage.addEventListener('load', function(e) {
		activityIndicator.hide();
	});
};

exports.noRecord = function(){
	var data = [];
	var row = Titanium.UI.createTableViewRow({
		touchEnabled: false,
		backgroundColor: 'transparent' 
	});
		 
	var tblView = Ti.UI.createView({
		height: 'auto'//parseInt(Ti.Platform.displayCaps.platformHeight) -100
	}); 

	var noRecord = Ti.UI.createLabel({ 
		text: "No record found", 
		color: '#375540', 
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		 font:{fontSize:14,fontStyle:'italic'},
		top: 15,
		bottom:15,
		width: "100%"
	});
	tblView.add(noRecord); 
	row.add(tblView); 
	data.push(row);
	return data;
};

exports.showLoading = function(){ 
	mainView.loadingBar.opacity = "1";
	mainView.loadingBar.zIndex = "100";
	mainView.loadingBar.height = "120";
	 
	if(Ti.Platform.osname == "android"){
		//mainView.loadingBar.top =  (DPUnitsToPixels(Ti.Platform.displayCaps.platformHeight) / 2) -50; 
		mainView.loadingBar.height = Ti.UI.SIZE;
		mainView.activityIndicator.style = Ti.UI.ActivityIndicatorStyle.BIG;
		mainView.activityIndicator.top = 0; 
	}else if (Ti.Platform.name === 'iPhone OS'){
		mainView.loadingBar.top = (Ti.Platform.displayCaps.platformHeight / 2) -80; 
		mainView.activityIndicator.style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
	}
	mainView.activityIndicator.show();
};

exports.hideLoading = function(){ 
	mainView.activityIndicator.hide();
	mainView.loadingBar.opacity = "0";
	mainView.loadingBar.height = "0";
	mainView.loadingBar.top = "0"; 
};

exports.createCustomAlert = function(win, title, msg){
	var mask = Titanium.UI.createView({
		width: "100%",
		height: "100%",
		zIndex: 19,
		backgroundColor: "#000",
		opacity:0.45,
	});
	
	var box = Titanium.UI.createView({
		width: "90%",
		height: Ti.UI.SIZE,
		layout: "vertical",
		opacity:1.0,zIndex: 20,
	});
	var header = Titanium.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		backgroundColor: "#EA2035",
	});
	var head_title = Titanium.UI.createLabel({
		text: title,
		top: '20dp',
		left: '20dp',
		right: '20dp',
		bottom: '20dp',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
	});
	header.add(head_title);
	var content = Titanium.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		backgroundColor: "#fff",
		layout: "vertical",
	});
	var content_text = Titanium.UI.createLabel({
		text: msg,
		top: '20dp',
		left: '20dp',
		right: '20dp',
		bottom: '20dp',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
	});
	var okButton = Ti.UI.createButton({
		title: "ok",
		width: "100dp",
		height: "40dp",
		bottom: "20dp",
	});
	content.add(content_text);
	content.add(okButton);
	box.add(header);
	box.add(content);
	win.add(box);
	win.add(mask);
	okButton.addEventListener("click", function(){
		win.remove(box);
		win.remove(mask);
	});
};

exports.CheckboxwithText = function(text,highlightText, checkboxspecs, urlLink){
	var checkbox = this.createCheckbox({}, checkboxspecs);
	var label_sms = Titanium.UI.createLabel({
		text: text,
		width: "auto",
		height: Ti.UI.SIZE,
		font:{
			fontSize: 12
		}
	});
	var label_privacy = Titanium.UI.createLabel({
		text: highlightText,
		width: "auto",
		height: Ti.UI.SIZE,
		color: "#CE1D1C",
		font:{
			fontWeight: "bold",
			fontSize: 12
		}
	});
	var view_sms_box =  Titanium.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: "horizontal"
	});
	view_sms_box.add(checkbox);
	view_sms_box.add(label_sms);
	view_sms_box.add(label_privacy);
	label_privacy.addEventListener('touchend',function(){ 
		nav.navigationWindow("privacy");
	});
	return view_sms_box;
};

exports.createCheckbox = function(specs,checkboxspecs,image) {

    if(typeof checkboxspecs != "object")
        checkboxspecs = {};
    checkboxspecs.width = checkboxspecs.width || 25;
    checkboxspecs.backgroundColor = checkboxspecs.unCheckedColor || "white";
    checkboxspecs.height = checkboxspecs.height || 25;
    checkboxspecs.border = checkboxspecs.border || 1;
    checkboxspecs.borderColor = checkboxspecs.borderColor || "silver";
    var imageView = Ti.UI.createImageView({
        image:image || "images/checkbox.gif",
        height:checkboxspecs.height * 1.5,
        bottom:3 + checkboxspecs.height * 0.5,
        left:3 + checkboxspecs.width * 0.5,
        opacity:0
    }) ;

    var viw = Ti.UI.createView(checkboxspecs);
    specs.width =  checkboxspecs.width * 1.5;
    specs.height = checkboxspecs.height * 1.5;

    var outerview = Ti.UI.createView({
        width: specs.width * 1.5,
        height: specs.height * 1.5,
    });
    var clickview = Ti.UI.createView({
        width:checkboxspecs.width,
        height:checkboxspecs.height
    });
    outerview.add(viw);
    outerview.add(imageView);
    outerview.add(clickview);

    function togglecheck () {
        if(!viw.checked) {
            viw.checked = true;
            imageView.opacity = 1; 
        }
        else {
            viw.checked = false;
            imageView.opacity = 0; 
        }           
    }
    clickview.addEventListener("click",togglecheck);
    return outerview;
};