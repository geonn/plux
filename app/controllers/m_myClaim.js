var args = arguments[0] || {};
var auth = require("login");
var method = require("myClaim");

method.API_ClaimInfo("910128035500", "ASP");

Ti.UI.addEventListener("data_loaded", init);

function init(e){
	var d = new Date();
 	var month = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	$.date.text = d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear();
	console.log(e);
	var balanceData = [];
	var val = e.data;
	var principle_val = val.entidv;
	var balance = val.entidvbal;
	var claim_limit = balance + principle_val;
		balanceData = [
			{
				 properties : {
				 	title: "Principle",
				 	subtitle: String(principle_val.toFixed(2)),
				 	accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				 },
			},
			{
				 properties : {
				 	title: "Optical",
				 	subtitle: "0.00",
				 	accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				 },
			},
			{
				 properties : {
				 	title: "Dental",
				 	subtitle: "0.00",
				 	accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				 },
			},
			{
				 properties : {
				 	title: "GP",
				 	subtitle: "0.00",
				 	accessoryType: Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				 }
			}
		];
	$.balance.setItems(balanceData);
	$.rm_value.text = balance.toFixed(2);
	$.claim_limit_value.text = claim_limit.toFixed(2);
	Ti.UI.removeEventListener("data_loaded", init);
}
