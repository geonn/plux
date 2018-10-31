var io = require('ti.socketio');
var socket_io = io.connect('http://103.3.173.207:3501');
var room_id = 0;
var isConnected = true;

socket_io.on('connect', function () {
    console.log(socket_io.id+" socket connected ");
    if(room_id > 0){
        socket_io.emit('set_room', room_id);
    }
    isConnected = true;
});

socket_io.on('disconnect', function () {
    console.log("disconnect");
    isConnected = false;
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

exports.updateUserInfo = updateUserInfo; 

function updateUserInfo(ex){
    console.log(isConnected+" isConnected");
    if(isConnected){
        socket_io.emit('socket:updateUserInfo', e);
        if(room_id > 0){
            socket_io.emit('set_room', room_id);
        }
        console.log("updateUserInfo");
    }else{
        socket_io.connect();
        console.log(isConnected+" isConnected");
        setTimeout(function(){updateUserInfo(ex);}, 1000);
    }
}

exports.getDoctorList = getDoctorList; 

function getDoctorList(){
    console.log(isConnected+" isConnected");
    if(isConnected){
        socket_io.emit('socket:getDoctorList', socket_io.id);
        console.log("socket:getDoctorList");
    }else{
        socket_io.connect();
        console.log(isConnected+" isConnected");
        setTimeout(getDoctorList, 1000);
    }
}

exports.startTimer = startTimer; 

function startTimer(ex){
    if(isConnected){
        socket_io.emit('socket:startTimer', ex.room_id);
        console.log("socket:startTimer "+ex.room_id);
    }else{
        socket_io.connect();
        setTimeout(function(){startTimer(ex);}, 1000);
    }
}

exports.setRoom = setRoom;

function setRoom(ex){
    console.log(isConnected+" isConnected setRoom");
    room_id = ex.room_id;
    if(isConnected){
        socket_io.emit((OS_IOS)?'new_set_room':"set_room", ex.room_id);
        console.log("set_room "+ex.room_id);
    }else{
        socket_io.connect();
        console.log(isConnected+" isConnected"); 
        setTimeout(function(){setRoom(ex);}, 1000);
    }
}
    
exports.helpdesk_refresh_patient_list = helpdesk_refresh_patient_list;

function helpdesk_refresh_patient_list(ex){
    console.log(isConnected+" isConnected");
    if(isConnected){
        socket_io.emit('helpdesk:refresh_patient_list');
        console.log("helpdesk:refresh_patient_list");
    }else{
        socket_io.connect();
        console.log(isConnected+" isConnected"); 
        setTimeout(function(){helpdesk_refresh_patient_list(ex);}, 1000);
    }
}

exports.sendMessage = sendMessage;    

exports.refresh_patient_list = refresh_patient_list;

function refresh_patient_list(ex){
    console.log(isConnected+" isConnected");
    if(isConnected){
        socket_io.emit('doctor:refresh_patient_list');
        console.log("doctor:refresh_patient_list");
    }else{
        socket_io.connect();
        console.log(isConnected+" isConnected"); 
        setTimeout(function(){refresh_patient_list(ex);}, 1000);
    }
}

exports.sendMessage = sendMessage;

function sendMessage(ex){
    console.log(isConnected+" isConnected");
    if(isConnected){
        socket_io.emit((OS_IOS)?'new_socket:refresh_chatroom':"socket:refresh_chatroom", ex.room_id, false);
        console.log("sendMessage at room "+ex.room_id);
    }else{
        socket_io.connect();
        console.log(isConnected+" isConnected"); 
        setTimeout(function(){sendMessage(ex);}, 1000);
    }
}

exports.leave_room = leave_room;

function leave_room(ex){
    console.log(isConnected+" isConnected");
    if(isConnected){
        socket_io.emit((OS_IOS)?'new_leave_room':"leave_room", ex.room_id);
        console.log("leave_room "+ex.room_id);
    }else{
        socket_io.connect();
        console.log(isConnected+" isConnected"); 
        setTimeout(function(){leave_room(ex);}, 1000);
    }
}