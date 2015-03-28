var args = arguments[0] || {};
var MRECORDS = require('medicalRecords');
MRECORDS.construct($); 
var medicalRecordsModel = Alloy.createCollection('medicalRecords');  
function saveRecord(){
	var title      = $.titleRecord.value; 
	var message   = $.recordsTextArea.value;
	
	if(title.trim() == ""){
		title = "Untitled - "+ currentDateTime();
	}  
	medicalRecordsModel.addRecord({ 
		title : title,
		message : message, 
		created : currentDateTime(),
		updated : currentDateTime()
	});  
	// nav.navigationWindow("m_myHealth" );
	Ti.App.fireEvent('displayRecords');
	nav.closeWindow($.newRecWin);
	
}
function hideKeyboard(){
	MRECORDS.hideKeyboard();
}

$.saveRecord.addEventListener('click', saveRecord);
