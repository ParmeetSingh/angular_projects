import { Component, ViewChild, ElementRef, Renderer2, Output, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from 'events';
import { HttpClient } from '@angular/common/http';

import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { CookieService } from 'ngx-cookie-service';
import { ThrowStmt } from '@angular/compiler';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'dictionary-app';
  pristine = true;
  @Output('') searchEmit = new EventEmitter();
  history:string[] = [];
  word_list: any = [];

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private dataService: DataService,private http: HttpClient,
    private authService: AuthService,private cookieService: CookieService) {
    }

  ngOnInit(){

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    
  }

  results: string[] =[];
  word:string = "";
  subject = new Subject<any>();

  searchResults(event){
    this.results = [];
    this.word = "";
    console.log(event);

    this.dataService.sendGetRequest(event).subscribe((data: any[])=>{
      this.pristine = false;
      this.word = event;
      this.results = data[Object.keys(data)[0]]["description"];
      console.log(this.results);
      this.history.push(this.word);
      this.cookieService.set(this.user.email,this.cookieService.get(this.user.email) + this.word);
      console.log(this.cookieService.get(this.user.email));
    })
  }

  onClickWord(word:string){
    console.log("The word is",word);
    this.dataService.sendGetRequest(word).subscribe((data: any[])=>{
      this.pristine = false;
      
      this.word = word;
      this.results = data[Object.keys(data)[0]]["description"];

      this.dataService.changeText(word);
      this.history.push(this.word);

    })
  }

  historyBtn(){
    this.history.pop();
    if(this.history.length!==0){
      let last_word = this.history[this.history.length-1];
      console.log("The word is",last_word);
      this.dataService.sendGetRequest(last_word).subscribe((data: any[])=>{
        this.word = last_word;
        this.results = data[Object.keys(data)[0]]["description"];
        this.dataService.changeText(last_word);
      })  
    }else{
      this.pristine = true;
      this.word = "";
      this.dataService.changeText("");
    }
    
  }
  shuffle(){
    let word = this.dataService.getRandomWord();
    this.dataService.sendGetRequest(word).subscribe((data: any[])=>{
      this.pristine = false;
      this.word = word;
      this.results = data[Object.keys(data)[0]]["description"];

      this.dataService.changeText(word);
      this.history.push(this.word);
    })
  }
  
  signIn(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (response) => {
        console.log("google logged in user data is= " , response);
        this.user = response;
        this.cookieService.set(this.user.email,'');
      }
    );
  };

  signOut(): void {
    this.authService.signOut();
    this.user = null;
    console.log('User signed out.');
  }
}


