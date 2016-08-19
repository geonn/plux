var args = arguments[0] || {};
var profile = args.profile_data;
var model = Alloy.createCollection("personal_info");
var loading = Alloy.createController("loading");
var personal_health_type = "Medication Records";

addField("Corporate Name : ", profile.corpname, $.profile_data);
addField("Name : ", profile.name, $.profile_data);
addField("Member No : ", profile.memno, $.profile_data);
addField("IC : ", profile.icno, $.profile_data);
addField("Relation : ", profile.relation, $.profile_data);

//addField("Allergies : ", profile.allergy, $.my_health_records);
/**
if(typeof profile.personal_health != "undefined"){
	addField("Birthday", personal_health['birthDate'], $.my_health);
	addField("BloodType", personal_health['bloodType'], $.my_health);
	addField("Gender", personal_health['gender'], $.my_health);
}
**/
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


function init(){
	$.win.add(loading.getView());
	//$.addbox.hide();
	//refresh(render_personal_health);
}

init();

function render_personal_health(){
	console.log(personal_health_type+" before call");
	var listing = model.getData(personal_health_type);
	var arr = [];
	if(listing.length <= 0){
		listing.push({val: "No records found"});
	}
	for (var i=0; i < listing.length; i++) {
		var row = $.UI.create("TableViewRow", {
			title: listing[i].val,
			classes:['wfill','hsize'],
			id: listing[i].id
		});
	  	arr.push(row);
	};
	
	$.tblview.setData(arr);
}

function refresh(callback){
	var u_id = Ti.App.Properties.getString('u_id');
	
	var checker = Alloy.createCollection('updateChecker');
	var isUpdate = checker.getCheckerById("15", u_id);
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}
	loading.start();
	
	API.callByPost({url:"getPersonalInfoRecords", params: {last_updated: last_updated, u_id: u_id}}, function(responseText){
		
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		console.log(res);
		model.saveArray(arr);
		checker.updateModule(15,"getPersonalInfoRecords", res.last_updated, u_id);
		
		callback();
		loading.finish();
	});
}

function addRecord(){
	$.box_value.value;
	var u_id = Ti.App.Properties.getString('u_id');
	if($.box_value.value == ""){
		closeBox();
		return;
	}
	loading.start();
	params = {
		u_id: u_id,
		type: personal_health_type,
		val:$.box_value.value 
	};
	API.callByPost({url: "addUpdateRecords", params:params}, function(responseText){
		var res = JSON.parse(responseText);
		model.saveArray(res.data);
		refresh(render_personal_health);
		closeBox();
		loading.finish();
	});
}

function closeBox(){
	$.addbox.hide();
}

function openBox(){
	$.addbox.show();
}

function switchListing(e){
	var tab = parent({name: "tab"}, e.source);
	var text = children({name: "v", value:"label"}, $.firstTab);
	var secondtext = children({name: "v", value:"label"}, $.secondTab);
	
	if(tab == 1){
		personal_health_type = "Medication Records";
		text.color = "#CE1D1C";
		$.secondTab.backgroundColor = "transparent";
		secondtext.color = "#606060";
	}else if(tab == 2){
		personal_health_type = "Allergic History";
		secondtext.color = "#CE1D1C";
		$.firstTab.backgroundColor = "transparent";
		text.color = "#606060";
	}
	render_personal_health();
	$.addbox_title.text = personal_health_type;
}

/*
$.tblview.addEventListener("longpress", function(e){
	var id = e.rowData.id;
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 1,
	    buttonNames: ['Confirm', 'Cancel'],
	    message: 'Would you like to delete the record?',
	    title: 'Delete'
	 });
	 console.log(id+"remove id");
	 dialog.addEventListener('click', function(ex){
		 if (ex.index === ex.source.cancel){
		 	console.log("cancel");
		 }else if(ex.index == 0){
			var params = {
				id: id,
				status: 2
			};
			loading.start();
			API.callByPost({url: "changeRecordStatus", params:params}, function(responseText){
				var res = JSON.parse(responseText);
				model.saveArray(res.data);
				refresh(render_personal_health);
				closeBox();
				loading.finish();
			});
		 }
	});
	dialog.show();
});
*/