import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  wordChanged = new Subject<string>();

  private REST_API_SERVER = "http://localhost:3001/word";

  private REST_API_SERVER_LIST = "http://localhost:3001/words";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(word:string){
    return this.httpClient.get(this.REST_API_SERVER+"/"+word);
  }

  public sendGetRequestForList(word:string){
    return this.httpClient.get(this.REST_API_SERVER_LIST+"/"+word);
  }

  public sendGetRequestForAll(){
    return this.httpClient.get(this.REST_API_SERVER_LIST);
  }
  public changeText(word:string): any{
    this.wordChanged.next(word);
  }
}