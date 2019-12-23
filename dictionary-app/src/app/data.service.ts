import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private observable: Observable<any>;

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
    this.observable =  new Observable((observer) => {
        // observable execution
        observer.next(word);
        //observer.complete()
    });
    return this.observable;
  }
  public changeTextObservable(){
    return this.observable;
  }
}