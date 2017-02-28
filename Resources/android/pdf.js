function exists(file) {
    try {
        if (file.exists()) return true;
    } catch (e) {}
    return false;
}

function isPdf(file) {
    try {
        var blob = file.read();
        if (!blob) return false;
        blob.slice || (blob = blob.text);
        if (!blob) return false;
        if (0 === blob.indexOf("%PDF")) return true;
    } catch (e) {}
    return false;
}

function download(url, cookies, done) {
    var base = Ti.Utils.md5HexDigest(url) + ".pdf";
    Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, base);
    var client = Ti.Network.createHTTPClient();
    client.onload = function(e) {
        try {
            var base = Ti.Utils.md5HexDigest(url) + ".pdf";
            var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, base);
            if (200 != e.source.status) throw new Error("http status " + e.source.status);
            file.write(e.source.responseData);
            return done(null, file, base, url);
        } catch (e) {
            return done(e);
        }
    };
    client.onerror = function(e) {
        return done(e);
    };
    client.ondatastream = function(e) {
        ind.value = e.progress;
        label.text = (100 * ind.value).toFixed(0) + "% Downloading";
        100 * ind.value == 100;
    };
    client.setRequestHeader("Cookie", cookies);
    client.open("GET", url);
    client.send();
    return client;
}

function copyToTemp(srcFile, base, myurl) {
    var myFileDir = Ti.Filesystem.applicationDataDirectory;
    Ti.Filesystem.isExternalStoragePresent() && (myFileDir = Ti.Filesystem.externalStorageDirectory);
    var tempdir = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, base);
    tempdir.createDirectory();
    if (void 0 === typeof myurl || null == myurl || "" == myurl) return false;
    var filename = myurl.split("/");
    filename = filename[filename.length - 1];
    var tempFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, base, filename);
    tempFile.write(srcFile.read());
    return tempFile;
}

function pdf(url, cookies, inds, labels, indView, done) {
    ind = inds;
    label = labels;
    indV = indView;
    download(url, cookies, function(err, file, base, url) {
        if (err) return done(err);
        var tempFile = copyToTemp(file, base, url);
        if (false === tempFile) {
            tempFile = copyToTemp(file, base, url);
            null == err && (err = "");
            done(err, tempFile, base, url);
        } else {
            null == err && (err = "");
            done(err, tempFile, base, url);
        }
    });
}

var ind = "";

var label = "";

var indV;

var mainView = null;

exports.construct = function(mv) {
    mainView = mv;
};

exports.createPdf = function(url, cookies, inds, labels, indView, done) {
    pdf(url, cookies, inds, labels, indView, done);
};

exports.android_launch = function(file) {
    var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_VIEW,
        data: file.getNativePath(),
        type: "application/pdf"
    });
    Ti.Android.currentActivity.startActivity(intent);
};