var args = arguments[0] || {};
var reward_uid = Ti.App.Properties.getString('reward_uid');

function init(){
    getRewardDetail();
}

init();

function getRewardDetail(){
    API.callByGet({url:"/api/offer/get/"+args.offer_Id, domain: "REZA_DOMAIN", new:true, params: ""}, {
        onload: function(responseText){
                var res = JSON.parse(responseText);
                console.log(res);
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
