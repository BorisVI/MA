import { Currency } from "./currency";
import { AsyncStorage } from 'react-native';

export class LocalStorage{

    static async getAllCurrencys(): Promise<Currency[]> {
        return AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            return AsyncStorage.multiGet(keys);
        })
        .then((result) => {
            return result.map((r) => { return JSON.parse(r[1]) as Currency; });
        });
    }s
    
    static async getCurrency(currencyId: string): Promise<Currency>{
        var currency: Currency= AsyncStorage.getItem(currencyId).then((json)=>{
            return JSON.parse(json) as Currency;
        });
        return currency;
    }

    static async addCurrency(currency: Currency){
        AsyncStorage.setItem(currency.currencyId, JSON.stringify(currency).replace(/"_/g,"\""));
    }
    
    static async removeCurrency(currencyId: string){
        AsyncStorage.removeItem(currencyId);
    }

    static async updateCurrency(currency: Currency){
        this.addCurrency(currency);
    }

    static async clearDb(){
        AsyncStorage.getAllKeys().then((keys: string[])=>{
            for(let id of keys){
                console.log('cleared currency with id ' + id);
                this.removeCurrency(id);
            }
        });
    }
}