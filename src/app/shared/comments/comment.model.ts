import { userData } from "../users/user.model";

export class Comment{
    constructor(
        public _id:string,
        public commentOwner:userData,
        public commentContent:string,
    ){}
}