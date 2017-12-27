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
var localStorage_1 = require("./localStorage");
var trip_1 = require("./trip");
var person_1 = require("./person");
var expense_1 = require("./expense");
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.getExpensesPerPerson = function (tripId, personId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tripPromise;
            return __generator(this, function (_a) {
                tripPromise = this.getTrip(tripId);
                return [2 /*return*/, tripPromise.then(function (trip) {
                        var t = _this.getNewTrip(trip);
                        return t.getExpensesFromPerson(personId);
                    })];
            });
        });
    };
    Service.getExpensesByCategory = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tripPromise;
            return __generator(this, function (_a) {
                tripPromise = this.getTrip(tripId);
                return [2 /*return*/, tripPromise.then(function (trip) {
                        var t = _this.getNewTrip(trip);
                        return t.getExpensesByCategory();
                    })];
            });
        });
    };
    Service.getExpensesSummary = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tripPromise;
            return __generator(this, function (_a) {
                tripPromise = this.getTrip(tripId);
                return [2 /*return*/, tripPromise.then(function (trip) {
                        var t = _this.getNewTrip(trip);
                        return t.getExpensesSummary();
                    })];
            });
        });
    };
    Service.addPersonToTrip = function (tripId, firstName, lastName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTrip(tripId).then(function (trip) {
                            var t = _this.getNewTrip(trip);
                            t.addPerson(new person_1.Person(t.getLargestPersonId(), firstName, lastName));
                            localStorage_1.LocalStorage.updateTrip(t);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.removePersonFromTrip = function (tripId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTrip(tripId).then(function (trip) {
                            var t = _this.getNewTrip(trip);
                            t.removePerson(id);
                            localStorage_1.LocalStorage.updateTrip(t);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.addExpenseToTrip = function (tripId, name, date) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTrip(tripId).then(function (trip) {
                            var t = _this.getNewTrip(trip);
                            t.addExpense(new expense_1.Expense(t.getLargestExpenseId(), name, date, t.standardCurrency));
                            localStorage_1.LocalStorage.updateTrip(t);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.removeExpenseFromTrip = function (tripId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTrip(tripId).then(function (trip) {
                            var t = _this.getNewTrip(trip);
                            t.removeCurrency(id);
                            localStorage_1.LocalStorage.updateTrip(t);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.addCurrencyToTrip = function (tripId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTrip(tripId).then(function (trip) {
                            var t = _this.getNewTrip(trip);
                            t.addCurrency(id);
                            localStorage_1.LocalStorage.updateTrip(t);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.removeCurrencyFromTrip = function (tripId, name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTrip(tripId).then(function (trip) {
                            var t = _this.getNewTrip(trip);
                            t.removeCurrency(name);
                            localStorage_1.LocalStorage.updateTrip(t);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.getTrip = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, localStorage_1.LocalStorage.getTrip(tripId).then(function (trip) {
                        return _this.getNewTrip(trip);
                    })];
            });
        });
    };
    Service.getAllTrips = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, localStorage_1.LocalStorage.getAllTrips()];
            });
        });
    };
    Service.addTrip = function (trip) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage_1.LocalStorage.addTrip(trip);
                return [2 /*return*/, this.getAllTrips()];
            });
        });
    };
    Service.removeTrip = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage_1.LocalStorage.removeTrip(tripId);
                return [2 /*return*/, this.getAllTrips()];
            });
        });
    };
    Service.updateTrip = function (trip) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage_1.LocalStorage.updateTrip(trip);
                return [2 /*return*/, this.getAllTrips()];
            });
        });
    };
    Service.clearDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage_1.LocalStorage.clearDb();
                return [2 /*return*/];
            });
        });
    };
    Service.getNewTrip = function (trip) {
        var t = new trip_1.Trip(trip.tripId, trip.tripName, trip.startDate, trip.endDate);
        for (var _i = 0, _a = trip.expenses; _i < _a.length; _i++) {
            var exp = _a[_i];
            t.addExpense(exp);
        }
        for (var _b = 0, _c = trip.currencies; _b < _c.length; _b++) {
            var cur = _c[_b];
            t.addCurrency(cur);
        }
        for (var _d = 0, _e = trip.participants; _d < _e.length; _d++) {
            var par = _e[_d];
            t.addPerson(par);
        }
        return t;
    };
    Service.deepEqual = function (a, b) {
        return JSON.stringify(a) == JSON.stringify(b);
    };
    return Service;
}());
exports.Service = Service;
