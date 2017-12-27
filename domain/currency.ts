
import { TSMap } from "../node_modules/typescript-map";
import * as express from "express";
import {Server, Path, GET, PathParam} from "typescript-rest";
export class Currency{

    private _currencyId : string;
    private _name : string;
    private _rateToCurrencies : TSMap<string,number>;
    constructor(tag:string,name: string){
        this._currencyId=tag;
        this._name = name;
       // this.update();

    }

    update(){
        /*const json = 'https://api.fixer.io/latest?base='+ this._name;
        let jsonobj = JSON.parse(json);
        for(let entry in jsonobj.rates){
            console.log(entry);
            //TODO correctly read json, requires testing
        }*/
    }
    public get rateToCurrencies(): TSMap<string,number> {
		return this._rateToCurrencies;
	}
	public set rateToCurrencies(value: TSMap<string,number>) {
		this._rateToCurrencies = value;
    }
    
    public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
    }
    
    public get currencyId(): string {
		return this._currencyId;
	}
	public set currencyId(value: string) {
		this._currencyId = value;
	}

     equals(c : Currency): boolean{
         return c.currencyId == this.currencyId; 
     }

}