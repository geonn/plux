var args = arguments[0] || {};
var nav = Alloy.Globals.navMenu;
var loading = Alloy.createController('loading'); 
var error_message = "";

/** To check if keyboard onfocus or onblur**/
var isKeyboardFocus = 0;
$.win.add(loading.getView());

function closeWin(){
	$.win.close();
}

function doSignup(){
	var fullname = $.fullname.value;
	var email = $.email.value;
	var ic_no = $.ic_no.value;
	var password = $.password.value;
	var confirm =  $.confirm.value;
	var view_agreement = view_agreement_box.children[0].children[0].checked;
	
	if(fullname.trim() == ""){
		common.createAlert("Error", "Please fill in your full name");
		return false;
	}
	
	if(ic_no.trim() == ""){
		common.createAlert("Error", "Please fill in your IC number");
		return false;
	}
	 
	if(email.trim() == ""){
		common.createAlert("Error", "Please fill in your email");
		return false;
	}else if(validateEmail(email) != "1"){
		common.createAlert("Error", "Please fill in an valid email");
		return false;	
	}
	
	if(password.trim() == ""){
		common.createAlert("Error", "Please fill in your password");
		return false;
	}
	
	if(confirm.trim() != password.trim()){
		common.createAlert("Error", "Your password are not match");
		return false;
	}
	 
	if(view_agreement != "1"){
		common.createAlert("Error", "You must agree to all the terms and conditions to register as ASP member.");
		return false;
	}
	 
	loading.start();
	var params = {
		fullname: fullname,
		email: email,
		ic_no: ic_no,
		password: password,
		agreets: view_agreement
	};
	 
	API.do_signup(params, $, function(success){
		if(success){
			$.win.close();
			Ti.App.fireEvent('loginAfterRegister',{params: params}); 
		}else{
			
		}
		loading.finish();
	});
}

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
                params[forms_arr[i].id] = forms_arr[i].children[0].value.trim();
            }
        }
        if(forms_arr[i].id == "password2"){
            if(forms_arr[i].children[0].value != forms_arr[i-1].children[0].value){
                error_message += "Your password are not match\n";
            }
        }
    };
    if(error_message != ""){
        alert(error_message);
        return;
    }
    params["agreets"] = 1;
    console.log(params);
    loading.start();
    API.callByPost({url: "pluxSignUp", new: true, domain: "FREEJINI_DOMAIN", params: params}, function(responseText){
            console.log(responseText);
            var result = JSON.parse(responseText);
            if(result.status == "error"){
                common.createAlert("Error", result.data);
            }else{
                $.win.close();
                Ti.App.fireEvent('loginAfterRegister',{params: params}); 
                loading.finish();
            }
    });
}