"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Trip = /** @class */ (function () {
    function Trip(id, name, startDate, endDate) {
        this._id = id;
        this._name = name;
        this._startdate = startDate;
        this._enddate = endDate;
    }
    Trip.prototype.addExpense = function (expense) {
        this._expenses.push(expense);
    };
    Trip.prototype.addPerson = function (person) {
        this._participants.push(person);
    };
    Trip.prototype.addCurrency = function (currency) {
        this._currencies.push(currency);
    };
    Trip.prototype.removeExpense = function (expense) {
        this._expenses.splice(this._expenses.indexOf(expense), 1);
    };
    Trip.prototype.removePerson = function (person) {
        this._participants.splice(this.participants.indexOf(person), 1);
    };
    Trip.prototype.removeCurrency = function (currency) {
        this.currencies.splice(this._currencies.indexOf(currency), 1);
    };
    Object.defineProperty(Trip.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
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
    Object.defineProperty(Trip.prototype, "startdate", {
        get: function () {
            return this._startdate;
        },
        set: function (value) {
            this._startdate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "enddate", {
        get: function () {
            return this._enddate;
        },
        set: function (value) {
            this._enddate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Trip.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    return Trip;
}());
exports.Trip = Trip;