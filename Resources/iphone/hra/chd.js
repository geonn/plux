var $ = null;  
var form = null;
var form_label = null;
var count = null;

exports.title = "Coronary Heart Disease 10-Year Risk Calculator";

exports.construct = function(mv){
	$ = mv;
	form = [];
	form_label = [];
	count = 0;
};

exports.description = function(){
	var label_desc1 = $.UI.create("Label", {
		classes: ['title'],
		text: "What is Coronary Heart Disease ?"
	});
	
	var label_desc2 = $.UI.create("Label", {
		classes: ['paragraph'],
		text: "Coronary heart disease (CHD) is a disease in which a waxy substance called plaque (plak) builds up inside the coronary arteries. These arteries supply oxygen-rich blood to your heart muscle. When plaque builds up in the arteries, the condition is called atherosclerosis (ATH-er-o-skler-O-sis). The buildup of plaque occurs over many years. "
	});
	
	var label_desc3 = $.UI.create("Label", {
		classes: ['paragraph'],
		text: "\nCoronary heart disease is the most common type of heart disease. In Malaysia, CHD is the #1 cause of death for both men and women. Lifestyle changes, medicines, and medical procedures can help prevent or treat CHD. These treatments may reduce the risk of related health problems. \nThis risk assessment tool below uses information from the Framingham Heart Study to predict a person’s chance of having a heart attack in the next 10 years. This tool is designed for adults aged 20 and older who do not have heart disease or diabetes. \nDiabetes Mellitus is considered as CHD (coronary heart disease) equivalent. For CHD and CHD equivalent, the 10 year risk> 20%. To find your risk score, enter your information in the calculator below. "
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
	
	return view_container;
	//mainView.recordsTextArea.setHeight("100%");
};

exports.input_box = function(){
	var view_header = $.UI.create("View", {
		classes: ['header_view'] 
	});
	
	var label_header_text = $.UI.create("Label", {
		classes: ['header_text'],
		text: "Choose your answers to calculate :",
	});
	
	view_header.add(label_header_text);
	
	var view_inputbox = $.UI.create("View", {
		backgroundColor: "#efefef",
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: "vertical"
	});
	view_inputbox.add(view_header);
	view_inputbox.add(addForm("Your Age", "TextField"));
	view_inputbox.add(addForm("Your Gender", "Picker", ['Male', 'Female']));
	view_inputbox.add(addForm("Total Cholesterol (mg/dL)", "Picker", ['Less than 160', '160-199', '200-239','240-279','280 & above']));
	view_inputbox.add(addForm("Smoking Status", "Picker", ['Non-smoker', 'Smoker']));
	view_inputbox.add(addForm("HDL Cholesterol (mg/dL)", "Picker", ['Less than 40', '40-49', '50-59', '60 & above']));
	view_inputbox.add(addForm("Systolic Blood Pressure", "Picker", ['Less than 120', '120-129', '130-139', '140-159', '160 & aove']));
	
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
		formular();
	});
	
	return view_container;
};

/*
 	private function
 * */

function addForm(text, type, options){
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
		if(Ti.Platform.osname == "android"){
			var textField = $.UI.create("TextField", {
				width: Ti.UI.FILL,
				height: 40,  
				backgroundColor : "#ffffff",
				borderRadius : 5
			});
		}else{
			var keyboardToolbarButtons = Ti.UI.iOS.createToolbar({
				 items : [cancel],
				 right: 5,
				 width: 20,
			     height: 20
			});
			
			var textField = $.UI.create("TextField", {
				width: Ti.UI.FILL,
				height: 40,  
				keyboardToolbar : keyboardToolbarButtons,
				backgroundColor : "#ffffff",
				borderRadius : 5
			});
		}
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
		count++;
		form_label.push([]);
		return view_textfield;
	}else if(type == "Picker"){
		var data = [];
		var label_picker = $.UI.create("Label", {
			text: text,
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
		});
		var picker = $.UI.create("Picker", {
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			counter: count,
			bottom: 0
		});
		var label_picker_value = $.UI.create("Label", {
			text: options[0],
			counter: count,
			mod: 0,
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			left: 10,
			right: 10,
			top: 10,
			bottom: 10,
		});
		
		var view_border_pv = $.UI.create("View",{
			backgroundColor: "#ffffff",
			borderCorder: "#dddddd",
			borderRadius:10,
			text: options[0],
			counter: count,
			height: Ti.UI.SIZE,
		});
		
		view_border_pv.add(label_picker_value);
		
		label_picker_value.addEventListener("click", function(e){
			var index = e.source.counter;
			$.picker.add(form[index]);
			form[index].addEventListener("change", formEvent);
		});
		
		function formEvent(ex){
			form_label[ex.source.counter].text = ex.row.title;
			$.picker.removeAllChildren();
			ex.source.removeEventListener("change", formEvent);
			form[ex.source.counter].setSelectedRow(0, ex.rowIndex);
		}
		
		for(var a = 0; a < options.length; a++){
			var row = Ti.UI.createPickerRow({title: options[a]});
			data.push(row);
		}
		picker.add(data);
		
		var view_picker = $.UI.create("View", {
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			left: 10,
			right: 10,
			top: 10,
			bottom: 10,
			layout: "vertical",
		});
		
		form.push(picker);
		form_label.push(label_picker_value);
		
		view_picker.add(label_picker);
		view_picker.add(view_border_pv);
		count ++;
		return view_picker;
	}
}

function formular(){
	var weight = form[0].value;
	var height = form[1].value;
	
	var result = weight / ((height/100) * (height/100));
	var result = result.toFixed(2);
	
	if(result <= 18.5){
		resultPopUp("RESULT", "Your BMI "+result+" \n\nUNDERWEIGHT\n\nYou are under weight for your height. It's important to aim to keep within your healthy weight range. Being in the healthy weight range will improve your body's ability to fight off infection or illness.");
	}else if(result <= 23){
		resultPopUp("RESULT", "Your BMI "+result+" \n\nHEALTHY RANGE\n\nYou are a healthy range for your height. Aim to keep within the ideal weight range by eating a healthy, well-balanced diet and exercising regularly. Most adults should be active for 30 minutes on most days. ");
	}else if(result <= 27.5){
		resultPopUp("RESULT", "Your BMI "+result+" \n\nOVERWEIGHT\n\nBeing overweight increases your risk of developing coronary heart disease, as well as other health conditions such as diabetes. Keeping to a healthy weight will help you control your blood pressure and cholesterol levels. You lose weight if the amount of energy coming into your body is less than what is being used up by your body. Aim to exercise more and eat a healthy balanced diet. ");
	}else{
		resultPopUp("RESULT", "Your BMI "+result+" \n\nOBESE\n\nBeing obese increases your risk of developing coronary heart disease, as well as other health conditions such as diabetes. Keeping to a healthy weight will help you control your blood pressure and cholesterol levels. You lose weight if the amount of energy coming into your body is less than what is being used up by your body. Aim to exercise more and eat a healthy balanced diet. ");
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
		color: "#ffffff",
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
		backgroundColor: "#CE1D1C",
		color: "#ffffff",
		height: "40dp",
		bottom: "20dp",
	});
	content.add(content_text);
	content.add(okButton);
	box.add(header);
	box.add(content); 
	$.win.add(box);
	$.win.add(mask);
	okButton.addEventListener("click", function(){
		$.win.remove(box);
		$.win.remove(mask);
	});
};
