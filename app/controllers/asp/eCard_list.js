var args = arguments[0] || {};
var loading = Alloy.createController("loading");
var data = [];

function navToEcard(e){
	console.log('navToEcard');
	console.log(e.source);
	nav.navigateWithArgs("asp/eCard", {user: e.source.user});  
}

/*
 Render e-card listing
 * */
function render_ecard_list(){
	$.inner_box.removeAllChildren();

	for (var i=0; i < data.length; i++) { 
		var row = Titanium.UI.createTableViewRow({
		    touchEnabled: true,
		    height: 50,
		    user: data[i],
		    backgroundSelectedColor: "#FFE1E1", 
			color: "transparent", 
		   });
	 	
	 	var rowView = $.UI.create('View',{
	 		touchEnabled: false,
			classes: ['wfill', 'hfill'], 
			
		});
		
		var Label_name = $.UI.create('Label',{
			touchEnabled: false,
			classes : ['themeColor', 'h5', 'bold', 'padding', 'hfill'],
			text: data[i].name || "",
			font:{fontSize:14},
			textAlign:'left',
		}); 
		
		var forwardImg = $.UI.create('ImageView',{
			touchEnabled: false,
			classes : ['wsize', 'hsize'],
			image : "/images/btn-forward.png",
			width: 15,
			zIndex: 10,
			right:5,
		});  
		
		rowView.add(Label_name);
		rowView.add(forwardImg);
		row.add(rowView);
		$.inner_box.appendRow(row);
		row.addEventListener("click", navToEcard);
	}
}

/*
 Page refresh
 * */
function refresh(){
	loading.start();
	var dependent = Ti.App.Properties.getString('dependent');
	data = JSON.parse(dependent);
	
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