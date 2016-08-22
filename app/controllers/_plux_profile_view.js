var args = arguments[0] || {};
var profile = args.profile_data;
var model = Alloy.createCollection("personal_info");
var loading = Alloy.createController("loading");
var personal_health = profile.personal_health;
var personal_health_type = "Medication Records";	//Allergic History and Medication Records

$.fullname.text ="Full Name : "+profile.fullname;
$.email.text = "Email : "+profile.email;
$.last_login = "Last Login : "+timeFormat(profile.last_login);

function init(){
	$.win.add(loading.getView());
	$.addbox.hide();
	refresh(render_personal_health);
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
	
	var u_id = Ti.App.Properties.getString('u_id');
	if($.box_value.value == ""){
		closeBox();
		$.box_value.value = "";
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
		$.box_value.value = "";
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
