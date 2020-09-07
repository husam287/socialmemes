import { userData } from "../users/user.model";
import { Comment } from "../comments/comment.model";
export class Post{
    constructor(
        public _id:string,
        public creator:userData,
        public content:string,
        public comments:Comment[],
        public likes:userData[],
        public createdAt:string,
        public updatedAt:string,
        public image?:string,
    ){}

    get timeOfPost(){
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