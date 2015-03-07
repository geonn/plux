var args = arguments[0] || {};

$.menu.addEventListener("click", function(e){
	console.log(e.rowData.title);
	var nav = require('navigation');
	nav.navigationWindow("m_ClaimHistory");
});