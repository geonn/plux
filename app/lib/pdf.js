var ind = '';
var label = '';
var indV;
var mainView = null;  

exports.construct = function(mv){
	mainView = mv;
};

// Checks to see if a file exists
function exists (file) {

  try {
    if (file.exists()) {
      return true;
    }
  } catch (e) {
 
  }
 
  return false;
}
 
// Checks if a file is a pdf by reading it and checking magic word
function isPdf (file) {
  try {
    // read first 4 bytes and check if its equal to %PDF
    
    var blob = file.read();
 
    if (!blob) return false;
 
    // sometimes its a blob, sometimes its text already.
    if (!blob.slice) blob = blob.text;
 
    if (!blob) return false;
 
    if (blob.indexOf("%PDF") === 0) return true;
 
  } catch (e) {
    
  }
 	 
  return false;
}
 
// Downloads a pdf 
function download (url, cookies, done) {
  var base = Ti.Utils.md5HexDigest(url) + '.pdf';
  var file = Ti.Filesystem.getFile(
    Ti.Filesystem.applicationDataDirectory, 
    base
  );
 
  if (exists(file)) {  
    return done(null, file, base, url);
  }
 
  // Download pdf file
  var client = Ti.Network.createHTTPClient();
  client.onload = function (e) {
    try { 
      // reopen the file, because otherwise the app will segfault, no really.
      var base = Ti.Utils.md5HexDigest(url) + '.pdf';
      var file = Ti.Filesystem.getFile(
        Ti.Filesystem.applicationDataDirectory, 
        base
      ); 
      if (e.source.status != 200)
        throw new Error("http status " + e.source.status);
     	 file.write(e.source.responseData); 
      	return done(null, file, base, url);
    } catch (e) { 
      return done(e);
    } 
  };
 
  client.onerror = function (e) {  
    return done(e);
  };
  
  	client.ondatastream = function(e) { 
		ind.value = e.progress ;
		label.text = (ind.value*100).toFixed(0)+"% Downloading"; 
		if((ind.value*100) == 100){
		 
			//return done(null);
		}
	};
	
	
  client.setRequestHeader("Cookie", cookies);
 
  client.open("GET", url);
  client.send();
  return client;
}

// copies srcFile to a temp dir / filename.pdf
function copyToTemp (srcFile, base, myurl) {
	  // create temp directory (with md5 hash as dirname) and put file in there.
	  // This is so that the name of the file (on the server) can be the same
	  // as the name of the file on the device tha we're about to write so the
	  // filename shows up properly in whatever reader the user is using. 
	  // Otherwise it'd be some hex string (ie, the md5 hash as filename
	 // Test if External Storage (Android only)
	 var myFileDir = Ti.Filesystem.applicationDataDirectory;
	 if(Ti.Filesystem.isExternalStoragePresent()){
	   myFileDir = Ti.Filesystem.externalStorageDirectory;
	 }
	   
	 //var tempdir = Ti.Filesystem.getFile(myFileDir, base);
	 var tempdir = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, base);
	 tempdir.createDirectory(); 
	 if(typeof myurl === undefined || myurl == null || myurl == ""){ 
	 	return false; 
	 }else{
	 	 var filename = myurl.split('/');
	  	filename = filename[filename.length - 1];
	 
	  	var tempFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, base, filename);
	 
	  	tempFile.write(srcFile.read());  
	  	return tempFile;
	 }
 
}
 
 
// do whole thing -- download url w/ cookies and launch pdf
function pdf (url, cookies, inds, labels,indView, done) { 
	ind = inds;
  	label = labels;
  	indV =indView;
  
 	download(url, cookies, function (err, file, base, url) { 
   		if (err) return done(err); 
 		var tempFile = copyToTemp(file, base, url); 
	    if(tempFile === false){
	    	tempFile = copyToTemp(file, base, url);
	    	if(Ti.Platform.osname == "android"){
	    		if(err == null){
	    	 		err = "";
	    	 	}
	    		done(err, tempFile, base, url);
	    	}else{
	    		done(err, file, base, url);
	    	}
	    }else{
	    	if(Ti.Platform.osname == "android"){
	    	 	if(err == null){
	    	 		err = "";
	    	 	}
	    	  
	    		done(err, tempFile, base, url);
	    	}else{
	    		done(err, file, base, url);
	    	}
	    } 
  	});
}
 
exports.createPdf = function(url, cookies, inds, labels,indView, done){
	pdf(url, cookies, inds, labels, indView,done);
};

// launch intent to read pdf
exports.android_launch = function (file) { 
  var intent = Ti.Android.createIntent({
    action: Ti.Android.ACTION_VIEW,
    data: file.getNativePath(),
    type: "application/pdf"
  });
  Ti.Android.currentActivity.startActivity(intent);
};
 