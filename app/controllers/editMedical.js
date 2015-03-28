var args = arguments[0] || {};
var rec_id = args.id || "";
var MRECORDS = require('medicalRecords');
MRECORDS.construct($); 
var medicalRecordsModel = Alloy.createCollection('medicalRecords');
var details = medicalRecordsModel.getRecordById(rec_id);
 
var title = details.title;
title = title.replace(/&quot;/g,"'");
var message = details.message;
$.titleRecord.value= title;
$.recordsTextArea.value= message ; 
function saveRecord(){
	var title      = $.titleRecord.value; 
	var message   = $.recordsTextArea.value;
	
	if(title.trim() == ""){
		title = "Untitled - "+ currentDateTime();
	}  
	medicalRecordsModel.updateRecord({ 
		id : rec_id,
		title : title,
		message : message,  
		updated : currentDateTime()
	});  
	// nav.navigationWindow("m_myHealth" );
	Ti.App.fireEvent('displayRecords');
	nav.closeWindow($.editRecWin);
	
}

function deleteRecord(){
	
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['Cancel','Confirm'],
		message: 'Are you sure want to delete this records?',
		title: 'Delete Confirmation'
	});
	dialog.addEventListener('click', function(e){
		if (e.index === e.source.cancel){
		      //Do nothing
		}
		if (e.index === 1){ 
			 medicalRecordsModel.removeRecordById(rec_id);
			 Ti.App.fireEvent('displayRecords');
			nav.closeWindow($.editRecWin);
		}
	});
	dialog.show(); 
	
}

function hideKeyboard(){
	MRECORDS.hideKeyboard();
}

$.saveRecord.addEventListener('click', saveRecord);
