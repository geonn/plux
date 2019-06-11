var io = require('ti.socketio');
const SERVER_IP = 'http://103.3.173.207:3501';
var socket_io;
var room_id = 0;
var isConnected = false;
var room_last_update = [];

function doConnect(){
    //isConnected = true;
    socket_io = io.connect(SERVER_IP);

    socket_io.on('connect', function () {
        console.log(socket_io.id+" socket connected ");
        var u_id = Ti.App.Properties.getString('u_id') || 0;
        isConnected = true;
        if(room_id > 0){
            console.log('set_room2'+room_id);
            //socket_io.emit((OS_IOS)?'new_set_room':"set_room", room_id);
            socket_io.emit((OS_IOS)?'set_room2':"set_room2", {room_id: room_id, role: "patient", u_id: u_id, last_update: common.now(), online: true});
        }
    });

    socket_io.on('disconnect', function () {
        console.log("disconnect event");
    });
    socket_io.on("socket:doctor_last_update", function(params){
        console.log("socket:doctor_last_update");
        Ti.App.fireEvent("socket:doctor_last_update", params);
    });
    socket_io.on("socket:user_last_update", function(params){
        console.log("socket_on:user_last_update");
        console.log(params);
        Ti.App.fireEvent("socket:user_last_update", params);
    });
    console.log("socket:refresh_chatroom created!");
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
}

exports.getLastUpdateByRoom = getLastUpdateByRoom;

function getLastUpdateByRoom(room_id){
    if(typeof room_last_update["t_"+room_id] != "undefined"){
        return room_last_update["t_"+room_id];
    }else{
        return false;
    }
}

exports.updateUserInfo = updateUserInfo;

function updateUserInfo(ex){
    console.log(isConnected+" updateUserInfo");
    if(isConnected){
        socket_io.emit('socket:updateUserInfo', e);
        if(room_id > 0){
            socket_io.emit('set_room', room_id);
        }
    }else{
        doConnect();
        setTimeout(function(){updateUserInfo(ex);}, 1000);
    }
}

exports.getDoctorList = getDoctorList;

function getDoctorList(){
    console.log(isConnected+" getDoctorList");
    if(isConnected){
        socket_io.emit('socket:getDoctorList', socket_io.id);
    }else{
        doConnect();
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
    var u_id = Ti.App.Properties.getString('u_id') || 0;
    if(isConnected){
        //socket_io.emit((OS_IOS)?'new_set_room':"set_room", ex.room_id);
        console.log("setRoom");
        console.log({room_id: ex.room_id, online: true, role: "patient", u_id: u_id, last_update: common.now()});
        socket_io.emit((OS_IOS)?'set_room2':"set_room2", {room_id: ex.room_id, online: true, role: "patient", u_id: u_id, last_update: common.now()});
        console.log("set_room "+ex.room_id);
    }else{
        doConnect();
        setTimeout(function(){setRoom(ex);}, 1000);
    }
}

exports.helpdesk_refresh_patient_list = helpdesk_refresh_patient_list;

function helpdesk_refresh_patient_list(ex){
    console.log(isConnected+" helpdesk_refresh_patient_list");
    if(isConnected){
        socket_io.emit('helpdesk:refresh_patient_list');
    }else{
        doConnect();
        setTimeout(function(){helpdesk_refresh_patient_list(ex);}, 1000);
    }
}

exports.refresh_patient_list = refresh_patient_list;

function refresh_patient_list(ex){
    console.log(isConnected+" refresh_patient_list");
    if(isConnected){
        socket_io.emit('doctor:refresh_patient_list');
    }else{
        doConnect();
        setTimeout(function(){refresh_patient_list(ex);}, 1000);
    }
}

exports.sendMessage = sendMessage;

function sendMessage(ex){
    console.log(isConnected+" sendMessage");
    if(isConnected){
        socket_io.emit((OS_IOS)?'socket:refresh_chatroom':"socket:refresh_chatroom", ex.room_id, false);
        console.log("sendMessage at room "+ex.room_id);
    }else{
        doConnect();
        setTimeout(function(){sendMessage(ex);}, 1000);
    }
}

exports.connect = connect;
function connect(){
    doConnect();
}

exports.disconnect = disconnect;
function disconnect(){
    socket_io.close();
    socket_io.disconnect();
    isConnected = false;
    console.log(isConnected+" disconnect action");
}

exports.update_room_member_time = update_room_member_time;

function update_room_member_time(ex){
    console.log(isConnected+" update_room_member_time");
    if(isConnected){
        socket_io.emit((OS_IOS)?'update_room_member_time':"update_room_member_time",
        {id: socket_io.id, last_update: ex.last_update, u_id: ex.u_id, room_id: ex.room_id, online: ex.online});
    }else{
        doConnect();
        setTimeout(function(){update_room_member_time(ex);}, 1000);
    }
}

exports.leave_room = leave_room;

function leave_room(ex){
    console.log(isConnected+" leave_room");
    if(isConnected){
        socket_io.emit((OS_IOS)?'leave_room':"leave_room", ex.room_id);
        console.log("leave_room "+ex.room_id);
    }else{
        doConnect();
        setTimeout(function(){leave_room(ex);}, 1000);
    }
}
