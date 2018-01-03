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
