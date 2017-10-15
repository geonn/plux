var args = arguments[0] || {};
var medicalAttachmentModel = Alloy.createCollection('medicalAttachment');
var loading = Alloy.createController("loading");
var u_id = Ti.App.Properties.getString('u_id'); 

function newRecord(){
	loading.start();
	API.callByPost({url: "addUpdateMedicalRecord", params:{title: "untitled - "+ common.now(), u_id: u_id}}, function(responseText){
		var model = Alloy.createCollection("medicalRecordsV2");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		loading.finish();
		nav.navigateWithArgs("editMedical", {id: arr[0].id}); 
	});
}

function render_listing(){
	var model = Alloy.createCollection("medicalRecordsV2");
	var data = model.getData();
	var row_data = [];
	for (var i=0; i < data.length; i++) {
		var row = $.UI.create("TableViewRow",{keyword: data[i].title+" "+data[i].message+" "+data[i].clinic, id: data[i].id});
		var container = $.UI.create("View", {classes:['wfill','hsize','padding']});
		var left_info = $.UI.create("View", {classes:['wfill','hsize','vert'], right: 30});
		var right_arrow = $.UI.create("ImageView", {classes:['hsize'], image: "/images/btn-forward.png", right: 10, width: 15});
		
		var title = $.UI.create("Label", {classes: ['wfill','hsize','h4','themeColor'], textAlign: "left", text: data[i].title.replace(/["']/g, "&quot;")});
		var message = $.UI.create("Label", {classes: ['wfill','h5'], height: 20, textAlign: "left", text: data[i].message.replace(/["']/g, "&quot;")});
		var clinic = $.UI.create("Label", {classes: ['wfill','h5'], height: 20, textAlign: "left", text: data[i].clinic.replace(/["']/g, "&quot;")});
		var updated = $.UI.create("Label", {classes: ['wfill','hsize','h5'], textAlign: "left", text: timeFormat(data[i].updated)});
		
		left_info.add(title);
		left_info.add(clinic);
		left_info.add(updated);
		container.add(left_info);
		container.add(right_arrow);
		row.add(container);
		row_data.push(row);
	};
	$.recordTable.data = row_data;
}

$.recordTable.addEventListener("click", function(e){
	loading.start();
	API.callByPost({url: "http://plux.freejini.com.my/main/tnc2", fullurl: true, params:{u_id: u_id}}, function(responseText){
		console.log(responseText);
		 var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['Agree', 'Cancel'],
		    message: responseText,
		    title: 'Terms & Conditions'
		  });
		dialog.addEventListener('click', function(ex) {
		    if (e.index === e.source.cancel) {
		    	console.log('The cancel button was clicked');
		    }else{
		    	nav.navigateWithArgs("editMedical", {id: e.rowData.id}); 
		    }
	    });
	    dialog.show();
	    loading.finish();
  });
});

function refresh(){
	loading.start();
	
	API.callByPost({url: "getMedicalRecords", params:{u_id: u_id}}, function(responseText){
		
		var model = Alloy.createCollection("medicalRecordsV2");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		
		API.callByPost({url: "getMedicalAttachment", params:{u_id: u_id}}, function(responseText){
			var model2 = Alloy.createCollection("medicalAttachmentV2");
			var res2 = JSON.parse(responseText);
			var arr2 = res2.data || null;
			model2.saveArray(arr2);
			
			render_listing();
			loading.finish();
		});
	});
}

function init(){
	$.win.add(loading.getView());
	$.recordTable.search = $.searchItem;
	refresh();
}

init();

if(OS_ANDROID){ 
	$.btnBack.addEventListener('click', function(){ 
		$.win.close(); 
	});   
}

Ti.App.addEventListener('myMedicalRecord:refresh', refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('myMedicalRecord:refresh', refresh);
	$.destroy();
	console.log("window close");
});
