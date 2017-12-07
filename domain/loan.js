var Loan = /** @class */ (function () {
    function Loan(amount) {
        this._payed = false;
        this._amount = amount;
    }
    Object.defineProperty(Loan.prototype, "receiver", {
        get: function () {
            return this._receiver;
        },
        set: function (person) {
            this._receiver = person;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Loan.prototype, "payer", {
        get: function () {
            return this._payer;
        },
        set: function (person) {
            this._payer = person;
        },
        enumerable: true,
        configurable: true
    });
    return Loan;
}());
