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
  var hospital = $.UI.create("Label",{classes:['wsize'],height:"40",text:data[i].hospitalname,ellipsize: true,wordWrap:false,right:3}); 
  var date = $.UI.create("Label",{classes:['wsize','hsize'],text:data[i].admdt,left:3});  
  var container = $.UI.create('View',{classes:['wfill','horz'],height:40});
  var container_data = $.UI.create('View',{classes:['hsize'],width:"90%"});
  var img = $.UI.create('ImageView',{width:"30",height:"30",image:"/images/btn-forward.png"});
  container_data.add(date); 
  container_data.add(hospital);  
  container.add(container_data);
  container.add(img);
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

