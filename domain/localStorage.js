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
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.getAllTrips = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getAllTripKeys()
                        .then(function (keys) {
                        return react_native_1.AsyncStorage.multiGet(keys);
                    })
                        .then(function (result) {
                        return result.map(function (r) { return JSON.parse(r[1]); });
                    })];
            });
        });
    };
    LocalStorage.getTrip = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var trip;
            return __generator(this, function (_a) {
                trip = react_native_1.AsyncStorage.getItem('trip_' + tripId).then(function (json) {
                    return JSON.parse(json);
                });
                return [2 /*return*/, trip];
            });
        });
    };
    LocalStorage.addTrip = function (trip) {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = 'trip_' + trip.tripId;
                console.log('add trip with key: ' + key);
                react_native_1.AsyncStorage.setItem(key, JSON.stringify(trip).replace(/"_/g, "\""));
                return [2 /*return*/];
            });
        });
    };
    LocalStorage.removeTrip = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                react_native_1.AsyncStorage.removeItem('trip_' + tripId);
                return [2 /*return*/];
            });
        });
    };
    LocalStorage.updateTrip = function (trip) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.addTrip(trip);
                return [2 /*return*/];
            });
        });
    };
    LocalStorage.getAllTripKeys = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, react_native_1.AsyncStorage.getAllKeys()
                        .then(function (keys) {
                        return react_native_1.AsyncStorage.multiGet(keys);
                    })
                        .then(function (result) {
                        return result.map(function (r, i, store) {
                            var key = store[i][0];
                            if (key.startsWith('trip_')) {
                                return store[i][0];
                            }
                        });
                    })];
            });
        });
    };
    LocalStorage.clearTripDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getAllTripKeys().then(function (keys) {
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var id = keys_1[_i];
                        react_native_1.AsyncStorage.removeItem(id);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    LocalStorage.clearDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                react_native_1.AsyncStorage.getAllKeys().then(function (keys) {
                    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                        var id = keys_2[_i];
                        react_native_1.AsyncStorage.removeItem(id);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
