var common = require('common');

exports.checkLogin = function(){
	var memno = Ti.App.Properties.getString('memno'); 
	if(typeof memno === undefined || memno == null || memno == ""){
		return false;
	}else{
		return true;
	}
};
