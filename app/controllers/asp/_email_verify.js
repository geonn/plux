var args = arguments[0] || {};
var loading = Alloy.createController("loading");

function init(){
	$.win.add(loading.getView());
}

init();

function checkStatus(){
	loading.start();
	var plux_email = Ti.App.Properties.getString('plux_email') || "";
	console.log(plux_email+" plux_email");
	API.callByPost({url: "getASPUserDetails", domain: "FREEJINI_DOMAIN", new: true, params:{email: plux_email}}, function(responseText){
		var result = JSON.parse(responseText);
		console.log(result);
		if(result.status == "success"){
			Ti.App.Properties.setString('fullname', result.data.fullname); 
			Ti.App.Properties.setString('plux_user_status', result.data.status); 
			Ti.App.Properties.setString('last_login', currentDateTime()); 
			Ti.App.Properties.setString('u_id', result.data.u_id); 
			Ti.App.Properties.setString('ic_no', result.data.ic_no);
			Ti.App.Properties.setString('plux_email',result.data.email);
			Ti.App.Properties.setString('isver', result.data.isver);
			if(typeof result.data.user_service != "undefined"){
				console.log(result.data.user_service.memno+" result.data.user_service.memno");
				Ti.App.Properties.setString('memno', result.data.user_service[0].memno);
	       		Ti.App.Properties.setString('empno', result.data.user_service[0].empno);
	       		Ti.App.Properties.setString('corpcode', result.data.user_service[0].corpcode);
	       		Ti.App.Properties.setString('cardno', result.data.user_service[0].cardno);
			}
			if(typeof result.dependent != "undefined"){
				Ti.App.Properties.setString('dependent', JSON.stringify(result.dependent));
			}
			$.win.close();
			if(result.data.isver > 0){
				
				args.callback();
			}
			loading.finish();
		}else{
			loading.finish();
			alert(result.data);
		}
	});
}

function closeWindow(){
	$.win.close();
}
