var args = arguments[0] || {};

/**
$.menu.addEventListener('itemclick', function(e){
	var item = e.section.getItemAt(e.itemIndex); 
	nav.navigateWithArgs("hra_detail", {mod: item.properties.mod});
});
**/

$.menu.addEventListener('click', function(e){ 
	var elbl = JSON.stringify(e.rowData); 
	var res = JSON.parse(elbl); 
	nav.navigateWithArgs("hra_detail", {mod: res.mod});
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.hra); 
	}); 
}