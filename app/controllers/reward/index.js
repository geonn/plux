var args = arguments[0] || {};
var reward_uid = Ti.App.Properties.getString('reward_uid');


function init(){
    getPersonalInfo();
    getRewardList();
}

init();

function getRewardList(){
    API.callByGet({url:"/api/offer/getoffers?page=1&size=20", domain: "REZA_DOMAIN", new:true, params: ""}, {
        onload: function(responseText){
                var res = JSON.parse(responseText);
                console.log(res);
                renderReward(res.data.offers);
                /*setTimeout(function(){
                    $.points.text = res.data.points;
                    $.points_indicator.hide();
                }, 2000);*/
                
            }, onfinish: function(){
                console.log("reward list finish");
                //$.win.close();
           }
    });
}

function getPersonalInfo(){
    $.points_indicator.show();
    API.callByGet({url:"/api/user/profile/view/"+reward_uid, domain: "REZA_DOMAIN", new:true, params: ""}, {
        onload: function(responseText){
                var res = JSON.parse(responseText);
                console.log(res.data);
                setTimeout(function(){
                    $.points.text = res.data.points;
                    $.points_indicator.hide();
                }, 500);
                
            }, onfinish: function(){
                console.log("reward call finish");
                //$.win.close();
           }
    });
}

function renderReward(data){
    var pWidth = ((OS_IOS)?Ti.Platform.displayCaps.platformWidth:parseInt(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.logicalDensityFactor || 1), 10)) - 20;

    data = _.sortBy(data, "visitdate");
    data.reverse();
    for (var i=0; i < data.length; i++) {
       if(data[i].offer_Status == "Approved")
            var left_indicator_bg_color = "55a939";
            var row = $.UI.create("View", {classes:['wfill','padding','rounded'], bottom: (data.length -1 == i)?10:0, height: 120, backgroundColor: left_indicator_bg_color, record: data[i]});
            var view_container = $.UI.create("View", {classes:['wfill','hfill'], touchEnabled: false, backgroundColor: "#fff", left: 5});
            row.add(view_container);
            
            var view_left_container = $.UI.create("View", {classes:['hfill'], touchEnabled: false, width: "30%", left: 0, top: 10, bottom:10});
            view_container.add(view_left_container);
            var view_cutoff = $.UI.create("View", {zIndex: 100, touchEnabled: false, width: 30, height: 30, borderRadius:15, backgroundColor: "#535a74", top: -20, left: Math.floor(pWidth*0.30) - 15});
            var view_cutoff2 = $.UI.create("View", {zIndex: 100, touchEnabled: false, width: 30, height: 30, borderRadius:15, backgroundColor: "#535a74", bottom: -20, left: Math.floor(pWidth*0.30) - 15});
            view_container.add(view_cutoff);
            view_container.add(view_cutoff2);
            var view_point = $.UI.create("View", {classes:['wfill', 'vert'], touchEnabled: false, height: 60, top: 0});
            var view_quantity = $.UI.create("View", {classes:['wfill', 'vert'], touchEnabled: false, height: 40, left: 10, bottom: 0});
            view_left_container.add(view_point);
            view_left_container.add(view_quantity);
            
            var label_user_rank = $.UI.create("Label", {classes:['wfill','hsize','h5'], bottom: 50, touchEnabled: false, left: 10, right:10, minimumFontSize: 10, color: left_indicator_bg_color, text: data[i].offer_UserRanking});
            view_left_container.add(label_user_rank);
            var label_point = $.UI.create("Label", {classes:['wfill','hsize','h4','bold'], touchEnabled: false, left: 10, right:10, minimumFontSize: 10, text: "RM "+ data[i].offer_Reward});
            view_point.add(label_point);
            
            var label_quantity_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, text: "QUANTITY"});
            var label_quantity = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, text: data[i].offer_QuantityTo - data[i].offer_QuantityFrom});
            view_quantity.add(label_quantity_title);
            view_quantity.add(label_quantity);
            
            var view_separator = $.UI.create("View", {classes:['hfill'], touchEnabled: false, width: 1, left: "30%", top: 10, bottom: 10, backgroundColor: "#eeeeee"});
            view_container.add(view_separator);
            var view_right_container = $.UI.create("View", {classes:['hfill'], touchEnabled: false, width: "70%", left: "30%", right: 10, bottom:10, top:10});
            view_container.add(view_right_container);
            
            var view_right_top = $.UI.create("View",{classes:['wfill','vert','padding','hfill'], touchEnabled: false, top: 0, bottom: 0});
            view_right_container.add(view_right_top);
            
            var label_offer_Name = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].offer_Name});
            var label_offer_Content = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, minimumFontSize: 10, text: data[i].offer_Content});
            var label_CreatedBy_title = $.UI.create("Label", {classes:['wfill','hsize','h6'], touchEnabled: false, top:5, text: "OFFER BY"});
            var label_CreatedBy = $.UI.create("Label", {classes:['wfill','hsize','h6','bold'], touchEnabled: false, minimumFontSize: 10, text: data[i].offer_CreatedBy});
            view_right_top.add(label_offer_Name);
            view_right_top.add(label_offer_Content);
            view_right_top.add(label_CreatedBy_title);
            view_right_top.add(label_CreatedBy);
            
            row.addEventListener("click", function(e){
               nav.navigateWithArgs("reward/detail", e.source.record); 
            });
            
            $.listing.add(row);
    };
    if(data.length <= 0){
        var row = $.UI.create("View", {classes:['wfill','hsize','padding','rounded'], bottom: 0, backgroundColor: "#fff"});
        var view_container = $.UI.create("View", {classes:['wfill','hsize','padding'], touchEnabled: false });
        var label = $.UI.create("Label", {classes:['wfill','hsize','h5'], textAlign:"center", text: "No Reward found"});
        row.add(view_container);
        view_container.add(label);
        $.listing.add(row);
    }
}
