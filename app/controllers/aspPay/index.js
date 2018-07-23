var args = arguments[0] || {};

$.merchant.text = args.merchant;
$.item.text = args.item;
$.amount.text = args.amount;

function doPay(){
    
    
     API.callByGet({fullurl: true, url: "http://192.168.0.187/api/relay/0?apikey=79BCF27467A24DA1", params:"value=0"}, {
        onload: function(){
            
        }, onfinish: function(){
            console.log("open door finish");
            $.win.close();
            Ti.App.fireEvent("payment_done", {});
            //common.createAlert1("ASPPAY", "Payment has been made.", function(){$.win.close();});
        }
    });
}
