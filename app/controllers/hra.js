var args = arguments[0] || {};

$.menu.addEventListener('itemclick', function(e){
	var item = e.section.getItemAt(e.itemIndex); 
	nav.navigateWithArgs("hraDetail", {mod: item.properties.mod});
});