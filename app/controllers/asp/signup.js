var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
var loading = Alloy.createController('loading');
$.win.add(loading.getView());

/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;

function doAspSignup(){
	loading.start();
	var memno = $.memno.children[0].value;
	var empno = $.empno.children[0].value;
	//var view_sms = view_sms_box.children[0].children[0].checked;

	var params = {
		memno: memno,
		empno: empno
	};
	 
	Alloy.Globals.API.do_asp_presignup(params, {
	    finish: function(){
	        loading.finish();
	    },
	    callback: function(){
	        $.win.close();
	        //Alloy.Globals.nav.closeWindow($.win);
            var win = Alloy.createController("asp/signup2").getView();
            win.open(); 
	    }
	});
}

function blurAll(source){
	for(var a=0; a<$.forms.children.length; a++){
		if(typeof($.forms.children[a].blur) == "function" && source.id != $.forms.children[a].id){
			$.forms.children[a].blur();
		}
	}
}

function textFieldOnFocus(e){
    e.source.parent.backgroundColor = "#ffffff";
    if(e.source.value == e.source.hintText){
        e.source.value = "";
        //e.source.color = "#06141c";
    }
}

function textFieldOnBlur(e){
    if(e.source.required && e.source.value == ""){
        //error_message += forms_arr[i].hintText+" cannot be empty\n";
        e.source.parent.backgroundColor = "#e8534c";
    }else{
        e.source.parent.backgroundColor = "#55a939";
    }
    if(e.source.value==""){
        e.source.value = e.source.hintText;
        //e.source.color = "#06141c";
    }
}

/*$.doSignup.addEventListener("click", function(){
	Alloy.Globals.nav.navigationWindow("asp/signup", 0);
});*/

$.btnBack.addEventListener('click', function(){ 
	$.win.close(); 
});  
