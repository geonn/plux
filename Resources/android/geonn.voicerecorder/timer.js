var running = false;
var seconds = 0;
var interval = "";
var view;

exports.stop = function () {
	clearInterval(interval);
	view.text = "00:00";
	sec = seconds;
	seconds = 0;
	return sec;
};

exports.start = function (lbl) {
	view = lbl;
	interval = setInterval(timer, 1000);
};

function timer() {
	seconds++;
	view.text = formatSeconds(seconds);
}

function formatSeconds(seconds) {
	var date = new Date(1970, 0, 1);
	date.setSeconds(seconds);
	return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
}