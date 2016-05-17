var $ = null;  
var form = null;
var form_label = null;
var count = null;

exports.title = "Diabetes Risk Calculator";

exports.construct = function(mv){
	$ = mv;
	form = [];
	form_label = [];
	count = 0;
};

exports.description = function(){
	var label_desc1 = $.UI.create("Label", {
		classes: ['title'],
		text: "Are you at risk for Diabetes?"
	});
	
	var label_desc2 = $.UI.create("Label", {
		classes: ['paragraph'],
		text: "Diabetes is a major lifestyle disease and there is an alarming rise of its incidence in the world. However 50% (183 million) of the people with diabetes are undiagnosed. Research on diabetes suggests that uncontrolled and untreated diabetes have grave short and long-term consequences including blindness, heart disease, nerve disease and kidney disease. Check to find out if you are at risk for developing diabetes by using this calculator. "
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
	view_inputbox.add(addForm("Your Age", "Picker", ['Please select','Less than 35', '35 to 49', '50 and above']));
	view_inputbox.add(addForm("Your Waist Circumference", "Picker", ['Please select','Less than 35 Inches', '35 to 39 Inches', 'Greater than 39 Inches']));
	view_inputbox.add(addForm("Daily Routine", "Picker", ['Please select','No regular exercise', 'Mild exercise', 'Moderate exercise', 'Regular exercise']));
	view_inputbox.add(addForm("Family History of Diabetes", "Picker", ['Please select','No family history', 'One of my parent diabetic', 'Both of my parent diabetic']));
	
	var button_submit = $.UI.create("Button",{
		title: "Calculate",
		top: 10,
		bottom: 10,
		width: 100,
		height: 50,
		backgroundColor: "#CE1D1C",
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
		
		if(Ti.Platform.osname == "android"){
			var picker = $.UI.create("Picker", {
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
				counter: count,
				row_value: 0,
				bottom: 0
			});
			
			picker.addEventListener("change", androidformEvent);
			
			function androidformEvent(ex){
				//form[ex.source.counter].setSelectedRow(0, ex.rowIndex);
				form[ex.source.counter].row_value = ex.rowIndex; 
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
			
			view_picker.add(label_picker);
			view_picker.add(picker);
		}else{
			var picker = $.UI.create("Picker", {
				width: Ti.UI.FILL,
				height: Ti.UI.SIZE,
				counter: count,
				row_value: 0,
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
				form[ex.source.counter].row_value = ex.rowIndex; 
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
		}
		count ++;
		return view_picker;
	}
}

function formular(){
	var total_score = 0; 
	switch(form[0].row_value){
		case 0: 
			total_score = -100;
			break;
		case 1: 
			total_score += 0;
			break;
		case 2:
			total_score += 20;
			break;
		case 3:
			total_score += 30;
			break;
	}
	
	switch(form[1].row_value){
		case 0: 
			total_score = -100;
			break;
		case 1: 
			total_score += 0;
			break;
		case 2:
			total_score += 20;
			break;
		case 3:
			total_score += 30;
			break;
	}
	
	switch(form[2].row_value){
		case 0: 
			total_score = -100;
			break;
		case 1: 
			total_score += 30;
			break;
		case 2:
			total_score += 20;
			break;
		case 3:
			total_score += 10;
			break;
		case 4:
			total_score += 0;
			break;
	}
	
	switch(form[3].row_value){
		case 0: 
			total_score = -100;
			break;
		case 1: 
			total_score += 0;
			break;
		case 2:
			total_score += 10;
			break;
		case 3:
			total_score += 20;
			break;
	} 
	if(total_score < 0){
		common.createAlert("Error","You must answer all the questions above");
		return false;	 
	}
	if(total_score <= 30){
		resultPopUp("RESULT", "You have a Low Risk for diabetes. Stay fit and healthy by doing regularly exercise of moderate intensity like swimming, gardening or brisk walking. Follow a well balanced diet with low fat content. If you are over 35 years of age, we recommend that you check your blood glucose level at least once in every three years.");
	}else if(total_score <= 60){
		resultPopUp("RESULT", "You have a Moderate Risk for diabetes. Walk briskly for half an hour daily to reduce your risk by 30%. Cut down the intake of sugary drinks as they drastically increase your risk. Choose a diet rich in whole grains to protect your body against diabetes. If you are over 35 years of age, we recommend that you check your blood glucose level at least once in every three years.");
	}else{
		resultPopUp("RESULT", "You have a High Risk for diabetes.\nWe recommend the following preventive measures:\n-   Consult your physician to plan an exercise regime\n- Choose a diet rich in whole grains and low in calories\n- We advice you to take the Oral Glucose Tolerance Test (OGTT) at one of the recommended diagnostic centres or hospitals\n- It is recommended that you check your glucose levels more frequently (once in 4 to 6 months)");
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
		backgroundColor: "#F1F1F1",
		borderColor: "#CE1D1C",
		color: "#CE1D1C",
		borderRadius: 10,
		height: Ti.UI.SIZE,
		bottom: "20dp",
	});
	content.add(content_text);
	content.add(okButton);
	box.add(header);
	box.add(content); 
	$.hraDetailsWin.add(box);
	$.hraDetailsWin.add(mask);
	okButton.addEventListener("click", function(){
		$.hraDetailsWin.remove(box);
		$.hraDetailsWin.remove(mask);
	});
};
