import { SocketIoServer } from './SocketIoServer';
import { Client } from '../models/Client';
var fs = require('fs');

export class Game{
    private file: string;
    private data:any;
    private deck: any;

    constructor(file: string){
        this.file = file;
        fs.readFile(this.file, this.loaded.bind(this));
    }

    loaded(error: Error, data: any){
        let num = 6;
        this.data = JSON.parse(data.toString());
        this.deck = {suspects: this.randomPicker(this.data['suspects'],num),
                     weapons: this.randomPicker(this.data['weapons'],num),
                     locations: this.randomPicker(this.data['locations'],num)};
    }
    sendData(client: Client){
        client.ioClient.emit('clues', JSON.stringify(this.deck));        
    }
    randomPicker(tab:Array<Object>, num:number){
        if(!tab || !num){
            return ;
        }
        if(num < tab.length){
            var tempTab = [];
            for(let i = 0; i < num; i++){
                let index = Math.floor(Math.random() * tab.length);
                tempTab.push(tab[index]);
                tab.splice(index,1);
            }
            return tempTab;
        }

    }
}