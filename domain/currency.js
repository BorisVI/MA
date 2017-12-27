"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Currency = /** @class */ (function () {
    function Currency(tag, name) {
        this._currencyId = tag;
        this._name = name;
        // this.update();
    }
    Currency.prototype.update = function () {
        /*const json = 'https://api.fixer.io/latest?base='+ this._name;
        let jsonobj = JSON.parse(json);
        for(let entry in jsonobj.rates){
            console.log(entry);
            //TODO correctly read json, requires testing
        }*/
    };
    Object.defineProperty(Currency.prototype, "rateToCurrencies", {
        get: function () {
            return this._rateToCurrencies;
        },
        set: function (value) {
            this._rateToCurrencies = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Currency.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Currency.prototype, "currencyId", {
        get: function () {
            return this._currencyId;
        },
        set: function (value) {
            this._currencyId = value;
        },
        enumerable: true,
        configurable: true
    });
    Currency.prototype.equals = function (c) {
        return c.currencyId == this.currencyId;
    };
    return Currency;
}());
exports.Currency = Currency;
