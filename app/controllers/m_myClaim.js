var args = arguments[0] || {};  
var usersModel = Alloy.createCollection('users'); 
var user = usersModel.getOwnerData(); 
API.claimInfo({memno : user.icno, corpcode : user.corpcode});
common.construct($);
common.showLoading();
 
Ti.UI.addEventListener("data_loaded", init);

function init(e){
	//var d = new Date();
 	var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	$.date.text = timeFormat(currentDateTime());
 
	var groups = {};
	
	for(var i=0; i < e.data.length; i++){
		var val = e.data[i];
		groups[val.name] = groups[val.name] || [];
   	    groups[val.name].push( val );
	}
	Object.keys(groups).map( function( group ){ 
	    var personal_claim_view = Alloy.createController("_person_claim_view", {claim_data: groups[group], name: group}).getView(); 
	    $.main.add(personal_claim_view);
	});
	Ti.UI.removeEventListener("data_loaded", init);
	common.hideLoading();
}

$.setting.addEventListener("click", function(){
	var nav = require('navigation');
	nav.navigationWindow("m_ClaimHistory");
});
