const io = require('ti.socketio');
const SERVER_IP = 'http://103.3.173.207:3501';
var socket_io = io.connect(SERVER_IP);
var room_id = 0;
var room_last_update = [];
var connection = false;
var pending_task = [];
function doConnect() {
  if (!socket_io.connected && !connection) {
    connection = true;
    console.log("socket_io.connect");
    socket_io = io.connect(SERVER_IP);
    socket_io.on('disconnect', function (reason) {
      console.log("disconnect " + reason);
      //socket_io.open();
      socket_io.close();
      connection = false;
      Ti.App.fireEvent("socket_dc");

    });
    socket_io.on('connect_error', function (attemptNumber) {
      console.log("connect_error " + attemptNumber + " roomid = " + room_id);
      //setRoom({room_id: room_id});
      connection = false;
    });
    socket_io.on('connect_timeout', function (attemptNumber) {
      console.log("connect_timeout " + attemptNumber + " roomid = " + room_id);
      connection = false;
      doConnect();
      //setRoom({room_id: room_id});
    });
    socket_io.on('reconnect', function (attemptNumber) {
      console.log("reconnect " + attemptNumber + " roomid = " + room_id);
      //setRoom({room_id: room_id});
    });

    socket_io.on('connect', function () {
      console.log(socket_io.id + " socket connected ");
      connection = false;
      if (room_id > 0) {
        setRoom({ room_id: room_id });
      }
      Ti.App.fireEvent("socket_online");
      if (pending_task.length > 0) {
        console.log(pending_task);
        console.log(pending_task.length + " pending_task");
        for (var i = 0, j = pending_task.length; i < j; i++) {
          console.log(pending_task[i]);
          pending_task[i].func(pending_task[i].params);
        };
        pending_task = [];
      }

      socket_io.on("socket:doctor_last_update", function (params) {
        console.log("socket:doctor_last_update");
        Ti.App.fireEvent("socket:doctor_last_update", params);
      });
      socket_io.on("socket:user_last_update", function (params) {
        console.log("socket_on:user_last_update");
        console.log(params);
        Ti.App.fireEvent("socket:user_last_update", params);
      });
      socket_io.on('doctor:refresh_patient_list', function () {
        console.log("event listener doctor:refresh_patient_list");
        Ti.App.fireEvent("doctor:refresh_patient_list");
      });

      socket_io.on('socket:refresh_chatroom', function (param) {
        console.log("event listener socket:refresh_chatroom");
        Ti.App.fireEvent("socket:refresh_chatroom", param);
      });

      socket_io.on("socket:getDoctorList", function (param) {
        console.log("event listener socket:getDoctorList");
        Ti.App.fireEvent("controller:getDoctorList", param);
      });
    });
    //
  } else {
    console.log("socket is online");
  }
}
/*
  socket_io.on('connect', function () {
      console.log(socket_io.id+" socket connected ");
      connection = false;
      if(room_id > 0){
      	setRoom({room_id: room_id});
      }
      Ti.App.fireEvent("socket_online");
      if(pending_task.length > 0){
      	console.log(pending_task);
      	console.log(pending_task.length);
      		for(var i=0,j=pending_task.length; i<j; i++){
      			console.log(pending_task[i]);
  		  	pending_task[i].func(pending_task[i].params);
  		};
  	pending_task = [];	
      }
     socket_io.on("socket:doctor_last_update", function(params){
      console.log("socket:doctor_last_update");
      Ti.App.fireEvent("socket:doctor_last_update", params);
  	});
  	socket_io.on("socket:user_last_update", function(params){
  	    console.log("socket_on:user_last_update");
  	    console.log(params);
  	    Ti.App.fireEvent("socket:user_last_update", params);
  	});
  	socket_io.on('doctor:refresh_patient_list', function(){
  	    console.log("event listener doctor:refresh_patient_list");
  	    Ti.App.fireEvent("doctor:refresh_patient_list");
  	});
  	
  	socket_io.on('socket:refresh_chatroom', function(param){ 
  	    console.log("event listener socket:refresh_chatroom");
  	    Ti.App.fireEvent("socket:refresh_chatroom", param);
  	});
  	
  	socket_io.on("socket:getDoctorList", function(param){
  	    console.log("event listener socket:getDoctorList");
  	    Ti.App.fireEvent("controller:getDoctorList", param);
  	});
  });*/




exports.getLastUpdateByRoom = getLastUpdateByRoom;

function getLastUpdateByRoom(room_id) {
  if (typeof room_last_update["t_" + room_id] != "undefined") {
    return room_last_update["t_" + room_id];
  } else {
    return false;
  }
}

exports.updateUserInfo = updateUserInfo;

function updateUserInfo(ex) {
  console.log(socket_io.connected + " updateUserInfo");
  if (socket_io.connected) {
    socket_io.emit('socket:updateUserInfo', e);
    if (room_id > 0) {
      socket_io.emit('set_room', room_id);
    }
  } else {
    if (!connection) {
      doConnect();
    }
    pending_task.push({ func: updateUserInfo, params: ex });
  }
}

exports.getDoctorList = getDoctorList;

function getDoctorList() {
  console.log(socket_io.connected + " getDoctorList");
  if (socket_io.connected) {
    socket_io.emit('socket:getDoctorList', socket_io.id);
  } else {
    if (!connection) {
      doConnect();
    }
    pending_task.push({ func: getDoctorList, params: ex });
  }
}

exports.startTimer = startTimer;

function startTimer(ex) {
  if (socket_io.connected) {
    socket_io.emit('socket:startTimer', ex.room_id);
    console.log("socket:startTimer " + ex.room_id);
  } else {
    doConnect();
    pending_task.push({ func: startTimer, params: ex });
  }
}

exports.setRoom = setRoom;

function setRoom(ex) {
  console.log(socket_io.connected + " setRoom " + socket_io.id);

  room_id = ex.room_id;
  var u_id = Ti.App.Properties.getString('u_id') || 0;
  if (socket_io.connected) {
    //socket_io.emit((OS_IOS)?'new_set_room':"set_room", ex.room_id);
    console.log("setRoom");
    console.log({ room_id: ex.room_id, online: true, role: "patient", u_id: u_id, last_update: Alloy.Globals.common.now() });
    socket_io.emit(false ? 'set_room2' : "set_room2", { room_id: ex.room_id, online: true, role: "patient", u_id: u_id, last_update: Alloy.Globals.common.now() });
    console.log("set_room " + ex.room_id);
  } else {
    doConnect();
    pending_task.push({ func: setRoom, params: ex });
  }
}

exports.helpdesk_refresh_patient_list = helpdesk_refresh_patient_list;

function helpdesk_refresh_patient_list(ex) {
  console.log(socket_io.connected + " helpdesk_refresh_patient_list");
  if (socket_io.connected) {
    socket_io.emit('helpdesk:refresh_patient_list');
  } else {
    doConnect();
    pending_task.push({ func: helpdesk_refresh_patient_list, params: ex });
  }
}

exports.refresh_patient_list = refresh_patient_list;

function refresh_patient_list(ex) {
  console.log(socket_io.connected + " refresh_patient_list");
  if (socket_io.connected) {
    socket_io.emit('doctor:refresh_patient_list');
  } else {
    doConnect();
    pending_task.push({ func: refresh_patient_list, params: ex });
  }
}

exports.sendMessage = sendMessage;

function sendMessage(ex) {
  console.log(socket_io.connected + " sendMessage " + socket_io.id);
  if (socket_io.connected) {
    socket_io.emit(false ? 'socket:refresh_chatroom_2' : "socket:refresh_chatroom_2", ex.room_id, ex.msg);
    console.log("sendMessage at room " + ex.room_id);
    ex.callback();
  } else {
    doConnect();
    pending_task.push({ func: sendMessage, params: ex });
  }
}

exports.connect = connect;
function connect() {
  doConnect();
}

exports.disconnect = disconnect;
function disconnect() {
  socket_io.close();
  socket_io.disconnect();
}

exports.update_room_member_time = update_room_member_time;

function update_room_member_time(ex) {
  console.log(socket_io.connected + " update_room_member_time");
  if (socket_io.connected) {
    socket_io.emit(false ? 'update_room_member_time' : "update_room_member_time",
    { id: socket_io.id, last_update: ex.last_update, u_id: ex.u_id, room_id: ex.room_id, online: ex.online });
  } else {
    doConnect();
    pending_task.push({ func: update_room_member_time, params: ex });
  }
}

exports.leave_room = leave_room;

function leave_room(ex) {
  console.log(socket_io.connected + " leave_room");
  if (socket_io.connected) {
    socket_io.emit(false ? 'leave_room' : "leave_room", ex.room_id);
    console.log("leave_room " + ex.room_id);
  } else {
    doConnect();
    pending_task.push({ func: leave_room, params: ex });
  }
}