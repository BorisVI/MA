"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.prototype.getTrip = function (tripId) {
        return react_native_1.AsyncStorage.get(tripId).then(function (keyValue) {
            console.log(keyValue); //Display key value
        }, function (error) {
            console.log(error); //Display error
        });
    };
    LocalStorage.prototype.getAllTrips = function () {
        return react_native_1.AsyncStorage.getAllTrips().then(function (keyValue) {
            console.log(keyValue); //Display key value
        }, function (error) {
            console.log(error); //Display error
        });
    };
    LocalStorage.prototype.addTrip = function (trip) {
        react_native_1.AsyncStorage.setItem(trip.id, JSON.stringify(trip));
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
