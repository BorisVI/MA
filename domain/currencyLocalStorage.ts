import { AsyncStorage } from 'react-native';

export class CurrencyLocalStorage{

    static getAddableCurrencies(): Promise<Array<string>> {
        let current = this.getCurrentCurrencies().then((list)=>{
            let result = Array<string>();
            for(let i=0;i<list.length;i++){
                result.push(list[i][0]);
            }
            let all = this.getAllCurrenciesPossible();
            all.filter(x => result.indexOf(x)<0);
            return all;
        });
        return current;
    }
    
    static async getCurrency(currencyTag: string): Promise<string>{
        var trip: string= AsyncStorage.getItem(currencyTag).then((json)=>{
            return JSON.parse(json) as string;
        });
        return trip;
    }
    static async useCurrency(currencyTag: string){
        this.getCurrentCurrencies().then((list)=>{
            list.push([currencyTag,false]);
        });
    }

    static getAllCurrenciesPossible(){
        let list: string[]=["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"];
        return list;
    }
    static async getCurrentCurrencies(): Promise<Array<[string,Boolean]>>{
        var list:Array<[string,Boolean]> = AsyncStorage.getItem("activeCurrencies").then((json)=>{
            return JSON.parse(json) as Array<[string,Boolean]>;
        });
        return list;
    }
    static async setCurrentCurrencies(list:Array<[string,Boolean]>){
        AsyncStorage.setItem("activeCurrencies", JSON.stringify(list));
    }
    static async overwriteCurrency(currencyTag: string,euroToCurrency: number){
        this.getCurrentCurrencies().then((list)=>{
            for(let i=0;i<list.length;i++){
                if(list[i][0]==currencyTag){
                    list[i][1]=true;
                    this.setCurrentCurrencies(list);
                    //ook nog waarde overwriten in andere lijst
                }
            }
        });
    }

    static removeCurrency(currencyTag: string){
        this.getCurrentCurrencies().then((list)=>{
            for(let i=0;i<list.length;i++){
                if(list[i][0]==currencyTag){
                    list.splice(i,1);
                    this.setCurrentCurrencies(list);
                    return list;
                }
            }
        });
    }

    static async updateCurrencyValue(trip: string,value:number){
        
    }

    static async clearDb(){
        AsyncStorage.getAllKeys().then((keys: string[])=>{
            for(let id of keys){
                console.log('cleared trip with id ' + id);
                this.removeCurrency(id);
            }
        });
    }

}