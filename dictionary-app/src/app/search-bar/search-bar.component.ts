import { Component, OnInit, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{


  private searchText:string;
  private sub:any;
  subscription:Subscription;
  @Output() searchEmit = new EventEmitter();
  
  constructor(private dataService:DataService,private route: ActivatedRoute) { }



  myControl = new FormControl();
  local_options: string[];
  filteredOptions: string[];

  ngOnInit() {

    this.subscription = this.dataService.wordChanged
      .subscribe(
        (word: string) => {
          this.searchText = word;
        }
      )

    this.myControl.valueChanges.subscribe((value:string)=>{
      console.log(value);
      if(value!=null && value!==''){
        const filterValue = value.toLowerCase();
        this.dataService.sendGetRequestForList(filterValue).subscribe((data: any[])=>{
          console.log(filterValue);
          console.log("filtered options are"+data);
          this.filteredOptions = data;
      });
      }
      
    });
      
      
  }

  callSomeFunction(option){
    this.searchText = option;
    this.searchEmit.emit(this.searchText);
  }



}
