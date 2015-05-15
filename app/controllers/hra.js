var args = arguments[0] || {};

$.menu.addEventListener('itemclick', function(e){
	var item = e.section.getItemAt(e.itemIndex);
	var webview = Titanium.UI.createWebView({url: item.properties.link});
	nav.navigationWebview(webview, item.properties.title);
});