import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { domainName } from '../domain';
import { Meme } from '../memes/meme.model';
import { stringify } from 'querystring';



@Injectable({
  providedIn: 'root'
})
export class MemesService {

  constructor(private http:HttpClient) { }

  addMeme(meme:Meme){
    return this.http.post<Meme>(`${domainName}memes/add`,meme);
  }

  getMemes(){
    return this.http.get<Meme[]>(`${domainName}memes/getAll`);
  }

  getMeme(id:string){
    return this.http.get<Meme>(`${domainName}memes/${id}/get`);
  }

  deleteMeme(id:string){
    return this.http.delete<{"message":string}>(`${domainName}memes/${id}/delete`);
  }

  reactLike(id:string){
    return this.http.post<{"message":string, "meme":Meme}>(`${domainName}memes/${id}/reactLike`,null);
  }

  reactHaha(id:string){
    return this.http.post<{"message":string, "meme":Meme}>(`${domainName}memes/${id}/reactHaha`,null);
  }

  reactAngry(id:string){
    return this.http.post<{"message":string, "meme":Meme}>(`${domainName}memes/${id}/reactAngry`,null);
  }

  removeReact(id:string){
    return this.http.delete<{"message":String, "meme":Meme}>(`${domainName}memes/${id}/removeReact`);
  }


}
