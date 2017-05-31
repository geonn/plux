var args = arguments[0] || {};
var news_id = args.news_id;
var newsFeedModel = Alloy.createCollection('health_news_feed'); 
var newsElementModel = Alloy.createCollection('news_element'); 
var categoryModel = Alloy.createCollection('categorys');

var news    = newsFeedModel.getRecordsById(news_id);
var details = newsElementModel.getListByNews(news_id); 
var pageCate = categoryModel.getCategoryById(news.category);
console.log(news);
if(OS_IOS){
	$.news.title = pageCate.category;
}
 
$.newsTitle.text = news.title;
$.newsImage.image = news.images;
$.newsDate.text = timeFormat(news.updated);

details.forEach(function(entry) {
	if(entry.type == "1"){
		var dynaLabel = $.UI.create('Label',{
			text:entry.content,
			classes : ["news_subtitle"]
		});
		$.myContentView.add(dynaLabel);
	}
	
	if(entry.type == "2"){
		var msg = entry.content;
		msg = msg.replace(/<br\/>/g,"\r\n");
		var dynaLabel = $.UI.create('Label',{
			text:msg,
			classes : ["news_paragraph"]
		});
		$.myContentView.add(dynaLabel);
	}
	
	if(entry.type == "3"){
		 
		var dynaImage = Ti.UI.createImageView({
			image: entry.images
		});
		$.myContentView.add(dynaImage);
		var msg = entry.content;
		msg = msg.replace(/<br\/>/g,"\r\n");
		var dynaLabel = $.UI.create('Label',{
			text:msg,
			classes : ["image_caption"]
		});
		$.myContentView.add(dynaLabel);
	}
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.news); 
	}); 
} 
//$.myContentView.add();