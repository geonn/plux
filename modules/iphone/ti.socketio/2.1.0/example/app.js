var io = require('ti.socketio');

var win = Ti.UI.createWindow({
	backgroundColor: 'white'
});

var label = Ti.UI.createLabel({ text: 'Connecting ...' });
win.add(label);
win.open();

var socket = io.connect('http://localhost:8080/', { /* Options */ });
socket.on('connect', function () {
	console.log('connected');
	
	socket.once('ping', function () {
		console.log('ping');
		pinged = true;
	});
	socket.once('pong', function (ms) {
		console.log('pong');
		socket.disconnect();
	});
});
