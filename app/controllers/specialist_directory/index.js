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
	}, 3000);
	
}

function init2(){
	$.win.add(loading.getView());
	loading.start();
	setTimeout(function(){
		loading.finish();
	}, 15000);
	
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

	var name = $.tfName.value;

	var state = $.pState.getSelectedRow(0).id;
	if(state == "any"){
		state="";
	}

	var specialty = $.pSpecial.getSelectedRow(0).id;
	if(specialty == "any"){
		specialty="";
	}
	
	var hospital = $.tfHospital.value;

	init2();
	Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: name, state: state, specialty: specialty, hospital: hospital}}, function(responseText){
		
		var obj = JSON.parse(responseText);

		var win = Alloy.createController("specialist_directory/result", {data: obj}).getView();
		win.open();
	});
}

function clickState(e){
	$.pState.setSelectedRow(null, null);
}

function clickSpecial(e){
	$.pSpecial.setSelectedRow(null, null);
}

////////////////////////////////////////////////

//Table view showing your autocomplete values
var tblvAutoComplete = Ti.UI.createTableView({
    width           : '100%',
    backgroundColor : '#EFEFEF',
    height          : 0,
    maxRowHeight    : 35,
    minRowHeight    : 35,
    allowSelection  : true
});

$.mainView.add(tblvAutoComplete);

//Starts auto complete
$.tfName.addEventListener('change', function(e){ 
	var pattern = e.source.value;

	if(pattern.length <= 15){
		//add searchArray values
		Alloy.Globals.API.callByPost({url: "getSpecialistV2", new:true, domain: "FREEJINI_DOMAIN",  params: {name: pattern}}, function(responseText){
		
			var obj = JSON.parse(responseText);
	
			var searchArray = [];
	
			for (let index = 0; index < obj.data.length; index++) {
				searchArray[index] = obj.data[index].name;
			}
	
			var tempArray = PatternMatch(searchArray, pattern);
			CreateAutoCompleteList(tempArray);
		});
	}

	else{
		tblvAutoComplete.visible = false;
	}
	
});

//You got the required value and you clicks the word
tblvAutoComplete.addEventListener('click', function(e){
    $.tfName.value = e.rowData.result; 
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
                width          : '40%',
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
               height          : 50,
               result          : searchResults[index]
            });

            row.add(lblSearchResult);
            tableData.push(row);
    }
    tblvAutoComplete.data = tableData;
	tblvAutoComplete.height = tableData.length * 35;
}