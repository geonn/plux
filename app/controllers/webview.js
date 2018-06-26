var args = arguments[0] || {};
var url = args.url || "";
console.log(args.title);
var content = (args.content != "")?args.content:args.subject;
$.win.title = (args.title != "")?args.title:$.win.title;
console.log($.win.title);
var HTMLcontent = '<html><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta name="viewport" content="width=device-width, initial-scale=1.0">'+ content+"</html>" || "";
if(url != ""){ 
 	$.surveyView.url = url;  
	$.defaultMsgView.height = 0; 
}else{
	if(HTMLcontent != ""){
		HTMLcontent = HTMLcontent.replace(/\[\[/g, "<"); 
		HTMLcontent = HTMLcontent.replace(/\]\]/g, ">"); 
		HTMLcontent = HTMLcontent.replace(/\\'/g, "'");
		console.log(HTMLcontent);
		$.surveyView.setHtml(nl2br(HTMLcontent));
		$.defaultMsgView.height = 0;	
	}else{
		$.surveyView.height = 0;
	}	
}

function closeWindow(){
	$.win.close();
}

function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}