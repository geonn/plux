var panelListModel = Alloy.createCollection('doctors');    
var listing = [];   
var specialty = "";

function render_doctor_list(){
	$.doctorContainer.removeAllChildren();
	
	var docTable = Ti.UI.createTableView();
	var data=[]; 
	var counter = 0; 
	
  	if(listing.length < 1){ 
		docTable.setData(common.noRecord());
	}else{
		listing.forEach(function(entry) {
			
	   		var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: Ti.UI.SIZE,
			    dr_id: entry.id, 
			   // layout: "vertical",
			    backgroundSelectedColor: "#ECFFF9",
		 
			}); 
			
			var tblRowView = Ti.UI.createView({ 
					height:Ti.UI.SIZE, 
					width:Ti.UI.FILL,
					dr_id: entry.id, 
			}); 

			var tblView = Ti.UI.createView({
					layout: "vertical",
					height:Ti.UI.SIZE, 
					width:"auto" 
			}); 
			 
			var docName = $.UI.create('Label',{
				classes : ['medium_font','wfill','hsize','themeColor'],
				text:  entry.name+" "+entry.id, 
				textAlign:'left',
				top:5,
				left:15
			});	
			var docSpecialty = $.UI.create('Label',{
				classes : ['small_font','wfill','hsize'],
				text:  entry.specialty, 
				color: "#848484", 
				textAlign:'left', 
				left:15,  
			});	
			tblView.add(docName); 
			tblView.add(docSpecialty);
			tblRowView.add(tblView);
			addClinicAction(tblRowView);
			row.add(tblRowView);
			data.push(row);	   
		});
		docTable.setData(data);  
	}
	$.doctorContainer.add(docTable); 
}
 
function addClinicAction(vw){
	vw.addEventListener('click', function(e){
		var dr_id = parent({name: "dr_id"}, e.source);
		console.log(dr_id+" dr_id from doctor");
	 	//Ti.App.fireEvent("askDoctor_index:windowClose");
	 	var room_model = Alloy.createCollection('room');
	 	var room = room_model.getDataBydr_id({dr_id: dr_id}); 
	 	console.log(room);
	 	if(room.length > 0 && room[0].status == 2){
	 		nav.navigateWithArgs("conversation", {dr_id : dr_id});
	 	}else{
	 		nav.navigateWithArgs("askDoctor/forms", {dr_id : dr_id});
	 	}
	 	//
	});
}

$.update_doctor_list = function(e){
	specialty = e.specialty;
	refresh();
};

function refresh(){
	listing = panelListModel.getDoctorList([{key: "specialty", value: specialty}]);
	render_doctor_list();
}

function init(){
	//refresh();
}

init();
