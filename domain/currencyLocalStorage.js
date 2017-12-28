"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var CurrencyLocalStorage = /** @class */ (function () {
    function CurrencyLocalStorage() {
    }
    CurrencyLocalStorage.getAddableCurrencies = function () {
        var _this = this;
        var current = this.getCurrentCurrencies().then(function (list) {
            var result = Array();
            for (var i = 0; i < list.length; i++) {
                result.push(list[i][0]);
            }
            var all = _this.getAllCurrenciesPossible();
            all.filter(function (x) { return result.indexOf(x) < 0; });
            return all;
        });
        return current;
    };
    CurrencyLocalStorage.getCurrency = function (currencyTag) {
        return __awaiter(this, void 0, void 0, function () {
            var trip;
            return __generator(this, function (_a) {
                trip = react_native_1.AsyncStorage.getItem(currencyTag).then(function (json) {
                    return JSON.parse(json);
                });
                return [2 /*return*/, trip];
            });
        });
    };
    CurrencyLocalStorage.useCurrency = function (currencyTag) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getCurrentCurrencies().then(function (list) {
                    list.push([currencyTag, false]);
                });
                return [2 /*return*/];
            });
        });
    };
    CurrencyLocalStorage.getAllCurrenciesPossible = function () {
        var list = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"];
        return list;
    };
    CurrencyLocalStorage.getCurrentCurrencies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                list = react_native_1.AsyncStorage.getItem("activeCurrencies").then(function (json) {
                    return JSON.parse(json);
                });
                return [2 /*return*/, list];
            });
        });
    };
    CurrencyLocalStorage.setCurrentCurrencies = function (list) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                react_native_1.AsyncStorage.setItem("activeCurrencies", JSON.stringify(list));
                return [2 /*return*/];
            });
        });
    };
    CurrencyLocalStorage.overwriteCurrency = function (currencyTag, euroToCurrency) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.getCurrentCurrencies().then(function (list) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i][0] == currencyTag) {
                            list[i][1] = true;
                            _this.setCurrentCurrencies(list);
                            //ook nog waarde overwriten in andere lijst
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    CurrencyLocalStorage.removeCurrency = function (currencyTag) {
        var _this = this;
        this.getCurrentCurrencies().then(function (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i][0] == currencyTag) {
                    list.splice(i, 1);
                    _this.setCurrentCurrencies(list);
                    return list;
                }
            }
        });
    };
    CurrencyLocalStorage.updateCurrencyValue = function (trip, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CurrencyLocalStorage.clearDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                react_native_1.AsyncStorage.getAllKeys().then(function (keys) {
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var id = keys_1[_i];
                        console.log('cleared trip with id ' + id);
                        _this.removeCurrency(id);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return CurrencyLocalStorage;
}());
exports.CurrencyLocalStorage = CurrencyLocalStorage;
