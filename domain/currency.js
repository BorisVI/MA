"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Currency = /** @class */ (function () {
    function Currency(name) {
        this.name = name;
        this.update();
    }
    Currency.prototype.update = function () {
        var json = 'https://api.fixer.io/latest?base=' + this._name;
        var jsonobj = JSON.parse(json);
        for (var entry in jsonobj.rates) {
            console.log(entry);
            //TODO correctly read json, requires testing
        }
    };
    Object.defineProperty(Currency.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Currency.prototype, "rateToCurrecies", {
        set: function (rateToCurrecies) {
            this._rateToCurrencies = rateToCurrecies;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Currency.prototype, "rateToCurrencies", {
        get: function () {
            return this._rateToCurrencies;
        },
        enumerable: true,
        configurable: true
    });
    Currency.prototype.equals = function (c) {
        return c.name == this._name;
    };
    return Currency;
}());
exports.Currency = Currency;
