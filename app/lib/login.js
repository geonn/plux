var common = require('common');

exports.checkLogin = function(){
	var memno = Ti.App.Properties.getString('memno');
	console.log('should have'+memno);
	if(typeof memno === undefined || memno == null){
		return false;
	}else{
		return true;
	}
};
