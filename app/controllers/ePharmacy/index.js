var args = arguments[0] || {};
init();

function init(){
	//var health_data_firsttime = Ti.App.Properties.getString('health_data_firsttime') || false;
    refresh();

}

function render_menu(data){
    for(var i=0,j=data.length; i<j; i++){
        var view_cat = $.UI.create("View", {classes:['wsize', 'hsize','padding'], category: data[i]});
        view_cat.add($.UI.create("Label", {classes:['wsize', 'hsize'], text: data[i]}));
        $.category_bar.add(view_cat);
    };
}

function navToAdd(e){
	Alloy.Globals.nav.navigateWithArgs("myHealth/add", e.source.record);
}

function refresh(){
	Alloy.Globals.API.callByPost({url: "getCategory", new: true, domain: "API_EPHARMACY", params:{}}, function(responseText)	{
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		render_menu(arr);
	});
}

function closeWindow(){
    $.win.close();
}


$.win.addEventListener("close", function(e){

});
