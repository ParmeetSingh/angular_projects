import { Component, ViewChild, ElementRef, Renderer2, Output } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'dictionary-app';
  pristine = true;
  @Output('') searchEmit = new EventEmitter();
  history:string[] = [];

  constructor(private dataService: DataService) { }

  results: string[] =[];
  word:string = "";
  subject = new Subject<any>();

  searchResults(event){
    this.results = [];
    this.word = "";
    console.log(event);

    this.dataService.sendGetRequest(event).subscribe((data: any[])=>{
      this.pristine = false;
      //console.log(data);
      this.word = event;
      //console.log(this.word);
      this.results = data;
      this.history.push(this.word);
    })
  }

  onClickWord(word:string){
    console.log("The word is",word);
    this.dataService.sendGetRequest(word).subscribe((data: any[])=>{
      this.pristine = false;
      //console.log(data);
      this.word = word;
      //console.log(this.word);
      this.results = data;

      this.dataService.changeText(word);
      this.history.push(this.word);
      // this.searchText.nativeElement.set
      // this.renderer.setProperty(this.searchText.nativeElement, 'value', word);

    })
  }

  historyBtn(){
    this.history.pop();
    if(this.history.length!==0){
      let last_word = this.history[this.history.length-1];
      console.log("The word is",last_word);
      this.dataService.sendGetRequest(last_word).subscribe((data: any[])=>{
        this.word = last_word;
        this.results = data;
        this.dataService.changeText(last_word);
      })  
    }else{
      this.pristine = true;
      this.word = "";
      this.dataService.changeText("");
    }
    
  }
  
}
