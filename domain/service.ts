import { LocalStorage } from "./localStorage";
import { Trip } from "./trip";

import { AsyncStorage } from 'react-native';

class Service {

    private _storage : LocalStorage;

	getTrip(tripId: string): Trip{
        return this._storage.getTrip(tripId);
    }

    public get storage(): LocalStorage {
		return this._storage;
	}

	public set storage(value: LocalStorage) {
		this._storage = value;
	}
    
}
