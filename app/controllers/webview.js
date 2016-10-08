var args = arguments[0] || {};
var url = args.url || "";
var HTMLcontent = '<html><meta name="viewport" content="width=device-width, initial-scale=1.0">'+ args.html+"</html>" || "";
if(url != ""){ 
 	$.surveyView.url = url;  
	$.defaultMsgView.height = 0; 
}else{
	if(HTMLcontent != ""){
		HTMLcontent = HTMLcontent.replace(/\[\[/g, "<"); 
		HTMLcontent = HTMLcontent.replace(/\]\]/g, ">"); 
		$.surveyView.html = HTMLcontent;
		$.defaultMsgView.height = 0;	
	}else{
		$.surveyView.height = 0;
	}	
}

function closeWindow(){
	$.win.close();
}
