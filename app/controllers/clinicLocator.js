var args = arguments[0] || {};
console.log(args.id);
var library = Alloy.createCollection('panelList');
var details = library.getPanelList();
var clinic = library.getPanelListById(args.id);
var showCurLoc = false;

$.activityIndicator.show();

var saveCurLoc = function(e) {
	//console.log(e);
    if (e.error) {
       // alert('Location service is disabled. ');
    } else {
    	//console.log(e);
    	showCurLoc = true;
    	console.log(clinic.latitude);
    	console.log(clinic.longitude);
    	Ti.App.Properties.setString('latitude', clinic.latitude);
    	Ti.App.Properties.setString('longitude', clinic.longitude);
    	//Ti.App.Properties.setString('latitude', e.coords.latitude);
    	//Ti.App.Properties.setString('longitude', e.coords.longitude);
       //console.log(Ti.App.Properties.getString('latitude') + "=="+ Ti.App.Properties.getString('longitude'));
    }
};

if (Ti.Geolocation.locationServicesEnabled) {
	
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
    
    Ti.Geolocation.addEventListener('location',saveCurLoc );
} else {
    alert('Please enable location services');
}

		
// API calls to the map module need to use the Alloy.Globals.Map reference
if(showCurLoc == true){
	 var currenLocation = Alloy.Globals.Map.createAnnotation({
	    latitude: clinic.latitude,
	    longitude: clinic.longitude,
	    title:"Current Location",
	    subtitle:"",
	    pincolor:Alloy.Globals.Map.ANNOTATION_GREEN,
	    myid:99 // Custom property to uniquely identify this annotation.
	}); 
	$.mapview.addAnnotation(currenLocation);    
}

setTimeout(function(){ 
	panelListResult(details);
}, 800);

function report(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
}

function listing(){
	var TheTable = Titanium.UI.createTableView({
		width:'100%',
		separatorColor: '#ffffff'
	});
	
	var data=[];
 
		//hide loading bar
		$.loadingBar.height = "0";
		$.loadingBar.top = "0";

   		var arr = details;
   		var counter = 0;
   		
   		if(arr.length < 1){
			var noRecord = Ti.UI.createLabel({ 
			    text: "No record found", 
			    color: '#CE1D1C', 
			    textAlign: 'center',
			    font:{fontSize:14,fontStyle:'italic'},
			    top: 15,
			    width: Ti.UI.SIZE 
			 });
			$.panelListTbl.add(noRecord);
		}else{

	   		arr.forEach(function(entry) {
	   			
				
	   			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: 70,
			    source: entry.m_id,
			    selectedBackgroundColor: "#FFE1E1",
				backgroundGradient: {
			      type: 'linear',
			      colors: ['#FEFEFB','#F7F7F6'],
			      startPoint: {x:0,y:0},
			      endPoint:{x:0,y:70},
			      backFillStart:false},
			   });
			
				 
		 
				var popUpTitle = Titanium.UI.createLabel({
					text:entry.clinicName,
					font:{fontSize:16},
					source: entry.id,
					color: "#848484",
					width:'65%',
					textAlign:'left',
					top:8,
					left:20,
					height:25
				});
				
				var address =  Titanium.UI.createLabel({
					text:entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					color: "#848484",
					textAlign:'left',
					width:'85%',
					bottom:23,
					left:20,
					height:12
				});
				
				var tel =  Titanium.UI.createLabel({
					text:entry.tel,
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					color: "#848484",
					textAlign:'left',
					bottom:5,
					left:20,
					height:12
				});
				
				/**
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-forward.png",
					source: entry.m_id,
					width:15,
					right:20 
				});		
				**/
				/*
				row.addEventListener('touchend', function(e) {
				 //	goAd(e);
				});
			 */
				 
				row.add(popUpTitle);
				row.add(address);
			 	row.add(tel);
			 	//row.add(rightForwardBtn);
				data.push(row);
	   		});
	   		
	   		TheTable.setData(data);
			$.panelListTbl.add(TheTable);
		}
}

var panelListResult = function(details){
	 
	var TheTable = Titanium.UI.createTableView({
		width:'100%',
		separatorColor: '#ffffff'
	});
	
	var data=[];
 
		//hide loading bar
		$.loadingBar.height = "0";
		$.loadingBar.top = "0";

   		var arr = details;
   		var counter = 0;
   		
   		if(arr.length < 1){
			var noRecord = Ti.UI.createLabel({ 
			    text: "No record found", 
			    color: '#CE1D1C', 
			    textAlign: 'center',
			    font:{fontSize:14,fontStyle:'italic'},
			    top: 15,
			    width: Ti.UI.SIZE 
			 });
			$.panelListTbl.add(noRecord);
		}else{

	   		arr.forEach(function(entry) {
	   			var merchantLoc = Alloy.Globals.Map.createAnnotation({
				    latitude:entry.latitude,
				    longitude:entry.longitude,
				    title: entry.clinicname,
				    subtitle: entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
				    pincolor:Alloy.Globals.Map.ANNOTATION_RED,
				    myid:entry.id // Custom property to uniquely identify this annotation.
				});
				$.mapview.region = {latitude: clinic.latitude, longitude:clinic.longitude,
				                    latitudeDelta:0.01, longitudeDelta:0.01};
				//console.log(name[i] + " :"+latitude[i]+", "+ longitude[i]);               
				$.mapview.addAnnotation(merchantLoc); 
				});
				/*
	   			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: 70,
			    source: entry.m_id,
			    selectedBackgroundColor: "#FFE1E1",
				backgroundGradient: {
			      type: 'linear',
			      colors: ['#FEFEFB','#F7F7F6'],
			      startPoint: {x:0,y:0},
			      endPoint:{x:0,y:70},
			      backFillStart:false},
			   });
			
				 
		 
				var popUpTitle = Titanium.UI.createLabel({
					text:entry.clinicName,
					font:{fontSize:16},
					source: entry.id,
					color: "#848484",
					width:'65%',
					textAlign:'left',
					top:8,
					left:20,
					height:25
				});
				
				var address =  Titanium.UI.createLabel({
					text:entry.add1 + ", "+entry.add2 + ", "+entry.city+ ", "+entry.postcode+ ", "+entry.state,
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					color: "#848484",
					textAlign:'left',
					width:'85%',
					bottom:23,
					left:20,
					height:12
				});
				
				var tel =  Titanium.UI.createLabel({
					text:entry.tel,
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					color: "#848484",
					textAlign:'left',
					bottom:5,
					left:20,
					height:12
				});
				
				/**
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-forward.png",
					source: entry.m_id,
					width:15,
					right:20 
				});		
				**/
				/*
				row.addEventListener('touchend', function(e) {
				 //	goAd(e);
				});
			 
				 
				row.add(popUpTitle);
				row.add(address);
			 	row.add(tel);
			 	//row.add(rightForwardBtn);
				data.push(row);
	   		});
	   		
	   		TheTable.setData(data);
			$.panelListTbl.add(TheTable);*/
		}
   	
};

 