var args = arguments[0] || {};

var items = [];
for (var i=0; i < args.listing.length; i++) {
    if(OS_IOS){
        var row = $.UI.create("TableViewRow", {search: args.listing[i].value});
        var view = $.UI.create("View", {classes:['wfill','hsize','padding']});
        var label_content = $.UI.create("Label", {classes:['wfill','hsize','h7'], text: args.listing[i].value});
        view.add(label_content);
        row.add(view);
        items.push(row);
    }else{
        items.push({title: args.listing[i].value, color: "#000000"});
    }
};
var tableview = Titanium.UI.createTableView({
    data: items,
    layout: "vertiacl",
    search: Titanium.UI.createSearchBar({
        hintText: args.title+" Search"
    }),
    filterAttribute: "search",
    backgroundColor: "#ffffff",
    searchAsChild: true,
    zIndex:100
});

tableview.addEventListener("click", function(e){
    args.callback(args.listing[e.index]);
    console.log("please check here");
    console.log(args.click_dun_exit);
    if(!args.click_dun_exit){
      $.win.close();
    }
    if(typeof args.w != "undefined"){
      args.w.close();
    }
    return;
});
$.win.add(tableview);
