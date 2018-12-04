/**
 * Audio Player Widget
 * @author Mads Møller
 * (c) 2014 Napp ApS
 */

var args = arguments[0] || {};
var audioPlayer;// = Ti.Media.createAudioPlayer();
var timer;
// save off current idle timer state
Ti.App.idleTimerDisabled = true;

var idleTimer = Ti.App.idleTimerDisabled;
var sliderTouched = false;
var sliderIsPausingPlayback = false;
var timerIsActive = false;
var totalDisplayDuration;
var playIcon;
var pauseIcon;

// parsing styles from TSS
_.each(args.styles, function(value, property) {
	if ( typeof value === 'object') {
		$[property].applyProperties(value);
		delete args.styles[property];
	}
});
delete args.styles;

// parse icon arguments
if(args.playIcon){
	playIcon = WPATH("/images/play_button.png");
}
if(args.pauseIcon){
	pauseIcon = WPATH("/images/pause_button.png");
}

function onPlayStopBtnClicked() {
    Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAYBACK;
	// If both are false, playback is stopped.
	console.log(audioPlayer.playing+" audioPlayer.playing");
	if (audioPlayer.playing) {
		audioPlayer.pause();
		$.playStopBtn.image = playIcon;
	} else {
		audioPlayer.play();
		$.playStopBtn.image = pauseIcon;
	}
}

/**
 * Get the sound duration in miliseconds
 */
function getDuration() {
	if (OS_IOS) {
		console.log(audioPlayer.duration+" "+audioPlayer.time);
		console.log('should get this '+Math.ceil(audioPlayer.duration * 1000));
		return Math.ceil(audioPlayer.duration * 1000);
	}
	return Math.ceil(audioPlayer.duration);
}

/**
 * prettifyTime
 * @param {String} time in seconds
 * @return {String} pretty time
 */
function prettifyTime(time) {
	console.log(time+" time");
	time = Math.floor(time);
	// find minutes and seconds
	var minutes = Math.floor(time / 60);
	var seconds = time - minutes * 60;
	return padLeft(minutes, 2) + ":" + padLeft(seconds, 2);
}

function padLeft(nr, n, str) {
	return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

function updateTimeLabel() {
	// calc the duration - only once started
	totalDisplayDuration = prettifyTime(getDuration() / 1000);

	$.time.text = totalDisplayDuration;
}

exports.setUrl = function(url) {

	var filename = url.split('/').pop();
	
	if(OS_IOS){
        var file_temp = Titanium.Filesystem.getFile(Titanium.Filesystem.tempDirectory, filename);
    }else{
        var audioDir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "plux");
        var file_temp = Ti.Filesystem.getFile(audioDir.resolve(), filename);
    }  
	if(file_temp.exists()){
	    set_url(file_temp.nativePath);
	}else{
    	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);	
    	if(file.exists()){
    		set_url(file.nativePath);
    	}else{
    		var xhr = Titanium.Network.createHTTPClient({
    			onload: function() {
    				// first, grab a "handle" to the file where you'll store the downloaded data
    				console.log(url+" check what voice");
    				var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
    				f.write(this.responseData); // write to the file
    				Ti.App.fireEvent('graphic_downloaded', {filepath: f.nativePath});
    				set_url(f.nativePath);
    			},
    			timeout: 10000
    		});
    		xhr.open('GET', url);
    		xhr.send();
    	}
	}
};

function set_url(url){
	console.log(url+" here url");
	try{
		if(OS_IOS){
			audioPlayer = Ti.Media.createSound({
				url : url,
				allowBackground : true
			});
		}else{
		    Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAYBACK;
			audioPlayer = Ti.Media.createAudioPlayer({
				url : url,
				allowBackground : true
			});
		}
	}catch(e){
		console.log(e.message);
	}
	audioPlayer.play();
	audioPlayer.stop();
	
	console.log(audioPlayer.time+" "+audioPlayer.duration);
	// new sound - update the display
	updateTimeLabel();
	
	// update the icon
	$.playStopBtn.image = playIcon;
	
	audioPlayer.addEventListener('change', function(e) {
		console.log('State: ' + e.description + ' (' + e.state + ')');
	    Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
	    updateTimeLabel();
	    if(e.state == 7){	//7 = stopped
	    	$.playStopBtn.image = playIcon;
	    }
	});

	audioPlayer.addEventListener("complete", function(e){
		$.playStopBtn.image = playIcon;
	});
}

exports.updatePlayIcon = function(icon) {
	playIcon = icon;
};

exports.updatePauseIcon = function(icon) {
	pauseIcon = icon;
};

// call dispose when done
exports.dispose = function() {
	console.log("[AudioPlayerWidget] was disposed, idleTimer reset to = " + idleTimer);

	// always stop the player
	audioPlayer.stop();

	// release it
	if (OS_ANDROID) {
		audioPlayer.release();
	}

	// restore previous idle state when closed
	Ti.App.idleTimerDisabled = idleTimer;
};

// EVENTS
exports.addEventListener = $.on;
exports.removeEventListener = $.off;
exports.fireEvent = $.trigger; 