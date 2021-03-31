var args = arguments[0] || {};
var corpcode = Ti.App.Properties.getString('corpcode');
var empno = Ti.App.Properties.getString('empno');
var memno = Ti.App.Properties.getString('memno');
var name = Ti.App.Properties.getString('fullname');
var dependent = JSON.parse(Ti.App.Properties.getString('dependent'));
var loading = Alloy.createController('loading'); 
var error_message = "";
var email = Ti.App.Properties.getString('email');
console.log("email check "+email);
var uploaded = false;
function init(){
	//loading.start();
	$.win.add(loading.getView());
	$.camera.init({extra: "addReceipt", serial: args.serial, camera_callback: camera_callback});
}
init();

function blurAll(source){
	for(var a=0; a<$.forms.children.length; a++){
		if(typeof($.forms.children[a].blur) == "function" && source.id != $.forms.children[a].id){
			$.forms.children[a].blur();
		}
	}
}

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
    var error_message = (uploaded)?"Your claim has been successfully submitted":"Please attach your receipt";
    var dialog = Ti.UI.createAlertDialog({
        buttonNames: ['Ok'],
        message: error_message,
        title: "Info"
    });
    dialog.addEventListener('click', function(e) {
        if(uploaded){
        	$.win.close();
        }
    });
	dialog.show();
}

function popout(e){
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
    });*/
}

/*
 Upload file
 * */
function camera_callback(){
	uploaded = true;
}



if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){
		Alloy.Globals.nav.closeWindow($.win);
	});
}
