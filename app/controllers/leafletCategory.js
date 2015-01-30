var args = arguments[0] || {};

function navWindow(e){
	var title = e.source.mod;
	var nav = require('navigation');
	nav.navigationWindow("leaflet",'','',{title: title});
}
