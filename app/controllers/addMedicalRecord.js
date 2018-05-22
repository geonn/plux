var args = arguments[0] || {};
var corpcode = Ti.App.Properties.getString('corpcode');
var empno = Ti.App.Properties.getString('empno');
var memno = Ti.App.Properties.getString('memno');
var name = Ti.App.Properties.getString('fullname');
var dependent = JSON.parse(Ti.App.Properties.getString('dependent'));
console.log("check here dependent");
console.log(dependent);
console.log(dependent.name);
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
    console.log(obj.value+" check value"+obj.required);
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
        console.log(forms_arr[i].id+" "+forms_arr[i].children[0].value);
        if(forms_arr[i].format == "photo" && forms_arr[i].children[2].attached){
            _.extend(params, {Filedata: forms_arr[i].children[2].filedata});
        }else if(forms_arr[i].format == "photo" && !forms_arr[i].children[2].attached){
            error_message += "Please upload your referral letter\n";
        }else{
            console.log(forms_arr[i].children[0].value+" "+forms_arr[i].children[0].required);
            if(forms_arr[i].children[0].required && forms_arr[i].children[0].value == ""){
                console.log(_.isUndefined(forms_arr[i].children[0].value)+" _.isEmpty(forms_arr[i].children[0].value)");
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
    console.log(params);
    loading.start();
    API.callByPost({url: "uploadMedicalRecords", new: true, domain: "FREEJINI_DOMAIN", params: params}, function(responseText){
        console.log(responseText);
        var result = JSON.parse(responseText);
        
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: ['Ok'],
            status: result.status,
            message: (result.status == "success")?"Your medical record has been successfully submitted":result.data.join("\n"),
            title: (result.status == "success")?"Success":"Error"
        });
        dialog.addEventListener('click', function(e) {
            if(e.source.status == "success"){
                Ti.App.fireEvent("myMedicalRecord:refresh");
                $.win.close();
            }
        });
        dialog.show();
        loading.finish();
    });
}

function popout(e){
    console.log(e.source.data);
    console.log(e.source.data.length);
    console.log(e.source.option_name);
    if(e.source.data.length == null || e.source.data.length <= 0){
        alert("Sorry, the "+e.source.children[0].hintText+" listing is empty. Please contact our helpdesk for help.");
        return;
    }
    var options_arr = _.pluck(e.source.data, e.source.option_name);
    options_arr.push("Cancel");;
    var dialog = Ti.UI.createOptionDialog({
        cancel: (options_arr.length > 0)?options_arr.length - 1:0,
        options: options_arr,
        selectedIndex: e.source.value || 0,
        title: e.source.children[0].text
    });
        
    dialog.show(); 
    dialog.addEventListener("click", function(ex){
        console.log(ex.index+" "+ex.cancel);
        if((OS_IOS)?ex.cancel != ex.index:!ex.cancel){
            e.source.children[0].children[0].text = options_arr[ex.index];
            e.source.children[0].value = e.source.data[ex.index][e.source.option_key];
            e.source.children[0].children[0].color = "#000000";
            e.source.backgroundColor = "#55a939";
        }
    });
}

function loadComboBox(e){
    e.source.data = [{name: "Blood Test"}, {name: "X Ray"}, {name: "ECG/Etress Test"}, {name: "Urine Test"}, {name: "Medication Records"}, {name: "Allergic"}, {name: "ETC"}];
    e.source.opacity = 1;
    e.source.touchEnabled = true;
    /*var indicator = $.UI.create("ActivityIndicator", {classes:['wsize','hsize'], style: Ti.UI.ActivityIndicatorStyle.DARK,});
    indicator.show();
    e.source.add(indicator);
    var params = "CORPCODE="+corpcode+"&memno="+memno+"&empno="+empno;
    API.callByGet({url: e.source.url, params: params }, {
        onload: function(responseText){
            var result = JSON.parse(responseText);
            console.log(result);
            e.source.data = result;
        }, onfinish: function(){
            e.source.opacity = 1;
            e.source.touchEnabled = true;
            indicator.hide();
        }, onerror: function(){
            
        }
    });*/
}

/*
 Upload file
 * */
function camera_callback(event){
    console.log((640 / event.media.width)+" "+(640 / event.media.height));
    var new_height = (event.media.height <= event.media.width)?event.media.height*(640 / event.media.width):640;
    var new_width = (event.media.width <= event.media.height)?event.media.width*(640 / event.media.height):640;
    var blob = event.media;
    console.log(" "+event.media.width+" "+event.media.height);
    console.log(new_width+" "+new_height);
    blob = blob.imageAsResized(new_width, new_height);
    $.image_preview.image = blob;
    $.image_preview.parent.filedata = blob;
    $.image_preview.parent.attached = 1;
}


if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	});
}
