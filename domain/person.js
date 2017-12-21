var Person = /** @class */ (function () {
    function Person(firstname, name) {
        this._firstname = firstname;
        this._name = name;
    }
    Object.defineProperty(Person.prototype, "firstName", {
        get: function () {
            return this._firstname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
exports.Person = Person;
