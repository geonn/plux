// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
//var args = $.args;
var loading = Alloy.createController("loading");
var u_id = Ti.App.Properties.getString('u_id'); 

function init(){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, 3000);
	
}

function init2(){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, 6000);
	
}

init();

if(OS_ANDROID){ 
	$.btnBack.addEventListener('click', function(){ 
		$.win.close(); 
	});
}

// $.win.addEventListener("close", function(){
// 	$.destroy();
// });

function doClick(e) {

	var name = $.tfName.value;

	var state = $.pState.getSelectedRow(0).id;
	if(state == "any"){
		state="";
	}

	var specialty = $.pSpecial.getSelectedRow(0).id;
	if(specialty == "any"){
		specialty="";
	}
	
	var hospital = $.tfHospital.value;

	init2();
	Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: name, state: state, specialty: specialty, hospital: hospital}}, function(responseText){
		
		var obj = JSON.parse(responseText);
		var win = Alloy.createController("specialist_directory/result", {data: obj}).getView();
		win.open();
	});
}

function clickState(e){
	$.pState.setSelectedRow(null, null);
}

function clickSpecial(e){
	$.pSpecial.setSelectedRow(null, null);
}

//test picker
var picker = Titanium.UI.createPicker({
	left: "2%",
     top:5,
     bottom: 5,

     borderRadius: 10,
     height: 40,
     width: "74%",
	 maxLength: "30",
	 //url: "getSpecialistV2"
     //onChange: "textFieldOnBlur",
     //value: ""
});