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
var typescript_map_1 = require("../node_modules/typescript-map");
var trip_1 = require("./trip");
var person_1 = require("./person");
var expense_1 = require("./expense");
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.getConsumersFromExpense = function (tripId, expenseId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getTrip(tripId).then(function (trip) {
                        var t = _this.getNewTrip(trip);
                        return t.getExpenseById(expenseId).consumers;
                    })];
            });
        });
    };
    Service.getPayersFromExpense = function (tripId, expenseId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getTrip(tripId).then(function (trip) {
                        var t = _this.getNewTrip(trip);
                        return t.getExpenseById(expenseId).payers;
                    })];
            });
        });
    };
    Service.getExpenseById = function (tripId, expenseId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getTrip(tripId).then(function (trip) {
                        var t = _this.getNewTrip(trip);
                        return t.getExpenseById(expenseId);
                    })];
            });
        });
    };
    Service.editExpenseFromTrip = function (tripId, expenseId, name, date, currency, category) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var expense;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expense = new expense_1.Expense(expenseId, name, date, currency);
                        expense.category = category;
                        return [4 /*yield*/, this.getTrip(tripId).then(function (trip) {
                                var t = _this.getNewTrip(trip);
                                t.editExpense(expense);
                                localStorage_1.LocalStorage.updateTrip(t);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.addConsumersToExpense = function (tripId, expenseId, consumers) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTrip(tripId).then(function (trip) {
                            var t = _this.getNewTrip(trip);
                            t.getExpenseById(expenseId).consumers = consumers;
                            _this.updateTrip(t);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.addPayersToExpense = function (tripId, expenseId, payers) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTrip(tripId).then(function (trip) {
                            var t = _this.getNewTrip(trip);
                            t.getExpenseById(expenseId).payers = payers;
                            _this.updateTrip(t);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Service.getExpensesPerPerson = function (tripId, personId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getTrip(tripId).then(function (trip) {
                        var t = _this.getNewTrip(trip);
                        return t.getExpensesFromPerson(personId);
                    })];
            });
        });
    };
    Service.getExpensesByCategory = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getTrip(tripId).then(function (trip) {
                        var t = _this.getNewTrip(trip);
                        return t.getExpensesByCategory();
                    })];
            });
        });
    };
    Service.getExpensesSummary = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getTrip(tripId).then(function (trip) {
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
                            var valid = t.addPerson(new person_1.Person(t.getLargestPersonId(), firstName, lastName));
                            _this.updateTrip(t);
                            return valid;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
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
                            _this.updateTrip(t);
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
                            _this.updateTrip(t);
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
                            _this.updateTrip(t);
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
                            _this.updateTrip(t);
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
                            _this.updateTrip(t);
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
                return [2 /*return*/, localStorage_1.LocalStorage.addTrip(trip)];
            });
        });
    };
    Service.removeTrip = function (tripId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, localStorage_1.LocalStorage.removeTrip(tripId)];
            });
        });
    };
    Service.updateTrip = function (trip) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, localStorage_1.LocalStorage.updateTrip(trip)];
            });
        });
    };
    Service.getAllCurrencyTypes = function () {
        return localStorage_1.LocalStorage.getAllCurrenciesPossible();
    };
    Service.overWriteCurrency = function (currencyTag, value) {
        return localStorage_1.LocalStorage.overwriteCurrency(currencyTag, value);
    };
    Service.getCurrencyValue = function (currencyTag) {
        return localStorage_1.LocalStorage.getCurrencyValue(currencyTag);
    };
    Service.convertAmountFromEuroTo = function (currencyTag, amount) {
        return this.getCurrencyValue(currencyTag).then(function (value) {
            return amount * value[1];
        });
    };
    Service.converAmoountToEuroFrom = function (currencyTag, amount) {
        return this.getCurrencyValue(currencyTag).then(function (value) {
            return amount / value[1];
        });
    };
    Service.clearTripDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                localStorage_1.LocalStorage.clearTripDb();
                return [2 /*return*/];
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
        var test = trip instanceof trip_1.Trip;
        if (test) {
            return trip;
        }
        else {
            var t = new trip_1.Trip(trip.tripId, trip.tripName, trip.startDate, trip.endDate);
            for (var _i = 0, _a = trip.expenses; _i < _a.length; _i++) {
                var exp = _a[_i];
                var expense = new expense_1.Expense(exp.expenseId, exp.name, exp.date, exp.currency);
                expense.category = exp.category;
                var consumers = new typescript_map_1.TSMap();
                var payers = new typescript_map_1.TSMap();
                if (exp.consumers != null) {
                    console.log('expenses not null');
                    for (var _b = 0, _c = Object.keys(exp.consumers); _b < _c.length; _b++) {
                        var k = _c[_b];
                        consumers.set(k, exp.consumers[k]);
                    }
                }
                if (exp.payers != null) {
                    console.log('payers not null');
                    for (var _d = 0, _e = Object.keys(exp.payers); _d < _e.length; _d++) {
                        var k = _e[_d];
                        payers.set(k, exp.payers[k]);
                    }
                }
                expense.consumers = consumers;
                expense.payers = payers;
                t.addExpense(expense);
            }
            for (var _f = 0, _g = trip.currencies; _f < _g.length; _f++) {
                var cur = _g[_f];
                t.addCurrency(cur);
            }
            for (var _h = 0, _j = trip.participants; _h < _j.length; _h++) {
                var par = _j[_h];
                var person = new person_1.Person(par.personId, par.firstName, par.lastName);
                t.addPerson(person);
            }
            return t;
        }
    };
    Service.deepEqual = function (a, b) {
        return JSON.stringify(a) == JSON.stringify(b);
    };
    return Service;
}());
exports.Service = Service;
