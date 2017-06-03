var panelListModel = Alloy.createCollection('doctors');    
var listing = [];
var online_doctor = [];   
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
			var icon_status = "/images/icons/icon_offline.png";
			console.log('check here');
			console.log(online_doctor);
			online_doctor.forEach(function(doc) {
				if(doc == null){
					return;
				}
				console.log(doc.dr_id+" = "+entry.id);
				icon_status = (doc.dr_id == entry.id)?"/images/icons/icon_online.png":"/images/icons/icon_offline.png";
			});
			
	   		var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: Ti.UI.SIZE,
			    dr_id: entry.id, 
			   // layout: "vertical",
			    backgroundSelectedColor: "#ECFFF9",
		 
			}); 
			var image_status = $.UI.create("ImageView", {image: icon_status, classes:['wsize'], height: 20, left:10});
			var tblRowView = Ti.UI.createView({ 
					height:Ti.UI.SIZE, 
					width:Ti.UI.FILL,
					dr_id: entry.id,
					layout: "horizontal",
			}); 

			var tblView = Ti.UI.createView({
					layout: "vertical",
					height:Ti.UI.SIZE, 
					width:"auto" 
			}); 
			 
			var docName = $.UI.create('Label',{
				classes : ['medium_font','wfill','hsize','themeColor'],
				text:  entry.name, 
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
			tblRowView.add(image_status);
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

function refresh(e){
	if(typeof e != "undefined"){
		online_doctor = e.name_list;
	}
	//[{key: "specialty", value: specialty}]
	listing = panelListModel.getDoctorList([]);
	render_doctor_list();
}

function init(){
	socket.addEventListener("controller:getDoctorList", refresh);
	socket.fireEvent("socket:getDoctorList");
	refresh();
}

init();
