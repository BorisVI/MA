"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("../node_modules/typescript-map");
var loan_1 = require("./loan");
var category_1 = require("./category");
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
        /*this.payers = payers;
        this.consumers = consumers;*/
    }
    Expense.prototype.equals = function (e) {
        return e.expenseId == this.expenseId;
    };
    Expense.prototype.calculateLoans = function () {
        var _this = this;
        if (!this.isFinalized) {
            if (this.isValidAmounts()) {
                var mapOver_1 = new typescript_map_1.TSMap();
                var mapUnder_1 = new typescript_map_1.TSMap();
                this.consumers.forEach(function (value, key) {
                    var amount = 0 - value;
                    if (_this.payers.has(key)) {
                        amount = _this.payers.get(key) - value;
                    }
                    if (amount >= 0) {
                        mapOver_1.set(key, amount);
                    }
                    else {
                        mapUnder_1.set(key, amount);
                    }
                });
                while (this.getTotalMap(mapUnder_1) != 0) {
                    var topay = 0;
                    var canreceive = 0;
                    var amount = 0;
                    var payer = "";
                    var receiver = "";
                    var found = false;
                    mapUnder_1.forEach(function (value, key) {
                        if (value != 0 && !found) {
                            topay = value;
                            payer = key;
                            found = true;
                        }
                    });
                    found = false;
                    mapOver_1.forEach(function (value, key) {
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
                    this.loans.push(new loan_1.Loan(this.getNewLoanId(), receiver, payer, amount));
                    mapUnder_1.set(payer, mapUnder_1.get(payer) + amount);
                    mapOver_1.set(receiver, mapOver_1.get(receiver) - amount);
                    this.isFinalized = true;
                }
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
