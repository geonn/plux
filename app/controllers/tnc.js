var args = arguments[0] || {};

function navToSignup(){
    var win = Alloy.createController("asp/signup").getView();
    win.open(); 
    $.win.close(); 
}

$.btnBack.addEventListener('click', function(){ 
	$.win.close(); 
});  