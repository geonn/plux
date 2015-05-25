var args = arguments[0] || {};
var data = args.claim_data;
var name = args.name;
$.name.text = name;

for(var a = 0; data.length > a; a++){
	var benefit_view = $.UI.create("View", {
		classes: ["padding"],
		bottom: 0,
	});
	var benefit_label = $.UI.create("Label", {
		classes: ["benefit_label"],
		text: data[a]['benefittype']
	});
	benefit_view.add(benefit_label);
	var line = $.UI.create("View",{
		classes:["line"],
	});
	$.main.add(benefit_view);
	$.main.add(line);
	
	if(data[a]['entidv'] != 99999){
		var view = create_field("RM"+data[a]['entidv'], "Personal");
		$.main.add(view);
	}
	
	if(data[a]['entidvbal'] != 99999){
		var view = create_field("RM"+data[a]['entidvbal'], "Personal Balance");
		//$.main.add(view);
	}
	
	if(data[a]['entsha'] != 99999){
		var view = create_field("RM"+data[a]['entsha'], "Shared");
		$.main.add(view);
	}
	
	if(data[a]['entshabal'] != 99999){
		var view = create_field("RM"+data[a]['entshabal'], "Shared Balance");
		//$.main.add(view);
	}
	
	if(data[a]['maxperclaim'] != 99999){
		var view = create_field("RM"+data[a]['maxperclaim'], "Max per Claim");
		$.main.add(view);
	}
	
	if(data[a]['vstidv'] != 99999){
		var view = create_field(data[a]['vstidv'], "Visitation");
		$.main.add(view);
	}
	
	if(data[a]['vstidvbal'] != 99999){
		var view = create_field(data[a]['vstidvbal'], "Visitation Balance");
		//$.main.add(view);
	}
	
	if(data[a]['vstsha'] != 99999){
		var view = create_field(data[a]['vstsha'], "Visitation Shared");
		$.main.add(view);
	}
	
	if(data[a]['vstshabal'] != 99999){
		var view = create_field(data[a]['vstshabal'], "Visitation Shared Balance");
		//$.main.add(view);
	}
}

function create_field(key, title){
	var view = $.UI.create("View",{
		classes: ["small_padding"],
		width: Ti.UI.FILL,
	});
	
	var entidv_label = $.UI.create("Label", {
		text: title,
		left: 0,
	});
	
	var entidv_val_label = $.UI.create("Label", {
		text: key,
		right: 0,
		color: "#ff0000"
	});
	view.add(entidv_label);
	view.add(entidv_val_label);
	
	return view;
}
