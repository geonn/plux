var args = arguments[0] || {};
console.log(args);

$.name.text = args.name;

for (var i=0; i < args.data.length; i++) {
  var view_container = $.UI.create("View",{
  	classes: ['padding', 'wfill', 'hsize', 'vert'],
  	top: 5,
  });
  
  var label_type = $.UI.create("Label",{
  	classes: ['font_medium'],
  	left: 0,
  	text: args.data[i].benefittype
  });
  
  view_container.add(label_type);
  if(args.data[i].entidvbal < 99999){
  	 var balance = Math.ceil(((args.data[i].entidv-args.data[i].entidvbal)/args.data[i].entidv)*100);
  	 console.log(balance);
  	 view_container.add(generate_progressBar(balance+"%"));
  	 view_container.add(generate_description("Balance: RM "+args.data[i].entidvbal, args.data[i].entidv));  
  }
  
  if(args.data[i].entshabal < 99999){
  	 var share_balance = Math.ceil(((args.data[i].entsha-args.data[i].entshabal)/args.data[i].entsha)*100);
  	 console.log(share_balance);
  	 view_container.add(generate_progressBar(share_balance+"%"));
  	 view_container.add(generate_description("Shared Balance: RM "+args.data[i].entshabal, args.data[i].entsha));  
  }
  
  $.main.add(view_container);
};

function generate_progressBar(filled){
	var view_progressBar = $.UI.create("View",{
		classes: ['progressBar']
	});
	  
	var view_progressBarFill = $.UI.create("View",{
		classes: ['progressBarFill'],
		width: filled
	});
	
	view_progressBar.add(view_progressBarFill);
	return view_progressBar;
}

function generate_description(balance, limit){
  var view_desc = $.UI.create("View",{
  	classes: ['wfill', 'hsize', 'horz']
  });
  
  var label_balance = $.UI.create("Label",{
  		text: balance+"/"+limit,
  });
  
  view_desc.add(label_balance);
  
  return view_desc;
}

$.more.addEventListener("click", function(){
	var nav = require('navigation');
	nav.navigateWithArgs("asp/claimHistory", {name: args.name});
});
