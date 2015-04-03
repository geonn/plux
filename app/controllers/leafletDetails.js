var args = arguments[0] || {};
var url = args.url || "";
console.log("{"+url);
docViewer = Ti.UI.iOS.createDocumentViewer({url:url});
docViewer.show(); 
$.mainView.data= "http://google.com.my/";
