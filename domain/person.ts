export class Person {

	private _personId: string;
	private _lastName : string;
	private _firstName : string;

	constructor(id:string,firstName: string, lastName: string){
		this.personId=id;
		this.firstName =firstName;
		this.lastName=lastName;
	}

	public get personId(): string {
		return this._personId;
	}
	public set personId(value: string) {
		this._personId = value;
	}

	public get firstName(): string {
		return this._firstName;
	}
	public set firstName(value: string) {
		this._firstName = value;
	}

	public get lastName(): string {
		return this._lastName;
	}
	public set lastName(value: string) {
		this._lastName = value;
	}

	equals(p: Person): boolean{
		return p.personId==this.personId;
	}
}
