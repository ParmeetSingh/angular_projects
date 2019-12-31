import { Component, ViewChild, ElementRef, Renderer2, Output, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from 'events';
import { HttpClient } from '@angular/common/http';

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

  constructor(private dataService: DataService,private http: HttpClient) { }

  ngOnInit(){
    
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
  
}
