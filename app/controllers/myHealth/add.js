var args = arguments[0] || {};
var fields = args.fields;
var moment = require('alloy/moment');
console.log(fields);
init();

function init(){
	var model = Alloy.createCollection("health");
	render_field_type();
	$.date_text.value = moment(new Date()).format("YYYY-MM-DD HH:MM:SS");
	$.date_text.text = moment(new Date()).format("ddd, MMM DD, YYYY, hh:mm A");
	//refresh();
}
function render_field_type(){
	fields = fields.reverse();
	console.log(fields.length+" fields.length");
	for (var i=0; i < fields.length; i++) {
		console.log(i+" i value");
		console.log(fields[i]);
		var view_container = $.UI.create("View", {classes:['padding','wsize','hsize','vert'], top: 0, bottom:0});
		var view_left = $.UI.create("View", {classes:['wfill','small_padding'], height:40, top:10, bottom:10});
		var label_title = $.UI.create("Label", {classes:['wsize','hsize','h4'], left:0, text: fields[i].name});
		var view_hr = $.UI.create("View", {classes:['hr']});
		var default_value = (typeof fields[i].default_value != "undefined")?fields[i].default_value:"";
		view_left.add(label_title);
		if(fields[i].tool == "picker"){
			
			if(OS_IOS){
				var view_right = $.UI.create("View", {classes:['wsize','hsize'], right:0, value: default_value, record: fields[i]});
				view_left.add(view_right);
				var label_value = $.UI.create("Label", {classes: ['wsize','hsize','h4'], text: default_value, right: 30, touchEnabled: false});
				var img_down = $.UI.create("ImageView", {touchEnabled: false, right: 0, width: 10, height: 10, image: "/images/icons/sort-down.png", touchEnabled: false});
				
				view_right.add(label_value);
				view_right.add(img_down);
				view_right.addEventListener("click", openPicker);
			}else{
				console.log("1");
				var view_right = $.UI.create("View", {classes:['wsize','hsize'], right:0, value: default_value, record: fields[i]});
				if(fields[i].type == "number"){
					var min = (typeof fields[i].min_range != "undefined")?fields[i].min_range:0;
					var max = (typeof fields[i].max_range != "undefined")?fields[i].max_range:0;
					var options = _.range(min, max);
				}else if(fields[i].type == "string"){
					var options = fields[i].options;
				}
				console.log("1");
				var picker = $.UI.create("Picker", {bubbleParent: false});
				for (var j=0; j < options.length; j++) {
					var picker_row = $.UI.create("PickerRow", {title: options[j]});
					picker.add(picker_row);
					
					if(default_value == options[j]){
						picker.setSelectedRow(0, j, false);
					}
				};
				console.log("after this add");
				picker.addEventListener("change", function(e){
					console.log(e.source.parent);
					console.log(e.source.parent.value);
					console.log(e.row.title);
					e.source.parent.value = e.row.title;
					console.log(e.source.parent.value);
				});
				view_right.add(picker);
				view_left.add(view_right);
			}
		}else if(fields[i].tool == "textfield"){
			var textfield_value = $.UI.create("TextField", {classes:['hsize'], value: default_value, right: 0, width: 60});
			view_left.add(textfield_value);
		}else if(fields[i].tool == "remark"){
			var textfield_value = $.UI.create("TextField", {classes:['hsize','wfill'], value: default_value, left: 80, });
			view_left.add(textfield_value);
		}
		console.log("2");
		view_container.add(view_left);
		view_container.add(view_hr);
		console.log("2");
		$.container.insertAt({view: view_container, position:1});
		console.log("2");
	};
}

function openPicker(e){
	var field = e.source.record;
	console.log(field.type);
	console.log(e.source.children[0].text);
	if(field.type == "number"){
		var min = (typeof field.min_range != "undefined")?field.min_range:0;
		var max = (typeof field.max_range != "undefined")?field.max_range:0;
		var options = _.range(min, max);
	}else if(field.type == "string"){
		var options = field.options;
	}
	var view_mask = $.UI.create("View", {classes:['wfill','hfill'], backgroundColor: "#ffffff"});
	var picker = $.UI.create("Picker", {bubbleParent: false});
	var button_save  = $.UI.create("Button", {classes:['small_button', 'rounded'], left:20, right:20, top:20, width: Ti.UI.FILL, title: "Select"});
	
	for (var i=0; i < options.length; i++) {
		var label = $.UI.create("Label", {classes:['h4'], textAlign: "center", text: options[i]});
		var picker_row = $.UI.create("PickerRow", {value: options[i]});
		picker_row.add(label);
		picker.add(picker_row);
		
		if(e.source.children[0].text != "" && e.source.children[0].text == options[i]){
			picker.setSelectedRow(0, i, false);
		}
	};
	
	view_mask.add(picker);
	view_mask.add(button_save);
	$.win.add(view_mask);
	picker.addEventListener("change", function(ex){
		//alert(picker.getSelectedRow(0).title);
	});
	button_save.addEventListener("click", function(){
		e.source.children[0].text = picker.getSelectedRow(0).value;
		e.source.value = picker.getSelectedRow(0).value;
		e.source.record.default_value = picker.getSelectedRow(0).value;
		console.log(e.source.children[0].text);
		$.win.remove(view_mask); 
	});
}

function showDatePicker(e){ 

	if(OS_ANDROID){ 
		var datePicker = Ti.UI.createPicker({
			  type: Ti.UI.PICKER_TYPE_DATE,
			  id: "datePicker",
			  visible: false
		});
		datePicker.showDatePickerDialog({
			value: new Date(),
			callback: function(e) {
			if (e.cancel) { 
				} else {
					updateLabelDate(e);
				}
			}
		});
	}else{
		
		var view_mask = $.UI.create("View", {classes:['wfill','hfill'], backgroundColor: "#ffffff"});
		var picker_date = $.UI.create("Picker", {type: Ti.UI.PICKER_TYPE_DATE_AND_TIME, bubbleParent: false});
		var button_save  = $.UI.create("Button", {classes:['small_button', 'rounded'], left:20, right:20, top:20, width: Ti.UI.FILL, title: "Select"});
		view_mask.add(picker_date);
		view_mask.add(button_save);
		$.win.add(view_mask);
		picker_date.addEventListener("change", updateLabelDate);
		button_save.addEventListener("click", function(){$.win.remove(view_mask);});
	}
}

function updateLabelDate(e){
	var value = (OS_IOS)?e.source.value:e.value;
	console.log(value+" value");
	$.date_text.value = moment(value).format("YYYY-MM-DD HH:MM");
	$.date_text.text = moment(value).format("ddd, MMM DD, YYYY, hh:mm A");
}

function SaveRecord(){
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	
	var params = {
			u_id: u_id,
		    date: $.date_text.value,
		    type: args.type,
		    created : moment(new Date()).format("YYYY-MM-DD HH:MM:SS")
	};
	var all_field = $.container.getChildren();
	all_field.shift();
	all_field.pop();
	for (var i=0; i < all_field.length; i++) {
		if(all_field.length - 1 > i){
			console.log(all_field[i].children[0].children[1]);
			console.log(all_field[i].children[0].children[1].value);
			var fieldname = "field"+(i+1);
			params[fieldname] = all_field[i].children[0].children[1].value;
			console.log(params[fieldname]);
		}else{
			params["remark"] = all_field[i].children[0].children[1].value;
			console.log(params["remark"]);
		}
	};
	console.log(params);
	var model = Alloy.createCollection("health");
	model.saveArray([params]);
	$.win.close();
	API.callByPost({url: "syncHealthData", params:params}, function(responseText)	{
		var res = JSON.parse(responseText);
		console.log(res.data);
	});
}
  
$.win.addEventListener("close", function(e){
	Ti.App.fireEvent("myHealth:render_menu");
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
}