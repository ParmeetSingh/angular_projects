import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  wordChanged = new Subject<string>();

  private REST_API_SERVER = "http://localhost:3001/word";

  private REST_API_SERVER_LIST = "http://localhost:3001/words";

  private FIREBASE_SERVER = "https://dictionary-bea35.firebaseio.com/words.json";
  word_list:any = []
  constructor(private httpClient: HttpClient) { 
    this.httpClient.get('assets/words.txt', {responseType: 'json'})
          .subscribe(data => {this.word_list = data;});
    console.log("word list");
  }

  
  public getRandomWord():string{
    let rw =  this.word_list[Math.floor(Math.random() * this.word_list.length)];
    console.log(rw);
    return rw;
  }

  public getWordWheelwords(str:string){
    const startsWithN = this.word_list.filter((word) => word.startsWith(str));
    console.log(startsWithN);
    return startsWithN;
  }

  public sendGetRequest(word:string){
    // return this.httpClient.get(this.REST_API_SERVER+"/"+word);
    return this.httpClient.get(this.FIREBASE_SERVER+"?orderBy=\"word\"&equalTo=\""+word+"\"");
  }

  public sendGetRequestForList(word:string){
    let response =  this.httpClient.get(this.FIREBASE_SERVER+"?orderBy=\"word\"&limitToLast=100&startAt=\""+word+"\"&endAt=\""+word+"\uf8ff\"");
    console.log(response);
    return response;
  }

  public sendGetRequestForRandomString(word:string){
    // return this.httpClient.get(this.REST_API_SERVER+"/"+word);
    return this.httpClient.get(this.FIREBASE_SERVER+"?orderBy=\"word\"&equalTo=\""+word+"\"");
  }

  public sendGetRequestForAll(){
    return this.httpClient.get(this.REST_API_SERVER_LIST);
  }
  public changeText(word:string): any{
    this.wordChanged.next(word);
  }
}