var args = {};

$.init = function (arg) {
	$.image_preview.image = WPATH('images/upload_arrow.png');
	args = arg;
};

function camera_callback(event){
    var new_height = (event.media.height <= event.media.width)?event.media.height*(1024 / event.media.width):1024;
    var new_width = (event.media.width <= event.media.height)?event.media.width*(1024 / event.media.height):1024;
    var blob = event.media;
    blob = blob.imageAsResized(new_width, new_height);
    $.image_preview.height = 120;
    $.image_preview.width = Ti.UI.SIZE;
    $.image_preview.image = blob;
    $.image_preview.parent.filedata = blob;
    $.image_preview.parent.attached = 1;
}

function showCamera(){
	Titanium.Media.showCamera({ 
        success:function(event) { 
           //image_preview(event);
           camera_callback(event);
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
        allowImageEditing:false,
        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
        saveToPhotoGallery:true
    });	 
}

function popCamera(e){
	
	if(!filepermittion()) return;

	var dialog = Titanium.UI.createOptionDialog({ 
	    title: 'Choose an image source...', 
	    options: ['Camera','Photo Gallery', 'Cancel'], 
	    cancel:2 //index of cancel button
	});
	var pWidth = Ti.Platform.displayCaps.platformWidth;
    var pHeight = Ti.Platform.displayCaps.platformHeight;
     
	dialog.addEventListener('click', function(ex) { 
	    
	    if(ex.index == 0) { //if first option was selected
	        //then we are getting image from camera]
	        if(Ti.Media.hasCameraPermissions()){
		        showCamera();       			        	
	        }else{
		        Ti.Media.requestCameraPermissions(function(request_e){
		        	if(request_e.success){
		        		showCamera();  		
		        	}
		        	else{
		        		alert("You denied permission.");
		        	}
		        });
	        }
	    }else if(ex.index == 1){

			Titanium.Media.openPhotoGallery({
	            
	            success:function(event) {
	            	//saveLocal({message: "", format:"photo", filedata: event});
	           		//image_preview(event);
	           		camera_callback(event);
				},
				cancel:function() {
					// called when user cancels taking a picture
				},
				error:function(error) {
					// called when there's an error
					var a = Titanium.UI.createAlertDialog({title:'Camera'});
					if (error.code == Titanium.Media.NO_CAMERA) {
						a.setMessage('Please run this test on device');
					} else {
						a.setMessage('Unexpected error: ' + error.code);
					}
					a.show();
				},
			    // allowEditing and mediaTypes are iOS-only settings
				allowEditing: false,
	            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
	        });
	    }
	});
	 
	//show dialog
	dialog.show();
}

function filepermittion()
{
	if(OS_ANDROID)
	{
		if(Ti.Filesystem.hasStoragePermissions()) return true;
		else{
			 Ti.Filesystem.requestStoragePermissions(function(e){
			    if(e.success){
			    	return true;
			    }
			    else{
			        alert("You have denied the permission.");
			        return false;
			   	}
			 });
		}
	}else{
		if(Ti.Media.hasPhotoGalleryPermissions()) return true;
		else{
			 Ti.Media.requestPhotoGalleryPermissions(function(e){
			    if(e.success){
			    	return true;
			    }
			    else{
			        alert("You have denied the permission.");
			        return false;
			   	}
			 });
		}
	}
}

function image_preview(event){
	if(typeof $.container.children[1] != "undefined"){
		$.container.children[1].image = event.media;
	}else{
		$.container.add($.UI.create("ImageView", {image: event.media, width: 120, classes:['hsize']}));
	}
}
