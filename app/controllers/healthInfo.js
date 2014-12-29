var args = arguments[0] || {};

$.infoList.addEventListener("click", callNav);

function callNav(e){
	var nav = require('navigation');
	
	switch(e.index){
		case 0: 
			nav.navigationWindow("news");
			break;
		case 1:
			break;
	}
}
