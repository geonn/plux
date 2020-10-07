var args = arguments[0] || {};
var id = args.id || "";
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


function monthFormat(datetime){

	var monthNames = [
        "Jan", "Feb", "Mar",
        "April", "May", "June", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

	var timeStamp = datetime.split(" ");
	var newFormat;
	var ampm = "am";
	var date = timeStamp[0].split("-");
    if(date[1] == "08"){
		date[1] = "8";
	}
	if(date[1] == "09"){
		date[1] = "9";
	}
    month = parseInt(date[1]) -1;
	if(timeStamp.length == 1){
		newFormat =  date[2]+" "+ monthNames[month]+" "+ date[0];
	}else{
		var time = timeStamp[1].split(":");
		if(time[0] > 12){
			ampm = "pm";
			time[0] = time[0] - 12;
		}

		newFormat = date[2]+" "+ monthNames[month]+" "+ date[0] + ", "+ time[0]+":"+time[1]+ " "+ ampm;
	}

	return newFormat;
}

function displayList(){  
	var data = [];
	Alloy.Globals.API.callByPost({url:"getArticleList", new: true, domain: "FREEJINI_DOMAIN"}, function(responseText){ 
		var res = JSON.parse(responseText);  
		if(res.status == "success"){  
			var raw_data = res.data;
			if(raw_data.length > 0){
				for(var i=0,j=raw_data.length; i<j; i++){
					var row = $.UI.create("TableViewRow", {classes:['hsize','wfill'], record: raw_data[i], backgroundSelectedColor: "#FFE1E1", backgroundColor: "#ffffff"});
					var contentView = $.UI.create('View', {classes: ['vert','hsize','wfill', 'padding'], touchEnabled: false});
					var label_subject = $.UI.create("Label", {classes:['themeColor', 'wfill', 'h5', 'bold', 'hsize'], maxLines:3, touchEnabled: false, text: raw_data[i].subject || ""});
					var label_message = $.UI.create("Label", {classes:['h6', 'wfill', 'hsize'], maxLines:3, touchEnabled: false, text: raw_data[i].content || "" });
					var updated = raw_data[i].updated;
					updated = updated.replace("  "," ");
					var label_updated_time = $.UI.create("Label", {classes:['themeColor', 'wfill', 'h6', 'hsize'], touchEnabled: false, text: "Date : "+monthFormat(updated)});
					contentView.add(label_subject);
					contentView.add(label_message);
					contentView.add(label_updated_time);
					
					//var rightForwardBtn =  $.UI.create("ImageView", {image:"/images/btn-forward.png", width:15, right:10 });
					row.add(contentView);
					row.addEventListener("click", function(e){
						var source = e.source.record;
						e.source.backgroundColor = "#ffffff";
						Alloy.Globals.nav.navigationWindow(source.target,"","", source);
					});
					data.push(row);
					console.log(data.length);
				};
				$.recordTable.setData(data);
			}
		}
		loading.finish(); 
	});
	
}

function loadHTML(html){
	
	var htmlText ="<style>body{font-family:arial;font-size:14px;color:#606060;} a {text-decoration:none;color:#CE1D1C}</style><body>"+decodeURIComponent(html)+"</body>";
	htmlText = htmlText.replace(/(?:\r\n|\r|\n)/g, '<br />');
	
	Alloy.Globals.nav.navigateWithArgs("webview", {
		html: htmlText
	});
}

function viewDetails(msg){  
	//msg.source;msg.url;
	downloadBrochure(msg);
	//Alloy.Globals.nav.navigateWithArgs("appointmentForm",{id: rec_id}); 
}
 
if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		Alloy.Globals.nav.closeWindow($.win); 
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
								Alloy.Globals.API.callByPost({url:"deleteNotification", params: param}, function(responseText){
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
});