var args = arguments[0] || {};
var loading = Alloy.createController("loading");
var anchor = common.now();
var last_update = common.now();
var start = 0;
var u_id = Ti.App.Properties.getString('u_id') || 0;
var dr_id;
var last_id = 0;
var last_uid;
var status_text = ["", "Sending", "Sent", "Read"];
var room_status;
var room_id = args.room_id || 0;
var voice_recorder = Alloy.createWidget('geonn.voicerecorder', {record_callback: saveLocal});
var user_read_status, doctor_read_status;
var opposite_online = "false";
var opposite_last_update;

target_page = "askDoctor/conversation";
Ti.App.Properties.setString('room_id', room_id);
console.log(args);
function saveLocal(param){
	var model = Alloy.createCollection("chat");
	var app_id = Math.random().toString(36).substr(2, 10);
	var local_save = {
		"u_id": u_id,
		"id": app_id,
	    "sender_id": u_id,
	    "message": param.message,
	    "room_id": room_id,
	    "created": common.now(),
	    "is_endUser": 1,
	    "dr_id": dr_id,
	    "format": param.format,
	    "status": 1,
	    "sender_name": Ti.App.Properties.getString('fullname') || ""
	};
	var id = model.saveArray([local_save]);
	var api_param = {u_id: u_id, dr_id: dr_id, message: param.message, is_endUser:1, id: app_id, room_id: room_id };
	if(param.format == "voice" || param.format == "photo"){
		loading.start();
		_.extend(api_param, {media: param.format, Filedata: param.filedata});
	}
	data = [{
        "u_id": u_id,
        "id": app_id,
        "sender_id": u_id,
        "message": param.message || param.filedata,
        "created": common.now(),
        "is_endUser": 1,
        "dr_id": dr_id,
        "room_id": room_id,
        "format": param.format,
        "status": 1,
        "sender_name": Ti.App.Properties.getString('fullname') || ""
    }];
    render_conversation(true, true);
	API.callByPost({url: "sendMessage", type: param.format, params:api_param}, function(responseText){

		var res = JSON.parse(responseText);
		$.message_bar.value = "";
		$.message_bar.editable = true;
		$.message_bar.blur();
		loading.finish();
		console.log(room_id+" room_id check");
		socket.sendMessage({room_id: room_id});
		socket.refresh_patient_list();
        $.enter_icon.right = -50;
	});
}

/**
 * Send message
 */
var interval;
var sending = false;
function SendMessage(){
    console.log("SendMessage");
	if(sending || $.message_bar.value == ""){
	    console.log("why return here?"+sending+" "+$.message_bar.value+"asd ");
		return;
	}
	loading.start();
	sending = true;
	$.message_bar.editable = false;
	//startTimer();
	saveLocal({message: $.message_bar.value,format:"text"});
}

function navToWebview(e){
	var url = parent({name:"url"}, e.source);
	console.log("navToWebview "+url);
	var win = Alloy.createController("webview", {url: url}).getView();
	win.open();
}

function addRow(row, latest){
	var view_container = $.UI.create("View",{
		classes: ['hsize','wfill'],
		id: row.id,
		message: row.message,
		status: row.status,
		is_endUser: row.is_endUser,
        created: row.created
	});

	if(row.sender_id){
		var view_text_container = $.UI.create("View", {
			classes:  ['hsize', 'vert', 'rounded'],
			top: 10,
			width: "75%",
			transform: Ti.UI.create2DMatrix().rotate(180),
			url: row.message
		});
		var label_name = $.UI.create("label",{
			classes: ['h6','wfill', 'hsize', 'bold'],
			top: 5,
			left: 60,
			bottom: 15,
			color: "#7F7F7F",
			text: row.sender_name
		});

		var ss = row.message || "";
		var newText = (row.format != "photo")?ss.replace("[br]", "\r\n"):row.message;
		var text_color = (row.format == "link")?"blue":"#606060";
		newText = (row.format == "link")?newText:newText;

		var label_message = $.UI.create("Label", {
			classes:['h5', 'wfill', 'hsize','padding'],
			color: text_color,
			text: newText
		});
		var row_status = row.status;
		if(row.is_endUser){
           var last_update_by_room = socket.getLastUpdateByRoom(room_id);
           if(last_update_by_room && last_update_by_room.last_update > row.created){
               row_status = 3;
           }
        }
		var label_time = $.UI.create("Label", {
			classes:['h7', 'wsize', 'hsize'],
			bottom:0,
			left: 60,
			//text: timeFormat(row.created)+" "+status_text[row_status],
			text: (!row.is_endUser)?timeFormat(row.created):timeFormat(row.created)+" "+status_text[row_status],
			textAlign: "right"
		});
		var view_photo_name = $.UI.create("View", {classes:['wfill','hsize']});
		if(row.dr_img_path != "" && row.dr_img_path != null){
		    console.log(row.dr_img_path+" row.dr_img_path");
		    var dr_img = $.UI.create("ImageView", {image: row.dr_img_path, width: 50, height: 50, left: 5, top: 5, params: {dr_specialty: row.dr_specialty, dr_qualification: row.dr_qualification, dr_introduction: row.dr_introduction, dr_img_path: row.dr_img_path}});
		    view_photo_name.add(dr_img);
		    view_photo_name.addEventListener("click", navToDoctorDetail);
		}
		var view_hr = $.UI.create("View", {classes: ['hr'], backgroundColor: "#ccc", top:10, left:15, right: 15});
		view_photo_name.add(label_name);
		view_text_container.add(view_photo_name);
		view_text_container.add(view_hr);
		if (row.format == "link"){
			var label_message2 = $.UI.create("Label", {
				classes:['h5', 'wfill', 'hsize','small_padding'],
				top: 0,
				left:15,
				text: "Thanks you for contacting our call centre. \nWe would love to hear your thoughts or feedback on how we can improve your experience!\nClick below to start the survey:"
			});

			view_text_container.add(label_message2);
			view_text_container.add(label_message);
		}else if(row.format == "voice"){
			var player = Alloy.createWidget('dk.napp.audioplayer', {playIcon: "\uf144", pauseIcon: "\uf28c", color: (row.is_endUser)?"#fff":"#000"});

			player.setUrl(newText);
			//download_video(player, newText);
			var view = $.UI.create("View", {classes:['wfill','hsize','padding']});
			view.add(player.getView());
			//view_text_container.add(label_name);
			view_text_container.add(view);
		}else if(row.format == "photo" ){
            console.log("photo here");
            console.log(newText+" "+timeFormat(row.created));
            var view = $.UI.create("View", {classes:['wfill','hsize','padding'], backgroundColor:"black", height: 200});
            var image_photo = $.UI.create("ImageView", {image: newText, classes:['hsize','wfill']});
            view.add(image_photo);
           // view_text_container.add(label_name);
            view_text_container.add(view);
            image_photo.addEventListener("click", imageZoom);
        }else{
			//view_text_container.add(label_name);
			view_text_container.add(label_message);
		}

		view_photo_name.add(label_time);
		if(row.is_endUser){
			view_text_container.setBackgroundColor("#22262f");
			label_name.color = "#fff";
			label_message.color = "#fff";
			label_time.color = "#fff";
			view_text_container.setLeft(10);
			label_name.left = 10;
			label_time.left = 10;

			//view_container.add(imageview_thumb_path);
		}else{

		    view_text_container.borderWidth = 1;
		    view_text_container.borderColor = "#e9e9e9";
			view_text_container.setBackgroundColor("#ffffff");
			view_text_container.right = 10;
			/*
			if(typeof args.dr_id != "undefined"){


				view_text_container.setRight(60);
			}else{
				view_text_container.setRight(10);
			}*/
		}
		if(row.format == "link"){
			label_message.addEventListener("click", navToWebview);
		}

	}else{
		var view_text_container = $.UI.create("View", {
			transform: Ti.UI.create2DMatrix().rotate(180),
			classes: ['wsize','hsize','box','rounded'],
			top: 10,
			backgroundColor: "#3ddaf6"
		});

		var label_system_msg = $.UI.create("Label",{
			classes: ['wsize', 'hsize','padding','h6'],
			text: row.message
		});
		view_text_container.add(label_system_msg);
		$.bottom_bar.hide();
	}
	view_container.add(view_text_container);
	view_container.addEventListener("longpress", function(e){
		/*var id = this.id;
		//var message_box = parent({name: "m_id", value: m_id}, e.source);
		var dialog = Ti.UI.createAlertDialog({
		    cancel: 1,
		    buttonNames: ['Confirm', 'Cancel'],
		    message: 'Would you like to delete the message?',
		    title: 'Delete'
		  });

	  dialog.addEventListener('click', function(ex){
		 if (ex.index === ex.source.cancel){

		 }else if(ex.index == 0){

		 	var model = Alloy.createCollection("chat");
		 	console.log(id+" what m_id is");
			//model.removeById(m_id);
		 	//$.inner_area.remove(message_box);
		 }
		});
		dialog.show();*/
	});
	if(latest){
		$.inner_area.insertAt({view: view_container, position: 0});
	}else{
		$.inner_area.add(view_container);
	}
}

function navToDoctorDetail(e){
    alert("Doctor Specialty: "+e.source.params.dr_specialty+"\nDoctor Qualification: "+e.source.params.dr_qualification+"\nIntroduction: "+e.source.params.dr_introduction);
}

function imageZoom(e){
    if(typeof e.source.image == "object"){
        return;
    }
    var path = (typeof e.source.image == "object")?e.source.image.nativePath:e.source.image;
    console.log("e.source.image"+typeof e.source.image);
    var html = "<img width='100%' height='auto' src='"+path+"'/>";
    if(OS_IOS){
        nav.navigationWindow("webview","","", {url: path, title: ""});
        //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], url: e.source.record.attachment});
    }else{
        nav.navigationWindow("webview","","", {content: html, title: ""});
        //var webview = $.UI.create("WebView", {backgroundColor: "#000",  zIndex: 12, classes:['wfill','hsize'], html: html});
    }
}

function updateReadStatus(e){
    var inner_area = $.inner_area.getChildren();
    for (var i=0; i < inner_area.length; i++) {
        console.log(inner_area[i].children[0].children.length+" inner_area[i].children[0].children.length");
        if(inner_area[i].children[0].children.length <= 1){
            $.bottom_bar.hide();
        }else if(inner_area[i].is_endUser && typeof inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1] != "undefined" && (opposite_last_update > inner_area[i].created || opposite_online == "true") &&  inner_area[i].status == 2){
			inner_area[i].status = 3;
			inner_area[i].children[0].children[0].children[inner_area[i].children[0].children[0].children.length - 1].text = timeFormat(inner_area[i].created)+" "+status_text[3];
        }/*else if(!inner_area[i].is_endUser && typeof inner_area[i].children[0].children[inner_area[i].children[0].children.length - 1] != "undefined" && user_read_status > inner_area[i].created){
            console.log("is user docor read"+user_read_status+" > "+ inner_area[i].created);
            inner_area[i].children[0].children[0].children[inner_area[i].children[0].children[0].children.length - 1].text = timeFormat(inner_area[i].created)+" "+status_text[3];
        }*/
   }
}

function updateRow(row, latest){
	var found = false;
	var inner_area = $.inner_area.getChildren();
	for (var i=0; i < inner_area.length; i++) {
		if(inner_area[i].id == row.id){
			found = true;
		}
	if(inner_area[i].children[0].children.length > 1 && inner_area[i].status == 1){
		inner_area[i].status = (opposite_online == "true")?3:row.status;
        inner_area[i].children[0].children[0].children[inner_area[i].children[0].children[0].children.length - 1].text = timeFormat(row.created)+" "+status_text[(opposite_online == "true")?3:row.status];
    }
	};
	if(!found){
		addRow(row, latest);
	}
}

function render_conversation(latest, local){
    console.log("render_conversation");
    console.log(latest+" latest and local "+local);
	if(latest && local != true){
	    if(sending){
	        sending = false;
	        console.log("sending set false");
	    }else{
	        console.log("clear interval");
	        clearInterval(interval);
	        //$.call.hide();
	    }
		//$.chatroom.setContentOffset({y: 100});
	}
	var contain_height = 50;
	if(latest){
		data.reverse();
	}
	for (var i=0; i < data.length; i++) {
	     if(data[i].status == 1 && !local){
            console.log(data[i]);
            console.log("fail so can sending o");
            API.callByPost({url: "sendMessage", type: data[i].format, params:data[i]},  function(responseText){
                var res = JSON.parse(responseText);
                console.log(res);
                socket.sendMessage({room_id: room_id});
            });
        }
	    updateRow(data[i], latest);
		/*if((data[i].is_endUser && data[i].status > 1) || data[i].status == 3){
			updateRow(data[i], latest);
		}else{
			addRow(data[i], latest);
		}*/
	}
	//updateReadStatus();
}


var data_loading = false;
function scrollChecker(e){
	var total = (OS_ANDROID)?pixelToDp(e.y): e.y;
	var nearEnd = ($.inner_area.rect.height-$.chatroom.rect.height) - 200;
	if(total >= nearEnd && !data_loading){
		data_loading = true;
		getPreviousData({});
		/*
		var model = Alloy.createCollection("conversations");
		limit = model.getData(false, limit, anchor,"", args.u_id);
		*/
		setTimeout(function(){
			//$.chatroom.setContentOffset({y: top}, {animated: false});
			data_loading = false;
		}, 200);
	}
}

function callHelpdesk(){
    Titanium.Platform.openURL('tel:6046091611');
}

function getConversationByRoomId(callback){
    console.log("getConversationByRoomId");
	var url = "getMessageListForPatient";
	var checker_id = 19;
	//var checker = Alloy.createCollection('updateChecker');
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	//var isUpdate = checker.getCheckerById(checker_id, u_id, room_id);
	//var last_updated = isUpdate.updated || "";
	//last_update = last_updated || last_update;
	//console.log(last_update+" last update updated from checker");
	API.callByPost({url: url, new: true, domain: "FREEJINI_DOMAIN", params: {u_id: u_id, room_id: room_id}}, function(responseText){
		var model = Alloy.createCollection("chat");

		var res = JSON.parse(responseText);
		console.log(res.last_updated+" from server");
		//console.log(res.data);
		var arr = res.data || [];
		if(arr.length > 0){
			model.saveArray(arr);
			var update_id = _.pluck(arr, "id");
			//updateStatus(update_id);
		}
		room_status = res.room_status;
		//checker.updateModule(checker_id, url, res.last_updated, u_id, room_id);
		console.log("check the room id here"+room_id);
		callback && callback();
	});
}

function updateStatus(arr){
	for (var i=0; i < arr.length; i++) {
		var c = $.inner_area.getChildren();
		for (var b=0; b < $.inner_area.children.length; b++) {

			if($.inner_area.children[b].m_id == arr[i]){
				var time = $.inner_area.children[b].children[0].children[2].text.split(" ");
				$.inner_area.children[b].children[0].children[2].text = time[0]+time[1]+time[2]+" Sent";
			}
		};
	};
}

$.chatroom.addEventListener("scroll", function (e){
	var theEnd = $.inner_area.rect.height;
	var total = (OS_ANDROID)?pixelToDp(e.y)+e.source.rect.height: e.y+e.source.rect.height;
	var nearEnd = theEnd * 0.1;
});

/*
 	Refresh
 * */
function refresh(callback, firsttime){
	loading.start();
	console.log("refresh");
	getConversationByRoomId(function(){ //API + saveArray
		callback({firsttime: firsttime}); //render UI
		loading.finish();
		refreshing = false;
		//var model = Alloy.createCollection("chat");
		//model.messageRead({u_id: u_id});
	});

}
var refreshing = false;
var time_offset = common.now();
//alert(time_offset+"NAN NAN check current time");
function refresh_latest(param){
    /*if(room_id != param.room_id){
        console.log("set room id "+param.room_id);
        $.bottom_bar.show();
        socket.setRoom({room_id: param.room_id});
        Ti.App.Properties.setString('room_id', param.room_id);
    }*/
    console.log("old roomid"+room_id);
    console.log(param);
    room_id = param.room_id || room_id;
    console.log("new roomid"+room_id);

	console.log(room_id+" refresh_latest "+refreshing);
	//alert(time_offset+" check time "+common.now()+" "+refreshing);
	if(!refreshing && time_offset <= common.now()){
		refreshing = true;
		refresh(getLatestData);
		time_offset = common.now();
	}
}

function getPreviousData(param){
	console.log("getPreviousData "+room_id);

	start = (typeof start != "undefined")? start : 0;
	var model = Alloy.createCollection("chat");
	data = model.getDataByRoomId(false, start, anchor,"", room_id);
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
	//last_update = (data.length > 0)?_.last(data)['created']:last_update;
	console.log(last_update+" first time is use it own");
	last_uid = (data.length > 0)?_.first(data)['sender_id']:last_uid;
	render_conversation(false, false);
	start = start + 10;
}

function getLatestData(local){
    console.log("getLatestData");
	var model = Alloy.createCollection("chat");
	data = model.getDataByRoomId(true,"","", last_update, room_id);
	last_id = (data.length > 0)?_.first(data)['id']:last_id;
	last_update = (data.length > 0)?_.first(data)['created']:last_update;
	console.log(last_update+" from app");
	last_uid = (data.length > 0)?_.first(data)['sender_id']:last_uid;
	console.log(data);
	if(data.length > 0){
	    var player = Ti.Media.createSound({url:"/sound/doorbell.wav"});
        player.play();
	}
	render_conversation(true, local);
	//setTimeout(function(e){scrollToBottom();}, 500);
}


function switchIcon(e){
	if(e.source.value != ""){
		$.enter_icon.right = 10;
	}else{
		$.enter_icon.right = -50;
	}
}

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

function init(){
    console.log("init");
	if(OS_IOS){
		second_init();
	}else{
	    $.win.setWindowSoftInputMode(Ti.UI.Android.SOFT_INPUT_ADJUST_PAN);
		if(Ti.Android.hasPermission("android.permission.RECORD_AUDIO")){
			checkingInternalPermission();
		}else{
			setTimeout(function(){
				Ti.Android.requestPermissions("android.permission.RECORD_AUDIO", function(e) {
				    if (e.success) {
						checkingInternalPermission();
				    } else {
						common.createAlert("Warning","You don't have voice recorder permission!!!\nYou can go to setting enabled the permission.",function(e){
							closeWindow();
						});
				    }
				});
			},1000);
		}
	}
}
function checkingInternalPermission(){
    console.log("checkingInternalPermission");
	if(Titanium.Filesystem.hasStoragePermissions()){
		second_init();
	}else{
		setTimeout(function(){
			Titanium.Filesystem.requestStoragePermissions(function(e) {
			    if (e.success) {
					second_init();
			    } else {
					common.createAlert("Warning","You don't have file storage permission!!!\nYou can go to setting enabled the permission.",function(e){
						closeWindow();
					});
			    }
			});
		},1000);
	}
}
function second_init(){
    console.log("second_init");
	var mic = voice_recorder.getView();
	$.action_btn.add(mic);
	$.win.add(loading.getView());
	console.log(Titanium.Network.online);
	if(!Titanium.Network.online){
		common.createAlert("Alert", "There is no internet connection.", closeWindow);
	}
	socket.setRoom({room_id: room_id});
	updateTime({online:true});
	Ti.App.Properties.setString('room_id', room_id);
	refresh(getPreviousData, true);
	/*
	API.callByPost({url: "getPatientRoomId", new:true, domain: "FREEJINI_DOMAIN",  params: {u_id: u_id}}, function(responseText){
        var res = JSON.parse(responseText);
    	console.log(res.data.room_id+" room id");
    	room_id = res.data.room_id;

    	if(room_id != ""){
    	    socket.setRoom({room_id: room_id});
    	    refresh(getPreviousData, true);
    	}else{
    	    $.bottom_bar.hide();
            nav.navigateWithArgs("askDoctor/forms", {});
    	}
	});*/
}

function updateTime(e){
  var u_id = Ti.App.Properties.getString('u_id') || 0;
  console.log("update time");
  console.log({last_update: common.now(), u_id: u_id, room_id: room_id, online: e.online});
  socket.update_room_member_time({last_update: common.now(), u_id: u_id, room_id: room_id, online: e.online});
}

function endSession(){
    var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: ['Confirm', 'Cancel'],
            message: 'Would you like to end the conversation?',
            title: 'End Session'
          });

      dialog.addEventListener('click', function(ex){
         if (ex.index === ex.source.cancel){

         }else{
             closeRoom();
         }
      });

      dialog.show();
}

function closeRoom(){
    var dr_id = Ti.App.Properties.getString('dr_id') || 0;
    console.log(dr_id+" dr and roomid"+room_id);
    API.callByPost({
            url: "closeRoom", new:true, domain: "FREEJINI_DOMAIN", params: {u_id: u_id, room_id: room_id}
        }, function(responseText){
            socket.sendMessage({room_id: room_id});
            closeWindow();
        });
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
                    alert("You denied permission.");
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
                    alert("You denied permission.");
                    return false;
                }
             });
        }
    }
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

    dialog.addEventListener('click', function(e) {

        if(e.index == 0) { //if first option was selected
            //then we are getting image from camera]
            if(Ti.Media.hasCameraPermissions()){
                console.log("Success to open camera");
                Titanium.Media.showCamera({
                    success:photoSuccessCallback,
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
            }else{
                Ti.Media.requestCameraPermissions(function(e){

                    if(e.success){
                        console.log("Success to open camera");
                        Titanium.Media.showCamera({
                            success:photoSuccessCallback,
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
                    }
                    else{
                        alert("You denied permission.");
                    }
                });
            }
        } else if(e.index == 1){

            if(OS_ANDROID)
            {
                if(Ti.Filesystem.hasStoragePermissions()){
                    console.log("Success to open photo gallery");
                    Titanium.Media.openPhotoGallery({

                        success: photoSuccessCallback,
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
                        allowEditing: true,
                        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                    });
                }else{
                    Ti.Filesystem.requestStoragePermissions(function(e){

                        if(e.success){
                            console.log("Success to open photo gallery");
                            Titanium.Media.openPhotoGallery({

                                success:photoSuccessCallback,
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
                                allowEditing: true,
                                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                            });
                        }
                        else{
                            alert("You denied permission.");
                        }
                    });
                }
            }else{
                if(Ti.Media.hasPhotoGalleryPermissions()){
                    console.log("Success to open photo gallery");
                    Titanium.Media.openPhotoGallery({

                        success:photoSuccessCallback,
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
                        allowEditing: true,
                        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                    });
                }else{
                    Ti.Media.requestPhotoGalleryPermissions(function(e){

                        if(e.success){
                            console.log("Success to open photo gallery");
                            Titanium.Media.openPhotoGallery({

                                success:photoSuccessCallback,
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
                                allowEditing: true,
                                mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
                            });
                        }
                        else{
                            alert("You denied permission.");
                        }
                    });
                }
            }
        } else {

        }
    });

    //show dialog
    dialog.show();
}

function startTimer(){
    console.log("timer start");
}

function photoSuccessCallback(event) {
    var new_height = (event.media.height <= event.media.width)?event.media.height*(1024 / event.media.width):1024;
    var new_width = (event.media.width <= event.media.height)?event.media.width*(1024 / event.media.height):1024;
    var blob = event.media;
    console.log(" "+event.media.width+" "+event.media.height);
    console.log(new_width+" "+new_height);
    blob = blob.imageAsResized(new_width, new_height);
    saveLocal({message: event.media.nativePath, format:"photo", filedata: blob});
}

init();
Ti.App.addEventListener("socket:refresh_chatroom", refresh_latest);
Ti.App.addEventListener("askDoctor/conversation:refresh", refresh_latest);
//Ti.App.addEventListener('socket:startTimer', startTimer);

$.win.addEventListener("postlayout", function(){
    if (this.activity) {
        this.activity.onResume = function() {
          socket.connect();
		  updateTime({online:true});
          setTimeout(function(){
              push_redirect = false;
              console.log("redirect as false");
        }, 1000);
        };
        this.activity.onPause = function() {
            push_redirect = true;
			updateTime({online:false});
            //socket.disconnect();
        };
    }
});



function doctor_last_update(e){
		console.log(e);
    opposite_online = e.online;
    opposite_last_update = e.last_update;
    updateReadStatus();
}

function resume(){
  socket.connect();
  console.log("resumed here");
  updateTime({online:true});
	setTimeout(function(){
			push_redirect = false;
			console.log("redirect as false");
	}, 2000);
  refresh_latest({});
}

function pause(){
  socket.disconnect();
  console.log("redirect set as true");
  updateTime({online:false});
  push_redirect = true;
}

Ti.App.addEventListener("resumed", resume);
Ti.App.addEventListener("paused", pause);
Ti.App.addEventListener("socket:user_last_update", updateReadStatus);
Ti.App.addEventListener("socket:doctor_last_update", doctor_last_update);

$.win.addEventListener("close", function(){
	Ti.App.Properties.setString('room_id', "");
	target_page = "";
	updateTime({online:false});
	socket.leave_room({room_id: room_id});
	Ti.App.fireEvent("render_menu");
	Ti.App.removeEventListener("socket:user_last_update", updateReadStatus);
	Ti.App.removeEventListener("socket:doctor_last_update", doctor_last_update);
	Ti.App.removeEventListener("askDoctor/conversation:refresh", refresh_latest);
	Ti.App.removeEventListener("resumed", resume);
    Ti.App.removeEventListener("paused", pause);
	//Ti.App.removeEventListener('socket:startTimer', startTimer);
	Ti.App.removeEventListener("socket:refresh_chatroom", refresh_latest);
	$.destroy();

});
