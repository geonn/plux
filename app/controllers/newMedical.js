var args = arguments[0] || {};

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
$.saveRecord.addEventListener('click', saveRecord);
