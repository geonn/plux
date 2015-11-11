var doctors_model = Alloy.createCollection('doctors');   
var clinicId = 0; 
var listing = [];   

function render_specialty_list(){
	$.specialty_container.removeAllChildren();
	
	var docTable = Ti.UI.createTableView();
	var data=[]; 
	var counter = 0; 
	
  	if(listing.length < 1){ 
		docTable.setData(common.noRecord());
	}else{
		listing.forEach(function(entry) {
			console.log(entry.id);
	   		var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: Ti.UI.SIZE,
			    specialty: entry.specialty, 
			   // layout: "vertical",
			    backgroundSelectedColor: "#ECFFF9",
		 
			}); 
			console.log(entry.specialty+" specialty at tablerow");
			var tblRowView = Ti.UI.createView({ 
					height:Ti.UI.SIZE, 
					width:Ti.UI.FILL,
					specialty: entry.specialty
			}); 

			var tblView = Ti.UI.createView({
					layout: "vertical",
					height:Ti.UI.SIZE,
					specialty: entry.specialty, 
					width:"auto" 
			}); 
			 
			var label_specialty = $.UI.create('Label',{
				classes : ['medium_font','wfill','hsize','themeColor'],
				text:  entry.specialty,
				textAlign:'left',
				specialty: entry.specialty, 
				top:5,
				left:15
			});
			tblView.add(label_specialty);
			tblRowView.add(tblView);
			update_specialty_to_form(tblRowView);
			row.add(tblRowView);
			data.push(row);	   
		});
		docTable.setData(data);  
	}
	$.specialty_container.add(docTable); 
}

$.set_clinicId = function(e){
	console.log("specialty called");
	clinicId = e.clinicId;
	refresh();
};

function update_specialty_to_form(vw){
	vw.addEventListener('click', function(e){
		var elbl = JSON.stringify(e.source);
		var res = JSON.parse(elbl);
		console.log(res);
	 	Ti.App.fireEvent('update_specialty',{specialty:res.specialty});
	 	Ti.App.fireEvent("appointment_index:moveNext");
	});
}

function refresh(){
	console.log('z');
	listing = doctors_model.getDoctorListGroupBySpecialty([{key: "clinic_id", value: clinicId}]);
	console.log(clinicId+"clinic Id");
	console.log(listing);
	render_specialty_list();
}

function init(){
	refresh();
}

init();
