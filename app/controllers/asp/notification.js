var args = arguments[0] || {};
var id = args.id || "";
var notificationModel = Alloy.createCollection('notificationV2');  
var PDF = require('pdf'); 
var notificationList;
var u_id = Ti.App.Properties.getString('u_id');

var loading = Alloy.createController('loading');
init();

function init(){ 
	$.win.add(loading.getView());
	loading.start();
	//notificationModel.setAllAsRead({u_id: u_id });
	displayList();
	//syncFromServer();
} 

function syncFromServer(){
	var checker = Alloy.createCollection('updateChecker'); 
	var isUpdate = checker.getCheckerById("2");
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}
	var param = { 
		"member_no"	  : memno,
		"last_updated" : last_updated
	};
 
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
						"status" : entry.status || "",
						"expired" : entry.expired || "",
						"detail": entry.detail || "",
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
	notificationList = notificationModel.getList({u_id: u_id });  
	var data=[]; 
	$.recordTable.setData(data);
	var counter = 0; 
	if(notificationList.length < 1){
		loading.finish(); 
	}else{
		notificationList.forEach(function(entry) {
			console.log(entry.is_read+" entry.is_read");
			var unread_bg = (entry.is_read == 1)?"#ffffff":"#cccccc";
			console.log(unread_bg);
			var row = $.UI.create("TableViewRow", {classes:['hsize','wfill'], record: entry, backgroundSelectedColor: "#FFE1E1", backgroundColor: unread_bg});
			var contentView = $.UI.create('View', {classes: ['vert','hsize','wfill', 'padding'], touchEnabled: false});
			var label_subject = $.UI.create("Label", {classes:['themeColor', 'wfill', 'h5', 'bold', 'hsize'], maxLines:3, touchEnabled: false, text: entry.subject || ""});
			var label_message = $.UI.create("Label", {classes:['h6', 'wfill', 'hsize'], maxLines:3, touchEnabled: false, text: entry.content || "" });
			var updated = entry.updated;
			updated = updated.replace("  "," ");
			var label_updated_time = $.UI.create("Label", {classes:['themeColor', 'wfill', 'h6', 'hsize'], touchEnabled: false, text: "Last Updated : "+monthFormat(updated)});
			contentView.add(label_subject);
			contentView.add(label_message);
			contentView.add(label_updated_time);
			
			//var rightForwardBtn =  $.UI.create("ImageView", {image:"/images/btn-forward.png", width:15, right:10 });
			row.add(contentView);
			row.addEventListener("click", function(e){
				var source = e.source.record;
				e.source.backgroundColor = "#ffffff";
				console.log(source);
				notificationModel.setRead(e.source.record.id);
				nav.navigationWindow(source.target,"","", source);
			});
			//row.add(rightForwardBtn);
			/*if(entry.url != ""){
				row.addEventListener('click', function(e) {
					viewDetails(e.rowData);
				});
			}else if(entry.detail != ""){
				row.addEventListener('click', function(e) {
					loadHTML(e.rowData.detail);
				});
			}*/
		 	
			data.push(row);
		});
	
		
		$.recordTable.setData(data);
	}
	loading.finish();
}

function loadHTML(html){
	
	var htmlText ="<style>body{font-family:arial;font-size:14px;color:#606060;} a {text-decoration:none;color:#CE1D1C}</style><body>"+decodeURIComponent(html)+"</body>";
	htmlText = htmlText.replace(/(?:\r\n|\r|\n)/g, '<br />');
	
	nav.navigateWithArgs("webview", {
		html: htmlText
	});
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
	Ti.App.fireEvent("updateNotification", {target: "notification", model: "notificationV2"});
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

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('displayRecords', displayList);
	$.destroy();
	console.log("window close");
});