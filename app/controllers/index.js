var args = {};

/***New DB field add here***/
var users = Alloy.createCollection('users'); 
users.addColumn("isver", "TEXT");
users.addColumn("verno", "TEXT");

var panelList = Alloy.createCollection('panelList'); 
panelList.addColumn("clinicCode", "TEXT");
panelList.addColumn("openHour", "TEXT");
panelList.addColumn("clinicType", "TEXT");

var claim_detailList = Alloy.createCollection('claim_detail'); 
claim_detailList.addColumn("status", "TEXT");
claim_detailList.addColumn("claimType", "TEXT");

var medicalAttachmentModel = Alloy.createCollection('medicalAttachment');
medicalAttachmentModel.addColumn("category", "TEXT");

var medicalRecordsModel = Alloy.createCollection('medicalRecords');  
medicalRecordsModel.addColumn("clinic", "TEXT");
medicalRecordsModel.addColumn("treatment", "TEXT");
var u_id = Ti.App.Properties.getString('u_id') || "";

API.loadCategoryList(); 
API.loadNewsFeed();
API.loadLeaflet();
API.loadClinicList();

var win = Alloy.createController("home").getView();
win.open(); 
if(u_id == ""){ 
	nav.navigateWithArgs("login", {});  
} 


/*
$.root.open({fullscreen:true});

$.link_visitor.addEventListener('click', function(e){
	var win = Alloy.createController("home").getView(); 
	win.open();
});

$.link_member.addEventListener('click', function(e){
	var win = Alloy.createController("login").getView(); 
	win.open();
});


*/