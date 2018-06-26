var args = arguments[0] || {};

function navTo(e){
	var target = e.section.items[e.itemIndex].properties.mod; 
	console.log(e.section.items[e.itemIndex].properties.mod);
	var empno = Ti.App.Properties.getString('empno');
	if(target == "asp/changePassword"){
        if(typeof empno != "undefined" && empno != ""){
            nav.navigationWindow("asp/changePassword", 1);  
        }else{
            nav.navigationWindow("plux_profile"); 
        }
    }else if(target == "profile"){
        if(typeof empno != "undefined" && empno != ""){
            nav.navigationWindow("asp/editProfile", 1);  
        }else{
            nav.navigationWindow("plux_profile"); 
        }
    }else if(target == "logout"){
        var dialog = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: ['Cancel','Confirm'],
            message: 'Would you like to logout?',
            title: 'Logout'
        });
        dialog.addEventListener('click', function(e){
            if (e.index === 1){
                Ti.App.fireEvent('logout'); 
            }
        });
        dialog.show(); 
    }
}

if(Ti.Platform.osname == "android"){		
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	}); 
}