var args = arguments[0] || {};
var newsFeedModel = Alloy.createCollection('health_news_feed'); 
var categoryModel = Alloy.createCollection('categorys'); 

function init(){
	syncData({url: "grab_newsfeed", checkerId: "17", model: "health_news_feed", callback: displayHealthInfo});
}
init();
function syncData(e){
	var checker = Alloy.createCollection('updateChecker'); 
	var u_id = Ti.App.Properties.getString('u_id') || 0;
	var isUpdate = checker.getCheckerById(e.checkerId);
	var last_updated = isUpdate.updated || "";
	last_update = last_updated;
	
	var params = {u_id: u_id};
	
	if(isUpdate != ""){
		params = _.extend(params,  {last_updated: isUpdate.updated});
	}
	
	params = _.extend(params,  e.params);
	
	console.log(params);
	API.callByPost({url: e.url, params: params}, function(responseText){
		var model = Alloy.createCollection(e.model);
		var news_element = Alloy.createCollection("news_element");
		var arr = res.data;
		var res = JSON.parse(responseText);
				
        model.saveArray(arr);
        news_element.saveArray(res.element);
        
        checker.updateModule(e.checkerId, e.model, res.last_updated, u_id);
        e.callback();
	});
	
}

function displayHealthInfo(){  
	var cateList = categoryModel.getCategoryList();
	var tableData = []; 
	for(var i=0; i < cateList.length ; i++){  
		var newsList = newsFeedModel.getRecordsListByCategory(cateList[i].id);
		if(newsList.length > 0){
			var sectionNews = Ti.UI.createTableViewSection({ headerTitle: cateList[i].category });
			var data=[]; 
			for(var j=0; j < newsList.length; j++){
				var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    source: newsList[j].id, 
			    backgroundSelectedColor: "#FFE1E1",
				backgroundGradient: {
				      type: 'linear',
				      colors: ['#fff','#F7F7F6'],
				      startPoint: {x:0,y:0},
				      endPoint:{x:"100%",y:0},
				      backFillStart:false
				    },
			    });
				var row_view = Ti.UI.createView({
					left: 5,
			    	top: 5, 
			    	right: 5,
			    	bottom: 5,
			    	height: 80,
			    	width: Ti.UI.FILL,
			    	layout: "horizontal",
				});
				var tblView = Ti.UI.createView({
					layout: "vertical",
					height:"80",
					width:"auto",
				}); 
				var imageContainer = Ti.UI.createView({
					height:80,
					source: newsList[j].id, 
					width:112 
				});
				console.log(newsList[j].images+" what path or not!!");
				var leftImage = Ti.UI.createImageView({
					image: newsList[j].images, 
					source: newsList[j].id, 
					defaultImage: "/images/warm-grey-bg.png",
					width:"90%"
				});
				imageContainer.add(leftImage);
				
				var popUpTitle = Titanium.UI.createLabel({
					text:newsList[j].title,
					font:{fontSize:14, fontWeight:'bold'},
					source: newsList[j].id,
					color: "#848484",
					width: Ti.UI.FILL,
					height: Ti.UI.SIZE,
					textAlign:Titanium.UI.TEXT_ALIGNMENT_LEFT,
					wordwrap: false,
					ellipsize : true
				});
				var category =  Titanium.UI.createLabel({
					text:newsList[j].long_title,
					source: newsList[j].id,
					font:{fontSize:11},
					color: "#848484",
					textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
					width: Ti.UI.FILL,
					height: 30,
				});
				var supplier =  Titanium.UI.createLabel({
					text:newsList[j].updated,
					source: newsList[j].id,
					font:{fontSize:11},
					color: "#848484",
					textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
					width: Ti.UI.FILL,
					height: Ti.UI.SIZE,
				}); 
				row.addEventListener('click', function(e) {
				 	viewDetails(e);
				});
			 	
				tblView.add(popUpTitle);
				tblView.add(category);
			 	tblView.add(supplier);  
			 	row_view.add(imageContainer);
			 	row_view.add(tblView);
			 	row.add(row_view);
			 	data.push(row); 
				sectionNews.add(row);
			}
			tableData.push(sectionNews);
		} 
	}
	$.infoTable.setData(tableData); 
} 
function viewDetails(e){
	var nav = require('navigation');
	nav.navigateWithArgs("news", {
		news_id: e.source.source
	});
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){  
		nav.closeWindow($.healthInfoWindow); 
	}); 
}
