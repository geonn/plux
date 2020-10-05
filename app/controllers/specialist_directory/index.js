// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};
//var args = $.args;
var loading = Alloy.createController("loading");
var u_id = Ti.App.Properties.getString('u_id'); 

function init(){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, 1000);
	
}

function init2(){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, 3000);
	
}

init();

if(OS_ANDROID){ 
	$.btnBack.addEventListener('click', function(){ 
		$.win.close(); 
	});
}

// $.win.addEventListener("close", function(){
// 	$.destroy();
// });

function doClick(e) {

    //abort autocomplete
    //Titanium.Network.HTTPClientabort();

	var name = $.tfName.value;

	var state = $.lblStateDialog.text;
	if(state == "ANY STATE" || state == "CHOOSE STATE"){
		state="";
	}

	var specialty = $.lblSpecialDialog.text;
	if(specialty == "ANY SPECIALITY" || specialty == "CHOOSE SPECIALITIES"){
		specialty="";
	}
	
    var hospital = $.tfHospital.value;
    
    var page = 1;

	init2();
	Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: name, state: state, specialty: specialty, hospital: hospital, page: page, limit: 10}}, function(responseText){
		
		var obj = JSON.parse(responseText);

		if(OS_IOS){
            Alloy.Globals.nav.navigationWindow("specialist_directory/result", "", "", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital});
        } else{
            var win = Alloy.createController("specialist_directory/result", {data: obj, page: page, name: name, state: state, specialty: specialty, hospital: hospital}).getView();
            win.open();
        }
	});
}

/////state
var stateList = [
    "CHOOSE STATE",
    "JOHOR",
    "KEDAH",
    "KELANTAN",
    "KUALA LUMPUR",
    "LABUAN",
    "MELAKA",
    "NEGERI SEMBILAN",
    "PAHANG",
    "PENANG",
    "PERAK",
    "PERLIS",
    "PUTRAJAYA",
    "SABAH",
    "SARAWAK",
    "SELANGOR",
    "TERENGGANU",
    "ANY STATE"
]

if(OS_ANDROID){
    var dState = $.UI.create("OptionDialog", {
        title: "State",
        options: stateList,
        buttonNames: ["CANCEL"]
    });
} else{
    stateList.push("CANCEL");
    var dState = $.UI.create("OptionDialog", {
        title: "State",
        options: stateList,
        cancel: stateList.length - 1
    });
    
}

$.win.add(dState);

function stateClick(e){
    dState.show();
}

dState.addEventListener('click', function(e){
    if(stateList[e.index] == "CANCEL"){
        $.lblStateDialog.text = "CHOOSE STATE";
    } else {
        $.lblStateDialog.text = stateList[e.index];
    }
});
//state done

//speciality
var specialList = [
    "CHOOSE SPECIALITIES",
    "ANAESTHESIOLOGY AND CRITICAL CARE",
    "EMERGENCY MEDICINE",
    "FAMILY MEDICINE",
    "GENERAL MEDICINE",
    "NUCLEAR MEDICINE",
    "REHABILITATION MEDICINE",
    "SPORTS MEDICINE",
    "CLINICAL ONCOLOGY",
    "RADIATION ONCOLOGY",
    "CLINCIAL RADIOLOGY",
    "PAEDIATRICS",
    "GENERAL PATHOLOGY",
    "ANATOMICAL PATHOLOGY",
    "CHEMICAL PATHOLOGY",
    "HAEMATOLOGY",
    "MEDICAL MICROBIOLOGY",
    "FORENSIC PATHOLOGY",
    "TRANSFUSION MEDICINE",
    "PSYCHIATRY",
    "PUBLIC HEALTH MEDICINE",
    "OBSTETRICS AND GYNAECOLOGY (O & G)",
    "SURGERY",
    "CARDIOTHORACIC SURGERY",
    "NEUROSURGERY",
    "PAEDIATRIC SURGERY",
    "PLASTIC SURGERY",
    "OPHTHALMOLOGY",
    "OTORHINOLARYNGOLOGY",
    "ORTHOPAEDIC SURGERY",
    "UROLOGY",
    "ANY SPECIALITY",
];

if(OS_ANDROID){
    var dSpecial = $.UI.create("OptionDialog", {
        title: "Specialities",
        options: specialList,
        buttonNames: ["CANCEL"]
    });
} else{
    specialList.push("CANCEL");
    var dSpecial = $.UI.create("OptionDialog", {
        title: "Specialities",
        options: specialList,
        cancel: specialList.length - 1
    });
    
}

$.win.add(dSpecial);

function specialClick(e){
    dSpecial.show();
}

dSpecial.addEventListener('click', function(e){
    if (specialList[e.index] == "CANCEL"){
        $.lblSpecialDialog.text = "CHOOSE SPECIALITIES";
    } else{
        $.lblSpecialDialog.text = specialList[e.index];
    }
});
//speciality done

//////////////////////////autocomplete shit/////////////////

//Table view showing your autocomplete values
var tblvAutoComplete = Ti.UI.createTableView({
    width           : '90%',
    backgroundColor : '#EFEFEF',
    height          : 0,
    maxRowHeight    : 35,
    minRowHeight    : 35,
    allowSelection  : true
});

var vAutocomplete = Ti.UI.createView({
    height: Ti.UI.SIZE,
    width: Ti.UI.FILL,
    left: "15%"
});



// Starts auto complete
$.tfName.addEventListener('change', function(e){ 
    var pattern = e.source.value;

    //create tableview
    vAutocomplete.add(tblvAutoComplete);
    $.vAutocompletePlace.add(vAutocomplete);
    ///end create table

    if(pattern.length <= 2){
        $.vAutocompletePlace.remove(vAutocomplete);
    }

	if(pattern.length >= 2 && pattern.value != ''){

		//add searchArray values
		Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: pattern, page: 1, limit: 10}}, function(responseText){
		
            var obj = JSON.parse(responseText);
            
            console.log("total obj" + obj.data.length);
	
			var searchArray = [];
	
			for (index = 0; index < obj.data.length; index++) {
				searchArray[index] = obj.data[index].name;
            }
	
            //var tempArray = PatternMatch(searchArray, pattern);

			CreateAutoCompleteList(searchArray);
		});
	}

	else{
		//$.vAutocompletePlace.remove(tblvAutoComplete);
	}
});

//You got the required value and you clicks the word
tblvAutoComplete.addEventListener('click', function(e){
    $.tfName.value = e.rowData.result;

    $.vAutocompletePlace.remove(vAutocomplete);
});

//Returns the array which contains a match with the pattern
function PatternMatch(arrayToSearch, pattern){
    var searchLen = pattern.length;
    arrayToSearch.sort();
    var tempArray = [];
    for(var index = 0, len = arrayToSearch.length; index< len; index++){
        if(arrayToSearch[index].substring(0,searchLen).toUpperCase() === pattern.toUpperCase()){
            tempArray.push(arrayToSearch[index]);
        }
    }
    return tempArray;
}
//setting the tableview values
function CreateAutoCompleteList(searchResults){
    var tableData = [];
    for(var index=0, len = searchResults.length; index < len; index++){

            var lblSearchResult = Ti.UI.createLabel({
                top            : 2,
                width          : '80%',
                height         : 34,
                left           : '5%',
                font           : { fontSize : 10 },
                color          : '#000000',
                text           : searchResults[index]
            });

            //Creating the table view row
            var row = Ti.UI.createTableViewRow({
               backgroundColor : 'transparent',
               focusable       : true,
               height          : Ti.UI.SIZE,
               result          : searchResults[index]
            });

            row.add(lblSearchResult);
            tableData.push(row);
    }

    tblvAutoComplete.data = tableData;
	tblvAutoComplete.height = tableData.length * 35;
}