var specialty_id = 0;   
var doctor_panel_model = Alloy.createCollection('doctor_panel');
var listing = [];   

$.set_specialty = function(e){
	specialty_id = e.specialty_id;
	refresh();
};

function render_clinic_list(){
	
	var docTable = Ti.UI.createTableView();
	var data=[]; 
	var counter = 0; 
	
  	if(listing.length < 1){ 
		docTable.setData(common.noRecord());
	}else{
		listing.forEach(function(entry) {
			console.log(entry.id);
	   		var row = $.UI.create("TableViewRow", {
	   			classes: ['hsize', 'vert'],
			    touchEnabled: true,
			    doctor_panel_id: entry.id, 
			    clinic_id: entry.clinic_id,
			    specialty_id: entry.specialty_id,
			    clinic_name: entry.clinicName,
			   	// layout: "vertical",
			    backgroundSelectedColor: "#ECFFF9",
			}); 
			var tblRowView = $.UI.create("View", {
				classes:['hsize', 'wfill','vert'], 
				doctor_panel_id: entry.id, 
			    clinic_id: entry.clinic_id,
			    test:"asda",
			    specialty_id: entry.specialty_id,
			    clinic_name: entry.clinicName,
			}); 
			 
			var docName = $.UI.create('Label',{
				classes : ['medium_font','wfill','hsize','themeColor'],
				text:  entry.clinicName,
				textAlign:'left',
				top:5,
				left:15
			});	
			var docSpecialty = $.UI.create('Label',{
				classes : ['small_font','wfill','hsize'],
				text:  entry.doctor_name,
				color: "#848484", 
				textAlign:'left', 
				left:15,  
			});	
			var docContact = $.UI.create('Label',{
				classes : ['small_font','wfill','hsize'],
				text:  "specialty : "+entry.specialty,
				color: "#848484", 
				textAlign:'left', 
				bottom:5,
				left:15 
			});	
			tblRowView.add(docName); 
			tblRowView.add(docSpecialty); 
			tblRowView.add(docContact);
			row.add(tblRowView);
			row.addEventListener("click", function(e){
				var clinicName = parent({name: "clinic_name"}, e.source);
				var clinic_id = parent({name: "clinic_id"}, e.source);
				var specialty_id = parent({name: "specialty_id"}, e.source);
				var doctor_panel_id = parent({name: "doctor_panel_id"}, e.source);
				console.log(doctor_panel_id+" clinic update");
			 	Ti.App.fireEvent('selectClinic',{clinicName: clinicName, clinicId: clinic_id, specialty_id: specialty_id, doctor_panel_id: doctor_panel_id });
			 	Ti.App.fireEvent("appointment_index:moveNext");
			});
			data.push(row);	   
		});
		docTable.setData(data);  
	}
	$.doctorContainer.add(docTable); 
}

function refresh(){
	console.log(specialty_id+"specialty id refresh ");
	$.doctorContainer.removeAllChildren();
	var checker = Alloy.createCollection('updateChecker');
	var isUpdate = checker.getCheckerById("6", specialty_id);
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}
	
	API.callByPost({url:"getDoctorPanelBySpecialty", params: {last_updated: last_updated, specialty_id: specialty_id}}, function(responseText){
		var model = Alloy.createCollection("doctor_panel");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		checker.updateModule(6,"getDoctorPanelBySpecialty", common.now(), specialty_id);
		listing = model.getData(specialty_id);
		console.log(listing);
		render_clinic_list();
	});
	
}

function init(){
	refresh();
}

init();
