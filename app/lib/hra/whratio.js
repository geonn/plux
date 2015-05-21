var $ = null;  
var form = null;

exports.title = "Waist-To-Hips Ratio Calculator";

exports.construct = function(mv){
	$ = mv;
	form = [];
};

exports.description = function(){
	var label_desc1 = $.UI.create("Label", {
		classes: ['title'],
		text: "Waist-To-Hips Ratio Calculator"
	});
	
	var label_desc2 = $.UI.create("Label", {
		classes: ['paragraph'],
		text: "To determine if you have a healthy waist to hips ratio, use a measuring tape to measure the circumference of your hips at the widest part of your buttocks. Then measure your waist at the smaller circumference of your natural waist, usually just above the belly button. "
	});
	
	var label_desc3 = $.UI.create("Label", {
		classes: ['title'],
		top: 10,
		text: "Are you an apple or a pear?"
	});
	
	var label_desc4 = $.UI.create("Label", {
		classes: ['paragraph'],
		text: "To determine the ratio, divide your waist measurement by your hip measurement. Research shows that people with \"apple-shaped\" bodies (with more weight around the waist) face more health risks than those with \"pear-shaped\" bodies who carry more weight around the hips. "
	});
	
	var view_container = $.UI.create("View", {
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: "vertical"
	});
	
	view_container.add(label_desc1);
	view_container.add(label_desc2);
	view_container.add(label_desc3);
	view_container.add(label_desc4);
	
	return view_container;
	//mainView.recordsTextArea.setHeight("100%");
};

exports.input_box = function(){
	var view_header = $.UI.create("View", {
		classes: ['header_view'] 
	});
	
	var label_header_text = $.UI.create("Label", {
		classes: ['header_text'],
		text: "Enter your waist and hips circumference to calculate :",
	});
	
	view_header.add(label_header_text);
	
	var view_inputbox = $.UI.create("View", {
		backgroundColor: "#efefef",
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: "vertical"
	});
	view_inputbox.add(view_header);
	view_inputbox.add(addForm("Waist Circumference (cm)", "TextField"));
	view_inputbox.add(addForm("Hips Circumference (cm)", "TextField"));
	
	var button_submit = $.UI.create("Button",{
		title: "Calculate",
		top: 10,
		width: 100,
		height: 50,
		backgroundColor: "#ff0000",
		borderColor: "#cccccc",
		color: "#ffffff"
	});
	view_inputbox.add(button_submit);
	
	var view_container = $.UI.create("View", {
		left: 10,
		right: 10,
		top: 10,
		bottom: 10,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: "vertical"
	});
	
	view_container.add(view_inputbox);
	
	button_submit.addEventListener("click", function(e){
		for(a = 0; a < form.length; a++){
			console.log(form[a].value);
		}
		formular();
	});
	
	return view_container;
};

/*
 	private function
 * */

function addForm(text, type){
	if(type == "TextField"){
		var label_textfield = $.UI.create("Label", {
			text: text,
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
		});
		
		var cancel = Titanium.UI.createButton({
		     backgroundImage: "/images/btn-down.png",
		     textAlign: "right",
		     right: 0,
		     width: 20,
		     height: 20  
		});
		
		cancel.addEventListener("click", function(e){
			for(a = 0; a < form.length; a++){
				form[a].blur();
			}
		});
		
		var keyboardToolbarButtons = Ti.UI.iOS.createToolbar({
			 items : [cancel],
			 right: 5,
			 width: 20,
		     height: 20
		});
		
		var textField = $.UI.create("TextField", {
			width: Ti.UI.FILL,
			height: 40,
			borderColor: "#cccccc",
			keyboardToolbar : keyboardToolbarButtons,
			
		});
		
		var view_textfield = $.UI.create("View", {
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			left: 10,
			right: 10,
			top: 10,
			bottom: 10,
			layout: "vertical",
		});
		
		form.push(textField);
		
		view_textfield.add(label_textfield);
		view_textfield.add(textField);
		
		return view_textfield;
	}
}

function formular(){
	var waist = form[0].value;
	var hips = form[1].value;
	
	var result = waist / hips;
	var result = result.toFixed(2);
	
	if(result <= 0.75){
		resultPopUp("RESULT", "Your Waist-To-Hip Ratio "+result+" \n\nEXECELLENT\n\nYour waist to hips circumference is within the ideal range. Well done. But it can be easy to let yourself slip so try to stay within this range and maintain a healthy weight to help keep your chances of developing heart disease and diabetes low.");
	}else if(result <= 0.80){
		resultPopUp("RESULT", "Your Waist-To-Hip Ratio "+result+" \n\nGOOD\n\nYour waist to hips circumference is within the ideal range. Well done. But it can be easy to let yourself slip so try to stay within this range and maintain a healthy weight to help keep your chances of developing heart disease and diabetes low. ");
	}else if(result <= 0.85){
		resultPopUp("RESULT", "Your Waist-To-Hip Ratio "+result+" \n\nAVERAGE\n\nYour waist to hip circumference is slightly above the ideal range. However these ratings may not be appropriate for all age and ethnic groups. Whether you are in doubt or have an increased risk, speak to your doctor to make sure and learn more about how you can lower your risks of developing conditions such as heart disease and diabetes.");
	}else if(result <= 0.90){
		resultPopUp("RESULT", "Your Waist-To-Hip Ratio "+result+" \n\nHIGH\n\nYour waist to hip circumference suggests your body shape and weight are putting you at increased risk of developing conditions such as heart disease and diabetes. We hope you take this opportunity to talk to your doctor about how you can take steps to reach and maintain a healthy weight and improve your heart health risk with healthy eating and regular physical activity.");
	}else{
		resultPopUp("RESULT", "Your Waist-To-Hip Ratio "+result+" \n\nEXTREME\n\nYour waist to hip circumference suggests your body shape and weight are putting you at increased risk of developing conditions such as heart disease and diabetes. We hope you take this opportunity to talk to your doctor about how you can take steps to reach and maintain a healthy weight and improve your heart health risk with healthy eating and regular physical activity. ");
	}
}

function resultPopUp(title, msg){
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
		title: "OK",
		width: "100dp",
		backgroundColor: "#ff0000",
		height: "40dp",
		bottom: "20dp",
	});
	content.add(content_text);
	content.add(okButton);
	box.add(header);
	box.add(content);
	console.log('yes');
	$.win.add(box);
	$.win.add(mask);
	okButton.addEventListener("click", function(){
		$.win.remove(box);
		$.win.remove(mask);
	});
};
