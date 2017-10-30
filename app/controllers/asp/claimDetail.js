var args = arguments[0] || {}; 
var arg_serial = (typeof args.serial != "undefined")?args.serial:0;
var loading = Alloy.createController("loading");
if(args.appcode.charAt(0) != "T"){
	if(OS_IOS){
		$.win.setRightNavButton(null);
	}else{
		$.recepit.hide();
	} 
}
$.win.add(loading.getView());
loading.start();
API.claimDetailBySeries({serial : arg_serial}, init);
var model = Alloy.createCollection('claim_detail'); 
var appcode = "";
common.construct($);

function init(data){ 
	
	//var data = model.getClaimDetailBySeries({serial : arg_serial});  
	
	$.tv.appendRow(createTableViewRow("Clinic Name", args.record.clinicname || ""));
	//$.tv.appendRow(createTableViewRow("Patient Name", data.name));
	$.tv.appendRow(createTableViewRow("Date Visit", args.record.visitdate || ""));
	$.tv.appendRow(createTableViewRow("Category", args.record.category || ""));
	$.tv.appendRow(createTableViewRow("MC Days", args.record.mcdays || ""));
	$.tv.appendRow(createTableViewRow("Diagnosis", data.diagnosis || ""));
	 
	/**if(data.cliniccode == "QLAB"){ 
		var attachment_button = $.UI.create("Button", {title: "Lab Test Result", classes:['wfill', 'hsize', 'padding'], borderColor: "red", color: "red", align: "center"});
		var row = $.UI.create("TableViewRow", {classes: ['hsize']});
		row.add(attachment_button);
		attachment_button.addEventListener("click", openReport);
		$.tv.appendRow(row);
	}
	**/
	var section = Ti.UI.createTableViewSection({headerTitle: "Amount"});
	
	var totalAmount = (typeof data.amount != "undefined")?data.amount:"";
	
 	appcode = data.appcode;
	if(totalAmount != ""){
		section.add(createTableViewRow("Total Amount", "RM"+data.amount));
	}
	section.add(createTableViewRow("Consultation", "RM"+((typeof data.consultation_amt == "undefined" || data.consultation_amt <= 0)?"0":data.consultation_amt)));
	section.add(createTableViewRow("Medication", "RM"+((typeof data.medication_amt == "undefined" || data.medication_amt <= 0)?"0":data.medication_amt), data.medication));
	section.add(createTableViewRow("Injection", "RM"+((typeof data.injection_amt == "undefined" || data.injection_amt <= 0)?"0":data.injection_amt), data.injection));
	section.add(createTableViewRow("Lab Test", "RM"+((typeof data.labtest_amt == "undefined" || data.labtest_amt <= 0)?"0":data.labtest_amt), data.labtest));
	section.add(createTableViewRow("X-Ray", "RM"+((typeof data.xray_amt == "undefined" || data.xray_amt <= 0)?"0":data.xray_amt), data.xray));
	section.add(createTableViewRow("Surgical", "RM"+((typeof data.surgical_amt == "undefined" || data.surgical_amt <= 0)?"0":data.surgical_amt), data.surgical));
	section.add(createTableViewRow("Extraction", "RM"+((typeof data.extraction_amt == "undefined" || data.extraction_amt <= 0)?"0":data.extraction_amt)));
	section.add(createTableViewRow("Fillings", "RM"+((typeof data.fillings_amt == "undefined" || data.fillings_amt <= 0)?"0":data.fillings_amt)));
	section.add(createTableViewRow("Scaling", "RM"+((typeof data.scaling_amt == "undefined" || data.scaling_amt <= 0)?"0":data.scaling_amt)));
	section.add(createTableViewRow("Others", "RM"+((typeof data.others_amt == "undefined" || data.others_amt <= 0)?"0":data.others_amt)));
	section.add(createTableViewRow("Bps", data.bps));
	section.add(createTableViewRow("Bpd", data.bpd));
	section.add(createTableViewRow("Pulse", data.pulse));
	$.tv.appendSection(section);
	loading.finish();
}

function createTableViewRow(text, value, dialog){
	
	if(text != ""){
		text = (typeof text != "number")?text.replace(/^\s+|\s+$/g, ""):text;
	}
	
	
	var row = $.UI.create("TableViewRow",{
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
	});
	
	if(text == "Clinic Name"){
		var view = $.UI.create("View",{
			layout:"vertical",
			height: Ti.UI.SIZE,
			width: Ti.UI.FILL,
			top: 10,
			bottom: 10,
			left: 10,
			right: 10	
		});
	}else{
		var view = $.UI.create("View",{
			height: Ti.UI.SIZE,
			width: Ti.UI.FILL,
			top: 10,
			bottom: 10,
			left: 10,
			right: 10	
		});
	}
	
	
	var label_text = $.UI.create("Label",{
		classes: ['themeColor'],
		height:Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		left: 0,
		text: text
	});
	
	var label_value = $.UI.create("Label",{
		height:Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		right: 0,
		text: value
	});
	
	view.add(label_text);
	view.add(label_value);
	row.add(view);
	row.addEventListener("click", function(e){
		var dialogs = Ti.UI.createAlertDialog({
			message: dialog || "No record found",
			ok: 'Ok',
			title: text
		});
		dialogs.show();
	});
	
	return row;
}


function openReport(){
	var url = "https://qlab.aspmedic.com/"+appcode+".pdf";
	
	if(OS_IOS){
		var win = Alloy.createController("webview", {url: url}).getView();
		win.open();
	}else{
		var PDF = require('pdf'); 
		PDF.createPdf(url, true, "", "", "", function(err, file, base, url){
			PDF.android_launch(file);
		});
	}
}

function openReceipt(){
	var img_path = "https://tslip.aspmedic.com/"+appcode+".png";
	lightBox(img_path);
}

function lightBox(img_path){
	common.lightbox({img_path: img_path}, $.win);
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
}

$.win.addEventListener("close", function(){
});