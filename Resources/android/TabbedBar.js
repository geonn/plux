module.exports = function() {
    function createBar(options) {
        function generateLabels() {
            bar.children && bar.children.length > 0 && bar.children.forEach(function(button) {
                bar.remove(button);
            });
            for (var i = 0; i < barLabels.length; i++) {
                var button = Ti.UI.createButton({
                    bubbleParent: false,
                    title: "undefined" != typeof barLabels[i].image ? "" : "string" == typeof barLabels[i] ? barLabels[i] : barLabels[i].title,
                    backgroundImage: "undefined" != typeof barLabels[i].image ? barLabels[i].image : "",
                    height: "100%",
                    width: "undefined" != typeof barLabels[i].width ? barLabels[i].width : 100 / barLabels.length + "%",
                    left: "undefined" != typeof barLabels[i].width ? barLabels[i].width : 100 / barLabels.length * i + "%",
                    backgroundColor: barBackgroundColor,
                    color: barTextColor,
                    font: barTextFont,
                    borderWidth: barBorderWidth / 2,
                    borderColor: barTintColor,
                    index: i,
                    setTabSelected: function() {
                        this.color = barSelectedTextColor;
                        this.backgroundColor = barTintColor;
                    },
                    setTabDeselected: function() {
                        this.backgroundColor = barBackgroundColor;
                        this.color = barTextColor;
                    }
                });
                "undefined" != typeof barIndex && barIndex > -1 && barIndex == i && button.setTabSelected();
                button.addEventListener("click", function(e) {
                    selectTab(e.source.index);
                });
                bar.add(button);
            }
        }
        function selectTab(index) {
            for (var c = 0; c < bar.children.length; c++) if (bar.children[c].index !== index) bar.children[c].setTabDeselected(); else {
                bar.children[c].setTabSelected();
                barIndex = index;
                bar.fireEvent("click", {
                    index: index
                });
            }
        }
        var barBorderWidth, barTextColor, barSelectedTextColor, barTextFont, barTintColor, barBackgroundColor, barWidth, barHeight, barLabels, barCounter, barIndex;
        barBorderWidth = options.barBorderWidth ? options.barBorderWidth : _toDp(1);
        barSelectedTextColor = options.selectedColor ? options.selectedColor : "#ffffff";
        barTintColor = options.tintColor ? options.tintColor : "#007AFF";
        barTextColor = options.color ? options.color : barTintColor;
        barBackgroundColor = options.backgroundColor ? options.backgroundColor : "transparent";
        barTextFont = options.font ? options.font : {
            fontSize: _toDp(9)
        };
        barWidth = options.width ? options.width : _toDp(200);
        barHeight = options.height ? options.height : _toDp(18);
        barLabels = options.labels;
        barCounter = options.counter;
        barIndex = options.index;
        1 > barBorderWidth && Ti.API.warn("Borders between buttons may not be visible on devices with <= 160 dpi. Consider using a value >= 1");
        var bar = Ti.UI.createView({
            touchEnabled: false,
            height: barHeight,
            width: barWidth,
            borderRadius: _toDp(2.5),
            borderWidth: barBorderWidth,
            borderColor: barTintColor,
            counter: barCounter
        });
        "undefined" != typeof options.top && (bar.top = options.top);
        "undefined" != typeof options.bottom && (bar.bottom = options.bottom);
        "undefined" != typeof options.left && (bar.left = options.left);
        "undefined" != typeof options.right && (bar.right = options.right);
        bar.getLabels = function() {
            return barLabels;
        };
        bar.setLabels = function(labels) {
            barLabels = labels;
            generateLabels();
        };
        Object.defineProperty(bar, "labels", {
            get: bar.getLabels,
            set: bar.setLabels
        });
        bar.setIndex = function(index) {
            barIndex = index;
            selectTab(index);
        };
        bar.getIndex = function() {
            return barIndex;
        };
        Object.defineProperty(bar, "index", {
            get: bar.getIndex,
            set: bar.setIndex
        });
        barLabels && barLabels.length >= 2 && generateLabels();
        return bar;
    }
    function _toDp(pixels) {
        return pixels * (Titanium.Platform.displayCaps.dpi / 160);
    }
    return {
        createTabbedBar: function(options) {
            return createBar(options);
        }
    };
}();