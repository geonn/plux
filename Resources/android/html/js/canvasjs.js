!function() {
    function extend(Child, Parent) {
        Child.prototype = inherit(Parent.prototype);
        Child.prototype.constructor = Child;
        Child.parent = Parent.prototype;
    }
    function inherit(proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    }
    function addToDateTime(dateTime, num, type) {
        "millisecond" === type ? dateTime.setMilliseconds(dateTime.getMilliseconds() + 1 * num) : "second" === type ? dateTime.setSeconds(dateTime.getSeconds() + 1 * num) : "minute" === type ? dateTime.setMinutes(dateTime.getMinutes() + 1 * num) : "hour" === type ? dateTime.setHours(dateTime.getHours() + 1 * num) : "day" === type ? dateTime.setDate(dateTime.getDate() + 1 * num) : "week" === type ? dateTime.setDate(dateTime.getDate() + 7 * num) : "month" === type ? dateTime.setMonth(dateTime.getMonth() + 1 * num) : "year" === type && dateTime.setFullYear(dateTime.getFullYear() + 1 * num);
        return dateTime;
    }
    function convertToNumber(num, type) {
        return constants[type + "Duration"] * num;
    }
    function pad(value, length) {
        var isNegative = false;
        if (0 > value) {
            isNegative = true;
            value *= -1;
        }
        value = "" + value;
        length = length ? length : 1;
        while (value.length < length) value = "0" + value;
        return isNegative ? "-" + value : value;
    }
    function trimString(str) {
        if (!str) return str;
        str = str.replace(/^\s\s*/, "");
        var ws = /\s/;
        var i = str.length;
        while (ws.test(str.charAt(--i))) ;
        return str.slice(0, i + 1);
    }
    function extendCtx(context) {
        context.roundRect = function(x, y, width, height, radius, borderThickness, backgroundColor, borderColor) {
            backgroundColor && (this.fillStyle = backgroundColor);
            borderColor && (this.strokeStyle = borderColor);
            "undefined" == typeof radius && (radius = 5);
            this.lineWidth = borderThickness;
            this.beginPath();
            this.moveTo(x + radius, y);
            this.lineTo(x + width - radius, y);
            this.quadraticCurveTo(x + width, y, x + width, y + radius);
            this.lineTo(x + width, y + height - radius);
            this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            this.lineTo(x + radius, y + height);
            this.quadraticCurveTo(x, y + height, x, y + height - radius);
            this.lineTo(x, y + radius);
            this.quadraticCurveTo(x, y, x + radius, y);
            this.closePath();
            backgroundColor && this.fill();
            borderColor && borderThickness > 0 && this.stroke();
        };
    }
    function compareNumbers(a, b) {
        return a - b;
    }
    function compareDataPointX(dataPoint1, dataPoint2) {
        return dataPoint1.x - dataPoint2.x;
    }
    function intToHexColorString(num) {
        var r = ((16711680 & num) >> 16).toString(16);
        var g = ((65280 & num) >> 8).toString(16);
        var b = ((255 & num) >> 0).toString(16);
        r = r.length < 2 ? "0" + r : r;
        g = g.length < 2 ? "0" + g : g;
        b = b.length < 2 ? "0" + b : b;
        return "#" + r + g + b;
    }
    function RGBToInt(r, g, b) {
        var num = r << 16 | g << 8 | b;
        return num;
    }
    function getFontHeightInPixels(fontFamily, fontSize, fontWeight) {
        fontWeight = fontWeight || "normal";
        var entry = fontFamily + "_" + fontSize + "_" + fontWeight;
        var height = fontHeightInPixels[entry];
        if (isNaN(height)) {
            try {
                var style = "position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;font-family:" + fontFamily + "; font-size:" + fontSize + "px; font-weight:" + fontWeight + ";";
                if (!textMeasureEl) {
                    var body = document.body;
                    textMeasureEl = document.createElement("span");
                    textMeasureEl.innerHTML = "";
                    var textNode = document.createTextNode("Mpgyi");
                    textMeasureEl.appendChild(textNode);
                    body.appendChild(textMeasureEl);
                }
                textMeasureEl.style.display = "";
                textMeasureEl.setAttribute("style", style);
                height = Math.round(textMeasureEl.offsetHeight);
                textMeasureEl.style.display = "none";
            } catch (e) {
                height = Math.ceil(1.1 * fontSize);
            }
            height = Math.max(height, fontSize);
            fontHeightInPixels[entry] = height;
        }
        return height;
    }
    function addEvent(obj, eventType, fn, useCapture) {
        if (obj.addEventListener) obj.addEventListener(eventType, fn, useCapture || false); else {
            if (!obj.attachEvent) return false;
            obj.attachEvent("on" + eventType, function(e) {
                e = e || window.event;
                e.preventDefault = e.preventDefault || function() {
                    e.returnValue = false;
                };
                e.stopPropagation = e.stopPropagation || function() {
                    e.cancelBubble = true;
                };
                fn.call(obj, e);
            });
        }
    }
    function getObjectId(x, y, ctx) {
        x *= devicePixelBackingStoreRatio;
        y *= devicePixelBackingStoreRatio;
        var pixels = ctx.getImageData(x, y, 2, 2).data;
        var isObject = true;
        for (var i = 0; 4 > i; i++) if (pixels[i] !== pixels[i + 4] | pixels[i] !== pixels[i + 8] | pixels[i] !== pixels[i + 12]) {
            isObject = false;
            break;
        }
        return isObject ? RGBToInt(pixels[0], pixels[1], pixels[2]) : 0;
    }
    function getFontString(prefix, object, fallbackObject) {
        var fontString = "";
        var fontStyleString = prefix ? prefix + "FontStyle" : "fontStyle";
        var fontWeightString = prefix ? prefix + "FontWeight" : "fontWeight";
        var fontSizeString = prefix ? prefix + "FontSize" : "fontSize";
        var fontFamilyString = prefix ? prefix + "FontFamily" : "fontFamily";
        fontString += object[fontStyleString] ? object[fontStyleString] + " " : fallbackObject && fallbackObject[fontStyleString] ? fallbackObject[fontStyleString] + " " : "";
        fontString += object[fontWeightString] ? object[fontWeightString] + " " : fallbackObject && fallbackObject[fontWeightString] ? fallbackObject[fontWeightString] + " " : "";
        fontString += object[fontSizeString] ? object[fontSizeString] + "px " : fallbackObject && fallbackObject[fontSizeString] ? fallbackObject[fontSizeString] + "px " : "";
        var fontFamily = object[fontFamilyString] ? object[fontFamilyString] + "" : fallbackObject && fallbackObject[fontFamilyString] ? fallbackObject[fontFamilyString] + "" : "";
        if (!isCanvasSupported && fontFamily) {
            var firstFontFamily = fontFamily.split(",")[0];
            "'" !== firstFontFamily[0] && '"' !== firstFontFamily[0] && (firstFontFamily = "'" + firstFontFamily + "'");
            fontString += firstFontFamily;
        } else fontString += fontFamily;
        return fontString;
    }
    function getProperty(propertyName, object, fallbackObject) {
        var value = propertyName in object ? object[propertyName] : fallbackObject[propertyName];
        return value;
    }
    function setCanvasSize(canvas, width, height) {
        if (isCanvasSupported && !!optimizeForHiDPI) {
            var ctx = canvas.getContext("2d");
            backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
            devicePixelBackingStoreRatio = devicePixelRatio / backingStoreRatio;
            canvas.width = width * devicePixelBackingStoreRatio;
            canvas.height = height * devicePixelBackingStoreRatio;
            if (devicePixelRatio !== backingStoreRatio) {
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                ctx.scale(devicePixelBackingStoreRatio, devicePixelBackingStoreRatio);
            }
        } else {
            canvas.width = width;
            canvas.height = height;
        }
    }
    function createCanvas(width, height) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("class", "canvasjs-chart-canvas");
        setCanvasSize(canvas, width, height);
        isCanvasSupported || "undefined" == typeof G_vmlCanvasManager || G_vmlCanvasManager.initElement(canvas);
        return canvas;
    }
    function exportCanvas(canvas, format, fileName) {
        if (!canvas || !format || !fileName) return;
        var fullFileName = fileName + "." + ("jpeg" === format ? "jpg" : format);
        var mimeType = "image/" + format;
        var img = canvas.toDataURL(mimeType);
        var saved = false;
        var downloadLink = document.createElement("a");
        downloadLink.download = fullFileName;
        downloadLink.href = img;
        downloadLink.target = "_blank";
        if ("undefined" != typeof Blob && !!new Blob()) {
            var imgData = img.replace(/^data:[a-z/]*;base64,/, "");
            var byteString = atob(imgData);
            var buffer = new ArrayBuffer(byteString.length);
            var intArray = new Uint8Array(buffer);
            for (var i = 0; i < byteString.length; i++) intArray[i] = byteString.charCodeAt(i);
            var blob = new Blob([ buffer ], {
                type: "image/" + format
            });
            try {
                window.navigator.msSaveBlob(blob, fullFileName);
                saved = true;
            } catch (e) {
                downloadLink.dataset.downloadurl = [ mimeType, downloadLink.download, downloadLink.href ].join(":");
                downloadLink.href = window.URL.createObjectURL(blob);
            }
        }
        if (!saved) try {
            event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            downloadLink.dispatchEvent ? downloadLink.dispatchEvent(event) : downloadLink.fireEvent && downloadLink.fireEvent("onclick");
        } catch (e) {
            var win = window.open();
            win.document.write("<img src='" + img + "'></img><div>Please right click on the image and save it to your device</div>");
            win.document.close();
        }
    }
    function setButtonState(chart, button, state) {
        if (button.getAttribute("state") !== state) {
            button.setAttribute("state", state);
            button.setAttribute("type", "button");
            button.style.position = "relative";
            button.style.margin = "0px 0px 0px 0px";
            button.style.padding = "3px 4px 0px 4px";
            button.style.cssFloat = "left";
            button.setAttribute("title", chart._cultureInfo[state + "Text"]);
            button.innerHTML = "<img style='height:16px;' src='" + base64Images[state].image + "' alt='" + chart._cultureInfo[state + "Text"] + "' />";
        }
    }
    function show() {
        var element = null;
        for (var i = 0; i < arguments.length; i++) {
            element = arguments[i];
            element.style && (element.style.display = "inline");
        }
    }
    function hide() {
        var element = null;
        for (var i = 0; i < arguments.length; i++) {
            element = arguments[i];
            element && element.style && (element.style.display = "none");
        }
    }
    function CanvasJSObject(defaultsKey, options, theme) {
        this._defaultsKey = defaultsKey;
        var currentThemeOptions = {};
        theme && themes[theme] && themes[theme][defaultsKey] && (currentThemeOptions = themes[theme][defaultsKey]);
        this._options = options ? options : {};
        this.setOptions(this._options, currentThemeOptions);
    }
    function Chart(containerId, options, publicChartReference) {
        this._publicChartReference = publicChartReference;
        options = options || {};
        Chart.parent.constructor.call(this, "Chart", options, options.theme ? options.theme : "theme1");
        var _this = this;
        this._containerId = containerId;
        this._objectsInitialized = false;
        this.ctx = null;
        this.overlaidCanvasCtx = null;
        this._indexLabels = [];
        this._panTimerId = 0;
        this._lastTouchEventType = "";
        this._lastTouchData = null;
        this.isAnimating = false;
        this.renderCount = 0;
        this.animatedRender = false;
        this.disableToolTip = false;
        this.panEnabled = false;
        this._defaultCursor = "default";
        this.plotArea = {
            canvas: null,
            ctx: null,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            width: 0,
            height: 0
        };
        this._dataInRenderedOrder = [];
        this._container = "string" == typeof this._containerId ? document.getElementById(this._containerId) : this._containerId;
        if (!this._container) {
            window.console && window.console.log('CanvasJS Error: Chart Container with id "' + this._containerId + '" was not found');
            return;
        }
        this._container.innerHTML = "";
        var width = 0;
        var height = 0;
        width = this._options.width ? this.width : this._container.clientWidth > 0 ? this._container.clientWidth : this.width;
        height = this._options.height ? this.height : this._container.clientHeight > 0 ? this._container.clientHeight : this.height;
        this.width = width;
        this.height = height;
        this._selectedColorSet = "undefined" != typeof colorSets[this.colorSet] ? colorSets[this.colorSet] : colorSets["colorSet1"];
        this._canvasJSContainer = document.createElement("div");
        this._canvasJSContainer.setAttribute("class", "canvasjs-chart-container");
        this._canvasJSContainer.style.position = "relative";
        this._canvasJSContainer.style.textAlign = "left";
        this._canvasJSContainer.style.cursor = "auto";
        isCanvasSupported || (this._canvasJSContainer.style.height = "0px");
        this._container.appendChild(this._canvasJSContainer);
        this.canvas = createCanvas(width, height);
        this.canvas.style.position = "absolute";
        if (!this.canvas.getContext) return;
        this._canvasJSContainer.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.textBaseline = "top";
        extendCtx(this.ctx);
        if (isCanvasSupported) this.plotArea.ctx = this.ctx; else {
            this.plotArea.canvas = createCanvas(width, height);
            this.plotArea.canvas.style.position = "absolute";
            this.plotArea.canvas.setAttribute("class", "plotAreaCanvas");
            this._canvasJSContainer.appendChild(this.plotArea.canvas);
            this.plotArea.ctx = this.plotArea.canvas.getContext("2d");
        }
        this.overlaidCanvas = createCanvas(width, height);
        this.overlaidCanvas.style.position = "absolute";
        this._canvasJSContainer.appendChild(this.overlaidCanvas);
        this.overlaidCanvasCtx = this.overlaidCanvas.getContext("2d");
        this.overlaidCanvasCtx.textBaseline = "top";
        this._eventManager = new EventManager(this);
        addEvent(window, "resize", function() {
            _this._updateSize() && _this.render();
        });
        this._toolBar = document.createElement("div");
        this._toolBar.setAttribute("class", "canvasjs-chart-toolbar");
        this._toolBar.style.cssText = "position: absolute; right: 2px; top: 0px;";
        this._canvasJSContainer.appendChild(this._toolBar);
        this.bounds = {
            x1: 0,
            y1: 0,
            x2: this.width,
            y2: this.height
        };
        addEvent(this.overlaidCanvas, "click", function(e) {
            _this._mouseEventHandler(e);
        });
        addEvent(this.overlaidCanvas, "mousemove", function(e) {
            _this._mouseEventHandler(e);
        });
        addEvent(this.overlaidCanvas, "mouseup", function(e) {
            _this._mouseEventHandler(e);
        });
        addEvent(this.overlaidCanvas, "mousedown", function(e) {
            _this._mouseEventHandler(e);
            hide(_this._dropdownMenu);
        });
        addEvent(this.overlaidCanvas, "mouseout", function(e) {
            _this._mouseEventHandler(e);
        });
        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", function(e) {
            _this._touchEventHandler(e);
        });
        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove", function(e) {
            _this._touchEventHandler(e);
        });
        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend", function(e) {
            _this._touchEventHandler(e);
        });
        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerCancel" : "touchcancel", function(e) {
            _this._touchEventHandler(e);
        });
        if (!this._creditLink) {
            this._creditLink = document.createElement("a");
            this._creditLink.setAttribute("class", "canvasjs-chart-credit");
            this._creditLink.setAttribute("style", "outline:none;margin:0px;position:absolute;right:3px;top:" + (this.height - 14) + "px;color:dimgrey;text-decoration:none;font-size:10px;font-family:Lucida Grande, Lucida Sans Unicode, Arial, sans-serif");
            this._creditLink.setAttribute("tabIndex", -1);
            this._creditLink.setAttribute("target", "_blank");
        }
        this._toolTip = new ToolTip(this, this._options.toolTip, this.theme);
        this.layoutManager = new LayoutManager(this);
        this.data = null;
        this.axisX = null;
        this.axisY = null;
        this.axisY2 = null;
        this.sessionVariables = {
            axisX: {
                internalMinimum: null,
                internalMaximum: null
            },
            axisY: {
                internalMinimum: null,
                internalMaximum: null
            },
            axisY2: {
                internalMinimum: null,
                internalMaximum: null
            }
        };
    }
    function getBezierPoints(points, tension) {
        var bezierPoints = [];
        for (var i = 0; i < points.length; i++) {
            if (0 == i) {
                bezierPoints.push(points[0]);
                continue;
            }
            var i1, i2, pointIndex;
            pointIndex = i - 1;
            i1 = 0 === pointIndex ? 0 : pointIndex - 1;
            i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;
            var drv1 = {
                x: (points[i2].x - points[i1].x) / tension,
                y: (points[i2].y - points[i1].y) / tension
            };
            var cp1 = {
                x: points[pointIndex].x + drv1.x / 3,
                y: points[pointIndex].y + drv1.y / 3
            };
            bezierPoints[bezierPoints.length] = cp1;
            pointIndex = i;
            i1 = 0 === pointIndex ? 0 : pointIndex - 1;
            i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;
            var drv2 = {
                x: (points[i2].x - points[i1].x) / tension,
                y: (points[i2].y - points[i1].y) / tension
            };
            var cp2 = {
                x: points[pointIndex].x - drv2.x / 3,
                y: points[pointIndex].y - drv2.y / 3
            };
            bezierPoints[bezierPoints.length] = cp2;
            bezierPoints[bezierPoints.length] = points[i];
        }
        return bezierPoints;
    }
    function LayoutManager(chart) {
        this._topOccupied = 0;
        this._bottomOccupied = 0;
        this._leftOccupied = 0;
        this._rightOccupied = 0;
        this.chart = chart;
    }
    function TextBlock(ctx, options) {
        TextBlock.parent.constructor.call(this, "TextBlock", options);
        this.ctx = ctx;
        this._isDirty = true;
        this._wrappedText = null;
        this._lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);
    }
    function Title(chart, options) {
        Title.parent.constructor.call(this, "Title", options, chart.theme);
        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
        "undefined" == typeof this._options.fontSize && (this.fontSize = this.chart.getAutoFontSize(this.fontSize));
        this.width = null, this.height = null;
        this.bounds = {
            x1: null,
            y1: null,
            x2: null,
            y2: null
        };
    }
    function Legend(chart, options, theme) {
        Legend.parent.constructor.call(this, "Legend", options, theme);
        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
        this.ghostCtx = this.chart._eventManager.ghostCtx;
        this.items = [];
        this.width = 0, this.height = 0, this.orientation = null, this.horizontalSpacing = 10;
        this.dataSeries = [];
        this.bounds = {
            x1: null,
            y1: null,
            x2: null,
            y2: null
        };
        "undefined" == typeof this._options.fontSize && (this.fontSize = this.chart.getAutoFontSize(this.fontSize));
        this.lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);
    }
    function PlotArea(chart, options) {
        PlotArea.parent.constructor.call(this, options);
        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
    }
    function DataSeries(chart, options, theme, index, id) {
        DataSeries.parent.constructor.call(this, "DataSeries", options, theme);
        this.chart = chart;
        this.canvas = chart.canvas;
        this._ctx = chart.canvas.ctx;
        this.index = index;
        this.noDataPointsInPlotArea = 0;
        this.id = id;
        this.chart._eventManager.objectMap[id] = {
            id: id,
            objectType: "dataSeries",
            dataSeriesIndex: index
        };
        this.dataPointIds = [];
        this.plotUnit = [];
        this.axisX = null;
        this.axisY = null;
        null === this.fillOpacity && (this.fillOpacity = this.type.match(/area/i) ? .7 : 1);
        this.axisPlacement = this.getDefaultAxisPlacement();
        "undefined" == typeof this._options.indexLabelFontSize && (this.indexLabelFontSize = this.chart.getAutoFontSize(this.indexLabelFontSize));
    }
    function Axis(chart, options, type, position) {
        Axis.parent.constructor.call(this, "Axis", options, chart.theme);
        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = chart.ctx;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.intervalstartTimePercent = 0;
        this.labels = [];
        this._labels = null;
        this.dataInfo = {
            min: 1/0,
            max: -1/0,
            viewPortMin: 1/0,
            viewPortMax: -1/0,
            minDiff: 1/0
        };
        if ("axisX" === type) {
            this.sessionVariables = this.chart.sessionVariables[type];
            this._options.interval || (this.intervalType = null);
        } else this.sessionVariables = "left" === position || "top" === position ? this.chart.sessionVariables["axisY"] : this.chart.sessionVariables["axisY2"];
        "undefined" == typeof this._options.titleFontSize && (this.titleFontSize = this.chart.getAutoFontSize(this.titleFontSize));
        "undefined" == typeof this._options.labelFontSize && (this.labelFontSize = this.chart.getAutoFontSize(this.labelFontSize));
        this.type = type;
        "axisX" !== type || options && "undefined" != typeof options.gridThickness || (this.gridThickness = 0);
        this._position = position;
        this.lineCoordinates = {
            x1: null,
            y1: null,
            x2: null,
            y2: null,
            width: null
        };
        this.labelAngle = (this.labelAngle % 360 + 360) % 360;
        this.labelAngle > 90 && this.labelAngle <= 270 ? this.labelAngle -= 180 : this.labelAngle > 180 && this.labelAngle <= 270 ? this.labelAngle -= 180 : this.labelAngle > 270 && this.labelAngle <= 360 && (this.labelAngle -= 360);
        if (this._options.stripLines && this._options.stripLines.length > 0) {
            this.stripLines = [];
            for (var i = 0; i < this._options.stripLines.length; i++) this.stripLines.push(new StripLine(this.chart, this._options.stripLines[i], chart.theme, ++this.chart._eventManager.lastObjectId));
        }
        this._titleTextBlock = null;
        this._absoluteMinimum = null;
        this._absoluteMaximum = null;
        this.hasOptionChanged("minimum") && (this.sessionVariables.internalMinimum = this.minimum);
        this.hasOptionChanged("maximum") && (this.sessionVariables.internalMaximum = this.maximum);
        this.trackChanges("minimum");
        this.trackChanges("maximum");
    }
    function StripLine(chart, options, theme, id) {
        StripLine.parent.constructor.call(this, "StripLine", options, theme);
        this._thicknessType = "pixel";
        this.id = id;
        if (null !== this.startValue && null !== this.endValue) {
            this.value = ((this.startValue.getTime ? this.startValue.getTime() : this.startValue) + (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) / 2;
            this.thickness = Math.max(this.endValue - this.startValue);
            this._thicknessType = "value";
        }
    }
    function ToolTip(chart, options, theme) {
        ToolTip.parent.constructor.call(this, "ToolTip", options, theme);
        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
        this.currentSeriesIndex = -1;
        this.currentDataPointIndex = -1;
        this._timerId = 0;
        this._prevX = 0/0;
        this._prevY = 0/0;
        this._initialize();
    }
    function EventManager(chart) {
        this.chart = chart;
        this.lastObjectId = 0;
        this.objectMap = [];
        this.rectangularRegionEventSubscriptions = [];
        this.previousDataPointEventObject = null;
        this.ghostCanvas = createCanvas(this.chart.width, this.chart.height);
        this.ghostCtx = this.ghostCanvas.getContext("2d");
        this.mouseoveredObjectMaps = [];
    }
    function CultureInfo(chart, culture) {
        var cultureInfo;
        culture && cultures[culture] && (cultureInfo = cultures[culture]);
        Title.parent.constructor.call(this, "CultureInfo", cultureInfo, chart.theme);
        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
    }
    function Animator(chart) {
        this.chart = chart;
        this.ctx = this.chart.plotArea.ctx;
        this.animations = [];
        this.animationRequestId = null;
    }
    var isDebugMode = false;
    var isCanvasSupported = !!document.createElement("canvas").getContext;
    var defaultOptions = {
        Chart: {
            width: 500,
            height: 400,
            zoomEnabled: false,
            backgroundColor: "#FFFFFF",
            theme: "theme1",
            animationEnabled: false,
            animationDuration: 1200,
            colorSet: "colorSet1",
            culture: "en",
            creditText: "",
            interactivityEnabled: true,
            exportEnabled: false,
            exportFileName: "Chart"
        },
        Title: {
            padding: 0,
            text: null,
            verticalAlign: "top",
            horizontalAlign: "left",
            fontSize: 20,
            fontFamily: "Arial",
            fontWeight: "normal",
            fontColor: "#000000",
            fontStyle: "normal",
            borderThickness: 0,
            borderColor: "black",
            cornerRadius: 0,
            backgroundColor: null,
            margin: 5
        },
        Legend: {
            name: null,
            verticalAlign: "center",
            horizontalAlign: "right",
            fontSize: 14,
            fontFamily: "calibri",
            fontWeight: "normal",
            fontColor: "black",
            fontStyle: "normal",
            cursor: null,
            itemmouseover: null,
            itemmouseout: null,
            itemmousemove: null,
            itemclick: null
        },
        ToolTip: {
            enabled: true,
            borderColor: null,
            shared: false,
            animationEnabled: true,
            content: null
        },
        Axis: {
            minimum: null,
            maximum: null,
            interval: null,
            intervalType: null,
            title: null,
            titleFontColor: "black",
            titleFontSize: 20,
            titleFontFamily: "arial",
            titleFontWeight: "normal",
            titleFontStyle: "normal",
            labelAngle: 0,
            labelFontFamily: "arial",
            labelFontColor: "black",
            labelFontSize: 12,
            labelFontWeight: "normal",
            labelFontStyle: "normal",
            labelAutoFit: false,
            labelWrap: true,
            labelMaxWidth: null,
            prefix: "",
            suffix: "",
            includeZero: true,
            tickLength: 5,
            tickColor: "black",
            tickThickness: 1,
            lineColor: "black",
            lineThickness: 1,
            gridColor: "A0A0A0",
            gridThickness: 0,
            interlacedColor: null,
            valueFormatString: null,
            margin: 2,
            stripLines: []
        },
        StripLine: {
            value: null,
            startValue: null,
            endValue: null,
            color: "orange",
            thickness: 2,
            label: "",
            labelBackgroundColor: "#EEEEEE",
            labelFontFamily: "arial",
            labelFontColor: "orange",
            labelFontSize: 12,
            labelFontWeight: "normal",
            labelFontStyle: "normal"
        },
        DataSeries: {
            name: null,
            dataPoints: null,
            label: "",
            bevelEnabled: false,
            cursor: null,
            indexLabel: "",
            indexLabelPlacement: "auto",
            indexLabelOrientation: "horizontal",
            indexLabelFontColor: "black",
            indexLabelFontSize: 12,
            indexLabelFontStyle: "normal",
            indexLabelFontFamily: "Arial",
            indexLabelFontWeight: "normal",
            indexLabelBackgroundColor: null,
            indexLabelLineColor: null,
            indexLabelLineThickness: 1,
            indexLabelMaxWidth: null,
            indexLabelWrap: true,
            lineThickness: 2,
            color: null,
            risingColor: "white",
            fillOpacity: null,
            startAngle: 0,
            type: "column",
            xValueType: "number",
            axisYType: "primary",
            xValueFormatString: null,
            yValueFormatString: null,
            zValueFormatString: null,
            percentFormatString: null,
            showInLegend: null,
            legendMarkerType: null,
            legendMarkerColor: null,
            legendText: null,
            markerType: "circle",
            markerColor: null,
            markerSize: null,
            markerBorderColor: null,
            markerBorderThickness: null,
            mouseover: null,
            mouseout: null,
            mousemove: null,
            click: null,
            toolTipContent: null,
            visible: true
        },
        CultureInfo: {
            decimalSeparator: ".",
            digitGroupSeparator: ",",
            zoomText: "Zoom",
            panText: "Pan",
            resetText: "Reset",
            menuText: "More Options",
            saveJPGText: "Save as JPG",
            savePNGText: "Save as PNG",
            days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            shortDays: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            shortMonths: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        },
        TextBlock: {
            x: 0,
            y: 0,
            width: null,
            height: null,
            maxWidth: null,
            maxHeight: null,
            padding: 0,
            angle: 0,
            text: "",
            horizontalAlign: "center",
            fontSize: 12,
            fontFamily: "calibri",
            fontWeight: "normal",
            fontColor: "black",
            fontStyle: "normal",
            borderThickness: 0,
            borderColor: "black",
            cornerRadius: 0,
            backgroundColor: null,
            textBaseline: "top"
        }
    };
    var cultures = {
        en: {}
    };
    var colorSets = {
        colorSet1: [ "#FC7474", "#C24642", "#7F6084", "#86B402", "#A2D1CF", "#C8B631", "#6DBCEB", "#52514E", "#4F81BC", "#A064A1", "#F79647" ],
        colorSet2: [ "#4F81BC", "#C0504E", "#9BBB58", "#23BFAA", "#8064A1", "#4AACC5", "#F79647", "#33558B" ],
        colorSet3: [ "#8CA1BC", "#36845C", "#017E82", "#8CB9D0", "#708C98", "#94838D", "#F08891", "#0366A7", "#008276", "#EE7757", "#E5BA3A", "#F2990B", "#03557B", "#782970" ]
    };
    var themes = {
        theme1: {
            Chart: {
                colorSet: "colorSet1"
            },
            Title: {
                fontFamily: isCanvasSupported ? "Arial,Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "arial",
                fontSize: 33,
                fontColor: "#000000",
                fontWeight: "bold",
                verticalAlign: "top",
                margin: 10
            },
            Axis: {
                titleFontSize: 26,
                titleFontColor: "#666666",
                titleFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
                labelFontFamily: isCanvasSupported ? "Arial,Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "arial",
                labelFontSize: 18,
                labelFontColor: "#CE1D1C",
                tickColor: "#BBBBBB",
                tickThickness: 1,
                gridThickness: 1,
                gridColor: "#BBBBBB",
                lineThickness: 1,
                lineColor: "transparent"
            },
            Legend: {
                verticalAlign: "bottom",
                horizontalAlign: "center",
                fontFamily: isCanvasSupported ? "arial,monospace, sans-serif,arial black" : "arial"
            },
            DataSeries: {
                indexLabelFontColor: "grey",
                indexLabelFontFamily: isCanvasSupported ? "Arial,Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "arial",
                indexLabelFontSize: 18,
                indexLabelLineThickness: 1
            }
        },
        theme2: {
            Chart: {
                colorSet: "colorSet2"
            },
            Title: {
                fontFamily: "impact, charcoal, arial black, sans-serif",
                fontSize: 32,
                fontColor: "#333333",
                verticalAlign: "top",
                margin: 10
            },
            Axis: {
                titleFontSize: 22,
                titleFontColor: "rgb(98,98,98)",
                titleFontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "arial",
                titleFontWeight: "bold",
                labelFontFamily: isCanvasSupported ? "monospace, Courier New, Courier" : "arial",
                labelFontSize: 16,
                labelFontColor: "grey",
                labelFontWeight: "bold",
                tickColor: "grey",
                tickThickness: 2,
                gridThickness: 2,
                gridColor: "grey",
                lineThickness: 0
            },
            Legend: {
                verticalAlign: "bottom",
                horizontalAlign: "center",
                fontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "arial"
            },
            DataSeries: {
                indexLabelFontColor: "grey",
                indexLabelFontFamily: isCanvasSupported ? "Courier New, Courier, monospace" : "arial",
                indexLabelFontWeight: "bold",
                indexLabelFontSize: 18,
                indexLabelLineThickness: 1
            }
        },
        theme3: {
            Chart: {
                colorSet: "colorSet1"
            },
            Title: {
                fontFamily: isCanvasSupported ? "Arial,Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif" : "arial",
                fontSize: 32,
                fontColor: "#3A3A3A",
                fontWeight: "bold",
                verticalAlign: "top",
                margin: 10
            },
            Axis: {
                titleFontSize: 22,
                titleFontColor: "#CE1D1C",
                titleFontFamily: isCanvasSupported ? "Arial,Verdana, Geneva, Calibri, sans-serif" : "arial",
                labelFontFamily: isCanvasSupported ? "Arial,Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "arial",
                labelFontSize: 18,
                labelFontColor: "grey",
                tickColor: "grey",
                tickThickness: 2,
                gridThickness: 2,
                gridColor: "grey",
                lineThickness: 2,
                lineColor: "grey"
            },
            Legend: {
                verticalAlign: "bottom",
                horizontalAlign: "center",
                fontFamily: isCanvasSupported ? "Arial,monospace, sans-serif,arial black" : "arial"
            },
            DataSeries: {
                bevelEnabled: true,
                indexLabelFontColor: "grey",
                indexLabelFontFamily: isCanvasSupported ? "Arial,Candara, Optima, Calibri, Verdana, Geneva, sans-serif" : "arial",
                indexLabelFontSize: 18,
                indexLabelLineColor: "lightgrey",
                indexLabelLineThickness: 2
            }
        }
    };
    var constants = {
        numberDuration: 1,
        yearDuration: 314496e5,
        monthDuration: 2592e6,
        weekDuration: 6048e5,
        dayDuration: 864e5,
        hourDuration: 36e5,
        minuteDuration: 6e4,
        secondDuration: 1e3,
        millisecondDuration: 1,
        dayOfWeekFromInt: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
    };
    var fontHeightInPixels = {};
    var textMeasureEl = null;
    var dateFormat = function() {
        var reg = /D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g;
        var defDays = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
        var defShortDays = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
        var defMonths = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var defShortMonths = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var timezoneClip = /[^-+\dA-Z]/g;
        return function(dt, formatString, cultureInfo) {
            var days = cultureInfo ? cultureInfo.days : defDays;
            var months = cultureInfo ? cultureInfo.months : defMonths;
            var shortDays = cultureInfo ? cultureInfo.shortDays : defShortDays;
            var shortMonths = cultureInfo ? cultureInfo.shortMonths : defShortMonths;
            var result = "";
            var utc = false;
            dt = dt && dt.getTime ? dt : dt ? new Date(dt) : new Date();
            if (isNaN(dt)) throw SyntaxError("invalid date");
            if ("UTC:" === formatString.slice(0, 4)) {
                formatString = formatString.slice(4);
                utc = true;
            }
            var pre = utc ? "getUTC" : "get";
            var date = dt[pre + "Date"]();
            var day = dt[pre + "Day"]();
            var month = dt[pre + "Month"]();
            var year = dt[pre + "FullYear"]();
            var hours = dt[pre + "Hours"]();
            var minutes = dt[pre + "Minutes"]();
            var seconds = dt[pre + "Seconds"]();
            var milliseconds = dt[pre + "Milliseconds"]();
            var offset = utc ? 0 : dt.getTimezoneOffset();
            result = formatString.replace(reg, function(key) {
                switch (key) {
                  case "D":
                    return date;

                  case "DD":
                    return pad(date, 2);

                  case "DDD":
                    return shortDays[day];

                  case "DDDD":
                    return days[day];

                  case "M":
                    return month + 1;

                  case "MM":
                    return pad(month + 1, 2);

                  case "MMM":
                    return shortMonths[month];

                  case "MMMM":
                    return months[month];

                  case "Y":
                    return parseInt(String(year).slice(-2));

                  case "YY":
                    return pad(String(year).slice(-2), 2);

                  case "YYY":
                    return pad(String(year).slice(-3), 3);

                  case "YYYY":
                    return pad(year, 4);

                  case "h":
                    return hours % 12 || 12;

                  case "hh":
                    return pad(hours % 12 || 12, 2);

                  case "H":
                    return hours;

                  case "HH":
                    return pad(hours, 2);

                  case "m":
                    return minutes;

                  case "mm":
                    return pad(minutes, 2);

                  case "s":
                    return seconds;

                  case "ss":
                    return pad(seconds, 2);

                  case "f":
                    return String(milliseconds).slice(0, 1);

                  case "ff":
                    return pad(String(milliseconds).slice(0, 2), 2);

                  case "fff":
                    return pad(String(milliseconds).slice(0, 3), 3);

                  case "t":
                    return 12 > hours ? "a" : "p";

                  case "tt":
                    return 12 > hours ? "am" : "pm";

                  case "T":
                    return 12 > hours ? "A" : "P";

                  case "TT":
                    return 12 > hours ? "AM" : "PM";

                  case "K":
                    return utc ? "UTC" : (String(dt).match(timezone) || [ "" ]).pop().replace(timezoneClip, "");

                  case "z":
                    return (offset > 0 ? "-" : "+") + Math.floor(Math.abs(offset) / 60);

                  case "zz":
                    return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2);

                  case "zzz":
                    return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2) + pad(Math.abs(offset) % 60, 2);

                  default:
                    return key.slice(1, key.length - 1);
                }
            });
            return result;
        };
    }();
    var numberFormat = function(v, fs, cultureInfo) {
        if (null === v) return "";
        v = Number(v);
        var isNegative = 0 > v ? true : false;
        isNegative && (v *= -1);
        var decimalSeparator = cultureInfo ? cultureInfo.decimalSeparator : ".";
        var digitGroupSeparator = cultureInfo ? cultureInfo.digitGroupSeparator : ",";
        var vString = "";
        fs = String(fs);
        var multiplier = 1;
        var result = "";
        var matches = "";
        var decimalPosition = -1;
        var fsBeforeDecimal = [];
        var fsAfterDecimal = [];
        var noPhBeforeDecimal = 0;
        var noPhAfterDecimal = 0;
        var noComma = 0;
        var isScientificNotation = false;
        var exponent = 0;
        matches = fs.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|‰|./g);
        var match = null;
        for (var i = 0; matches && i < matches.length; i++) {
            match = matches[i];
            if ("." === match && 0 > decimalPosition) {
                decimalPosition = i;
                continue;
            }
            if ("%" === match) multiplier *= 100; else {
                if ("‰" === match) {
                    multiplier *= 1e3;
                    continue;
                }
                if ("," === match[0] && "." === match[match.length - 1]) {
                    multiplier /= Math.pow(1e3, match.length - 1);
                    decimalPosition = i + match.length - 1;
                    continue;
                }
                "E" !== match[0] && "e" !== match[0] || "0" !== match[match.length - 1] || (isScientificNotation = true);
            }
            if (0 > decimalPosition) {
                fsBeforeDecimal.push(match);
                "#" === match || "0" === match ? noPhBeforeDecimal++ : "," === match && noComma++;
            } else {
                fsAfterDecimal.push(match);
                ("#" === match || "0" === match) && noPhAfterDecimal++;
            }
        }
        if (isScientificNotation) {
            var integer = Math.floor(v);
            exponent = (0 === integer ? "" : String(integer)).length - noPhBeforeDecimal;
            multiplier /= Math.pow(10, exponent);
        }
        v *= multiplier;
        0 > decimalPosition && (decimalPosition = i);
        vString = v.toFixed(noPhAfterDecimal);
        var split = vString.split(".");
        var vStringBeforeDecimal = (split[0] + "").split("");
        var vStringAfterDecimal = (split[1] + "").split("");
        vStringBeforeDecimal && "0" === vStringBeforeDecimal[0] && vStringBeforeDecimal.shift();
        var noPhProcessed = 0;
        var noDigitsAdded = 0;
        var noCommaAdded = 0;
        var commaDistance = 0;
        var distanceFromLastComma = 0;
        while (fsBeforeDecimal.length > 0) {
            match = fsBeforeDecimal.pop();
            if ("#" === match || "0" === match) {
                noPhProcessed++;
                if (noPhProcessed === noPhBeforeDecimal) {
                    var digits = vStringBeforeDecimal;
                    vStringBeforeDecimal = [];
                    if ("0" === match) {
                        var toPad = noPhBeforeDecimal - noDigitsAdded - (digits ? digits.length : 0);
                        while (toPad > 0) {
                            digits.unshift("0");
                            toPad--;
                        }
                    }
                    while (digits.length > 0) {
                        result = digits.pop() + result;
                        distanceFromLastComma++;
                        distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && digits.length > 0 && (result = digitGroupSeparator + result);
                    }
                    isNegative && (result = "-" + result);
                } else {
                    if (vStringBeforeDecimal.length > 0) {
                        result = vStringBeforeDecimal.pop() + result;
                        noDigitsAdded++;
                        distanceFromLastComma++;
                    } else if ("0" === match) {
                        result = "0" + result;
                        noDigitsAdded++;
                        distanceFromLastComma++;
                    }
                    distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && vStringBeforeDecimal.length > 0 && (result = digitGroupSeparator + result);
                }
            } else if ("E" !== match[0] && "e" !== match[0] || "0" !== match[match.length - 1] || !/[eE][+-]*[0]+/.test(match)) if ("," === match) {
                noCommaAdded++;
                commaDistance = distanceFromLastComma;
                distanceFromLastComma = 0;
                vStringBeforeDecimal.length > 0 && (result = digitGroupSeparator + result);
            } else result = match.length > 1 && ('"' === match[0] && '"' === match[match.length - 1] || "'" === match[0] && "'" === match[match.length - 1]) ? match.slice(1, match.length - 1) + result : match + result; else {
                match = 0 > exponent ? match.replace("+", "").replace("-", "") : match.replace("-", "");
                result += match.replace(/[0]+/, function($0) {
                    return pad(exponent, $0.length);
                });
            }
        }
        var resultAfterDecimal = "";
        var addDecimalSeparator = false;
        while (fsAfterDecimal.length > 0) {
            match = fsAfterDecimal.shift();
            if ("#" === match || "0" === match) {
                if (vStringAfterDecimal.length > 0 && 0 !== Number(vStringAfterDecimal.join(""))) {
                    resultAfterDecimal += vStringAfterDecimal.shift();
                    addDecimalSeparator = true;
                } else if ("0" === match) {
                    resultAfterDecimal += "0";
                    addDecimalSeparator = true;
                }
            } else if (match.length > 1 && ('"' === match[0] && '"' === match[match.length - 1] || "'" === match[0] && "'" === match[match.length - 1])) resultAfterDecimal += match.slice(1, match.length - 1); else if ("E" !== match[0] && "e" !== match[0] || "0" !== match[match.length - 1] || !/[eE][+-]*[0]+/.test(match)) resultAfterDecimal += match; else {
                match = 0 > exponent ? match.replace("+", "").replace("-", "") : match.replace("-", "");
                resultAfterDecimal += match.replace(/[0]+/, function($0) {
                    return pad(exponent, $0.length);
                });
            }
        }
        result += (addDecimalSeparator ? decimalSeparator : "") + resultAfterDecimal;
        return result;
    };
    var getMouseCoordinates = function(ev) {
        var x = 0;
        var y = 0;
        ev = ev || window.event;
        if (ev.offsetX || 0 === ev.offsetX) {
            x = ev.offsetX;
            y = ev.offsetY;
        } else if (ev.layerX || 0 == ev.layerX) {
            x = ev.layerX;
            y = ev.layerY;
        } else {
            x = ev.pageX - ev.target.offsetLeft;
            y = ev.pageY - ev.target.offsetTop;
        }
        return {
            x: x,
            y: y
        };
    };
    var optimizeForHiDPI = true;
    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = 1;
    var devicePixelBackingStoreRatio = optimizeForHiDPI ? devicePixelRatio / backingStoreRatio : 1;
    var base64Images = {
        reset: {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAKRSURBVEiJrdY/iF1FFMfxzwnZrGISUSR/JLGIhoh/QiRNBLWxMLIWEkwbgiAoFgoW2mhlY6dgpY2IlRBRxBSKhSAKIklWJRYuMZKAhiyopAiaTY7FvRtmZ+/ed9/zHRjezLw5v/O9d86cuZGZpmURAfdn5o9DfdZNLXpjz+LziPgyIl6MiG0jPTJzZBuyDrP4BVm0P/AKbljTb4ToY/gGewYA7KyCl+1b3DUYANvwbiHw0gCAGRzBOzjTAXEOu0cC4Ch+r5x/HrpdrcZmvIDFSucMtnYCYC++6HmNDw8FKDT34ETrf639/azOr5vwRk/g5fbeuABtgC04XWk9VQLciMP4EH/3AFzErRNC7MXlQmsesSoHsGPE23hmEoBW+61K66HMXFmIMvN8myilXS36R01ub+KfYvw43ZXwYDX+AHP4BAci4pFJomfmr/ihmNofESsBImJGk7mlncrM45n5JPbhz0kAWpsv+juxaX21YIPmVJS2uNzJMS6ZNexC0d+I7fUWXLFyz2kSZlpWPvASlmqAf/FXNXf3FAF2F/1LuFifAlionB6dRuSI2IwHi6lzmXmp6xR8XY0fiIh7psAwh+3FuDkRHQVjl+a8lkXjo0kLUKH7XaV5oO86PmZ1FTzyP4K/XGl9v/zwfbW7BriiuETGCP5ch9bc9f97HF/vcFzCa5gdEPgWq+t/4v0V63oE1uF4h0DiFJ7HnSWMppDdh1dxtsPvJ2wcBNAKbsJXa0Ck5opdaBPsRNu/usba09i1KsaAVzmLt3sghrRjuK1Tf4xkegInxwy8gKf7dKMVH2QRsV5zXR/Cftyu+aKaKbbkQrsdH+PTzLzcqzkOQAVzM+7FHdiqqe2/YT4zF/t8S/sPmawyvC974vcAAAAASUVORK5CYII="
        },
        pan: {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJVSURBVFiFvZe7a1RBGMV/x2hWI4JpfKCIiSBKOoOCkID/wP4BFqIIFkE02ChIiC8QDKlSiI3YqRBsBVGwUNAUdiIEUgjiAzQIIsuKJsfizsXr5t7d+8jmwLDfzHz3nLOzc7+ZxTZlGyDgZiWOCuJ9wH2gCUyuqQFgF/AGcKJNrYkBYBj40CIet+muGQi/96kM4WS7C/Tm5VUg7whJg8BkEGkCR4BDYfodsADUgP6wErO5iCtswsuJb32hdbXy8qzL5TIdmzJinHdZoZIBZcSFkGlAKs1Z3YCketZcBtouuaQNkrblMiBpBrhme7mAgU4wMCvpcFsDkq4C54DFVRTH9h+i6vlE0r5UA5ImgCuh28jB28iIs7BIVCOeStoZD64P4uPAjUTygKSx2FsK2TIwkugfk9Qkfd/E+yMWHQCeSRqx/R3gOp3LazfaS2C4B5gHDgD7U9x3E3uAH7KNpC3AHHAwTL4FHgM9GQ8vAaPA0dB/Abxqk2/gBLA9MXba9r1k/d4LfA3JtwueBeM58ucS+edXnAW23wP10N3advEi9CXizTnyN4bPS7Zn4sH/dq3t18AY4e1YLYSy3g/csj2VnFshZPuOpOeSKHCodUINuGj7YetE6je1PV9QoNPJ9StNHKodx7nRbiWrGHBGXAi5DUiqtQwtpcWK0Jubt8CltA5MEV1IfwO7+VffPwGfia5m34CT4bXujIIX0Qna1/cGMNqV/wUJE2czxD8CQ4X5Sl7Jz7SILwCDpbjKPBRMHAd+EtX4HWV5Spdc2w8kDQGPbH8py/MXMygM69/FKz4AAAAASUVORK5CYII="
        },
        zoom: {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAMqSURBVFiFvdfbj91TFMDxz57U6GUEMS1aYzyMtCSSDhWjCZMInpAI3khE/QHtgzdRkXgSCS8SES9epKLi0oRKNETjRahREq2KS1stdRujtDPtbA97n5zdn9+5zJxTK9k5v3POXmt991p7r71+IcaoGwkhTOIebMRqzOBTvIG3Y4zTXRmqSoyx5cAKbMJOHMFJnMZ8/jyFaXyMR7G6nb1aH22cP4BvcBxziG3GKfyTIR9D6BYg1KUghPBCDveFlb/24Av8iuUYw41YVsz5G7uxKcZ4aMEpwGt5NY3V/YbHsQ6rcAHOw/kYxigewr5CZw4fYGxBKcCLOFEYehXrMdRhr5yLETxVScsOLOkKAPfn1TYMPIvLFrShUlS2FDZm8XRHACzFAWl3R2xbqPMCYhmeLCAOYEMngAczbcTvuHYxzguIy/FesR9e6gSwU/OoPYHBHgHgviIKX2Flq7k34KhmcVnbi/PC8JX4MgMcxb118wZwdz5aISscqx7VRcox7MrPQ7i+btIAJrAkf9+bI9EPmZY2IAxiTSuAldLq4Y9+AcSUh78KP0tbAcwU35cXMD1JCIFUoGiehlqAz6TNB1f1C0DK+0h+nsNPrQC2a4bqGmlD9kOGcWt+Po6pVgDvSxfJaSkFd4UQBvoAsBYbCoB3a2flM7slA0R8iyt6rAFDeDPbm8eOTpVwGD9qVq7nLbIaZnmksPU1JtsCZMXNmpdRxFasWITzh6Xj3LCzra1OxcD2QjHiGVzdpfORnMqZio2PcF23ABdJF1Np4BPptlyPi6WzPYBzpJZtHe7A6xW9cnyP8TqA//SEIYRL8Bxul7rihvwgtVn78WcGGZXa9HGd5TDujDHuOePXNiHdKjWgZX/YbsxLx/ktqbjVzTlcjUSnvI5JrdlUVp6WesZZ6R1hRrpq9+EVTGS9jTjYAuKIouGpbcurEkIYxC051KNSamazsc+xK8b4S0VnEi/j0hqTP+M27O258egQwZuzs7pI7Mf4WQXIEDc5s9sux+5+1Py2EmP8UOq6GvWhIScxfdYjUERiAt9Jd84J6a16zf8JEKT3yCm8g1UxRv8CC4pyRhzR1uUAAAAASUVORK5CYII="
        },
        menu: {
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTUvMTTPsvU0AAAAP0lEQVRIie2SMQoAIBDDUvH/X667g8sJJ9KOhYYOkW0qGaU1MPdC0vGSbV19EACo3YMPAFH5BUBUjsqfAPpVXtNgGDfxEDCtAAAAAElFTkSuQmCC"
        }
    };
    CanvasJSObject.prototype.setOptions = function(options, currentThemeOptions) {
        if (defaultOptions[this._defaultsKey]) {
            var defaults = defaultOptions[this._defaultsKey];
            for (var prop in defaults) this[prop] = options && prop in options ? options[prop] : currentThemeOptions && prop in currentThemeOptions ? currentThemeOptions[prop] : defaults[prop];
        } else isDebugMode && window.console && console.log("defaults not set");
    };
    CanvasJSObject.prototype.updateOption = function(prop) {
        !defaultOptions[this._defaultsKey] && isDebugMode && window.console && console.log("defaults not set");
        var defaults = defaultOptions[this._defaultsKey];
        var theme = this._options.theme ? this._options.theme : this.chart && this.chart._options.theme ? this.chart._options.theme : "theme1";
        var currentThemeOptions = {};
        var newValue = this[prop];
        theme && themes[theme] && themes[theme][this._defaultsKey] && (currentThemeOptions = themes[theme][this._defaultsKey]);
        prop in defaults && (newValue = prop in this._options ? this._options[prop] : currentThemeOptions && prop in currentThemeOptions ? currentThemeOptions[prop] : defaults[prop]);
        if (newValue === this[prop]) return false;
        this[prop] = newValue;
        return true;
    };
    CanvasJSObject.prototype.trackChanges = function(option) {
        this._options._oldOptions || (this._options._oldOptions = {});
        this._options._oldOptions[option] = this._options[option];
    };
    CanvasJSObject.prototype.isBeingTracked = function(option) {
        this._options._oldOptions || (this._options._oldOptions = {});
        return this._options._oldOptions[option] ? true : false;
    };
    CanvasJSObject.prototype.hasOptionChanged = function(option) {
        this._options._oldOptions || (this._options._oldOptions = {});
        var hasChanged = !(this._options._oldOptions[option] === this._options[option]);
        return hasChanged;
    };
    extend(Chart, CanvasJSObject);
    Chart.prototype._updateOptions = function() {
        var _this = this;
        this.updateOption("width");
        this.updateOption("height");
        this.updateOption("theme");
        this.updateOption("colorSet") && (this._selectedColorSet = "undefined" != typeof colorSets[this.colorSet] ? colorSets[this.colorSet] : colorSets["colorSet1"]);
        this.updateOption("backgroundColor");
        this.backgroundColor || (this.backgroundColor = "rgba(0,0,0,0)");
        this.updateOption("culture");
        this._cultureInfo = new CultureInfo(this, this._options.culture);
        this.updateOption("animationEnabled");
        this.animationEnabled = this.animationEnabled && isCanvasSupported;
        if (this._options.zoomEnabled) {
            if (!this._zoomButton) {
                hide(this._zoomButton = document.createElement("button"));
                setButtonState(this, this._zoomButton, "pan");
                this._toolBar.appendChild(this._zoomButton);
                addEvent(this._zoomButton, "click", function() {
                    if (_this.zoomEnabled) {
                        _this.zoomEnabled = false;
                        _this.panEnabled = true;
                        setButtonState(_this, _this._zoomButton, "zoom");
                    } else {
                        _this.zoomEnabled = true;
                        _this.panEnabled = false;
                        setButtonState(_this, _this._zoomButton, "pan");
                    }
                    _this.render();
                });
            }
            if (!this._resetButton) {
                hide(this._resetButton = document.createElement("button"));
                setButtonState(this, this._resetButton, "reset");
                this._toolBar.appendChild(this._resetButton);
                addEvent(this._resetButton, "click", function() {
                    _this._toolTip.hide();
                    if (_this.zoomEnabled || _this.panEnabled) {
                        _this.zoomEnabled = true;
                        _this.panEnabled = false;
                        setButtonState(_this, _this._zoomButton, "pan");
                        _this._defaultCursor = "default";
                        _this.overlaidCanvas.style.cursor = _this._defaultCursor;
                    } else {
                        _this.zoomEnabled = false;
                        _this.panEnabled = false;
                    }
                    _this.sessionVariables.axisX.internalMinimum = _this._options.axisX && _this._options.axisX.minimum ? _this._options.axisX.minimum : null;
                    _this.sessionVariables.axisX.internalMaximum = _this._options.axisX && _this._options.axisX.maximum ? _this._options.axisX.maximum : null;
                    _this.resetOverlayedCanvas();
                    hide(_this._zoomButton, _this._resetButton);
                    _this.render();
                });
                this.overlaidCanvas.style.cursor = _this._defaultCursor;
            }
            if (!this.zoomEnabled && !this.panEnabled) if (this._zoomButton) {
                if (_this._zoomButton.getAttribute("state") === _this._cultureInfo.zoomText) {
                    this.panEnabled = true;
                    this.zoomEnabled = false;
                } else {
                    this.zoomEnabled = true;
                    this.panEnabled = false;
                }
                show(_this._zoomButton, _this._resetButton);
            } else {
                this.zoomEnabled = true;
                this.panEnabled = false;
            }
        } else {
            this.zoomEnabled = false;
            this.panEnabled = false;
        }
        "undefined" != typeof this._options.exportFileName && (this.exportFileName = this._options.exportFileName);
        "undefined" != typeof this._options.exportEnabled && (this.exportEnabled = this._options.exportEnabled);
        if (this._menuButton) this.exportEnabled ? show(this._menuButton) : hide(this._menuButton); else if (this.exportEnabled && isCanvasSupported) {
            this._menuButton = document.createElement("button");
            setButtonState(this, this._menuButton, "menu");
            this._toolBar.appendChild(this._menuButton);
            addEvent(this._menuButton, "click", function() {
                if ("none" === _this._dropdownMenu.style.display) {
                    if (_this._dropDownCloseTime && new Date().getTime() - _this._dropDownCloseTime.getTime() <= 500) return;
                    _this._dropdownMenu.style.display = "block";
                    _this._menuButton.blur();
                    _this._dropdownMenu.focus();
                }
            }, true);
        }
        if (!this._dropdownMenu && this.exportEnabled && isCanvasSupported) {
            this._dropdownMenu = document.createElement("div");
            this._dropdownMenu.setAttribute("tabindex", -1);
            this._dropdownMenu.style.cssText = "position: absolute; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer;right: 1px;top: 25px;min-width: 120px;outline: 0;border: 1px solid silver;font-size: 14px;font-family: Calibri, Verdana, sans-serif;padding: 5px 0px 5px 0px;text-align: left;background-color: #fff;line-height: 20px;box-shadow: 2px 2px 10px #888888;";
            _this._dropdownMenu.style.display = "none";
            this._toolBar.appendChild(this._dropdownMenu);
            addEvent(this._dropdownMenu, "blur", function() {
                hide(_this._dropdownMenu);
                _this._dropDownCloseTime = new Date();
            }, true);
            var exportOption = document.createElement("div");
            exportOption.style.cssText = "padding: 2px 15px 2px 10px";
            exportOption.innerHTML = this._cultureInfo.saveJPGText;
            this._dropdownMenu.appendChild(exportOption);
            addEvent(exportOption, "mouseover", function() {
                this.style.backgroundColor = "#EEEEEE";
            }, true);
            addEvent(exportOption, "mouseout", function() {
                this.style.backgroundColor = "transparent";
            }, true);
            addEvent(exportOption, "click", function() {
                exportCanvas(_this.canvas, "jpg", _this.exportFileName);
                hide(_this._dropdownMenu);
            }, true);
            var exportOption = document.createElement("div");
            exportOption.style.cssText = "padding: 2px 15px 2px 10px";
            exportOption.innerHTML = this._cultureInfo.savePNGText;
            this._dropdownMenu.appendChild(exportOption);
            addEvent(exportOption, "mouseover", function() {
                this.style.backgroundColor = "#EEEEEE";
            }, true);
            addEvent(exportOption, "mouseout", function() {
                this.style.backgroundColor = "transparent";
            }, true);
            addEvent(exportOption, "click", function() {
                exportCanvas(_this.canvas, "png", _this.exportFileName);
                hide(_this._dropdownMenu);
            }, true);
        }
        if ("none" !== this._toolBar.style.display && this._zoomButton) {
            this.panEnabled ? setButtonState(_this, _this._zoomButton, "zoom") : setButtonState(_this, _this._zoomButton, "pan");
            _this._resetButton.getAttribute("state") !== _this._cultureInfo.resetText && setButtonState(_this, _this._resetButton, "reset");
        }
        if ("undefined" == typeof defaultOptions.Chart.creditHref) {
            this.creditHref = "http://canvasjs.com/";
            this.creditText = "CanvasJS.com";
        } else {
            var creditTextChanged = this.updateOption("creditText");
            var creditHrefChanged = this.updateOption("creditHref");
        }
        if (0 === this.renderCount || creditTextChanged || creditHrefChanged) {
            this._creditLink.setAttribute("href", this.creditHref);
            this._creditLink.innerHTML = this.creditText;
        }
        this.creditHref && this.creditText ? this._creditLink.parentElement || this._canvasJSContainer.appendChild(this._creditLink) : this._creditLink.parentElement && this._canvasJSContainer.removeChild(this._creditLink);
        this._options.toolTip && this._toolTip._options !== this._options.toolTip && (this._toolTip._options = this._options.toolTip);
        this._toolTip.updateOption("enabled");
        this._toolTip.updateOption("shared");
        this._toolTip.updateOption("animationEnabled");
        this._toolTip.updateOption("borderColor");
        this._toolTip.updateOption("content");
    };
    Chart.prototype._updateSize = function() {
        var width = 0;
        var height = 0;
        this._options.width ? width = this.width : this.width = width = this._container.clientWidth > 0 ? this._container.clientWidth : this.width;
        this._options.height ? height = this.height : this.height = height = this._container.clientHeight > 0 ? this._container.clientHeight : this.height;
        if (this.canvas.width !== width * devicePixelBackingStoreRatio || this.canvas.height !== height * devicePixelBackingStoreRatio) {
            setCanvasSize(this.canvas, width, height);
            setCanvasSize(this.overlaidCanvas, width, height);
            setCanvasSize(this._eventManager.ghostCanvas, width, height);
            return true;
        }
        return false;
    };
    Chart.prototype._initialize = function() {
        this._animator ? this._animator.cancelAllAnimations() : this._animator = new Animator(this);
        this.disableToolTip = false;
        this.pieDoughnutClickHandler = null;
        this.animationRequestId && this.cancelRequestAnimFrame.call(window, this.animationRequestId);
        this._updateOptions();
        this.animatedRender = isCanvasSupported && this.animationEnabled && 0 === this.renderCount;
        this._updateSize();
        this.clearCanvas();
        this.ctx.beginPath();
        this.axisX = null;
        this.axisY = null;
        this.axisY2 = null;
        this._indexLabels = [];
        this._dataInRenderedOrder = [];
        this._events = [];
        this._eventManager && this._eventManager.reset();
        this.plotInfo = {
            axisPlacement: null,
            axisXValueType: null,
            plotTypes: []
        };
        this.layoutManager.reset();
        this.data = [];
        var dataSeriesIndex = 0;
        for (var series = 0; series < this._options.data.length; series++) {
            dataSeriesIndex++;
            if (!(!this._options.data[series].type || Chart._supportedChartTypes.indexOf(this._options.data[series].type) >= 0)) continue;
            var dataSeries = new DataSeries(this, this._options.data[series], this.theme, dataSeriesIndex - 1, ++this._eventManager.lastObjectId);
            null === dataSeries.name && (dataSeries.name = "DataSeries " + dataSeriesIndex);
            if (null === dataSeries.color) if (this._options.data.length > 1) {
                dataSeries._colorSet = [ this._selectedColorSet[dataSeries.index % this._selectedColorSet.length] ];
                dataSeries.color = this._selectedColorSet[dataSeries.index % this._selectedColorSet.length];
            } else dataSeries._colorSet = "line" === dataSeries.type || "stepLine" === dataSeries.type || "spline" === dataSeries.type || "area" === dataSeries.type || "stepArea" === dataSeries.type || "splineArea" === dataSeries.type || "stackedArea" === dataSeries.type || "stackedArea100" === dataSeries.type || "rangeArea" === dataSeries.type || "rangeSplineArea" === dataSeries.type || "candlestick" === dataSeries.type || "ohlc" === dataSeries.type ? [ this._selectedColorSet[0] ] : this._selectedColorSet; else dataSeries._colorSet = [ dataSeries.color ];
            null === dataSeries.markerSize && (("line" === dataSeries.type || "stepLine" === dataSeries.type || "spline" === dataSeries.type) && dataSeries.dataPoints && dataSeries.dataPoints.length < this.width / 16 || "scatter" === dataSeries.type) && (dataSeries.markerSize = 8);
            "bubble" !== dataSeries.type && "scatter" !== dataSeries.type || !dataSeries.dataPoints || dataSeries.dataPoints.sort(compareDataPointX);
            this.data.push(dataSeries);
            var seriesAxisPlacement = dataSeries.axisPlacement;
            var errorMessage;
            "normal" === seriesAxisPlacement ? "xySwapped" === this.plotInfo.axisPlacement ? errorMessage = 'You cannot combine "' + dataSeries.type + '" with bar chart' : "none" === this.plotInfo.axisPlacement ? errorMessage = 'You cannot combine "' + dataSeries.type + '" with pie chart' : null === this.plotInfo.axisPlacement && (this.plotInfo.axisPlacement = "normal") : "xySwapped" === seriesAxisPlacement ? "normal" === this.plotInfo.axisPlacement ? errorMessage = 'You cannot combine "' + dataSeries.type + '" with line, area, column or pie chart' : "none" === this.plotInfo.axisPlacement ? errorMessage = 'You cannot combine "' + dataSeries.type + '" with pie chart' : null === this.plotInfo.axisPlacement && (this.plotInfo.axisPlacement = "xySwapped") : "none" == seriesAxisPlacement && ("normal" === this.plotInfo.axisPlacement ? errorMessage = 'You cannot combine "' + dataSeries.type + '" with line, area, column or bar chart' : "xySwapped" === this.plotInfo.axisPlacement ? errorMessage = 'You cannot combine "' + dataSeries.type + '" with bar chart' : null === this.plotInfo.axisPlacement && (this.plotInfo.axisPlacement = "none"));
            if (errorMessage && window.console) {
                window.console.log(errorMessage);
                return;
            }
        }
        this._objectsInitialized = true;
    };
    Chart._supportedChartTypes = [ "line", "stepLine", "spline", "column", "area", "stepArea", "splineArea", "bar", "bubble", "scatter", "stackedColumn", "stackedColumn100", "stackedBar", "stackedBar100", "stackedArea", "stackedArea100", "candlestick", "ohlc", "rangeColumn", "rangeBar", "rangeArea", "rangeSplineArea", "pie", "doughnut", "funnel" ];
    Chart._supportedChartTypes.indexOf || (Chart._supportedChartTypes.indexOf = function(elt) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = 0 > from ? Math.ceil(from) : Math.floor(from);
        0 > from && (from += len);
        for (;len > from; from++) if (from in this && this[from] === elt) return from;
        return -1;
    });
    Chart.prototype.render = function(options) {
        options && (this._options = options);
        this._initialize();
        for (var i = 0; i < this.data.length; i++) if ("normal" === this.plotInfo.axisPlacement || "xySwapped" === this.plotInfo.axisPlacement) {
            if (this.data[i].axisYType && "primary" !== this.data[i].axisYType) {
                if ("secondary" === this.data[i].axisYType) {
                    this.axisY2 || ("normal" === this.plotInfo.axisPlacement ? this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "right") : "xySwapped" === this.plotInfo.axisPlacement && (this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "top")));
                    this.data[i].axisY = this.axisY2;
                }
            } else {
                this.axisY || ("normal" === this.plotInfo.axisPlacement ? this.axisY = new Axis(this, this._options.axisY, "axisY", "left") : "xySwapped" === this.plotInfo.axisPlacement && (this.axisY = new Axis(this, this._options.axisY, "axisY", "bottom")));
                this.data[i].axisY = this.axisY;
            }
            this.axisX || ("normal" === this.plotInfo.axisPlacement ? this.axisX = new Axis(this, this._options.axisX, "axisX", "bottom") : "xySwapped" === this.plotInfo.axisPlacement && (this.axisX = new Axis(this, this._options.axisX, "axisX", "left")));
            this.data[i].axisX = this.axisX;
        }
        this._processData();
        if (this._options.title) {
            this._title = new Title(this, this._options.title);
            this._title.render();
        }
        this.legend = new Legend(this, this._options.legend, this.theme);
        for (var i = 0; i < this.data.length; i++) this.data[i].showInLegend && this.legend.dataSeries.push(this.data[i]);
        this.legend.render();
        if ("normal" === this.plotInfo.axisPlacement || "xySwapped" === this.plotInfo.axisPlacement) {
            {
                this.layoutManager.getFreeSpace();
            }
            Axis.setLayoutAndRender(this.axisX, this.axisY, this.axisY2, this.plotInfo.axisPlacement, this.layoutManager.getFreeSpace());
        } else {
            if ("none" !== this.plotInfo.axisPlacement) return;
            this.preparePlotArea();
        }
        var animations = [];
        if (this.animatedRender) {
            var initialState = createCanvas(this.width, this.height);
            var initialStateCtx = initialState.getContext("2d");
            initialStateCtx.drawImage(this.canvas, 0, 0, this.width, this.height);
        }
        for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
            var plotType = this.plotInfo.plotTypes[i];
            for (var j = 0; j < plotType.plotUnits.length; j++) {
                var plotUnit = plotType.plotUnits[j];
                var animationInfo = null;
                plotUnit.targetCanvas = null;
                if (this.animatedRender) {
                    plotUnit.targetCanvas = createCanvas(this.width, this.height);
                    plotUnit.targetCanvasCtx = plotUnit.targetCanvas.getContext("2d");
                }
                "line" === plotUnit.type ? animationInfo = this.renderLine(plotUnit) : "stepLine" === plotUnit.type ? animationInfo = this.renderStepLine(plotUnit) : "spline" === plotUnit.type ? animationInfo = this.renderSpline(plotUnit) : "column" === plotUnit.type ? animationInfo = this.renderColumn(plotUnit) : "bar" === plotUnit.type ? animationInfo = this.renderBar(plotUnit) : "area" === plotUnit.type ? animationInfo = this.renderArea(plotUnit) : "stepArea" === plotUnit.type ? animationInfo = this.renderStepArea(plotUnit) : "splineArea" === plotUnit.type ? animationInfo = this.renderSplineArea(plotUnit) : "stackedColumn" === plotUnit.type ? animationInfo = this.renderStackedColumn(plotUnit) : "stackedColumn100" === plotUnit.type ? animationInfo = this.renderStackedColumn100(plotUnit) : "stackedBar" === plotUnit.type ? animationInfo = this.renderStackedBar(plotUnit) : "stackedBar100" === plotUnit.type ? animationInfo = this.renderStackedBar100(plotUnit) : "stackedArea" === plotUnit.type ? animationInfo = this.renderStackedArea(plotUnit) : "stackedArea100" === plotUnit.type ? animationInfo = this.renderStackedArea100(plotUnit) : "bubble" === plotUnit.type ? animationInfo = animationInfo = this.renderBubble(plotUnit) : "scatter" === plotUnit.type ? animationInfo = this.renderScatter(plotUnit) : "pie" === plotUnit.type ? this.renderPie(plotUnit) : "doughnut" === plotUnit.type ? this.renderPie(plotUnit) : "candlestick" === plotUnit.type ? animationInfo = this.renderCandlestick(plotUnit) : "ohlc" === plotUnit.type ? animationInfo = this.renderCandlestick(plotUnit) : "rangeColumn" === plotUnit.type ? animationInfo = this.renderRangeColumn(plotUnit) : "rangeBar" === plotUnit.type ? animationInfo = this.renderRangeBar(plotUnit) : "rangeArea" === plotUnit.type ? animationInfo = this.renderRangeArea(plotUnit) : "rangeSplineArea" === plotUnit.type && (animationInfo = this.renderRangeSplineArea(plotUnit));
                for (var k = 0; k < plotUnit.dataSeriesIndexes.length; k++) this._dataInRenderedOrder.push(this.data[plotUnit.dataSeriesIndexes[k]]);
                this.animatedRender && animationInfo && animations.push(animationInfo);
            }
        }
        if (this.animatedRender && this._indexLabels.length > 0) {
            var indexLabelCanvas = createCanvas(this.width, this.height);
            var indexLabelCanvasCtx = indexLabelCanvas.getContext("2d");
            animations.push(this.renderIndexLabels(indexLabelCanvasCtx));
        }
        var _this = this;
        if (animations.length > 0) {
            _this.disableToolTip = true;
            _this._animator.animate(200, _this.animationDuration, function(fractionComplete) {
                _this.ctx.clearRect(0, 0, _this.width, _this.height);
                _this.ctx.drawImage(initialState, 0, 0, _this.width * devicePixelBackingStoreRatio, _this.height * devicePixelBackingStoreRatio, 0, 0, _this.width, _this.height);
                for (var l = 0; l < animations.length; l++) {
                    animationInfo = animations[l];
                    1 > fractionComplete && "undefined" != typeof animationInfo.startTimePercent ? fractionComplete >= animationInfo.startTimePercent && animationInfo.animationCallback(animationInfo.easingFunction(fractionComplete - animationInfo.startTimePercent, 0, 1, 1 - animationInfo.startTimePercent), animationInfo) : animationInfo.animationCallback(animationInfo.easingFunction(fractionComplete, 0, 1, 1), animationInfo);
                }
            }, function() {
                animations = [];
                for (var i = 0; i < _this.plotInfo.plotTypes.length; i++) {
                    var plotType = _this.plotInfo.plotTypes[i];
                    for (var j = 0; j < plotType.plotUnits.length; j++) {
                        var plotUnit = plotType.plotUnits[j];
                        plotUnit.targetCanvas = null;
                    }
                }
                initialState = null;
                _this.disableToolTip = false;
            });
        } else _this._indexLabels.length > 0 && _this.renderIndexLabels();
        this.attachPlotAreaEventHandlers();
        this.zoomEnabled || this.panEnabled || !this._zoomButton || "none" === this._zoomButton.style.display || hide(this._zoomButton, this._resetButton);
        this._toolTip._updateToolTip();
        this.renderCount++;
        if (isDebugMode) {
            var _this = this;
            setTimeout(function() {
                var ghostCanvasCopy = document.getElementById("ghostCanvasCopy");
                if (ghostCanvasCopy) {
                    setCanvasSize(ghostCanvasCopy, _this.width, _this.height);
                    var ghostCanvasCopyCtx = ghostCanvasCopy.getContext("2d");
                    ghostCanvasCopyCtx.drawImage(_this._eventManager.ghostCanvas, 0, 0);
                }
            }, 2e3);
        }
    };
    Chart.prototype.attachPlotAreaEventHandlers = function() {
        this.attachEvent({
            context: this,
            chart: this,
            mousedown: this._plotAreaMouseDown,
            mouseup: this._plotAreaMouseUp,
            mousemove: this._plotAreaMouseMove,
            cursor: this.zoomEnabled ? "col-resize" : "move",
            cursor: this.panEnabled ? "move" : "default",
            capture: true,
            bounds: this.plotArea
        });
    };
    Chart.prototype.categoriseDataSeries = function() {
        var dataSeries = "";
        for (var i = 0; i < this.data.length; i++) {
            dataSeries = this.data[i];
            if (!dataSeries.dataPoints || 0 === dataSeries.dataPoints.length || !dataSeries.visible) continue;
            if (Chart._supportedChartTypes.indexOf(dataSeries.type) >= 0) {
                var plotType = null;
                var plotTypeExists = false;
                var plotUnit = null;
                var plotUnitExists = false;
                for (var j = 0; j < this.plotInfo.plotTypes.length; j++) if (this.plotInfo.plotTypes[j].type === dataSeries.type) {
                    plotTypeExists = true;
                    var plotType = this.plotInfo.plotTypes[j];
                    break;
                }
                if (!plotTypeExists) {
                    plotType = {
                        type: dataSeries.type,
                        totalDataSeries: 0,
                        plotUnits: []
                    };
                    this.plotInfo.plotTypes.push(plotType);
                }
                for (var j = 0; j < plotType.plotUnits.length; j++) if (plotType.plotUnits[j].axisYType === dataSeries.axisYType) {
                    plotUnitExists = true;
                    var plotUnit = plotType.plotUnits[j];
                    break;
                }
                if (!plotUnitExists) {
                    plotUnit = {
                        type: dataSeries.type,
                        previousDataSeriesCount: 0,
                        index: plotType.plotUnits.length,
                        plotType: plotType,
                        axisYType: dataSeries.axisYType,
                        axisY: "primary" === dataSeries.axisYType ? this.axisY : this.axisY2,
                        axisX: this.axisX,
                        dataSeriesIndexes: [],
                        yTotals: []
                    };
                    plotType.plotUnits.push(plotUnit);
                }
                plotType.totalDataSeries++;
                plotUnit.dataSeriesIndexes.push(i);
                dataSeries.plotUnit = plotUnit;
            }
        }
        for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
            var plotType = this.plotInfo.plotTypes[i];
            var previousDataSeriesCount = 0;
            for (var j = 0; j < plotType.plotUnits.length; j++) {
                plotType.plotUnits[j].previousDataSeriesCount = previousDataSeriesCount;
                previousDataSeriesCount += plotType.plotUnits[j].dataSeriesIndexes.length;
            }
        }
    };
    Chart.prototype.assignIdToDataPoints = function() {
        for (var i = 0; i < this.data.length; i++) {
            var dataSeries = this.data[i];
            if (!dataSeries.dataPoints) continue;
            var length = dataSeries.dataPoints.length;
            for (var j = 0; length > j; j++) dataSeries.dataPointIds[j] = ++this._eventManager.lastObjectId;
        }
    };
    Chart.prototype._processData = function() {
        this.assignIdToDataPoints();
        this.categoriseDataSeries();
        for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
            var plotType = this.plotInfo.plotTypes[i];
            for (var j = 0; j < plotType.plotUnits.length; j++) {
                var plotUnit = plotType.plotUnits[j];
                "line" === plotUnit.type || "stepLine" === plotUnit.type || "spline" === plotUnit.type || "column" === plotUnit.type || "area" === plotUnit.type || "stepArea" === plotUnit.type || "splineArea" === plotUnit.type || "bar" === plotUnit.type || "bubble" === plotUnit.type || "scatter" === plotUnit.type ? this._processMultiseriesPlotUnit(plotUnit) : "stackedColumn" === plotUnit.type || "stackedBar" === plotUnit.type || "stackedArea" === plotUnit.type ? this._processStackedPlotUnit(plotUnit) : "stackedColumn100" === plotUnit.type || "stackedBar100" === plotUnit.type || "stackedArea100" === plotUnit.type ? this._processStacked100PlotUnit(plotUnit) : ("candlestick" === plotUnit.type || "ohlc" === plotUnit.type || "rangeColumn" === plotUnit.type || "rangeBar" === plotUnit.type || "rangeArea" === plotUnit.type || "rangeSplineArea" === plotUnit.type) && this._processMultiYPlotUnit(plotUnit);
            }
        }
    };
    Chart.prototype._processMultiseriesPlotUnit = function(plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1) return;
        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;
        var dataPointX, dataPointY;
        var isDateTime = false;
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;
            if ("normal" === dataSeries.axisPlacement || "xySwapped" === dataSeries.axisPlacement) {
                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : this._options.axisX && this._options.axisX.minimum ? this._options.axisX.minimum : -1/0;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : this._options.axisX && this._options.axisX.maximum ? this._options.axisX.maximum : 1/0;
            }
            (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || "dateTime" === dataSeries.xValueType) && (isDateTime = true);
            for (i = 0; i < dataSeries.dataPoints.length; i++) {
                "undefined" == typeof dataSeries.dataPoints[i].x && (dataSeries.dataPoints[i].x = i);
                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();
                } else dataPointX = dataSeries.dataPoints[i].x;
                dataPointY = dataSeries.dataPoints[i].y;
                dataPointX < axisXDataInfo.min && (axisXDataInfo.min = dataPointX);
                dataPointX > axisXDataInfo.max && (axisXDataInfo.max = dataPointX);
                dataPointY < axisYDataInfo.min && (axisYDataInfo.min = dataPointY);
                dataPointY > axisYDataInfo.max && (axisYDataInfo.max = dataPointY);
                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    0 > xDiff && (xDiff = -1 * xDiff);
                    axisXDataInfo.minDiff > xDiff && 0 !== xDiff && (axisXDataInfo.minDiff = xDiff);
                }
                if (plotAreaXMin > dataPointX && !isFirstDPInViewPort) continue;
                if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;
                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) isLastDPInViewPort = true; else if (dataPointX > plotAreaXMax && isLastDPInViewPort) continue;
                dataSeries.dataPoints[i].label && (plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label);
                dataPointX < axisXDataInfo.viewPortMin && (axisXDataInfo.viewPortMin = dataPointX);
                dataPointX > axisXDataInfo.viewPortMax && (axisXDataInfo.viewPortMax = dataPointX);
                if (null === dataPointY) continue;
                dataPointY < axisYDataInfo.viewPortMin && (axisYDataInfo.viewPortMin = dataPointY);
                dataPointY > axisYDataInfo.viewPortMax && (axisYDataInfo.viewPortMax = dataPointY);
            }
            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }
    };
    Chart.prototype._processStackedPlotUnit = function(plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1) return;
        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;
        var dataPointX, dataPointY;
        var isDateTime = false;
        var dataPointYPositiveSums = [];
        var dataPointYNegativeSums = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;
            if ("normal" === dataSeries.axisPlacement || "xySwapped" === dataSeries.axisPlacement) {
                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : this._options.axisX && this._options.axisX.minimum ? this._options.axisX.minimum : -1/0;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : this._options.axisX && this._options.axisX.maximum ? this._options.axisX.maximum : 1/0;
            }
            (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || "dateTime" === dataSeries.xValueType) && (isDateTime = true);
            for (i = 0; i < dataSeries.dataPoints.length; i++) {
                "undefined" == typeof dataSeries.dataPoints[i].x && (dataSeries.dataPoints[i].x = i);
                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();
                } else dataPointX = dataSeries.dataPoints[i].x;
                dataPointY = dataSeries.dataPoints[i].y;
                dataPointX < axisXDataInfo.min && (axisXDataInfo.min = dataPointX);
                dataPointX > axisXDataInfo.max && (axisXDataInfo.max = dataPointX);
                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    0 > xDiff && (xDiff = -1 * xDiff);
                    axisXDataInfo.minDiff > xDiff && 0 !== xDiff && (axisXDataInfo.minDiff = xDiff);
                }
                if (plotAreaXMin > dataPointX && !isFirstDPInViewPort) continue;
                if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;
                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) isLastDPInViewPort = true; else if (dataPointX > plotAreaXMax && isLastDPInViewPort) continue;
                dataSeries.dataPoints[i].label && (plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label);
                dataPointX < axisXDataInfo.viewPortMin && (axisXDataInfo.viewPortMin = dataPointX);
                dataPointX > axisXDataInfo.viewPortMax && (axisXDataInfo.viewPortMax = dataPointX);
                if (null === dataPointY) continue;
                plotUnit.yTotals[dataPointX] = (plotUnit.yTotals[dataPointX] ? plotUnit.yTotals[dataPointX] : 0) + Math.abs(dataPointY);
                dataPointY >= 0 ? dataPointYPositiveSums[dataPointX] ? dataPointYPositiveSums[dataPointX] += dataPointY : dataPointYPositiveSums[dataPointX] = dataPointY : dataPointYNegativeSums[dataPointX] ? dataPointYNegativeSums[dataPointX] += dataPointY : dataPointYNegativeSums[dataPointX] = dataPointY;
            }
            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }
        for (i in dataPointYPositiveSums) {
            if (isNaN(i)) continue;
            var ySum = dataPointYPositiveSums[i];
            ySum < axisYDataInfo.min && (axisYDataInfo.min = ySum);
            ySum > axisYDataInfo.max && (axisYDataInfo.max = ySum);
            if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax) continue;
            ySum < axisYDataInfo.viewPortMin && (axisYDataInfo.viewPortMin = ySum);
            ySum > axisYDataInfo.viewPortMax && (axisYDataInfo.viewPortMax = ySum);
        }
        for (i in dataPointYNegativeSums) {
            if (isNaN(i)) continue;
            var ySum = dataPointYNegativeSums[i];
            ySum < axisYDataInfo.min && (axisYDataInfo.min = ySum);
            ySum > axisYDataInfo.max && (axisYDataInfo.max = ySum);
            if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax) continue;
            ySum < axisYDataInfo.viewPortMin && (axisYDataInfo.viewPortMin = ySum);
            ySum > axisYDataInfo.viewPortMax && (axisYDataInfo.viewPortMax = ySum);
        }
    };
    Chart.prototype._processStacked100PlotUnit = function(plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1) return;
        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;
        var dataPointX, dataPointY;
        var isDateTime = false;
        var containsPositiveY = false;
        var containsNegativeY = false;
        var dataPointYSums = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;
            if ("normal" === dataSeries.axisPlacement || "xySwapped" === dataSeries.axisPlacement) {
                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : this._options.axisX && this._options.axisX.minimum ? this._options.axisX.minimum : -1/0;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : this._options.axisX && this._options.axisX.maximum ? this._options.axisX.maximum : 1/0;
            }
            (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || "dateTime" === dataSeries.xValueType) && (isDateTime = true);
            for (i = 0; i < dataSeries.dataPoints.length; i++) {
                "undefined" == typeof dataSeries.dataPoints[i].x && (dataSeries.dataPoints[i].x = i);
                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();
                } else dataPointX = dataSeries.dataPoints[i].x;
                dataPointY = dataSeries.dataPoints[i].y;
                dataPointX < axisXDataInfo.min && (axisXDataInfo.min = dataPointX);
                dataPointX > axisXDataInfo.max && (axisXDataInfo.max = dataPointX);
                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    0 > xDiff && (xDiff = -1 * xDiff);
                    axisXDataInfo.minDiff > xDiff && 0 !== xDiff && (axisXDataInfo.minDiff = xDiff);
                }
                if (plotAreaXMin > dataPointX && !isFirstDPInViewPort) continue;
                if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;
                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) isLastDPInViewPort = true; else if (dataPointX > plotAreaXMax && isLastDPInViewPort) continue;
                dataSeries.dataPoints[i].label && (plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label);
                dataPointX < axisXDataInfo.viewPortMin && (axisXDataInfo.viewPortMin = dataPointX);
                dataPointX > axisXDataInfo.viewPortMax && (axisXDataInfo.viewPortMax = dataPointX);
                if (null === dataPointY) continue;
                plotUnit.yTotals[dataPointX] = (plotUnit.yTotals[dataPointX] ? plotUnit.yTotals[dataPointX] : 0) + Math.abs(dataPointY);
                dataPointY >= 0 ? containsPositiveY = true : containsNegativeY = true;
                dataPointYSums[dataPointX] ? dataPointYSums[dataPointX] += Math.abs(dataPointY) : dataPointYSums[dataPointX] = Math.abs(dataPointY);
            }
            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }
        if (containsPositiveY && !containsNegativeY) {
            axisYDataInfo.max = 99;
            axisYDataInfo.min = 1;
        } else if (containsPositiveY && containsNegativeY) {
            axisYDataInfo.max = 99;
            axisYDataInfo.min = -99;
        } else if (!containsPositiveY && containsNegativeY) {
            axisYDataInfo.max = -1;
            axisYDataInfo.min = -99;
        }
        axisYDataInfo.viewPortMin = axisYDataInfo.min;
        axisYDataInfo.viewPortMax = axisYDataInfo.max;
        plotUnit.dataPointYSums = dataPointYSums;
    };
    Chart.prototype._processMultiYPlotUnit = function(plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1) return;
        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;
        var dataPointX, dataPointY, dataPointYMin, dataPointYMax;
        var isDateTime = false;
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;
            if ("normal" === dataSeries.axisPlacement || "xySwapped" === dataSeries.axisPlacement) {
                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : this._options.axisX && this._options.axisX.minimum ? this._options.axisX.minimum : -1/0;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : this._options.axisX && this._options.axisX.maximum ? this._options.axisX.maximum : 1/0;
            }
            (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || "dateTime" === dataSeries.xValueType) && (isDateTime = true);
            for (i = 0; i < dataSeries.dataPoints.length; i++) {
                "undefined" == typeof dataSeries.dataPoints[i].x && (dataSeries.dataPoints[i].x = i);
                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();
                } else dataPointX = dataSeries.dataPoints[i].x;
                dataPointY = dataSeries.dataPoints[i].y;
                if (dataPointY && dataPointY.length) {
                    dataPointYMin = Math.min.apply(null, dataPointY);
                    dataPointYMax = Math.max.apply(null, dataPointY);
                }
                dataPointX < axisXDataInfo.min && (axisXDataInfo.min = dataPointX);
                dataPointX > axisXDataInfo.max && (axisXDataInfo.max = dataPointX);
                dataPointYMin < axisYDataInfo.min && (axisYDataInfo.min = dataPointYMin);
                dataPointYMax > axisYDataInfo.max && (axisYDataInfo.max = dataPointYMax);
                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    0 > xDiff && (xDiff = -1 * xDiff);
                    axisXDataInfo.minDiff > xDiff && 0 !== xDiff && (axisXDataInfo.minDiff = xDiff);
                }
                if (plotAreaXMin > dataPointX && !isFirstDPInViewPort) continue;
                if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;
                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) isLastDPInViewPort = true; else if (dataPointX > plotAreaXMax && isLastDPInViewPort) continue;
                dataSeries.dataPoints[i].label && (plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label);
                dataPointX < axisXDataInfo.viewPortMin && (axisXDataInfo.viewPortMin = dataPointX);
                dataPointX > axisXDataInfo.viewPortMax && (axisXDataInfo.viewPortMax = dataPointX);
                if (null === dataPointY) continue;
                dataPointYMin < axisYDataInfo.viewPortMin && (axisYDataInfo.viewPortMin = dataPointYMin);
                dataPointYMax > axisYDataInfo.viewPortMax && (axisYDataInfo.viewPortMax = dataPointYMax);
            }
            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }
    };
    Chart.prototype.getDataPointAtXY = function(mouseX, mouseY, getClosest) {
        getClosest = getClosest || false;
        var results = [];
        for (var i = this._dataInRenderedOrder.length - 1; i >= 0; i--) {
            var dataSeries = this._dataInRenderedOrder[i];
            var result = null;
            result = dataSeries.getDataPointAtXY(mouseX, mouseY, getClosest);
            result && results.push(result);
        }
        var closestResult = null;
        var onlyLineAreaTypes = false;
        for (var m = 0; m < results.length; m++) if ("line" === results[m].dataSeries.type || "stepLine" === results[m].dataSeries.type || "area" === results[m].dataSeries.type || "stepArea" === results[m].dataSeries.type) {
            var markerSize = getProperty("markerSize", results[m].dataPoint, results[m].dataSeries) || 8;
            if (results[m].distance <= markerSize / 2) {
                onlyLineAreaTypes = true;
                break;
            }
        }
        for (m = 0; m < results.length; m++) {
            if (onlyLineAreaTypes && "line" !== results[m].dataSeries.type && "stepLine" !== results[m].dataSeries.type && "area" !== results[m].dataSeries.type && "stepArea" !== results[m].dataSeries.type) continue;
            closestResult ? results[m].distance <= closestResult.distance && (closestResult = results[m]) : closestResult = results[m];
        }
        return closestResult;
    };
    Chart.prototype.getObjectAtXY = function(mouseX, mouseY, getClosest) {
        getClosest = getClosest || false;
        var id = null;
        var dataPointInfo = this.getDataPointAtXY(mouseX, mouseY, getClosest);
        if (dataPointInfo) id = dataPointInfo.dataSeries.dataPointIds[dataPointInfo.dataPointIndex]; else if (isCanvasSupported) id = getObjectId(mouseX, mouseY, this._eventManager.ghostCtx); else for (var i = 0; i < this.legend.items.length; i++) {
            var item = this.legend.items[i];
            mouseX >= item.x1 && mouseX <= item.x2 && mouseY >= item.y1 && mouseY <= item.y2 && (id = item.id);
        }
        return id;
    };
    Chart.prototype.getAutoFontSize = function(standardSize, width, height) {
        width = width || this.width;
        height = height || this.height;
        var fontSizeScaleFactor = standardSize / 400;
        return Math.round(Math.min(this.width, this.height) * fontSizeScaleFactor);
    };
    Chart.prototype.resetOverlayedCanvas = function() {
        this.overlaidCanvasCtx.clearRect(0, 0, this.width, this.height);
    };
    Chart.prototype.clearCanvas = function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        if (this.backgroundColor) {
            this.ctx.fillStyle = this.backgroundColor;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    };
    Chart.prototype.attachEvent = function(param) {
        this._events.push(param);
    };
    Chart.prototype._touchEventHandler = function(ev) {
        if (!ev.changedTouches || !this.interactivityEnabled) return;
        var mouseEvents = [];
        var touches = ev.changedTouches;
        var first = touches ? touches[0] : ev;
        var touchCurrentCoordinates = null;
        switch (ev.type) {
          case "touchstart":
          case "MSPointerDown":
            mouseEvents = [ "mousemove", "mousedown" ];
            this._lastTouchData = getMouseCoordinates(first);
            this._lastTouchData.time = new Date();
            break;

          case "touchmove":
          case "MSPointerMove":
            mouseEvents = [ "mousemove" ];
            break;

          case "touchend":
          case "MSPointerUp":
            mouseEvents = "touchstart" === this._lastTouchEventType || "MSPointerDown" === this._lastTouchEventType ? [ "mouseup", "click" ] : [ "mouseup" ];
            break;

          default:
            return;
        }
        if (touches && touches.length > 1) return;
        touchCurrentCoordinates = getMouseCoordinates(first);
        touchCurrentCoordinates.time = new Date();
        try {
            var dy = touchCurrentCoordinates.y - this._lastTouchData.y;
            {
                touchCurrentCoordinates.x - this._lastTouchData.x;
            }
            var dt = touchCurrentCoordinates.time - this._lastTouchData.time;
            if (Math.abs(dy) > 15 && (!!this._lastTouchData.scroll || 200 > dt)) {
                this._lastTouchData.scroll = true;
                var win = window.parent || window;
                win && win.scrollBy && win.scrollBy(0, -dy);
            }
        } catch (e) {}
        this._lastTouchEventType = ev.type;
        if (!!this._lastTouchData.scroll && this.zoomEnabled) {
            this.isDrag && this.resetOverlayedCanvas();
            this.isDrag = false;
            return;
        }
        for (var i = 0; i < mouseEvents.length; i++) {
            var type = mouseEvents[i];
            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
            first.target.dispatchEvent(simulatedEvent);
            ev.preventManipulation && ev.preventManipulation();
            ev.preventDefault && ev.preventDefault();
        }
    };
    Chart.prototype._mouseEventHandler = function(ev) {
        if (!this.interactivityEnabled) return;
        if (this._ignoreNextEvent) {
            this._ignoreNextEvent = false;
            return;
        }
        ev.preventManipulation && ev.preventManipulation();
        ev.preventDefault && ev.preventDefault();
        "undefined" == typeof ev.target && ev.srcElement && (ev.target = ev.srcElement);
        var xy = getMouseCoordinates(ev);
        var type = ev.type;
        var eventParam;
        var rightclick;
        if (!ev) {
            window.event;
        }
        ev.which ? rightclick = 3 == ev.which : ev.button && (rightclick = 2 == ev.button);
        if (isDebugMode && window.console) {
            window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);
            rightclick && window.console.log(ev.which);
            "mouseup" === type && window.console.log("mouseup");
        }
        if (rightclick) return;
        if (Chart.capturedEventParam) {
            eventParam = Chart.capturedEventParam;
            if ("mouseup" === type) {
                Chart.capturedEventParam = null;
                eventParam.chart.overlaidCanvas.releaseCapture ? eventParam.chart.overlaidCanvas.releaseCapture() : document.body.removeEventListener("mouseup", eventParam.chart._mouseEventHandler, false);
            }
            eventParam.hasOwnProperty(type) && eventParam[type].call(eventParam.context, xy.x, xy.y);
        } else if (this._events) {
            for (var i = 0; i < this._events.length; i++) {
                if (!this._events[i].hasOwnProperty(type)) continue;
                eventParam = this._events[i];
                var bounds = eventParam.bounds;
                if (xy.x >= bounds.x1 && xy.x <= bounds.x2 && xy.y >= bounds.y1 && xy.y <= bounds.y2) {
                    eventParam[type].call(eventParam.context, xy.x, xy.y);
                    if ("mousedown" === type && true === eventParam.capture) {
                        Chart.capturedEventParam = eventParam;
                        this.overlaidCanvas.setCapture ? this.overlaidCanvas.setCapture() : document.body.addEventListener("mouseup", this._mouseEventHandler, false);
                    } else "mouseup" === type && (eventParam.chart.overlaidCanvas.releaseCapture ? eventParam.chart.overlaidCanvas.releaseCapture() : document.body.removeEventListener("mouseup", this._mouseEventHandler, false));
                    break;
                }
                eventParam = null;
            }
            ev.target.style.cursor = eventParam && eventParam.cursor ? eventParam.cursor : this._defaultCursor;
        }
        if (this._toolTip && this._toolTip.enabled) {
            var plotArea = this.plotArea;
            (xy.x < plotArea.x1 || xy.x > plotArea.x2 || xy.y < plotArea.y1 || xy.y > plotArea.y2) && this._toolTip.hide();
        }
        this.isDrag && this.zoomEnabled || !this._eventManager || this._eventManager.mouseEventHandler(ev);
    };
    Chart.prototype._plotAreaMouseDown = function(x, y) {
        this.isDrag = true;
        this.dragStartPoint = "none" !== this.plotInfo.axisPlacement ? {
            x: x,
            y: y,
            xMinimum: this.axisX.minimum,
            xMaximum: this.axisX.maximum
        } : {
            x: x,
            y: y
        };
    };
    Chart.prototype._plotAreaMouseUp = function(x, y) {
        if (("normal" === this.plotInfo.axisPlacement || "xySwapped" === this.plotInfo.axisPlacement) && this.isDrag) {
            var dragDelta = 0;
            var dragValue = 0;
            var axisXProps = this.axisX.lineCoordinates;
            if ("xySwapped" === this.plotInfo.axisPlacement) {
                dragDelta = y - this.dragStartPoint.y;
                dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.height * dragDelta;
            } else {
                dragDelta = this.dragStartPoint.x - x;
                dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.width * dragDelta;
            }
            if (Math.abs(dragDelta) > 2) {
                if (this.panEnabled) {
                    var reRender = false;
                    var overFlow = 0;
                    if (this.axisX.sessionVariables.internalMinimum < this.axisX._absoluteMinimum) {
                        overFlow = this.axisX._absoluteMinimum - this.axisX.sessionVariables.internalMinimum;
                        this.axisX.sessionVariables.internalMinimum += overFlow;
                        this.axisX.sessionVariables.internalMaximum += overFlow;
                        reRender = true;
                    } else if (this.axisX.sessionVariables.internalMaximum > this.axisX._absoluteMaximum) {
                        overFlow = this.axisX.sessionVariables.internalMaximum - this.axisX._absoluteMaximum;
                        this.axisX.sessionVariables.internalMaximum -= overFlow;
                        this.axisX.sessionVariables.internalMinimum -= overFlow;
                        reRender = true;
                    }
                    reRender && this.render();
                } else if (this.zoomEnabled) {
                    this.resetOverlayedCanvas();
                    if (!this.dragStartPoint) return;
                    if ("xySwapped" === this.plotInfo.axisPlacement) {
                        var selectedRegion = {
                            y1: Math.min(this.dragStartPoint.y, y),
                            y2: Math.max(this.dragStartPoint.y, y)
                        };
                        if (Math.abs(selectedRegion.y1 - selectedRegion.y2) > 1) {
                            var axisXProps = this.axisX.lineCoordinates;
                            var minX = this.axisX.maximum - (this.axisX.maximum - this.axisX.minimum) / axisXProps.height * (selectedRegion.y2 - axisXProps.y1);
                            var maxX = this.axisX.maximum - (this.axisX.maximum - this.axisX.minimum) / axisXProps.height * (selectedRegion.y1 - axisXProps.y1);
                            minX = Math.max(minX, this.axisX.dataInfo.min);
                            maxX = Math.min(maxX, this.axisX.dataInfo.max);
                            if (Math.abs(maxX - minX) > 2 * Math.abs(this.axisX.dataInfo.minDiff)) {
                                this.axisX.sessionVariables.internalMinimum = minX;
                                this.axisX.sessionVariables.internalMaximum = maxX;
                                this.render();
                            }
                        }
                    } else if ("normal" === this.plotInfo.axisPlacement) {
                        var selectedRegion = {
                            x1: Math.min(this.dragStartPoint.x, x),
                            x2: Math.max(this.dragStartPoint.x, x)
                        };
                        if (Math.abs(selectedRegion.x1 - selectedRegion.x2) > 1) {
                            var axisXProps = this.axisX.lineCoordinates;
                            var minX = (this.axisX.maximum - this.axisX.minimum) / axisXProps.width * (selectedRegion.x1 - axisXProps.x1) + this.axisX.minimum;
                            var maxX = (this.axisX.maximum - this.axisX.minimum) / axisXProps.width * (selectedRegion.x2 - axisXProps.x1) + this.axisX.minimum;
                            minX = Math.max(minX, this.axisX.dataInfo.min);
                            maxX = Math.min(maxX, this.axisX.dataInfo.max);
                            if (Math.abs(maxX - minX) > 2 * Math.abs(this.axisX.dataInfo.minDiff)) {
                                this.axisX.sessionVariables.internalMinimum = minX;
                                this.axisX.sessionVariables.internalMaximum = maxX;
                                this.render();
                            }
                        }
                    }
                }
                this._ignoreNextEvent = true;
                if (this.zoomEnabled && "none" === this._zoomButton.style.display) {
                    show(this._zoomButton, this._resetButton);
                    setButtonState(this, this._zoomButton, "pan");
                    setButtonState(this, this._resetButton, "reset");
                }
            }
        }
        this.isDrag = false;
    };
    Chart.prototype._plotAreaMouseMove = function(x, y) {
        if (this.isDrag && "none" !== this.plotInfo.axisPlacement) {
            var dragDelta = 0;
            var dragValue = 0;
            var axisXProps = this.axisX.lineCoordinates;
            if ("xySwapped" === this.plotInfo.axisPlacement) {
                dragDelta = y - this.dragStartPoint.y;
                dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.height * dragDelta;
            } else {
                dragDelta = this.dragStartPoint.x - x;
                dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.width * dragDelta;
            }
            Math.abs(dragDelta) > 2 && Math.abs(dragDelta) < 8 && (this.panEnabled || this.zoomEnabled) ? this._toolTip.hide() : !this._toolTip.enabled || this.panEnabled || this.zoomEnabled || this._toolTip.mouseMoveHandler(x, y);
            if (Math.abs(dragDelta) > 2 && (this.panEnabled || this.zoomEnabled)) if (this.panEnabled) {
                this.axisX.sessionVariables.internalMinimum = this.dragStartPoint.xMinimum + dragValue;
                this.axisX.sessionVariables.internalMaximum = this.dragStartPoint.xMaximum + dragValue;
                var overFlow = 0;
                if (this.axisX.sessionVariables.internalMinimum < this.axisX._absoluteMinimum - convertToNumber(this.axisX.interval, this.axisX.intervalType)) {
                    overFlow = this.axisX._absoluteMinimum - convertToNumber(this.axisX.interval, this.axisX.intervalType) - this.axisX.sessionVariables.internalMinimum;
                    this.axisX.sessionVariables.internalMinimum += overFlow;
                    this.axisX.sessionVariables.internalMaximum += overFlow;
                } else if (this.axisX.sessionVariables.internalMaximum > this.axisX._absoluteMaximum + convertToNumber(this.axisX.interval, this.axisX.intervalType)) {
                    overFlow = this.axisX.sessionVariables.internalMaximum - (this.axisX._absoluteMaximum + convertToNumber(this.axisX.interval, this.axisX.intervalType));
                    this.axisX.sessionVariables.internalMaximum -= overFlow;
                    this.axisX.sessionVariables.internalMinimum -= overFlow;
                }
                var _this = this;
                clearTimeout(this._panTimerId);
                this._panTimerId = setTimeout(function() {
                    _this.render();
                }, 0);
            } else if (this.zoomEnabled) {
                var plotAreaBounds = this.plotArea;
                this.resetOverlayedCanvas();
                var alpha = this.overlaidCanvasCtx.globalAlpha;
                this.overlaidCanvasCtx.globalAlpha = .7;
                this.overlaidCanvasCtx.fillStyle = "#A0ABB8";
                "xySwapped" === this.plotInfo.axisPlacement ? this.overlaidCanvasCtx.fillRect(plotAreaBounds.x1, this.dragStartPoint.y, plotAreaBounds.x2 - plotAreaBounds.x1, y - this.dragStartPoint.y) : "normal" === this.plotInfo.axisPlacement && this.overlaidCanvasCtx.fillRect(this.dragStartPoint.x, plotAreaBounds.y1, x - this.dragStartPoint.x, plotAreaBounds.y2 - plotAreaBounds.y1);
                this.overlaidCanvasCtx.globalAlpha = alpha;
            }
        } else this._toolTip.enabled && this._toolTip.mouseMoveHandler(x, y);
    };
    Chart.prototype.preparePlotArea = function() {
        var plotArea = this.plotArea;
        var yAxis = this.axisY ? this.axisY : this.axisY2;
        !isCanvasSupported && (plotArea.x1 > 0 || plotArea.y1 > 0) && plotArea.ctx.translate(plotArea.x1, plotArea.y1);
        if (this.axisX && yAxis) {
            plotArea.x1 = this.axisX.lineCoordinates.x1 < this.axisX.lineCoordinates.x2 ? this.axisX.lineCoordinates.x1 : yAxis.lineCoordinates.x1;
            plotArea.y1 = this.axisX.lineCoordinates.y1 < yAxis.lineCoordinates.y1 ? this.axisX.lineCoordinates.y1 : yAxis.lineCoordinates.y1;
            plotArea.x2 = this.axisX.lineCoordinates.x2 > yAxis.lineCoordinates.x2 ? this.axisX.lineCoordinates.x2 : yAxis.lineCoordinates.x2;
            plotArea.y2 = this.axisX.lineCoordinates.y2 > this.axisX.lineCoordinates.y1 ? this.axisX.lineCoordinates.y2 : yAxis.lineCoordinates.y2;
            plotArea.width = plotArea.x2 - plotArea.x1;
            plotArea.height = plotArea.y2 - plotArea.y1;
        } else {
            var freeSpace = this.layoutManager.getFreeSpace();
            plotArea.x1 = freeSpace.x1;
            plotArea.x2 = freeSpace.x2;
            plotArea.y1 = freeSpace.y1;
            plotArea.y2 = freeSpace.y2;
            plotArea.width = freeSpace.width;
            plotArea.height = freeSpace.height;
        }
        if (!isCanvasSupported) {
            plotArea.canvas.width = plotArea.width;
            plotArea.canvas.height = plotArea.height;
            plotArea.canvas.style.left = plotArea.x1 + "px";
            plotArea.canvas.style.top = plotArea.y1 + "px";
            (plotArea.x1 > 0 || plotArea.y1 > 0) && plotArea.ctx.translate(-plotArea.x1, -plotArea.y1);
        }
    };
    Chart.prototype.getPixelCoordinatesOnPlotArea = function(x, y) {
        return {
            x: this.axisX.getPixelCoordinatesOnAxis(x).x,
            y: this.axisY.getPixelCoordinatesOnAxis(y).y
        };
    };
    Chart.prototype.renderIndexLabels = function(targetCtx) {
        var ctx = targetCtx || this.plotArea.ctx;
        ctx.textBaseline = "middle";
        var plotArea = this.plotArea;
        for (var i = 0; i < this._indexLabels.length; i++) {
            var indexLabel = this._indexLabels[i];
            var x, y, angle;
            ctx.fillStyle = getProperty("indexLabelFontColor", indexLabel.dataPoint, indexLabel.dataSeries);
            ctx.font = getFontString("indexLabel", indexLabel.dataPoint, indexLabel.dataSeries);
            var indexLabelText = this.replaceKeywordsWithValue(getProperty("indexLabel", indexLabel.dataPoint, indexLabel.dataSeries), indexLabel.dataPoint, indexLabel.dataSeries, null, indexLabel.indexKeyword);
            var textSize = {
                width: ctx.measureText(indexLabelText).width,
                height: getProperty("indexLabelFontSize", indexLabel.dataPoint, indexLabel.dataSeries)
            };
            var placement = getProperty("indexLabelPlacement", indexLabel.dataPoint, indexLabel.dataSeries);
            var orientation = getProperty("indexLabelOrientation", indexLabel.dataPoint, indexLabel.dataSeries);
            var angle = 0;
            var yMinLimit = 0;
            var yMaxLimit = 0;
            var xMinLimit = 0;
            var xMaxLimit = 0;
            var offsetX = 0, offsetY = 0;
            var direction = indexLabel.direction;
            var axisX = indexLabel.dataSeries.axisX;
            var axisY = indexLabel.dataSeries.axisY;
            if (indexLabel.dataPoint.x < axisX.minimum || indexLabel.dataPoint.x > axisX.maximum || indexLabel.dataPoint.y < axisY.minimum || indexLabel.dataPoint.y > axisY.maximum) continue;
            if ("column" === indexLabel.chartType || "stackedColumn" === indexLabel.chartType || "stackedColumn100" === indexLabel.chartType || "bar" === indexLabel.chartType || "stackedBar" === indexLabel.chartType || "stackedBar100" === indexLabel.chartType || "candlestick" === indexLabel.chartType || "ohlc" === indexLabel.chartType || "rangeColumn" === indexLabel.chartType || "rangeBar" === indexLabel.chartType) {
                offsetY = 5;
                offsetX = 5;
                {
                    Math.abs(indexLabel.bounds.x1, indexLabel.bounds.x2);
                }
                {
                    Math.abs(indexLabel.bounds.y1, indexLabel.bounds.y2);
                }
                if ("normal" === this.plotInfo.axisPlacement) {
                    if ("inside" !== placement) {
                        yMinLimit = plotArea.y1;
                        yMaxLimit = plotArea.y2;
                    } else {
                        yMinLimit = indexLabel.bounds.y1;
                        yMaxLimit = indexLabel.bounds.y2;
                    }
                    if ("horizontal" === orientation) {
                        x = indexLabel.point.x - textSize.width / 2;
                        y = direction >= 0 ? indexLabel.point.y - textSize.height / 2 - offsetY < yMinLimit + textSize.height / 2 ? "auto" === placement ? Math.min(Math.max(indexLabel.point.y, yMinLimit) + textSize.height / 2 + 1, yMaxLimit - textSize.height / 2 - offsetY) : Math.min(yMinLimit + textSize.height / 2 + 1, yMaxLimit - textSize.height / 2 - offsetY) : Math.min(indexLabel.point.y - textSize.height / 2 - offsetY + 1, yMaxLimit - textSize.height / 2 - offsetY) : indexLabel.point.y + textSize.height / 2 + offsetY > yMaxLimit - textSize.height / 2 - 1 ? "auto" === placement ? Math.max(Math.min(indexLabel.point.y, yMaxLimit) - textSize.height / 2 - 1, yMinLimit + textSize.height / 2 + offsetY) : Math.max(yMaxLimit - textSize.height / 2 - 1, yMinLimit + textSize.height / 2 + offsetY) : Math.max(indexLabel.point.y + textSize.height / 2 + offsetY, yMinLimit + textSize.height / 2 + offsetY);
                    } else if ("vertical" === orientation) {
                        x = indexLabel.point.x;
                        y = direction >= 0 ? indexLabel.point.y - offsetY < yMinLimit + textSize.width + 1 ? "auto" === placement ? Math.min(Math.max(indexLabel.point.y, yMinLimit) + textSize.width + 1, yMaxLimit) : Math.min(yMinLimit + textSize.width + 1, yMaxLimit) : Math.min(indexLabel.point.y - offsetY, yMaxLimit - 1) : indexLabel.point.y + textSize.width + offsetY > yMaxLimit - 1 ? "auto" === placement ? Math.max(Math.min(indexLabel.point.y, yMaxLimit) - offsetY, yMinLimit) : Math.max(yMaxLimit - 1, yMinLimit) : Math.max(indexLabel.point.y + textSize.width + offsetY, yMinLimit);
                        angle = -90;
                    }
                } else if ("xySwapped" === this.plotInfo.axisPlacement) {
                    if ("inside" !== placement) {
                        xMinLimit = plotArea.x1;
                        xMaxLimit = plotArea.x2;
                    } else {
                        xMinLimit = indexLabel.bounds.x1;
                        xMaxLimit = indexLabel.bounds.x2;
                    }
                    if ("horizontal" === orientation) {
                        y = indexLabel.point.y;
                        x = direction >= 0 ? indexLabel.point.x + offsetX > xMaxLimit - textSize.width ? "auto" === placement ? Math.max(Math.min(indexLabel.point.x, xMaxLimit) - textSize.width, xMinLimit) : Math.max(xMaxLimit - textSize.width, xMinLimit) : Math.max(indexLabel.point.x + offsetX, xMinLimit) : indexLabel.point.x - textSize.width - offsetX < xMinLimit ? "auto" === placement ? Math.min(Math.max(indexLabel.point.x, xMinLimit) + 1, xMaxLimit) : Math.min(xMinLimit + 1, xMaxLimit) : Math.min(indexLabel.point.x - textSize.width - offsetX, xMaxLimit);
                    } else if ("vertical" === orientation) {
                        y = indexLabel.point.y + textSize.width / 2;
                        x = direction >= 0 ? indexLabel.point.x + textSize.height / 2 + offsetX > xMaxLimit - textSize.height / 2 ? "auto" === placement ? Math.max(Math.min(indexLabel.point.x, xMaxLimit) - textSize.height / 2, xMinLimit) : Math.max(xMaxLimit - textSize.height / 2, xMinLimit) : Math.max(indexLabel.point.x + textSize.height / 2 + offsetX, xMinLimit) : indexLabel.point.x - textSize.height / 2 - offsetX < xMinLimit + textSize.height / 2 ? "auto" === placement ? Math.min(Math.max(indexLabel.point.x, xMinLimit) + textSize.height / 2, xMaxLimit + textSize.height / 2) : Math.min(xMinLimit + textSize.height / 2, xMaxLimit + textSize.height / 2) : Math.min(indexLabel.point.x - textSize.height / 2 - offsetX, xMaxLimit + textSize.height / 2);
                        angle = -90;
                    }
                }
            } else {
                offsetY = 5;
                if ("horizontal" === orientation) {
                    x = indexLabel.point.x - textSize.width / 2;
                    "bubble" === indexLabel.chartType && (offsetY = -textSize.height / 2);
                    y = direction > 0 ? Math.max(indexLabel.point.y - textSize.height / 2 - offsetY, plotArea.y1 + textSize.height / 2) : Math.min(indexLabel.point.y + textSize.height / 2 + offsetY, plotArea.y2 - textSize.height / 2);
                } else if ("vertical" === orientation) {
                    x = indexLabel.point.x;
                    "bubble" === indexLabel.chartType && (offsetY = -textSize.width / 2);
                    y = direction > 0 ? Math.max(indexLabel.point.y - offsetY, plotArea.y1 + textSize.width) : Math.min(indexLabel.point.y + textSize.width + offsetY, plotArea.y2);
                    angle = -90;
                }
            }
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 180 * angle);
            ctx.fillText(indexLabelText, 0, 0);
            ctx.restore();
        }
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.fadeInAnimation,
            easingFunction: AnimationHelper.easing.easeInQuad,
            animationBase: 0,
            startTimePercent: .7
        };
        return animationInfo;
    };
    Chart.prototype.renderLine = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var ghostCtx = this._eventManager.ghostCtx;
        ctx.save();
        var plotArea = this.plotArea;
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        var markers = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            ctx.lineWidth = dataSeries.lineThickness;
            var dataPoints = dataSeries.dataPoints;
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.strokeStyle = hexColor;
            ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;
            var colorSet = dataSeries._colorSet;
            var color = colorSet[0];
            ctx.strokeStyle = color;
            var isFirstDataPointInPlotArea = true;
            var x, y, i = 0;
            var dataPointX;
            ctx.beginPath();
            if (dataPoints.length > 0) {
                var prevDataNull = false;
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) {
                        if (i > 0) {
                            ctx.stroke();
                            isCanvasSupported && ghostCtx.stroke();
                        }
                        prevDataNull = true;
                        continue;
                    }
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x,
                        y1: y
                    };
                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }
                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    } else {
                        ctx.lineTo(x, y);
                        isCanvasSupported && ghostCtx.lineTo(x, y);
                        if (i % 500 == 0) {
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }
                        }
                    }
                    if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);
                        var markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                    }
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "line",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: y
                        },
                        color: color
                    });
                }
                ctx.stroke();
                isCanvasSupported && ghostCtx.stroke();
            }
        }
        RenderHelper.drawMarkers(markers);
        ctx.restore();
        ctx.beginPath();
        isCanvasSupported && ghostCtx.beginPath();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderStepLine = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var ghostCtx = this._eventManager.ghostCtx;
        ctx.save();
        var plotArea = this.plotArea;
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        var markers = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            ctx.lineWidth = dataSeries.lineThickness;
            var dataPoints = dataSeries.dataPoints;
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.strokeStyle = hexColor;
            ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;
            var colorSet = dataSeries._colorSet;
            var color = colorSet[0];
            ctx.strokeStyle = color;
            var isFirstDataPointInPlotArea = true;
            var x, y, i = 0;
            var dataPointX;
            ctx.beginPath();
            if (dataPoints.length > 0) {
                var prevDataNull = false;
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) {
                        if (i > 0) {
                            ctx.stroke();
                            isCanvasSupported && ghostCtx.stroke();
                        }
                        prevDataNull = true;
                        continue;
                    }
                    var prevY = y;
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x,
                        y1: y
                    };
                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }
                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    } else {
                        ctx.lineTo(x, prevY);
                        isCanvasSupported && ghostCtx.lineTo(x, prevY);
                        ctx.lineTo(x, y);
                        isCanvasSupported && ghostCtx.lineTo(x, y);
                        if (i % 500 == 0) {
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }
                        }
                    }
                    if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);
                        var markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                    }
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "stepLine",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: y
                        },
                        color: color
                    });
                }
                ctx.stroke();
                isCanvasSupported && ghostCtx.stroke();
            }
        }
        RenderHelper.drawMarkers(markers);
        ctx.restore();
        ctx.beginPath();
        isCanvasSupported && ghostCtx.beginPath();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderSpline = function(plotUnit) {
        function renderBezier(pixels) {
            var bp = getBezierPoints(pixels, 2);
            if (bp.length > 0) {
                ctx.beginPath();
                isCanvasSupported && ghostCtx.beginPath();
                ctx.moveTo(bp[0].x, bp[0].y);
                isCanvasSupported && ghostCtx.moveTo(bp[0].x, bp[0].y);
                for (var i = 0; i < bp.length - 3; i += 3) {
                    ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);
                    isCanvasSupported && ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);
                    if (i > 0 && i % 3e3 === 0) {
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(bp[i + 3].x, bp[i + 3].y);
                        if (isCanvasSupported) {
                            ghostCtx.stroke();
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(bp[i + 3].x, bp[i + 3].y);
                        }
                    }
                }
                ctx.stroke();
                isCanvasSupported && ghostCtx.stroke();
            }
        }
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var ghostCtx = this._eventManager.ghostCtx;
        ctx.save();
        var plotArea = this.plotArea;
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        var markers = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            ctx.lineWidth = dataSeries.lineThickness;
            var dataPoints = dataSeries.dataPoints;
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.strokeStyle = hexColor;
            ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;
            var colorSet = dataSeries._colorSet;
            var color = colorSet[0];
            ctx.strokeStyle = color;
            var x, y, i = 0;
            var dataPointX;
            var pixels = [];
            ctx.beginPath();
            if (dataPoints.length > 0) for (i = 0; i < dataPoints.length; i++) {
                dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                if ("number" != typeof dataPoints[i].y) {
                    if (i > 0) {
                        renderBezier(pixels);
                        pixels = [];
                    }
                    continue;
                }
                x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                var id = dataSeries.dataPointIds[i];
                this._eventManager.objectMap[id] = {
                    id: id,
                    objectType: "dataPoint",
                    dataSeriesIndex: dataSeriesIndex,
                    dataPointIndex: i,
                    x1: x,
                    y1: y
                };
                pixels[pixels.length] = {
                    x: x,
                    y: y
                };
                if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                    var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                    markers.push(markerProps);
                    var markerColor = intToHexColorString(id);
                    isCanvasSupported && markers.push({
                        x: x,
                        y: y,
                        ctx: ghostCtx,
                        type: markerProps.type,
                        size: markerProps.size,
                        color: markerColor,
                        borderColor: markerColor,
                        borderThickness: markerProps.borderThickness
                    });
                }
                (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                    chartType: "spline",
                    dataPoint: dataPoints[i],
                    dataSeries: dataSeries,
                    point: {
                        x: x,
                        y: y
                    },
                    color: color
                });
            }
            renderBezier(pixels);
        }
        RenderHelper.drawMarkers(markers);
        ctx.restore();
        ctx.beginPath();
        isCanvasSupported && ghostCtx.beginPath();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    var drawRect = function(ctx, x1, y1, x2, y2, color, borderThickness, borderColor, top, bottom, left, right, fillOpacity) {
        "undefined" == typeof fillOpacity && (fillOpacity = 1);
        borderThickness = borderThickness || 0;
        borderColor = borderColor || "black";
        var a1 = x1, a2 = x2, b1 = y1, b2 = y2;
        if (x2 - x1 > 15 && y2 - y1 > 15) var bevelDepth = 8; else var bevelDepth = .35 * Math.min(x2 - x1, y2 - y1);
        var color2 = "rgba(255, 255, 255, .4)";
        var color3 = "rgba(255, 255, 255, 0.1)";
        var color1 = color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.save();
        ctx.fillStyle = color1;
        ctx.globalAlpha = fillOpacity;
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        ctx.globalAlpha = 1;
        if (borderThickness > 0) {
            var offset = borderThickness % 2 === 0 ? 0 : .5;
            ctx.beginPath();
            ctx.lineWidth = borderThickness;
            ctx.strokeStyle = borderColor;
            ctx.moveTo(x1, y1);
            ctx.rect(x1 - offset, y1 - offset, x2 - x1 + 2 * offset, y2 - y1 + 2 * offset);
            ctx.stroke();
        }
        ctx.restore();
        if (true === top) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x2, y1);
            ctx.closePath();
            var grd = ctx.createLinearGradient((x2 + x1) / 2, b1 + bevelDepth, (x2 + x1) / 2, b1);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color2);
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.restore();
        }
        if (true === bottom) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y2);
            ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            var grd = ctx.createLinearGradient((x2 + x1) / 2, b2 - bevelDepth, (x2 + x1) / 2, b2);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color2);
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.restore();
        }
        if (true === left) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x1, y2);
            ctx.closePath();
            var grd = ctx.createLinearGradient(a1 + bevelDepth, (y2 + y1) / 2, a1, (y2 + y1) / 2);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color3);
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.restore();
        }
        if (true === right) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x2, y1);
            ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x2, y2);
            var grd = ctx.createLinearGradient(a2 - bevelDepth, (y2 + y1) / 2, a2, (y2 + y1) / 2);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color3);
            ctx.fillStyle = grd;
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color3);
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    };
    Chart.prototype.renderColumn = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var x, y, i = 0;
        var dataPointX;
        var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = Math.min(.15 * this.width, this.plotArea.width / plotUnit.plotType.totalDataSeries * .9) << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / plotUnit.plotType.totalDataSeries * .9 << 0;
        barWidth > maxBarWidth ? barWidth = maxBarWidth : 1/0 === xMinDiff ? barWidth = maxBarWidth : 1 > barWidth && (barWidth = 1);
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            if (dataPoints.length > 0) {
                var bevelEnabled = barWidth > 5 && dataSeries.bevelEnabled ? true : false;
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) continue;
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var x1 = x - plotUnit.plotType.totalDataSeries * barWidth / 2 + (plotUnit.previousDataSeriesCount + j) * barWidth << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;
                    if (dataPoints[i].y >= 0) {
                        y1 = y;
                        y2 = yZeroToPixel;
                        if (y1 > y2) {
                            y1 = y2;
                            y2 = y1;
                        }
                    } else {
                        y2 = y;
                        y1 = yZeroToPixel;
                        if (y1 > y2) {
                            y1 = y2;
                            y2 = y1;
                        }
                    }
                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && dataPoints[i].y >= 0, dataPoints[i].y < 0 && bevelEnabled, false, false, dataSeries.fillOpacity);
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    };
                    color = intToHexColorString(id);
                    isCanvasSupported && drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "column",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x1 + (x2 - x1) / 2,
                            y: dataPoints[i].y >= 0 ? y1 : y2
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        bounds: {
                            x1: x1,
                            y1: Math.min(y1, y2),
                            x2: x2,
                            y2: Math.max(y1, y2)
                        },
                        color: color
                    });
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationBase = Math.min(yZeroToPixel, plotUnit.axisY.boundingRect.y2);
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.yScaleAnimation,
            easingFunction: AnimationHelper.easing.easeOutQuart,
            animationBase: animationBase
        };
        return animationInfo;
    };
    Chart.prototype.renderStackedColumn = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var offsetPositiveY = [];
        var offsetNegativeY = [];
        var x, y, i = 0;
        var dataPointX;
        var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = .15 * this.width << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / plotUnit.plotType.plotUnits.length * .9 << 0;
        barWidth > maxBarWidth ? barWidth = maxBarWidth : 1/0 === xMinDiff ? barWidth = maxBarWidth : 1 > barWidth && (barWidth = 1);
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            if (dataPoints.length > 0) {
                var bevelEnabled = barWidth > 5 && dataSeries.bevelEnabled ? true : false;
                ctx.strokeStyle = "#4572A7 ";
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) continue;
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum);
                    var x1 = x - plotUnit.plotType.plotUnits.length * barWidth / 2 + plotUnit.index * barWidth << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;
                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;
                        y1 = y - offset;
                        y2 = yZeroToPixel - offset;
                        offsetPositiveY[dataPointX] = offset + (y2 - y1);
                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;
                        y2 = y + offset;
                        y1 = yZeroToPixel + offset;
                        offsetNegativeY[dataPointX] = offset + (y2 - y1);
                    }
                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && dataPoints[i].y >= 0, dataPoints[i].y < 0 && bevelEnabled, false, false, dataSeries.fillOpacity);
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    };
                    color = intToHexColorString(id);
                    isCanvasSupported && drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "stackedColumn",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: dataPoints[i].y >= 0 ? y1 : y2
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        bounds: {
                            x1: x1,
                            y1: Math.min(y1, y2),
                            x2: x2,
                            y2: Math.max(y1, y2)
                        },
                        color: color
                    });
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationBase = Math.min(yZeroToPixel, plotUnit.axisY.boundingRect.y2);
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.yScaleAnimation,
            easingFunction: AnimationHelper.easing.easeOutQuart,
            animationBase: animationBase
        };
        return animationInfo;
    };
    Chart.prototype.renderStackedColumn100 = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var offsetPositiveY = [];
        var offsetNegativeY = [];
        var x, y, i = 0;
        var dataPointX;
        var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = .15 * this.width << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / plotUnit.plotType.plotUnits.length * .9 << 0;
        barWidth > maxBarWidth ? barWidth = maxBarWidth : 1/0 === xMinDiff ? barWidth = maxBarWidth : 1 > barWidth && (barWidth = 1);
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            if (dataPoints.length > 0) {
                var bevelEnabled = barWidth > 5 && dataSeries.bevelEnabled ? true : false;
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) continue;
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    var yPercent;
                    yPercent = 0 !== plotUnit.dataPointYSums[dataPointX] ? dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100 : 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum);
                    var x1 = x - plotUnit.plotType.plotUnits.length * barWidth / 2 + plotUnit.index * barWidth << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;
                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;
                        y1 = y - offset;
                        y2 = yZeroToPixel - offset;
                        offsetPositiveY[dataPointX] = offset + (y2 - y1);
                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;
                        y2 = y + offset;
                        y1 = yZeroToPixel + offset;
                        offsetNegativeY[dataPointX] = offset + (y2 - y1);
                    }
                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled && dataPoints[i].y >= 0, dataPoints[i].y < 0 && bevelEnabled, false, false, dataSeries.fillOpacity);
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    };
                    color = intToHexColorString(id);
                    isCanvasSupported && drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "stackedColumn100",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: dataPoints[i].y >= 0 ? y1 : y2
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        bounds: {
                            x1: x1,
                            y1: Math.min(y1, y2),
                            x2: x2,
                            y2: Math.max(y1, y2)
                        },
                        color: color
                    });
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationBase = Math.min(yZeroToPixel, plotUnit.axisY.boundingRect.y2);
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.yScaleAnimation,
            easingFunction: AnimationHelper.easing.easeOutQuart,
            animationBase: animationBase
        };
        return animationInfo;
    };
    Chart.prototype.renderBar = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var x, y, i = 0;
        var dataPointX;
        var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = Math.min(.15 * this.height, this.plotArea.height / plotUnit.plotType.totalDataSeries * .9) << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / plotUnit.plotType.totalDataSeries * .9 << 0;
        barWidth > maxBarWidth ? barWidth = maxBarWidth : 1/0 === xMinDiff ? barWidth = maxBarWidth : 1 > barWidth && (barWidth = 1);
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            if (dataPoints.length > 0) {
                var bevelEnabled = barWidth > 5 && dataSeries.bevelEnabled ? true : false;
                ctx.strokeStyle = "#4572A7 ";
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) continue;
                    y = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    x = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var y1 = y - plotUnit.plotType.totalDataSeries * barWidth / 2 + (plotUnit.previousDataSeriesCount + j) * barWidth << 0;
                    var y2 = y1 + barWidth << 0;
                    var x1;
                    var x2;
                    if (dataPoints[i].y >= 0) {
                        x1 = yZeroToPixel;
                        x2 = x;
                    } else {
                        x1 = x;
                        x2 = yZeroToPixel;
                    }
                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    };
                    color = intToHexColorString(id);
                    isCanvasSupported && drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);
                    this._indexLabels.push({
                        chartType: "bar",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: dataPoints[i].y >= 0 ? x2 : x1,
                            y: y1 + (y2 - y1) / 2
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        bounds: {
                            x1: Math.min(x1, x2),
                            y1: y1,
                            x2: Math.max(x1, x2),
                            y2: y2
                        },
                        color: color
                    });
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationBase = Math.max(yZeroToPixel, plotUnit.axisX.boundingRect.x2);
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xScaleAnimation,
            easingFunction: AnimationHelper.easing.easeOutQuart,
            animationBase: animationBase
        };
        return animationInfo;
    };
    Chart.prototype.renderStackedBar = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var offsetPositiveY = [];
        var offsetNegativeY = [];
        var x, y, i = 0;
        var dataPointX;
        var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = .15 * this.height << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / plotUnit.plotType.plotUnits.length * .9 << 0;
        barWidth > maxBarWidth ? barWidth = maxBarWidth : 1/0 === xMinDiff ? barWidth = maxBarWidth : 1 > barWidth && (barWidth = 1);
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            if (dataPoints.length > 0) {
                var bevelEnabled = barWidth > 5 && dataSeries.bevelEnabled ? true : false;
                ctx.strokeStyle = "#4572A7 ";
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) continue;
                    y = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    x = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum);
                    var y1 = y - plotUnit.plotType.plotUnits.length * barWidth / 2 + plotUnit.index * barWidth << 0;
                    var y2 = y1 + barWidth << 0;
                    var x1;
                    var x2;
                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;
                        x1 = yZeroToPixel + offset;
                        x2 = x + offset;
                        offsetPositiveY[dataPointX] = offset + (x2 - x1);
                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;
                        x1 = x - offset;
                        x2 = yZeroToPixel - offset;
                        offsetNegativeY[dataPointX] = offset + (x2 - x1);
                    }
                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    };
                    color = intToHexColorString(id);
                    isCanvasSupported && drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);
                    this._indexLabels.push({
                        chartType: "stackedBar",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: dataPoints[i].y >= 0 ? x2 : x1,
                            y: y
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        bounds: {
                            x1: Math.min(x1, x2),
                            y1: y1,
                            x2: Math.max(x1, x2),
                            y2: y2
                        },
                        color: color
                    });
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationBase = Math.max(yZeroToPixel, plotUnit.axisX.boundingRect.x2);
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xScaleAnimation,
            easingFunction: AnimationHelper.easing.easeOutQuart,
            animationBase: animationBase
        };
        return animationInfo;
    };
    Chart.prototype.renderStackedBar100 = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var offsetPositiveY = [];
        var offsetNegativeY = [];
        var x, y, i = 0;
        var dataPointX;
        var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = .15 * this.height << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / plotUnit.plotType.plotUnits.length * .9 << 0;
        barWidth > maxBarWidth ? barWidth = maxBarWidth : 1/0 === xMinDiff ? barWidth = maxBarWidth : 1 > barWidth && (barWidth = 1);
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            if (dataPoints.length > 0) {
                var bevelEnabled = barWidth > 5 && dataSeries.bevelEnabled ? true : false;
                ctx.strokeStyle = "#4572A7 ";
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) continue;
                    y = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    var yPercent;
                    yPercent = 0 !== plotUnit.dataPointYSums[dataPointX] ? dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100 : 0;
                    x = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum);
                    var y1 = y - plotUnit.plotType.plotUnits.length * barWidth / 2 + plotUnit.index * barWidth << 0;
                    var y2 = y1 + barWidth << 0;
                    var x1;
                    var x2;
                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;
                        x1 = yZeroToPixel + offset;
                        x2 = x + offset;
                        offsetPositiveY[dataPointX] = offset + (x2 - x1);
                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;
                        x1 = x - offset;
                        x2 = yZeroToPixel - offset;
                        offsetNegativeY[dataPointX] = offset + (x2 - x1);
                    }
                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    };
                    color = intToHexColorString(id);
                    isCanvasSupported && drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);
                    this._indexLabels.push({
                        chartType: "stackedBar100",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: dataPoints[i].y >= 0 ? x2 : x1,
                            y: y
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        bounds: {
                            x1: Math.min(x1, x2),
                            y1: y1,
                            x2: Math.max(x1, x2),
                            y2: y2
                        },
                        color: color
                    });
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationBase = Math.max(yZeroToPixel, plotUnit.axisX.boundingRect.x2);
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xScaleAnimation,
            easingFunction: AnimationHelper.easing.easeOutQuart,
            animationBase: animationBase
        };
        return animationInfo;
    };
    Chart.prototype.renderArea = function(plotUnit) {
        function closeArea() {
            if (!startPoint) return;
            dataSeries.lineThickness > 0 && ctx.stroke();
            plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0 ? baseY = yZeroToPixel : plotUnit.axisY.maximum < 0 ? baseY = axisYProps.y1 : plotUnit.axisY.minimum > 0 && (baseY = axisXProps.y2);
            ctx.lineTo(x, baseY);
            ctx.lineTo(startPoint.x, baseY);
            ctx.closePath();
            ctx.globalAlpha = dataSeries.fillOpacity;
            ctx.fill();
            ctx.globalAlpha = 1;
            if (isCanvasSupported) {
                ghostCtx.lineTo(x, baseY);
                ghostCtx.lineTo(startPoint.x, baseY);
                ghostCtx.closePath();
                ghostCtx.fill();
            }
            ctx.beginPath();
            ctx.moveTo(x, y);
            ghostCtx.beginPath();
            ghostCtx.moveTo(x, y);
            startPoint = {
                x: x,
                y: y
            };
        }
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var ghostCtx = this._eventManager.ghostCtx;
        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];
        var plotArea = this.plotArea;
        ctx.save();
        isCanvasSupported && ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            markers = [];
            var isFirstDataPointInPlotArea = true;
            var x, y, i = 0;
            var dataPointX;
            var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
            var baseY;
            var startPoint = null;
            if (dataPoints.length > 0) {
                var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;
                var prevDataNull = true;
                for (;i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) {
                        closeArea();
                        prevDataNull = true;
                        continue;
                    }
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        startPoint = {
                            x: x,
                            y: y
                        };
                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }
                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    } else {
                        ctx.lineTo(x, y);
                        isCanvasSupported && ghostCtx.lineTo(x, y);
                        i % 250 == 0 && closeArea();
                    }
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x,
                        y1: y
                    };
                    if (0 !== dataPoints[i].markerSize && (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0)) {
                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);
                        var markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                    }
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "area",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: y
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        color: color
                    });
                }
                closeArea();
                RenderHelper.drawMarkers(markers);
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderSplineArea = function(plotUnit) {
        function renderBezierArea() {
            var bp = getBezierPoints(pixels, 2);
            if (bp.length > 0) {
                ctx.beginPath();
                ctx.moveTo(bp[0].x, bp[0].y);
                if (isCanvasSupported) {
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(bp[0].x, bp[0].y);
                }
                for (var i = 0; i < bp.length - 3; i += 3) {
                    ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);
                    isCanvasSupported && ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);
                }
                dataSeries.lineThickness > 0 && ctx.stroke();
                plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0 ? baseY = yZeroToPixel : plotUnit.axisY.maximum < 0 ? baseY = axisYProps.y1 : plotUnit.axisY.minimum > 0 && (baseY = axisXProps.y2);
                startPoint = {
                    x: bp[0].x,
                    y: bp[0].y
                };
                ctx.lineTo(bp[bp.length - 1].x, baseY);
                ctx.lineTo(startPoint.x, baseY);
                ctx.closePath();
                ctx.globalAlpha = dataSeries.fillOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;
                if (isCanvasSupported) {
                    ghostCtx.lineTo(bp[bp.length - 1].x, baseY);
                    ghostCtx.lineTo(startPoint.x, baseY);
                    ghostCtx.closePath();
                    ghostCtx.fill();
                }
            }
        }
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var ghostCtx = this._eventManager.ghostCtx;
        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];
        var plotArea = this.plotArea;
        ctx.save();
        isCanvasSupported && ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            markers = [];
            var x, y, i = 0;
            var dataPointX;
            var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
            var baseY;
            var startPoint = null;
            var pixels = [];
            if (dataPoints.length > 0) {
                color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;
                for (;i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) {
                        if (i > 0) {
                            renderBezierArea();
                            pixels = [];
                        }
                        continue;
                    }
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x,
                        y1: y
                    };
                    pixels[pixels.length] = {
                        x: x,
                        y: y
                    };
                    if (0 !== dataPoints[i].markerSize && (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0)) {
                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);
                        var markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                    }
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "splineArea",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: y
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        color: color
                    });
                }
                renderBezierArea();
                RenderHelper.drawMarkers(markers);
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderStepArea = function(plotUnit) {
        function closeArea() {
            if (!startPoint) return;
            dataSeries.lineThickness > 0 && ctx.stroke();
            plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0 ? baseY = yZeroToPixel : plotUnit.axisY.maximum < 0 ? baseY = axisYProps.y1 : plotUnit.axisY.minimum > 0 && (baseY = axisXProps.y2);
            ctx.lineTo(x, baseY);
            ctx.lineTo(startPoint.x, baseY);
            ctx.closePath();
            ctx.globalAlpha = dataSeries.fillOpacity;
            ctx.fill();
            ctx.globalAlpha = 1;
            if (isCanvasSupported) {
                ghostCtx.lineTo(x, baseY);
                ghostCtx.lineTo(startPoint.x, baseY);
                ghostCtx.closePath();
                ghostCtx.fill();
            }
            ctx.beginPath();
            ctx.moveTo(x, y);
            ghostCtx.beginPath();
            ghostCtx.moveTo(x, y);
            startPoint = {
                x: x,
                y: y
            };
        }
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var ghostCtx = this._eventManager.ghostCtx;
        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];
        var plotArea = this.plotArea;
        ctx.save();
        isCanvasSupported && ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            markers = [];
            var isFirstDataPointInPlotArea = true;
            var x, y, i = 0;
            var dataPointX;
            var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
            var baseY;
            var startPoint = null;
            var prevDataNull = false;
            if (dataPoints.length > 0) {
                var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;
                for (;i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    var prevY = y;
                    if ("number" != typeof dataPoints[i].y) {
                        closeArea();
                        prevDataNull = true;
                        continue;
                    }
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        startPoint = {
                            x: x,
                            y: y
                        };
                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }
                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    } else {
                        ctx.lineTo(x, prevY);
                        isCanvasSupported && ghostCtx.lineTo(x, prevY);
                        ctx.lineTo(x, y);
                        isCanvasSupported && ghostCtx.lineTo(x, y);
                        i % 250 == 0 && closeArea();
                    }
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x,
                        y1: y
                    };
                    if (0 !== dataPoints[i].markerSize && (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0)) {
                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);
                        var markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                    }
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "stepArea",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: y
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        color: color
                    });
                }
                closeArea();
                RenderHelper.drawMarkers(markers);
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderStackedArea = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var markers = [];
        var plotArea = this.plotArea;
        var offsetY = [];
        var allXValues = [];
        var x, y, i = 0;
        var dataPointX;
        var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        plotUnit.axisX.dataInfo.minDiff;
        var ghostCtx = this._eventManager.ghostCtx;
        isCanvasSupported && ghostCtx.beginPath();
        ctx.save();
        isCanvasSupported && ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }
        xValuePresent = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var xValue;
            dataSeries.dataPointIndexes = [];
            for (i = 0; i < dataPoints.length; i++) {
                xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                dataSeries.dataPointIndexes[xValue] = i;
                if (!xValuePresent[xValue]) {
                    allXValues.push(xValue);
                    xValuePresent[xValue] = true;
                }
            }
            allXValues.sort(compareNumbers);
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;
            var currentBaseValues = [];
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            if (allXValues.length > 0) {
                color = dataSeries._colorSet[0];
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;
                for (i = 0; i < allXValues.length; i++) {
                    dataPointX = allXValues[i];
                    var dataPoint = null;
                    dataPoint = dataSeries.dataPointIndexes[dataPointX] >= 0 ? dataPoints[dataSeries.dataPointIndexes[dataPointX]] : {
                        x: dataPointX,
                        y: 0
                    };
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoint.y) continue;
                    var x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    var y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoint.y - plotUnit.axisY.conversionParameters.minimum);
                    var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;
                    y -= offset;
                    currentBaseValues.push({
                        x: x,
                        y: yZeroToPixel - offset
                    });
                    offsetY[dataPointX] = yZeroToPixel - y;
                    if (isFirstDataPointInPlotArea) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }
                        isFirstDataPointInPlotArea = false;
                    } else {
                        ctx.lineTo(x, y);
                        isCanvasSupported && ghostCtx.lineTo(x, y);
                        if (i % 250 == 0) {
                            dataSeries.lineThickness > 0 && ctx.stroke();
                            while (currentBaseValues.length > 0) {
                                var point = currentBaseValues.pop();
                                ctx.lineTo(point.x, point.y);
                                isCanvasSupported && ghostCtx.lineTo(point.x, point.y);
                            }
                            ctx.closePath();
                            ctx.globalAlpha = dataSeries.fillOpacity;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            if (isCanvasSupported) {
                                ghostCtx.closePath();
                                ghostCtx.fill();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }
                            currentBaseValues.push({
                                x: x,
                                y: yZeroToPixel - offset
                            });
                        }
                    }
                    if (dataSeries.dataPointIndexes[dataPointX] >= 0) {
                        var id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
                        this._eventManager.objectMap[id] = {
                            id: id,
                            objectType: "dataPoint",
                            dataSeriesIndex: dataSeriesIndex,
                            dataPointIndex: dataSeries.dataPointIndexes[dataPointX],
                            x1: x,
                            y1: y
                        };
                    }
                    if (dataSeries.dataPointIndexes[dataPointX] >= 0 && 0 !== dataPoint.markerSize && (dataPoint.markerSize > 0 || dataSeries.markerSize > 0)) {
                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);
                        markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                    }
                    (dataPoint.indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "stackedArea",
                        dataPoint: dataPoint,
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: y
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        color: color
                    });
                }
                dataSeries.lineThickness > 0 && ctx.stroke();
                while (currentBaseValues.length > 0) {
                    var point = currentBaseValues.pop();
                    ctx.lineTo(point.x, point.y);
                    isCanvasSupported && ghostCtx.lineTo(point.x, point.y);
                }
                ctx.closePath();
                ctx.globalAlpha = dataSeries.fillOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.moveTo(x, y);
                if (isCanvasSupported) {
                    ghostCtx.closePath();
                    ghostCtx.fill();
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(x, y);
                }
            }
            delete dataSeries.dataPointIndexes;
        }
        RenderHelper.drawMarkers(markers);
        ctx.restore();
        isCanvasSupported && ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderStackedArea100 = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var markers = [];
        var offsetY = [];
        var allXValues = [];
        var x, y, i = 0;
        var dataPointX;
        var yZeroToPixel = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = .15 * this.width << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) * .9 << 0;
        var ghostCtx = this._eventManager.ghostCtx;
        ctx.save();
        isCanvasSupported && ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }
        xValuePresent = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var xValue;
            dataSeries.dataPointIndexes = [];
            for (i = 0; i < dataPoints.length; i++) {
                xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                dataSeries.dataPointIndexes[xValue] = i;
                if (!xValuePresent[xValue]) {
                    allXValues.push(xValue);
                    xValuePresent[xValue] = true;
                }
            }
            allXValues.sort(compareNumbers);
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            1 == dataPoints.length && (barWidth = maxBarWidth);
            1 > barWidth ? barWidth = 1 : barWidth > maxBarWidth && (barWidth = maxBarWidth);
            var currentBaseValues = [];
            if (allXValues.length > 0) {
                color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;
                for (i = 0; i < allXValues.length; i++) {
                    dataPointX = allXValues[i];
                    var dataPoint = null;
                    dataPoint = dataSeries.dataPointIndexes[dataPointX] >= 0 ? dataPoints[dataSeries.dataPointIndexes[dataPointX]] : {
                        x: dataPointX,
                        y: 0
                    };
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoint.y) continue;
                    var yPercent;
                    yPercent = 0 !== plotUnit.dataPointYSums[dataPointX] ? dataPoint.y / plotUnit.dataPointYSums[dataPointX] * 100 : 0;
                    var x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    var y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum);
                    var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;
                    y -= offset;
                    currentBaseValues.push({
                        x: x,
                        y: yZeroToPixel - offset
                    });
                    offsetY[dataPointX] = yZeroToPixel - y;
                    if (isFirstDataPointInPlotArea) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }
                        isFirstDataPointInPlotArea = false;
                    } else {
                        ctx.lineTo(x, y);
                        isCanvasSupported && ghostCtx.lineTo(x, y);
                        if (i % 250 == 0) {
                            dataSeries.lineThickness > 0 && ctx.stroke();
                            while (currentBaseValues.length > 0) {
                                var point = currentBaseValues.pop();
                                ctx.lineTo(point.x, point.y);
                                isCanvasSupported && ghostCtx.lineTo(point.x, point.y);
                            }
                            ctx.closePath();
                            ctx.globalAlpha = dataSeries.fillOpacity;
                            ctx.fill();
                            ctx.globalAlpha = 1;
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            if (isCanvasSupported) {
                                ghostCtx.closePath();
                                ghostCtx.fill();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }
                            currentBaseValues.push({
                                x: x,
                                y: yZeroToPixel - offset
                            });
                        }
                    }
                    if (dataSeries.dataPointIndexes[dataPointX] >= 0) {
                        var id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
                        this._eventManager.objectMap[id] = {
                            id: id,
                            objectType: "dataPoint",
                            dataSeriesIndex: dataSeriesIndex,
                            dataPointIndex: dataSeries.dataPointIndexes[dataPointX],
                            x1: x,
                            y1: y
                        };
                    }
                    if (dataSeries.dataPointIndexes[dataPointX] >= 0 && 0 !== dataPoint.markerSize && (dataPoint.markerSize > 0 || dataSeries.markerSize > 0)) {
                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);
                        markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                    }
                    (dataPoint.indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "stackedArea100",
                        dataPoint: dataPoint,
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: y
                        },
                        direction: dataPoints[i].y >= 0 ? 1 : -1,
                        color: color
                    });
                }
                dataSeries.lineThickness > 0 && ctx.stroke();
                while (currentBaseValues.length > 0) {
                    var point = currentBaseValues.pop();
                    ctx.lineTo(point.x, point.y);
                    isCanvasSupported && ghostCtx.lineTo(point.x, point.y);
                }
                ctx.closePath();
                ctx.globalAlpha = dataSeries.fillOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.moveTo(x, y);
                if (isCanvasSupported) {
                    ghostCtx.closePath();
                    ghostCtx.fill();
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(x, y);
                }
            }
            delete dataSeries.dataPointIndexes;
        }
        RenderHelper.drawMarkers(markers);
        ctx.restore();
        isCanvasSupported && ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderBubble = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var x, y, i = 0;
        var dataPointX;
        plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = .15 * this.width << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / totalDataSeries * .9 << 0;
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        var maxZ = -1/0;
        var minZ = 1/0;
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var z = 0;
            for (var i = 0; i < dataPoints.length; i++) {
                dataPointX = dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                if ("undefined" != typeof dataPoints[i].z) {
                    z = dataPoints[i].z;
                    z > maxZ && (maxZ = z);
                    minZ > z && (minZ = z);
                }
            }
        }
        var minArea = 5 * Math.PI * 5;
        var maxArea = Math.max(Math.pow(.25 * Math.min(plotArea.height, plotArea.width) / 2, 2) * Math.PI, minArea);
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            1 == dataPoints.length && (barWidth = maxBarWidth);
            1 > barWidth ? barWidth = 1 : barWidth > maxBarWidth && (barWidth = maxBarWidth);
            if (dataPoints.length > 0) {
                ctx.strokeStyle = "#4572A7 ";
                for (var i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) continue;
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var z = dataPoints[i].z;
                    var area = maxZ === minZ ? maxArea / 2 : minArea + (maxArea - minArea) / (maxZ - minZ) * (z - minZ);
                    var radius = Math.max(Math.sqrt(area / Math.PI) << 0, 1);
                    var markerSize = 2 * radius;
                    var markerProps = dataSeries.getMarkerProperties(i, ctx);
                    markerProps.size = markerSize;
                    ctx.globalAlpha = dataSeries.fillOpacity;
                    RenderHelper.drawMarker(x, y, ctx, markerProps.type, markerProps.size, markerProps.color, markerProps.borderColor, markerProps.borderThickness);
                    ctx.globalAlpha = 1;
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x,
                        y1: y,
                        size: markerSize
                    };
                    var markerColor = intToHexColorString(id);
                    isCanvasSupported && RenderHelper.drawMarker(x, y, this._eventManager.ghostCtx, markerProps.type, markerProps.size, markerColor, markerColor, markerProps.borderThickness);
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "bubble",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: y
                        },
                        direction: 1,
                        color: color
                    });
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.fadeInAnimation,
            easingFunction: AnimationHelper.easing.easeInQuad,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderScatter = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var x, y, i = 0;
        var dataPointX;
        plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = .15 * this.width << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / totalDataSeries * .9 << 0;
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            1 == dataPoints.length && (barWidth = maxBarWidth);
            1 > barWidth ? barWidth = 1 : barWidth > maxBarWidth && (barWidth = maxBarWidth);
            if (dataPoints.length > 0) {
                ctx.strokeStyle = "#4572A7 ";
                {
                    Math.pow(.3 * Math.min(plotArea.height, plotArea.width) / 2, 2) * Math.PI;
                }
                var prevDataPointX = 0;
                var prevDataPointY = 0;
                for (var i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if ("number" != typeof dataPoints[i].y) continue;
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                    ctx.globalAlpha = dataSeries.fillOpacity;
                    RenderHelper.drawMarker(markerProps.x, markerProps.y, markerProps.ctx, markerProps.type, markerProps.size, markerProps.color, markerProps.color, markerProps.thickness);
                    ctx.globalAlpha = 1;
                    if (Math.sqrt((prevDataPointX - x) * (prevDataPointX - x) + (prevDataPointY - y) * (prevDataPointY - y)) < Math.min(markerProps.size, 5) && dataPoints.length > Math.min(this.plotArea.width, this.plotArea.height)) continue;
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x,
                        y1: y
                    };
                    var markerColor = intToHexColorString(id);
                    isCanvasSupported && RenderHelper.drawMarker(markerProps.x, markerProps.y, this._eventManager.ghostCtx, markerProps.type, markerProps.size, markerColor, markerColor, markerProps.borderThickness);
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: "scatter",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x,
                            y: y
                        },
                        direction: 1,
                        color: color
                    });
                    prevDataPointX = x;
                    prevDataPointY = y;
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.fadeInAnimation,
            easingFunction: AnimationHelper.easing.easeInQuad,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderCandlestick = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var ghostCtx = this._eventManager.ghostCtx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var x, y1, y2, y3, y4, i = 0;
        var dataPointX;
        plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = .015 * this.width;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) * .7 << 0;
        barWidth > maxBarWidth ? barWidth = maxBarWidth : 1/0 === xMinDiff ? barWidth = maxBarWidth : 1 > barWidth && (barWidth = 1);
        ctx.save();
        isCanvasSupported && ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            if (dataPoints.length > 0) {
                var bevelEnabled = barWidth > 5 && dataSeries.bevelEnabled ? true : false;
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if (null === dataPoints[i].y || !dataPoints[i].y.length || "number" != typeof dataPoints[i].y[0] || "number" != typeof dataPoints[i].y[1] || "number" != typeof dataPoints[i].y[2] || "number" != typeof dataPoints[i].y[3]) continue;
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y1 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    y2 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    y3 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[2] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    y4 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[3] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var x1 = x - barWidth / 2 << 0;
                    var x2 = x1 + barWidth << 0;
                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[0];
                    var borderThickness = Math.round(Math.max(1, .15 * barWidth));
                    var offset = borderThickness % 2 === 0 ? 0 : .5;
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2,
                        x3: x,
                        y3: y3,
                        x4: x,
                        y4: y4,
                        borderThickness: borderThickness,
                        color: color
                    };
                    ctx.strokeStyle = color;
                    ctx.beginPath();
                    ctx.lineWidth = borderThickness;
                    ghostCtx.lineWidth = Math.max(borderThickness, 4);
                    if ("candlestick" === dataSeries.type) {
                        ctx.moveTo(x - offset, y2);
                        ctx.lineTo(x - offset, Math.min(y1, y4));
                        ctx.stroke();
                        ctx.moveTo(x - offset, Math.max(y1, y4));
                        ctx.lineTo(x - offset, y3);
                        ctx.stroke();
                        drawRect(ctx, x1, Math.min(y1, y4), x2, Math.max(y1, y4), dataPoints[i].y[0] <= dataPoints[i].y[3] ? dataSeries.risingColor : color, borderThickness, color, bevelEnabled, bevelEnabled, false, false, dataSeries.fillOpacity);
                        if (isCanvasSupported) {
                            color = intToHexColorString(id);
                            ghostCtx.strokeStyle = color;
                            ghostCtx.moveTo(x - offset, y2);
                            ghostCtx.lineTo(x - offset, Math.min(y1, y4));
                            ghostCtx.stroke();
                            ghostCtx.moveTo(x - offset, Math.max(y1, y4));
                            ghostCtx.lineTo(x - offset, y3);
                            ghostCtx.stroke();
                            drawRect(ghostCtx, x1, Math.min(y1, y4), x2, Math.max(y1, y4), color, 0, null, false, false, false, false);
                        }
                    } else if ("ohlc" === dataSeries.type) {
                        ctx.moveTo(x - offset, y2);
                        ctx.lineTo(x - offset, y3);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(x, y1);
                        ctx.lineTo(x1, y1);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(x, y4);
                        ctx.lineTo(x2, y4);
                        ctx.stroke();
                        if (isCanvasSupported) {
                            color = intToHexColorString(id);
                            ghostCtx.strokeStyle = color;
                            ghostCtx.moveTo(x - offset, y2);
                            ghostCtx.lineTo(x - offset, y3);
                            ghostCtx.stroke();
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y1);
                            ghostCtx.lineTo(x1, y1);
                            ghostCtx.stroke();
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y4);
                            ghostCtx.lineTo(x2, y4);
                            ghostCtx.stroke();
                        }
                    }
                    (dataPoints[i].indexLabel || dataSeries.indexLabel) && this._indexLabels.push({
                        chartType: dataSeries.type,
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: {
                            x: x1 + (x2 - x1) / 2,
                            y: y2
                        },
                        direction: 1,
                        bounds: {
                            x1: x1,
                            y1: Math.min(y2, y3),
                            x2: x2,
                            y2: Math.max(y2, y3)
                        },
                        color: color
                    });
                }
            }
        }
        ctx.restore();
        isCanvasSupported && ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.fadeInAnimation,
            easingFunction: AnimationHelper.easing.easeInQuad,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderRangeColumn = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var x, y1, y2, i = 0;
        var dataPointX;
        plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = .03 * this.width;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / plotUnit.plotType.totalDataSeries * .9 << 0;
        barWidth > maxBarWidth ? barWidth = maxBarWidth : 1/0 === xMinDiff ? barWidth = maxBarWidth : 1 > barWidth && (barWidth = 1);
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            if (dataPoints.length > 0) {
                var bevelEnabled = barWidth > 5 && dataSeries.bevelEnabled ? true : false;
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if (null === dataPoints[i].y || !dataPoints[i].y.length || "number" != typeof dataPoints[i].y[0] || "number" != typeof dataPoints[i].y[1]) continue;
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y1 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    y2 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var x1 = x - plotUnit.plotType.totalDataSeries * barWidth / 2 + (plotUnit.previousDataSeriesCount + j) * barWidth << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;
                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    if (y1 > y2) {
                        var temp = y1;
                        y1 = y2;
                        y2 = temp;
                    }
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    };
                    var borderThickness = 0;
                    drawRect(ctx, x1, y1, x2, y2, color, borderThickness, color, bevelEnabled, bevelEnabled, false, false, dataSeries.fillOpacity);
                    color = intToHexColorString(id);
                    isCanvasSupported && drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);
                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {
                        this._indexLabels.push({
                            chartType: "rangeColumn",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 0,
                            point: {
                                x: x1 + (x2 - x1) / 2,
                                y: dataPoints[i].y[1] >= dataPoints[i].y[0] ? y2 : y1
                            },
                            direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? -1 : 1,
                            bounds: {
                                x1: x1,
                                y1: Math.min(y1, y2),
                                x2: x2,
                                y2: Math.max(y1, y2)
                            },
                            color: color
                        });
                        this._indexLabels.push({
                            chartType: "rangeColumn",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 1,
                            point: {
                                x: x1 + (x2 - x1) / 2,
                                y: dataPoints[i].y[1] >= dataPoints[i].y[0] ? y1 : y2
                            },
                            direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? 1 : -1,
                            bounds: {
                                x1: x1,
                                y1: Math.min(y1, y2),
                                x2: x2,
                                y2: Math.max(y1, y2)
                            },
                            color: color
                        });
                    }
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.fadeInAnimation,
            easingFunction: AnimationHelper.easing.easeInQuad,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderRangeBar = function(plotUnit) {
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var color = null;
        var plotArea = this.plotArea;
        var x1, x2, y, i = 0;
        var dataPointX;
        plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) << 0;
        var maxBarWidth = Math.min(.15 * this.height, this.plotArea.height / plotUnit.plotType.totalDataSeries * .9) << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum) * Math.abs(xMinDiff) / plotUnit.plotType.totalDataSeries * .9 << 0;
        barWidth > maxBarWidth ? barWidth = maxBarWidth : 1/0 === xMinDiff ? barWidth = maxBarWidth : 1 > barWidth && (barWidth = 1);
        ctx.save();
        isCanvasSupported && this._eventManager.ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            if (dataPoints.length > 0) {
                var bevelEnabled = barWidth > 5 && dataSeries.bevelEnabled ? true : false;
                ctx.strokeStyle = "#4572A7 ";
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if (null === dataPoints[i].y || !dataPoints[i].y.length || "number" != typeof dataPoints[i].y[0] || "number" != typeof dataPoints[i].y[1]) continue;
                    x1 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    x2 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    y = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    var y1 = y - plotUnit.plotType.totalDataSeries * barWidth / 2 + (plotUnit.previousDataSeriesCount + j) * barWidth << 0;
                    var y2 = y1 + barWidth << 0;
                    if (x1 > x2) {
                        var temp = x1;
                        x1 = x2;
                        x2 = temp;
                    }
                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, 0, null, bevelEnabled, false, false, false, dataSeries.fillOpacity);
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    };
                    color = intToHexColorString(id);
                    isCanvasSupported && drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, 0, null, false, false, false, false);
                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {
                        this._indexLabels.push({
                            chartType: "rangeBar",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 0,
                            point: {
                                x: dataPoints[i].y[1] >= dataPoints[i].y[0] ? x1 : x2,
                                y: y1 + (y2 - y1) / 2
                            },
                            direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? -1 : 1,
                            bounds: {
                                x1: Math.min(x1, x2),
                                y1: y1,
                                x2: Math.max(x1, x2),
                                y2: y2
                            },
                            color: color
                        });
                        this._indexLabels.push({
                            chartType: "rangeBar",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 1,
                            point: {
                                x: dataPoints[i].y[1] >= dataPoints[i].y[0] ? x2 : x1,
                                y: y1 + (y2 - y1) / 2
                            },
                            direction: dataPoints[i].y[1] >= dataPoints[i].y[0] ? 1 : -1,
                            bounds: {
                                x1: Math.min(x1, x2),
                                y1: y1,
                                x2: Math.max(x1, x2),
                                y2: y2
                            },
                            color: color
                        });
                    }
                }
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.fadeInAnimation,
            easingFunction: AnimationHelper.easing.easeInQuad,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderRangeArea = function(plotUnit) {
        function closeArea() {
            if (!startPoint) return;
            var point = null;
            dataSeries.lineThickness > 0 && ctx.stroke();
            for (var i = closingPath.length - 1; i >= 0; i--) {
                point = closingPath[i];
                ctx.lineTo(point.x, point.y);
                ghostCtx.lineTo(point.x, point.y);
            }
            ctx.closePath();
            ctx.globalAlpha = dataSeries.fillOpacity;
            ctx.fill();
            ctx.globalAlpha = 1;
            ghostCtx.fill();
            if (dataSeries.lineThickness > 0) {
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                for (var i = 0; i < closingPath.length; i++) {
                    point = closingPath[i];
                    ctx.lineTo(point.x, point.y);
                }
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ghostCtx.beginPath();
            ghostCtx.moveTo(x, y1);
            startPoint = {
                x: x,
                y: y1
            };
            closingPath = [];
            closingPath.push({
                x: x,
                y: y2
            });
        }
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var ghostCtx = this._eventManager.ghostCtx;
        plotUnit.axisX.lineCoordinates;
        plotUnit.axisY.lineCoordinates;
        var markers = [];
        var plotArea = this.plotArea;
        ctx.save();
        isCanvasSupported && ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var closingPath = [];
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            markers = [];
            var isFirstDataPointInPlotArea = true;
            var x, y1, y2, i = 0;
            var dataPointX;
            {
                plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
            }
            var startPoint = null;
            if (dataPoints.length > 0) {
                var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;
                var prevDataNull = true;
                for (;i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if (null === dataPoints[i].y || !dataPoints[i].y.length || "number" != typeof dataPoints[i].y[0] || "number" != typeof dataPoints[i].y[1]) {
                        closeArea();
                        prevDataNull = true;
                        continue;
                    }
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y1 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    y2 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y1);
                        startPoint = {
                            x: x,
                            y: y1
                        };
                        closingPath = [];
                        closingPath.push({
                            x: x,
                            y: y2
                        });
                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y1);
                        }
                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    } else {
                        ctx.lineTo(x, y1);
                        closingPath.push({
                            x: x,
                            y: y2
                        });
                        isCanvasSupported && ghostCtx.lineTo(x, y1);
                        i % 250 == 0 && closeArea();
                    }
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x,
                        y1: y1,
                        y2: y2
                    };
                    if (0 !== dataPoints[i].markerSize && (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0)) {
                        var markerProps = dataSeries.getMarkerProperties(i, x, y2, ctx);
                        markers.push(markerProps);
                        var markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y2,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                        markerProps = dataSeries.getMarkerProperties(i, x, y1, ctx);
                        markers.push(markerProps);
                        var markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y1,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                    }
                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {
                        this._indexLabels.push({
                            chartType: "rangeArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 0,
                            point: {
                                x: x,
                                y: y1
                            },
                            direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? -1 : 1,
                            color: color
                        });
                        this._indexLabels.push({
                            chartType: "rangeArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 1,
                            point: {
                                x: x,
                                y: y2
                            },
                            direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? 1 : -1,
                            color: color
                        });
                    }
                }
                closeArea();
                RenderHelper.drawMarkers(markers);
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    Chart.prototype.renderRangeSplineArea = function(plotUnit) {
        function renderBezierArea() {
            var bp = getBezierPoints(pixelsY1, 2);
            if (bp.length > 0) {
                ctx.beginPath();
                ctx.moveTo(bp[0].x, bp[0].y);
                if (isCanvasSupported) {
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(bp[0].x, bp[0].y);
                }
                for (var i = 0; i < bp.length - 3; i += 3) {
                    ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);
                    isCanvasSupported && ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);
                }
                dataSeries.lineThickness > 0 && ctx.stroke();
                bp = getBezierPoints(pixelsY2, 2);
                ctx.lineTo(pixelsY2[pixelsY2.length - 1].x, pixelsY2[pixelsY2.length - 1].y);
                for (var i = bp.length - 1; i > 2; i -= 3) {
                    ctx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);
                    isCanvasSupported && ghostCtx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);
                }
                ctx.closePath();
                ctx.globalAlpha = dataSeries.fillOpacity;
                ctx.fill();
                ctx.globalAlpha = 1;
                if (dataSeries.lineThickness > 0) {
                    ctx.beginPath();
                    ctx.moveTo(pixelsY2[pixelsY2.length - 1].x, pixelsY2[pixelsY2.length - 1].y);
                    for (var i = bp.length - 1; i > 2; i -= 3) {
                        ctx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);
                        isCanvasSupported && ghostCtx.bezierCurveTo(bp[i - 1].x, bp[i - 1].y, bp[i - 2].x, bp[i - 2].y, bp[i - 3].x, bp[i - 3].y);
                    }
                    ctx.stroke();
                }
                ctx.beginPath();
                if (isCanvasSupported) {
                    ghostCtx.closePath();
                    ghostCtx.fill();
                }
            }
        }
        var ctx = plotUnit.targetCanvasCtx || this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var ghostCtx = this._eventManager.ghostCtx;
        plotUnit.axisX.lineCoordinates;
        plotUnit.axisY.lineCoordinates;
        var markers = [];
        var plotArea = this.plotArea;
        ctx.save();
        isCanvasSupported && ghostCtx.save();
        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();
        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = {
                objectType: "dataSeries",
                dataSeriesIndex: dataSeriesIndex
            };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            markers = [];
            var x, y1, y2, i = 0;
            var dataPointX;
            {
                plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
            }
            var pixelsY1 = [];
            var pixelsY2 = [];
            if (dataPoints.length > 0) {
                color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.lineWidth = dataSeries.lineThickness;
                for (;i < dataPoints.length; i++) {
                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) continue;
                    if (null === dataPoints[i].y || !dataPoints[i].y.length || "number" != typeof dataPoints[i].y[0] || "number" != typeof dataPoints[i].y[1]) {
                        if (i > 0) {
                            renderBezierArea();
                            pixelsY1 = [];
                            pixelsY2 = [];
                        }
                        continue;
                    }
                    x = plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5 << 0;
                    y1 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[0] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    y2 = plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y[1] - plotUnit.axisY.conversionParameters.minimum) + .5 << 0;
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = {
                        id: id,
                        objectType: "dataPoint",
                        dataSeriesIndex: dataSeriesIndex,
                        dataPointIndex: i,
                        x1: x,
                        y1: y1,
                        y2: y2
                    };
                    pixelsY1[pixelsY1.length] = {
                        x: x,
                        y: y1
                    };
                    pixelsY2[pixelsY2.length] = {
                        x: x,
                        y: y2
                    };
                    if (0 !== dataPoints[i].markerSize && (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0)) {
                        var markerProps = dataSeries.getMarkerProperties(i, x, y1, ctx);
                        markers.push(markerProps);
                        var markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y1,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                        var markerProps = dataSeries.getMarkerProperties(i, x, y2, ctx);
                        markers.push(markerProps);
                        var markerColor = intToHexColorString(id);
                        isCanvasSupported && markers.push({
                            x: x,
                            y: y2,
                            ctx: ghostCtx,
                            type: markerProps.type,
                            size: markerProps.size,
                            color: markerColor,
                            borderColor: markerColor,
                            borderThickness: markerProps.borderThickness
                        });
                    }
                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {
                        this._indexLabels.push({
                            chartType: "splineArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 0,
                            point: {
                                x: x,
                                y: y1
                            },
                            direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? -1 : 1,
                            color: color
                        });
                        this._indexLabels.push({
                            chartType: "splineArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            indexKeyword: 1,
                            point: {
                                x: x,
                                y: y2
                            },
                            direction: dataPoints[i].y[0] <= dataPoints[i].y[1] ? 1 : -1,
                            color: color
                        });
                    }
                }
                renderBezierArea();
                RenderHelper.drawMarkers(markers);
            }
        }
        ctx.restore();
        isCanvasSupported && this._eventManager.ghostCtx.restore();
        var animationInfo = {
            source: ctx,
            dest: this.plotArea.ctx,
            animationCallback: AnimationHelper.xClipAnimation,
            easingFunction: AnimationHelper.easing.linear,
            animationBase: 0
        };
        return animationInfo;
    };
    var drawSegment = function(ctx, center, radius, color, type, theta1, theta2, fillOpacity) {
        "undefined" == typeof fillOpacity && (fillOpacity = 1);
        if (!isCanvasSupported) {
            var theta2Mod = Number((theta2 % (2 * Math.PI)).toFixed(8));
            var theta1Mod = Number((theta1 % (2 * Math.PI)).toFixed(8));
            theta1Mod === theta2Mod && (theta2 -= 1e-4);
        }
        ctx.save();
        ctx.globalAlpha = fillOpacity;
        if ("pie" === type) {
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.arc(center.x, center.y, radius, theta1, theta2, false);
            ctx.fillStyle = color;
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.closePath();
            ctx.fill();
        } else if ("doughnut" === type) {
            var widthPercentage = .6;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, theta1, theta2, false);
            ctx.arc(center.x, center.y, widthPercentage * radius, theta2, theta1, true);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
    };
    Chart.prototype.renderPie = function(plotUnit) {
        function initLabels() {
            if (!dataSeries || !dataPoints) return;
            var noDPNearSouthPole = 0;
            var noDPNearNorthPole = 0;
            var firstDPCloseToSouth = 0;
            var firstDPCloseToNorth = 0;
            for (j = 0; j < dataPoints.length; j++) {
                var dataPoint = dataPoints[j];
                var id = dataSeries.dataPointIds[j];
                var dataPointEO = {
                    id: id,
                    objectType: "dataPoint",
                    dataPointIndex: j,
                    dataSeriesIndex: 0
                };
                dataPointEOs.push(dataPointEO);
                var indexLabelText = dataPoint.indexLabel ? dataPoint.indexLabel : dataSeries.indexLabel ? dataSeries.indexLabel : dataPoint.label ? dataPoint.label : dataSeries.label ? dataSeries.label : "";
                _this._eventManager.objectMap[id] = dataPointEO;
                dataPointEO.center = {
                    x: center.x,
                    y: center.y
                };
                dataPointEO.y = dataPoint.y;
                dataPointEO.radius = outerRadius;
                dataPointEO.indexLabelText = _this.replaceKeywordsWithValue(indexLabelText, dataPoint, dataSeries, j);
                dataPointEO.indexLabelPlacement = dataSeries.indexLabelPlacement;
                dataPointEO.indexLabelLineColor = dataPoint.indexLabelLineColor ? dataPoint.indexLabelLineColor : dataSeries.indexLabelLineColor ? dataSeries.indexLabelLineColor : dataPoint.color ? dataPoint.color : dataSeries._colorSet[j % dataSeries._colorSet.length];
                dataPointEO.indexLabelLineThickness = dataPoint.indexLabelLineThickness ? dataPoint.indexLabelLineThickness : dataSeries.indexLabelLineThickness;
                dataPointEO.indexLabelFontColor = dataPoint.indexLabelFontColor ? dataPoint.indexLabelFontColor : dataSeries.indexLabelFontColor;
                dataPointEO.indexLabelFontStyle = dataPoint.indexLabelFontStyle ? dataPoint.indexLabelFontStyle : dataSeries.indexLabelFontStyle;
                dataPointEO.indexLabelFontWeight = dataPoint.indexLabelFontWeight ? dataPoint.indexLabelFontWeight : dataSeries.indexLabelFontWeight;
                dataPointEO.indexLabelFontSize = dataPoint.indexLabelFontSize ? dataPoint.indexLabelFontSize : dataSeries.indexLabelFontSize;
                dataPointEO.indexLabelFontFamily = dataPoint.indexLabelFontFamily ? dataPoint.indexLabelFontFamily : dataSeries.indexLabelFontFamily;
                dataPointEO.indexLabelBackgroundColor = dataPoint.indexLabelBackgroundColor ? dataPoint.indexLabelBackgroundColor : dataSeries.indexLabelBackgroundColor ? dataSeries.indexLabelBackgroundColor : null;
                dataPointEO.indexLabelMaxWidth = dataPoint.indexLabelMaxWidth ? dataPoint.indexLabelMaxWidth : dataSeries.indexLabelMaxWidth ? dataSeries.indexLabelMaxWidth : .33 * plotArea.width;
                dataPointEO.indexLabelWrap = "undefined" != typeof dataPoint.indexLabelWrap ? dataPoint.indexLabelWrap : dataSeries.indexLabelWrap;
                dataPointEO.startAngle = 0 === j ? dataSeries.startAngle ? dataSeries.startAngle / 180 * Math.PI : 0 : dataPointEOs[j - 1].endAngle;
                dataPointEO.startAngle = (dataPointEO.startAngle + 2 * Math.PI) % (2 * Math.PI);
                dataPointEO.endAngle = dataPointEO.startAngle + 2 * Math.PI / sum * Math.abs(dataPoint.y);
                var midAngle = (dataPointEO.endAngle + dataPointEO.startAngle) / 2;
                midAngle = (midAngle + 2 * Math.PI) % (2 * Math.PI);
                dataPointEO.midAngle = midAngle;
                if (dataPointEO.midAngle > Math.PI / 2 - poleAnglularDistance && dataPointEO.midAngle < Math.PI / 2 + poleAnglularDistance) {
                    (0 === noDPNearSouthPole || dataPointEOs[firstDPCloseToSouth].midAngle > dataPointEO.midAngle) && (firstDPCloseToSouth = j);
                    noDPNearSouthPole++;
                } else if (dataPointEO.midAngle > 3 * Math.PI / 2 - poleAnglularDistance && dataPointEO.midAngle < 3 * Math.PI / 2 + poleAnglularDistance) {
                    (0 === noDPNearNorthPole || dataPointEOs[firstDPCloseToNorth].midAngle > dataPointEO.midAngle) && (firstDPCloseToNorth = j);
                    noDPNearNorthPole++;
                }
                dataPointEO.hemisphere = midAngle > Math.PI / 2 && midAngle <= 3 * Math.PI / 2 ? "left" : "right";
                dataPointEO.indexLabelTextBlock = new TextBlock(_this.plotArea.ctx, {
                    fontSize: dataPointEO.indexLabelFontSize,
                    fontFamily: dataPointEO.indexLabelFontFamily,
                    fontColor: dataPointEO.indexLabelFontColor,
                    fontStyle: dataPointEO.indexLabelFontStyle,
                    fontWeight: dataPointEO.indexLabelFontWeight,
                    horizontalAlign: "left",
                    backgroundColor: dataPointEO.indexLabelBackgroundColor,
                    maxWidth: dataPointEO.indexLabelMaxWidth,
                    maxHeight: dataPointEO.indexLabelWrap ? 5 * dataPointEO.indexLabelFontSize : 1.5 * dataPointEO.indexLabelFontSize,
                    text: dataPointEO.indexLabelText,
                    padding: 0,
                    textBaseline: "top"
                });
                dataPointEO.indexLabelTextBlock.measureText();
            }
            var noOfDPToRightOfSouthPole = 0;
            var noOfDPToLeftOfNorthPole = 0;
            var keepSameDirection = false;
            for (j = 0; j < dataPoints.length; j++) {
                var dataPointEO = dataPointEOs[(firstDPCloseToSouth + j) % dataPoints.length];
                if (noDPNearSouthPole > 1 && dataPointEO.midAngle > Math.PI / 2 - poleAnglularDistance && dataPointEO.midAngle < Math.PI / 2 + poleAnglularDistance) if (noDPNearSouthPole / 2 >= noOfDPToRightOfSouthPole && !keepSameDirection) {
                    dataPointEO.hemisphere = "right";
                    noOfDPToRightOfSouthPole++;
                } else {
                    dataPointEO.hemisphere = "left";
                    keepSameDirection = true;
                }
            }
            keepSameDirection = false;
            for (j = 0; j < dataPoints.length; j++) {
                var dataPointEO = dataPointEOs[(firstDPCloseToNorth + j) % dataPoints.length];
                if (noDPNearNorthPole > 1 && dataPointEO.midAngle > 3 * Math.PI / 2 - poleAnglularDistance && dataPointEO.midAngle < 3 * Math.PI / 2 + poleAnglularDistance) if (noDPNearNorthPole / 2 >= noOfDPToLeftOfNorthPole && !keepSameDirection) {
                    dataPointEO.hemisphere = "left";
                    noOfDPToLeftOfNorthPole++;
                } else {
                    dataPointEO.hemisphere = "right";
                    keepSameDirection = true;
                }
            }
        }
        function renderLabels() {
            var ctx = _this.plotArea.ctx;
            ctx.fillStyle = "black";
            ctx.strokeStyle = "grey";
            ctx.textBaseline = "middle";
            ctx.lineJoin = "round";
            var i = 0;
            for (i = 0; i < dataPoints.length; i++) {
                var dataPointEO = dataPointEOs[i];
                if (!dataPointEO.indexLabelText) continue;
                dataPointEO.indexLabelTextBlock.y -= dataPointEO.indexLabelTextBlock.height / 2;
                var xOffset = 0;
                if ("left" === dataPointEO.hemisphere) var xOffset = "inside" !== dataSeries.indexLabelPlacement ? -(dataPointEO.indexLabelTextBlock.width + indexLabelLineEdgeLength) : -dataPointEO.indexLabelTextBlock.width / 2; else var xOffset = "inside" !== dataSeries.indexLabelPlacement ? indexLabelLineEdgeLength : -dataPointEO.indexLabelTextBlock.width / 2;
                dataPointEO.indexLabelTextBlock.x += xOffset;
                dataPointEO.indexLabelTextBlock.render(true);
                dataPointEO.indexLabelTextBlock.x -= xOffset;
                dataPointEO.indexLabelTextBlock.y += dataPointEO.indexLabelTextBlock.height / 2;
                if ("inside" !== dataPointEO.indexLabelPlacement) {
                    var indexLabelLineStartX = dataPointEO.center.x + outerRadius * Math.cos(dataPointEO.midAngle);
                    var indexLabelLineStartY = dataPointEO.center.y + outerRadius * Math.sin(dataPointEO.midAngle);
                    ctx.strokeStyle = dataPointEO.indexLabelLineColor;
                    ctx.lineWidth = dataPointEO.indexLabelLineThickness;
                    ctx.beginPath();
                    ctx.moveTo(indexLabelLineStartX, indexLabelLineStartY);
                    ctx.lineTo(dataPointEO.indexLabelTextBlock.x, dataPointEO.indexLabelTextBlock.y);
                    ctx.lineTo(dataPointEO.indexLabelTextBlock.x + ("left" === dataPointEO.hemisphere ? -indexLabelLineEdgeLength : indexLabelLineEdgeLength), dataPointEO.indexLabelTextBlock.y);
                    ctx.stroke();
                }
                ctx.lineJoin = "miter";
            }
        }
        function animate(fractionComplete) {
            var ctx = _this.plotArea.ctx;
            ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ctx.fillStyle = _this.backgroundColor;
            ctx.fillRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            var maxAngle = dataPointEOs[0].startAngle + 2 * Math.PI * fractionComplete;
            for (var i = 0; i < dataPoints.length; i++) {
                var startAngle = 0 === i ? dataPointEOs[i].startAngle : endAngle;
                var endAngle = startAngle + (dataPointEOs[i].endAngle - dataPointEOs[i].startAngle);
                var shouldBreak = false;
                if (endAngle > maxAngle) {
                    endAngle = maxAngle;
                    shouldBreak = true;
                }
                var color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                endAngle > startAngle && drawSegment(_this.plotArea.ctx, dataPointEOs[i].center, dataPointEOs[i].radius, color, dataSeries.type, startAngle, endAngle, dataSeries.fillOpacity);
                if (shouldBreak) break;
            }
        }
        function explodeToggle(fractionComplete) {
            var ctx = _this.plotArea.ctx;
            ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ctx.fillStyle = _this.backgroundColor;
            ctx.fillRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            for (var i = 0; i < dataPoints.length; i++) {
                var startAngle = dataPointEOs[i].startAngle;
                var endAngle = dataPointEOs[i].endAngle;
                if (endAngle > startAngle) {
                    var offsetX = .07 * outerRadius * Math.cos(dataPointEOs[i].midAngle);
                    var offsetY = .07 * outerRadius * Math.sin(dataPointEOs[i].midAngle);
                    var isInTransition = false;
                    if (dataPoints[i].exploded) {
                        if (Math.abs(dataPointEOs[i].center.x - (center.x + offsetX)) > 1e-9 || Math.abs(dataPointEOs[i].center.y - (center.y + offsetY)) > 1e-9) {
                            dataPointEOs[i].center.x = center.x + offsetX * fractionComplete;
                            dataPointEOs[i].center.y = center.y + offsetY * fractionComplete;
                            isInTransition = true;
                        }
                    } else if (Math.abs(dataPointEOs[i].center.x - center.x) > 0 || Math.abs(dataPointEOs[i].center.y - center.y) > 0) {
                        dataPointEOs[i].center.x = center.x + offsetX * (1 - fractionComplete);
                        dataPointEOs[i].center.y = center.y + offsetY * (1 - fractionComplete);
                        isInTransition = true;
                    }
                    if (isInTransition) {
                        var entry = {};
                        entry.dataSeries = dataSeries;
                        entry.dataPoint = dataSeries.dataPoints[i];
                        entry.index = i;
                        _this._toolTip.highlightObjects([ entry ]);
                    }
                    var color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawSegment(_this.plotArea.ctx, dataPointEOs[i].center, dataPointEOs[i].radius, color, dataSeries.type, startAngle, endAngle, dataSeries.fillOpacity);
                }
            }
            renderLabels();
        }
        function areDataPointsTooClose(first, second) {
            var label1 = {
                x1: first.indexLabelTextBlock.x,
                y1: first.indexLabelTextBlock.y - first.indexLabelTextBlock.height / 2,
                x2: first.indexLabelTextBlock.x + first.indexLabelTextBlock.width,
                y2: first.indexLabelTextBlock.y + first.indexLabelTextBlock.height / 2
            };
            var label2 = {
                x1: second.indexLabelTextBlock.x,
                y1: second.indexLabelTextBlock.y - second.indexLabelTextBlock.height / 2,
                x2: second.indexLabelTextBlock.x + second.indexLabelTextBlock.width,
                y2: second.indexLabelTextBlock.y + second.indexLabelTextBlock.height / 2
            };
            if (label1.x2 < label2.x1 - indexLabelLineEdgeLength || label1.x1 > label2.x2 + indexLabelLineEdgeLength || label1.y1 > label2.y2 + indexLabelLineEdgeLength || label1.y2 < label2.y1 - indexLabelLineEdgeLength) return false;
            return true;
        }
        function getVerticalDistanceBetweenLabels(first, second) {
            var distance = 0;
            var label1 = {
                y: first.indexLabelTextBlock.y,
                y1: first.indexLabelTextBlock.y - first.indexLabelTextBlock.height / 2,
                y2: first.indexLabelTextBlock.y + first.indexLabelTextBlock.height / 2
            };
            var label2 = {
                y: second.indexLabelTextBlock.y,
                y1: second.indexLabelTextBlock.y - second.indexLabelTextBlock.height / 2,
                y2: second.indexLabelTextBlock.y + second.indexLabelTextBlock.height / 2
            };
            distance = label2.y > label1.y ? label2.y1 - label1.y2 : label1.y1 - label2.y2;
            return distance;
        }
        function getNextLabelIndex(currentLabelIndex) {
            var nextLabelIndex = null;
            for (var i = 1; i < dataPoints.length; i++) {
                nextLabelIndex = (currentLabelIndex + i + dataPointEOs.length) % dataPointEOs.length;
                if (dataPointEOs[nextLabelIndex].hemisphere !== dataPointEOs[currentLabelIndex].hemisphere) {
                    nextLabelIndex = null;
                    break;
                }
                if (dataPointEOs[nextLabelIndex].indexLabelText && nextLabelIndex !== currentLabelIndex && (getVerticalDistanceBetweenLabels(dataPointEOs[nextLabelIndex], dataPointEOs[currentLabelIndex]) < 0 || ("right" === dataPointEOs[currentLabelIndex].hemisphere ? dataPointEOs[nextLabelIndex].indexLabelTextBlock.y >= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y : dataPointEOs[nextLabelIndex].indexLabelTextBlock.y <= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y))) break;
                nextLabelIndex = null;
            }
            return nextLabelIndex;
        }
        function getPreviousLabelIndex(currentLabelIndex) {
            var prevLabelIndex = null;
            for (var i = 1; i < dataPoints.length; i++) {
                prevLabelIndex = (currentLabelIndex - i + dataPointEOs.length) % dataPointEOs.length;
                if (dataPointEOs[prevLabelIndex].hemisphere !== dataPointEOs[currentLabelIndex].hemisphere) {
                    prevLabelIndex = null;
                    break;
                }
                if (dataPointEOs[prevLabelIndex].indexLabelText && dataPointEOs[prevLabelIndex].hemisphere === dataPointEOs[currentLabelIndex].hemisphere && prevLabelIndex !== currentLabelIndex && (getVerticalDistanceBetweenLabels(dataPointEOs[prevLabelIndex], dataPointEOs[currentLabelIndex]) < 0 || ("right" === dataPointEOs[currentLabelIndex].hemisphere ? dataPointEOs[prevLabelIndex].indexLabelTextBlock.y <= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y : dataPointEOs[prevLabelIndex].indexLabelTextBlock.y >= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y))) break;
                prevLabelIndex = null;
            }
            return prevLabelIndex;
        }
        function rePositionLabels(dataPointIndex, offset) {
            offset = offset || 0;
            var actualOffset = 0;
            var labelYMin = center.y - 1 * indexLabelRadius;
            var labelYMax = center.y + 1 * indexLabelRadius;
            if (dataPointIndex >= 0 && dataPointIndex < dataPoints.length) {
                var dataPointEO = dataPointEOs[dataPointIndex];
                if (0 > offset && dataPointEO.indexLabelTextBlock.y < labelYMin || offset > 0 && dataPointEO.indexLabelTextBlock.y > labelYMax) return 0;
                var validOffset = offset;
                var distFromIndexLineStart = 0;
                var indexLabelLineStartX = 0;
                var indexLabelLineStartY = 0;
                var indexLabelAngle = 0;
                var indexLabelAngleWhenTangent = 0;
                0 > validOffset ? dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 > labelYMin && dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 + validOffset < labelYMin && (validOffset = -(labelYMin - (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 + validOffset))) : dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 < labelYMin && dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + validOffset > labelYMax && (validOffset = dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + validOffset - labelYMax);
                var newlabelY = dataPointEO.indexLabelTextBlock.y + validOffset;
                var newlabelX = 0;
                newlabelX = "right" === dataPointEO.hemisphere ? center.x + Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newlabelY - center.y, 2)) : center.x - Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newlabelY - center.y, 2));
                indexLabelLineStartX = center.x + outerRadius * Math.cos(dataPointEO.midAngle);
                indexLabelLineStartY = center.y + outerRadius * Math.sin(dataPointEO.midAngle);
                distFromIndexLineStart = Math.sqrt(Math.pow(newlabelX - indexLabelLineStartX, 2) + Math.pow(newlabelY - indexLabelLineStartY, 2));
                indexLabelAngleWhenTangent = Math.acos(outerRadius / indexLabelRadius);
                indexLabelAngle = Math.acos((indexLabelRadius * indexLabelRadius + outerRadius * outerRadius - distFromIndexLineStart * distFromIndexLineStart) / (2 * outerRadius * indexLabelRadius));
                validOffset = indexLabelAngleWhenTangent > indexLabelAngle ? newlabelY - dataPointEO.indexLabelTextBlock.y : 0;
                var prevDataPointIndex = getPreviousLabelIndex(dataPointIndex);
                var nextDataPointIndex = getNextLabelIndex(dataPointIndex);
                var otherDataPointIndex, distanceFromOtherLabel;
                var otherDataPointOffset = 0;
                var otherDataPointActualOffset = 0;
                if (0 > validOffset) {
                    otherDataPointIndex = "right" === dataPointEO.hemisphere ? prevDataPointIndex : nextDataPointIndex;
                    actualOffset = validOffset;
                    if (null !== otherDataPointIndex) {
                        var tempOffset = -validOffset;
                        var distanceFromOtherLabel = dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 - (dataPointEOs[otherDataPointIndex].indexLabelTextBlock.y + dataPointEOs[otherDataPointIndex].indexLabelTextBlock.height / 2);
                        if (minDistanceBetweenLabels > distanceFromOtherLabel - tempOffset) {
                            otherDataPointOffset = -tempOffset;
                            totalRecursions++;
                            otherDataPointActualOffset = rePositionLabels(otherDataPointIndex, otherDataPointOffset);
                            +otherDataPointActualOffset.toFixed(precision) > +otherDataPointOffset.toFixed(precision) && (actualOffset = distanceFromOtherLabel > minDistanceBetweenLabels ? -(distanceFromOtherLabel - minDistanceBetweenLabels) : -(tempOffset - (otherDataPointActualOffset - otherDataPointOffset)));
                        }
                    }
                } else if (validOffset > 0) {
                    otherDataPointIndex = "right" === dataPointEO.hemisphere ? nextDataPointIndex : prevDataPointIndex;
                    actualOffset = validOffset;
                    if (null !== otherDataPointIndex) {
                        var tempOffset = validOffset;
                        var distanceFromOtherLabel = dataPointEOs[otherDataPointIndex].indexLabelTextBlock.y - dataPointEOs[otherDataPointIndex].indexLabelTextBlock.height / 2 - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2);
                        if (minDistanceBetweenLabels > distanceFromOtherLabel - tempOffset) {
                            otherDataPointOffset = tempOffset;
                            totalRecursions++;
                            otherDataPointActualOffset = rePositionLabels(otherDataPointIndex, otherDataPointOffset);
                            +otherDataPointActualOffset.toFixed(precision) < +otherDataPointOffset.toFixed(precision) && (actualOffset = distanceFromOtherLabel > minDistanceBetweenLabels ? distanceFromOtherLabel - minDistanceBetweenLabels : tempOffset - (otherDataPointOffset - otherDataPointActualOffset));
                        }
                    }
                }
                if (actualOffset) {
                    var newLabelY = dataPointEO.indexLabelTextBlock.y + actualOffset;
                    var newLabelX = 0;
                    newLabelX = "right" === dataPointEO.hemisphere ? center.x + Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newLabelY - center.y, 2)) : center.x - Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newLabelY - center.y, 2));
                    if (dataPointEO.midAngle > Math.PI / 2 - poleAnglularDistance && dataPointEO.midAngle < Math.PI / 2 + poleAnglularDistance) {
                        var prevDPIndex = (dataPointIndex - 1 + dataPointEOs.length) % dataPointEOs.length;
                        var prevDP = dataPointEOs[prevDPIndex];
                        var nextDP = dataPointEOs[(dataPointIndex + 1 + dataPointEOs.length) % dataPointEOs.length];
                        "left" === dataPointEO.hemisphere && "right" === prevDP.hemisphere && newLabelX > prevDP.indexLabelTextBlock.x ? newLabelX = prevDP.indexLabelTextBlock.x - 15 : "right" === dataPointEO.hemisphere && "left" === nextDP.hemisphere && newLabelX < nextDP.indexLabelTextBlock.x && (newLabelX = nextDP.indexLabelTextBlock.x + 15);
                    } else if (dataPointEO.midAngle > 3 * Math.PI / 2 - poleAnglularDistance && dataPointEO.midAngle < 3 * Math.PI / 2 + poleAnglularDistance) {
                        var prevDPIndex = (dataPointIndex - 1 + dataPointEOs.length) % dataPointEOs.length;
                        var prevDP = dataPointEOs[prevDPIndex];
                        var nextDP = dataPointEOs[(dataPointIndex + 1 + dataPointEOs.length) % dataPointEOs.length];
                        "right" === dataPointEO.hemisphere && "left" === prevDP.hemisphere && newLabelX < prevDP.indexLabelTextBlock.x ? newLabelX = prevDP.indexLabelTextBlock.x + 15 : "left" === dataPointEO.hemisphere && "right" === nextDP.hemisphere && newLabelX > nextDP.indexLabelTextBlock.x && (newLabelX = nextDP.indexLabelTextBlock.x - 15);
                    }
                    dataPointEO.indexLabelTextBlock.y = newLabelY;
                    dataPointEO.indexLabelTextBlock.x = newLabelX;
                    dataPointEO.indexLabelAngle = Math.atan2(dataPointEO.indexLabelTextBlock.y - center.y, dataPointEO.indexLabelTextBlock.x - center.x);
                }
            }
            return actualOffset;
        }
        function positionLabels() {
            function removeLabelsForSmallSegments(totalOverlap, startIndex, endIndex) {
                var dpEOs = [];
                var totalRemovedLabelHeight = 0;
                for (var i = startIndex; true; i = (i + 1 + dataPoints.length) % dataPoints.length) {
                    dpEOs.push(dataPointEOs[i]);
                    if (i === endIndex) break;
                }
                dpEOs.sort(function(entry1, entry2) {
                    return entry1.y - entry2.y;
                });
                for (i = 0; i < dpEOs.length; i++) {
                    var dpEO = dpEOs[i];
                    if (!(totalOverlap > totalRemovedLabelHeight)) break;
                    totalRemovedLabelHeight += dpEO.indexLabelTextBlock.height;
                    dpEO.indexLabelTextBlock.text = "";
                    dpEO.indexLabelText = "";
                    dpEO.indexLabelTextBlock.measureText();
                }
            }
            var ctx = _this.plotArea.ctx;
            ctx.fillStyle = "grey";
            ctx.strokeStyle = "grey";
            var fontSize = 16;
            ctx.font = fontSize + "px Arial";
            ctx.textBaseline = "middle";
            var i = 0, j = 0;
            var deltaR = 0;
            for (j = 0; 10 > j && (1 > j || deltaR > 0); j++) {
                outerRadius -= deltaR;
                deltaR = 0;
                if ("inside" !== dataSeries.indexLabelPlacement) {
                    indexLabelRadius = outerRadius * indexLabelRadiusToRadiusRatio;
                    for (i = 0; i < dataPoints.length; i++) {
                        var dataPointEO = dataPointEOs[i];
                        dataPointEO.indexLabelTextBlock.x = center.x + indexLabelRadius * Math.cos(dataPointEO.midAngle);
                        dataPointEO.indexLabelTextBlock.y = center.y + indexLabelRadius * Math.sin(dataPointEO.midAngle);
                        dataPointEO.indexLabelAngle = dataPointEO.midAngle;
                        dataPointEO.radius = outerRadius;
                    }
                    var currentDataPoint, nextDataPoint;
                    for (i = 0; i < dataPoints.length; i++) {
                        var dataPointEO = dataPointEOs[i];
                        var nextDataPointIndex = getNextLabelIndex(i);
                        if (null === nextDataPointIndex) continue;
                        currentDataPoint = dataPointEOs[i];
                        nextDataPoint = dataPointEOs[nextDataPointIndex];
                        var distanceFromNextLabel = 0;
                        distanceFromNextLabel = getVerticalDistanceBetweenLabels(currentDataPoint, nextDataPoint) - minDistanceBetweenLabels;
                        if (0 > distanceFromNextLabel) {
                            var dataPointsAbove = 0;
                            var dataPointsBelow = 0;
                            for (var k = 0; k < dataPoints.length; k++) {
                                if (k === i) continue;
                                if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere) continue;
                                dataPointEOs[k].indexLabelTextBlock.y < dataPointEO.indexLabelTextBlock.y ? dataPointsAbove++ : dataPointsBelow++;
                            }
                            var upWardsOffset = distanceFromNextLabel / (dataPointsAbove + dataPointsBelow || 1) * dataPointsBelow;
                            var downWardsOffset = -1 * (distanceFromNextLabel - upWardsOffset);
                            var actualUpwardOffset = 0;
                            var actualDownwardOffset = 0;
                            if ("right" === dataPointEO.hemisphere) {
                                actualUpwardOffset = rePositionLabels(i, upWardsOffset);
                                downWardsOffset = -1 * (distanceFromNextLabel - actualUpwardOffset);
                                actualDownwardOffset = rePositionLabels(nextDataPointIndex, downWardsOffset);
                                +actualDownwardOffset.toFixed(precision) < +downWardsOffset.toFixed(precision) && +actualUpwardOffset.toFixed(precision) <= +upWardsOffset.toFixed(precision) && rePositionLabels(i, -(downWardsOffset - actualDownwardOffset));
                            } else {
                                actualUpwardOffset = rePositionLabels(nextDataPointIndex, upWardsOffset);
                                downWardsOffset = -1 * (distanceFromNextLabel - actualUpwardOffset);
                                actualDownwardOffset = rePositionLabels(i, downWardsOffset);
                                +actualDownwardOffset.toFixed(precision) < +downWardsOffset.toFixed(precision) && +actualUpwardOffset.toFixed(precision) <= +upWardsOffset.toFixed(precision) && rePositionLabels(nextDataPointIndex, -(downWardsOffset - actualDownwardOffset));
                            }
                        }
                    }
                } else for (i = 0; i < dataPoints.length; i++) {
                    var dataPointEO = dataPointEOs[i];
                    indexLabelRadius = "pie" === dataSeries.type ? .7 * outerRadius : .8 * outerRadius;
                    var dx = center.x + indexLabelRadius * Math.cos(dataPointEO.midAngle);
                    var dy = center.y + indexLabelRadius * Math.sin(dataPointEO.midAngle);
                    dataPointEO.indexLabelTextBlock.x = dx;
                    dataPointEO.indexLabelTextBlock.y = dy;
                }
                for (i = 0; i < dataPoints.length; i++) {
                    dataPointEO = dataPointEOs[i];
                    var size = dataPointEO.indexLabelTextBlock.measureText();
                    if (0 === size.height || 0 === size.width) continue;
                    var xOverFlow = 0;
                    var xdr = 0;
                    if ("right" === dataPointEO.hemisphere) {
                        xOverFlow = plotArea.x2 - (dataPointEO.indexLabelTextBlock.x + dataPointEO.indexLabelTextBlock.width + indexLabelLineEdgeLength);
                        xOverFlow *= -1;
                    } else xOverFlow = plotArea.x1 - (dataPointEO.indexLabelTextBlock.x - dataPointEO.indexLabelTextBlock.width - indexLabelLineEdgeLength);
                    if (xOverFlow > 0 && (Math.abs(dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 - center.y) < outerRadius || Math.abs(dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 - center.y) < outerRadius)) {
                        xdr = xOverFlow / Math.abs(Math.cos(dataPointEO.indexLabelAngle));
                        xdr > 9 && (xdr = .3 * xdr);
                        xdr > deltaR && (deltaR = xdr);
                    }
                    var yOverFlow = 0;
                    var ydr = 0;
                    if (dataPointEO.indexLabelAngle > 0 && dataPointEO.indexLabelAngle < Math.PI) {
                        yOverFlow = plotArea.y2 - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + 5);
                        yOverFlow *= -1;
                    } else yOverFlow = plotArea.y1 - (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 - 5);
                    if (yOverFlow > 0 && Math.abs(dataPointEO.indexLabelTextBlock.x - center.x) < outerRadius) {
                        ydr = yOverFlow / Math.abs(Math.sin(dataPointEO.indexLabelAngle));
                        ydr > 9 && (ydr = .3 * ydr);
                        ydr > deltaR && (deltaR = ydr);
                    }
                }
                var overlapStartIndex = -1;
                var overlapEndIndex = -1;
                var totalOverlap = 0;
                for (var k = 0; k < dataPoints.length; k++) {
                    currentDataPoint = dataPointEOs[k];
                    if (!currentDataPoint.indexLabelText) continue;
                    var nextLabelIndex = getNextLabelIndex(k);
                    if (null === nextLabelIndex) continue;
                    var nextDataPoint = dataPointEOs[nextLabelIndex];
                    distanceFromNextLabel = 0;
                    distanceFromNextLabel = getVerticalDistanceBetweenLabels(currentDataPoint, nextDataPoint);
                    if (0 > distanceFromNextLabel && areDataPointsTooClose(currentDataPoint, nextDataPoint)) {
                        0 > overlapStartIndex && (overlapStartIndex = k);
                        nextLabelIndex !== overlapStartIndex && (overlapEndIndex = nextLabelIndex);
                        totalOverlap += -distanceFromNextLabel;
                    } else if (totalOverlap > 0) {
                        removeLabelsForSmallSegments(totalOverlap, overlapStartIndex, overlapEndIndex);
                        overlapStartIndex = -1;
                        overlapEndIndex = -1;
                        totalOverlap = 0;
                    }
                }
                totalOverlap > 0 && removeLabelsForSmallSegments(totalOverlap, overlapStartIndex, overlapEndIndex);
            }
        }
        var _this = this;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (0 >= totalDataSeries) return;
        var dataSeriesIndex = plotUnit.dataSeriesIndexes[0];
        var dataSeries = this.data[dataSeriesIndex];
        var dataPoints = dataSeries.dataPoints;
        var indexLabelLineEdgeLength = 10;
        var explodeDuration = 500;
        var plotArea = this.plotArea;
        var totalRecursions = 0;
        var dataPointEOs = [];
        var minDistanceBetweenLabels = 2;
        var indexLabelRadiusToRadiusRatio = 1.3;
        var poleAnglularDistance = 20 / 180 * Math.PI;
        var precision = 6;
        var center = {
            x: (plotArea.x2 + plotArea.x1) / 2,
            y: (plotArea.y2 + plotArea.y1) / 2
        };
        var outerRadius = "inside" === dataSeries.indexLabelPlacement ? .95 * Math.min(plotArea.width, plotArea.height) / 2 : .8 * Math.min(plotArea.width, plotArea.height) / 2;
        var indexLabelRadius = outerRadius * indexLabelRadiusToRadiusRatio;
        var sum = 0;
        for (var j = 0; j < dataPoints.length; j++) sum += Math.abs(dataPoints[j].y);
        if (0 === sum) return;
        this.pieDoughnutClickHandler = function(e) {
            if (_this.isAnimating) return;
            var i = e.dataPointIndex;
            var dataPoint = e.dataPoint;
            var dataSeries = this;
            dataSeries.dataPointIds[i];
            dataPoint.exploded = dataPoint.exploded ? false : true;
            dataSeries.dataPoints.length > 1 && _this._animator.animate(0, explodeDuration, function(fractionComplete) {
                explodeToggle(fractionComplete);
            });
            return;
        };
        initLabels();
        positionLabels();
        this.disableToolTip = true;
        this._animator.animate(0, this.animatedRender ? this.animationDuration : 0, function(fractionComplete) {
            animate(fractionComplete);
        }, function() {
            _this.disableToolTip = false;
            _this._animator.animate(0, _this.animatedRender ? explodeDuration : 0, function(fractionComplete) {
                explodeToggle(fractionComplete);
            });
        });
    };
    Chart.prototype.animationRequestId = null;
    Chart.prototype.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1e3 / 60);
        };
    }();
    Chart.prototype.cancelRequestAnimFrame = function() {
        return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
    }();
    LayoutManager.prototype.registerSpace = function(position, size) {
        "top" === position ? this._topOccupied += size.height : "bottom" === position ? this._bottomOccupied += size.height : "left" === position ? this._leftOccupied += size.width : "right" === position && (this._rightOccupied += size.width);
    };
    LayoutManager.prototype.unRegisterSpace = function(position, size) {
        "top" === position ? this._topOccupied -= size.height : "bottom" === position ? this._bottomOccupied -= size.height : "left" === position ? this._leftOccupied -= size.width : "right" === position && (this._rightOccupied -= size.width);
    };
    LayoutManager.prototype.getFreeSpace = function() {
        return {
            x1: this._leftOccupied,
            y1: this._topOccupied,
            x2: this.chart.width - this._rightOccupied,
            y2: this.chart.height - this._bottomOccupied,
            width: this.chart.width - this._rightOccupied - this._leftOccupied,
            height: this.chart.height - this._bottomOccupied - this._topOccupied
        };
    };
    LayoutManager.prototype.reset = function() {
        this._topOccupied = 0;
        this._bottomOccupied = 3;
        this._leftOccupied = 0;
        this._rightOccupied = 0;
    };
    extend(TextBlock, CanvasJSObject);
    TextBlock.prototype.render = function(preserveContext) {
        preserveContext && this.ctx.save();
        var font = this.ctx.font;
        this.ctx.textBaseline = this.textBaseline;
        var offsetY = 0;
        this._isDirty && this.measureText(this.ctx);
        this.ctx.translate(this.x, this.y + offsetY);
        "middle" === this.textBaseline && (offsetY = -this._lineHeight / 2);
        this.ctx.font = this._getFontString();
        this.ctx.rotate(Math.PI / 180 * this.angle);
        var textLeft = 0;
        var textTop = this.padding;
        var line = null;
        (this.borderThickness > 0 && this.borderColor || this.backgroundColor) && this.ctx.roundRect(0, offsetY, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);
        this.ctx.fillStyle = this.fontColor;
        for (var i = 0; i < this._wrappedText.lines.length; i++) {
            line = this._wrappedText.lines[i];
            "right" === this.horizontalAlign ? textLeft = this.width - line.width - this.padding : "left" === this.horizontalAlign ? textLeft = this.padding : "center" === this.horizontalAlign && (textLeft = (this.width - 2 * this.padding) / 2 - line.width / 2 + this.padding);
            this.ctx.fillText(line.text, textLeft, textTop);
            textTop += line.height;
        }
        this.ctx.font = font;
        preserveContext && this.ctx.restore();
    };
    TextBlock.prototype.setText = function(text) {
        this.text = text;
        this._isDirty = true;
        this._wrappedText = null;
    };
    TextBlock.prototype.measureText = function() {
        if (null === this.maxWidth) throw "Please set maxWidth and height for TextBlock";
        this._wrapText(this.ctx);
        this._isDirty = false;
        return {
            width: this.width,
            height: this.height
        };
    };
    TextBlock.prototype._getLineWithWidth = function(text, width, clipWord) {
        text = String(text);
        clipWord = clipWord || false;
        if (!text) return {
            text: "",
            width: 0
        };
        var textWidth = 0, min = 0, max = text.length - 1, mid = 1/0;
        this.ctx.font = this._getFontString();
        while (max >= min) {
            mid = Math.floor((min + max) / 2);
            var tempText = text.substr(0, mid + 1);
            textWidth = this.ctx.measureText(tempText).width;
            if (width > textWidth) min = mid + 1; else {
                if (!(textWidth > width)) break;
                max = mid - 1;
            }
        }
        if (textWidth > width && tempText.length > 1) {
            tempText = tempText.substr(0, tempText.length - 1);
            textWidth = this.ctx.measureText(tempText).width;
        }
        var isClipped = true;
        (tempText.length === text.length || " " === text[tempText.length]) && (isClipped = false);
        if (isClipped) {
            var resultWords = tempText.split(" ");
            resultWords.length > 1 && resultWords.pop();
            tempText = resultWords.join(" ");
            textWidth = this.ctx.measureText(tempText).width;
        }
        return {
            text: tempText,
            width: textWidth
        };
    };
    TextBlock.prototype._wrapText = function() {
        var text = new String(trimString(this.text));
        var lines = [];
        var font = this.ctx.font;
        var height = 0;
        var width = 0;
        this.ctx.font = this._getFontString();
        while (text.length > 0) {
            var maxWidth = this.maxWidth - 2 * this.padding;
            var maxHeight = this.maxHeight - 2 * this.padding;
            var line = this._getLineWithWidth(text, maxWidth, false);
            line.height = this._lineHeight;
            lines.push(line);
            width = Math.max(width, line.width);
            height += line.height;
            text = trimString(text.slice(line.text.length, text.length));
            if (maxHeight && height > maxHeight) {
                var line = lines.pop();
                height -= line.height;
            }
        }
        this._wrappedText = {
            lines: lines,
            width: width,
            height: height
        };
        this.width = width + 2 * this.padding;
        this.height = height + 2 * this.padding;
        this.ctx.font = font;
    };
    TextBlock.prototype._getFontString = function() {
        return getFontString("", this, null);
    };
    extend(Title, CanvasJSObject);
    Title.prototype.render = function() {
        if (!this.text) return;
        var freespace = this.chart.layoutManager.getFreeSpace();
        var left = 0;
        var top = 0;
        var angle = 0;
        var maxWidth = 0;
        var maxHeight = 0;
        var textBlockHorizontalAlign;
        var position;
        if ("top" === this.verticalAlign || "bottom" === this.verticalAlign) {
            maxWidth = freespace.width - 2 * this.margin;
            maxHeight = .5 * freespace.height - 2 * this.margin;
            angle = 0;
        } else if ("center" === this.verticalAlign) if ("left" === this.horizontalAlign || "right" === this.horizontalAlign) {
            maxWidth = freespace.height - 2 * this.margin;
            maxHeight = .5 * freespace.width - 2 * this.margin;
        } else if ("center" === this.horizontalAlign) {
            maxWidth = freespace.width - 2 * this.margin;
            maxHeight = .5 * freespace.height - 2 * this.margin;
        }
        var textBlock = new TextBlock(this.ctx, {
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            fontColor: this.fontColor,
            fontStyle: this.fontStyle,
            fontWeight: this.fontWeight,
            horizontalAlign: this.horizontalAlign,
            verticalAlign: this.verticalAlign,
            borderColor: this.borderColor,
            borderThickness: this.borderThickness,
            backgroundColor: this.backgroundColor,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            cornerRadius: this.cornerRadius,
            text: this.text,
            padding: this.padding,
            textBaseline: "top"
        });
        var textBlockSize = textBlock.measureText();
        if ("top" === this.verticalAlign || "bottom" === this.verticalAlign) {
            if ("top" === this.verticalAlign) {
                top = this.margin;
                position = "top";
            } else if ("bottom" === this.verticalAlign) {
                top = freespace.y2 - this.margin - textBlockSize.height;
                position = "bottom";
            }
            "left" === this.horizontalAlign ? left = freespace.x1 + this.margin : "center" === this.horizontalAlign ? left = freespace.x1 + (maxWidth / 2 - textBlockSize.width / 2) + this.margin : "right" === this.horizontalAlign && (left = freespace.x2 - this.margin - textBlockSize.width);
            textBlockHorizontalAlign = this.horizontalAlign;
            this.width = textBlockSize.width;
            this.height = textBlockSize.height;
        } else if ("center" === this.verticalAlign) {
            if ("left" === this.horizontalAlign) {
                left = freespace.x1 + this.margin;
                top = freespace.y2 - this.margin - (maxWidth / 2 - textBlockSize.width / 2);
                angle = -90;
                position = "left";
                this.width = textBlockSize.height;
                this.height = textBlockSize.width;
            } else if ("right" === this.horizontalAlign) {
                left = freespace.x2 - this.margin;
                top = freespace.y1 + this.margin + (maxWidth / 2 - textBlockSize.width / 2);
                angle = 90;
                position = "right";
                this.width = textBlockSize.height;
                this.height = textBlockSize.width;
            } else if ("center" === this.horizontalAlign) {
                top = freespace.y1 + (freespace.height / 2 - textBlockSize.height / 2);
                left = freespace.x1 + (freespace.width / 2 - textBlockSize.width / 2);
                position = "center";
                this.width = textBlockSize.width;
                this.height = textBlockSize.height;
            }
            textBlockHorizontalAlign = "center";
        }
        textBlock.x = left;
        textBlock.y = top;
        textBlock.angle = angle;
        textBlock.horizontalAlign = textBlockHorizontalAlign;
        textBlock.render(true);
        this.chart.layoutManager.registerSpace(position, {
            width: this.width + 2 * this.margin,
            height: this.height + 2 * this.margin
        });
        this.bounds = {
            x1: left,
            y1: top,
            x2: left + this.width,
            y2: top + this.height
        };
        this.ctx.textBaseline = "top";
    };
    extend(Legend, CanvasJSObject);
    Legend.prototype.render = function() {
        var freeSpace = this.chart.layoutManager.getFreeSpace();
        var position = null;
        var top = 0;
        var left = 0;
        var maxWidth = 0;
        var maxHeight = 0;
        var items = [];
        var rows = [];
        if ("top" === this.verticalAlign || "bottom" === this.verticalAlign) {
            this.orientation = "horizontal";
            position = this.verticalAlign;
            maxWidth = .9 * freeSpace.width;
            maxHeight = .5 * freeSpace.height;
        } else if ("center" === this.verticalAlign) {
            this.orientation = "vertical";
            position = this.horizontalAlign;
            maxWidth = .5 * freeSpace.width;
            maxHeight = .9 * freeSpace.height;
        }
        for (var i = 0; i < this.dataSeries.length; i++) {
            var dataSeries = this.dataSeries[i];
            var markerType = dataSeries.legendMarkerType ? dataSeries.legendMarkerType : "line" !== dataSeries.type && "stepLine" !== dataSeries.type && "spline" !== dataSeries.type && "scatter" !== dataSeries.type && "bubble" !== dataSeries.type || !dataSeries.markerType ? DataSeries.getDefaultLegendMarker(dataSeries.type) : dataSeries.markerType;
            var legendText = dataSeries.legendText ? dataSeries.legendText : dataSeries.name;
            var markerColor = dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataSeries.markerColor ? dataSeries.markerColor : dataSeries._colorSet[0];
            var markerSize = dataSeries.markerSize || "line" !== dataSeries.type && "stepLine" !== dataSeries.type && "spline" !== dataSeries.type ? .6 * this.lineHeight : 0;
            {
                dataSeries._colorSet[0];
            }
            if ("pie" !== dataSeries.type && "doughnut" !== dataSeries.type && "funnel" !== dataSeries.type) {
                var item = {
                    markerType: markerType,
                    markerColor: markerColor,
                    text: legendText,
                    textBlock: null,
                    chartType: dataSeries.type,
                    markerSize: markerSize,
                    lineColor: dataSeries._colorSet[0],
                    dataSeriesIndex: dataSeries.index,
                    dataPointIndex: null
                };
                items.push(item);
            } else for (var dataPointIndex = 0; dataPointIndex < dataSeries.dataPoints.length; dataPointIndex++) {
                var dataPoint = dataSeries.dataPoints[dataPointIndex];
                markerType = dataPoint.legendMarkerType ? dataPoint.legendMarkerType : dataSeries.legendMarkerType ? dataSeries.legendMarkerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
                var legendText = dataPoint.legendText ? dataPoint.legendText : dataSeries.legendText ? dataSeries.legendText : dataPoint.name ? dataPoint.name : "DataPoint: " + (dataPointIndex + 1);
                var markerColor = dataPoint.legendMarkerColor ? dataPoint.legendMarkerColor : dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataPoint.color ? dataPoint.color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[dataPointIndex % dataSeries._colorSet.length];
                var markerSize = 0 === dataPoint.markerSize || 0 === dataSeries.markerSize && !dataPoint.markerSize ? 0 : .6 * this.lineHeight;
                var item = {
                    markerType: markerType,
                    markerColor: markerColor,
                    text: legendText,
                    textBlock: null,
                    chartType: dataSeries.type,
                    markerSize: markerSize,
                    dataSeriesIndex: i,
                    dataPointIndex: dataPointIndex
                };
                items.push(item);
            }
            item = null;
        }
        if (items.length > 0) {
            var row = null;
            var rowIndex = 0;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if ("horizontal" === this.orientation) {
                    item.textBlock = new TextBlock(this.ctx, {
                        x: 0,
                        y: 0,
                        maxWidth: maxWidth,
                        maxHeight: this.lineHeight,
                        angle: 0,
                        text: item.text,
                        horizontalAlign: "left",
                        fontSize: this.fontSize,
                        fontFamily: this.fontFamily,
                        fontWeight: this.fontWeight,
                        fontColor: this.fontColor,
                        fontStyle: this.fontStyle,
                        textBaseline: "top"
                    });
                    item.textBlock.measureText();
                    if (!row || row.width + item.textBlock.width + (0 === row.width ? 0 : this.horizontalSpacing) > maxWidth) {
                        row = {
                            items: [],
                            width: 0
                        };
                        rows.push(row);
                        this.height = rows.length * (item.textBlock.height + 5);
                    }
                    item.textBlock.x = row.width;
                    item.textBlock.y = 0;
                    row.width += Math.round(item.textBlock.width + item.textBlock._lineHeight + (0 === row.width ? 0 : .5 * item.textBlock._lineHeight));
                    row.items.push(item);
                    this.width = Math.max(row.width, this.width);
                } else {
                    if (this.height + this.lineHeight < maxHeight) {
                        row = {
                            items: [],
                            width: 0
                        };
                        rows.push(row);
                        this.height = rows.length * this.lineHeight;
                    } else {
                        row = rows[rowIndex];
                        rowIndex = (rowIndex + 1) % rows.length;
                    }
                    item.textBlock = new TextBlock(this.ctx, {
                        x: 0,
                        y: 0,
                        maxWidth: maxWidth,
                        maxHeight: 1.5 * this.fontSize,
                        angle: 0,
                        text: item.text,
                        horizontalAlign: "left",
                        fontSize: this.fontSize,
                        fontFamily: this.fontFamily,
                        fontWeight: this.fontWeight,
                        fontColor: this.fontColor,
                        fontStyle: this.fontStyle,
                        textBaseline: "top"
                    });
                    item.textBlock.measureText();
                    item.textBlock.x = row.width;
                    item.textBlock.y = 0;
                    row.width += item.textBlock.width + item.textBlock._lineHeight + (0 === row.width ? 0 : .5 * item.textBlock._lineHeight);
                    row.items.push(item);
                    this.width = Math.max(row.width, this.width);
                }
            }
            this.height = rows.length * this.lineHeight;
        }
        if ("top" === this.verticalAlign) {
            left = "left" === this.horizontalAlign ? freeSpace.x1 + 2 : "right" === this.horizontalAlign ? freeSpace.x2 - this.width - 2 : freeSpace.x1 + freeSpace.width / 2 - this.width / 2;
            top = freeSpace.y1;
        } else if ("center" === this.verticalAlign) {
            left = "left" === this.horizontalAlign ? freeSpace.x1 + 2 : "right" === this.horizontalAlign ? freeSpace.x2 - this.width - 2 : freeSpace.x1 + freeSpace.width / 2 - this.width / 2;
            top = freeSpace.y1 + freeSpace.height / 2 - this.height / 2;
        } else if ("bottom" === this.verticalAlign) {
            left = "left" === this.horizontalAlign ? freeSpace.x1 + 2 : "right" === this.horizontalAlign ? freeSpace.x2 - this.width - 2 : freeSpace.x1 + freeSpace.width / 2 - this.width / 2;
            top = freeSpace.y2 - this.height - 5;
        }
        this.items = items;
        for (var i = 0; i < this.items.length; i++) {
            var item = items[i];
            item.id = ++this.chart._eventManager.lastObjectId;
            this.chart._eventManager.objectMap[item.id] = {
                id: item.id,
                objectType: "legendItem",
                legendItemIndex: i,
                dataSeriesIndex: item.dataSeriesIndex,
                dataPointIndex: item.dataPointIndex
            };
        }
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            for (var itemIndex = 0; itemIndex < row.items.length; itemIndex++) {
                var item = row.items[itemIndex];
                var legendX = item.textBlock.x + left + (0 === itemIndex ? .2 * item.markerSize : .4 * this.lineHeight + .2 * item.markerSize);
                var legendY = top + i * this.lineHeight;
                var ghostX = legendX;
                this.chart.data[item.dataSeriesIndex].visible || (this.ctx.globalAlpha = .5);
                if ("line" === item.chartType || "stepLine" === item.chartType || "spline" === item.chartType) {
                    this.ctx.strokeStyle = item.lineColor;
                    this.ctx.lineWidth = Math.ceil(this.lineHeight / 8);
                    this.ctx.beginPath();
                    this.ctx.moveTo(legendX - .1 * this.lineHeight, legendY + this.lineHeight / 2);
                    this.ctx.lineTo(legendX + .7 * this.lineHeight, legendY + this.lineHeight / 2);
                    this.ctx.stroke();
                    ghostX -= .1 * this.lineHeight;
                }
                RenderHelper.drawMarker(legendX + item.markerSize / 2, legendY + this.lineHeight / 2, this.ctx, item.markerType, item.markerSize, item.markerColor, null, 0);
                item.textBlock.x = legendX + Math.round(.9 * this.lineHeight);
                item.textBlock.y = legendY;
                item.textBlock.render(true);
                this.chart.data[item.dataSeriesIndex].visible || (this.ctx.globalAlpha = 1);
                var hexColor = intToHexColorString(item.id);
                this.ghostCtx.fillStyle = hexColor;
                this.ghostCtx.beginPath();
                this.ghostCtx.fillRect(ghostX, item.textBlock.y, item.textBlock.x + item.textBlock.width - ghostX, item.textBlock.height);
                item.x1 = this.chart._eventManager.objectMap[item.id].x1 = ghostX;
                item.y1 = this.chart._eventManager.objectMap[item.id].y1 = item.textBlock.y;
                item.x2 = this.chart._eventManager.objectMap[item.id].x2 = item.textBlock.x + item.textBlock.width;
                item.y2 = this.chart._eventManager.objectMap[item.id].y2 = item.textBlock.y + item.textBlock.height;
            }
        }
        this.chart.layoutManager.registerSpace(position, {
            width: this.width + 2 + 2,
            height: this.height + 5 + 5
        });
        this.bounds = {
            x1: left,
            y1: top,
            x2: left + this.width,
            y2: top + this.height
        };
    };
    extend(PlotArea, CanvasJSObject);
    PlotArea.prototype.render = function() {
        var freeSpace = this.chart.layoutManager.getFreeSpace();
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(freeSpace.x1, freeSpace.y1, freeSpace.x2, freeSpace.y2);
    };
    extend(DataSeries, CanvasJSObject);
    DataSeries.prototype.getDefaultAxisPlacement = function() {
        var type = this.type;
        if ("column" === type || "line" === type || "stepLine" === type || "spline" === type || "area" === type || "stepArea" === type || "splineArea" === type || "stackedColumn" === type || "stackedLine" === type || "bubble" === type || "scatter" === type || "stackedArea" === type || "stackedColumn100" === type || "stackedLine100" === type || "stackedArea100" === type || "candlestick" === type || "ohlc" === type || "rangeColumn" === type || "rangeArea" === type || "rangeSplineArea" === type) return "normal";
        if ("bar" === type || "stackedBar" === type || "stackedBar100" === type || "rangeBar" === type) return "xySwapped";
        if ("pie" === type || "doughnut" === type || "funnel" === type) return "none";
        window.console.log("Unknown Chart Type: " + type);
        return null;
    };
    DataSeries.getDefaultLegendMarker = function(type) {
        if ("column" === type || "stackedColumn" === type || "stackedLine" === type || "bar" === type || "stackedBar" === type || "stackedBar100" === type || "bubble" === type || "scatter" === type || "stackedColumn100" === type || "stackedLine100" === type || "stepArea" === type || "candlestick" === type || "ohlc" === type || "rangeColumn" === type || "rangeBar" === type || "rangeArea" === type || "rangeSplineArea" === type) return "square";
        if ("line" === type || "stepLine" === type || "spline" === type || "pie" === type || "doughnut" === type || "funnel" === type) return "circle";
        if ("area" === type || "splineArea" === type || "stackedArea" === type || "stackedArea100" === type) return "triangle";
        window.console.log("Unknown Chart Type: " + type);
        return null;
    };
    DataSeries.prototype.getDataPointAtX = function(x, findClosest) {
        if (!this.dataPoints || 0 === this.dataPoints.length) return null;
        var searchResult = {
            dataPoint: null,
            distance: 1/0,
            index: 0/0
        };
        var dataPoint = null;
        var j = 0;
        var i = 0;
        var direction = 1;
        var minimumXDistance = 1/0;
        var forwardMissCount = 0, backwardMissCount = 0;
        var maxMissCount = 1e3;
        var searchStartIndex = 0;
        if ("none" !== this.chart.plotInfo.axisPlacement) {
            var xRange = this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x;
            searchStartIndex = xRange > 0 ? Math.min(Math.max((this.dataPoints.length - 1) / xRange * (x - this.dataPoints[0].x) >> 0, 0), this.dataPoints.length) : 0;
        }
        while (true) {
            i = direction > 0 ? searchStartIndex + j : searchStartIndex - j;
            if (i >= 0 && i < this.dataPoints.length) {
                dataPoint = this.dataPoints[i];
                var distance = Math.abs(dataPoint.x - x);
                if (distance < searchResult.distance) {
                    searchResult.dataPoint = dataPoint;
                    searchResult.distance = distance;
                    searchResult.index = i;
                }
                var xDistance = Math.abs(dataPoint.x - x);
                minimumXDistance >= xDistance ? minimumXDistance = xDistance : direction > 0 ? forwardMissCount++ : backwardMissCount++;
                if (forwardMissCount > maxMissCount && backwardMissCount > maxMissCount) break;
            } else if (0 > searchStartIndex - j && searchStartIndex + j >= this.dataPoints.length) break;
            if (-1 === direction) {
                j++;
                direction = 1;
            } else direction = -1;
        }
        return findClosest || searchResult.dataPoint.x !== x ? findClosest && null !== searchResult.dataPoint ? searchResult : null : searchResult;
    };
    DataSeries.prototype.getDataPointAtXY = function(x, y, getClosest) {
        if (!this.dataPoints || 0 === this.dataPoints.length) return null;
        getClosest = getClosest || false;
        var results = [];
        var j = 0, i = 0;
        var direction = 1;
        var foundDataPoint = false;
        var minimumXDistance = 1/0;
        var forwardMissCount = 0, backwardMissCount = 0;
        var maxMissCount = 1e3;
        var searchStartIndex = 0;
        if ("none" !== this.chart.plotInfo.axisPlacement) {
            var xval = this.chart.axisX.getXValueAt({
                x: x,
                y: y
            });
            var xRange = this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x;
            searchStartIndex = xRange > 0 ? Math.min(Math.max((this.dataPoints.length - 1) / xRange * (xval - this.dataPoints[0].x) >> 0, 0), this.dataPoints.length) : 0;
        }
        while (true) {
            i = direction > 0 ? searchStartIndex + j : searchStartIndex - j;
            if (i >= 0 && i < this.dataPoints.length) {
                var id = this.dataPointIds[i];
                var visualInfo = this.chart._eventManager.objectMap[id];
                var dataPoint = this.dataPoints[i];
                var distance = null;
                if (visualInfo) {
                    switch (this.type) {
                      case "column":
                      case "stackedColumn":
                      case "stackedColumn100":
                      case "bar":
                      case "stackedBar":
                      case "stackedBar100":
                      case "rangeColumn":
                      case "rangeBar":
                        if (x >= visualInfo.x1 && x <= visualInfo.x2 && y >= visualInfo.y1 && y <= visualInfo.y2) {
                            results.push({
                                dataPoint: dataPoint,
                                dataPointIndex: i,
                                dataSeries: this,
                                distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y1 - y), Math.abs(visualInfo.y2 - y))
                            });
                            foundDataPoint = true;
                        }
                        break;

                      case "line":
                      case "stepLine":
                      case "spline":
                      case "area":
                      case "stepArea":
                      case "stackedArea":
                      case "stackedArea100":
                      case "splineArea":
                      case "scatter":
                        var markerSize = getProperty("markerSize", dataPoint, this) || 4;
                        var snapDistance = getClosest ? 20 : markerSize;
                        distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
                        snapDistance >= distance && results.push({
                            dataPoint: dataPoint,
                            dataPointIndex: i,
                            dataSeries: this,
                            distance: distance
                        });
                        var xDistance = Math.abs(visualInfo.x1 - x);
                        minimumXDistance >= xDistance ? minimumXDistance = xDistance : direction > 0 ? forwardMissCount++ : backwardMissCount++;
                        markerSize / 2 >= distance && (foundDataPoint = true);
                        break;

                      case "rangeArea":
                      case "rangeSplineArea":
                        var markerSize = getProperty("markerSize", dataPoint, this) || 4;
                        var snapDistance = getClosest ? 20 : markerSize;
                        distance = Math.min(Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2)), Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y2 - y, 2)));
                        snapDistance >= distance && results.push({
                            dataPoint: dataPoint,
                            dataPointIndex: i,
                            dataSeries: this,
                            distance: distance
                        });
                        var xDistance = Math.abs(visualInfo.x1 - x);
                        minimumXDistance >= xDistance ? minimumXDistance = xDistance : direction > 0 ? forwardMissCount++ : backwardMissCount++;
                        markerSize / 2 >= distance && (foundDataPoint = true);
                        break;

                      case "bubble":
                        var markerSize = visualInfo.size;
                        distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
                        if (markerSize / 2 >= distance) {
                            results.push({
                                dataPoint: dataPoint,
                                dataPointIndex: i,
                                dataSeries: this,
                                distance: distance
                            });
                            foundDataPoint = true;
                        }
                        break;

                      case "pie":
                      case "doughnut":
                        var center = visualInfo.center;
                        var innerRadius = "doughnut" === this.type ? .6 * visualInfo.radius : 0;
                        distance = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));
                        if (distance < visualInfo.radius && distance > innerRadius) {
                            var deltaY = y - center.y;
                            var deltaX = x - center.x;
                            var angle = Math.atan2(deltaY, deltaX);
                            0 > angle && (angle += 2 * Math.PI);
                            angle = Number(((angle / Math.PI * 180 % 360 + 360) % 360).toFixed(12));
                            var startAngle = Number(((visualInfo.startAngle / Math.PI * 180 % 360 + 360) % 360).toFixed(12));
                            var endAngle = Number(((visualInfo.endAngle / Math.PI * 180 % 360 + 360) % 360).toFixed(12));
                            0 === endAngle && visualInfo.endAngle > 1 && (endAngle = 360);
                            if (startAngle >= endAngle && 0 !== dataPoint.y) {
                                endAngle += 360;
                                startAngle > angle && (angle += 360);
                            }
                            if (angle > startAngle && endAngle > angle) {
                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: 0
                                });
                                foundDataPoint = true;
                            }
                        }
                        break;

                      case "candlestick":
                        if (x >= visualInfo.x1 - visualInfo.borderThickness / 2 && x <= visualInfo.x2 + visualInfo.borderThickness / 2 && y >= visualInfo.y2 - visualInfo.borderThickness / 2 && y <= visualInfo.y3 + visualInfo.borderThickness / 2 || Math.abs(visualInfo.x2 - x + visualInfo.x1 - x) < visualInfo.borderThickness && y >= visualInfo.y1 && y <= visualInfo.y4) {
                            results.push({
                                dataPoint: dataPoint,
                                dataPointIndex: i,
                                dataSeries: this,
                                distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y2 - y), Math.abs(visualInfo.y3 - y))
                            });
                            foundDataPoint = true;
                        }
                        break;

                      case "ohlc":
                        if (Math.abs(visualInfo.x2 - x + visualInfo.x1 - x) < visualInfo.borderThickness && y >= visualInfo.y2 && y <= visualInfo.y3 || x >= visualInfo.x1 && x <= (visualInfo.x2 + visualInfo.x1) / 2 && y >= visualInfo.y1 - visualInfo.borderThickness / 2 && y <= visualInfo.y1 + visualInfo.borderThickness / 2 || x >= (visualInfo.x1 + visualInfo.x2) / 2 && x <= visualInfo.x2 && y >= visualInfo.y4 - visualInfo.borderThickness / 2 && y <= visualInfo.y4 + visualInfo.borderThickness / 2) {
                            results.push({
                                dataPoint: dataPoint,
                                dataPointIndex: i,
                                dataSeries: this,
                                distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y2 - y), Math.abs(visualInfo.y3 - y))
                            });
                            foundDataPoint = true;
                        }
                    }
                    if (foundDataPoint || forwardMissCount > maxMissCount && backwardMissCount > maxMissCount) break;
                }
            } else if (0 > searchStartIndex - j && searchStartIndex + j >= this.dataPoints.length) break;
            if (-1 === direction) {
                j++;
                direction = 1;
            } else direction = -1;
        }
        var closestResult = null;
        for (var m = 0; m < results.length; m++) closestResult ? results[m].distance <= closestResult.distance && (closestResult = results[m]) : closestResult = results[m];
        return closestResult;
    };
    DataSeries.prototype.getMarkerProperties = function(index, x, y, ctx) {
        var dataPoints = this.dataPoints;
        var dataSeries = this;
        var markerColor = dataPoints[index].markerColor ? dataPoints[index].markerColor : dataSeries.markerColor ? dataSeries.markerColor : dataPoints[index].color ? dataPoints[index].color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[index % dataSeries._colorSet.length];
        var markerBorderColor = dataPoints[index].markerBorderColor ? dataPoints[index].markerBorderColor : dataSeries.markerBorderColor ? dataSeries.markerBorderColor : null;
        var markerBorderThickness = dataPoints[index].markerBorderThickness ? dataPoints[index].markerBorderThickness : dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : null;
        var markerType = dataPoints[index].markerType ? dataPoints[index].markerType : dataSeries.markerType;
        var markerSize = dataPoints[index].markerSize ? dataPoints[index].markerSize : dataSeries.markerSize;
        return {
            x: x,
            y: y,
            ctx: ctx,
            type: markerType,
            size: markerSize,
            color: markerColor,
            borderColor: markerBorderColor,
            borderThickness: markerBorderThickness
        };
    };
    extend(Axis, CanvasJSObject);
    Axis.prototype.createLabels = function() {
        var textBlock;
        var i = 0;
        var endPoint;
        var labelMaxWidth = 0;
        var labelMaxHeight = 0;
        var intervalInPixels = 0;
        if ("bottom" === this._position || "top" === this._position) {
            intervalInPixels = this.lineCoordinates.width / Math.abs(this.maximum - this.minimum) * this.interval;
            labelMaxWidth = this.labelAutoFit ? "undefined" == typeof this._options.labelMaxWidth ? .9 * intervalInPixels >> 0 : this.labelMaxWidth : "undefined" == typeof this._options.labelMaxWidth ? .7 * this.chart.width >> 0 : this.labelMaxWidth;
            labelMaxHeight = "undefined" == typeof this._options.labelWrap || this.labelWrap ? .5 * this.chart.height >> 0 : 1.5 * this.labelFontSize;
        } else if ("left" === this._position || "right" === this._position) {
            intervalInPixels = this.lineCoordinates.height / Math.abs(this.maximum - this.minimum) * this.interval;
            labelMaxWidth = this.labelAutoFit ? "undefined" == typeof this._options.labelMaxWidth ? .3 * this.chart.width >> 0 : this.labelMaxWidth : "undefined" == typeof this._options.labelMaxWidth ? .5 * this.chart.width >> 0 : this.labelMaxWidth;
            labelMaxHeight = "undefined" == typeof this._options.labelWrap || this.labelWrap ? 2 * intervalInPixels >> 0 : 1.5 * this.labelFontSize;
        }
        if ("axisX" === this.type && "dateTime" === this.chart.plotInfo.axisXValueType) {
            endPoint = addToDateTime(new Date(this.maximum), this.interval, this.intervalType);
            for (i = this.intervalstartTimePercent; endPoint > i; addToDateTime(i, this.interval, this.intervalType)) {
                var timeInMilliseconds = i.getTime();
                var text = "axisX" === this.type && this.labels[timeInMilliseconds] ? this.labels[timeInMilliseconds] : dateFormat(i, this.valueFormatString, this.chart._cultureInfo);
                textBlock = new TextBlock(this.ctx, {
                    x: 0,
                    y: 0,
                    maxWidth: labelMaxWidth,
                    maxHeight: labelMaxHeight,
                    angle: this.labelAngle,
                    text: this.prefix + text + this.suffix,
                    horizontalAlign: "left",
                    fontSize: this.labelFontSize,
                    fontFamily: this.labelFontFamily,
                    fontWeight: this.labelFontWeight,
                    fontColor: this.labelFontColor,
                    fontStyle: this.labelFontStyle,
                    textBaseline: "middle"
                });
                this._labels.push({
                    position: i.getTime(),
                    textBlock: textBlock,
                    effectiveHeight: null
                });
            }
        } else {
            endPoint = this.maximum;
            if (this.labels && this.labels.length) {
                var tempInterval = Math.ceil(this.interval);
                var tempStartPoint = Math.ceil(this.intervalstartTimePercent);
                var hasAllLabels = false;
                for (i = tempStartPoint; i < this.maximum; i += tempInterval) {
                    if (!this.labels[i]) {
                        hasAllLabels = false;
                        break;
                    }
                    hasAllLabels = true;
                }
                if (hasAllLabels) {
                    this.interval = tempInterval;
                    this.intervalstartTimePercent = tempStartPoint;
                }
            }
            for (i = this.intervalstartTimePercent; endPoint >= i; i = parseFloat((i + this.interval).toFixed(14))) {
                var text = "axisX" === this.type && this.labels[i] ? this.labels[i] : numberFormat(i, this.valueFormatString, this.chart._cultureInfo);
                textBlock = new TextBlock(this.ctx, {
                    x: 0,
                    y: 0,
                    maxWidth: labelMaxWidth,
                    maxHeight: labelMaxHeight,
                    angle: this.labelAngle,
                    text: this.prefix + text + this.suffix,
                    horizontalAlign: "left",
                    fontSize: this.labelFontSize,
                    fontFamily: this.labelFontFamily,
                    fontWeight: this.labelFontWeight,
                    fontColor: this.labelFontColor,
                    fontStyle: this.labelFontStyle,
                    textBaseline: "middle",
                    borderThickness: 0
                });
                this._labels.push({
                    position: i,
                    textBlock: textBlock,
                    effectiveHeight: null
                });
            }
        }
        for (var i = 0; i < this.stripLines.length; i++) {
            var stripLine = this.stripLines[i];
            textBlock = new TextBlock(this.ctx, {
                x: 0,
                y: 0,
                backgroundColor: stripLine.labelBackgroundColor,
                maxWidth: labelMaxWidth,
                maxHeight: labelMaxHeight,
                angle: this.labelAngle,
                text: stripLine.label,
                horizontalAlign: "left",
                fontSize: stripLine.labelFontSize,
                fontFamily: stripLine.labelFontFamily,
                fontWeight: stripLine.labelFontWeight,
                fontColor: stripLine.labelFontColor,
                fontStyle: stripLine.labelFontStyle,
                textBaseline: "middle",
                borderThickness: 0
            });
            this._labels.push({
                position: stripLine.value,
                textBlock: textBlock,
                effectiveHeight: null,
                stripLine: stripLine
            });
        }
    };
    Axis.prototype.createLabelsAndCalculateWidth = function() {
        var maxLabelEffectiveWidth = 0;
        this._labels = [];
        if ("left" === this._position || "right" === this._position) {
            this.createLabels();
            for (i = 0; i < this._labels.length; i++) {
                var textBlock = this._labels[i].textBlock;
                var size = textBlock.measureText();
                var labelEffectiveWidth = 0;
                labelEffectiveWidth = 0 === this.labelAngle ? size.width : size.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)) + size.height / 2 * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle));
                labelEffectiveWidth > maxLabelEffectiveWidth && (maxLabelEffectiveWidth = labelEffectiveWidth);
                this._labels[i].effectiveWidth = labelEffectiveWidth;
            }
        }
        var titleHeight = this.title ? getFontHeightInPixels(this.titleFontFamily, this.titleFontSize, this.titleFontWeight) + 2 : 0;
        var axisWidth = titleHeight + maxLabelEffectiveWidth + this.tickLength + 5;
        return axisWidth;
    };
    Axis.prototype.createLabelsAndCalculateHeight = function() {
        var maxLabelEffectiveHeight = 0;
        this._labels = [];
        var textBlock;
        var i = 0;
        this.createLabels();
        if ("bottom" === this._position || "top" === this._position) for (i = 0; i < this._labels.length; i++) {
            textBlock = this._labels[i].textBlock;
            var size = textBlock.measureText();
            var labelEffectiveHeight = 0;
            labelEffectiveHeight = 0 === this.labelAngle ? size.height : size.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) + size.height / 2 * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
            labelEffectiveHeight > maxLabelEffectiveHeight && (maxLabelEffectiveHeight = labelEffectiveHeight);
            this._labels[i].effectiveHeight = labelEffectiveHeight;
        }
        var titleHeight = this.title ? getFontHeightInPixels(this.titleFontFamily, this.titleFontSize, this.titleFontWeight) + 2 : 0;
        return titleHeight + maxLabelEffectiveHeight + this.tickLength + 5;
    };
    Axis.setLayoutAndRender = function(axisX, axisY, axisY2, axisPlacement, freeSpace) {
        var x1, y1, x2, y2;
        var chart = axisX.chart;
        var ctx = chart.ctx;
        axisX.calculateAxisParameters();
        axisY && axisY.calculateAxisParameters();
        axisY2 && axisY2.calculateAxisParameters();
        if (axisY && axisY2 && "undefined" == typeof axisY._options.maximum && "undefined" == typeof axisY._options.minimum && "undefined" == typeof axisY._options.interval && "undefined" == typeof axisY2._options.maximum && "undefined" == typeof axisY2._options.minimum && "undefined" == typeof axisY2._options.interval) {
            var noTicksY = (axisY.maximum - axisY.minimum) / axisY.interval;
            var noTicksY2 = (axisY2.maximum - axisY2.minimum) / axisY2.interval;
            noTicksY > noTicksY2 ? axisY2.maximum = axisY2.interval * noTicksY + axisY2.minimum : noTicksY2 > noTicksY && (axisY.maximum = axisY.interval * noTicksY2 + axisY.minimum);
        }
        axisY && axisY.lineThickness ? axisY.lineThickness : 0;
        axisY2 && axisY2.lineThickness ? axisY2.lineThickness : 0;
        axisY && axisY.gridThickness ? axisY.gridThickness : 0;
        axisY2 && axisY2.gridThickness ? axisY2.gridThickness : 0;
        var axisYMargin = axisY ? axisY.margin : 0;
        axisY ? axisY.margin : 0;
        if ("normal" === axisPlacement) {
            axisX.lineCoordinates = {};
            var axisYWidth = Math.ceil(axisY ? axisY.createLabelsAndCalculateWidth() : 0);
            x1 = Math.round(freeSpace.x1 + axisYWidth + axisYMargin);
            axisX.lineCoordinates.x1 = x1;
            var axisY2Width = Math.ceil(axisY2 ? axisY2.createLabelsAndCalculateWidth() : 0);
            x2 = Math.round(freeSpace.x2 - axisY2Width > axisX.chart.width - 10 ? axisX.chart.width - 10 : freeSpace.x2 - axisY2Width);
            axisX.lineCoordinates.x2 = x2;
            axisX.lineCoordinates.width = Math.abs(x2 - x1);
            var axisXHeight = Math.ceil(axisX.createLabelsAndCalculateHeight());
            y1 = Math.round(freeSpace.y2 - axisXHeight - axisX.margin);
            y2 = Math.round(freeSpace.y2 - axisX.margin);
            axisX.lineCoordinates.y1 = y1;
            axisX.lineCoordinates.y2 = y1;
            axisX.boundingRect = {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                width: x2 - x1,
                height: y2 - y1
            };
            if (axisY) {
                x1 = Math.round(freeSpace.x1 + axisY.margin);
                y1 = Math.round(freeSpace.y1 < 10 ? 10 : freeSpace.y1);
                x2 = Math.round(freeSpace.x1 + axisYWidth + axisY.margin);
                y2 = Math.round(freeSpace.y2 - axisXHeight - axisX.margin);
                axisY.lineCoordinates = {
                    x1: x2,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    height: Math.abs(y2 - y1)
                };
                axisY.boundingRect = {
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    width: x2 - x1,
                    height: y2 - y1
                };
            }
            if (axisY2) {
                x1 = Math.round(axisX.lineCoordinates.x2);
                y1 = Math.round(freeSpace.y1 < 10 ? 10 : freeSpace.y1);
                x2 = Math.round(x1 + axisY2Width + axisY2.margin);
                y2 = Math.round(freeSpace.y2 - axisXHeight - axisX.margin);
                axisY2.lineCoordinates = {
                    x1: x1,
                    y1: y1,
                    x2: x1,
                    y2: y2,
                    height: Math.abs(y2 - y1)
                };
                axisY2.boundingRect = {
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    width: x2 - x1,
                    height: y2 - y1
                };
            }
            axisX.calculateValueToPixelconversionParameters();
            axisY && axisY.calculateValueToPixelconversionParameters();
            axisY2 && axisY2.calculateValueToPixelconversionParameters();
            ctx.save();
            ctx.rect(5, axisX.boundingRect.y1, axisX.chart.width - 10, axisX.boundingRect.height);
            ctx.clip();
            axisX.renderLabelsTicksAndTitle();
            ctx.restore();
            axisY && axisY.renderLabelsTicksAndTitle();
            axisY2 && axisY2.renderLabelsTicksAndTitle();
            chart.preparePlotArea();
            var plotArea = axisX.chart.plotArea;
            ctx.save();
            ctx.rect(plotArea.x1, plotArea.y1, Math.abs(plotArea.x2 - plotArea.x1), Math.abs(plotArea.y2 - plotArea.y1));
            ctx.clip();
            axisX.renderStripLinesOfThicknessType("value");
            axisY && axisY.renderStripLinesOfThicknessType("value");
            axisY2 && axisY2.renderStripLinesOfThicknessType("value");
            axisX.renderInterlacedColors();
            axisY && axisY.renderInterlacedColors();
            axisY2 && axisY2.renderInterlacedColors();
            ctx.restore();
            axisX.renderGrid();
            axisY && axisY.renderGrid();
            axisY2 && axisY2.renderGrid();
            axisX.renderAxisLine();
            axisY && axisY.renderAxisLine();
            axisY2 && axisY2.renderAxisLine();
            axisX.renderStripLinesOfThicknessType("pixel");
            axisY && axisY.renderStripLinesOfThicknessType("pixel");
            axisY2 && axisY2.renderStripLinesOfThicknessType("pixel");
        } else {
            var axisXWidth = Math.ceil(axisX.createLabelsAndCalculateWidth());
            if (axisY) {
                axisY.lineCoordinates = {};
                x1 = Math.round(freeSpace.x1 + axisXWidth + axisX.margin);
                x2 = Math.round(freeSpace.x2 > axisY.chart.width - 10 ? axisY.chart.width - 10 : freeSpace.x2);
                axisY.lineCoordinates.x1 = x1;
                axisY.lineCoordinates.x2 = x2;
                axisY.lineCoordinates.width = Math.abs(x2 - x1);
            }
            if (axisY2) {
                axisY2.lineCoordinates = {};
                x1 = Math.round(freeSpace.x1 + axisXWidth + axisX.margin);
                x2 = Math.round(freeSpace.x2 > axisY2.chart.width - 10 ? axisY2.chart.width - 10 : freeSpace.x2);
                axisY2.lineCoordinates.x1 = x1;
                axisY2.lineCoordinates.x2 = x2;
                axisY2.lineCoordinates.width = Math.abs(x2 - x1);
            }
            var axisYHeight = Math.ceil(axisY ? axisY.createLabelsAndCalculateHeight() : 0);
            var axisY2Height = Math.ceil(axisY2 ? axisY2.createLabelsAndCalculateHeight() : 0);
            if (axisY) {
                y1 = Math.round(freeSpace.y2 - axisYHeight - axisY.margin);
                y2 = Math.round(freeSpace.y2 - axisYMargin > axisY.chart.height - 10 ? axisY.chart.height - 10 : freeSpace.y2 - axisYMargin);
                axisY.lineCoordinates.y1 = y1;
                axisY.lineCoordinates.y2 = y1;
                axisY.boundingRect = {
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    width: x2 - x1,
                    height: axisYHeight
                };
            }
            if (axisY2) {
                y1 = Math.round(freeSpace.y1 + axisY2.margin);
                y2 = freeSpace.y1 + axisY2.margin + axisY2Height;
                axisY2.lineCoordinates.y1 = y2;
                axisY2.lineCoordinates.y2 = y2;
                axisY2.boundingRect = {
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    width: x2 - x1,
                    height: axisY2Height
                };
            }
            x1 = Math.round(freeSpace.x1 + axisX.margin);
            y1 = Math.round(axisY2 ? axisY2.lineCoordinates.y2 : freeSpace.y1 < 10 ? 10 : freeSpace.y1);
            x2 = Math.round(freeSpace.x1 + axisXWidth + axisX.margin);
            y2 = Math.round(axisY ? axisY.lineCoordinates.y1 : freeSpace.y2 - axisYMargin > axisX.chart.height - 10 ? axisX.chart.height - 10 : freeSpace.y2 - axisYMargin);
            axisX.lineCoordinates = {
                x1: x2,
                y1: y1,
                x2: x2,
                y2: y2,
                height: Math.abs(y2 - y1)
            };
            axisX.boundingRect = {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                width: x2 - x1,
                height: y2 - y1
            };
            axisX.calculateValueToPixelconversionParameters();
            axisY && axisY.calculateValueToPixelconversionParameters();
            axisY2 && axisY2.calculateValueToPixelconversionParameters();
            axisY && axisY.renderLabelsTicksAndTitle();
            axisY2 && axisY2.renderLabelsTicksAndTitle();
            axisX.renderLabelsTicksAndTitle();
            chart.preparePlotArea();
            var plotArea = axisX.chart.plotArea;
            ctx.save();
            ctx.rect(plotArea.x1, plotArea.y1, Math.abs(plotArea.x2 - plotArea.x1), Math.abs(plotArea.y2 - plotArea.y1));
            ctx.clip();
            axisX.renderStripLinesOfThicknessType("value");
            axisY && axisY.renderStripLinesOfThicknessType("value");
            axisY2 && axisY2.renderStripLinesOfThicknessType("value");
            axisX.renderInterlacedColors();
            axisY && axisY.renderInterlacedColors();
            axisY2 && axisY2.renderInterlacedColors();
            ctx.restore();
            axisX.renderGrid();
            axisY && axisY.renderGrid();
            axisY2 && axisY2.renderGrid();
            axisX.renderAxisLine();
            axisY && axisY.renderAxisLine();
            axisY2 && axisY2.renderAxisLine();
            axisX.renderStripLinesOfThicknessType("pixel");
            axisY && axisY.renderStripLinesOfThicknessType("pixel");
            axisY2 && axisY2.renderStripLinesOfThicknessType("pixel");
        }
    };
    Axis.prototype.renderLabelsTicksAndTitle = function() {
        var skipLabels = false;
        var totalLabelWidth = 0;
        var thresholdRatio = 1;
        var labelCount = 0;
        this.conversionParameters.pixelPerUnit * this.interval;
        0 !== this.labelAngle && 360 !== this.labelAngle && (thresholdRatio = 1.2);
        if ("undefined" == typeof this._options.interval) {
            if ("bottom" === this._position || "top" === this._position) {
                for (i = 0; i < this._labels.length; i++) {
                    label = this._labels[i];
                    if (label.position < this.minimum || label.stripLine) continue;
                    var width = label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) + label.textBlock.height * Math.sin(Math.PI / 180 * this.labelAngle);
                    totalLabelWidth += width;
                }
                totalLabelWidth > this.lineCoordinates.width * thresholdRatio && (skipLabels = true);
            }
            if ("left" === this._position || "right" === this._position) {
                for (i = 0; i < this._labels.length; i++) {
                    label = this._labels[i];
                    if (label.position < this.minimum || label.stripLine) continue;
                    var width = label.textBlock.height * Math.cos(Math.PI / 180 * this.labelAngle) + label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle);
                    totalLabelWidth += width;
                }
                totalLabelWidth > this.lineCoordinates.height * thresholdRatio && (skipLabels = true);
            }
        }
        if ("bottom" === this._position) {
            var i = 0;
            var label;
            var xy;
            for (i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum) continue;
                xy = this.getPixelCoordinatesOnAxis(label.position);
                if (this.tickThickness && !this._labels[i].stripLine || this._labels[i].stripLine && "pixel" === this._labels[i].stripLine._thicknessType) {
                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;
                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;
                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }
                    var tickX = this.ctx.lineWidth % 2 === 1 ? (xy.x << 0) + .5 : xy.x << 0;
                    this.ctx.beginPath();
                    this.ctx.moveTo(tickX, xy.y << 0);
                    this.ctx.lineTo(tickX, xy.y + this.tickLength << 0);
                    this.ctx.stroke();
                }
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine) continue;
                if (0 === label.textBlock.angle) {
                    xy.x -= label.textBlock.width / 2;
                    xy.y += this.tickLength + label.textBlock.fontSize / 2;
                } else {
                    xy.x -= this.labelAngle < 0 ? label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0;
                    xy.y += this.tickLength + Math.abs(this.labelAngle < 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) - 5 : 5);
                }
                label.textBlock.x = xy.x;
                label.textBlock.y = xy.y;
                label.textBlock.render(true);
            }
            if (this.title) {
                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.lineCoordinates.x1,
                    y: this.boundingRect.y2 - this.titleFontSize - 5,
                    maxWidth: this.lineCoordinates.width,
                    maxHeight: 1.5 * this.titleFontSize,
                    angle: 0,
                    text: this.title,
                    horizontalAlign: "center",
                    fontSize: this.titleFontSize,
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle,
                    textBaseline: "top"
                });
                this._titleTextBlock.measureText();
                this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
                this._titleTextBlock.y = this.boundingRect.y2 - this._titleTextBlock.height - 3;
                this._titleTextBlock.render(true);
            }
        } else if ("top" === this._position) {
            var i = 0;
            var label;
            var xy;
            var stripLine;
            for (i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum) continue;
                xy = this.getPixelCoordinatesOnAxis(label.position);
                if (this.tickThickness && !this._labels[i].stripLine || this._labels[i].stripLine && "pixel" === this._labels[i].stripLine._thicknessType) {
                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;
                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;
                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }
                    var tickX = this.ctx.lineWidth % 2 === 1 ? (xy.x << 0) + .5 : xy.x << 0;
                    this.ctx.beginPath();
                    this.ctx.moveTo(tickX, xy.y << 0);
                    this.ctx.lineTo(tickX, xy.y - this.tickLength << 0);
                    this.ctx.stroke();
                }
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine) continue;
                if (0 === label.textBlock.angle) {
                    xy.x -= label.textBlock.width / 2;
                    xy.y -= this.tickLength + label.textBlock.height / 2;
                } else {
                    xy.x -= this.labelAngle > 0 ? label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0;
                    xy.y -= this.tickLength + Math.abs(this.labelAngle > 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + 5 : 5);
                }
                label.textBlock.x = xy.x;
                label.textBlock.y = xy.y;
                label.textBlock.render(true);
            }
            if (this.title) {
                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.lineCoordinates.x1,
                    y: this.boundingRect.y1 + 1,
                    maxWidth: this.lineCoordinates.width,
                    maxHeight: 1.5 * this.titleFontSize,
                    angle: 0,
                    text: this.title,
                    horizontalAlign: "center",
                    fontSize: this.titleFontSize,
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle,
                    textBaseline: "top"
                });
                this._titleTextBlock.measureText();
                this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
                this._titleTextBlock.render(true);
            }
        } else if ("left" === this._position) {
            var label;
            var xy;
            for (var i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum) continue;
                xy = this.getPixelCoordinatesOnAxis(label.position);
                if (this.tickThickness && !this._labels[i].stripLine || this._labels[i].stripLine && "pixel" === this._labels[i].stripLine._thicknessType) {
                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;
                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;
                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }
                    var tickY = this.ctx.lineWidth % 2 === 1 ? (xy.y << 0) + .5 : xy.y << 0;
                    this.ctx.beginPath();
                    this.ctx.moveTo(xy.x << 0, tickY);
                    this.ctx.lineTo(xy.x - this.tickLength << 0, tickY);
                    this.ctx.stroke();
                }
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine) continue;
                label.textBlock.x = xy.x - label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) - this.tickLength - 5;
                label.textBlock.y = 0 === this.labelAngle ? xy.y - label.textBlock.height / 2 + this.labelFontSize / 2 : xy.y - label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle);
                label.textBlock.render(true);
            }
            if (this.title) {
                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.boundingRect.x1 + 1,
                    y: this.lineCoordinates.y2,
                    maxWidth: this.lineCoordinates.height,
                    maxHeight: 1.5 * this.titleFontSize,
                    angle: -90,
                    text: this.title,
                    horizontalAlign: "center",
                    fontSize: this.titleFontSize,
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle,
                    textBaseline: "top"
                });
                {
                    this._titleTextBlock.measureText();
                }
                this._titleTextBlock.y = this.lineCoordinates.height / 2 + this._titleTextBlock.width / 2 + this.lineCoordinates.y1;
                this._titleTextBlock.render(true);
            }
        } else if ("right" === this._position) {
            var label;
            var xy;
            for (var i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum) continue;
                xy = this.getPixelCoordinatesOnAxis(label.position);
                if (this.tickThickness && !this._labels[i].stripLine || this._labels[i].stripLine && "pixel" === this._labels[i].stripLine._thicknessType) {
                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;
                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;
                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }
                    var tickY = this.ctx.lineWidth % 2 === 1 ? (xy.y << 0) + .5 : xy.y << 0;
                    this.ctx.beginPath();
                    this.ctx.moveTo(xy.x << 0, tickY);
                    this.ctx.lineTo(xy.x + this.tickLength << 0, tickY);
                    this.ctx.stroke();
                }
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine) continue;
                label.textBlock.x = xy.x + this.tickLength + 5;
                label.textBlock.y = 0 === this.labelAngle ? xy.y - label.textBlock.height / 2 + this.labelFontSize / 2 : xy.y;
                label.textBlock.render(true);
            }
            if (this.title) {
                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.boundingRect.x2 - 1,
                    y: this.lineCoordinates.y2,
                    maxWidth: this.lineCoordinates.height,
                    maxHeight: 1.5 * this.titleFontSize,
                    angle: 90,
                    text: this.title,
                    horizontalAlign: "center",
                    fontSize: this.titleFontSize,
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle,
                    textBaseline: "top"
                });
                this._titleTextBlock.measureText();
                this._titleTextBlock.y = this.lineCoordinates.height / 2 - this._titleTextBlock.width / 2 + this.lineCoordinates.y1;
                this._titleTextBlock.render(true);
            }
        }
    };
    Axis.prototype.renderInterlacedColors = function() {
        var ctx = this.chart.plotArea.ctx;
        var interlacedGridStartPoint;
        var interlacedGridEndPoint;
        var plotAreaCoordinates = this.chart.plotArea;
        var i = 0, renderInterlacedGrid = true;
        if ("bottom" !== this._position && "top" !== this._position || !this.interlacedColor) {
            if (("left" === this._position || "right" === this._position) && this.interlacedColor) {
                ctx.fillStyle = this.interlacedColor;
                for (i = 0; i < this._labels.length; i++) {
                    if (this._labels[i].stripLine) continue;
                    if (renderInterlacedGrid) {
                        interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);
                        interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(i + 1 >= this._labels.length ? this.maximum : this._labels[i + 1].position);
                        ctx.fillRect(plotAreaCoordinates.x1, interlacedGridStartPoint.y, Math.abs(plotAreaCoordinates.x1 - plotAreaCoordinates.x2), Math.abs(interlacedGridStartPoint.y - interlacedGridEndPoint.y));
                        renderInterlacedGrid = false;
                    } else renderInterlacedGrid = true;
                }
            }
        } else {
            ctx.fillStyle = this.interlacedColor;
            for (i = 0; i < this._labels.length; i++) {
                if (this._labels[i].stripLine) continue;
                if (renderInterlacedGrid) {
                    interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);
                    interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(i + 1 >= this._labels.length ? this.maximum : this._labels[i + 1].position);
                    ctx.fillRect(interlacedGridStartPoint.x, plotAreaCoordinates.y1, Math.abs(interlacedGridEndPoint.x - interlacedGridStartPoint.x), Math.abs(plotAreaCoordinates.y1 - plotAreaCoordinates.y2));
                    renderInterlacedGrid = false;
                } else renderInterlacedGrid = true;
            }
        }
        ctx.beginPath();
    };
    Axis.prototype.renderStripLinesOfThicknessType = function(thicknessType) {
        if (!(this.stripLines && this.stripLines.length > 0 && thicknessType)) return;
        var ctx = this.chart.plotArea.ctx;
        this.chart._eventManager.ghostCtx;
        var i = 0;
        for (i = 0; i < this.stripLines.length; i++) {
            var stripLine = this.stripLines[i];
            if (stripLine._thicknessType !== thicknessType) continue;
            if ("pixel" === thicknessType && (stripLine.value < this.minimum || stripLine.value > this.maximum)) continue;
            var xy = this.getPixelCoordinatesOnAxis(stripLine.value);
            var lineWidth = Math.abs("pixel" === thicknessType ? stripLine.thickness : this.conversionParameters.pixelPerUnit * stripLine.thickness);
            if (0 >= lineWidth) continue;
            ctx.strokeStyle = stripLine.color;
            ctx.beginPath();
            {
                intToHexColorString(stripLine.id);
            }
            var x1, x2, y1, y2;
            ctx.lineWidth = lineWidth;
            if ("bottom" === this._position || "top" === this._position) {
                var stripX = ctx.lineWidth % 2 === 1 ? (xy.x << 0) + .5 : xy.x << 0;
                x1 = x2 = stripX;
                y1 = this.chart.plotArea.y1;
                y2 = this.chart.plotArea.y2;
            } else if ("left" === this._position || "right" === this._position) {
                var stripY = ctx.lineWidth % 2 === 1 ? (xy.y << 0) + .5 : xy.y << 0;
                y1 = y2 = stripY;
                x1 = this.chart.plotArea.x1;
                x2 = this.chart.plotArea.x2;
            }
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    };
    Axis.prototype.renderGrid = function() {
        if (!(this.gridThickness && this.gridThickness > 0)) return;
        var ctx = this.chart.ctx;
        var xy;
        var plotAreaCoordinates = this.chart.plotArea;
        ctx.lineWidth = this.gridThickness;
        ctx.strokeStyle = this.gridColor;
        if ("bottom" === this._position || "top" === this._position) for (i = 0; i < this._labels.length && !this._labels[i].stripLine; i++) {
            if (this._labels[i].position < this.minimum || this._labels[i].position > this.maximum) continue;
            ctx.beginPath();
            xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);
            var gridX = ctx.lineWidth % 2 === 1 ? (xy.x << 0) + .5 : xy.x << 0;
            ctx.moveTo(gridX, plotAreaCoordinates.y1 << 0);
            ctx.lineTo(gridX, plotAreaCoordinates.y2 << 0);
            ctx.stroke();
        } else if ("left" === this._position || "right" === this._position) for (var i = 0; i < this._labels.length && !this._labels[i].stripLine; i++) {
            if (this._labels[i].position < this.minimum || this._labels[i].position > this.maximum) continue;
            ctx.beginPath();
            xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);
            var gridY = ctx.lineWidth % 2 === 1 ? (xy.y << 0) + .5 : xy.y << 0;
            ctx.moveTo(plotAreaCoordinates.x1 << 0, gridY);
            ctx.lineTo(plotAreaCoordinates.x2 << 0, gridY);
            ctx.stroke();
        }
    };
    Axis.prototype.renderAxisLine = function() {
        var ctx = this.chart.ctx;
        if ("bottom" === this._position || "top" === this._position) {
            if (this.lineThickness) {
                ctx.lineWidth = this.lineThickness;
                ctx.strokeStyle = this.lineColor ? this.lineColor : "black";
                var lineY = this.lineThickness % 2 === 1 ? (this.lineCoordinates.y1 << 0) + .5 : this.lineCoordinates.y1 << 0;
                ctx.beginPath();
                ctx.moveTo(this.lineCoordinates.x1, lineY);
                ctx.lineTo(this.lineCoordinates.x2, lineY);
                ctx.stroke();
            }
        } else if (("left" === this._position || "right" === this._position) && this.lineThickness) {
            ctx.lineWidth = this.lineThickness;
            ctx.strokeStyle = this.lineColor;
            var lineX = this.lineThickness % 2 === 1 ? (this.lineCoordinates.x1 << 0) + .5 : this.lineCoordinates.x1 << 0;
            ctx.beginPath();
            ctx.moveTo(lineX, this.lineCoordinates.y1);
            ctx.lineTo(lineX, this.lineCoordinates.y2);
            ctx.stroke();
        }
    };
    Axis.prototype.getPixelCoordinatesOnAxis = function(value) {
        var xy = {};
        var width = this.lineCoordinates.width;
        var height = this.lineCoordinates.height;
        if ("bottom" === this._position || "top" === this._position) {
            var pixelPerUnit = width / Math.abs(this.maximum - this.minimum);
            xy.x = this.lineCoordinates.x1 + pixelPerUnit * (value - this.minimum);
            xy.y = this.lineCoordinates.y1;
        }
        if ("left" === this._position || "right" === this._position) {
            var pixelPerUnit = height / Math.abs(this.maximum - this.minimum);
            xy.y = this.lineCoordinates.y2 - pixelPerUnit * (value - this.minimum);
            xy.x = this.lineCoordinates.x2;
        }
        return xy;
    };
    Axis.prototype.getXValueAt = function(pixel) {
        if (!pixel) return null;
        var xval = null;
        "left" === this._position ? xval = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.height * (this.chart.axisX.lineCoordinates.y2 - pixel.y) + this.chart.axisX.minimum : "bottom" === this._position && (xval = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (pixel.x - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum);
        return xval;
    };
    Axis.prototype.calculateValueToPixelconversionParameters = function() {
        var conversionParameters = {
            pixelPerUnit: null,
            minimum: null,
            reference: null
        };
        var width = this.lineCoordinates.width;
        var height = this.lineCoordinates.height;
        conversionParameters.minimum = this.minimum;
        if ("bottom" === this._position || "top" === this._position) {
            conversionParameters.pixelPerUnit = width / Math.abs(this.maximum - this.minimum);
            conversionParameters.reference = this.lineCoordinates.x1;
        }
        if ("left" === this._position || "right" === this._position) {
            conversionParameters.pixelPerUnit = -1 * height / Math.abs(this.maximum - this.minimum);
            conversionParameters.reference = this.lineCoordinates.y2;
        }
        this.conversionParameters = conversionParameters;
    };
    Axis.prototype.calculateAxisParameters = function() {
        var freeSpace = this.chart.layoutManager.getFreeSpace();
        if ("bottom" === this._position || "top" === this._position) {
            this.maxWidth = freeSpace.width;
            this.maxHeight = freeSpace.height;
        } else {
            this.maxWidth = freeSpace.height;
            this.maxHeight = freeSpace.width;
        }
        var noTicks = "axisX" === this.type ? this.maxWidth < 500 ? 8 : Math.max(6, Math.floor(this.maxWidth / 62)) : Math.max(Math.floor(this.maxWidth / 40), 2);
        var min, max;
        var minDiff;
        var range;
        var rangePadding = 0;
        if ("axisX" === this.type) {
            min = null !== this.sessionVariables.internalMinimum ? this.sessionVariables.internalMinimum : this.dataInfo.viewPortMin;
            max = null !== this.sessionVariables.internalMaximum ? this.sessionVariables.internalMaximum : this.dataInfo.viewPortMax;
            if (max - min === 0) {
                max += .4;
                min -= .4;
            }
            minDiff = 1/0 !== this.dataInfo.minDiff ? this.dataInfo.minDiff : max - min > 1 ? .5 * Math.abs(max - min) : 1;
        } else if ("axisY" === this.type) {
            min = "undefined" == typeof this._options.minimum ? this.dataInfo.viewPortMin : this._options.minimum;
            max = "undefined" == typeof this._options.maximum ? this.dataInfo.viewPortMax : this._options.maximum;
            if (0 === min && 0 === max) {
                max += 9;
                min = 0;
            } else if (max - min === 0) {
                rangePadding = Math.min(Math.abs(.01 * Math.abs(max)), 5);
                max += rangePadding;
                min -= rangePadding;
            } else {
                rangePadding = Math.min(Math.abs(.01 * Math.abs(max - min)), .05);
                0 !== max && (max += rangePadding);
                0 !== min && (min -= rangePadding);
            }
            this.includeZero && "undefined" == typeof this._options.minimum && min > 0 && (min = 0);
            this.includeZero && "undefined" == typeof this._options.maximum && 0 > max && (max = 0);
        }
        if ("axisX" === this.type && "dateTime" === this.chart.plotInfo.axisXValueType) {
            range = max - min;
            if (!this.intervalType) if (noTicks >= range / 1) {
                this.interval = 1;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 2) {
                this.interval = 2;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 5) {
                this.interval = 5;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 10) {
                this.interval = 10;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 20) {
                this.interval = 20;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 50) {
                this.interval = 50;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 100) {
                this.interval = 100;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 200) {
                this.interval = 200;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 250) {
                this.interval = 250;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 300) {
                this.interval = 300;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 400) {
                this.interval = 400;
                this.intervalType = "millisecond";
            } else if (noTicks >= range / 500) {
                this.interval = 500;
                this.intervalType = "millisecond";
            } else if (range / (1 * constants.secondDuration) <= noTicks) {
                this.interval = 1;
                this.intervalType = "second";
            } else if (range / (2 * constants.secondDuration) <= noTicks) {
                this.interval = 2;
                this.intervalType = "second";
            } else if (range / (5 * constants.secondDuration) <= noTicks) {
                this.interval = 5;
                this.intervalType = "second";
            } else if (range / (10 * constants.secondDuration) <= noTicks) {
                this.interval = 10;
                this.intervalType = "second";
            } else if (range / (15 * constants.secondDuration) <= noTicks) {
                this.interval = 15;
                this.intervalType = "second";
            } else if (range / (20 * constants.secondDuration) <= noTicks) {
                this.interval = 20;
                this.intervalType = "second";
            } else if (range / (30 * constants.secondDuration) <= noTicks) {
                this.interval = 30;
                this.intervalType = "second";
            } else if (range / (1 * constants.minuteDuration) <= noTicks) {
                this.interval = 1;
                this.intervalType = "minute";
            } else if (range / (2 * constants.minuteDuration) <= noTicks) {
                this.interval = 2;
                this.intervalType = "minute";
            } else if (range / (5 * constants.minuteDuration) <= noTicks) {
                this.interval = 5;
                this.intervalType = "minute";
            } else if (range / (10 * constants.minuteDuration) <= noTicks) {
                this.interval = 10;
                this.intervalType = "minute";
            } else if (range / (15 * constants.minuteDuration) <= noTicks) {
                this.interval = 15;
                this.intervalType = "minute";
            } else if (range / (20 * constants.minuteDuration) <= noTicks) {
                this.interval = 20;
                this.intervalType = "minute";
            } else if (range / (30 * constants.minuteDuration) <= noTicks) {
                this.interval = 30;
                this.intervalType = "minute";
            } else if (range / (1 * constants.hourDuration) <= noTicks) {
                this.interval = 1;
                this.intervalType = "hour";
            } else if (range / (2 * constants.hourDuration) <= noTicks) {
                this.interval = 2;
                this.intervalType = "hour";
            } else if (range / (3 * constants.hourDuration) <= noTicks) {
                this.interval = 3;
                this.intervalType = "hour";
            } else if (range / (6 * constants.hourDuration) <= noTicks) {
                this.interval = 6;
                this.intervalType = "hour";
            } else if (range / (1 * constants.dayDuration) <= noTicks) {
                this.interval = 1;
                this.intervalType = "day";
            } else if (range / (2 * constants.dayDuration) <= noTicks) {
                this.interval = 2;
                this.intervalType = "day";
            } else if (range / (4 * constants.dayDuration) <= noTicks) {
                this.interval = 4;
                this.intervalType = "day";
            } else if (range / (1 * constants.weekDuration) <= noTicks) {
                this.interval = 1;
                this.intervalType = "week";
            } else if (range / (2 * constants.weekDuration) <= noTicks) {
                this.interval = 2;
                this.intervalType = "week";
            } else if (range / (3 * constants.weekDuration) <= noTicks) {
                this.interval = 3;
                this.intervalType = "week";
            } else if (range / (1 * constants.monthDuration) <= noTicks) {
                this.interval = 1;
                this.intervalType = "month";
            } else if (range / (2 * constants.monthDuration) <= noTicks) {
                this.interval = 2;
                this.intervalType = "month";
            } else if (range / (3 * constants.monthDuration) <= noTicks) {
                this.interval = 3;
                this.intervalType = "month";
            } else if (range / (6 * constants.monthDuration) <= noTicks) {
                this.interval = 6;
                this.intervalType = "month";
            } else if (range / (1 * constants.yearDuration) <= noTicks) {
                this.interval = 1;
                this.intervalType = "year";
            } else if (range / (2 * constants.yearDuration) <= noTicks) {
                this.interval = 2;
                this.intervalType = "year";
            } else if (range / (4 * constants.yearDuration) <= noTicks) {
                this.interval = 4;
                this.intervalType = "year";
            } else {
                this.interval = Math.floor(Axis.getNiceNumber(range / (noTicks - 1), true) / constants.yearDuration);
                this.intervalType = "year";
            }
            this.minimum = null !== this.sessionVariables.internalMinimum ? this.sessionVariables.internalMinimum : min - minDiff / 2;
            this.maximum = this.sessionVariables.internalMaximum ? this.sessionVariables.internalMaximum : max + minDiff / 2;
            this.valueFormatString || ("year" === this.intervalType ? this.valueFormatString = "YYYY" : "month" === this.intervalType ? this.valueFormatString = "MMM YYYY" : "week" === this.intervalType ? this.valueFormatString = "MMM DD YYYY" : "day" === this.intervalType ? this.valueFormatString = "MMM DD YYYY" : "hour" === this.intervalType ? this.valueFormatString = "hh:mm TT" : "minute" === this.intervalType ? this.valueFormatString = "hh:mm TT" : "second" === this.intervalType ? this.valueFormatString = "hh:mm:ss TT" : "millisecond" === this.intervalType && (this.valueFormatString = "fff'ms'"));
            this.intervalstartTimePercent = this.getLabelStartPoint(new Date(this.minimum), this.intervalType, this.interval);
        } else {
            this.intervalType = "number";
            range = Axis.getNiceNumber(max - min, false);
            this.interval = this._options && this._options.interval ? this._options.interval : Axis.getNiceNumber(range / (noTicks - 1), true);
            this.minimum = null !== this.sessionVariables.internalMinimum ? this.sessionVariables.internalMinimum : Math.floor(min / this.interval) * this.interval;
            this.maximum = null !== this.sessionVariables.internalMaximum ? this.sessionVariables.internalMaximum : Math.ceil(max / this.interval) * this.interval;
            if ("axisX" === this.type) {
                null !== this.sessionVariables.internalMinimum || (this.minimum = min - minDiff / 2);
                this.sessionVariables.internalMaximum || (this.maximum = max + minDiff / 2);
                this.intervalstartTimePercent = Math.floor((this.minimum + .2 * this.interval) / this.interval) * this.interval;
            } else "axisY" === this.type && (this.intervalstartTimePercent = this.minimum);
        }
        if ("axisX" === this.type) {
            this._absoluteMinimum = this._options && "undefined" != typeof this._options.minimum ? this._options.minimum : this.dataInfo.min - minDiff / 2;
            this._absoluteMaximum = this._options && "undefined" != typeof this._options.maximum ? this._options.maximum : this.dataInfo.max + minDiff / 2;
        }
        if (!this.valueFormatString) {
            this.valueFormatString = "#,##0.##";
            range = Math.abs(this.maximum - this.minimum);
            if (1 > range) {
                var numberOfDecimals = Math.floor(Math.abs(Math.log(range) / Math.LN10)) + 2;
                if (numberOfDecimals > 2) for (var i = 0; numberOfDecimals - 2 > i; i++) this.valueFormatString += "#";
            }
        }
    };
    Axis.getNiceNumber = function(x, round) {
        var exp = Math.floor(Math.log(x) / Math.LN10);
        var f = x / Math.pow(10, exp);
        var nf;
        nf = round ? 1.5 > f ? 1 : 3 > f ? 2 : 7 > f ? 5 : 10 : 1 >= f ? 1 : 2 >= f ? 2 : 5 >= f ? 5 : 10;
        return Number((nf * Math.pow(10, exp)).toFixed(20));
    };
    Axis.prototype.getLabelStartPoint = function() {
        var intervalInMilliseconds = convertToNumber(this.interval, this.intervalType);
        var minimum = Math.floor(this.minimum / intervalInMilliseconds) * intervalInMilliseconds;
        var dateTime = new Date(minimum);
        if ("millisecond" === this.intervalType) ; else if ("second" === this.intervalType) {
            if (dateTime.getMilliseconds() > 0) {
                dateTime.setSeconds(dateTime.getSeconds() + 1);
                dateTime.setMilliseconds(0);
            }
        } else if ("minute" === this.intervalType) {
            if (dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setMinutes(dateTime.getMinutes() + 1);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        } else if ("hour" === this.intervalType) {
            if (dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setHours(dateTime.getHours() + 1);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        } else if ("day" === this.intervalType) {
            if (dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setDate(dateTime.getDate() + 1);
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        } else if ("week" === this.intervalType) {
            if (dateTime.getDay() > 0 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setDate(dateTime.getDate() + (7 - dateTime.getDay()));
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        } else if ("month" === this.intervalType) {
            if (dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setMonth(dateTime.getMonth() + 1);
                dateTime.setDate(1);
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        } else if ("year" === this.intervalType && (dateTime.getMonth() > 0 || dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0)) {
            dateTime.setFullYear(dateTime.getFullYear() + 1);
            dateTime.setMonth(0);
            dateTime.setDate(1);
            dateTime.setHours(0);
            dateTime.setMinutes(0);
            dateTime.setSeconds(0);
            dateTime.setMilliseconds(0);
        }
        return dateTime;
    };
    extend(StripLine, CanvasJSObject);
    extend(ToolTip, CanvasJSObject);
    ToolTip.prototype._initialize = function() {
        if (this.enabled) {
            this.container = document.createElement("div");
            this.container.setAttribute("class", "canvasjs-chart-tooltip");
            this.container.style.position = "absolute";
            this.container.style.height = "auto";
            this.container.style.boxShadow = "1px 1px 2px 2px rgba(0,0,0,0.1)";
            this.container.style.zIndex = "1000";
            this.container.style.display = "none";
            var toolTipHtml = '<div style=" width: auto;';
            toolTipHtml += "height: auto;";
            toolTipHtml += "min-width: 50px;";
            toolTipHtml += "line-height: 20px;";
            toolTipHtml += "margin: 0px 0px 0px 0px;";
            toolTipHtml += "padding: 5px;";
            toolTipHtml += "font-family:  Arial,Calibri, Georgia, serif;";
            toolTipHtml += "font-weight: 400;";
            toolTipHtml += "font-style: " + (isCanvasSupported ? "italic;" : "normal;");
            toolTipHtml += "font-size: 14px;";
            toolTipHtml += "color: #000000;";
            toolTipHtml += "text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";
            toolTipHtml += "text-align: left;";
            toolTipHtml += "border: 2px solid gray;";
            toolTipHtml += isCanvasSupported ? "background: rgba(255,255,255,.9);" : "background: rgb(255,255,255);";
            toolTipHtml += "text-indent: 0px;";
            toolTipHtml += "white-space: nowrap;";
            toolTipHtml += "border-radius: 5px;";
            toolTipHtml += "-moz-user-select:none;";
            toolTipHtml += "-khtml-user-select: none;";
            toolTipHtml += "-webkit-user-select: none;";
            toolTipHtml += "-ms-user-select: none;";
            toolTipHtml += "user-select: none;";
            if (!isCanvasSupported) {
                toolTipHtml += "filter: alpha(opacity = 90);";
                toolTipHtml += "filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');";
            }
            toolTipHtml += '} "> Sample Tooltip</div>';
            this.container.innerHTML = toolTipHtml;
            this.contentDiv = this.container.firstChild;
            this.container.style.borderRadius = this.contentDiv.style.borderRadius;
            this.chart._canvasJSContainer.appendChild(this.container);
        }
    };
    ToolTip.prototype.mouseMoveHandler = function(x, y) {
        if (!(this._lastUpdated && new Date().getTime() - this._lastUpdated < 40)) {
            this._lastUpdated = new Date().getTime();
            this._updateToolTip(x, y);
        }
    };
    ToolTip.prototype._updateToolTip = function(mouseX, mouseY) {
        if (!this.enabled || this.chart.disableToolTip) return;
        if ("undefined" == typeof mouseX || "undefined" == typeof mouseY) {
            if (isNaN(this._prevX) || isNaN(this._prevY)) return;
            mouseX = this._prevX;
            mouseY = this._prevY;
        } else {
            this._prevX = mouseX;
            this._prevY = mouseY;
        }
        var dataPoint = null;
        var dataSeries = null;
        var entries = [];
        var toolTipBottom;
        var x = 0;
        if (this.shared && "none" !== this.chart.plotInfo.axisPlacement) {
            x = "xySwapped" === this.chart.plotInfo.axisPlacement ? (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.height * (this.chart.axisX.lineCoordinates.y2 - mouseY) + this.chart.axisX.minimum : (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum;
            var nearbyEntries = [];
            for (var i = 0; i < this.chart.data.length; i++) {
                var entry = this.chart.data[i].getDataPointAtX(x, true);
                if (entry && entry.index >= 0) {
                    entry.dataSeries = this.chart.data[i];
                    null !== entry.dataPoint.y && nearbyEntries.push(entry);
                }
            }
            if (0 === nearbyEntries.length) return;
            nearbyEntries.sort(function(entry1, entry2) {
                return entry1.distance - entry2.distance;
            });
            var closest = nearbyEntries[0];
            for (i = 0; i < nearbyEntries.length; i++) nearbyEntries[i].dataPoint.x.valueOf() === closest.dataPoint.x.valueOf() && entries.push(nearbyEntries[i]);
            nearbyEntries = null;
        } else {
            var dataPointInfo = this.chart.getDataPointAtXY(mouseX, mouseY, true);
            if (dataPointInfo) {
                this.currentDataPointIndex = dataPointInfo.dataPointIndex;
                this.currentSeriesIndex = dataPointInfo.dataSeries.index;
            } else if (isCanvasSupported) {
                var id = getObjectId(mouseX, mouseY, this.chart._eventManager.ghostCtx);
                if (id > 0 && "undefined" != typeof this.chart._eventManager.objectMap[id]) {
                    eventObject = this.chart._eventManager.objectMap[id];
                    this.currentSeriesIndex = eventObject.dataSeriesIndex;
                    this.currentDataPointIndex = eventObject.dataPointIndex >= 0 ? eventObject.dataPointIndex : -1;
                } else this.currentDataPointIndex = -1;
            } else this.currentDataPointIndex = -1;
            if (this.currentSeriesIndex >= 0) {
                dataSeries = this.chart.data[this.currentSeriesIndex];
                var entry = {};
                if (this.currentDataPointIndex >= 0) {
                    dataPoint = dataSeries.dataPoints[this.currentDataPointIndex];
                    entry.dataSeries = dataSeries;
                    entry.dataPoint = dataPoint;
                    entry.index = this.currentDataPointIndex;
                    entry.distance = Math.abs(dataPoint.x - x);
                } else {
                    if ("line" !== dataSeries.type && "stepLine" !== dataSeries.type && "spline" !== dataSeries.type && "area" !== dataSeries.type && "stepArea" !== dataSeries.type && "splineArea" !== dataSeries.type && "stackedArea" !== dataSeries.type && "stackedArea100" !== dataSeries.type && "rangeArea" !== dataSeries.type && "rangeSplineArea" !== dataSeries.type && "candlestick" !== dataSeries.type && "ohlc" !== dataSeries.type) return;
                    var x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum.valueOf();
                    entry = dataSeries.getDataPointAtX(x, true);
                    entry.dataSeries = dataSeries;
                    this.currentDataPointIndex = entry.index;
                    dataPoint = entry.dataPoint;
                }
                null !== entry.dataPoint.y && entries.push(entry);
            }
        }
        if (entries.length > 0) {
            this.highlightObjects(entries);
            var toolTipInnerHtml = "";
            toolTipInnerHtml = this.getToolTipInnerHTML({
                entries: entries
            });
            if (null !== toolTipInnerHtml) {
                this.contentDiv.innerHTML = toolTipInnerHtml;
                this.contentDiv.innerHTML = toolTipInnerHtml;
                var previouslyHidden = false;
                if ("none" === this.container.style.display) {
                    previouslyHidden = true;
                    this.container.style.display = "block";
                }
                try {
                    this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.borderColor ? this.borderColor : entries[0].dataPoint.color ? entries[0].dataPoint.color : entries[0].dataSeries.color ? entries[0].dataSeries.color : entries[0].dataSeries._colorSet[entries[0].index % entries[0].dataSeries._colorSet.length];
                } catch (e) {}
                if ("pie" === entries[0].dataSeries.type || "doughnut" === entries[0].dataSeries.type || "funnel" === entries[0].dataSeries.type || "bar" === entries[0].dataSeries.type || "rangeBar" === entries[0].dataSeries.type || "stackedBar" === entries[0].dataSeries.type || "stackedBar100" === entries[0].dataSeries.type) toolTipLeft = mouseX - 10 - this.container.clientWidth; else {
                    toolTipLeft = this.chart.axisX.lineCoordinates.width / Math.abs(this.chart.axisX.maximum - this.chart.axisX.minimum) * Math.abs(entries[0].dataPoint.x - this.chart.axisX.minimum) + this.chart.axisX.lineCoordinates.x1 + .5 - this.container.clientWidth << 0;
                    toolTipLeft -= 10;
                }
                0 > toolTipLeft && (toolTipLeft += this.container.clientWidth + 20);
                toolTipLeft + this.container.clientWidth > this.chart._container.clientWidth && (toolTipLeft = Math.max(0, this.chart._container.clientWidth - this.container.clientWidth));
                toolTipLeft += "px";
                toolTipBottom = 1 !== entries.length || this.shared || "line" !== entries[0].dataSeries.type && "stepLine" !== entries[0].dataSeries.type && "spline" !== entries[0].dataSeries.type && "area" !== entries[0].dataSeries.type && "stepArea" !== entries[0].dataSeries.type && "splineArea" !== entries[0].dataSeries.type && "stackedArea" !== entries[0].dataSeries.type && "stackedArea100" !== entries[0].dataSeries.type ? "bar" === entries[0].dataSeries.type || "rangeBar" === entries[0].dataSeries.type || "stackedBar" === entries[0].dataSeries.type || "stackedBar100" === entries[0].dataSeries.type ? entries[0].dataSeries.axisX.lineCoordinates.y2 - entries[0].dataSeries.axisX.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisX.maximum - entries[0].dataSeries.axisX.minimum) * Math.abs(entries[0].dataPoint.x - entries[0].dataSeries.axisX.minimum) + .5 << 0 : mouseY : entries[0].dataSeries.axisY.lineCoordinates.y2 - entries[0].dataSeries.axisY.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisY.maximum - entries[0].dataSeries.axisY.minimum) * Math.abs(entries[0].dataPoint.y - entries[0].dataSeries.axisY.minimum) + .5 << 0;
                toolTipBottom = -toolTipBottom + 10;
                toolTipBottom + this.container.clientHeight + 5 > 0 && (toolTipBottom -= toolTipBottom + this.container.clientHeight + 5 - 0);
                toolTipBottom += "px";
                this.container.style.left = toolTipLeft;
                this.container.style.bottom = toolTipBottom;
                !this.animationEnabled || previouslyHidden ? this.disableAnimation() : this.enableAnimation();
            } else this.hide(false);
        }
    };
    ToolTip.prototype.highlightObjects = function(entries) {
        if (!this.enabled) return;
        var overlaidCanvasCtx = this.chart.overlaidCanvasCtx;
        this.chart.resetOverlayedCanvas();
        overlaidCanvasCtx.save();
        var plotArea = this.chart.plotArea;
        overlaidCanvasCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        overlaidCanvasCtx.clip();
        overlaidCanvasCtx.beginPath();
        var offset = 0;
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var eventObject = this.chart._eventManager.objectMap[entry.dataSeries.dataPointIds[entry.index]];
            if (!eventObject || !eventObject.objectType || "dataPoint" !== eventObject.objectType) continue;
            var dataSeries = this.chart.data[eventObject.dataSeriesIndex];
            {
                this.chart.data[eventObject.dataPointIndex];
            }
            var index = eventObject.dataPointIndex;
            if ("line" === dataSeries.type || "stepLine" === dataSeries.type || "spline" === dataSeries.type || "scatter" === dataSeries.type || "area" === dataSeries.type || "stepArea" === dataSeries.type || "splineArea" === dataSeries.type || "stackedArea" === dataSeries.type || "stackedArea100" === dataSeries.type || "rangeArea" === dataSeries.type || "rangeSplineArea" === dataSeries.type) {
                var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
                markerProps.size = Math.max(1.5 * markerProps.size << 0, 10);
                markerProps.borderColor = markerProps.borderColor || "#FFFFFF";
                markerProps.borderThickness = markerProps.borderThickness || Math.ceil(.1 * markerProps.size);
                RenderHelper.drawMarkers([ markerProps ]);
                if ("undefined" != typeof eventObject.y2) {
                    var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y2, this.chart.overlaidCanvasCtx);
                    markerProps.size = Math.max(1.5 * markerProps.size << 0, 10);
                    markerProps.borderColor = markerProps.borderColor || "#FFFFFF";
                    markerProps.borderThickness = markerProps.borderThickness || Math.ceil(.1 * markerProps.size);
                    RenderHelper.drawMarkers([ markerProps ]);
                }
            } else if ("bubble" === dataSeries.type) {
                var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
                markerProps.size = eventObject.size;
                markerProps.color = "white";
                markerProps.borderColor = "white";
                overlaidCanvasCtx.globalAlpha = .3;
                RenderHelper.drawMarkers([ markerProps ]);
                overlaidCanvasCtx.globalAlpha = 1;
            } else if ("column" === dataSeries.type || "stackedColumn" === dataSeries.type || "stackedColumn100" === dataSeries.type || "bar" === dataSeries.type || "rangeBar" === dataSeries.type || "stackedBar" === dataSeries.type || "stackedBar100" === dataSeries.type || "rangeColumn" === dataSeries.type) drawRect(overlaidCanvasCtx, eventObject.x1, eventObject.y1, eventObject.x2, eventObject.y2, "white", 0, null, false, false, false, false, .3); else if ("pie" === dataSeries.type || "doughnut" === dataSeries.type) drawSegment(overlaidCanvasCtx, eventObject.center, eventObject.radius, "white", dataSeries.type, eventObject.startAngle, eventObject.endAngle, .3); else if ("candlestick" === dataSeries.type) {
                overlaidCanvasCtx.globalAlpha = 1;
                overlaidCanvasCtx.strokeStyle = eventObject.color;
                overlaidCanvasCtx.lineWidth = 2 * eventObject.borderThickness;
                offset = overlaidCanvasCtx.lineWidth % 2 === 0 ? 0 : .5;
                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3 - offset, eventObject.y2);
                overlaidCanvasCtx.lineTo(eventObject.x3 - offset, Math.min(eventObject.y1, eventObject.y4));
                overlaidCanvasCtx.stroke();
                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3 - offset, Math.max(eventObject.y1, eventObject.y4));
                overlaidCanvasCtx.lineTo(eventObject.x3 - offset, eventObject.y3);
                overlaidCanvasCtx.stroke();
                drawRect(overlaidCanvasCtx, eventObject.x1, Math.min(eventObject.y1, eventObject.y4), eventObject.x2, Math.max(eventObject.y1, eventObject.y4), "transparent", 2 * eventObject.borderThickness, eventObject.color, false, false, false, false);
                overlaidCanvasCtx.globalAlpha = 1;
            } else if ("ohlc" === dataSeries.type) {
                overlaidCanvasCtx.globalAlpha = 1;
                overlaidCanvasCtx.strokeStyle = eventObject.color;
                overlaidCanvasCtx.lineWidth = 2 * eventObject.borderThickness;
                offset = overlaidCanvasCtx.lineWidth % 2 === 0 ? 0 : .5;
                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3 - offset, eventObject.y2);
                overlaidCanvasCtx.lineTo(eventObject.x3 - offset, eventObject.y3);
                overlaidCanvasCtx.stroke();
                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y1);
                overlaidCanvasCtx.lineTo(eventObject.x1, eventObject.y1);
                overlaidCanvasCtx.stroke();
                overlaidCanvasCtx.beginPath();
                overlaidCanvasCtx.moveTo(eventObject.x3, eventObject.y4);
                overlaidCanvasCtx.lineTo(eventObject.x2, eventObject.y4);
                overlaidCanvasCtx.stroke();
                overlaidCanvasCtx.globalAlpha = 1;
            }
        }
        overlaidCanvasCtx.globalAlpha = 1;
        overlaidCanvasCtx.restore();
        return;
    };
    ToolTip.prototype.getToolTipInnerHTML = function(e) {
        var entries = e.entries;
        var toolTipInnerHtml = null;
        var dataSeries = null;
        var dataPoint = null;
        var index = 0;
        var toolTipContent = "";
        var isToolTipDefinedInData = true;
        for (var i = 0; i < entries.length; i++) if (entries[i].dataSeries.toolTipContent || entries[i].dataPoint.toolTipContent) {
            isToolTipDefinedInData = false;
            break;
        }
        if (isToolTipDefinedInData && this.content && "function" == typeof this.content) toolTipInnerHtml = this.content({
            entries: entries
        }); else if (this.shared) {
            var toolTipInnerHtmlPrefix = "";
            for (var i = 0; i < entries.length; i++) {
                dataSeries = entries[i].dataSeries;
                dataPoint = entries[i].dataPoint;
                index = entries[i].index;
                toolTipContent = "";
                if (0 === i && isToolTipDefinedInData && !this.content) {
                    toolTipInnerHtmlPrefix += "undefined" != typeof this.chart.axisX.labels[dataPoint.x] ? this.chart.axisX.labels[dataPoint.x] : "{x}";
                    toolTipInnerHtmlPrefix += "</br>";
                    toolTipInnerHtmlPrefix = this.chart.replaceKeywordsWithValue(toolTipInnerHtmlPrefix, dataPoint, dataSeries, index);
                }
                if (null === dataPoint.toolTipContent || "undefined" == typeof dataPoint.toolTipContent && null === dataSeries._options.toolTipContent) continue;
                "line" === dataSeries.type || "stepLine" === dataSeries.type || "spline" === dataSeries.type || "area" === dataSeries.type || "stepArea" === dataSeries.type || "splineArea" === dataSeries.type || "column" === dataSeries.type || "bar" === dataSeries.type || "scatter" === dataSeries.type || "stackedColumn" === dataSeries.type || "stackedColumn100" === dataSeries.type || "stackedBar" === dataSeries.type || "stackedBar100" === dataSeries.type || "stackedArea" === dataSeries.type || "stackedArea100" === dataSeries.type ? toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y}" : "bubble" === dataSeries.type ? toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}" : "pie" === dataSeries.type || "doughnut" === dataSeries.type || "funnel" === dataSeries.type ? toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : "&nbsp;&nbsp;{y}" : "rangeColumn" === dataSeries.type || "rangeBar" === dataSeries.type || "rangeArea" === dataSeries.type || "rangeSplineArea" === dataSeries.type ? toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y[0]},&nbsp;{y[1]}" : ("candlestick" === dataSeries.type || "ohlc" === dataSeries.type) && (toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low:&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}");
                null === toolTipInnerHtml && (toolTipInnerHtml = "");
                toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);
                i < entries.length - 1 && (toolTipInnerHtml += "</br>");
            }
            null !== toolTipInnerHtml && (toolTipInnerHtml = toolTipInnerHtmlPrefix + toolTipInnerHtml);
        } else {
            dataSeries = entries[0].dataSeries;
            dataPoint = entries[0].dataPoint;
            index = entries[0].index;
            if (null === dataPoint.toolTipContent || "undefined" == typeof dataPoint.toolTipContent && null === dataSeries._options.toolTipContent) return null;
            "line" === dataSeries.type || "stepLine" === dataSeries.type || "spline" === dataSeries.type || "area" === dataSeries.type || "stepArea" === dataSeries.type || "splineArea" === dataSeries.type || "column" === dataSeries.type || "bar" === dataSeries.type || "scatter" === dataSeries.type || "stackedColumn" === dataSeries.type || "stackedColumn100" === dataSeries.type || "stackedBar" === dataSeries.type || "stackedBar100" === dataSeries.type || "stackedArea" === dataSeries.type || "stackedArea100" === dataSeries.type ? toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y}" : "bubble" === dataSeries.type ? toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}" : "pie" === dataSeries.type || "doughnut" === dataSeries.type || "funnel" === dataSeries.type ? toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : (dataPoint.name ? "{name}:&nbsp;&nbsp;" : dataPoint.label ? "{label}:&nbsp;&nbsp;" : "") + "{y}" : "rangeColumn" === dataSeries.type || "rangeBar" === dataSeries.type || "rangeArea" === dataSeries.type || "rangeSplineArea" === dataSeries.type ? toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y[0]}, &nbsp;{y[1]}" : ("candlestick" === dataSeries.type || "ohlc" === dataSeries.type) && (toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && "function" != typeof this.content ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + "</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low: &nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}");
            null === toolTipInnerHtml && (toolTipInnerHtml = "");
            toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);
        }
        return toolTipInnerHtml;
    };
    ToolTip.prototype.enableAnimation = function() {
        if (this.container.style.WebkitTransition) return;
        this.container.style.WebkitTransition = "left .2s ease-out, bottom .2s ease-out";
        this.container.style.MozTransition = "left .2s ease-out, bottom .2s ease-out";
        this.container.style.MsTransition = "left .2s ease-out, bottom .2s ease-out";
        this.container.style.transition = "left .2s ease-out, bottom .2s ease-out";
    };
    ToolTip.prototype.disableAnimation = function() {
        if (!this.container.style.WebkitTransition) return;
        this.container.style.WebkitTransition = "";
        this.container.style.MozTransition = "";
        this.container.style.MsTransition = "";
        this.container.style.transition = "";
    };
    ToolTip.prototype.hide = function(resetOverlayedCanvas) {
        if (!this.enabled) return;
        resetOverlayedCanvas = "undefined" == typeof resetOverlayedCanvas ? true : resetOverlayedCanvas;
        this.container.style.display = "none";
        this.currentSeriesIndex = -1;
        this._prevX = 0/0;
        this._prevY = 0/0;
        resetOverlayedCanvas && this.chart.resetOverlayedCanvas();
    };
    Chart.prototype.replaceKeywordsWithValue = function(str, dp, ds, dpIndex, indexKeywordValue) {
        var regex = /\{.*?\}|"[^"]*"|'[^']*'/g;
        var chart = this;
        indexKeywordValue = "undefined" == typeof indexKeywordValue ? 0 : indexKeywordValue;
        if ((ds.type.indexOf("stacked") >= 0 || "pie" === ds.type || "doughnut" === ds.type) && (str.indexOf("#percent") >= 0 || str.indexOf("#total") >= 0)) {
            var percent = "#percent";
            var total = "#total";
            var dpX = null;
            if (ds.type.indexOf("stacked") >= 0) {
                total = 0;
                dpX = dp.x.getTime ? dp.x.getTime() : dp.x;
                if (dpX in ds.plotUnit.yTotals) {
                    total = ds.plotUnit.yTotals[dpX];
                    percent = isNaN(dp.y) ? 0 : dp.y / total * 100;
                }
            } else if ("pie" === ds.type || "doughnut" === ds.type) {
                total = 0;
                for (i = 0; i < ds.dataPoints.length; i++) isNaN(ds.dataPoints[i].y) || (total += ds.dataPoints[i].y);
                percent = isNaN(dp.y) ? 0 : dp.y / total * 100;
            }
            do {
                var percentFormatString = "";
                if (ds.percentFormatString) percentFormatString = ds.percentFormatString; else {
                    percentFormatString = "#,##0.";
                    var numberOfDecimals = Math.max(Math.ceil(Math.log(1 / Math.abs(percent)) / Math.LN10), 2);
                    (isNaN(numberOfDecimals) || !isFinite(numberOfDecimals)) && (numberOfDecimals = 2);
                    for (var n = 0; numberOfDecimals > n; n++) percentFormatString += "#";
                }
                str = str.replace("#percent", numberFormat(percent, percentFormatString, chart._cultureInfo));
                str = str.replace("#total", numberFormat(total, ds.yValueFormatString ? ds.yValueFormatString : "#,##0.########"));
            } while (str.indexOf("#percent") >= 0 || str.indexOf("#total") >= 0);
        }
        var fcn = function($0) {
            if ('"' === $0[0] && '"' === $0[$0.length - 1] || "'" === $0[0] && "'" === $0[$0.length - 1]) return $0.slice(1, $0.length - 1);
            var key = trimString($0.slice(1, $0.length - 1));
            key = key.replace("#index", indexKeywordValue);
            var index = null;
            try {
                var match = key.match(/(.*?)\s*\[\s*(.*?)\s*\]/);
                if (match && match.length > 0) {
                    index = trimString(match[2]);
                    key = trimString(match[1]);
                }
            } catch (e) {}
            var obj = null;
            if ("color" === key) return dp.color ? dp.color : ds.color ? ds.color : ds._colorSet[dpIndex % ds._colorSet.length];
            if (dp.hasOwnProperty(key)) obj = dp; else {
                if (!ds.hasOwnProperty(key)) return "";
                obj = ds;
            }
            var value = obj[key];
            null !== index && (value = value[index]);
            return "x" === key ? chart.axisX && "dateTime" === chart.plotInfo.axisXValueType ? dateFormat(value, dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : chart.axisX && chart.axisX.valueFormatString ? chart.axisX.valueFormatString : "DD MMM YY", chart._cultureInfo) : numberFormat(value, dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : "#,##0.########", chart._cultureInfo) : "y" === key ? numberFormat(value, dp.yValueFormatString ? dp.yValueFormatString : ds.yValueFormatString ? ds.yValueFormatString : "#,##0.########", chart._cultureInfo) : "z" === key ? numberFormat(value, dp.zValueFormatString ? dp.zValueFormatString : ds.zValueFormatString ? ds.zValueFormatString : "#,##0.########", chart._cultureInfo) : value;
        };
        return str.replace(regex, fcn);
    };
    EventManager.prototype.reset = function() {
        this.lastObjectId = 0;
        this.objectMap = [];
        this.rectangularRegionEventSubscriptions = [];
        this.previousDataPointEventObject = null;
        this.eventObjects = [];
        if (isCanvasSupported) {
            this.ghostCtx.clearRect(0, 0, this.chart.width, this.chart.height);
            this.ghostCtx.beginPath();
        }
    };
    EventManager.prototype.getNewObjectTrackingId = function() {
        return ++this.lastObjectId;
    };
    EventManager.prototype.mouseEventHandler = function(ev) {
        if ("mousemove" !== ev.type && "click" !== ev.type) return;
        var eventObjectMaps = [];
        var xy = getMouseCoordinates(ev);
        var id = null;
        id = this.chart.getObjectAtXY(xy.x, xy.y, false);
        if (id && "undefined" != typeof this.objectMap[id]) {
            var eventObjectMap = this.objectMap[id];
            if ("dataPoint" === eventObjectMap.objectType) {
                var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
                var dataPoint = dataSeries.dataPoints[eventObjectMap.dataPointIndex];
                var dataPointIndex = eventObjectMap.dataPointIndex;
                eventObjectMap.eventParameter = {
                    x: xy.x,
                    y: xy.y,
                    dataPoint: dataPoint,
                    dataSeries: dataSeries._options,
                    dataPointIndex: dataPointIndex,
                    dataSeriesIndex: dataSeries.index,
                    chart: this.chart._publicChartReference
                };
                eventObjectMap.eventContext = {
                    context: dataPoint,
                    userContext: dataPoint,
                    mouseover: "mouseover",
                    mousemove: "mousemove",
                    mouseout: "mouseout",
                    click: "click"
                };
                eventObjectMaps.push(eventObjectMap);
                eventObjectMap = this.objectMap[dataSeries.id];
                eventObjectMap.eventParameter = {
                    x: xy.x,
                    y: xy.y,
                    dataPoint: dataPoint,
                    dataSeries: dataSeries._options,
                    dataPointIndex: dataPointIndex,
                    dataSeriesIndex: dataSeries.index,
                    chart: this.chart._publicChartReference
                };
                eventObjectMap.eventContext = {
                    context: dataSeries,
                    userContext: dataSeries._options,
                    mouseover: "mouseover",
                    mousemove: "mousemove",
                    mouseout: "mouseout",
                    click: "click"
                };
                eventObjectMaps.push(this.objectMap[dataSeries.id]);
            } else if ("legendItem" === eventObjectMap.objectType) {
                var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
                var dataPoint = null !== eventObjectMap.dataPointIndex ? dataSeries.dataPoints[eventObjectMap.dataPointIndex] : null;
                eventObjectMap.eventParameter = {
                    x: xy.x,
                    y: xy.y,
                    dataSeries: dataSeries._options,
                    dataPoint: dataPoint,
                    dataPointIndex: eventObjectMap.dataPointIndex,
                    dataSeriesIndex: eventObjectMap.dataSeriesIndex,
                    chart: this.chart._publicChartReference
                };
                eventObjectMap.eventContext = {
                    context: this.chart.legend,
                    userContext: this.chart.legend._options,
                    mouseover: "itemmouseover",
                    mousemove: "itemmousemove",
                    mouseout: "itemmouseout",
                    click: "itemclick"
                };
                eventObjectMaps.push(eventObjectMap);
            }
        }
        var mouseOutObjectMapsExcluded = [];
        for (var i = 0; i < this.mouseoveredObjectMaps.length; i++) {
            var mouseOut = true;
            for (var j = 0; j < eventObjectMaps.length; j++) if (eventObjectMaps[j].id === this.mouseoveredObjectMaps[i].id) {
                mouseOut = false;
                break;
            }
            mouseOut ? this.fireEvent(this.mouseoveredObjectMaps[i], "mouseout", ev) : mouseOutObjectMapsExcluded.push(this.mouseoveredObjectMaps[i]);
        }
        this.mouseoveredObjectMaps = mouseOutObjectMapsExcluded;
        for (var i = 0; i < eventObjectMaps.length; i++) {
            var existing = false;
            for (var j = 0; j < this.mouseoveredObjectMaps.length; j++) if (eventObjectMaps[i].id === this.mouseoveredObjectMaps[j].id) {
                existing = true;
                break;
            }
            if (!existing) {
                this.fireEvent(eventObjectMaps[i], "mouseover", ev);
                this.mouseoveredObjectMaps.push(eventObjectMaps[i]);
            }
            "click" === ev.type ? this.fireEvent(eventObjectMaps[i], "click", ev) : "mousemove" === ev.type && this.fireEvent(eventObjectMaps[i], "mousemove", ev);
        }
    };
    EventManager.prototype.fireEvent = function(eventObjectMap, eventType, ev) {
        if (!eventObjectMap || !eventType) return;
        var eventParameter = eventObjectMap.eventParameter;
        var eventContext = eventObjectMap.eventContext;
        var userContext = eventObjectMap.eventContext.userContext;
        userContext && eventContext && userContext[eventContext[eventType]] && userContext[eventContext[eventType]].call(userContext, eventParameter);
        if ("mouseout" !== eventType) userContext.cursor && userContext.cursor !== ev.target.style.cursor && (ev.target.style.cursor = userContext.cursor); else {
            ev.target.style.cursor = this.chart._defaultCursor;
            delete eventObjectMap.eventParameter;
            delete eventObjectMap.eventContext;
        }
        "click" === eventType && "dataPoint" === eventObjectMap.objectType && this.chart.pieDoughnutClickHandler && this.chart.pieDoughnutClickHandler.call(this.chart.data[eventObjectMap.dataSeriesIndex], eventParameter);
    };
    extend(CultureInfo, CanvasJSObject);
    Animator.prototype.animate = function(startDelay, duration, animationCallback, onComplete, easingFunction) {
        var _this = this;
        this.chart.isAnimating = true;
        easingFunction = easingFunction || AnimationHelper.easing.linear;
        animationCallback && this.animations.push({
            startTime: new Date().getTime() + (startDelay ? startDelay : 0),
            duration: duration,
            animationCallback: animationCallback,
            onComplete: onComplete
        });
        var remainingAnimations = [];
        while (this.animations.length > 0) {
            var animation = this.animations.shift();
            var now = new Date().getTime();
            var fractionComplete = 0;
            if (animation.startTime <= now) {
                fractionComplete = easingFunction(Math.min(now - animation.startTime, animation.duration), 0, 1, animation.duration);
                fractionComplete = Math.min(fractionComplete, 1);
                (isNaN(fractionComplete) || !isFinite(fractionComplete)) && (fractionComplete = 1);
            }
            1 > fractionComplete && remainingAnimations.push(animation);
            animation.animationCallback(fractionComplete);
            fractionComplete >= 1 && animation.onComplete && animation.onComplete();
        }
        this.animations = remainingAnimations;
        this.animations.length > 0 ? this.animationRequestId = this.chart.requestAnimFrame.call(window, function() {
            _this.animate.call(_this);
        }) : this.chart.isAnimating = false;
    };
    Animator.prototype.cancelAllAnimations = function() {
        this.animations = [];
        this.animationRequestId && this.chart.cancelRequestAnimFrame.call(window, this.animationRequestId);
        this.animationRequestId = null;
        this.chart.isAnimating = false;
    };
    var AnimationHelper = {
        yScaleAnimation: function(fractionComplete, animationInfo) {
            if (0 === fractionComplete) return;
            var ctx = animationInfo.dest;
            var sourceCanvas = animationInfo.source.canvas;
            var base = animationInfo.animationBase;
            var offsetY = base - base * fractionComplete;
            ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, offsetY, ctx.canvas.width / devicePixelBackingStoreRatio, fractionComplete * ctx.canvas.height / devicePixelBackingStoreRatio);
        },
        xScaleAnimation: function(fractionComplete, animationInfo) {
            if (0 === fractionComplete) return;
            var ctx = animationInfo.dest;
            var sourceCanvas = animationInfo.source.canvas;
            var base = animationInfo.animationBase;
            var offsetX = base - base * fractionComplete;
            ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, offsetX, 0, fractionComplete * ctx.canvas.width / devicePixelBackingStoreRatio, ctx.canvas.height / devicePixelBackingStoreRatio);
        },
        xClipAnimation: function(fractionComplete, animationInfo) {
            if (0 === fractionComplete) return;
            var ctx = animationInfo.dest;
            var sourceCanvas = animationInfo.source.canvas;
            ctx.save();
            fractionComplete > 0 && ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width * fractionComplete, sourceCanvas.height, 0, 0, sourceCanvas.width * fractionComplete / devicePixelBackingStoreRatio, sourceCanvas.height / devicePixelBackingStoreRatio);
            ctx.restore();
        },
        fadeInAnimation: function(fractionComplete, animationInfo) {
            if (0 === fractionComplete) return;
            var ctx = animationInfo.dest;
            var sourceCanvas = animationInfo.source.canvas;
            ctx.save();
            ctx.globalAlpha = fractionComplete;
            ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, 0, ctx.canvas.width / devicePixelBackingStoreRatio, ctx.canvas.height / devicePixelBackingStoreRatio);
            ctx.restore();
        },
        easing: {
            linear: function(t, b, c, d) {
                return c * t / d + b;
            },
            easeOutQuad: function(t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeOutQuart: function(t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInQuad: function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeInQuart: function(t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            }
        }
    };
    var RenderHelper = {
        drawMarker: function(x, y, ctx, markerType, markerSize, markerColor, markerBorderColor, markerBorderThickness) {
            if (!ctx) return;
            var alpha = 1;
            ctx.fillStyle = markerColor ? markerColor : "#000000";
            ctx.strokeStyle = markerBorderColor ? markerBorderColor : "#000000";
            ctx.lineWidth = markerBorderThickness ? markerBorderThickness : 0;
            if ("circle" === markerType) {
                ctx.moveTo(x, y);
                ctx.beginPath();
                ctx.arc(x, y, markerSize / 2, 0, 2 * Math.PI, false);
                markerColor && ctx.fill();
                if (markerBorderThickness) if (markerBorderColor) ctx.stroke(); else {
                    alpha = ctx.globalAlpha;
                    ctx.globalAlpha = .15;
                    ctx.strokeStyle = "black";
                    ctx.stroke();
                    ctx.globalAlpha = alpha;
                }
            } else if ("square" === markerType) {
                ctx.beginPath();
                ctx.rect(x - markerSize / 2, y - markerSize / 2, markerSize, markerSize);
                markerColor && ctx.fill();
                if (markerBorderThickness) if (markerBorderColor) ctx.stroke(); else {
                    alpha = ctx.globalAlpha;
                    ctx.globalAlpha = .15;
                    ctx.strokeStyle = "black";
                    ctx.stroke();
                    ctx.globalAlpha = alpha;
                }
            } else if ("triangle" === markerType) {
                ctx.beginPath();
                ctx.moveTo(x - markerSize / 2, y + markerSize / 2);
                ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
                ctx.lineTo(x, y - markerSize / 2);
                ctx.closePath();
                markerColor && ctx.fill();
                if (markerBorderThickness) if (markerBorderColor) ctx.stroke(); else {
                    alpha = ctx.globalAlpha;
                    ctx.globalAlpha = .15;
                    ctx.strokeStyle = "black";
                    ctx.stroke();
                    ctx.globalAlpha = alpha;
                }
                ctx.beginPath();
            } else if ("cross" === markerType) {
                ctx.strokeStyle = markerColor;
                markerBorderThickness = markerSize / 4;
                ctx.lineWidth = markerBorderThickness;
                ctx.beginPath();
                ctx.moveTo(x - markerSize / 2, y - markerSize / 2);
                ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
                ctx.stroke();
                ctx.moveTo(x + markerSize / 2, y - markerSize / 2);
                ctx.lineTo(x - markerSize / 2, y + markerSize / 2);
                ctx.stroke();
            }
        },
        drawMarkers: function(markers) {
            for (var i = 0; i < markers.length; i++) {
                var marker = markers[i];
                RenderHelper.drawMarker(marker.x, marker.y, marker.ctx, marker.type, marker.size, marker.color, marker.borderColor, marker.borderThickness);
            }
        }
    };
    var CanvasJS = {
        Chart: function(containerId, options) {
            var _chart = new Chart(containerId, options, this);
            this.render = function() {
                _chart.render(this.options);
            };
            this.options = _chart._options;
        },
        addColorSet: function(name, colorSet) {
            colorSets[name] = colorSet;
        },
        addCultureInfo: function(name, cultureInfo) {
            cultures[name] = cultureInfo;
        }
    };
    CanvasJS.Chart.version = "v1.6.0 GA";
    window.CanvasJS = CanvasJS;
}();