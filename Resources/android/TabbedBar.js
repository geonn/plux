
module.exports = function () {
    switch ("android") {
        case "iPhone OS":
            return {
                createTabbedBar: function (options) {
                    return Ti.UI.iOS.createTabbedBar(options);
                }
            };
            break;
        default:
            return {
                createTabbedBar: function (options) {
                    return createBar(options);
                }
            };
            break;
    }

    function createBar(options) {
        var barBorderWidth, barTextColor, barSelectedTextColor, barTextFont, barTintColor, barBackgroundColor, barWidth, barHeight, barLabels, barCounter, barIndex;

        options.barBorderWidth ? barBorderWidth = options.barBorderWidth : barBorderWidth = _toDp(1);
        options.selectedColor ? barSelectedTextColor = options.selectedColor : barSelectedTextColor = "#6D6D6D";
        options.tintColor ? barTintColor = options.tintColor : barTintColor = "#E4E4E4";
        options.color ? barTextColor = options.color : barTextColor = barTintColor;
        options.backgroundColor ? barBackgroundColor = options.backgroundColor : barBackgroundColor = "transparent";
        options.font ? barTextFont = options.font : barTextFont = {
            fontSize: _toDp(9)
        };
        options.width ? barWidth = options.width : barWidth = _toDp(200);
        options.height ? barHeight = options.height : barHeight = _toDp(18);
        barLabels = options.labels;
        barCounter = options.counter;
        barIndex = options.index;

        if (barBorderWidth < 1) Ti.API.warn("Borders between buttons may not be visible on devices with <= 160 dpi. Consider using a value >= 1");

        var bar = Ti.UI.createView({
            touchEnabled: false,
            height: barHeight,
            width: barWidth,
            borderRadius: _toDp(2.5),
            borderWidth: barBorderWidth,
            borderColor: barTintColor,
            counter: barCounter
        });

        if (typeof options.top !== "undefined") bar.top = options.top;
        if (typeof options.bottom !== "undefined") bar.bottom = options.bottom;
        if (typeof options.left !== "undefined") bar.left = options.left;
        if (typeof options.right !== "undefined") bar.right = options.right;

        function generateLabels() {
            if (bar.children && bar.children.length > 0) {
                bar.children.forEach(function (button) {
                    bar.remove(button);
                });
            }
            for (var i = 0; i < barLabels.length; i++) {
                var button = Ti.UI.createButton({
                    bubbleParent: false,

                    title: typeof barLabels[i].image !== "undefined" ? "" : typeof barLabels[i] == "string" ? barLabels[i] : barLabels[i].title,

                    backgroundImage: typeof barLabels[i].image !== "undefined" ? barLabels[i].image : "",
                    height: "100%",

                    width: typeof barLabels[i].width !== "undefined" ? barLabels[i].width : 100 / barLabels.length + "%",
                    left: typeof barLabels[i].width !== "undefined" ? barLabels[i].width : 100 / barLabels.length * i + "%",
                    backgroundColor: barBackgroundColor,
                    color: barTextColor,
                    font: barTextFont,
                    borderWidth: barBorderWidth / 2,
                    borderColor: barTintColor,
                    index: i,

                    setTabSelected: function () {
                        this.color = barSelectedTextColor;
                        this.backgroundColor = barTintColor;
                    },
                    setTabDeselected: function () {
                        this.backgroundColor = barBackgroundColor;
                        this.color = barTextColor;
                    }
                });

                if (typeof barIndex !== "undefined") {
                    if (barIndex > -1 && barIndex == i) {
                        button.setTabSelected();
                    }
                }

                button.addEventListener("click", function (e) {
                    selectTab(e.source.index);
                });

                bar.add(button);
            }
        }

        bar.getLabels = function () {
            return barLabels;
        };
        bar.setLabels = function (labels) {
            barLabels = labels;
            generateLabels();
        };
        Object.defineProperty(bar, "labels", {
            get: bar.getLabels,
            set: bar.setLabels
        });

        bar.setIndex = function (index) {
            barIndex = index;
            selectTab(index);
        };
        bar.getIndex = function () {
            return barIndex;
        };

        Object.defineProperty(bar, "index", {
            get: bar.getIndex,
            set: bar.setIndex
        });

        if (barLabels && barLabels.length >= 2) {
            generateLabels();
        }

        return bar;

        function selectTab(index) {

            for (var c = 0; c < bar.children.length; c++) {
                if (bar.children[c].index !== index) {
                    bar.children[c].setTabDeselected();
                } else {
                    bar.children[c].setTabSelected();

                    barIndex = index;

                    bar.fireEvent("click", {
                        index: index
                    });
                }
            }
        }
    }

    function _toDp(pixels) {
        return pixels * (Titanium.Platform.displayCaps.dpi / 160);
    }
}();