var args = arguments[0] || {};
var PDF = require('pdf');

var readLeaflet = function(e){
// Create a document viewer to preview a PDF file
	docViewer = Ti.UI.iOS.createDocumentViewer({url:"/pdf/"+e.source.mod});
// Opens the options menu and when the user clicks on 'Quick Look'
// the document viewer launches with an animated transition
 
	docViewer.show(); 
};
