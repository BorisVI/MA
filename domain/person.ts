export class Person {
	private _firstname : string;
	private _name : string;
	constructor(firstname: string, name: string){
		this._firstname =firstname;
		this._name=name;
	}

	get firstName(): string{
		return this._firstname;
	}

	get name(): string{
		return this._name;
	}
}
