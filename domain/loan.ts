import { Person } from "./person";

export class Loan{

    private _loanId: string;
    private _payed : boolean;
    private _amount: number;
    private _receiver: string;
    private _payer: string;

     constructor(id:string,receiver: string, payer: string, amount: number){
        this.loanId=id;
        this.payed=false;
        this.amount=amount;
        this.receiver = receiver;
        this.payer = payer;
     }

    public get loanId(): string {
		return this._loanId;
	}
	public set loanId(value: string) {
		this._loanId = value;
    }

    public get payed(): boolean {
		return this._payed;
	}
	public set payed(value: boolean) {
		this._payed = value;
	}

    public get amount(): number {
		return this._amount;
	}
	public set amount(value: number) {
		this._amount = value;
    }
    
    public get receiver(): string {
		return this._receiver;
	}
	public set receiver(value: string) {
		this._receiver = value;
    }

    public get payer(): string {
		return this._payer;
	}
	public set payer(value: string) {
		this._payer = value;
	}

}