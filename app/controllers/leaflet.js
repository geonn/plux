var args = arguments[0] || {};
var PDF = require('pdf'); 
var leafletModel = Alloy.createCollection('leaflet');  
var leaflist = leafletModel.getLeaftletList();
//PDF.construct($);
loadLeafLetList(); 
function loadLeafLetList(){ 
	if(leaflist.length > 0 ){ 
		for(var i=0; i < leaflist.length; i++){ 
			var leafView = Ti.UI.createView({
				bottom: 0,
				right: 5,
				height : 200,
				width: "30%"
			});
			
			var leafImage = Ti.UI.createImageView({
				id: leaflist[i].id,
				image: leaflist[i].cover,
				backgroundImage : leaflist[i].cover, 
				leafLet :  leaflist[i].attachment, 
				name :  leaflist[i].title, 
				url :  leaflist[i].url, 
				downloaded : leaflist[i].isDownloaded, 
				defaultImage: "/images/warm-grey-bg.png",
				bottom : 0,
				width: 90
			});
			var activityIndicator = common.showImageIndicator(); 
			
			downloadBrochure(leafImage,leaflist[i]);  
			 
			leafView.add(leafImage);
			leafView.add(activityIndicator);
			common.imageIndicatorEvent(leafImage,activityIndicator);
			
			if(i % 3 == 0){
				var containerView = Ti.UI.createView({
					bottom: 0,
					layout: "vertical",
					height : 220, 
					width: "100%"
				});
				var innerView = Ti.UI.createView({ 
					layout: "horizontal",
					height : Ti.UI.SIZE,
					width: "100%",
					left: "5%", 
					right: "5%"
				});	
				 
				innerView.add(leafView); 
				containerView.add(innerView);
				$.mainView.add(containerView);
			}else{ 
				innerView.add(leafView);
				if((i+1)  % 3 == 0){
					var lineImg = Ti.UI.createImageView({
						image: '/images/div.png',
						width: "100%"
					});
					innerView.add(lineImg); 
				}
			}
		}
		 
	}
}
var isDownloading = "0";
var isDownloadLbl = "0";
//ex.source.id,ex.source.leafLet,ex.source.url,ex.source.downloaded,ex.source.name
//id,content,targetUrl,downloaded, title
function downloadBrochure(adImage,content){ 
	adImage.addEventListener( "click", function(){
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
							
		PDF.createPdf(content.attachment,true, ind,label,indView,  function (err, file, base, url) {
			if (err){
				alert(err);
			}else{ 
				isDownloading = "0";
				leafletModel.updateDownloadedBrochure(content.id);
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
						title: "Details",
						color: "#CE1D1C",
						right: 15
					});
					rightBtn.addEventListener('click',function(rx){ 
						var BackBtn = Ti.UI.createButton({
							title: "Back",
							color: "#CE1D1C",
							right: 15
						});
						BackBtn.addEventListener('click',function(sa){
								BackBtn.setVisible(false);
								rightBtn.setVisible(true);
								webview.setData(file.read()); 
						});
						topView.add(BackBtn);
						rightBtn.setVisible(false);
						BackBtn.setVisible(true);
						webview.setUrl(content.url); 
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
	});
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.leaftletWin); 
	}); 
}	 
