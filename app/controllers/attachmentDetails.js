var args = arguments[0] || {};
var rec_id = args.rec_id;
var position = args.position;  
//load model 
var medicalAttachmentModel = Alloy.createCollection('medicalAttachment'); 
var getAttImages = function(){
	var items  = medicalAttachmentModel.getRecordByMecId(rec_id);
	var counter = 0;
	var imagepath, adImage, row = '';
	var my_page = 0;
	   		
	/***Set ads items***/
	var the_view = [];
	
	for (var i=0; i< items.length; i++) {
		var myImage = Ti.Utils.base64decode(items[i].blob);
		adImage = Ti.UI.createImageView({
			image: myImage,
			width:"100%",
			top: 40,
		});
		
		var scrollView = Ti.UI.createScrollView({
			contentWidth: 'auto',
		  	contentHeight: Ti.UI.SIZE,
		   	maxZoomScale: 30,
		    minZoomScale: 1,
		    zoomScale: 1,
		  	height: Ti.UI.FILL,
		  	width: '100%'
		});
		
		var img_caption = Ti.UI.createLabel({
			text: items[i].category,
			height: 40,
			top: 0,
			color: "#ffffff"
		});
	
		row = $.UI.create('View', {classes: ["row"], id:"view"+counter});
		
		$.attachment_Details.title=items[i].category;
		row.add(adImage);
		row.add(img_caption);
		scrollView.add(row);
		the_view.push(scrollView); 
		
		counter++;
	} 

	var scrollableView = Ti.UI.createScrollableView({
		  id: "scrollableView",
		  views:the_view, 
		  backgroundColor : "#000000",
		  showPagingControl:true
	});
	
	$.albumView.add(scrollableView);
	
	scrollableView.scrollToView(position, true); 
	 
	scrollableView.addEventListener( 'scrollend', function(e) {
		if((scrollableView.currentPage+1) === items.length){
			if(scrollableView.currentPage === my_page){
				scrollableView.currentPage=0;
			}
		}
		
		my_page =  scrollableView.currentPage;
	});
	
	var deleteView = Ti.UI.createView({
		height 	: 40,
		bottom	: 0,
		width	: "100%",
		backgroundColor	: "#EEEEEE"
	});
	
	var deleteBtn = Ti.UI.createButton({
		backgroundImage : "/images/btn-remove.png",
		textAlign : "left",
		left	: 15,
		width	:30,
		height  :30
	});
	deleteView.add(deleteBtn);	
	deleteBtn.addEventListener('click',function(){
		my_page = scrollableView.currentPage; 
		var dialog = Ti.UI.createAlertDialog({
			cancel: 1,
			buttonNames: ['Cancel','Confirm'],
			message: 'Are you sure want to delete this photo?',
			title: 'Delete Confirmation'
		});
		dialog.addEventListener('click', function(e){
			if (e.index === e.source.cancel){
			      //Do nothing
			}
			if (e.index === 1){ 
				medicalAttachmentModel.removeRecordById(items[my_page].id);
				getAttImages();
				Ti.App.fireEvent('refreshAttachment'); 
				$.attachment_Details.close({
					curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
					opacity: 0,
					duration: 200
				});
			}
		});
		dialog.show(); 
		
	});		 
	$.attachment_Details.add(deleteView); 
};

$.albumView.addEventListener('click', function(){
		$.attachment_Details.close({
			curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
			opacity: 0,
			duration: 200
		});
	});
/************************
*******APP RUNNING*******
*************************/
getAttImages();
