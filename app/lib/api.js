/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = "https://www.asp-medical-clinic.com/aida/";

var url_doLogin		= API_DOMAIN+"login.aspx";

/*********************
**** API FUNCTION*****
**********************/

// update user device token
exports.doLogin = function(LOGINID, PASSWORD){
	
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var ret = [];
	       console.log(this.responseText);
	       var res = JSON.parse(this.responseText);
			
	       if(res.code !== undefined){
	       		ret['status'] = "error";
	       		ret['results'] = res;
	       		return ret;
	       }else{
	       		ret['status'] = "success";
	       		ret['results'] = res;
	       		return ret;
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	ret['status'] = "error";
       		ret['results'] = "";
       		return ret;
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.loadMerchantListByCategory = function (ex){
	var url = getMerchantListByCategory+"&category_id="+ex;
	
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	    
	       var res = JSON.parse(this.responseText);

	       if(res.status == "success"){
	       	/**reset current category**/
	       	var library = Alloy.createCollection('categoryAds'); 
			library.resetCategoryAds(ex);
			
			/**load new set of category ads from API**/
	       	var arr = res.data;
	       
	       	arr.forEach(function(entry) {
				var categoryAds = Alloy.createModel('categoryAds', {
			        m_id    : entry.m_id,
			        cate_id   : ex
			    });
			    categoryAds.save();
			    
			    //Save merchant info
	       		var merchant = Alloy.createCollection('merchants'); 
				merchant.saveMerchants(entry.m_id, entry.merchant_name, entry.mobile, entry.area, entry.state_key, entry.state_name, entry.img_path, entry.longitude, entry.latitude);
	         	
				//Save branches info
			    var branches = entry.branch; 
			    if(branches.length > 0){
			    	branches.forEach(function(branch) {
			    		
			    		var br = Alloy.createCollection('branches'); 
						br.saveBranches( branch.b_id, branch.m_id, branch.name,branch.mobile, branch.area, branch.state_key,branch.state, branch.longitude, branch.latitude);
			    	});
			    }
			});
			
			Ti.App.fireEvent('app:category_detailCreateGridListing', {cate_id: ex});
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

// load featured banner
exports.bannerListing = function (type){
	var url = getFeaturedBanner;

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	    
	       var res = JSON.parse(this.responseText);
			
	       var arr = res.data;
	       
	       if(res.status == "success"){
	       	/**reset current category**/
	       	var library = Alloy.createCollection('banners'); 
			library.resetBanner();
			
			/**load new set of category from API**/
	       	var arr = res.data;
	       	arr.forEach(function(entry) {
				var banners = Alloy.createModel('banners', {
					b_id    : entry.b_id,
					m_id    : entry.b_uid,
				    expired   : entry.b_enddate,
				    img     : entry.img_thumb
				});
				banners.save();
			});
			
			Ti.App.fireEvent('app:bannerListing', res);
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};


exports.loadMerchantListByType = function (type){
	var url = getMerchantListByType+"&type="+type;
	
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	    
	       var res = JSON.parse(this.responseText);
	       var arr = res.data;
	       if(res.status == "success"){
	       	
	       	if(type == "featured"){
	       		/**reset**/
		       	var library = Alloy.createCollection("featured"); 
		       	library.resetFeatured();
	       	}
	       	
	       	if(type == "recent"){
	       		/**reset**/
		       	var library = Alloy.createCollection("recent"); 
		       	library.resetRecent();
	       	}
	       
			if(type == "popular"){
	       		/**reset**/
		       	var library = Alloy.createCollection("popular"); 
		       	library.resetPopular();
	       	}
	       	
	       	if(type == "favoriteAd"){
	       		/**reset**/
		       	//var library = Alloy.createCollection("popular"); 
		       	//library.resetPopular();
	       	}
	       
			/**load new set of category from API**/
	       	var arr = res.data;
	       	arr.forEach(function(entry) {
	       		
	       		//Save Type List
	       		var typeList = Alloy.createModel(type, {
					m_id    : entry.m_id
				});
				typeList.save();
					
	       		//Save merchant info
	       		var merchant = Alloy.createCollection('merchants'); 
				merchant.saveMerchants(entry.m_id, entry.merchant_name, entry.mobile, entry.area, entry.state_key, entry.state_name, entry.img_path, entry.longitude, entry.latitude);
	         	
				//Save branches info
			    var branches = entry.branch; 
			    
			    if(branches.length > 0){
			    	branches.forEach(function(branch) {
			    		var br = Alloy.createCollection('branches'); 
						br.saveBranches( branch.b_id, branch.m_id, branch.name,branch.mobile, branch.area, branch.state_key,branch.state, branch.longitude, branch.latitude);
			    	});
			    }
			});
			
			Ti.App.fireEvent('app:triggerAdsType', {types : type,pullFromServer : false});
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

//search user nearby
exports.searchNearbyMerchant = function(lat,long){
	
	var url = searchNearbyMerchant+"&longitude="+long+"&latitude="+lat+"&dist=8";

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       var res = JSON.parse(this.responseText);
	       var arr = res.data;
	       if(res.status == "success"){
			Ti.App.fireEvent('app:nearbyMerchantResult', res);
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};


//load ads & item search
exports.searchAdsItems = function(str){
	var url = searchResult+"&search="+str;
	
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	    
	       var res = JSON.parse(this.responseText);
	       var arr = res.data;
	       var search = [];
	       if(res.status == "success"){
	       	
			/**load new set of category from API**/
	       	var arr = res.data;
	       
			Ti.App.fireEvent('app:searchRes', {result : arr});
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
	
};

//load Ads details and items
exports.loadAdsDetails = function(m_id, a_id){
 
	var deviceToken = Ti.App.Properties.getString('deviceToken');
	
	if(a_id != ""){
		var url =  getAdsDetailsById +"&m_id="+m_id+"&a_id="+a_id+"&token="+deviceToken;
	}else{
		var url =  getAdsDetailsById +"&m_id="+m_id+"&token="+deviceToken;
	}
 	// alert(url);
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	        var res = JSON.parse(this.responseText);
	       
	       var arr = res.data;
	       if(res.status == "success"){
	       		 var arr = res.data;
	       		 
	       		 if(arr == ""){
	       		 	//return;
	       		 }
	       		 
			     var ads = Alloy.createCollection('ads'); 
				 var needRefresh = ads.saveAds(arr.a_id, arr.m_id, a_id, arr.name, arr.template_id, arr.description,arr.app_background, arr.img_path);
			         	
			     //Save item info
				 var items = arr.item; 
				 var it = Alloy.createCollection('items'); 
				 it.resetItem(arr.a_id);	    
				 if(items.length > 0){
					items.forEach(function(item) {
						it.saveItem( item.i_id, item.a_id, item.price,item.caption, item.img_path);
					});
				 }		
		        
		      Ti.App.fireEvent('app:loadAdsDetails',{needRefresh: needRefresh});
	       }
	       
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	      },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

//load category to db
exports.loadCategory = function (ex){
	 var url = getCategoryList;
	 var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	  
	       var res = JSON.parse(this.responseText);
	       
	       if(res.status == "Success"){
	       	/**reset current category**/
	       	var library = Alloy.createCollection('category'); 
			library.resetCategory();
			
			/**load new set of category from API**/
	       	var arr = res.data;
	       	//console.log(res);
	       	arr.forEach(function(entry) {
				var category = Alloy.createModel('category', {
			        id    : entry.id,
			        categoryName   : entry.categoryName
			    });
			    category.save();
			});
	       }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     },
	     timeout : 50000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

//private function

function fireIndexgrid(e){
	var res = JSON.parse(e.data);
	//console.log(res.status);
	//Ti.App.fireEvent('app:create2GridListing', res);
};

function onErrorCallback(e) {
	var common = require('common');
	// Handle your errors in here
	common.createAlert("Error", e);
};
