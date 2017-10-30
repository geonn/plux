var qrcode = function() {
    function qrPolynomial(num, shift) {
        if ("undefined" == typeof num.length) throw new Error(num.length + "/" + shift);
        var _num = function() {
            var offset = 0;
            while (offset < num.length && 0 == num[offset]) offset += 1;
            var _num = new Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i += 1) _num[i] = num[i + offset];
            return _num;
        }();
        var _this = {};
        _this.get = function(index) {
            return _num[index];
        };
        _this.getLength = function() {
            return _num.length;
        };
        _this.multiply = function(e) {
            var num = new Array(_this.getLength() + e.getLength() - 1);
            for (var i = 0; i < _this.getLength(); i += 1) for (var j = 0; j < e.getLength(); j += 1) num[i + j] ^= QRMath.gexp(QRMath.glog(_this.get(i)) + QRMath.glog(e.get(j)));
            return qrPolynomial(num, 0);
        };
        _this.mod = function(e) {
            if (_this.getLength() - e.getLength() < 0) return _this;
            var ratio = QRMath.glog(_this.get(0)) - QRMath.glog(e.get(0));
            var num = new Array(_this.getLength());
            for (var i = 0; i < _this.getLength(); i += 1) num[i] = _this.get(i);
            for (var i = 0; i < e.getLength(); i += 1) num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
            return qrPolynomial(num, 0).mod(e);
        };
        return _this;
    }
    var qrcode = function(typeNumber, errorCorrectLevel) {
        var PAD0 = 236;
        var PAD1 = 17;
        var _typeNumber = typeNumber;
        var _errorCorrectLevel = QRErrorCorrectLevel[errorCorrectLevel];
        var _modules = null;
        var _moduleCount = 0;
        var _dataCache = null;
        var _dataList = new Array();
        var _this = {};
        var makeImpl = function(test, maskPattern) {
            _moduleCount = 4 * _typeNumber + 17;
            _modules = function(moduleCount) {
                var modules = new Array(moduleCount);
                for (var row = 0; moduleCount > row; row += 1) {
                    modules[row] = new Array(moduleCount);
                    for (var col = 0; moduleCount > col; col += 1) modules[row][col] = null;
                }
                return modules;
            }(_moduleCount);
            setupPositionProbePattern(0, 0);
            setupPositionProbePattern(_moduleCount - 7, 0);
            setupPositionProbePattern(0, _moduleCount - 7);
            setupPositionAdjustPattern();
            setupTimingPattern();
            setupTypeInfo(test, maskPattern);
            _typeNumber >= 7 && setupTypeNumber(test);
            null == _dataCache && (_dataCache = createData(_typeNumber, _errorCorrectLevel, _dataList));
            mapData(_dataCache, maskPattern);
        };
        var setupPositionProbePattern = function(row, col) {
            for (var r = -1; 7 >= r; r += 1) {
                if (-1 >= row + r || row + r >= _moduleCount) continue;
                for (var c = -1; 7 >= c; c += 1) {
                    if (-1 >= col + c || col + c >= _moduleCount) continue;
                    r >= 0 && 6 >= r && (0 == c || 6 == c) || c >= 0 && 6 >= c && (0 == r || 6 == r) || r >= 2 && 4 >= r && c >= 2 && 4 >= c ? _modules[row + r][col + c] = true : _modules[row + r][col + c] = false;
                }
            }
        };
        var getBestMaskPattern = function() {
            var minLostPoint = 0;
            var pattern = 0;
            for (var i = 0; 8 > i; i += 1) {
                makeImpl(true, i);
                var lostPoint = QRUtil.getLostPoint(_this);
                if (0 == i || minLostPoint > lostPoint) {
                    minLostPoint = lostPoint;
                    pattern = i;
                }
            }
            return pattern;
        };
        var setupTimingPattern = function() {
            for (var r = 8; _moduleCount - 8 > r; r += 1) {
                if (null != _modules[r][6]) continue;
                _modules[r][6] = r % 2 == 0;
            }
            for (var c = 8; _moduleCount - 8 > c; c += 1) {
                if (null != _modules[6][c]) continue;
                _modules[6][c] = c % 2 == 0;
            }
        };
        var setupPositionAdjustPattern = function() {
            var pos = QRUtil.getPatternPosition(_typeNumber);
            for (var i = 0; i < pos.length; i += 1) for (var j = 0; j < pos.length; j += 1) {
                var row = pos[i];
                var col = pos[j];
                if (null != _modules[row][col]) continue;
                for (var r = -2; 2 >= r; r += 1) for (var c = -2; 2 >= c; c += 1) -2 == r || 2 == r || -2 == c || 2 == c || 0 == r && 0 == c ? _modules[row + r][col + c] = true : _modules[row + r][col + c] = false;
            }
        };
        var setupTypeNumber = function(test) {
            var bits = QRUtil.getBCHTypeNumber(_typeNumber);
            for (var i = 0; 18 > i; i += 1) {
                var mod = !test && 1 == (bits >> i & 1);
                _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
            }
            for (var i = 0; 18 > i; i += 1) {
                var mod = !test && 1 == (bits >> i & 1);
                _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
            }
        };
        var setupTypeInfo = function(test, maskPattern) {
            var data = _errorCorrectLevel << 3 | maskPattern;
            var bits = QRUtil.getBCHTypeInfo(data);
            for (var i = 0; 15 > i; i += 1) {
                var mod = !test && 1 == (bits >> i & 1);
                6 > i ? _modules[i][8] = mod : 8 > i ? _modules[i + 1][8] = mod : _modules[_moduleCount - 15 + i][8] = mod;
            }
            for (var i = 0; 15 > i; i += 1) {
                var mod = !test && 1 == (bits >> i & 1);
                8 > i ? _modules[8][_moduleCount - i - 1] = mod : 9 > i ? _modules[8][15 - i - 1 + 1] = mod : _modules[8][15 - i - 1] = mod;
            }
            _modules[_moduleCount - 8][8] = !test;
        };
        var mapData = function(data, maskPattern) {
            var inc = -1;
            var row = _moduleCount - 1;
            var bitIndex = 7;
            var byteIndex = 0;
            var maskFunc = QRUtil.getMaskFunction(maskPattern);
            for (var col = _moduleCount - 1; col > 0; col -= 2) {
                6 == col && (col -= 1);
                while (true) {
                    for (var c = 0; 2 > c; c += 1) if (null == _modules[row][col - c]) {
                        var dark = false;
                        byteIndex < data.length && (dark = 1 == (data[byteIndex] >>> bitIndex & 1));
                        var mask = maskFunc(row, col - c);
                        mask && (dark = !dark);
                        _modules[row][col - c] = dark;
                        bitIndex -= 1;
                        if (-1 == bitIndex) {
                            byteIndex += 1;
                            bitIndex = 7;
                        }
                    }
                    row += inc;
                    if (0 > row || row >= _moduleCount) {
                        row -= inc;
                        inc = -inc;
                        break;
                    }
                }
            }
        };
        var createBytes = function(buffer, rsBlocks) {
            var offset = 0;
            var maxDcCount = 0;
            var maxEcCount = 0;
            var dcdata = new Array(rsBlocks.length);
            var ecdata = new Array(rsBlocks.length);
            for (var r = 0; r < rsBlocks.length; r += 1) {
                var dcCount = rsBlocks[r].dataCount;
                var ecCount = rsBlocks[r].totalCount - dcCount;
                maxDcCount = Math.max(maxDcCount, dcCount);
                maxEcCount = Math.max(maxEcCount, ecCount);
                dcdata[r] = new Array(dcCount);
                for (var i = 0; i < dcdata[r].length; i += 1) dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
                offset += dcCount;
                var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
                var modPoly = rawPoly.mod(rsPoly);
                ecdata[r] = new Array(rsPoly.getLength() - 1);
                for (var i = 0; i < ecdata[r].length; i += 1) {
                    var modIndex = i + modPoly.getLength() - ecdata[r].length;
                    ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
                }
            }
            var totalCodeCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) totalCodeCount += rsBlocks[i].totalCount;
            var data = new Array(totalCodeCount);
            var index = 0;
            for (var i = 0; maxDcCount > i; i += 1) for (var r = 0; r < rsBlocks.length; r += 1) if (i < dcdata[r].length) {
                data[index] = dcdata[r][i];
                index += 1;
            }
            for (var i = 0; maxEcCount > i; i += 1) for (var r = 0; r < rsBlocks.length; r += 1) if (i < ecdata[r].length) {
                data[index] = ecdata[r][i];
                index += 1;
            }
            return data;
        };
        var createData = function(typeNumber, errorCorrectLevel, dataList) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
            var buffer = qrBitBuffer();
            for (var i = 0; i < dataList.length; i += 1) {
                var data = dataList[i];
                buffer.put(data.getMode(), 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber));
                data.write(buffer);
            }
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) totalDataCount += rsBlocks[i].dataCount;
            if (buffer.getLengthInBits() > 8 * totalDataCount) throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + 8 * totalDataCount + ")");
            buffer.getLengthInBits() + 4 <= 8 * totalDataCount && buffer.put(0, 4);
            while (buffer.getLengthInBits() % 8 != 0) buffer.putBit(false);
            while (true) {
                if (buffer.getLengthInBits() >= 8 * totalDataCount) break;
                buffer.put(PAD0, 8);
                if (buffer.getLengthInBits() >= 8 * totalDataCount) break;
                buffer.put(PAD1, 8);
            }
            return createBytes(buffer, rsBlocks);
        };
        _this.addData = function(data) {
            var newData = qr8BitByte(data);
            _dataList.push(newData);
            _dataCache = null;
        };
        _this.isDark = function(row, col) {
            if (0 > row || row >= _moduleCount || 0 > col || col >= _moduleCount) throw new Error(row + "," + col);
            return _modules[row][col];
        };
        _this.getModuleCount = function() {
            return _moduleCount;
        };
        _this.make = function() {
            makeImpl(false, getBestMaskPattern());
        };
        _this.createTableTag = function(cellSize, margin) {
            cellSize = cellSize || 2;
            margin = "undefined" == typeof margin ? 4 * cellSize : margin;
            var qrHtml = "";
            qrHtml += '<table style="';
            qrHtml += " border-width: 0px; border-style: none;";
            qrHtml += " border-collapse: collapse;";
            qrHtml += " padding: 0px; margin: " + margin + "px;";
            qrHtml += '">';
            qrHtml += "<tbody>";
            for (var r = 0; r < _this.getModuleCount(); r += 1) {
                qrHtml += "<tr>";
                for (var c = 0; c < _this.getModuleCount(); c += 1) {
                    qrHtml += '<td style="';
                    qrHtml += " border-width: 0px; border-style: none;";
                    qrHtml += " border-collapse: collapse;";
                    qrHtml += " padding: 0px; margin: 0px;";
                    qrHtml += " width: " + cellSize + "px;";
                    qrHtml += " height: " + cellSize + "px;";
                    qrHtml += " background-color: ";
                    qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
                    qrHtml += ";";
                    qrHtml += '"/>';
                }
                qrHtml += "</tr>";
            }
            qrHtml += "</tbody>";
            qrHtml += "</table>";
            return qrHtml;
        };
        _this.createImgTag = function(cellSize, margin) {
            cellSize = cellSize || 2;
            margin = "undefined" == typeof margin ? 4 * cellSize : margin;
            var size = _this.getModuleCount() * cellSize + 2 * margin;
            var min = margin;
            var max = size - margin;
            return createImgTag(size, size, function(x, y) {
                if (x >= min && max > x && y >= min && max > y) {
                    var c = Math.floor((x - min) / cellSize);
                    var r = Math.floor((y - min) / cellSize);
                    return _this.isDark(r, c) ? 0 : 1;
                }
                return 1;
            });
        };
        return _this;
    };
    qrcode.stringToBytes = function(s) {
        var bytes = new Array();
        for (var i = 0; i < s.length; i += 1) {
            var c = s.charCodeAt(i);
            bytes.push(255 & c);
        }
        return bytes;
    };
    qrcode.createStringToBytes = function(unicodeData, numChars) {
        var unicodeMap = function() {
            var bin = base64DecodeInputStream(unicodeData);
            var read = function() {
                var b = bin.read();
                if (-1 == b) throw new Error();
                return b;
            };
            var count = 0;
            var unicodeMap = {};
            while (true) {
                var b0 = bin.read();
                if (-1 == b0) break;
                var b1 = read();
                var b2 = read();
                var b3 = read();
                var k = String.fromCharCode(b0 << 8 | b1);
                var v = b2 << 8 | b3;
                unicodeMap[k] = v;
                count += 1;
            }
            if (count != numChars) throw new Error(count + " != " + numChars);
            return unicodeMap;
        }();
        var unknownChar = "?".charCodeAt(0);
        return function(s) {
            var bytes = new Array();
            for (var i = 0; i < s.length; i += 1) {
                var c = s.charCodeAt(i);
                if (128 > c) bytes.push(c); else {
                    var b = unicodeMap[s.charAt(i)];
                    if ("number" == typeof b) if ((255 & b) == b) bytes.push(b); else {
                        bytes.push(b >>> 8);
                        bytes.push(255 & b);
                    } else bytes.push(unknownChar);
                }
            }
            return bytes;
        };
    };
    var QRMode = {
        MODE_NUMBER: 1,
        MODE_ALPHA_NUM: 2,
        MODE_8BIT_BYTE: 4,
        MODE_KANJI: 8
    };
    var QRErrorCorrectLevel = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
    };
    var QRMaskPattern = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
    };
    var QRUtil = function() {
        var PATTERN_POSITION_TABLE = [ [], [ 6, 18 ], [ 6, 22 ], [ 6, 26 ], [ 6, 30 ], [ 6, 34 ], [ 6, 22, 38 ], [ 6, 24, 42 ], [ 6, 26, 46 ], [ 6, 28, 50 ], [ 6, 30, 54 ], [ 6, 32, 58 ], [ 6, 34, 62 ], [ 6, 26, 46, 66 ], [ 6, 26, 48, 70 ], [ 6, 26, 50, 74 ], [ 6, 30, 54, 78 ], [ 6, 30, 56, 82 ], [ 6, 30, 58, 86 ], [ 6, 34, 62, 90 ], [ 6, 28, 50, 72, 94 ], [ 6, 26, 50, 74, 98 ], [ 6, 30, 54, 78, 102 ], [ 6, 28, 54, 80, 106 ], [ 6, 32, 58, 84, 110 ], [ 6, 30, 58, 86, 114 ], [ 6, 34, 62, 90, 118 ], [ 6, 26, 50, 74, 98, 122 ], [ 6, 30, 54, 78, 102, 126 ], [ 6, 26, 52, 78, 104, 130 ], [ 6, 30, 56, 82, 108, 134 ], [ 6, 34, 60, 86, 112, 138 ], [ 6, 30, 58, 86, 114, 142 ], [ 6, 34, 62, 90, 118, 146 ], [ 6, 30, 54, 78, 102, 126, 150 ], [ 6, 24, 50, 76, 102, 128, 154 ], [ 6, 28, 54, 80, 106, 132, 158 ], [ 6, 32, 58, 84, 110, 136, 162 ], [ 6, 26, 54, 82, 110, 138, 166 ], [ 6, 30, 58, 86, 114, 142, 170 ] ];
        var G15 = 1335;
        var G18 = 7973;
        var G15_MASK = 21522;
        var _this = {};
        var getBCHDigit = function(data) {
            var digit = 0;
            while (0 != data) {
                digit += 1;
                data >>>= 1;
            }
            return digit;
        };
        _this.getBCHTypeInfo = function(data) {
            var d = data << 10;
            while (getBCHDigit(d) - getBCHDigit(G15) >= 0) d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
            return (data << 10 | d) ^ G15_MASK;
        };
        _this.getBCHTypeNumber = function(data) {
            var d = data << 12;
            while (getBCHDigit(d) - getBCHDigit(G18) >= 0) d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
            return data << 12 | d;
        };
        _this.getPatternPosition = function(typeNumber) {
            return PATTERN_POSITION_TABLE[typeNumber - 1];
        };
        _this.getMaskFunction = function(maskPattern) {
            switch (maskPattern) {
              case QRMaskPattern.PATTERN000:
                return function(i, j) {
                    return (i + j) % 2 == 0;
                };

              case QRMaskPattern.PATTERN001:
                return function(i, j) {
                    return i % 2 == 0;
                };

              case QRMaskPattern.PATTERN010:
                return function(i, j) {
                    return j % 3 == 0;
                };

              case QRMaskPattern.PATTERN011:
                return function(i, j) {
                    return (i + j) % 3 == 0;
                };

              case QRMaskPattern.PATTERN100:
                return function(i, j) {
                    return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
                };

              case QRMaskPattern.PATTERN101:
                return function(i, j) {
                    return i * j % 2 + i * j % 3 == 0;
                };

              case QRMaskPattern.PATTERN110:
                return function(i, j) {
                    return (i * j % 2 + i * j % 3) % 2 == 0;
                };

              case QRMaskPattern.PATTERN111:
                return function(i, j) {
                    return (i * j % 3 + (i + j) % 2) % 2 == 0;
                };

              default:
                throw new Error("bad maskPattern:" + maskPattern);
            }
        };
        _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
            var a = qrPolynomial([ 1 ], 0);
            for (var i = 0; errorCorrectLength > i; i += 1) a = a.multiply(qrPolynomial([ 1, QRMath.gexp(i) ], 0));
            return a;
        };
        _this.getLengthInBits = function(mode, type) {
            if (type >= 1 && 10 > type) switch (mode) {
              case QRMode.MODE_NUMBER:
                return 10;

              case QRMode.MODE_ALPHA_NUM:
                return 9;

              case QRMode.MODE_8BIT_BYTE:
                return 8;

              case QRMode.MODE_KANJI:
                return 8;

              default:
                throw new Error("mode:" + mode);
            } else if (27 > type) switch (mode) {
              case QRMode.MODE_NUMBER:
                return 12;

              case QRMode.MODE_ALPHA_NUM:
                return 11;

              case QRMode.MODE_8BIT_BYTE:
                return 16;

              case QRMode.MODE_KANJI:
                return 10;

              default:
                throw new Error("mode:" + mode);
            } else {
                if (!(41 > type)) throw new Error("type:" + type);
                switch (mode) {
                  case QRMode.MODE_NUMBER:
                    return 14;

                  case QRMode.MODE_ALPHA_NUM:
                    return 13;

                  case QRMode.MODE_8BIT_BYTE:
                    return 16;

                  case QRMode.MODE_KANJI:
                    return 12;

                  default:
                    throw new Error("mode:" + mode);
                }
            }
        };
        _this.getLostPoint = function(qrcode) {
            var moduleCount = qrcode.getModuleCount();
            var lostPoint = 0;
            for (var row = 0; moduleCount > row; row += 1) for (var col = 0; moduleCount > col; col += 1) {
                var sameCount = 0;
                var dark = qrcode.isDark(row, col);
                for (var r = -1; 1 >= r; r += 1) {
                    if (0 > row + r || row + r >= moduleCount) continue;
                    for (var c = -1; 1 >= c; c += 1) {
                        if (0 > col + c || col + c >= moduleCount) continue;
                        if (0 == r && 0 == c) continue;
                        dark == qrcode.isDark(row + r, col + c) && (sameCount += 1);
                    }
                }
                sameCount > 5 && (lostPoint += 3 + sameCount - 5);
            }
            for (var row = 0; moduleCount - 1 > row; row += 1) for (var col = 0; moduleCount - 1 > col; col += 1) {
                var count = 0;
                qrcode.isDark(row, col) && (count += 1);
                qrcode.isDark(row + 1, col) && (count += 1);
                qrcode.isDark(row, col + 1) && (count += 1);
                qrcode.isDark(row + 1, col + 1) && (count += 1);
                (0 == count || 4 == count) && (lostPoint += 3);
            }
            for (var row = 0; moduleCount > row; row += 1) for (var col = 0; moduleCount - 6 > col; col += 1) qrcode.isDark(row, col) && !qrcode.isDark(row, col + 1) && qrcode.isDark(row, col + 2) && qrcode.isDark(row, col + 3) && qrcode.isDark(row, col + 4) && !qrcode.isDark(row, col + 5) && qrcode.isDark(row, col + 6) && (lostPoint += 40);
            for (var col = 0; moduleCount > col; col += 1) for (var row = 0; moduleCount - 6 > row; row += 1) qrcode.isDark(row, col) && !qrcode.isDark(row + 1, col) && qrcode.isDark(row + 2, col) && qrcode.isDark(row + 3, col) && qrcode.isDark(row + 4, col) && !qrcode.isDark(row + 5, col) && qrcode.isDark(row + 6, col) && (lostPoint += 40);
            var darkCount = 0;
            for (var col = 0; moduleCount > col; col += 1) for (var row = 0; moduleCount > row; row += 1) qrcode.isDark(row, col) && (darkCount += 1);
            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
            lostPoint += 10 * ratio;
            return lostPoint;
        };
        return _this;
    }();
    var QRMath = function() {
        var EXP_TABLE = new Array(256);
        var LOG_TABLE = new Array(256);
        for (var i = 0; 8 > i; i += 1) EXP_TABLE[i] = 1 << i;
        for (var i = 8; 256 > i; i += 1) EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
        for (var i = 0; 255 > i; i += 1) LOG_TABLE[EXP_TABLE[i]] = i;
        var _this = {};
        _this.glog = function(n) {
            if (1 > n) throw new Error("glog(" + n + ")");
            return LOG_TABLE[n];
        };
        _this.gexp = function(n) {
            while (0 > n) n += 255;
            while (n >= 256) n -= 255;
            return EXP_TABLE[n];
        };
        return _this;
    }();
    var QRRSBlock = function() {
        var RS_BLOCK_TABLE = [ [ 1, 26, 19 ], [ 1, 26, 16 ], [ 1, 26, 13 ], [ 1, 26, 9 ], [ 1, 44, 34 ], [ 1, 44, 28 ], [ 1, 44, 22 ], [ 1, 44, 16 ], [ 1, 70, 55 ], [ 1, 70, 44 ], [ 2, 35, 17 ], [ 2, 35, 13 ], [ 1, 100, 80 ], [ 2, 50, 32 ], [ 2, 50, 24 ], [ 4, 25, 9 ], [ 1, 134, 108 ], [ 2, 67, 43 ], [ 2, 33, 15, 2, 34, 16 ], [ 2, 33, 11, 2, 34, 12 ], [ 2, 86, 68 ], [ 4, 43, 27 ], [ 4, 43, 19 ], [ 4, 43, 15 ], [ 2, 98, 78 ], [ 4, 49, 31 ], [ 2, 32, 14, 4, 33, 15 ], [ 4, 39, 13, 1, 40, 14 ], [ 2, 121, 97 ], [ 2, 60, 38, 2, 61, 39 ], [ 4, 40, 18, 2, 41, 19 ], [ 4, 40, 14, 2, 41, 15 ], [ 2, 146, 116 ], [ 3, 58, 36, 2, 59, 37 ], [ 4, 36, 16, 4, 37, 17 ], [ 4, 36, 12, 4, 37, 13 ], [ 2, 86, 68, 2, 87, 69 ], [ 4, 69, 43, 1, 70, 44 ], [ 6, 43, 19, 2, 44, 20 ], [ 6, 43, 15, 2, 44, 16 ] ];
        var qrRSBlock = function(totalCount, dataCount) {
            var _this = {};
            _this.totalCount = totalCount;
            _this.dataCount = dataCount;
            return _this;
        };
        var _this = {};
        var getRsBlockTable = function(typeNumber, errorCorrectLevel) {
            switch (errorCorrectLevel) {
              case QRErrorCorrectLevel.L:
                return RS_BLOCK_TABLE[4 * (typeNumber - 1) + 0];

              case QRErrorCorrectLevel.M:
                return RS_BLOCK_TABLE[4 * (typeNumber - 1) + 1];

              case QRErrorCorrectLevel.Q:
                return RS_BLOCK_TABLE[4 * (typeNumber - 1) + 2];

              case QRErrorCorrectLevel.H:
                return RS_BLOCK_TABLE[4 * (typeNumber - 1) + 3];

              default:
                return;
            }
        };
        _this.getRSBlocks = function(typeNumber, errorCorrectLevel) {
            var rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);
            if ("undefined" == typeof rsBlock) throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
            var length = rsBlock.length / 3;
            var list = new Array();
            for (var i = 0; length > i; i += 1) {
                var count = rsBlock[3 * i + 0];
                var totalCount = rsBlock[3 * i + 1];
                var dataCount = rsBlock[3 * i + 2];
                for (var j = 0; count > j; j += 1) list.push(qrRSBlock(totalCount, dataCount));
            }
            return list;
        };
        return _this;
    }();
    var qrBitBuffer = function() {
        var _buffer = new Array();
        var _length = 0;
        var _this = {};
        _this.getBuffer = function() {
            return _buffer;
        };
        _this.get = function(index) {
            var bufIndex = Math.floor(index / 8);
            return 1 == (_buffer[bufIndex] >>> 7 - index % 8 & 1);
        };
        _this.put = function(num, length) {
            for (var i = 0; length > i; i += 1) _this.putBit(1 == (num >>> length - i - 1 & 1));
        };
        _this.getLengthInBits = function() {
            return _length;
        };
        _this.putBit = function(bit) {
            var bufIndex = Math.floor(_length / 8);
            _buffer.length <= bufIndex && _buffer.push(0);
            bit && (_buffer[bufIndex] |= 128 >>> _length % 8);
            _length += 1;
        };
        return _this;
    };
    var qr8BitByte = function(data) {
        var _mode = QRMode.MODE_8BIT_BYTE;
        var _bytes = qrcode.stringToBytes(data);
        var _this = {};
        _this.getMode = function() {
            return _mode;
        };
        _this.getLength = function(buffer) {
            return _bytes.length;
        };
        _this.write = function(buffer) {
            for (var i = 0; i < _bytes.length; i += 1) buffer.put(_bytes[i], 8);
        };
        return _this;
    };
    var byteArrayOutputStream = function() {
        var _bytes = new Array();
        var _this = {};
        _this.writeByte = function(b) {
            _bytes.push(255 & b);
        };
        _this.writeShort = function(i) {
            _this.writeByte(i);
            _this.writeByte(i >>> 8);
        };
        _this.writeBytes = function(b, off, len) {
            off = off || 0;
            len = len || b.length;
            for (var i = 0; len > i; i += 1) _this.writeByte(b[i + off]);
        };
        _this.writeString = function(s) {
            for (var i = 0; i < s.length; i += 1) _this.writeByte(s.charCodeAt(i));
        };
        _this.toByteArray = function() {
            return _bytes;
        };
        _this.toString = function() {
            var s = "";
            s += "[";
            for (var i = 0; i < _bytes.length; i += 1) {
                i > 0 && (s += ",");
                s += _bytes[i];
            }
            s += "]";
            return s;
        };
        return _this;
    };
    var base64EncodeOutputStream = function() {
        var _buffer = 0;
        var _buflen = 0;
        var _length = 0;
        var _base64 = "";
        var _this = {};
        var writeEncoded = function(b) {
            _base64 += String.fromCharCode(encode(63 & b));
        };
        var encode = function(n) {
            if (0 > n) ; else {
                if (26 > n) return 65 + n;
                if (52 > n) return 97 + (n - 26);
                if (62 > n) return 48 + (n - 52);
                if (62 == n) return 43;
                if (63 == n) return 47;
            }
            throw new Error("n:" + n);
        };
        _this.writeByte = function(n) {
            _buffer = _buffer << 8 | 255 & n;
            _buflen += 8;
            _length += 1;
            while (_buflen >= 6) {
                writeEncoded(_buffer >>> _buflen - 6);
                _buflen -= 6;
            }
        };
        _this.flush = function() {
            if (_buflen > 0) {
                writeEncoded(_buffer << 6 - _buflen);
                _buffer = 0;
                _buflen = 0;
            }
            if (_length % 3 != 0) {
                var padlen = 3 - _length % 3;
                for (var i = 0; padlen > i; i += 1) _base64 += "=";
            }
        };
        _this.toString = function() {
            return _base64;
        };
        return _this;
    };
    var base64DecodeInputStream = function(str) {
        var _str = str;
        var _pos = 0;
        var _buffer = 0;
        var _buflen = 0;
        var _this = {};
        _this.read = function() {
            while (8 > _buflen) {
                if (_pos >= _str.length) {
                    if (0 == _buflen) return -1;
                    throw new Error("unexpected end of file./" + _buflen);
                }
                var c = _str.charAt(_pos);
                _pos += 1;
                if ("=" == c) {
                    _buflen = 0;
                    return -1;
                }
                if (c.match(/^\s$/)) continue;
                _buffer = _buffer << 6 | decode(c.charCodeAt(0));
                _buflen += 6;
            }
            var n = _buffer >>> _buflen - 8 & 255;
            _buflen -= 8;
            return n;
        };
        var decode = function(c) {
            if (c >= 65 && 90 >= c) return c - 65;
            if (c >= 97 && 122 >= c) return c - 97 + 26;
            if (c >= 48 && 57 >= c) return c - 48 + 52;
            if (43 == c) return 62;
            if (47 == c) return 63;
            throw new Error("c:" + c);
        };
        return _this;
    };
    var gifImage = function(width, height) {
        var _width = width;
        var _height = height;
        var _data = new Array(width * height);
        var _this = {};
        _this.setPixel = function(x, y, pixel) {
            _data[y * _width + x] = pixel;
        };
        _this.write = function(out) {
            out.writeString("GIF87a");
            out.writeShort(_width);
            out.writeShort(_height);
            out.writeByte(128);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(0);
            out.writeByte(255);
            out.writeByte(255);
            out.writeByte(255);
            out.writeString(",");
            out.writeShort(0);
            out.writeShort(0);
            out.writeShort(_width);
            out.writeShort(_height);
            out.writeByte(0);
            var lzwMinCodeSize = 2;
            var raster = getLZWRaster(lzwMinCodeSize);
            out.writeByte(lzwMinCodeSize);
            var offset = 0;
            while (raster.length - offset > 255) {
                out.writeByte(255);
                out.writeBytes(raster, offset, 255);
                offset += 255;
            }
            out.writeByte(raster.length - offset);
            out.writeBytes(raster, offset, raster.length - offset);
            out.writeByte(0);
            out.writeString(";");
        };
        var bitOutputStream = function(out) {
            var _out = out;
            var _bitLength = 0;
            var _bitBuffer = 0;
            var _this = {};
            _this.write = function(data, length) {
                if (data >>> length != 0) throw new Error("length over");
                while (_bitLength + length >= 8) {
                    _out.writeByte(255 & (data << _bitLength | _bitBuffer));
                    length -= 8 - _bitLength;
                    data >>>= 8 - _bitLength;
                    _bitBuffer = 0;
                    _bitLength = 0;
                }
                _bitBuffer = data << _bitLength | _bitBuffer;
                _bitLength += length;
            };
            _this.flush = function() {
                _bitLength > 0 && _out.writeByte(_bitBuffer);
            };
            return _this;
        };
        var getLZWRaster = function(lzwMinCodeSize) {
            var clearCode = 1 << lzwMinCodeSize;
            var endCode = (1 << lzwMinCodeSize) + 1;
            var bitLength = lzwMinCodeSize + 1;
            var table = lzwTable();
            for (var i = 0; clearCode > i; i += 1) table.add(String.fromCharCode(i));
            table.add(String.fromCharCode(clearCode));
            table.add(String.fromCharCode(endCode));
            var byteOut = byteArrayOutputStream();
            var bitOut = bitOutputStream(byteOut);
            bitOut.write(clearCode, bitLength);
            var dataIndex = 0;
            var s = String.fromCharCode(_data[dataIndex]);
            dataIndex += 1;
            while (dataIndex < _data.length) {
                var c = String.fromCharCode(_data[dataIndex]);
                dataIndex += 1;
                if (table.contains(s + c)) s += c; else {
                    bitOut.write(table.indexOf(s), bitLength);
                    if (table.size() < 4095) {
                        table.size() == 1 << bitLength && (bitLength += 1);
                        table.add(s + c);
                    }
                    s = c;
                }
            }
            bitOut.write(table.indexOf(s), bitLength);
            bitOut.write(endCode, bitLength);
            bitOut.flush();
            return byteOut.toByteArray();
        };
        var lzwTable = function() {
            var _map = {};
            var _size = 0;
            var _this = {};
            _this.add = function(key) {
                if (_this.contains(key)) throw new Error("dup key:" + key);
                _map[key] = _size;
                _size += 1;
            };
            _this.size = function() {
                return _size;
            };
            _this.indexOf = function(key) {
                return _map[key];
            };
            _this.contains = function(key) {
                return "undefined" != typeof _map[key];
            };
            return _this;
        };
        return _this;
    };
    var createImgTag = function(width, height, getPixel, alt) {
        var gif = gifImage(width, height);
        for (var y = 0; height > y; y += 1) for (var x = 0; width > x; x += 1) gif.setPixel(x, y, getPixel(x, y));
        var b = byteArrayOutputStream();
        gif.write(b);
        var base64 = base64EncodeOutputStream();
        var bytes = b.toByteArray();
        for (var i = 0; i < bytes.length; i += 1) base64.writeByte(bytes[i]);
        base64.flush();
        var img = "";
        img += "<img";
        img += ' src="';
        img += "data:image/gif;base64,";
        img += base64;
        img += '"';
        img += ' width="';
        img += width;
        img += '"';
        img += ' height="';
        img += height;
        img += '"';
        if (alt) {
            img += ' alt="';
            img += alt;
            img += '"';
        }
        img += "/>";
        return img;
    };
    return qrcode;
}();

exports.QRCode = function(global) {
    var K = function() {};
    var QRCode = function(options) {
        var self;
        self = this instanceof QRCode ? this : new K();
        options || (options = {});
        self.qr = qrcode(options.typeNumber || 4, options.errorCorrectLevel || "M");
        return self;
    };
    K.prototype = QRCode.prototype;
    QRCode.prototype.createQRCodeView = function(options) {
        var self = this;
        self.qr.addData(options.text);
        self.qr.make();
        options || (options = {});
        var width = options.width || null;
        var height = options.height || null;
        var margin = options.margin || 10;
        var cellSize;
        if (null === width && null === height) {
            cellSize = 2;
            options.margin || (margin = 4 * cellSize);
        } else width >= height ? cellSize = parseInt((width - 2 * margin) / self.qr.getModuleCount(), 10) : height > width && (cellSize = parseInt((height - 2 * margin) / self.qr.getModuleCount(), 10));
        var imgTag = self.qr.createImgTag(cellSize, margin);
        options.image = Ti.Utils.base64decode(imgTag.split(",")[1].split('"')[0]);
        if (null === width && null === height) {
            options.width = imgTag.match(/width=\"([0-9]+)\"/)[1];
            options.height = imgTag.match(/height=\"([0-9]+)\"/)[1];
        }
        options.image = Ti.Utils.base64decode(self.qr.createImgTag(cellSize, margin).split(",")[1].split('"')[0]);
        return Ti.UI.createImageView(options);
    };
    return QRCode;
}(this);