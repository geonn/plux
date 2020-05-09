var args = arguments[0] || {};
var corpcode = Ti.App.Properties.getString('corpcode');
var empno = Ti.App.Properties.getString('empno');
var memno = Ti.App.Properties.getString('memno');
var name = Ti.App.Properties.getString('fullname');
var loading = Alloy.createController('loading'); 
var error_message = "";


function init(){
	//loading.start();
	$.win.add(loading.getView());
	$.camera.init({callback: camera_callback});
}
init();

function textFieldOnBlur(e){
    checkRequired(e.source);
}

function checkRequired(obj){
    if(obj.required && obj.value == ""){
        error_message += obj.hintText+" cannot be empty\n";
        obj.parent.backgroundColor = "#e8534c";
    }else{
        obj.parent.backgroundColor = "#55a939";
    }
}

function doSubmit(){
    var forms_arr = $.forms.getChildren();
    var params = {};
    var error_message = "";
    for (var i=0; i < forms_arr.length - 1; i++) {
        if(forms_arr[i].format == "photo" && forms_arr[i].children[2].attached){
            Alloy.Globals._.extend(params, {Filedata: forms_arr[i].children[2].filedata});
        }else if(forms_arr[i].format == "photo" && !forms_arr[i].children[2].attached){
            error_message += "Please upload your referral letter\n";
        }else{
            if(forms_arr[i].children[0].required && forms_arr[i].children[0].value == ""){
                error_message += forms_arr[i].children[0].hintText+" cannot be empty\n";
            }else{
                params[forms_arr[i].id] = forms_arr[i].children[0].value;
            }
        }
    };
    if(error_message != ""){
        alert(error_message);
        return;
    }
    params["u_id"] = Ti.App.Properties.getString('u_id');
    loading.start();
    Alloy.Globals.API.callByPost({url: "submitOutpatientForm", new: true, domain: "FREEJINI_DOMAIN", params: params}, function(responseText){
            var result = JSON.parse(responseText);
            
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: ['Ok'],
                status: result.status,
                message: (result.status == "success")?"Your referral has been successfully submitted":result.data.join("\n"),
                title: (result.status == "success")?"Success":"Error"
            });
            dialog.addEventListener('click', function(e) {
                if(e.source.status == "success"){
                    $.win.close();
                }
            });
            dialog.show();
            loading.finish();
    });
}

function datePicker(e){
    var val_date = (typeof e.source.children[0].date != "undefined")?e.source.children[0].date:new Date();
    var view_container = $.UI.create("View", {classes:['wfill', 'hfill'], zIndex: 50,});
    var mask = $.UI.create("View",{
        classes:['wfill','hfill'],
        backgroundColor: "#80000000"
    });
    var view_box = $.UI.create("View", {classes:['wfill','hsize','vert'], 
    backgroundGradient:{
        type: 'linear',
        colors: [ { color: '#ffffff', offset: 0.0},{ color: '#67b6e1', offset: 0.4 }, { color: '#67b6e1', offset: 0.6 }, { color: '#ffffff', offset: 1.0 } ],
    }, zIndex: 50});
    var picker = $.UI.create("Picker", {
        type:Ti.UI.PICKER_TYPE_DATE,
        value: val_date,
        backgroundColor: "Transparent",
        dateTimeColor: "#ffffff",
        top: 10,
    });
    var ok_button = $.UI.create("Button", {classes:['wfill'], borderRadius:0, height: 50, title: "Select a Date"});
    view_box.add(picker);
    view_box.add(ok_button);
    view_container.add(view_box);
    view_container.add(mask);
    $.win.add(view_container);
    
    mask.addEventListener("click", function(){ 
        $.win.remove(view_container);
    });
    
    ok_button.addEventListener("click", function(ex){
        var dd = picker.value.getDate();
        var mm = picker.value.getMonth()+1; 
        var yyyy = picker.value.getFullYear();
        e.source.children[0].value = dd+'/'+mm+'/'+yyyy;
        e.source.children[0].date = picker.value;
        e.source.children[0].children[0].text = mm+'/'+dd+'/'+yyyy;
        e.source.children[0].children[0].color = "#000000";
        e.source.backgroundColor = "#55a939";
        $.win.remove(view_container);
    });
}

function popout(e){
    if(e.source.data.length == null || e.source.data.length <= 0){
        alert("Sorry, the "+e.source.children[0].hintText+" listing is empty. Please contact our helpdesk for help.");
        return;
    }
    var options_arr = Alloy.Globals._.pluck(e.source.data, e.source.option_name);
    options_arr.push("Cancel");;
    var dialog = Ti.UI.createOptionDialog({
        cancel: (options_arr.length > 0)?options_arr.length - 1:0,
        options: options_arr,
        selectedIndex: e.source.value || 0,
        title: e.source.children[0].text
    });
        
    dialog.show(); 
    dialog.addEventListener("click", function(ex){
        if((OS_IOS)?ex.cancel != ex.index:!ex.cancel){
            e.source.children[0].children[0].text = options_arr[ex.index];
            e.source.children[0].value = e.source.data[ex.index][e.source.option_key];
            e.source.children[0].children[0].color = "#000000";
            e.source.backgroundColor = "#55a939";
        }
    });
}

function loadComboBox(e){
    var indicator = $.UI.create("ActivityIndicator", {classes:['wsize','hsize'], style: Ti.UI.ActivityIndicatorStyle.DARK,});
    indicator.show();
    e.source.add(indicator);
    var params = "CORPCODE="+corpcode+"&memno="+memno+"&empno="+empno;
    Alloy.Globals.API.callByGet({url: e.source.url, params: params }, {
        onload: function(responseText){
            var result = JSON.parse(responseText);
            e.source.data = result;
        }, onfinish: function(){
            e.source.opacity = 1;
            e.source.touchEnabled = true;
            indicator.hide();
        }, onerror: function(){
            
        }
    });
}

/*
 Upload file
 * */
function camera_callback(event){
    var new_height = (event.media.height <= event.media.width)?event.media.height*(event.media.width / 1024):1024;
    var new_width = (event.media.height <= event.media.width)?1024:event.media.width*(event.media.height / 1024);
    var blob = event.media;
    blob = blob.imageAsResized(new_width, new_height);
    $.image_preview.image = blob;
    $.image_preview.parent.filedata = blob;
    $.image_preview.parent.attached = 1;
}


if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		Alloy.Globals.nav.closeWindow($.win); 
	});
}
