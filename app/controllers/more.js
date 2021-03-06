var args = arguments[0] || {};
var corpcode = Ti.App.Properties.getString('corpcode');

if(corpcode == "IFLP" || corpcode == "IFMY"){
    $.section.insertItemsAt(2, [{properties: {title: "Exclusion List", mod: "asp/exlusionList"}}] );
}

function navTo(e){
	var target = e.section.items[e.itemIndex].properties.mod; 
	var empno = Ti.App.Properties.getString('empno');
	if(target == "asp/changePassword"){
        if(typeof empno != "undefined" && empno != ""){
            Alloy.Globals.nav.navigationWindow("asp/changePassword", 1);  
        }else{
            Alloy.Globals.nav.navigationWindow("plux_profile"); 
        }
    }else if(target == "asp/exlusionList"){
        //Alloy.Globals.nav.navigationWindow("asp/exlusionList", 1);
        openURLPDF({attachment: "http://plux.freejini.com.my/public/document/Exclusion_List.pdf"});
    }else if(target == "profile"){
        if(typeof empno != "undefined" && empno != ""){
            Alloy.Globals.nav.navigationWindow("asp/editProfile", 1);  
        }else{
            Alloy.Globals.nav.navigationWindow("plux_profile"); 
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
		Alloy.Globals.nav.closeWindow($.win); 
	}); 
}

function openURLPDF(e) {
    var filename = e.attachment.split("/");
    filename = filename[filename.length - 1];
    var appFile;
    
    if(OS_ANDROID) {
        appFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename); 
    } else {
        appFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
    }
    var appfilepath = appFile.nativePath;
    
    //Check if file has been downloaded yet
    if(appFile.exists()===false) {
        var xhr = Ti.Network.createHTTPClient();
        xhr.onload = function() {
            appFile.write(this.responseData);
            viewPDF(appfilepath);
        };
        xhr.onerror = function() {
            alert("Cannot retrieve PDF form web site");
        };
        xhr.timeout = 10000;
        xhr.open("GET", e.attachment);
        xhr.send();
    
    } else {
        viewPDF(appfilepath);   
    }
}

function viewPDF(appfilepath) {
    if(OS_ANDROID) {
        try{
            Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                action: Ti.Android.ACTION_VIEW,
                type: 'application/pdf',
                data: appfilepath
            }));
        } catch(e) {
            alert('No PDF apps installed!');
        }
    } else {
        docViewer = Ti.UI.iOS.createDocumentViewer({url:appfilepath});
        docViewer.show();
    }
}


