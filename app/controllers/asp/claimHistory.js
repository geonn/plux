var args = arguments[0] || {}; 
var arg_name = (typeof args.name != "undefined")?args.name:"%";
var title = (arg_name == "%")?"All Claim Records":arg_name;
var nav = require('navigation');
if(Ti.Platform.osname == "android"){
	 
	$.pageTitle.text = title;
}else{
	$.claim_history.title = title;
}
var claimDetailModel = Alloy.createCollection('claim_detail'); 
var data = claimDetailModel.getClaimDetail({memno: args.memno, name: arg_name}); 
data.reverse();
data.forEach(function(entry){
	//console.log(entry);  
	var row = $.UI.create("TableViewRow",{ 
		height: 130, 
	});
	 
	var statusColor = "#CE1D1C";
	if(entry.status == "Pending"){ //Pending 
		statusColor = "#8A6500";
	}else if(entry.status == "Approved"){ //Approved 
		statusColor = "#2C8A00";
	} 
	
	var horzView = $.UI.create('View',{
		classes: ['horz', 'hsize','wfill'], 
		serial: entry.serial 
	});
	
	var statustView = $.UI.create('View',{ 
		height: 130, 
		serial: entry.serial,
		width: 10,
		backgroundColor: statusColor
	});
	horzView.add(statustView);
		
	var view_container = $.UI.create("View",{
		classes: ['vert','hsize'],
		width: "auto", 
		claimType:entry.claimType,
		serial: entry.serial,
		top: 5,
		right: 5,
		left: 5,
		bottom: 5,
	});
	 
	var view_detail = $.UI.create("View",{
		height: 40,
		classes: ['wfill'], 
		serial: entry.serial,
		claimType:entry.claimType
	});
	
	
	var labelClinicView = $.UI.create("View",{ 
		height: Ti.UI.SIZE,
		serial: entry.serial,
		height: 45,
		top:0,
		claimType:entry.claimType
	});
	
	var label_clinic = $.UI.create("Label",{ 
		classes: ['h5','bold'],
		text:entry.clinicname,
		claimType:entry.claimType,
		top: 0,
		left: 0,
		width: "70%", 
		serial: entry.serial,
	});
	labelClinicView.add(label_clinic);
	
	var label_amount = $.UI.create("Label",{
		classes: ['amount','bold'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "RM "+ (entry.amount).toFixed(2)
	});
	
	var view_detail2 = $.UI.create("View",{ 
		serial: entry.serial,
		claimType:entry.claimType,
		classes: [ "hsize"]
	});
	
	var label_category = $.UI.create("Label",{
		classes: ['h5','hsize','wsize','left-align'],
		serial: entry.serial,
		left:0,
		claimType:entry.claimType,
		text: "Category: "+entry.category
	});
	
 
	var label_date = $.UI.create("Label",{ 
		serial: entry.serial,
		claimType:entry.claimType,
		text: timeFormat(entry.visitdate),
		right: 10,
		classes: ['h5','hsize','wsize','right-align'],
	}); 
 
	var label_name = $.UI.create("Label",{
		classes: ['h5','hsize','wfill','left-align'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "Claim Under: "+entry.name
	});
	 
	
	var label_mc = $.UI.create("Label",{
		classes: ['mc'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "MC Days: "+entry.mcdays
	});
	var claim_type_text = (entry.claimType == "Reimbursement")?entry.claimType:entry.claimType+" [Detail]";
	var label_claimType = $.UI.create("Label",{
		classes: ['h5','hsize','wfill','left-align'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "Claim Type: "+claim_type_text
	});
	
	/**var label_status = $.UI.create("Label",{
		classes: ['mc'],
		serial: entry.serial,
		claimType:entry.claimType,
		text: "Status: "+entry.status
	});**/
	
	view_detail.add(labelClinicView);
	view_detail.add(label_amount);
	view_detail2.add(label_category);
	view_detail2.add(label_date);
	view_container.add(view_detail);
	view_container.add(view_detail2);
	view_container.add(label_name); 
	view_container.add(label_mc);
	view_container.add(label_claimType);
	//view_container.add(label_status);
	horzView.add(view_container);
	row.add(horzView);
	$.tv.appendRow(row);
	
	view_container.addEventListener("click", function(e){
		if(e.source.claimType == "Reimbursement"){ 
			nav.navigateWithArgs("asp/claimSubmission", {serial: e.source.serial, edit:1});
			//common.createAlert('Claim Details', 'Sorry, the claim details is not available.');
			return false;
		}else{ 
			nav.navigateWithArgs("asp/claimDetail", {serial: e.source.serial});
		}
		
	});
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.claim_history); 
	});
}