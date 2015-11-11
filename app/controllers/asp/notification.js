var args = arguments[0] || {};
var id = args.id || "";
var notificationModel = Alloy.createCollection('notification');  
var PDF = require('pdf'); 
var notificationList;
common.construct($); 
common.showLoading();
init();

function init(){ 
	notificationModel.setAllAsRead({member_no: Ti.App.Properties.getString('memno') });
	displayList();
	syncFromServer();
} 

function syncFromServer(){
	var checker = Alloy.createCollection('updateChecker'); 
	var isUpdate = checker.getCheckerById("2");
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}  
	var param = { 
		"member_no"	  : Ti.App.Properties.getString('memno'),
		"last_updated" : last_updated
	};
	console.log(param);
	API.callByPost({url:"getNotificationUrl", params: param}, function(responseText){ 
		var res = JSON.parse(responseText);  
		if(res.status == "success"){  
			var record = res.data;
			if(record.length > 0){ 
				record.forEach(function(entry) {
					var param = {
						"id": entry.id || "",
						"member_no": entry.member_no || "",
						"subject":entry.subject || "",
						"message" : entry.message || "",
						"status" : entry.status || 1,
						"url" : entry.url || "",
						"isRead" : "0",
						"expired" : entry.expired || "",
						"created" : entry.created,
						"updated" : entry.updated,
					};
					notificationModel.addData(param);
				});
				 checker.updateModule("2","notificationList",res.last_updated); 
				 displayList(); 
			}
		}
		
	});
	
}

function displayList(){  
	notificationList = notificationModel.getList({member_no: Ti.App.Properties.getString('memno') });  
	var data=[]; 
	$.recordTable.setData(data);
	var counter = 0; 
 
	if(notificationList.length < 1){
		common.hideLoading(); 
		$.recordTable.setData(common.noRecord());
	}else{
		notificationList.forEach(function(entry) {
			 
			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: Ti.UI.SIZE,
			    source: entry.id,
			    title: entry.subject,
			    url: entry.url,
			    backgroundSelectedColor: "#FFE1E1", 
				color: "transparent", 
			   });
		 
			var contentView = $.UI.create('View',{
				classes: ['vert','hsize','wfill'], 
				source: entry.id,
				url: entry.url,
				title: entry.subject,
				top: 10,
				bottom: 10
			});
			  
			var clinicLbl = $.UI.create('Label',{
				classes : ['themeColor', 'h5', 'bold'],
				text:entry.subject || "",
				font:{fontSize:14},
				source: entry.id, 
				title: entry.subject,
				url: entry.url,
				textAlign:'left',   
				left:15, 
				width:"80%",
				height:Ti.UI.SIZE
			}); 
			contentView.add(clinicLbl);
			
			
			 var msgLbl =  $.UI.create('Label',{ 
				classes: ['h6', 'hsize'],
				text:  entry.message, 
				source: entry.id, 
				url: entry.url,
				title: entry.subject,
				textAlign:'left', 
				left:15, 
				width: "85%", 
			}); 
			 
			contentView.add(msgLbl);
			
			var updated = entry.updated;
			updated = updated.replace("  "," ");
			var appLbl =  $.UI.create('Label',{ 
				classes: ['h6'],
				text:  "Last Updated : "+monthFormat(updated), 
				source: entry.id, 
				url: entry.url,
				title: entry.subject,
				textAlign:'left', 
				left:15, 
				width: "85%",
				height:Ti.UI.SIZE
			}); 
			contentView.add(appLbl);
			
			var rightForwardBtn =  Titanium.UI.createImageView({
				image:"/images/btn-forward.png",
				source: entry.id,
				title: entry.subject,
				url: entry.url,
				width:15,
				right:20 
			});
		 
			row.add(contentView);
			//row.add(rightForwardBtn); 
			if(entry.url != ""){
				row.addEventListener('click', function(e) {
					viewDetails(e.rowData);
				});
			}
		 	
			data.push(row);
		});
	
		
		$.recordTable.setData(data);
	}
	common.hideLoading(); 
}

function viewDetails(msg){  
	//msg.source;msg.url;
	downloadBrochure(msg);
	//nav.navigateWithArgs("appointmentForm",{id: rec_id}); 
}
 
if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.win); 
	}); 
}

Ti.App.addEventListener('displayRecords', displayList);
/** close all editProfile eventListener when close the page**/
$.win.addEventListener("close", function(){
	$.destroy(); 
    Ti.App.removeEventListener('displayRecords', displayList);
});

var isDownloading = "0";
var isDownloadLbl = "0";
//ex.source.id,ex.source.leafLet,ex.source.url,ex.source.downloaded,ex.source.name
//id,content,targetUrl,downloaded, title
function downloadBrochure(content){ 
	//adImage.addEventListener( "click", function(){
		var indView = Ti.UI.createView({
			height : 100,
			layout : "vertical",
			backgroundColor : "#ffffff" ,
			bottom: 5,
			width : Ti.UI.SIZE
		});
		if(isDownloading == "1"){
			var label = Ti.UI.createLabel({
				color: '#CE1D1C',
				font: { fontSize:10, fontWeight:"bold" },
				text: 'Please wait until current downloading is done.',
				bottom: 10,
				width:"100%",
				height:10,
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER 
			});
		 	
		 	if(isDownloadLbl == "0"){
		 		$.bigView.add(label);
		 		
		 		setTimeout(function(){
		 			isDownloadLbl = "0";
		 			$.bigView.remove(label);
		 		},3000);
		 	}
			isDownloadLbl = "1";
			return false;
		}
		isDownloading = "1";
		var ind=Titanium.UI.createProgressBar({
			width: "90%",
			height:50,
			min:0,
			max:1,
			value:0,
			top: 5,
			message:'Downloading '+content.title+'...',
			font:{fontSize:12},
			color:'#CE1D1C',
		});
		 
		var label = Ti.UI.createLabel({
			color: '#CE1D1C',
			font: { fontSize:14, fontWeight:"bold" },
			text: '0%',
			top: 0,
			width:"100%",
			height:30,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER 
		});
		
		
	  
		if(content.isDownloaded == "1"){  
			indView.remove(ind);
			indView.remove(label); 
			$.bigView.setVisible(false);
			
		}else{  
			ind.show(); 
			indView.add(ind);
			indView.add(label); 
			$.bigView.add(indView);
			$.bigView.setVisible(true);
		}
							
		PDF.createPdf(content.url,true, ind,label,indView,  function (err, file, base, url) {
			if (err){
				alert(err);
			}else{ 
				isDownloading = "0";
				 
			    indView.hide();  
			    $.bigView.remove(indView); 
			    
				if(Ti.Platform.osname == "android"){
					console.log("file return : "+file.getNativePath());
					PDF.android_launch(file);
				}else{
					
				var myModal = Ti.UI.createWindow({
					title           : 'Read PDF',
					backgroundColor : 'transparent',
					fullscreen		:true
				});
				var leftBtn = Ti.UI.createButton({
					title: "Close",
					color: "#CE1D1C",
					left: 15
				});
				var wrapperView    = Ti.UI.createView({
					layout:"vertical",
					height: Ti.UI.SIZE
				}); 
				// Full screen
				var topView = Ti.UI.createView({  // Also full screen
				    backgroundColor : '#EEEEEE',
				    top         : 0,
				    height		: 40
				});
				var containerView  = Ti.UI.createView({  // Set height appropriately
				    height          : Ti.UI.SIZE,
				    width			: Ti.UI.FILL,
				    backgroundColor : 'transparent'
				});
				var webview = Ti.UI.createWebView({ 
				   data: file.read(),
				   height: Ti.UI.FILL,
				   width: Ti.UI.FILL,
				   backgroundColor:"#ffffff",
				   bottom:10 
				});
				if(content.url != ""){
					var rightBtn = Ti.UI.createButton({
						title: "Delete",
						color: "#CE1D1C",
						right: 15
					});
					
					rightBtn.addEventListener('click',function(rx){ 
						var dialog = Ti.UI.createAlertDialog({
							cancel: 0,
							buttonNames: ['Cancel','Confirm'],
							message: 'Are you sure want to delete?',
							title: 'Message'
						});
						dialog.addEventListener('click', function(e){
							if (e.index === e.source.cancel){
							      //Do nothing
							}
							if (e.index === 1){
								var param = { 
									"status"	  : 2,
									"id" : content.source
								};
								console.log(param);
								API.callByPost({url:"deleteNotification", params: param}, function(responseText){
									var res = JSON.parse(responseText);  
									if(res.status == "success"){  
										notificationModel.update_status(param);
										displayList();
										myModal.close({animated: true});
									}
								});
							}
						});
						dialog.show();
					});  
					topView.add(rightBtn);
				}
				containerView.add(webview);
				topView.add(leftBtn);
				wrapperView.add(topView);
				wrapperView.add(containerView); 
				myModal.add(wrapperView); 
				myModal.open({
					modal : true
				});
				leftBtn.addEventListener('click',function(ex){
					myModal.close({animated: true});
				});
					
			    }
			   } 
		});
	//});
}