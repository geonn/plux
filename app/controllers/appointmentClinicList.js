var args = arguments[0] || {};  
var panelListModel = Alloy.createCollection('panelList');    
 

if(OS_IOS){
	$.doctorView.top = 50;
}
/*** Initialize***/ 
common.construct($);  
	 
var listing = [];
listing = panelListModel.getPanelListTest();   
var bigContainer = $.UI.create('View',{
	classes: ['hfill','wfill','vert']
});
var optionContainer = $.UI.create('View',{
	classes: [ 'wfill','horz'],
	height:50
});
var docContainer = Ti.UI.createScrollView({
	width: Ti.UI.FILL,
	height: Ti.UI.FILL 
});

 
bigContainer.add(optionContainer);
bigContainer.add(separateHozLine());
bigContainer.add(docContainer);
$.doctorContainer.add(bigContainer); 
 
function createDoctorList(){
	removeAllChildren(docContainer);
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
					classes : ['font_regular','wfill','hsize','themeColor'],
					text:  entry.clinicName, 
					source: entry.id, 
					textAlign:'left',
					clinicName: entry.clinicName, 
					top:5,
					left:4
			});	
			var docSpecialty = $.UI.create('Label',{
				classes : ['small_font','wfill','hsize'],
				text:  entry.clinicType, 
				source: entry.id,
				clinicName: entry.clinicName, 
				color: "#848484", 
				textAlign:'left',
				top:5,
				left:4,  
			});	
			var docContact = $.UI.create('Label',{
				classes : ['small_font','wfill','hsize'],
				text:  "Tel : "+entry.tel, 
				source: entry.id,
				clinicName: entry.clinicName, 
				color: "#848484", 
				textAlign:'left',
				top:5,
				bottom:5,
				left:4 
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
	common.hideLoading();
	docContainer.add(docTable); 
	return docContainer;
}
 
function addClinicAction(vw){
	vw.addEventListener('click', function(e){ 
		var elbl = JSON.stringify(e.source); 
		var res = JSON.parse(elbl);  
	 	Ti.App.fireEvent('selectClinic',{clinicName:res.clinicName,clinicId:res.source });
	 	$.win.close(); 
	});
}

function separateHozLine(){
	return seperatorLine = Titanium.UI.createView({ 
		backgroundColor: "#D5D5D5",
		height:1, 
		width:Ti.UI.FILL
	});
} 
 
setTimeout(function(){
	createDoctorList(); 
},600);
 
//Ti.App.addEventListener('filterList',filterList);

function closeWin(){
	$.win.close();
}

$.win.addEventListener("close", function(){ 
	//Ti.App.removeEventListener('filterList',filterList);
	optionContainer = null;
});
