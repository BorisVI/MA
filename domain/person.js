"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person(id, firstName, lastName) {
        this.personId = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Object.defineProperty(Person.prototype, "personId", {
        get: function () {
            return this._personId;
        },
        set: function (value) {
            this._personId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "lastName", {
        get: function () {
            return this._lastName;
        },
        set: function (value) {
            this._lastName = value;
        },
        enumerable: true,
        configurable: true
    });
    Person.prototype.equals = function (p) {
        return p.personId == this.personId;
    };
    return Person;
}());
exports.Person = Person;
