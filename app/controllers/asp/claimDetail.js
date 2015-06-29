var args = arguments[0] || {}; 
var arg_serial = (typeof args.serial != "undefined")?args.serial:0;

API.claimDetailBySeries({serial : arg_serial});
var usersModel = Alloy.createCollection('claim_detail'); 
common.construct($); 
common.showLoading();
//var data = usersModel.getClaimDetailBySeries({serial : arg_serial});

Ti.UI.addEventListener("load_claim_detail", init);

function init(){

	var data = usersModel.getClaimDetailBySeries({serial : arg_serial});  
	$.tv.appendRow(createTableViewRow("Clinic Name", data.clinicname));
	$.tv.appendRow(createTableViewRow("Patient Name", data.name));
	$.tv.appendRow(createTableViewRow("Date Visit", data.visitdate));
	$.tv.appendRow(createTableViewRow("Category", data.category));
	$.tv.appendRow(createTableViewRow("MC Days", data.mcdays));
	$.tv.appendRow(createTableViewRow("Diagnosis", data.diagnosis));
	var section = Ti.UI.createTableViewSection({headerTitle: "Amount"});
	
	var totalAmount = (typeof data.amount != "undefined")?data.amount:"";
 
	if(totalAmount != ""){
		section.add(createTableViewRow("Total Amount", "RM"+(data.amount).toFixed(2)));
	} 
	section.add(createTableViewRow("Consultation", "RM"+(data.consultation_amt).toFixed(2)));
	section.add(createTableViewRow("Medication", "RM"+(data.medication_amt).toFixed(2), data.medication));
	section.add(createTableViewRow("Injection", "RM"+(data.injection_amt).toFixed(2), data.injection));
	section.add(createTableViewRow("Lab Test", "RM"+(data.labtest_amt).toFixed(2), data.labtest));
	section.add(createTableViewRow("X-Ray", "RM"+(data.xray_amt).toFixed(2), data.xray));
	section.add(createTableViewRow("Surgical", "RM"+(data.surgical_amt).toFixed(2), data.surgical));
	section.add(createTableViewRow("Extraction", "RM"+(data.extraction_amt).toFixed(2)));
	section.add(createTableViewRow("Fillings", "RM"+(data.fillings_amt).toFixed(2)));
	section.add(createTableViewRow("Scaling", "RM"+(data.scaling_amt).toFixed(2)));
	section.add(createTableViewRow("Others", "RM"+(data.others_amt).toFixed(2)));
	section.add(createTableViewRow("Bps", data.bps));
	section.add(createTableViewRow("Bpd", data.bpd));
	section.add(createTableViewRow("Pulse", data.pulse));
	$.tv.appendSection(section);
	common.hideLoading();
}

function createTableViewRow(text, value, dialog){
	if(value != ""){
		value = (typeof value != "number")?value.replace(/^\s+|\s+$/g, ""):value;
	}
	
	if(text != ""){
		text = (typeof text != "number")?text.replace(/^\s+|\s+$/g, ""):text;
	}
	
	
	var row = $.UI.create("TableViewRow",{
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
	});
	
	var view = $.UI.create("View",{
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		top: 10,
		bottom: 10,
		left: 10,
		right: 10	
	});
	
	var label_text = $.UI.create("Label",{
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
	if(dialog){
		row.addEventListener("click", function(e){
			var dialogs = Ti.UI.createAlertDialog({
				message: dialog,
				ok: 'Ok',
				title: text
			});
			dialogs.show();
		});
	}
	
	return row;
}
