var args = arguments[0] || {};
var loading = Alloy.createController("loading");

function init(){
	$.win.add(loading.getView());
}

init();

function checkStatus(){
	loading.start();
	var email = Ti.App.Properties.getString('email') || "";
	API.callByPost({url: "getASPUserDetails", domain: "FREEJINI_DOMAIN", new: true, params:{email: email}}, function(responseText){
		var result = JSON.parse(responseText);
		if(result.status == "success"){
			 _.each(result.data, function(value, key){
                Ti.App.Properties.setString(key, value);
            });
            if(typeof result.data.user_service != "undefined"){
               _.each(result.data.user_service[0], function(value, key){
                    Ti.App.Properties.setString(key, value);
                }); 
            }
            if(typeof result.dependent != "undefined"){
               Ti.App.Properties.setString("dependent", JSON.stringify(result.dependent[0]));
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
