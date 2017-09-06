/**
 * Audio Player Widget
 * @author Mads Møller
 * (c) 2014 Napp ApS
 */

var args = arguments[0] || {};
var audioPlayer = Ti.Media.createSound();
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

$.scrubBar.thumbImage = "/images/player_indicator.png";
// show by default
$.scrubBar.show();

$.scrubBar.addEventListener('touchstart', function(e) {
	sliderTouched = true;

	if (audioPlayer.playing) {
		sliderIsPausingPlayback = true;
		stopTimer();
		audioPlayer.pause();
	}
});

$.scrubBar.addEventListener('touchend', function(e) {

	// always set the new time
	audioPlayer.setTime($.scrubBar.value);

	// if paused
	if (audioPlayer.paused) {
		if (sliderIsPausingPlayback) {
			audioPlayer.play();
			startTimer();
		}
	}

	// reset logic
	sliderTouched = false;
	sliderIsPausingPlayback = false;
});

function onPlayStopBtnClicked() {

	// If both are false, playback is stopped.
	if (audioPlayer.playing) {
		audioPlayer.pause();

		stopTimer();
		console.log("why cant change to play");
		$.playStopBtn.image = playIcon;

	} else {
		audioPlayer.play();

		// set the max value of the slider
		$.scrubBar.max = getDuration();

		// start the timer
		startTimer();

		// update the icon
		$.playStopBtn.image = pauseIcon;
	}
}

/**
 * Get the sound duration in miliseconds
 */
function getDuration() {
	if (OS_IOS) {
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

	$.time.text = prettifyTime(Math.round(audioPlayer.time) / 1000) + " / " + totalDisplayDuration;
}

function startTimer() {
	// twice pr second
	if (!timerIsActive) {
		// calc the duration - only once started
		totalDisplayDuration = prettifyTime(getDuration() / 1000);
console.log(totalDisplayDuration+" totalDisplayDuration");
		timer = setInterval(function() {
			var currentTime = Math.round(audioPlayer.time);
			console.log(getDuration()+" "+audioPlayer.time);
			if(audioPlayer.time >= getDuration())
				stopTimer();
			$.scrubBar.value = currentTime;

			$.time.text = prettifyTime(currentTime / 1000) + " / " + totalDisplayDuration;
		}, 500);
	}

	timerIsActive = true;
}

function stopTimer(e) {
	console.log(timer);
	console.log("stop timer");
	clearInterval(timer);
	timerIsActive = false;
	$.playStopBtn.image = playIcon;
}

if (OS_IOS) {
	// iOS only events
	audioPlayer.addEventListener('interrupted', function(e) {
		//Ti.API.debug('[AudioPlayerWidget]' + e.type);
		stopTimer();
	});

	audioPlayer.addEventListener('resume', function(e) {
		//Ti.API.debug('[AudioPlayerWidget]' + e.type);
		startTimer();
	});

} else if (OS_ANDROID) {
	// Android only events
	audioPlayer.addEventListener('change', function(e) {
		Ti.API.debug("[AudioPlayerWidget] State: " + e.description + ' (' + e.state + ')');
		// state handling
		if (e.state == Ti.Media.Sound.STATE_PLAYING) {
			startTimer();
		} else if (e.state == Ti.Media.Sound.STATE_PAUSED) {
			stopTimer();
		} else if (e.state == Ti.Media.Sound.STATE_STOPPED) {
			stopTimer();
		}
	});
}

exports.setUrl = function(url) {
	var filename = url.split('/').pop();
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);	
	if(file.exists()){
		set_url(file.nativePath);
	}else{
		var xhr = Titanium.Network.createHTTPClient({
			onload: function() {
				// first, grab a "handle" to the file where you'll store the downloaded data
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
};

function set_url(url){
	console.log(url+" here url");
	try{
		audioPlayer = Ti.Media.createSound({
			url : url,
			allowBackground : true
		});
	}catch(e){
		console.log(e.message);
	}
	audioPlayer.play();
	audioPlayer.stop();
	// new sound - update the display
	updateTimeLabel();
	
	// update the icon
	$.playStopBtn.image = playIcon;
}

exports.updatePlayIcon = function(icon) {
	playIcon = icon;
};

exports.updatePauseIcon = function(icon) {
	pauseIcon = icon;
};

// call dispose when done
exports.dispose = function() {
	Ti.API.debug("[AudioPlayerWidget] was disposed, idleTimer reset to = " + idleTimer);

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