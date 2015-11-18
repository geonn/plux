var panelListModel = Alloy.createCollection('panelList');    
var listing = [];   

function render_clinic_list(){
	$.doctorContainer.removeAllChildren();
	
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
			    source: entry.id, 
			    clinicName: entry.clinicName, 
			   // layout: "vertical",
			    backgroundSelectedColor: "#ECFFF9",
		 
			}); 
			
			var tblRowView = Ti.UI.createView({ 
					height:Ti.UI.SIZE, 
					width:Ti.UI.FILL,
					clinicName: entry.clinicName, 
					source: entry.id,  
			}); 

			var tblView = Ti.UI.createView({
					layout: "vertical",
					height:Ti.UI.SIZE, 
					source: entry.id, 
					clinicName: entry.clinicName, 
					width:"auto" 
			}); 
			 
			var docName = $.UI.create('Label',{
				classes : ['medium_font','wfill','hsize','themeColor'],
				text:  entry.clinicName, 
				source: entry.id, 
				textAlign:'left',
				clinicName: entry.clinicName, 
				top:5,
				left:15
			});	
			var docSpecialty = $.UI.create('Label',{
				classes : ['small_font','wfill','hsize'],
				text:  entry.clinicType, 
				source: entry.id,
				clinicName: entry.clinicName, 
				color: "#848484", 
				textAlign:'left', 
				left:15,  
			});	
			var docContact = $.UI.create('Label',{
				classes : ['small_font','wfill','hsize'],
				text:  "Tel : "+entry.tel, 
				source: entry.id,
				clinicName: entry.clinicName, 
				color: "#848484", 
				textAlign:'left', 
				bottom:5,
				left:15 
			});	
			tblView.add(docName); 
			tblView.add(docSpecialty); 
			tblView.add(docContact); 
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
		var elbl = JSON.stringify(e.source);
		var res = JSON.parse(elbl);
	 	Ti.App.fireEvent('selectClinic',{clinicName:res.clinicName,clinicId:res.source, specialty:res.specialty });
	 	Ti.App.fireEvent("appointment_index:moveNext");
	});
}

function refresh(){
	listing = panelListModel.getPanelListTest();
	render_clinic_list();
}

function init(){
	refresh();
}

init();
