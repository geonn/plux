var args = arguments[0] || {};
var profile = args.profile_data;

var personal_health = profile.personal_health;
 
addField("Full Name : ", profile.fullname, $.profile_data);
addField("Email : ", profile.email, $.profile_data);
addField("Last Login : ", timeFormat(profile.last_login), $.profile_data); 
 
if(typeof profile.personal_health != "undefined"){
	addField("Birthday : ", timeFormat(personal_health['birthDate']), $.my_health);
	addField("BloodType : ", personal_health['bloodType'], $.my_health);
	addField("Gender : ", personal_health['gender'], $.my_health);
}
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
