var args = arguments[0] || {};
var auth = require("login");
var method = require("myClaim");

method.API_ClaimInfo("AGIL00005", "C001");

Ti.UI.addEventListener("data_loaded", init);

function init(e){
	//var d = new Date();
 	var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	$.date.text = timeFormat(currentDateTime());

	console.log(e.data.length);
	var groups = {};
	
	for(var i=0; i < e.data.length; i++){
		var val = e.data[i];
		groups[val.name] = groups[val.name] || [];
   	    groups[val.name].push( val );
	}
	Object.keys(groups).map( function( group )
	  {
	    console.log(groups[group]); 
	    console.log(group+'next');
	    var personal_claim_view = Alloy.createController("_person_claim_view", {claim_data: groups[group], name: group}).getView(); 
	    $.main.add(personal_claim_view);
	  });
	Ti.UI.removeEventListener("data_loaded", init);
}

$.setting.addEventListener("click", function(){
	var nav = require('navigation');
	nav.navigationWindow("m_ClaimHistory");
});
