var args = arguments[0] || {};
var profile = args.profile_data;

console.log(profile);
addField("Corporate Name", profile.corpname, $.profile_data);
addField("Name", profile.name, $.profile_data);
addField("Member No", profile.memno, $.profile_data);
addField("IC", profile.icno, $.profile_data);
addField("Relation", profile.relation, $.profile_data);

addField("Allergies", profile.allergy, $.my_health_records);

function addField(title_text, value_text, view){
	if(typeof value_text === 'undefined' || value_text == ""){
		return;
	}
	var parent = $.UI.create("View", {
		layout: "horizontal",
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
	});
	
	var title = $.UI.create("Label",{
		width: "100sp",
		top:0,
		bottom: "10sp",
		height: Ti.UI.SIZE,
		font:{
			fontSize: "14sp",
		},
		text: title_text,
		color: "#000000",
		textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	});
	
	var value = $.UI.create("Label",{
		width: "auto",
		top:0,
		bottom: "10sp",
		left: "10sp",
		font:{
			fontSize: "14sp",
		},
		text: value_text,
		color: "#000000",
		height: Ti.UI.SIZE,
		
	});
	parent.add(title);
	parent.add(value);
	view.add(parent);
}
