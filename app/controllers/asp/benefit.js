var args = arguments[0] || {};
var ic_no = Ti.App.Properties.getString('ic_no');
var memno = Ti.App.Properties.getString('memno');
var url = args.url || "http://flexi.freejini.com.my/main/appLogin?user=flexi&value=29175304721014532l49f7207c8943981&ic_no="+memno;
var HTMLcontent = '<html><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta name="viewport" content="width=device-width, initial-scale=1.0">'+ args.html+"</html>" || "";
if(url != ""){ 
 	$.surveyView.url = url;  
	$.defaultMsgView.height = 0; 
}else{
	if(HTMLcontent != ""){
		HTMLcontent = HTMLcontent.replace(/\[\[/g, "<"); 
		HTMLcontent = HTMLcontent.replace(/\]\]/g, ">"); 
		$.surveyView.setHtml(HTMLcontent);
		$.defaultMsgView.height = 0;	
	}else{
		$.surveyView.height = 0;
	}	
}

function closeWindow(){
	$.win.close();
}
