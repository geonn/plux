var args = arguments[0] || {};

function callNav(e){
	var nav = require('navigation');
	nav.navigateWithArgs("news", {
		title: e.source.mod
	});
}
