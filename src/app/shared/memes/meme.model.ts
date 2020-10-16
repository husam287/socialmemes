import { userData } from '../users/user.model';


export interface React {
    _id:string,
    reactOwner: userData,
    reactType: string
}

export class Meme {


    constructor(public _id: string, public creator: userData, public image: string, public reacts: React[], public createdAt:Date) { }

    get timeOfMeme(){
        const ms=new Date().getTime()-new Date(this.createdAt).getTime(); //time by millisecond from created post till now
        const s=ms/1000;  //seconds
        const min=s/60;  //mins
        const h=min/60; //hours
        const d=h/24; //days


        if(s<60) return s.toFixed(0)+'s';
        if(s>=60 && min<60) return min.toFixed(0)+'m';
        if(min>=60 && h<24) return h.toFixed(0)+'h';
        if(h>=24) return d.toFixed(0)+'d';
    }
}