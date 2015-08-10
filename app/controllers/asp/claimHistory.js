var args = arguments[0] || {}; 
var arg_name = (typeof args.name != "undefined")?args.name:"%";
var title = (arg_name == "%")?"All Claim Records":arg_name;
if(Ti.Platform.osname == "android"){
	console.log($.pageTitle);
	$.pageTitle.text = title;
}else{
	$.claim_history.title = title;
}
var claimDetailModel = Alloy.createCollection('claim_detail'); 
var data = claimDetailModel.getClaimDetail({memno: args.memno, name: arg_name});
console.log(data);
data.forEach(function(entry){  
	var row = $.UI.create("TableViewRow");
	var view_container = $.UI.create("View",{
		layout: "vertical",
		height: Ti.UI.SIZE,
		claimType:entry.claimType,
		serial: entry.serial,
		top: 10,
		right: 10,
		left: 10,
		bottom: 10,
	});
	
	var view_detail = $.UI.create("View",{
		height: Ti.UI.SIZE,
		serial: entry.serial,
		claimType:entry.claimType
	});
	
	var label_clinic = $.UI.create("Label",{
		classes: ['clinic_name'],
		text: entry.clinicname,
		claimType:entry.claimType,
		serial: entry.serial,
	});
	
	var label_amount = $.UI.create("Label",{
		classes: ['amount'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "RM "+ (entry.amount).toFixed(2)
	});
	
	var label_date = $.UI.create("Label",{
		classes: ['date'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: entry.visitdate
	});
	
	var label_name = $.UI.create("Label",{
		classes: ['category'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "Name: "+entry.name
	});
	
	var label_category = $.UI.create("Label",{
		classes: ['category'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "Category: "+entry.category
	});
	
	var label_mc = $.UI.create("Label",{
		classes: ['mc'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "MC Days: "+entry.mcdays
	});
	
	var label_claimType = $.UI.create("Label",{
		classes: ['mc'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "Claim Type: "+entry.claimType
	});
	
	var label_status = $.UI.create("Label",{
		classes: ['mc'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "Status: "+entry.status
	});
	
	view_detail.add(label_clinic);
	view_detail.add(label_amount);
	
	view_container.add(view_detail);
	view_container.add(label_date);
	view_container.add(label_name);
	view_container.add(label_category);
	view_container.add(label_mc);
	view_container.add(label_claimType);
	view_container.add(label_status);
	row.add(view_container);
	$.tv.appendRow(row);
	
	view_container.addEventListener("click", function(e){
		if(e.source.claimType == "Reimbursement"){
			common.createAlert('Claim Details', 'Sorry, the claim details is not available.');
			return false;
		}else{
			var nav = require('navigation');
			nav.navigateWithArgs("asp/claimDetail", {serial: e.source.serial});
		}
		
	});
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.claim_history); 
	});
}