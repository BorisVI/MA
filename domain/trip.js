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
    Trip.prototype.getPersonInfo = function (personId) {
        var person = this.getPersonFromId(personId);
        return [personId, person.firstName, person.lastName];
    };
    Trip.prototype.getPersonFromId = function (personId) {
        for (var _i = 0, _a = this.participants; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.personId == personId) {
                return p;
            }
        }
        return null;
    };
    Trip.prototype.getExpensesFromPerson = function (personId) {
        var map = new typescript_map_1.TSMap();
        for (var _i = 0, _a = this.expenses; _i < _a.length; _i++) {
            var e = _a[_i];
            var toPay = 0;
            if (e.consumers != null && e.consumers.has(personId)) {
                toPay = Number(e.consumers.get(personId));
            }
            var payed = 0;
            if (e.payers != null && e.payers.has(personId)) {
                payed = Number(e.payers.get(personId));
            }
            if (!(payed == 0 && toPay == 0)) {
                var balance = payed - toPay;
                map.set(e.name, [toPay, payed, balance]);
            }
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
            map.set(e.expenseId, map.get(e.expenseId) + e.getTotalConsumers());
        }
        return map;
    };
    Trip.prototype.getExpensesSummary = function () {
        var _this = this;
        var consumersMap = new typescript_map_1.TSMap();
        var payersMap = new typescript_map_1.TSMap();
        for (var _i = 0, _a = this.expenses; _i < _a.length; _i++) {
            var e = _a[_i];
            e.consumers.forEach(function (value, key) {
                var amount = 0;
                if (consumersMap.has(key)) {
                    amount = Number(consumersMap.get(key));
                }
                amount = Number(amount) + Number(value);
                consumersMap.set(key, amount);
            });
            e.payers.forEach(function (value, key) {
                var amount = 0;
                if (payersMap.has(key)) {
                    amount = Number(payersMap.get(key));
                }
                amount = Number(amount) + Number(value);
                payersMap.set(key, amount);
            });
        }
        var map = new typescript_map_1.TSMap();
        consumersMap.forEach(function (value, key) {
            var amounts = new Array(0, 0);
            if (map.has(key)) {
                amounts = Array(Number(map.get(key)[0]), Number(map.get(key)[1]));
            }
            amounts[0] += Number(value);
            amounts[2] = Number(amounts[1]) - Number(amounts[0]);
            map.set(key, amounts);
        });
        payersMap.forEach(function (value, key) {
            var amounts = new Array(0, 0);
            if (map.has(key)) {
                amounts = Array(Number(map.get(key)[0]), Number(map.get(key)[1]));
            }
            amounts[1] += Number(value);
            amounts[2] = Number(amounts[1]) - Number(amounts[0]);
            map.set(key, amounts);
        });
        var result = new typescript_map_1.TSMap();
        map.forEach(function (value, key) {
            result.set(_this.getPersonInfo(key), value);
        });
        return result;
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
    Trip.prototype.getExpenseById = function (expenseId) {
        for (var _i = 0, _a = this.expenses; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.expenseId == expenseId) {
                return e;
            }
        }
        return null;
    };
    Trip.prototype.editExpense = function (expense) {
        this.removeExpense(expense.expenseId);
        this.addExpense(expense);
    };
    Trip.prototype.addExpense = function (expense) {
        this.expenses.push(expense);
    };
    Trip.prototype.addPerson = function (person) {
        var canDo = true;
        for (var i = 0; i < this.participants.length; i++) {
            if (this.participants[i].firstName == person.firstName && this.participants[i].lastName == person.lastName) {
                canDo = false;
            }
        }
        if (canDo) {
            this.participants.push(person);
        }
        return canDo;
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
