var args = arguments[0] || {};
var timer = require(WPATH("timer"));
var cancel_record = false;
var recording = false;
var audioRecorder = Titanium.Media.createAudioRecorder ({compression : Ti.Media.AUDIO_FORMAT_AAC, format: Titanium.Media.AUDIO_FILEFORMAT_MP4});



function startRecording(){
	//$.message_bar.animate({right: 200, duration: 30});
	console.log("startRecording "+cancel_record);
	if(recording){
	    return;
	}
	recording = true;
	cancel_record = false;
	timer.start($.timer);
	$.text_area.width = Ti.UI.SIZE;
	$.timer.show();
	$.timer_text.show();
	if(OS_IOS){
	    Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAY_AND_RECORD;
			console.log('here!!!');
	}
	Ti.Media.vibrate();
	audioRecorder.start();
}

function stopRecording(e){
    console.log("stop recording");
    recording = false;
	try{
		var sec = timer.stop();
		if(sec <= 1){
			cancel_record = true;
		}
		var audioFile = audioRecorder.stop();
		if(OS_IOS){
			Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_SOLO_AMBIENT;
		}
		if(sec > 1){
            console.log(audioFile.nativePath);
            var filename = audioFile.nativePath.split('/').pop();
            var folder = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, args.room_id);
            if(!folder.exists()){
                folder.createDirectory();
            }
            var file_temp = Titanium.Filesystem.getFile(folder.resolve(), filename);
            //var file_temp = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
            file_temp.write(audioFile.read());
            console.log(file_temp.nativePath);
            args.record_callback({message: file_temp.nativePath, format:"voice", filedata: file_temp.read()});
        }
		//$.message_bar.animate({right: 50, duration: 30});
		$.text_area.width = 0;
		$.timer_text.hide();
		$.timer.hide();
	}catch(e){
		console.log("error caught");
		cancel_record = true;
		$.text_area.width = 0;
		$.timer_text.hide();
		$.timer.hide();
	};

}

// call dispose when done
function init() {
	$.timer.hide();
	$.timer_text.hide();
	$.text_area.width = 0;
	console.log(WPATH('images/icon_mic.png'));
	   var img_mic = $.UI.create("ImageView", {image: WPATH('images/icon_mic.png'), top: 10, bottom:10, zIndex:3, right: 10, height: 30, width: 30});

	img_mic.addEventListener("click", startRecording);
	img_mic.addEventListener("longpress", startRecording);
	//$.container.addEventListener("touchend", stopRecording);
	//$.container.addEventListener("touchcancel",stopRecording);
	$.container.add(img_mic);
};

init();

// EVENTS
exports.addEventListener = $.on;
exports.removeEventListener = $.off;
exports.fireEvent = $.trigger;
exports.startRecording = startRecording;
exports.stopRecording = stopRecording;
