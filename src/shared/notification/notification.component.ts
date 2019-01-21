import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/_helpers';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  
  message: String = ''
  type: String = null

  constructor(private notifier: NotificationService) {
    this.notifier.emitter.subscribe(
      data => { //get type and message from the notification serve
      this.type = data.type
      this.message= data.message
      this.reset()
    })
   }

  ngOnInit() {
  }

  reset(){
       setTimeout(() => {
         this.type = null
         this.message = null
       }, 10000);
     }
}
