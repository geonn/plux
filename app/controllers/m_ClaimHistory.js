var args = arguments[0] || {};
console.log(args);
var arg_category = (typeof args.category != "undefined")?args.category:"%";

var usersModel = Alloy.createCollection('claim_detail'); 
var data = usersModel.getClaimDetail({memno: args.memno, category: arg_category});

data.forEach(function(entry){
	console.log(entry);
	var row = $.UI.create("TableViewRow");
	var view_container = $.UI.create("View",{
		layout: "vertical",
		height: Ti.UI.SIZE,
		top: 10,
		right: 10,
		left: 10,
		bottom: 10,
	});
	
	var view_detail = $.UI.create("View",{
		height: Ti.UI.SIZE
	});
	
	var label_clinic = $.UI.create("Label",{
		classes: ['clinic_name'],
		text: entry.clinicname
	});
	
	var label_amount = $.UI.create("Label",{
		classes: ['amount'],
		text: "RM "+entry.amount
	});
	
	var label_date = $.UI.create("Label",{
		classes: ['date'],
		text: entry.visitdate
	});
	
	var label_name = $.UI.create("Label",{
		classes: ['category'],
		text: "Name: "+entry.name
	});
	
	var label_category = $.UI.create("Label",{
		classes: ['category'],
		text: "Category: "+entry.category
	});
	
	var label_mc = $.UI.create("Label",{
		classes: ['mc'],
		text: "MC Days: "+entry.mcdays
	});
	
	view_detail.add(label_clinic);
	view_detail.add(label_amount);
	
	view_container.add(view_detail);
	view_container.add(label_date);
	view_container.add(label_name);
	view_container.add(label_category);
	view_container.add(label_mc);
	row.add(view_container);
	$.tv.appendRow(row);
});