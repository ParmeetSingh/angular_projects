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
      // this.searchText.nativeElement.set
      // this.renderer.setProperty(this.searchText.nativeElement, 'value', word);

    })
  }
  
}
