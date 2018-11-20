var args = arguments[0] || {};
var loading = Alloy.createController("loading");
var data = [];
var qrcode = require('qrcode');
/*
 Render e-card listing
 * */
function render_qr(first_view, inner_width){
    
    first_view.removeAllChildren();
    var userQR = qrcode.QRCode({
        typeNumber: 8,
        errorCorrectLevel: 'M'
    });
    var dateTimeNow = currentDateTime();
    var param = first_view+"|"+dateTimeNow;
    
    var CryptoJS = require('sha256').CryptoJS;
    var AES = require('aes').CryptoJS;
    //generate private key
    var privateKey =  CryptoJS.SHA256("miku").toString();
    console.log(privateKey);
    var text = JSON.stringify(param);
    console.log(text);
    var encryptedData = AES.AES.encrypt(text, privateKey);
    console.log(encryptedData.toString().length+" check here");
    var qrcodeView = userQR.createQRCodeView({
        width: inner_width/2,
        height: inner_width/2,
        margin: 10,
        touchEnabled: false,
        text: encryptedData.toString()});
    first_view.add(qrcodeView);
}

function render_ecard_list(data){
    var card_width = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10)) - 20;
    var card_height = card_width / 2;
    var inner_width = card_width * 1.5;
    var inner_height = card_width * 1.5;
    var inner_top = -((inner_height - card_height) / 2) * 1.333;//inner_height * -0.5;
    var inner_left = -((inner_width - card_width) / 2) * 1.6;
    //$.tool_miku.top = (OS_IOS)?card_height+20:card_height+70;
    console.log(card_width+" "+card_height+" card size"); //-200 -120
    var view_card = $.UI.create("View", {classes:['rounded', 'padding', 'bgblue'], width: card_width, height: card_height});
    
    $.main.add(view_card);
    console.log(inner_width/2+" inner_width/2");
    var inner_view = $.UI.create("View", {classes:['bgblue'], width: inner_width, height: inner_height, top: inner_top, left: inner_left, transform: Ti.UI.create2DMatrix({rotate: 30})});
    view_card.add(inner_view);
    //var tooltip_mask = $.UI.create("View", {backgroundColor: "#8C000000", width: inner_width, height: inner_height, zIndex: 2});
    //inner_view.add(tooltip_mask);
    //var first_view = $.UI.create("View", {width: inner_width/2, height: inner_height/2, backgroundColor: "red", left:0, top:0});
    var first_view = $.UI.create("View", {width: inner_width/2, height: inner_height/2, zoom: false, top: inner_height/2, left: 0, transform: Ti.UI.create2DMatrix({rotate: -90}), cardno: data.cardno, backgroundColor: "#fff", zIndex:1, memory:{rotate: -90, width: inner_width/2, height: inner_height/2, top: inner_height/2, left: 0}});
    first_view.addEventListener("click", zoomQr);
    inner_view.add(first_view);
    
    var qr_image = $.UI.create("ImageView", {width: inner_width/2, touchEnabled: false, height: inner_height/2, bottom: 10, right: 10, image: "/images/qr_demo.png"});
    first_view.add(qr_image);
    
    
    var second_view = $.UI.create("View",{classes:['bgblue'], zoom: false, width: inner_width/2, height: inner_height/2, top: inner_height/2, left: inner_width/2, transform: Ti.UI.create2DMatrix({rotate: 0}), zIndex:1, record: data, memory: {rotate: 0, width: inner_width/2, height: inner_height/2, top: inner_height/2, left: inner_width/2}});
    inner_view.add(second_view);
    second_view.addEventListener("click", zoomInfo);
    
    var view_main_info = $.UI.create("View", {classes:['hfill','vert'], left: 5, top: 5, width: "80%"});
    second_view.add(view_main_info);
    
    var label_company = $.UI.create("Label", {classes:['wfill','hsize','h6'], bottom: 3, color: "#fff", textAlign: "left", text: data.corpname});
    var label_memno = $.UI.create("Label", {classes:['wfill','hsize','h6'], bottom: 3, color: "#fff", textAlign: "left", text: data.cardno});
    var vStartDate = new Date(parseInt(data.vStartDate.slice(6, 19)));
    var vEndDate = new Date(parseInt(data.vEndDate.slice(6, 19)));
    var label_vStartDate = $.UI.create("Label", {classes:['wfill','hsize','h6'], bottom: 3, color: "#fff", textAlign: "left", text: vStartDate.toLocaleDateString()});
    var label_vEndDate = $.UI.create("Label", {classes:['wfill','hsize','h6'], bottom: 3, color: "#fff", textAlign: "left", text: vEndDate.toLocaleDateString()});
    view_main_info.add(label_company);
    view_main_info.add(label_memno);
    view_main_info.add(label_vStartDate);
    view_main_info.add(label_vEndDate);
    
    var third_view = $.UI.create("View",{width: inner_width/2, backgroundColor: "#fff", height: inner_height/2, zIndex:1, top: 0, left: inner_width/2, transform: Ti.UI.create2DMatrix({rotate: 0}) });
    inner_view.add(third_view);
    third_view.addEventListener("click", zoomName);
    
    var view_second_info = $.UI.create("View", {classes:['wfill','hsize'], left: 5, bottom: 5});
    third_view.add(view_second_info);
    
    var label_name = $.UI.create("Label", {classes:['hsize','h5'], left:0,  width: "80%", textAlign: "left", color: "#2056A6", text: data.name});
    view_second_info.add(label_name);
    
}
var guide_numner = 6;
var guide_message_number = 6;
var guide_message = [
    "Welcome to ASP HEALTHCARE, I'm ASP assistant to guide you the ECard feature",
    "Can you see the QR Code? but you cant scan it here. You need to click on it to make it bigger.",
    "Now you can see the the QR Code change every second. It will prevent the bad guy screenshot your qr and use your ECard.",
    "Here is your personal info summary. Click inside for more detail.",
    "You can see your expired date here, so dont forget to renew.",
    "Last one is your name "+Ti.App.Properties.getString('fullname'),
    "That's all for the guideline. Good Bye."
];
function toolTipGuide(){
    var child_num = (OS_IOS)?0:1;
    var tooltipmask = $.main.children[child_num].children[0].children[0];
    for (var i=1; i < tooltipmask.parent.children.length; i++) {
        tooltipmask.parent.children[i].zIndex = 1;
    };
    if(guide_numner >= tooltipmask.parent.children.length){
        tooltipmask.parent.remove(tooltipmask);
    }else{
        tooltipmask.parent.children[guide_numner].zIndex = 3;
        guide_numner++;
    }
}

function updateToolTip(){
    $.tooltop_message.text = guide_message[guide_message_number];
}

function nextTip(){
    if(guide_numner <= 0){
        guide_numner++;
        guide_message_number++;
        updateToolTip();
        toolTipGuide();
    }
}

function refresh(){
    var corpcode = Ti.App.Properties.getString('corpcode');
    var memno = Ti.App.Properties.getString('memno');
    var empno = Ti.App.Properties.getString('empno');
    var params = "CORPCODE="+corpcode+"&memno="+memno+"&empno="+empno;
    loading.start();
    API.callByGet({url: "claimunder.aspx", params: params }, {
        onload: function(responseText){
           var res = JSON.parse(responseText);
           if(res.length == null || res.length <= 0){
              // $.tool_miku.hide();
               if(data.length <= 0){
                    var row = $.UI.create("View", {classes:['wfill','hsize','padding','rounded'], bottom: 0, backgroundColor: "#fff"});
                    var view_container = $.UI.create("View", {classes:['wfill','hsize','padding'], touchEnabled: false });
                    var label = $.UI.create("Label", {classes:['wfill','hsize','h5'], textAlign:"center", text: "No card found"});
                    row.add(view_container);
                    view_container.add(label);
                    $.main.add(row);
                }
           }else if( typeof res[0] !== "undefined" && typeof res[0].message !== "undefined"){
            //console.log('got error message');
                common.createAlert(res[0].message);
           }else{
                for (var i=0; i < res.length; i++) {
                    render_ecard_list(res[i] || {});
                };
           }/*
            var result = JSON.parse(responseText);
            console.log(result);
            for (var i=0; i < result.length; i++) {
                render_ecard_list(result[i]);
            };*/
        }, onfinish: function(){
            loading.finish();
        }
    });
}

function init(){
	$.win.add(loading.getView());
	refresh();
}

init();

function zoomIn(e){
    e.zIndex = 10;
    e.parent.animate({transform: Ti.UI.create2DMatrix({rotate: 0}), duration: 1000});
    var card_width = e.parent.parent.width;
    var card_height = e.parent.parent.height;
    var inner_top = -e.parent.top;
    var inner_left = -e.parent.left;
    console.log(inner_left+' inner_left '+card_height+" card_height"+card_width+" width");
    if(OS_IOS){
        e.parent.animate({transform: Ti.UI.create2DMatrix({rotate: 0}), duration: 1000});
        e.animate({transform: Ti.UI.create2DMatrix({rotate: 0}), width: card_width, height: card_height, top: inner_top, left:inner_left, duration: 1000});
    }else{
        e.parent.animate({transform: Ti.UI.create2DMatrix({rotate: 0}), duration: 1000});
        e.animate({transform: Ti.UI.create2DMatrix({rotate: 0}), duration: 500},
        function(){
            e.animate({width: card_width, height: card_height, top: inner_top, left: inner_left, duration: 500});
        });
    }
}

function zoomOut(e){
    
    var width = e.parent.width / 2;
    var height = e.parent.height / 2;
    
    if(OS_IOS){
        e.parent.animate({transform: Ti.UI.create2DMatrix({rotate: 30}), duration: 1000}, function(){
            e.zIndex = 1;
        });
        e.animate({transform: Ti.UI.create2DMatrix({rotate: e.memory.rotate}), width: e.memory.width, height: e.memory.height, top: e.memory.top, left: e.memory.left, duration: 1000});
        
    }else{
        e.parent.animate({transform: Ti.UI.create2DMatrix({rotate: 30}), duration: 1000}, function(){
            e.zIndex = 1;
        });
        console.log('a');
        e.animate({width: e.memory.width, height: e.memory.height, top: e.memory.top, left: e.memory.left, duration: 500}, function(){
            e.animate({transform: Ti.UI.create2DMatrix({rotate: e.memory.rotate})});
        });
    }
}

function zoomName(e){
    if(guide_numner <= 4){
        guide_message_number++;
        updateToolTip();
        toolTipGuide();
        /*$.tool_miku.animate({opacity: 0, duration: 2000}, function(){
            $.main.remove($.tool_miku);
        });*/
    }
}

function zoomInfo(e){
    var arr_title = ["COMPANY NAME", "CARD NUMBER", "MEMBER SINCE", "VALID THRU"];
    var even = 0;
    if(!this.zoom){
        for (var i=0; i < arr_title.length; i++) {
            this.children[0].insertAt({view: $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], color: "#fff", textAlign: "left", text: arr_title[i]}), position: even});
            even = even + 2;
        };
        this.zoom = true;
        zoomIn(this);
        if(guide_numner <= 3){
            guide_message_number++;
            updateToolTip();
        }
    }else{  
        console.log(this.children[0].children.length - 2+" this.children[0].length - 1");
        for (var j = this.children[0].children.length - 2; j >= 0; j = j - 2) {
            console.log(this.children[0].children[j]);
            this.children[0].remove(this.children[0].children[j]);
        };
        this.zoom = false;
        zoomOut(this);
        setTimeout(function(){
            if(guide_numner <= 3){
                guide_message_number++;
                updateToolTip();
                toolTipGuide();
            }
        }, 1000);
    }
}

var interval;
function zoomQr(e){
    var card_width = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10)) - 20;
    if(!interval){
        interval = setInterval(function(){render_qr(e.source, e.source.rect.width);}, 1000);
    }else{
        clearInterval(interval);
        e.source.removeAllChildren();
        console.log('a1');
        var qr_image = $.UI.create("ImageView", {width: Math.floor(e.source.rect.width/2), touchEnabled: false, height: Math.floor(e.source.rect.width/2), image: "/images/qr_demo.png"});
        console.log('a2');
        e.source.add(qr_image);
        interval = false;
    }
    if(!e.source.zoom){
        e.source.zoom = true;
        zoomIn(e.source);
        e.source.children[0].animate({right: (card_width - (e.source.width / 2)) / 2, bottom: (card_width/2 - (e.source.width / 2)) / 2, width: e.source.width / 2, height: e.source.width / 2, duration: 1000});
        if(guide_numner <= 2){
            guide_message_number++;
            updateToolTip();
        }
    }else{
        e.source.zoom = false;
        zoomOut(e.source);
        console.log('c');
        e.source.children[0].animate({right: 10, bottom: 10, duration: 1000}, function(){
            console.log('d');
            if(guide_numner <= 2){
                guide_message_number++;
                updateToolTip();
                toolTipGuide();
            }
        });
        
    }
}

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

$.win.addEventListener("close", function(){
    clearInterval(interval);
	$.destroy();
});

 
if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	}); 
}

if(Ti.Platform.osname == "android"){
    $.win.addEventListener("open", function(){
        if (this.activity) {
            this.activity.onResume = function() {
                setTimeout(function(){
                      redirect = false;
                      console.log("redirect as false");
                }, 1000);
              socket.connect();
            };  
            this.activity.onPause = function() {
                redirect = true;
                socket.disconnect();
            }; 
        }
    });
}