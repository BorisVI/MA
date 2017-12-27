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
    }
    Trip.prototype.getExpensesSummary = function () {
        var _this = this;
        var map = new typescript_map_1.TSMap();
        var _loop_1 = function (i) {
            this_1._expenses[i].consumers.forEach(function (value, key) {
                var total;
                if (map.has(key)) {
                    total[0] = value[0];
                    total[1] = value[1];
                }
                total[0] += value;
                if (_this._expenses[i].payers.has(key)) {
                    total[1] += _this._expenses[i].payers.get(key);
                }
                map.set(key, total);
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._expenses.length; i++) {
            _loop_1(i);
        }
        return map;
    };
    Trip.prototype.addExpense = function (expense) {
        this._expenses.push(expense);
    };
    Trip.prototype.addPerson = function (person) {
        //console.log(person);
        this._participants.push(person);
    };
    Trip.prototype.addCurrency = function (currency) {
        this._currencies.push(currency);
    };
    Trip.prototype.removeExpense = function (expense) {
        if (this.getIndexExpense(expense) != -1) {
            this._expenses.splice(this.getIndexExpense(expense), 1);
        }
    };
    Trip.prototype.removePerson = function (person) {
        if (this.getIndexPerson(person) != -1) {
            this._participants.splice(this.getIndexPerson(person), 1);
        }
    };
    Trip.prototype.removeCurrency = function (currency) {
        if (this.getIndexCurrency(currency) != -1) {
            this._currencies.splice(this.getIndexCurrency(currency), 1);
        }
    };
    Trip.prototype.getIndexExpense = function (e) {
        var index = -1;
        for (var i = 0; i < this._expenses.length; i++) {
            if (this._expenses[i].equals(e)) {
                index = i;
            }
        }
        return index;
    };
    Trip.prototype.getIndexCurrency = function (c) {
        var index = -1;
        for (var i = 0; i < this._currencies.length; i++) {
            if (this._currencies[i].equals(c)) {
                index = i;
            }
        }
        return index;
    };
    Trip.prototype.getIndexPerson = function (p) {
        var index = -1;
        for (var i = 0; i < this._participants.length; i++) {
            if (this._participants[i].equals(p)) {
                index = i;
            }
        }
        return index;
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
    return Trip;
}());
exports.Trip = Trip;
