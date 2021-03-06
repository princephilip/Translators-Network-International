import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private sub = new Subject<any>()
  public emitter = this.sub.asObservable()

  constructor() { }

  display(type, message){
    this.sub.next({type, message})
  }
}
