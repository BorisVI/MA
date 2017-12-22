"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.getTrip = function (tripId) {
        return this._storage.getTrip(tripId);
    };
    Object.defineProperty(Service.prototype, "storage", {
        get: function () {
            return this._storage;
        },
        set: function (value) {
            this._storage = value;
        },
        enumerable: true,
        configurable: true
    });
    return Service;
}());
