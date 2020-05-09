var args = arguments[0] || {};
var url = args.url || "";
var content = (args.content != "")?args.content:args.subject;
$.win.title = (args.title != "")?args.title:$.win.title;
var HTMLcontent = '<html><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta name="viewport" content="width=device-width, initial-scale=1.0"><body>'+ content+"</body></html>" || "";
console.log("url "+url);
console.log(args);
var webview = $.UI.create("WebView", {willHandleTouches: false, allowedURLSchemes:["asp"], backgroundColor: "#f5f5f5", classes:['wfill','hfill']});
$.main.add(webview);
function share(e){
	console.log(e.link+" should be correct "+e.title);
	require('com.alcoapps.socialshare').share({
		status 					: "https://"+e.link,
		androidDialogTitle 		: e.title,
	//image 					: fileToShare.nativePath,
	});
}
if(url != ""){ 
 	webview.url = url;  
	$.defaultMsgView.height = 0; 
}else{
	console.log(HTMLcontent);
	if(HTMLcontent != ""){
		HTMLcontent = HTMLcontent.replace(/\[\[/g, "<"); 
		HTMLcontent = HTMLcontent.replace(/\]\]/g, ">"); 
		HTMLcontent = HTMLcontent.replace(/\\'/g, "'");
		webview.setHtml(nl2br(HTMLcontent));
		console.log('yes');
		$.defaultMsgView.height = 0;	
	}else{
		webview.height = 0;
	}	
}

function closeWindow(){
	$.win.close();
}

function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

function scheme_action(){
	console.log("scheme_action");
	if (!_.isUndefined(Ti.App.getArguments().url)) {
		Ti.API.info("RESUME URLSCHEME: " + Ti.App.getArguments().url);
		var url = Ti.App.getArguments().url;
		var ods = url.substring(("scheme://").length, url.length);
		console.log(ods);
		share(ods);
	}
}

webview.addEventListener('handleurl', function(e) {
    var handler = e.handler;
    console.log("wtf "+e.url);
	var url = e.url;
	var ods = url.substring(("asp://").length, url.length);	
	//console.log(decodeURIComponent(ods.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"'));
	//var params = JSON.parse('{"'+'"}')；
	var params = {}; 
	ods.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
	    params[decodeURIComponent(key)] = decodeURIComponent(value);
	}); 
	share(params);
    //Ti.Platform.openURL(e.url);
    //handler.invoke(Ti.UI.iOS.ACTION_POLICY_CANCEL); 
});

if(OS_ANDROID){
	webview.addEventListener("beforeload", function(e){
		console.log('loadbeofre');
		if(e.url.startsWith("asp")){
			webview.stopLoading();
			setTimeout(function(){
				var url = e.url;
				var ods = url.substring(("asp://").length, url.length);	
				//console.log(decodeURIComponent(ods.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"'));
				//var params = JSON.parse('{"'+'"}')；
				var params = {}; 
				ods.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
				    params[decodeURIComponent(key)] = decodeURIComponent(value);
				}); 
				share(params);
			}, 1000);
			/*
			*/
		}
	});
}
