export interface userData {
    _id?:string,
    name?: string,
    image?: string,
    bio?: string,
    posts?: [],
    memes?: [],
}


export class User {
    constructor(
        public userId: string,
        private _token: string,
        private _expireDate: Date,
        public name?: string,
        public image?: string,
        public bio?: string,
        public posts?: [],
        public memes?: [],

    ) { }

    get token() {
        if (this._token && new Date(this._expireDate).getTime() > new Date().getTime())
            return this._token;
        else
            return null;

    }
    get expireDate() {
        if (this.token) {
            return this._expireDate;
        }
        else {
            return new Date();
        }
    }

    setInfo(name: string, image: string, bio: string, posts: [], memes: []) {
        this.name = name;
        this.image = image;
        this.bio = bio;
        this.posts = posts;
        this.memes = memes;

    }
}