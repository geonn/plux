var args = arguments[0] || {};
var loading = Alloy.createController("loading");
var data = [];

function navToEcard(e){
	var id = parent({name: "source"}, e.source);
	console.log(id);
	nav.navigateWithArgs("asp/eCard", {u_id: id});  
}

/*
 Render e-card listing
 * */
function render_ecard_list(){
	$.inner_box.removeAllChildren();

	for (var i=0; i < data.length; i++) { 
		var row = Titanium.UI.createTableViewRow({
		    touchEnabled: true,
		    height: Ti.UI.SIZE,
		    source: data[i].id,
		    backgroundSelectedColor: "#FFE1E1", 
			color: "transparent", 
		   });
	 
		var contentView = $.UI.create('View',{
			classes: ['vert','hsize','wfill'], 
			source: data[i].id,
			top: 10,
			bottom: 10
		});
		  
		var Label_name = $.UI.create('Label',{
			classes : ['themeColor', 'h5', 'bold', 'padding'],
			text: data[i].name || "",
			font:{fontSize:14},
			source: data[i].id,
			textAlign:'left',
			height:Ti.UI.SIZE
		}); 
		contentView.add(Label_name);
		row.add(contentView);
		$.inner_box.appendRow(row);
		contentView.addEventListener("click", navToEcard);
	}
}

/*
 Page refresh
 * */
function refresh(){
	loading.start();
	var usersModel = Alloy.createCollection('users'); 
	data = usersModel.getUserByEmpNo();
	render_ecard_list();
	loading.finish();
}

/*
 Controller init
 * */
function init(){
	$.inner_box.add(loading.getView());
	refresh();
}

init();

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

Ti.App.addEventListener('eCard_list:refresh',refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('eCard_list:refresh',refresh);
	$.destroy();
});

 
if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.win); 
	}); 
}