var args = arguments[0] || {};
var id = args.id || "";
var MRECORDS = require('medicalRecords');
MRECORDS.construct($); 
var clickTime = null;
var skipUpdate = false;
var medicalAttachmentModel = Alloy.createCollection('medicalAttachmentV2'); 
var medicalRecordsModel = Alloy.createCollection('medicalRecordsV2');

var details = medicalRecordsModel.getDataById(id);
if(OS_IOS){
	var MediaPickerModule = require('MediaPicker').MediaPicker;
	var MediaPicker = new MediaPickerModule();
}

loadMedicalInfo();
 
function loadMedicalInfo(){ 
	loadImage(); 
	var title = details.title; 
	if(title != ""){
		title = title.replace(/&quot;/g,"'");
	} 
	var clinic = details.clinic; 
	if(clinic == "undefined"){
		clinic= "";
	}
	
	var treatment = details.treatment;
	if(treatment == "undefined"){
		treatment= "";
	}
	var message = details.message;
	var treatment = treatment;
	$.titleRecord.value= title;
	$.clinicRecord.value= clinic;
	$.proceduceTextArea.value= message ;
	$.treatmentTextArea.value= treatment ;
	$.lastUpdated.text = "Last updated: " +timeFormat(details.updated);
} 

function loadImage(){
	var recAttachment = medicalAttachmentModel.getData(id);
	var counter = 0;
	 
	removeAllChildren($.attachment);
	if(recAttachment.length > 0){ 
	 	recAttachment.forEach(function(att){ 
	 		 
	 		//if(typeof att.blob == "undefined"  ){
	 			var myImage = att.img_path;
	 		//}else{
	 		//	var myImage = Ti.Utils.base64decode(att.blob);
	 		//}
	 		 
	 		$.attachment.add(attachedPhoto(myImage, counter));
	 		counter++;  
	 	}); 
	 }
}

function saveRecord(){
	var title      = $.titleRecord.value; 
	var clinic      = $.clinicRecord.value; 
	var message   = $.proceduceTextArea.value;
	var treatment = $.treatmentTextArea.value;

	if(title.trim() == ""){
		title = "Untitled - "+ common.now();
	}  
	
	/** save text information***/
	var param = { 
		id :id,
		u_id : Ti.App.Properties.getString('u_id'),
		clinic : clinic,
		title : title,
		message  : message,
		treatment : treatment,
		created : details.created,
		updated : common.now(),
	};    
	API.callByPost({url: "addUpdateMedicalRecord", params: param}, function(){
		medicalRecordsModel.saveArray([{ 
			id : id,
			title : title.trim(),
			clinic  : clinic.trim(),
			message : message.trim(),
			treatment : treatment.trim(),  
			updated : common.now()
		}]);  
		Ti.App.fireEvent('displayRecords');
		nav.closeWindow($.editRecWin);
	});
} 
function deleteRecord(){
	
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['Cancel','Confirm'],
		message: 'Are you sure want to delete this records?',
		title: 'Delete Confirmation'
	});
	dialog.addEventListener('click', function(e){
		if (e.index === e.source.cancel){
		      //Do nothing
		}
		if (e.index === 1){ 
			var param = {  
				"id" : id,
				'status': 2
			};
			API.callByPost({url: "changeMedicalRecord", params: param}, function(responseText){
				console.log(responseText);
				var res = JSON.parse(responseText);  
				
				if(res.status == "success"){  
					medicalRecordsModel.saveArray(res.data);
					skipUpdate = true;
					nav.closeWindow($.editRecWin);
				}
			});
		}
	});
	dialog.show(); 
	
}

function hideKeyboard(){
	MRECORDS.hideKeyboard();
}

function backAndSave(){
	var title      = $.titleRecord.value; 
	var message    = $.proceduceTextArea.value;
	var treatment  = $.treatmentTextArea.value;
	if(title.trim() == "" && message.trim() == "" && treatment.trim() == ""){
		var recAttachment = medicalAttachmentModel.getRecordByMecId(id);
		 
		if(recAttachment.length == 0){
			medicalRecordsModel.removeRecordById(id);
		}
		
	}else{
		saveRecord();
	}   
	
	Ti.App.fireEvent('displayRecords');
	//nav.closeWindow($.editRecWin);
}

function attachedPhoto(image,position){
	
	var iView = Ti.UI.createView({
		backgroundColor: "#D5D5D5",
		height : 50,
		position : position,
		width: 50,
		left:5,
		right: 5,
		bottom:0
	});
	console.log(image);    
	var iImage = Ti.UI.createImageView({
		image : image,
		position :position,
		width: Ti.UI.FILL
	}); 
	iView.add(iImage);
	
	iView.addEventListener('click',function(e){
		// double click prevention
	    var currentTime = new Date();
	    if (currentTime - clickTime < 1000) {
	        return;
	    };
	    clickTime = currentTime; 
		var page = Alloy.createController("attachmentDetails",{rec_id:id,position:position}).getView(); 
	  	page.open();
	  	page.animate({
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
			opacity: 1,
			duration: 300
		});
	});
	return iView;	            
}
var categoryType = "Blood Test";

function showCategory(){
	var dialog = Titanium.UI.createOptionDialog({ 
	    title: 'Choose a test category...', 
	    options: ['Blood Test','X Ray', 'ECG/Stress test','Urine test','etc', 'Cancel'], 
	    cancel: 5 //index of cancel button
	});

	dialog.addEventListener('click', function(e) { 
		if(e.index == 0) {
			categoryType = "Blood Test";
		}else if(e.index == 1){
			categoryType = "X Ray";
		}else if(e.index == 1){
			categoryType = "ECG/Stress test";
		}else if(e.index == 1){
			categoryType = "Urine test";
		}else if(e.index == 1){
			categoryType = "etc";
		}
		takePhoto();
	});
	
	dialog.show();
}

function takePhoto(){ 
	var dialog = Titanium.UI.createOptionDialog({ 
	    title: 'Choose an image source...', 
	    options: ['Camera','Photo Gallery', 'Cancel'], 
	    cancel:2 //index of cancel button
	});
	var pWidth = Ti.Platform.displayCaps.platformWidth;
    var pHeight = Ti.Platform.displayCaps.platformHeight;
     
	dialog.addEventListener('click', function(e) { 
	    
	    if(e.index == 0) { //if first option was selected
	        //then we are getting image from camera
	        Titanium.Media.showCamera({ 
	            success:function(event) { 
	               var image = event.media;
        		   if(image.width > image.height){
	        			var newWidth = 640;
	        			var ratio =   640 / image.width;
	        			var newHeight = image.height * ratio;
	        		}else{
	        			var newHeight = 640;
	        			var ratio =   640 / image.height;
	        			var newWidth = image.width * ratio;
	        		} 
	        		 
					image = image.imageAsResized(newWidth, newHeight); 
	                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
	                   //var nativePath = event.media.nativePath;  
			            blobContainer = image;  
					 	var getStr = "&medical_id="+id+"&u_id="+Ti.App.Properties.getString('u_id')+"&caption="+categoryType; 
					  
						API.callByPostImage({url: "addMedicalAttachment", params: getStr, image:image}, function(responseText){
							 
							var res = JSON.parse(responseText);  
							if(res.status == "success"){  
								var model = Alloy.createCollection("medicalAttachmentV2");
								var res = JSON.parse(responseText);
								var arr = res.data || null;
								model.saveArray(arr);
							}
							
				            loadImage(); 
						});	 
					 	
					 	
	                }
	            },
	            cancel:function(){
	                //do somehting if user cancels operation
	            },
	            error:function(error) {
	                //error happend, create alert
	                var a = Titanium.UI.createAlertDialog({title:'Camera'});
	                //set message
	                if (error.code == Titanium.Media.NO_CAMERA){
	                    a.setMessage('Device does not have camera');
	                }else{
	                    a.setMessage('Unexpected error: ' + error.code);
	                }
	 
	                // show alert
	                a.show();
	            },
	            allowImageEditing:true,
	            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
	            saveToPhotoGallery:true
	        });
	    } else if(e.index == 1){
	    	if(OS_IOS){
		    	var maximumImageCount = 20;
				MediaPicker.show(function(e){saveImage(e);}, maximumImageCount, 'photos', 'Choose up to four images! Longlick image for preview.');
			}else{
	    		//obtain an image from the gallery
		        Titanium.Media.openPhotoGallery({
		            success:function(event){
		            	// set image view
		            	var image = event.media;
		            	if(image.width > image.height){
		        			var newWidth = 640;
		        			var ratio =   640 / image.width;
		        			var newHeight = image.height * ratio;
		        		}else{
		        			var newHeight = 640;
		        			var ratio =   640 / image.height;
		        			var newWidth = image.width * ratio;
		        		} 
						image = image.imageAsResized(newWidth, newHeight); 
			            blobContainer = image; 
			           	 
						var param = { 
					 		medical_id :id,
					 		u_id :Ti.App.Properties.getString('u_id'),
					 		caption : categoryType,
					 		Filedata : image,
						};	
						var getStr = "&medical_id="+id+"&u_id="+Ti.App.Properties.getString('u_id')+"&caption="+categoryType;  
						API.callByPostImage({url: "addMedicalAttachment", params: getStr, image:image}, function(responseText){
							var res = JSON.parse(responseText);  
							if(res.status == "success"){  
								var model = Alloy.createCollection("medicalAttachmentV2");
								var res = JSON.parse(responseText);
								var arr = res.data || null;
								model.saveArray(arr);
							}
							
				            loadImage(); 
						});
		            },
		            cancel:function() {
		               
		            },
		            
		            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
		        });
	    	}
	    	 
	    	
	    } else {
	        
	    }
	});
	 
	//show dialog
	dialog.show();

}

function iterate(item){
	MediaPicker.getImageByURL({
		key: item.url,
		id: item.id,
		success: function(e) {
			var image;
			if(e.image.apiName == 'Ti.Blob'){
				image = e.image;
			}else{
				var imageview = Ti.UI.createImageView({
					image: 'file://'+e.image
				});
				image = imageview.toBlob();
			}
			
			if(image.width > image.height){
				var newWidth = 640;
				var ratio =   640 / image.width;
				var newHeight = image.height * ratio;
			}else{
				var newHeight = 640;
				var ratio =   640 / image.height;
				var newWidth = image.width * ratio;
			} 
			image = image.imageAsResized(newWidth, newHeight); 
		    blobContainer = image; 
		   	 
		   	var param = { 
		 		medical_id :id,
		 		u_id :Ti.App.Properties.getString('u_id'),
		 		caption : categoryType,
		 		Filedata : image,
			};	 
			console.log(param);
			API.callByPost({url: "addMedicalAttachment", params: param}, function(responseText){
				var res = JSON.parse(responseText);  
				if(res.status == "success"){  
					var model = Alloy.createCollection("medicalAttachmentV2");
					var res = JSON.parse(responseText);
					var arr = res.data || null;
					console.log(responseText);
					model.saveArray(arr);
				}
				
	            loadImage(); 
			});
		}
	});
}

function saveImage(items){
	console.log(items.length+"?total image picker");
	for (var a = 0; items.length > a; a++){
		iterate(items[a]);
	}
}

$.proceduceTextArea.addEventListener('focus', function(){
	//$.proceduceTextArea.setHeight("70%");
});
 
$.editRecWin.addEventListener('close',function(){
	if(!skipUpdate){
		backAndSave();
	}
	Ti.App.removeEventListener('refreshAttachment',loadImage );
	$.destroy();
	Ti.App.fireEvent("myMedicalRecord:refresh");
	console.log("window close");
});
Ti.App.addEventListener('refreshAttachment',loadImage );
$.saveRecord.addEventListener('click', saveRecord);

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){
		nav.closeWindow($.editRecWin); 
	}); 
}

var applicationDatDirectory = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory);
var filesInFolder = applicationDatDirectory.getDirectoryListing();


