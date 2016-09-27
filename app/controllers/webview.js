var args = arguments[0] || {};
var url = args.url || "";
var HTMLcontent = args.html || "";
if(url != ""){ 
 	$.surveyView.url = url;  
	$.defaultMsgView.height = 0; 
}else{
	if(HTMLcontent != ""){
		HTMLcontent = HTMLcontent.replace(/\[\[/g, "<");
		console.log(HTMLcontent);
		HTMLcontent = HTMLcontent.replace(/\]\]/g, ">");
		console.log(HTMLcontent);
		$.surveyView.html = HTMLcontent;
		$.defaultMsgView.height = 0;	
	}else{
		$.surveyView.height = 0;
	}	
}

function closeWindow(){
	$.win.close();
}
