function fireIndexgrid(e) {
    JSON.parse(e.data);
}

function onErrorCallback(e) {
    var common = require("common");
    common.createAlert("Error", e);
}

var API_DOMAIN = "https://www.asp-medical-clinic.com/aida/";

var url_doLogin = API_DOMAIN + "login.aspx";

exports.doLogin = function() {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var ret = [];
            console.log(this.responseText);
            var res = JSON.parse(this.responseText);
            if (void 0 !== res.code) {
                ret["status"] = "error";
                ret["results"] = res;
                return ret;
            }
            ret["status"] = "success";
            ret["results"] = res;
            return ret;
        },
        onerror: function() {
            ret["status"] = "error";
            ret["results"] = "";
            return ret;
        },
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadMerchantListByCategory = function(ex) {
    var url = getMerchantListByCategory + "&category_id=" + ex;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            if ("success" == res.status) {
                var library = Alloy.createCollection("categoryAds");
                library.resetCategoryAds(ex);
                var arr = res.data;
                arr.forEach(function(entry) {
                    var categoryAds = Alloy.createModel("categoryAds", {
                        m_id: entry.m_id,
                        cate_id: ex
                    });
                    categoryAds.save();
                    var merchant = Alloy.createCollection("merchants");
                    merchant.saveMerchants(entry.m_id, entry.merchant_name, entry.mobile, entry.area, entry.state_key, entry.state_name, entry.img_path, entry.longitude, entry.latitude);
                    var branches = entry.branch;
                    branches.length > 0 && branches.forEach(function(branch) {
                        var br = Alloy.createCollection("branches");
                        br.saveBranches(branch.b_id, branch.m_id, branch.name, branch.mobile, branch.area, branch.state_key, branch.state, branch.longitude, branch.latitude);
                    });
                });
                Ti.App.fireEvent("app:category_detailCreateGridListing", {
                    cate_id: ex
                });
            }
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.bannerListing = function() {
    var url = getFeaturedBanner;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var arr = res.data;
            if ("success" == res.status) {
                var library = Alloy.createCollection("banners");
                library.resetBanner();
                var arr = res.data;
                arr.forEach(function(entry) {
                    var banners = Alloy.createModel("banners", {
                        b_id: entry.b_id,
                        m_id: entry.b_uid,
                        expired: entry.b_enddate,
                        img: entry.img_thumb
                    });
                    banners.save();
                });
                Ti.App.fireEvent("app:bannerListing", res);
            }
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadMerchantListByType = function(type) {
    var url = getMerchantListByType + "&type=" + type;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var arr = res.data;
            if ("success" == res.status) {
                if ("featured" == type) {
                    var library = Alloy.createCollection("featured");
                    library.resetFeatured();
                }
                if ("recent" == type) {
                    var library = Alloy.createCollection("recent");
                    library.resetRecent();
                }
                if ("popular" == type) {
                    var library = Alloy.createCollection("popular");
                    library.resetPopular();
                }
                "favoriteAd" == type;
                var arr = res.data;
                arr.forEach(function(entry) {
                    var typeList = Alloy.createModel(type, {
                        m_id: entry.m_id
                    });
                    typeList.save();
                    var merchant = Alloy.createCollection("merchants");
                    merchant.saveMerchants(entry.m_id, entry.merchant_name, entry.mobile, entry.area, entry.state_key, entry.state_name, entry.img_path, entry.longitude, entry.latitude);
                    var branches = entry.branch;
                    branches.length > 0 && branches.forEach(function(branch) {
                        var br = Alloy.createCollection("branches");
                        br.saveBranches(branch.b_id, branch.m_id, branch.name, branch.mobile, branch.area, branch.state_key, branch.state, branch.longitude, branch.latitude);
                    });
                });
                Ti.App.fireEvent("app:triggerAdsType", {
                    types: type,
                    pullFromServer: false
                });
            }
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.searchNearbyMerchant = function(lat, long) {
    var url = searchNearbyMerchant + "&longitude=" + long + "&latitude=" + lat + "&dist=8";
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            res.data;
            "success" == res.status && Ti.App.fireEvent("app:nearbyMerchantResult", res);
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.searchAdsItems = function(str) {
    var url = searchResult + "&search=" + str;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var arr = res.data;
            if ("success" == res.status) {
                var arr = res.data;
                Ti.App.fireEvent("app:searchRes", {
                    result: arr
                });
            }
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadAdsDetails = function(m_id, a_id) {
    var deviceToken = Ti.App.Properties.getString("deviceToken");
    if ("" != a_id) var url = getAdsDetailsById + "&m_id=" + m_id + "&a_id=" + a_id + "&token=" + deviceToken; else var url = getAdsDetailsById + "&m_id=" + m_id + "&token=" + deviceToken;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            var arr = res.data;
            if ("success" == res.status) {
                var arr = res.data;
                "" == arr;
                var ads = Alloy.createCollection("ads");
                var needRefresh = ads.saveAds(arr.a_id, arr.m_id, a_id, arr.name, arr.template_id, arr.description, arr.app_background, arr.img_path);
                var items = arr.item;
                var it = Alloy.createCollection("items");
                it.resetItem(arr.a_id);
                items.length > 0 && items.forEach(function(item) {
                    it.saveItem(item.i_id, item.a_id, item.price, item.caption, item.img_path);
                });
                Ti.App.fireEvent("app:loadAdsDetails", {
                    needRefresh: needRefresh
                });
            }
        },
        onerror: function() {},
        timeout: 1e4
    });
    client.open("GET", url);
    client.send();
};

exports.loadCategory = function() {
    var url = getCategoryList;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var res = JSON.parse(this.responseText);
            if ("Success" == res.status) {
                var library = Alloy.createCollection("category");
                library.resetCategory();
                var arr = res.data;
                arr.forEach(function(entry) {
                    var category = Alloy.createModel("category", {
                        id: entry.id,
                        categoryName: entry.categoryName
                    });
                    category.save();
                });
            }
        },
        onerror: function() {},
        timeout: 5e4
    });
    client.open("GET", url);
    client.send();
};