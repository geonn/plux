var args = arguments[0] || {};
var PDF = require('pdf');

var readLeaflet = function(e){
// Create a document viewer to preview a PDF file
	docViewer = Ti.UI.iOS.createDocumentViewer({url:"/pdf/"+e.source.mod});
	docViewer.show(); 
};
