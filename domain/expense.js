"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var category_1 = require("./category");
var Expense = /** @class */ (function () {
    function Expense(id, name, date, currency) {
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
    /*
    CalculateLoans(){
        if(this.isValidAmounts){
            let mapOver = new TSMap<Person,number>();
            let mapUnder = new TSMap<Person,number>();
            this._consumers.forEach((value: number, key: Person) =>{
                var amount = 0;
                if(this._payers.has(key)){
                    amount = this._payers.get(key) - value;
                }
                if(amount>0){
                    mapOver.set(key, amount);
                }else{
                    mapUnder.set(key, 0 - amount);
                }
            });
            while(this.getTotalPayers() != 0){
                var topay = 0;
                var canreceive = 0;
                var amount = 0;
                var payer = new Person("","","");
                var receiver = new Person("","","");
                var found = false;
                mapUnder.forEach((value: number, key: Person) =>{
                    if(value != 0 && !found){
                        topay = value;
                        payer = key;
                        found = true;
                    }
                });
                found = false;
                mapOver.forEach((value: number, key: Person) =>{
                    if(value != 0 && !found){
                        canreceive = value;
                        receiver = key;
                        found = true;
                    }
                });
                topay = Math.abs(topay);
                canreceive = Math.abs(canreceive);
                if(topay <= canreceive){
                    amount = topay;
                }else{
                    amount = canreceive;
                }
                this._loans.push(new Loan(receiver,payer,amount));
                mapUnder.set(payer, mapUnder.get(payer) + amount);
                mapOver.set(receiver, mapOver.get(receiver) - amount);
            }
        }else{
            console.log("error on creating loans, unequal amount payers/receivers");
        }

    }
    */
    Expense.prototype.getTotal = function () {
        if (this.isValidAmounts) {
            return this.getTotalPayers;
        }
        else {
            return false;
        }
    };
    Expense.prototype.isValidAmounts = function () {
        return this.getTotalPayers == this.getTotalconsumers;
    };
    Expense.prototype.getTotalPayers = function () {
        var sum = 0;
        this._payers.forEach(function (value, key) {
            sum += value;
        });
        return sum;
    };
    Expense.prototype.getTotalconsumers = function () {
        var sum = 0;
        this._consumers.forEach(function (value, key) {
            sum += value;
        });
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
    return Expense;
}());
exports.Expense = Expense;
