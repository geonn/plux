function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "dk.napp.audioplayer/" + s : s.substring(0, index) + "/dk.napp.audioplayer/" + s.substring(index + 1);
    return 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Window",
    style: {
        backgroundColor: "#ffffff",
        orientationModes: [ Ti.UI.PORTRAIT ]
    }
}, {
    isApi: true,
    priority: 1000.0008,
    key: "Label",
    style: {
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#606060"
    }
}, {
    isApi: true,
    priority: 1000.001,
    key: "ListItem",
    style: {
        color: "#000"
    }
}, {
    isApi: true,
    priority: 1000.0017,
    key: "TextField",
    style: {
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff"
    }
}, {
    isApi: true,
    priority: 1101.0002,
    key: "Window",
    style: {
        backgroundColor: "#ffffff",
        fullscreen: false,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN
    }
}, {
    isApi: true,
    priority: 1101.0016,
    key: "TableViewRow",
    style: {
        color: "#606060",
        top: 10,
        bottom: 10
    }
}, {
    isClass: true,
    priority: 10000.0006,
    key: "line",
    style: {
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6"
    }
}, {
    isClass: true,
    priority: 10000.0007,
    key: "hr",
    style: {
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6"
    }
}, {
    isClass: true,
    priority: 10000.0009,
    key: "padding",
    style: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    }
}, {
    isClass: true,
    priority: 10000.0011,
    key: "big_font",
    style: {
        font: {
            fontSize: "20dp"
        }
    }
}, {
    isClass: true,
    priority: 10000.0012,
    key: "normal_font",
    style: {
        font: {
            fontSize: "16dp"
        }
    }
}, {
    isClass: true,
    priority: 10000.0013,
    key: "medium_font",
    style: {
        font: {
            fontSize: "14dp"
        }
    }
}, {
    isClass: true,
    priority: 10000.0014,
    key: "small_font",
    style: {
        font: {
            fontSize: "12dp"
        }
    }
}, {
    isClass: true,
    priority: 10000.0018,
    key: "vert",
    style: {
        layout: "vertical"
    }
}, {
    isClass: true,
    priority: 10000.0019,
    key: "horz",
    style: {
        layout: "horizontal"
    }
}, {
    isClass: true,
    priority: 10000.002,
    key: "wfill",
    style: {
        width: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0021,
    key: "wsize",
    style: {
        width: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0022,
    key: "hfill",
    style: {
        height: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0023,
    key: "hsize",
    style: {
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0024,
    key: "conthsize",
    style: {
        contentHeight: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0025,
    key: "contwsize",
    style: {
        contentWidth: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0026,
    key: "conthfill",
    style: {
        contentHeight: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0027,
    key: "contwfill",
    style: {
        contentWidth: Ti.UI.FILL
    }
}, {
    isClass: true,
    priority: 10000.0028,
    key: "small_padding",
    style: {
        top: 4,
        left: 4,
        right: 4,
        bottom: 4
    }
}, {
    isClass: true,
    priority: 10000.0029,
    key: "box",
    style: {
        borderColor: "#dfe0e4",
        backgroundColor: "#FFFFFF"
    }
}, {
    isClass: true,
    priority: 10000.003,
    key: "small_button",
    style: {
        borderColor: "#CE1D1C",
        backgroundColor: "#ffffff",
        color: "#CE1D1C",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: 14
        }
    }
}, {
    isClass: true,
    priority: 10000.0031,
    key: "rounded",
    style: {
        borderRadius: "5"
    }
}, {
    isClass: true,
    priority: 10000.0032,
    key: "bigRounded",
    style: {
        borderRadius: "20"
    }
}, {
    isClass: true,
    priority: 10000.0033,
    key: "greyText",
    style: {
        color: "#9E9E9E"
    }
}, {
    isClass: true,
    priority: 10000.0034,
    key: "center",
    style: {
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER
    }
}, {
    isClass: true,
    priority: 10000.0035,
    key: "darkgreyText",
    style: {
        color: "#626262",
        font: {
            fontWeight: "bold"
        }
    }
}, {
    isClass: true,
    priority: 10000.0036,
    key: "bottom",
    style: {
        bottom: 0
    }
}, {
    isClass: true,
    priority: 10000.0037,
    key: "top",
    style: {
        top: 0
    }
}, {
    isClass: true,
    priority: 10000.0038,
    key: "right",
    style: {
        right: 0
    }
}, {
    isClass: true,
    priority: 10000.0039,
    key: "left",
    style: {
        left: 0
    }
}, {
    isClass: true,
    priority: 10000.004,
    key: "h1",
    style: {
        font: {
            fontSize: 36
        }
    }
}, {
    isClass: true,
    priority: 10000.0041,
    key: "h2",
    style: {
        font: {
            fontSize: 30
        }
    }
}, {
    isClass: true,
    priority: 10000.0042,
    key: "h3",
    style: {
        font: {
            fontSize: 24
        }
    }
}, {
    isClass: true,
    priority: 10000.0043,
    key: "h4",
    style: {
        font: {
            fontSize: 18
        }
    }
}, {
    isClass: true,
    priority: 10000.0044,
    key: "h5",
    style: {
        font: {
            fontSize: 14
        }
    }
}, {
    isClass: true,
    priority: 10000.0045,
    key: "h6",
    style: {
        font: {
            fontSize: 12
        }
    }
}, {
    isClass: true,
    priority: 10000.0046,
    key: "h7",
    style: {
        font: {
            fontSize: 10
        }
    }
}, {
    isClass: true,
    priority: 10000.0047,
    key: "font_light_grey",
    style: {
        color: "#9197a3 "
    }
}, {
    isClass: true,
    priority: 10000.0048,
    key: "font_dark_grey",
    style: {
        color: "#C8C8CD"
    }
}, {
    isClass: true,
    priority: 10000.0049,
    key: "black-line",
    style: {
        backgroundColor: "#525252",
        width: Ti.UI.FILL,
        height: 1
    }
}, {
    isClass: true,
    priority: 10000.005,
    key: "gray-line",
    style: {
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1
    }
}, {
    isClass: true,
    priority: 10000.0051,
    key: "grey-background",
    style: {
        backgroundColor: "#F4F4F4"
    }
}, {
    isClass: true,
    priority: 10000.0052,
    key: "white-line",
    style: {
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        height: 1
    }
}, {
    isClass: true,
    priority: 10000.0053,
    key: "bold",
    style: {
        font: {
            fontWeight: "bold"
        }
    }
}, {
    isClass: true,
    priority: 10000.0054,
    key: "left-align",
    style: {
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT
    }
}, {
    isClass: true,
    priority: 10000.0055,
    key: "right-align",
    style: {
        textAlign: Titanium.UI.TEXT_ALIGNMENT_RIGHT
    }
}, {
    isClass: true,
    priority: 10000.0056,
    key: "whiteColor",
    style: {
        color: "#ffffff"
    }
}, {
    isClass: true,
    priority: 10000.0057,
    key: "themeColor",
    style: {
        color: "#CE1D1C"
    }
}, {
    isClass: true,
    priority: 10000.0058,
    key: "themeBg",
    style: {
        backgroundColor: "#CE1D1C"
    }
}, {
    isClass: true,
    priority: 10000.0059,
    key: "padding-top",
    style: {
        top: 10
    }
}, {
    isClass: true,
    priority: 10000.006,
    key: "padding-left",
    style: {
        left: 10
    }
}, {
    isClass: true,
    priority: 10000.0061,
    key: "padding-right",
    style: {
        right: 10
    }
}, {
    isClass: true,
    priority: 10000.0062,
    key: "padding-bottom",
    style: {
        bottom: 10
    }
}, {
    isClass: true,
    priority: 10000.0063,
    key: "button",
    style: {
        height: 40,
        borderColor: "#C6C8CA",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#ED1C24",
        borderRadius: 6,
        color: "#ffffff",
        width: Titanium.UI.FILL,
        left: 10,
        right: 10,
        top: 10,
        font: {
            fontFamily: "Lato-Regular"
        }
    }
}, {
    isClass: true,
    priority: 10101.0015,
    key: "navbtn",
    style: {
        font: {
            fontSize: "10dp"
        },
        color: "#000"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "activityIndicator",
    style: {
        top: 30,
        left: 30,
        width: 60
    }
}, {
    isId: true,
    priority: 100000.0065,
    key: "wrap",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0066,
    key: "playStopBtn",
    style: {
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        backgroundColor: "transparent",
        font: {
            fontSize: "24dp",
            fontFamily: "FontAwesome"
        },
        color: "#000",
        top: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0067,
    key: "time",
    style: {
        font: {
            fontSize: "14dp"
        },
        right: 0,
        width: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0068,
    key: "scrubBar",
    style: {
        top: "40dp",
        width: Ti.UI.FILL,
        height: "30dp",
        min: 0,
        max: 100,
        value: 0
    }
}, {
    isId: true,
    priority: 100101.0005,
    key: "activityIndicator",
    style: {
        left: 30,
        width: 60,
        top: 10
    }
} ];