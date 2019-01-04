import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/_services';
import { Meeting } from 'src/app/_models';
import { NotificationService } from 'src/app/_helpers';
import {faUserPlus, faUserCheck, faUserMinus} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-my-meetings',
  templateUrl: './my-meetings.component.html',
  styleUrls: ['./my-meetings.component.scss']
})

export class MyMeetingsComponent implements OnInit {

  registered: boolean
  memberMeetings : Meeting[]
  loading: boolean = true
  faUserPlus = faUserPlus
  faUserCheck = faUserCheck
  faUserMinus = faUserMinus

  constructor(private events: EventsService,
              private notifier: NotificationService
              ) { }

  ngOnInit() {
    this.loading = true
    this.getMemberMeetings()
  }


  // get all members meetings
  getMemberMeetings(){
     this.events.getMemberMeetings().subscribe(
      res => {
        this.loading = false
        this.memberMeetings = res.data
      }
    )
  }

  // member unregister
  unRegister(meeting: Meeting){
    if(confirm('Are you sure you will like to Unregister')){
        this.events.unregisterMeeting(meeting).subscribe(
        res => {
            console.log(res)
            if(res.data.length === 0){
            this.notifier.display('error', `${res.message.text}`)
            return
          } else {
            this.notifier.display('success', `${res.message.text}`)
            this.getMemberMeetings()
            // this.registered = false
            return
          }
        
        }
      )
    }
  
  }

    // member register
    register(meeting: Meeting){
      if(confirm('Will you like to be registered for this meeting?')){
          this.events.registerMeeting(meeting).subscribe(
          res => {

            if(res.data.length === 0){
              alert( `${res.message.text}`)
              this.notifier.display('error', `${res.message.text}`)              
              return
            } else{
                this.notifier.display('success', `${res.message.text}`)
                this.getMemberMeetings()
                return
            }
          
          }
        )
      }
    
    }
}
