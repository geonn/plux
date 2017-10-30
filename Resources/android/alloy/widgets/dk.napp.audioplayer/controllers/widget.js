function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "dk.napp.audioplayer/" + s : s.substring(0, index) + "/dk.napp.audioplayer/" + s.substring(index + 1);
    return 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function onPlayStopBtnClicked() {
        if (audioPlayer.playing) {
            audioPlayer.pause();
            stopTimer();
            console.log("why cant change to play");
            $.playStopBtn.image = playIcon;
        } else {
            audioPlayer.play();
            $.scrubBar.max = getDuration();
            startTimer();
            $.playStopBtn.image = pauseIcon;
        }
    }
    function getDuration() {
        return Math.ceil(audioPlayer.duration);
    }
    function prettifyTime(time) {
        console.log(time + " time");
        time = Math.floor(time);
        var minutes = Math.floor(time / 60);
        var seconds = time - 60 * minutes;
        return padLeft(minutes, 2) + ":" + padLeft(seconds, 2);
    }
    function padLeft(nr, n, str) {
        return Array(n - String(nr).length + 1).join(str || "0") + nr;
    }
    function updateTimeLabel() {
        totalDisplayDuration = prettifyTime(getDuration() / 1e3);
        $.time.text = prettifyTime(Math.round(audioPlayer.time) / 1e3) + " / " + totalDisplayDuration;
    }
    function startTimer() {
        if (!timerIsActive) {
            totalDisplayDuration = prettifyTime(getDuration() / 1e3);
            console.log(totalDisplayDuration + " totalDisplayDuration");
            timer = setInterval(function() {
                var currentTime = Math.round(audioPlayer.time);
                console.log(getDuration() + " " + audioPlayer.time);
                0 == audioPlayer.time && stopTimer();
                $.scrubBar.value = currentTime;
                $.time.text = prettifyTime(currentTime / 1e3) + " / " + totalDisplayDuration;
            }, 500);
        }
        timerIsActive = true;
    }
    function stopTimer(e) {
        console.log(timer);
        console.log("stop timer");
        clearInterval(timer);
        timerIsActive = false;
        $.playStopBtn.image = playIcon;
    }
    function set_url(url) {
        console.log(url + " here url");
        try {
            audioPlayer = Ti.Media.createSound({
                url: url,
                allowBackground: true
            });
        } catch (e) {
            console.log(e.message);
        }
        audioPlayer.play();
        audioPlayer.stop();
        updateTimeLabel();
        $.playStopBtn.image = playIcon;
    }
    new (require("/alloy/widget"))("dk.napp.audioplayer");
    this.__widgetId = "dk.napp.audioplayer";
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.wrap = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "wrap",
        layout: "vertical"
    });
    $.__views.wrap && $.addTopLevelView($.__views.wrap);
    $.__views.__alloyId0 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 30,
        id: "__alloyId0"
    });
    $.__views.wrap.add($.__views.__alloyId0);
    $.__views.playStopBtn = Ti.UI.createImageView({
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontSize: "24dp",
            fontFamily: "FontAwesome"
        },
        color: "#000",
        top: 0,
        width: 30,
        height: 30,
        left: 10,
        right: 10,
        zIndex: 10,
        id: "playStopBtn"
    });
    $.__views.__alloyId0.add($.__views.playStopBtn);
    onPlayStopBtnClicked ? $.addListener($.__views.playStopBtn, "click", onPlayStopBtnClicked) : __defers["$.__views.playStopBtn!click!onPlayStopBtnClicked"] = true;
    $.__views.scrubBar = Ti.UI.createSlider({
        top: 4,
        width: "auto",
        height: 30,
        min: 0,
        max: 100,
        value: 0,
        left: 50,
        right: 10,
        id: "scrubBar"
    });
    $.__views.__alloyId0.add($.__views.scrubBar);
    $.__views.time = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "14dp"
        },
        right: 0,
        left: 10,
        id: "time"
    });
    $.__views.wrap.add($.__views.time);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var audioPlayer = Ti.Media.createSound();
    var timer;
    Ti.App.idleTimerDisabled = true;
    var idleTimer = Ti.App.idleTimerDisabled;
    var sliderTouched = false;
    var sliderIsPausingPlayback = false;
    var timerIsActive = false;
    var totalDisplayDuration;
    var playIcon;
    var pauseIcon;
    _.each(args.styles, function(value, property) {
        if ("object" == typeof value) {
            $[property].applyProperties(value);
            delete args.styles[property];
        }
    });
    delete args.styles;
    args.playIcon && (playIcon = WPATH("/images/play_button.png"));
    args.pauseIcon && (pauseIcon = WPATH("/images/pause_button.png"));
    $.scrubBar.thumbImage = "/images/player_indicator.png";
    $.scrubBar.show();
    $.scrubBar.addEventListener("touchstart", function(e) {
        sliderTouched = true;
        if (audioPlayer.playing) {
            sliderIsPausingPlayback = true;
            stopTimer();
            audioPlayer.pause();
        }
    });
    $.scrubBar.addEventListener("touchend", function(e) {
        audioPlayer.setTime($.scrubBar.value);
        if (audioPlayer.paused && sliderIsPausingPlayback) {
            audioPlayer.play();
            startTimer();
        }
        sliderTouched = false;
        sliderIsPausingPlayback = false;
    });
    audioPlayer.addEventListener("change", function(e) {
        Ti.API.debug("[AudioPlayerWidget] State: " + e.description + " (" + e.state + ")");
        e.state == Ti.Media.Sound.STATE_PLAYING ? startTimer() : e.state == Ti.Media.Sound.STATE_PAUSED ? stopTimer() : e.state == Ti.Media.Sound.STATE_STOPPED && stopTimer();
    });
    exports.setUrl = function(url) {
        var filename = url.split("/").pop();
        var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
        if (file.exists()) set_url(file.nativePath); else {
            var xhr = Titanium.Network.createHTTPClient({
                onload: function() {
                    var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
                    f.write(this.responseData);
                    Ti.App.fireEvent("graphic_downloaded", {
                        filepath: f.nativePath
                    });
                    set_url(f.nativePath);
                },
                timeout: 1e4
            });
            xhr.open("GET", url);
            xhr.send();
        }
    };
    exports.updatePlayIcon = function(icon) {
        playIcon = icon;
    };
    exports.updatePauseIcon = function(icon) {
        pauseIcon = icon;
    };
    exports.dispose = function() {
        Ti.API.debug("[AudioPlayerWidget] was disposed, idleTimer reset to = " + idleTimer);
        audioPlayer.stop();
        audioPlayer.release();
        Ti.App.idleTimerDisabled = idleTimer;
    };
    exports.addEventListener = $.on;
    exports.removeEventListener = $.off;
    exports.fireEvent = $.trigger;
    __defers["$.__views.playStopBtn!click!onPlayStopBtnClicked"] && $.addListener($.__views.playStopBtn, "click", onPlayStopBtnClicked);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;