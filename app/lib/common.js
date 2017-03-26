var mainView = null;
var time_offset = 0;

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
	    if (e.index == 0){ 
	    	if(typeof callback == "function"){
	    		callback && callback();
	    	}
	    }
  });
};

exports.lightbox = function(data, win){
	var mask = Ti.UI.createImageView({
		image: "/images/transparent-bg.png",
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		zIndex: 99,
	});
	
	var zoomable = Ti.UI.createScrollView({
		top: 20,
		right: 20,
		left: 20,
		bottom: 20,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		contentHeight: "auto",
		contentWidth: Ti.UI.FILL,
		showVerticalScrollIndicator: true,
    	showHorizontalScrollIndicator: true,

	    //Here you can determine the max and min zoom scale
	    maxZoomScale: 100,
	    minZoomScale: 1,
		zIndex: 100
	});
	
	var img = Ti.UI.createImageView({
		image: data.img_path,
		zIndex: 100,
		enableZoomControls: true,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE
	});
	
	zoomable.add(img);
	zoomable.addEventListener("click", function(e){
		win.remove(mask);
		win.remove(zoomable);
	});
	
	mask.addEventListener("click", function(e){
		win.remove(mask);
		win.remove(zoomable);
	});
	win.add(mask);
	win.add(zoomable);
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
		style:Ti.UITi.UI.ActivityIndicatorStyle.DARK.ActivityIndicatorStyle.LIGHT,
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
	mainView.loadingBar.zIndex = "200";
	mainView.loadingBar.height = Ti.UI.SIZE;
	mainView.activityIndicator.style = Ti.UI.ActivityIndicatorStyle.BIG; 
	mainView.activityIndicator.show();
};

exports.hideLoading = function(){ 
	mainView.activityIndicator.hide();
	mainView.loadingBar.opacity = "0";
	mainView.loadingBar.height = "0";
	//mainView.loadingBar.top = "0"; 
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
		var win = Alloy.createController(urlLink ).getView();  
		win.open(); 
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
    checkboxspecs.checked = false;
    console.log(checkboxspecs.height * 1.5);
    console.log(checkboxspecs.height * 0.5);
    console.log(checkboxspecs.width * 0.5);
    var imageView = Ti.UI.createImageView({
        image:"/images/checkbox.gif",
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
    	console.log(viw.checked+" ehre");
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


exports.resultPopUp = function(title, msg){
	var mask = Titanium.UI.createView({
		width: "100%",
		height: "100%",
		zIndex: 999,
		backgroundColor: "#000",
		opacity:0.45,
	});
	
	var box = mainView.UI.create('View',{
		classes : ['hsize','vert'],
		width: "90%", 
		opacity:1.0,zIndex: 1999,
	});
	var header = mainView.UI.create('View',{
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		backgroundColor: "#CE1D1C",
	});
	var head_title = mainView.UI.create('Label',{
		text: title,
		classes: ['padding'],
		color: "#ffffff", 
	});
	header.add(head_title);
	var content = mainView.UI.create('View',{
		classes : ['hsize','wfill','vert'], 
		backgroundColor: "#fff", 
	});
	var content_text = mainView.UI.create('Label',{
		classes : ['hsize','wfill','padding'], 
		text: msg 
	});
	
	var btnView = mainView.UI.create('View',{
		classes : ['hsize','wfill'],  
		backgroundColor: "#fff", 
		textAlign: 'center' 
	});
	var okButton = Ti.UI.createButton({ 
		title: "OK",
		width: "30%",
		backgroundColor: "#F1F1F1",
		borderColor: "#CE1D1C",
		color: "#CE1D1C",
		borderRadius: 10,
		height: Ti.UI.SIZE,
		bottom: "20dp",
	});
	 
	btnView.add(okButton); 
	content.add(content_text);
	content.add(btnView);
	box.add(header);
	box.add(content); 
	mainView.win.add(box);
	mainView.win.add(mask);
	okButton.addEventListener("click", function(){
		mainView.win.remove(box);
		mainView.win.remove(mask);
	}); 
};

exports.sync_time = function(time){ 
	var a = time.trim();
	a = a.replace("  ", " ");
	var b = a.split(" ");
	var date = b[0].split("-");
	var time = b[1].split(":"); 
	var s_date = new Date(date[0], date[1]-1, date[2],time[0],time[1],time[2]);
	var now = new Date();
	var s = Date.parse(s_date.toUTCString());
	var l = Date.parse(now.toUTCString());
	 
	time_offset = s-l; 
};

exports.now = function(){
	//var today = new Date();
	var today = new Date(Date.now()+time_offset);
	//today.setTime(today.getTime() + time_offset);
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var sec = today.getSeconds();
	if (minutes < 10){
		minutes = "0" + minutes;
	} 
	if (sec < 10){
		sec = "0" + sec;
	} 
	if (hours < 10){
		hours = "0" + hours;
	} 
	
	if(dd<10) {
	    dd='0'+dd;
	} 
	
	if(mm<10) {
	    mm='0'+mm;
	} 
	
	datetime = yyyy+'-'+mm+'-'+dd + " "+ hours+":"+minutes+":"+sec;
 
	return datetime ;
};