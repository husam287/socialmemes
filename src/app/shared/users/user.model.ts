

//########## User Data ##########


export interface userData {
    _id:string,
    name: string,
    image: string,
    bio?: string,
    posts?: [],
    memes?: [],
}


//########## For Auth Data ##########


export class User {
    constructor(
        public userId: string,
        private _token: string,
        public _expireDate: number,
    ) { }

    //##### To check the validity of the token then return it ##### 
    get token() {
        if (this._token && this._expireDate > new Date().getTime())
            return this._token;
        else
            return null;

    }

    //##### check the token then return expireDate ##### 
    get expireDate() {
        if (this.token) {
            return new Date(this._expireDate);
        }
        else {
            return new Date();
        }
    }
}