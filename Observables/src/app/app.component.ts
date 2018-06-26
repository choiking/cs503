import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit() :void {

    let promise = new Promise(resolve => {
      console.log('promise execution');
      console.log('sdfsd');
      setTimeout(() => {
        resolve('promise resolved');//传递值
      }, 1000);
    });
  
    promise.then(value => console.log(value));

    let scream$ = new Observable(observer => {
      console.log('observable execution');
      observer.next(1);
      observer.next(2);
      let timeout = setTimeout(() => {
        observer.next('observer next value');//传递值
      },1000);
      observer.next(3);
      observer.complete();
      return function unsubscribe() {
        clearTimeout(timeout);
      }
    });

    let observer = {
      next: value => console.log(value),
      error: err => console.error(err),
      complete: () => console.log('Complete!')
    }

    let subscription = scream$.subscribe(observer);
    setTimeout(() => {
      subscription.unsubscribe();
    }, 500);

    let subject = new Subject();
    subject.subscribe({//基站，接收值
      next: (v) => console.log('observerA: ' + v)
    });
    subject.subscribe({
      next: (v) => console.log('observerB: ' + v)
    });
    
    subject.next(1);//发射值
    subject.next(2);

    subject.subscribe({
      next: (v) => console.log('observerC: ' + v)
    });

    subject.next(3);



  }


}
