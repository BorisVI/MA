"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("../node_modules/typescript-map");
var Trip = /** @class */ (function () {
    function Trip(tripId, name, startDate, endDate) {
        this._participants = new Array();
        this._expenses = new Array();
        this._currencies = new Array();
        this.tripId = tripId;
        this.tripName = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.standardCurrency = "EUR";
    }
    Trip.prototype.getExpensesFromPerson = function (personId) {
        var map = new typescript_map_1.TSMap();
        for (var _i = 0, _a = this.expenses; _i < _a.length; _i++) {
            var e = _a[_i];
            var toPay = 0;
            if (e.consumers != null) {
                toPay += e.consumers.get(personId);
            }
            var payed = 0;
            if (e.payers != null && e.payers.has(personId)) {
                payed += e.payers.get(personId);
            }
            var balance = payed - toPay;
            map.set(e.name, [toPay, payed, balance]);
        }
        return map;
    };
    Trip.prototype.getExpensesByCategory = function () {
        var map = new typescript_map_1.TSMap();
        for (var _i = 0, _a = this.expenses; _i < _a.length; _i++) {
            var e = _a[_i];
            if (map.has(e.expenseId)) {
                map.set(e.expenseId, 0);
            }
            map.set(e.expenseId, map.get(e.expenseId) + e.getTotalconsumers());
        }
        return map;
    };
    Trip.prototype.getExpensesSummary = function () {
        var _this = this;
        var map = new typescript_map_1.TSMap();
        var _loop_1 = function (i) {
            this_1.expenses[i].consumers.forEach(function (value, key) {
                var total;
                if (map.has(key)) {
                    total[0] = value[0];
                    total[1] = value[1];
                }
                total[0] += value;
                if (_this.expenses[i].payers.has(key)) {
                    total[1] += _this.expenses[i].payers.get(key);
                }
                map.set(key, total);
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.expenses.length; i++) {
            _loop_1(i);
        }
        return map;
    };
    Trip.prototype.getLargestExpenseId = function () {
        var highest = 0;
        for (var _i = 0, _a = this.expenses; _i < _a.length; _i++) {
            var expense = _a[_i];
            if (Number(expense.expenseId) > highest) {
                highest = Number(expense.expenseId);
            }
        }
        return String(highest + 1);
    };
    Trip.prototype.getLargestPersonId = function () {
        var highest = 0;
        for (var _i = 0, _a = this.participants; _i < _a.length; _i++) {
            var person = _a[_i];
            if (Number(person.personId) > highest) {
                highest = Number(person.personId);
            }
        }
        return String(highest + 1);
    };
    Trip.prototype.addExpense = function (expense) {
        this.expenses.push(expense);
    };
    Trip.prototype.addPerson = function (person) {
        this.participants.push(person);
    };
    Trip.prototype.addCurrency = function (currency) {
        this.currencies.push(currency);
    };
    Trip.prototype.removeExpense = function (id) {
        this.expenses.splice(this.expenses.findIndex(function (e) { return e.expenseId == id; }), 1);
    };
    Trip.prototype.removePerson = function (id) {
        this.participants.splice(this.participants.findIndex(function (p) { return p.personId == id; }), 1);
    };
    Trip.prototype.removeCurrency = function (id) {
        this.currencies.splice(this.currencies.findIndex(function (c) { return c == id; }), 1);
    };
    Object.defineProperty(Trip.prototype, "tripId", {
        get: function () {
            return this._tripId;
        },
        set: function (value) {
            this._tripId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "participants", {
        get: function () {
            return this._participants;
        },
        set: function (value) {
            this._participants = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "expenses", {
        get: function () {
            return this._expenses;
        },
        set: function (value) {
            this._expenses = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "currencies", {
        get: function () {
            return this._currencies;
        },
        set: function (value) {
            this._currencies = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "startDate", {
        get: function () {
            return this._startDate;
        },
        set: function (value) {
            this._startDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "endDate", {
        get: function () {
            return this._endDate;
        },
        set: function (value) {
            this._endDate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "tripName", {
        get: function () {
            return this._tripName;
        },
        set: function (value) {
            this._tripName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "standardCurrency", {
        get: function () {
            return this._standardCurrency;
        },
        set: function (value) {
            this._standardCurrency = value;
        },
        enumerable: true,
        configurable: true
    });
    Trip.prototype.equals = function (t) {
        return t.tripId == this.tripId;
    };
    return Trip;
}());
exports.Trip = Trip;
