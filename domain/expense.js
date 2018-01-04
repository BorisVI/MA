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
var typescript_map_1 = require("../node_modules/typescript-map");
var loan_1 = require("./loan");
var category_1 = require("./category");
var localStorage_1 = require("./localStorage");
var Expense = /** @class */ (function () {
    function Expense(id, name, date, currency) {
        this._loans = new Array();
        this._payers = new typescript_map_1.TSMap(); //betalers (person,aantal)
        this._consumers = new typescript_map_1.TSMap(); //Verbuikers (person,aantal)
        this._isFinalized = false;
        this.expenseId = id;
        this.name = name;
        this.date = date;
        this.category = category_1.Category.Misc;
        this.currency = currency;
        console.log("consturctor expense: " + currency);
        /*this.payers = payers;
        this.consumers = consumers;*/
    }
    Expense.prototype.equals = function (e) {
        return e.expenseId == this.expenseId;
    };
    Expense.prototype.payLoan = function (loanId) {
        var l = this.getLoanById(loanId);
        l.payed = true;
        if (this.payers.has(l.payer)) {
            this.payers.set(l.payer, Number(this.payers.get(l.payer)) + Number(l.amount));
        }
        else {
            this.payers.set(l.payer, Number(0) + Number(l.amount));
        }
        if (this.payers.has(l.receiver)) {
            this.payers.set(l.receiver, Number(this.payers.get(l.receiver)) - Number(l.amount));
        }
        else {
            this.payers.set(l.receiver, Number(0) - Number(l.amount));
        }
    };
    Expense.prototype.getLoanById = function (loanId) {
        for (var _i = 0, _a = this.loans; _i < _a.length; _i++) {
            var l = _a[_i];
            if (l.loanId == loanId) {
                return l;
            }
        }
        return null;
    };
    Expense.prototype.calculateLoans = function () {
        if (!this.isFinalized) {
            if (this.isValidAmounts()) {
                var mapOver = new typescript_map_1.TSMap();
                var mapUnder = new typescript_map_1.TSMap();
                var people_1 = new Array();
                this.consumers.forEach(function (value, key) {
                    if (people_1.indexOf(key) == -1) {
                        people_1.push(key);
                    }
                });
                this.payers.forEach(function (value, key) {
                    if (people_1.indexOf(key) == -1) {
                        people_1.push(key);
                    }
                });
                for (var _i = 0, people_2 = people_1; _i < people_2.length; _i++) {
                    var key = people_2[_i];
                    var amount = 0;
                    if (this.consumers.has(key)) {
                        amount = Number(amount) - Number(this.consumers.get(key));
                    }
                    if (this.payers.has(key)) {
                        amount = Number(amount) + Number(this.payers.get(key));
                    }
                    if (amount >= 0) {
                        mapOver.set(key, amount);
                    }
                    else {
                        mapUnder.set(key, amount);
                    }
                }
                //console.log(mapOver);
                //console.log(mapUnder);
                while (this.getTotalMap(mapUnder) != 0) {
                    var topay = 0;
                    var canreceive = 0;
                    var amount = 0;
                    var payer = "";
                    var receiver = "";
                    var found = false;
                    mapUnder.forEach(function (value, key) {
                        if (value != 0 && !found) {
                            topay = value;
                            payer = key;
                            found = true;
                        }
                    });
                    found = false;
                    mapOver.forEach(function (value, key) {
                        if (value != 0 && !found) {
                            canreceive = value;
                            receiver = key;
                            found = true;
                        }
                    });
                    topay = Math.abs(topay);
                    canreceive = Math.abs(canreceive);
                    if (topay <= canreceive) {
                        amount = topay;
                    }
                    else {
                        amount = canreceive;
                    }
                    console.log(payer + " pays " + amount + " to " + receiver + ".");
                    var l = new loan_1.Loan(this.getNewLoanId(), receiver, payer, amount);
                    this.loans.push(l);
                    mapUnder.set(payer, mapUnder.get(payer) + amount);
                    mapOver.set(receiver, mapOver.get(receiver) - amount);
                    this.isFinalized = true;
                }
                console.log(this.loans.length);
            }
            else {
                console.log("error on creating loans, unequal amount payers/receivers");
            }
        }
        else {
            console.log("expense is already finalized.");
        }
    };
    Expense.prototype.getTotalMap = function (map) {
        var sum = 0;
        map.forEach(function (value, key) {
            sum = sum + (Number(value));
        });
        return sum;
    };
    Expense.prototype.getNewLoanId = function () {
        var highest = 0;
        for (var _i = 0, _a = this.loans; _i < _a.length; _i++) {
            var l = _a[_i];
            if (Number(l.loanId) > highest) {
                highest = Number(l.loanId);
            }
        }
        return String(Number(highest) + 1);
    };
    Expense.prototype.getTotal = function () {
        if (this.isValidAmounts()) {
            return this.getTotalPayers();
        }
        else {
            return false;
        }
    };
    Expense.prototype.isValidAmounts = function () {
        //console.log("calculating totals");
        return this.getTotalPayers() == this.getTotalConsumers();
    };
    Expense.prototype.getTotalPayers = function () {
        var sum = 0;
        this.payers.forEach(function (value, key) {
            sum = Number(sum) + Number(value);
        });
        //console.log("total payers: " + sum);
        return sum;
    };
    Expense.prototype.getTotalConsumers = function () {
        var sum = 0;
        this.consumers.forEach(function (value, key) {
            sum = Number(sum) + Number(value);
        });
        //console.log("total consumers: " + sum);
        return sum;
    };
    Expense.prototype.convertAll = function (oldCurrency, newCurrency) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var toEuro, fromEuro;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toEuro = 0;
                        fromEuro = 0;
                        console.log(oldCurrency);
                        console.log(newCurrency);
                        return [4 /*yield*/, localStorage_1.LocalStorage.getAllCurrenciesAndValues().then(function (list) {
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i][0] == oldCurrency) {
                                        toEuro = list[i][1];
                                        console.log(list[i][0] + " " + list[i][1]);
                                    }
                                    if (list[i][0] == newCurrency) {
                                        fromEuro = list[i][1];
                                    }
                                }
                            })];
                    case 1:
                        _a.sent();
                        console.log("to euro " + toEuro);
                        console.log("from euro " + fromEuro);
                        this.payers.forEach(function (value, key) {
                            value = value / toEuro;
                            value = value * fromEuro;
                            _this.payers.set(key, value);
                        });
                        this.consumers.forEach(function (value, key) {
                            value = value / toEuro;
                            value = value * fromEuro;
                            _this.consumers.set(key, value);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Expense.prototype, "expenseId", {
        get: function () {
            return this._expenseId;
        },
        set: function (value) {
            this._expenseId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expense.prototype, "loans", {
        get: function () {
            return this._loans;
        },
        set: function (value) {
            this._loans = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expense.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (value) {
            this._date = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expense.prototype, "payers", {
        get: function () {
            return this._payers;
        },
        set: function (value) {
            this._payers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expense.prototype, "consumers", {
        get: function () {
            return this._consumers;
        },
        set: function (value) {
            this._consumers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expense.prototype, "category", {
        get: function () {
            return this._category;
        },
        set: function (value) {
            this._category = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expense.prototype, "currency", {
        get: function () {
            return this._currency;
        },
        set: function (value) {
            this._currency = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expense.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Expense.prototype, "isFinalized", {
        get: function () {
            return this._isFinalized;
        },
        set: function (value) {
            this._isFinalized = value;
        },
        enumerable: true,
        configurable: true
    });
    return Expense;
}());
exports.Expense = Expense;
