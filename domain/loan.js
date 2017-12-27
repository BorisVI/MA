"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Loan = /** @class */ (function () {
    function Loan(id, receiver, payer, amount) {
        this.loanId = id;
        this.payed = false;
        this.amount = amount;
        this.receiver = receiver;
        this.payer = payer;
    }
    Object.defineProperty(Loan.prototype, "loanId", {
        get: function () {
            return this._loanId;
        },
        set: function (value) {
            this._loanId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loan.prototype, "payed", {
        get: function () {
            return this._payed;
        },
        set: function (value) {
            this._payed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loan.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        set: function (value) {
            this._amount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loan.prototype, "receiver", {
        get: function () {
            return this._receiver;
        },
        set: function (value) {
            this._receiver = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loan.prototype, "payer", {
        get: function () {
            return this._payer;
        },
        set: function (value) {
            this._payer = value;
        },
        enumerable: true,
        configurable: true
    });
    return Loan;
}());
exports.Loan = Loan;
