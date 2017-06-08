var args = arguments[0] || {};
var newsFeedModel = Alloy.createCollection('health_news_feed'); 
var categoryModel = Alloy.createCollection('categorys'); 

function init(){
	displayInpatientRecord();
}
init();

function displayInpatientRecord(){  
	var tableData = []; 
 	var model = Alloy.createCollection("inpatient_record"); 
 	var data = model.getAllRecords();
 	for(var i = 0;i < data.length;i++){
   		var row = $.UI.create("TableViewRow",{classes:['hsize','wfill'],source:data[i].invno});		
 		var container = $.UI.create("View",{classes:['wfill','hsize','vert','padding']});
 		var titlebar = $.UI.create("View",{classes:['wfill','hsize']});
  		var title = $.UI.create("Label",{classes:['wsize','hsize','bold'],text:data[i].hospitalname,ellipsize: true,wordWrap:false,left:"0"});
  		var title_view = $.UI.create("View",{classes:['wsize','hsize','horz'],right:"0"}); 
  		var amount = $.UI.create("Label",{classes:['wsize','hsize','bold'],color:"#ad0000",text:"RM "+data[i].amount});
  		var btn = $.UI.create("ImageView",{classes:['wsize','hsize'],image:"/images/btn-forward.png"});
  		var name = $.UI.create("Label",{classes:['wsize','hsize'],text:data[i].name,left:"0"});
  		var date = $.UI.create("Label",{classes:['wsize','hsize'],text:data[i].admdt+" - "+data[i].disdt,left:"0"});  
		title_view.add(amount);
		title_view.add(btn);
		titlebar.add(title);
		titlebar.add(title_view);	
		container.add(titlebar);	
		container.add(name);
		container.add(date);
  		row.add(container);
  		row.addEventListener("click",function(e){
   		viewDetails(row);
  	});
  	tableData.push(row);
 }
 $.infoTable.setData(tableData);
}

function viewDetails(e){
	var nav = require('navigation');
	console.log("e:"+JSON.stringify(e.source));
	nav.navigateWithArgs("inpatient_detail", {
		params: e.source
	});
}
function closeWindow(){
	$.destroy();
	$.win.close();
}
$.win.addEventListener('close',function(e){
	closeWindow();
});

