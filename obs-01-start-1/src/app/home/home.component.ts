import { Component, OnInit, OnDestroy } from '@angular/core';

import {interval, Subscription, Observable} from 'rxjs';
import { timeout } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(observer=>{
      let count = 0;
      setInterval(()=>{
          observer.next(count);
          if(count>=3){
            observer.error(new Error("Count is greater than 3"));
          }
          count++;
        },1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
      alert("this is errror");
    },()=>{
      console.log("completed")
    });

  }

  ngOnDestroy(): void{
      this.firstObsSubscription.unsubscribe();
  }

}
