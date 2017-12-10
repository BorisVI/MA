"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("../node_modules/typescript-map");
var expense = /** @class */ (function () {
    function expense(name, date, loans, payers, participants, category, Currency) {
        this._name = name;
        this._date = date;
        this._loans = loans;
        this._payers = payers;
        this._participants = participants;
        this._category = category;
        this._currency = Currency;
        this.CalculateLoans();
    }
    expense.prototype.CalculateLoans = function () {
        var _this = this;
        if (this.isValidAmounts) {
            var mapOver_1 = new typescript_map_1.TSMap();
            var mapUnder_1 = new typescript_map_1.TSMap();
            this._participants.forEach(function (value, key) {
                var amount = 0;
                if (_this._payers.has(key)) {
                    amount = _this._payers.get(key) - value;
                }
                if (amount > 0) {
                    mapOver_1.set(key, amount);
                }
                else {
                    mapUnder_1.set(key, 0 - amount);
                }
            });
            while (this.getTotalPayers() != 0) {
                var topay = 0;
                var canreceive = 0;
                var amount = 0;
                var payer = new Person("", "");
                var receiver = new Person("", "");
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
                this._loans.push(new Loan(receiver, payer, amount));
                mapUnder_1.set(payer, mapUnder_1.get(payer) + amount);
                mapOver_1.set(receiver, mapOver_1.get(receiver) - amount);
            }
        }
        else {
            console.log("error on creating loans, unequal amount payers/receivers");
        }
    };
    expense.prototype.getTotal = function () {
        if (this.isValidAmounts) {
            return this.getTotalPayers;
        }
        else {
            return false;
        }
    };
    expense.prototype.isValidAmounts = function () {
        return this.getTotalPayers == this.getTotalParticipants;
    };
    expense.prototype.getTotalPayers = function () {
        var sum = 0;
        this._payers.forEach(function (value, key) {
            sum += value;
        });
        return sum;
    };
    expense.prototype.getTotalParticipants = function () {
        var sum = 0;
        this._participants.forEach(function (value, key) {
            sum += value;
        });
        return sum;
    };
    Object.defineProperty(expense.prototype, "loans", {
        get: function () {
            return this._loans;
        },
        set: function (value) {
            this._loans = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(expense.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (value) {
            this._date = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(expense.prototype, "payers", {
        get: function () {
            return this._payers;
        },
        set: function (value) {
            this._payers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(expense.prototype, "participants", {
        get: function () {
            return this._participants;
        },
        set: function (value) {
            this._participants = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(expense.prototype, "category", {
        get: function () {
            return this._category;
        },
        set: function (value) {
            this._category = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(expense.prototype, "currency", {
        get: function () {
            return this._currency;
        },
        set: function (value) {
            this._currency = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(expense.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    return expense;
}());
