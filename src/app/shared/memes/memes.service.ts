import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { domainName } from '../domain';
import { Meme, React } from '../memes/meme.model';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MemesService {

  constructor(private http: HttpClient) { }

  addMeme(formData:FormData) {
    return this.http.post<{"message":string,"meme":Meme}>(`${domainName}memes/add`, formData);
  }

  getMemes() {
    return this.http.get<Meme[]>(`${domainName}memes/getAll`);
  }

  getMeme(memeId: string) {
    return this.http.get<Meme>(`${domainName}memes/${memeId}/get`);
  }

  deleteMeme(memeId: string) {
    return this.http.delete<{ "message": string }>(`${domainName}memes/${memeId}/delete`);
  }

  reactLike(memeId: string) {
    return this.http.post<{ "message": string, "meme": Meme }>(`${domainName}memes/${memeId}/reactLike`, null);
  }

  reactHaha(memeId: string) {
    return this.http.post<{ "message": string, "meme": Meme }>(`${domainName}memes/${memeId}/reactHaha`, null);
  }

  reactAngry(memeId: string) {
    return this.http.post<{ "message": string, "meme": Meme }>(`${domainName}memes/${memeId}/reactAngry`, null);
  }

  removeReact(memeId: string) {
    return this.http.delete<{ "message": String, "meme": Meme }>(`${domainName}memes/${memeId}/removeReact`);
  }
  
  getUserMemes(userId:string){
    return this.getMemes().pipe(
      map(i=>{
        return i.filter((value)=>{
          return value.creator._id===userId;
        })
      })
    )
  }

  getReactsDetails(reacts: React[]) {

    // Filtering
    const likeList = reacts.filter((react) => {
      return react.reactType === 'like';
    })

    const hahaList = reacts.filter((react) => {
      return react.reactType === 'haha';
    })

    const angryList = reacts.filter((react) => {
      return react.reactType === 'angry';
    })


    // Sending result
    return { likeList: likeList, hahaList: hahaList, angryList: angryList };


  }




}
