var args = arguments[0] || {};
common.construct($); 
var medicalRecordsModel = Alloy.createCollection('medicalRecords');  
displayRecords(); 

function displayRecords(){
	var listing = medicalRecordsModel.getRecordsList(); 
	var data=[];  
   		var counter = 0; 
   		if(listing.length < 1){ 
			$.recordTable.setData(common.noRecord());
		}else{ 
	   		listing.forEach(function(entry) {
	   			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: 70,
			    source: entry.id, 
			   // layout: "vertical",
			    selectedBackgroundColor: "#ECFFF9",
				backgroundGradient: {
			      type: 'linear',
			      colors: ['#FEFEFB','#F7F7F6'],
			      startPoint: {x:0,y:0},
			      endPoint:{x:0,y:80},
			      backFillStart:false},
			   });
				
				var tblView = Ti.UI.createView({
					layout: "horizontal",
					height:"70",
					width:"100%" 
				}); 
				var leftView = Ti.UI.createView({
					layout: "vertical",
					height:"70",
					width:"80%" 
				}); 
				var rightView = Ti.UI.createView({
					layout: "vertical",
					height:"70",
					width:"auto" 
				}); 
				var title = entry.title;
				title = title.replace(/&quot;/g,"'");
				//title = title.slice(0,40);
				var message = entry.message;
				message = message.replace(/&quot;/g,"'");
				
				var recTitle = Titanium.UI.createLabel({
					text: title,
					font:{fontSize:16},
					source: entry.id,
					color: "#848484",
					width:'90%',
					textAlign:'left',
					top:5,
					left:20, 
					height:Ti.UI.SIZE
				});
				
				var recMsg =  Titanium.UI.createLabel({
					text: message,
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'}, 
					color: "#848484",
					textAlign:'left', 
					width:'100%', 
					left:20,
					height:15
				});
				
				var updatedRecord =  Titanium.UI.createLabel({
					text:timeFormat(entry.updated),
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					color: "#848484",
					textAlign:'left', 
					left:20,
					height:Ti.UI.SIZE
				}); 
				
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-forward.png",
					source: entry.id,
					height:20,
					top:30,
					right:20 
				});		
				
				row.addEventListener('click', function(e) {
				 	viewDetails(e.rowData.source);
				});
			  
				leftView.add(recTitle);
				leftView.add(recMsg);
			 	leftView.add(updatedRecord);  
			 	rightView.add(rightForwardBtn);
			 	tblView.add(leftView); 
			 	tblView.add(rightView);
			 	row.add(tblView);
				data.push(row);
	   		});
	   		
	   		$.recordTable.setData(data);  
		} 
};


function viewDetails(rec_id){  
	var res_rec = medicalRecordsModel.getRecordById(rec_id);
	 
	console.log(res_rec);
	var title = res_rec.title;
	title = title.replace(/&quot;/g,"'");
				
	var message = res_rec.message;
}

Ti.App.addEventListener('displayRecords',displayRecords);
$.newRecord.addEventListener('click',function(){
	nav.navigationWindow("newMedical");
});
