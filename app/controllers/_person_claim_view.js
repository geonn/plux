var args = arguments[0] || {};
var data = args.claim_data;
var name = args.name;
$.name.text = name;

for(var a = 0; data.length > a; a++){
	var benefit_view = $.UI.create("View", {
		classes: ["padding"],
		height: Titanium.UI.SIZE ,
		bottom: 0,
	});
	var benefit_label = $.UI.create("Label", {
		classes: ["benefit_label"],
		height: Titanium.UI.SIZE ,
		text: data[a]['benefittype']
	});
	benefit_view.add(benefit_label);
	var line = $.UI.create("View",{
		classes:["line"],
	});
	$.main.add(benefit_view);
	$.main.add(line);
	
	if(data[a]['entidv'] != 99999){
		var val = (data[a]['entidv'] == 9999)?"Unlimited":"RM"+data[a]['entidv'];
		var view = create_field(val, "Personal");
		$.main.add(view);
	}
	
	if(data[a]['entidvbal'] != 99999){
		var view = create_field("RM"+data[a]['entidvbal'], "Personal "+data[a]['entTitle']);
		//$.main.add(view);
	}
	
	if(data[a]['entsha'] != 99999){
		var val = (data[a]['entsha'] == 9999)?"Unlimited":"RM"+data[a]['entsha'];
		var view = create_field(val, "Shared");
		$.main.add(view);
	}
	
	if(data[a]['entshabal'] != 99999){
		var view = create_field("RM"+data[a]['entshabal'], "Shared "+data[a]['entTitle']);
		//$.main.add(view);
	}
	
	if(data[a]['maxperclaim'] != 99999){
		var val = (data[a]['maxperclaim'] == 9999)?"Unlimited":"RM"+data[a]['maxperclaim'];
		var view = create_field(val, "Max Per Claim");
		$.main.add(view);
	}
	
	if(data[a]['vstidv'] != 99999){
		var val = (data[a]['vstidv'] == 9999)?"Unlimited":"RM"+data[a]['vstidv'];
		var view = create_field(val, "Visitation");
		$.main.add(view);
	}
	
	if(data[a]['vstidvbal'] != 99999){
		var view = create_field(data[a]['vstidvbal'], "Visitation "+data[a]['vstTitle']);
		//$.main.add(view);
	}
	
	if(data[a]['vstsha'] != 99999){
		var val = (data[a]['vstsha'] == 9999)?"Unlimited":"RM"+data[a]['vstsha'];
		var view = create_field(val, "Visitation Shared");
		$.main.add(view);
	}
	
	if(data[a]['vstshabal'] != 99999){
		var view = create_field(data[a]['vstshabal'], "Visitation Shared "+data[a]['vstTitle']);
		//$.main.add(view);
	}
}

function create_field(key, title){
	var view = $.UI.create("View",{
		classes: ["small_padding"],
		height: Titanium.UI.SIZE ,
		width: Ti.UI.FILL,
	});
	
	var entidv_label = $.UI.create("Label", {
		text: title,
		height: Titanium.UI.SIZE ,
		left: 0,
	});
	
	var entidv_val_label = $.UI.create("Label", {
		text: key,
		right: 0,
		height: Titanium.UI.SIZE ,
		color: "#CE1D1C"
	});
	view.add(entidv_label);
	view.add(entidv_val_label);
	
	return view;
}

$.main.addEventListener("click", function(e){
	var nav = require('navigation');
	nav.navigateWithArgs("asp/claimHistory", {name: name});
});